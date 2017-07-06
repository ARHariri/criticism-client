import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Subject} from "rxjs";
import {Observable} from "rxjs";

@Injectable()
export class WebsocketService {
  private socket: Rx.Subject<MessageEvent>;
  private ws: Subject<any>;

  constructor() {
    this.ws = Observable.webSocket('ws://localhost:3000');
  }

  connect(url): Rx.Subject<MessageEvent> {
    if(!this.socket) {
      this.socket = this.create(url);
    }
    return this.socket;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      }
    );
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };

    return Rx.Subject.create(observer, observable);
  }
}
