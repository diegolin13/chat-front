import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  msgSubs : Subscription;
  messages = [];
  elemento: HTMLElement;
  userName = '';
  @Input() destination : {nombre: string; ids: string[]};

  constructor(
    private chat: ChatService,
    private wsService: SocketsService
  ) {}

  ngOnInit(): void {
    this.userName = this.wsService.getUsuario().name;
    this.elemento = document.getElementById('chat-mensajes');
    this.msgSubs = this.chat.getMessages().subscribe( msg => {
      console.log('-------------MSG RECIBIDO-------------');
      this.messages.push(msg);
      // aqui se forza al scroll a ir hasta abajo cuando reciba un mensaje
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },50);
    });
    const prev_msg = localStorage.getItem('notificaciones');
    if (prev_msg && prev_msg !== '{}') {
      const msgs = JSON.parse(prev_msg);
      // this.messages = msgs[this.destination.ids[0]];
      msgs[this.destination.ids[0]].forEach((mensaje) => {
        this.messages.push(mensaje);
      });
      delete msgs[this.destination.ids[0]];
      localStorage.setItem('notificaciones', JSON.stringify(msgs));
    }
  }

  ngOnDestroy(): void {
    this.msgSubs.unsubscribe();
  }

  enviar() {
    if (this.texto.trim().length === 0) return;
    //this.chat.sendMessage(this.texto);
    this.chat.sendPrivateMessage(this.texto, this.destination.ids);
    this.texto = '';
  }

}
