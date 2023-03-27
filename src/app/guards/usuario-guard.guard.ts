import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { SocketsService } from '../services/sockets.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardGuard implements CanActivate {

  constructor(
    private wsService: SocketsService,
    private router: Router
  ) {}
  canActivate() {
    if (this.wsService.getUsuario()) {
      return true
    } else {
      this.router.navigateByUrl('/');
      return false
    }
  }
  
}
