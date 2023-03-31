import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {
  components = [
    {
      name: 'En línea',
      active: true
    },
    {
      name: 'Mensajes',
      active: false
    }
  ]

  destino = {nombre: '', ids: ['']};

  constructor(
    public wsService: SocketsService,
    private chatService: ChatService,
  ) {}

  salir() {
    this.wsService.logOut();
  }

  changeView() {
    this.components.forEach(element => {
      element.active = !element.active
    });
  }

  iniciarChat(data: {nombre: string, ids: string[]}) {
    this.destino = data;
    this.changeView();
  }

}
