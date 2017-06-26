import {Component, OnInit, Input} from '@angular/core';

import {UserModel} from './../../models/userModel';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserModel;

  constructor() { }

  ngOnInit() {
  }

}
