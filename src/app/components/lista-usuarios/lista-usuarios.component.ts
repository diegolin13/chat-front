import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit{

  usuariosObs: Observable<any>

  constructor(
    private chatService: ChatService,
    private wsService: SocketsService
  ) {}

  ngOnInit(): void {
    this.wsService.emit('get-users', this.wsService.getUsuario().name);
    this.usuariosObs = this.chatService.getActiveUsers();
  }



}
