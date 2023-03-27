import { Injectable } from '@angular/core';
import { SocketsService } from './sockets.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: SocketsService
  ) { }

  sendMessage(mensaje: string) {
    const payload = {
      from: this.wsService.getUsuario().name,
      body: mensaje
    }

    this.wsService.emit('mensaje', payload);
  }

  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }
}
