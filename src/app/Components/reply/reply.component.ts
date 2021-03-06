import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import * as moment from 'jalali-moment';

import {CriticismModel} from "../../models/criticismModel";
import {MessageService} from "../../Services/message.service";
import {ReplyModel} from "../../models/replyModel";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() isReplying: boolean = false;
  @Input() reply: ReplyModel;
  @Input() criticism: CriticismModel;
  @Output() action = new EventEmitter();
  isReject: boolean = false;
  replyForm: FormGroup;
  years: any = [];
  months: any = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان' , 'آذر', 'دی', 'بهمن', 'اسفند'];
  days: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  constructor(private msgService: MessageService) { }

  ngOnInit() {
    this.initReplyForm();
  }

  initReplyForm(){
    let todayJalali = moment(new Date()).format('jYYYY/jM/jD');

    for(let current = 0; current < 10; current++){
      this.years.push(parseInt(todayJalali.split('/')[0]) + current);
    }

    this.replyForm = new FormGroup({
      replyContent: new FormControl('', Validators.required),
      deadline_year: new FormControl(parseInt(todayJalali.split('/')[0]), Validators.required),
      deadline_month: new FormControl(this.months[parseInt(todayJalali.split('/')[1]) - 1], Validators.required),
      deadline_day: new FormControl(parseInt(todayJalali.split('/')[2]), Validators.required)
    });
  }

  concatTags(tags){
    return tags.join(' - ');
  }

  sendReply(){
    let todayJalali = moment(new Date()).format('jYYYY/jM/jD');
    let fDate = {
      year: parseInt(todayJalali.split('/')[0]),
      month: parseInt(todayJalali.split('/')[1]),
      day: parseInt(todayJalali.split('/')[2])
    };
    let sDate = {
      year: parseInt(this.replyForm.controls['deadline_year'].value),
      month: parseInt(this.months.indexOf(this.replyForm.controls['deadline_month'].value) + 1),
      day: parseInt(this.replyForm.controls['deadline_day'].value)
    };

    if(!this.isReject && !this.isFirstLess(fDate, sDate)){
      this.msgService.error('کوچک ترین مقدار برای تاریخ انتخاب شده می تواند یک روز بعد باشد');
    }
    else{
      let obj = {
        kind: 'reply',
        data: {
          criticism_id: this.criticism.id,
          content: this.replyForm.controls['replyContent'].value,
          deadline_date: this.replyForm.controls['deadline_year'].value + '-' +
                         parseInt(this.months.indexOf(this.replyForm.controls['deadline_month'].value) + 1) + '-' +
                         this.replyForm.controls['deadline_day'].value,
          is_reject: this.isReject
        }
      };
      this.action.emit(obj);
    }
  }

  isFirstLess(fDate, sDate){
    if(fDate.year < sDate.year)
      return true;
    else if(fDate.month < sDate.month)
      return true;
    else if(fDate.day < sDate.day)
      return true;

    return false;
  }

  changeDate(){

  }

  thank(value: boolean){
    this.reply.thank_number += (value) ? 1 : -1;

    let obj = {
      kind: 'thank',
      data: {
        value: (value) ? 1 : -1,
        rid: this.reply.id
      }
    };

    this.action.emit(obj);
  }
}
