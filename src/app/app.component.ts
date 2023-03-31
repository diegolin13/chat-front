import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from './services/chat.service';
import { SocketsService } from './services/sockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat';
  mensajesSubs: Subscription;

  constructor(
    public wsService: SocketsService,
    public chatService: ChatService
  ) {}
  ngOnInit(): void {
    // this.chatService.getPrivateMessage().subscribe((resp) => {
    //   console.log(resp);
    // });
  }
}
