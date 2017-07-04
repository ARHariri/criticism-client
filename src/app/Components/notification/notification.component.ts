import { Component, OnInit } from '@angular/core';

import {CriticismService} from "../../Services/criticism.service";
import {CriticismModel} from "../../models/criticismModel";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notReplyCriticisms: CriticismModel[] = [];

  constructor(private criticismService: CriticismService) { }

  ngOnInit() {
    this.criticismService.getAllNotReplyCriticisms()
      .then(res => {

        for (let item of res) {
          let value: CriticismModel = new CriticismModel();

          value.id = item.cid;
          value.subject = item.subject;
          value.writerName = item.writerName;
          // value.writerImage = item.writerImage;
          value.tags = (item.tags === null) ? null : this.separateTags(item.tags);
          value.content = item.content;
          value.vote = item.rank;

          this.notReplyCriticisms.push(value);
        }

        this.notReplyCriticisms = res;
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

  }
}
