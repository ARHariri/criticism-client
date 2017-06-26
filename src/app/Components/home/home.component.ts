import { Component, OnInit } from '@angular/core';

import {WindowRef} from "../../Services/windowRef";
import {CriticismService} from "../../Services/criticism.service";
import {UserModel} from "../../models/userModel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topPeopleList: UserModel[] = [];

  constructor(private criticismService: CriticismService) { }

  ngOnInit() {
    this.criticismService.getTopPeople()
        .then((res) => {
          this.topPeopleList = [];

          for(let item of res){
            let tempUserModel = new UserModel();

            tempUserModel.id = item.id;
            tempUserModel.image = item.image;
            tempUserModel.name = item.name;
            tempUserModel.rank = item.rank;
            tempUserModel.username = item.username;

            this.topPeopleList.push(tempUserModel);
          }
        })
        .catch((err) => {
          console.log(err);
          this.topPeopleList = [];
        })
  }
}
