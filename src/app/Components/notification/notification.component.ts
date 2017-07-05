import { Component, OnInit } from '@angular/core';

import {CriticismService} from "../../Services/criticism.service";
import {CriticismModel} from "../../models/criticismModel";
import {MessageService} from "../../Services/message.service";
import {ReplyModel} from "../../models/replyModel";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notReplyCriticisms: CriticismModel[] = [];
  deadlineCriticisms: ReplyModel[] = [];

  constructor(private criticismService: CriticismService, private msgService: MessageService) { }

  ngOnInit() {
    this.criticismService.getAllNotReplyCriticisms()
      .then(res => {
        this.notReplyCriticisms = this.extractDataNotReply(res);
        this.deadlineCriticisms = this.extractDataDeadline(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  separateTags(tags: string): string[] {
    let result: string[] = [];

    result = tags.split('-');

    for (let item of result) {
      item = item.trim();
    }

    return result;
  }

  actionHandler(event){
    switch(event.kind){
      case 'reply':{
        this.criticismService.addReply(event.data)
          .then(res => {
            this.msgService.message('پاسخ به خوبی ذخیره شد');
            this.notReplyCriticisms = this.notReplyCriticisms.filter(el => el.id !== event.data.criticism_id);
          })
          .catch(err => {
            this.msgService.error('در حال حاضر سیستم قادر به ذخیره پاسخ نمی باشد');
            console.log(err);
          })
      }
      break;
      case 'thank': {
        this.criticismService.thankReply(event.data.rid, event.data.value)
          .then(res => {
            this.msgService.message('درخواست شما با موفقیت ثبت شد');
          })
          .catch(err => {
            console.log(err);
            this.deadlineCriticisms.find(el => el.id === event.data.rid).thank_number += (event.data.value * -1);

            this.msgService.error('شما نمی توانید بیش یک بار تشکر یا بیان نارضایتی داشته باشید');
          })
      }
    }
  }

  extractDataNotReply(data){
    let result = [];
    for (let item of data['criticisms']) {
      let value: CriticismModel = new CriticismModel();

      value.id = item.cid;
      value.subject = item.subject;
      value.writerName = item.creator_name;
      // value.writerImage = item.writerImage;
      value.tags = (item.tags === null || item.tags === undefined) ? null : this.separateTags(item.tags);
      value.content = item.content;
      value.vote = item.rank;

      result.push(value);
    }

    return result;
  }

  extractDataDeadline(data){
    let res = [];

    for(let item of data['deadline']){
      let value: ReplyModel = new ReplyModel();

      value.id = item.rid;
      value.criticism_id = item.cid;
      value.criticism_subject = item.subject;
      value.criticism_content = item.criticism_content;
      value.criticism_date = item.creation_date;
      value.criticism_rank = item.rank;
      value.criticism_is_backward = item.is_backward;
      value.criticism_tags = (item.tags === null || item.tags === undefined) ? null : this.separateTags(item.tags);
      value.replier_part = item.part_name;
      value.replier_name = item.replier_name;
      value.replier_rank = item.replier_rank;
      value.content = item.reply_content;
      value.rank = item.reply_rank;
      value.thank_number = item.thanks_number;

      res.push(value);
    }

    return res;
  }
}
