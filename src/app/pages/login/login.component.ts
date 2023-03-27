import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name = '';

  constructor(
    private wsService: SocketsService,
    private router: Router
  ) {

  }

  registerName() {
    if (this.name.trim().length === 0 ) return;

    this.wsService.loginWs(this.name).then((resp) => {
      this.router.navigateByUrl('/mensajes');
      this.name = '';
    });
  }
}
