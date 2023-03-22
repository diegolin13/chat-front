import { Component } from '@angular/core';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {


  constructor(public wsService: SocketsService) {

  }
}
