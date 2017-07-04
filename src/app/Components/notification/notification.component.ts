import { Component, OnInit } from '@angular/core';

import {CriticismService} from "../../Services/criticism.service";
import {CriticismModel} from "../../models/criticismModel";
import {MessageService} from "../../Services/message.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notReplyCriticisms: CriticismModel[] = [];
  deadlineCriticisms: CriticismModel[] = [];

  constructor(private criticismService: CriticismService, private msgService: MessageService) { }

  ngOnInit() {
    this.criticismService.getAllNotReplyCriticisms()
      .then(res => {
        this.notReplyCriticisms = this.extractData(res, 'criticisms');
        this.deadlineCriticisms = this.extractData(res, 'deadline');
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
    }
  }

  extractData(data, whichData: string){
    let result = [];
    for (let item of data[whichData]) {
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
}
