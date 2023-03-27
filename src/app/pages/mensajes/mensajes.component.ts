import { Component } from '@angular/core';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {

  constructor(
    public wsService: SocketsService
  ) {}

}
