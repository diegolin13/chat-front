import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';



@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  public socketStatus: boolean = false;
  public usuario: Usuario;

  constructor(private socket: Socket) {
    this.checkStatus();
    this.cargarStorage();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });
 
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function) {

    console.log('emietiendo evento');
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWs(nombre: string) {
    return new Promise ((resolve, reject) => {
      this.emit('config-usuario', {nombre}, (resp) => {
        this.usuario = new Usuario(nombre);
        this.localStorage();
        resolve(resp);
      });
    });
  }

  localStorage() {
    window.localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    const usuarioLs = window.localStorage.getItem('usuario');

    if(usuarioLs) {
      this.usuario = JSON.parse(usuarioLs);
      this.loginWs(this.usuario.name);
    }
  }

  getUsuario() {
    return this.usuario;
  }


}
