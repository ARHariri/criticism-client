import {Component, OnInit, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from "@angular/material";
import {CriticismService} from "../../Services/criticism.service";
import {MessageService} from "../../Services/message.service";

@Component({
  selector: 'app-reply-show',
  templateUrl: './reply-show.component.html',
  styleUrls: ['./reply-show.component.css']
})
export class ReplyShowComponent implements OnInit {
  criticism_id: number = null;
  reply: any;
  loading: boolean = false;

  constructor(public dialogRef: MdDialogRef<ReplyShowComponent>, private criticismService: CriticismService,
              @Inject(MD_DIALOG_DATA) private data: { criticism_id }, private msgService: MessageService) { }

  ngOnInit() {
    this.criticism_id = this.data.criticism_id;

    this.getReply();
  }

  getReply(){
    this.loading = true;
    this.criticismService.getReply(this.criticism_id)
      .then(res => {
        this.reply = res[0];
        this.loading = false;
      })
      .catch(err => {
        this.reply = null;
        this.loading = false;
      });
  }

  vote(action){
    switch(action){
      case 'inc': {
        this.criticismService.votingReply(this.reply.id, 1)
          .then(res =>  this.reply.vote++)
          .catch(err => this.msgService.error('نمی توانید بیش از دوبار یک امتیاز بدهید'));
      }
      break;
      case 'dec': {
        this.criticismService.votingReply(this.reply.id, -1)
          .then(res => this.reply.vote--)
          .catch(err => this.msgService.error('نمی توانید بیش از دوبار یک امتیاز بدهید'));
      }
      break;
    }
  }
}
