import { Component, OnInit } from '@angular/core';
import { SocketsService } from './services/sockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat';

  constructor(public wsService: SocketsService) {}
  ngOnInit(): void {

  }
}
