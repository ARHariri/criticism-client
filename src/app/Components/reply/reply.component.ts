import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {CriticismModel} from "../../models/criticismModel";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() isReplying: boolean = false;
  @Input() criticism: CriticismModel;
  @Output() action = new EventEmitter();
  replyForm: FormGroup;

  constructor(public dialogRef: MdDialogRef<ReplyComponent>) { }

  ngOnInit() {
    this.initReplyForm();
  }

  initReplyForm(){
    this.replyForm = new FormGroup({
      replyContent: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required)
    });
  }

  concatTags(tags){
    return tags.join(' - ');
  }

  sendReply(){

  }
}
