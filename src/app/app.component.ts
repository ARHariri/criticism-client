import {Component, OnInit} from '@angular/core';
import {AuthService} from './Services/auth.service';
import {WindowRef} from "./Services/windowRef";
import {WebsocketService} from "./Services/websocket.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn: boolean = false;
  height;
  ws: Subject<any>;

  constructor(private authService: AuthService, private windowRef: WindowRef){}

  ngOnInit(){
    this.height = this.windowRef.getWindow().innerHeight;
    this.windowRef.getWindow().onresize = (e) => {
      this.height = this.windowRef.getWindow().innerHeight + "px";
    };

    this.authService.isLoggedIn.subscribe(
      (data) => this.isLoggedIn = data,
      (err) => console.log(err.message)
    );

    // this.ws = this.websocketService.connect('ws://localhost:3000');
  }
}
