import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MdDialog} from "@angular/material";

import {ActionEnum} from "../../models/actionEnum";
import {CriticismModel} from "../../models/criticismModel";
import {ReplyShowComponent} from "../reply-show/reply-show.component";

@Component({
  selector: 'app-criticism',
  templateUrl: './criticism.component.html',
  styleUrls: ['./criticism.component.css']
})
export class CriticismComponent implements OnInit {
  @Input() isCheckDeadline: boolean = false;
  @Input() criticism: CriticismModel;
  @Output() action = new EventEmitter();

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  vote(value: string){
    switch (value){
      case 'inc':{
        this.criticism.vote += 1;
        this.emitEvent(ActionEnum.addVote, 1);
      }
      break;
      case 'dec':{
        this.criticism.vote -= 1;
        this.emitEvent(ActionEnum.subVote, 1);
      }
      break;
    }
  }

  displayReply(){
    console.log('displayReply');
    let dialogRef = this.dialog.open(ReplyShowComponent, {
      height: '600px',
      width: '800px',
      data: {
        criticism_id: this.criticism.id
      }
    });
  }

  emitEvent(action: ActionEnum, data: any, errorMsg: string = null){
    let obj = {
      action: action,
      data: data,
      errorMsg: errorMsg
    };

    this.action.emit(obj);
  }

  concatTags(tags: string[]): string{
    if(tags !== null)
      return tags.reduce((acc, el) => {
        return acc + ' - ' + el;
      });
  }
}
