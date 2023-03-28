import { Component } from '@angular/core';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {
  components = [
    {
      id: 1,
      name: 'En línea',
      active: true
    },
    {
      id: 2,
      name: 'Chat',
      active: false
    }
  ]

  constructor(
    public wsService: SocketsService
  ) {}

  salir() {
    this.wsService.logOut();
  }

  changeView(idTab: number) {
    this.components.forEach(element => {
      element.active = !element.active
    });
  }

}
