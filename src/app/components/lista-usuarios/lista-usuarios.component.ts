import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy{
  usuariosSubs: Subscription;
  msgSubs: Subscription;

  usuarios = [];
  @Output() idToSend = new EventEmitter<{nombre: string; ids: string[]}>();

  constructor(
    private chatService: ChatService,
    private wsService: SocketsService
  ) {}

  ngOnInit(): void {
    this.wsService.emit('get-users', this.wsService.getUsuario().name);
    this.usuariosSubs = this.chatService.getActiveUsers().subscribe((resp: any) => {
      this.usuarios = resp;
    });
    this.msgSubs = this.chatService.getMessages().subscribe((resp: any) => {
      this.usuarios.forEach((user: any) => {
        if (user.id === resp.idFrom) {
          user.notificaciones ++;
          this.wsService.emit('update-notificaciones', {id: resp.idFrom, notificaciones: user.notificaciones});
        }
      });
    });
  }

  ngOnDestroy() {
    this.msgSubs.unsubscribe();
    this.usuariosSubs.unsubscribe();
  }

  startChat(nombre: string, id: string) {
    this.wsService.emit('update-notificaciones', {id, notificaciones: 0});
    this.idToSend.emit({nombre, ids: [id]});
  }



}
