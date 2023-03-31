import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocketsService } from './sockets.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: SocketsService,
    private http: HttpClient
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

  getPrivateMessage() {
    return this.wsService.listen('mensaje-privado');
  }

  getActiveUsers() {
    return this.wsService.listen('active-users');
  }

  sendPrivateMessage(mensaje: string, destination: string[]){
    const payload = {
      from: this.wsService.getUsuario().name,
      body: mensaje,
      to: destination
    }

    this.wsService.emit('private-message', payload);

  }
}
