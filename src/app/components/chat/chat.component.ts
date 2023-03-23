import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  msgSubs : Subscription;

  constructor(private chat: ChatService) {}
  ngOnInit(): void {
    this.msgSubs = this.chat.getMessages().subscribe( msg => {
      console.log('-------------MSG RECIBIDO-------------');
      console.log(msg);
    });
  }

  ngOnDestroy(): void {
    this.msgSubs.unsubscribe();
  }

  enviar() {
    if (this.texto.trim().length === 0) return;
    this.chat.sendMessage(this.texto);
    this.texto = '';
  }

}
