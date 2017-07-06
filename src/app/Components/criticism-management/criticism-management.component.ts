import { Component, OnInit } from '@angular/core';

import {CriticismService} from "../../Services/criticism.service";
import {CriticismModel} from "../../models/criticismModel";
import {WindowRef} from "../../Services/windowRef";
import {ActionEnum} from "../../models/actionEnum";
import {AuthService} from "../../Services/auth.service";
import {MessageService} from "../../Services/message.service";

@Component({
  selector: 'app-criticism-management',
  templateUrl: './criticism-management.component.html',
  styleUrls: ['./criticism-management.component.css']
})
export class CriticismManagementComponent implements OnInit {
  filteredCriticisms: CriticismModel[] = [];
  isLoggedIn: boolean = false;
  height: string;

  constructor(private criticismService: CriticismService, private windowRef: WindowRef,
              private authService: AuthService, private msgService: MessageService) { }

  ngOnInit() {
    this.height = this.windowRef.getWindow().innerHeight + "px";
    this.windowRef.getWindow().onresize = (e) => {
      this.height = this.windowRef.getWindow().innerHeight + "px";
    };

    this.authService.isLoggedIn.subscribe(
      (data) => this.isLoggedIn = data,
      (err) => console.log(err)
    );

    this.criticismService.criticisms.subscribe(
        (data) => {
          this.filteredCriticisms = data;
        },
        (err) => {
          console.log(err);
          this.filteredCriticisms = [];
        }
    );

    this.criticismService.getAllCriticisms('top');
  }

  filterCriticisms(filterOptions){
    this.filteredCriticisms = this.criticismService.criticisms.getValue();

    for(let prop in filterOptions){
      if(filterOptions[prop] !== null && filterOptions[prop] !== undefined){
        switch (prop){
          case 'title': {
            this.filteredCriticisms = this.filteredCriticisms.filter((el) => {
              return el.subject.includes(filterOptions[prop]);
            });
          }
            break;
          case 'tags': {
            this.filteredCriticisms = this.filteredCriticisms.filter((el) => {
              if(el.tags === null)
                return false;
              else{
                return el.tags.find(i => i.includes(filterOptions[prop]));
              }
            });
          }
            break;
          case 'criticismVote': {
            this.filteredCriticisms = this.filteredCriticisms.filter((el) => {
              return el.vote === filterOptions[prop];
            })
          }
            break;
          case 'replyVote': {

          }
            break;
        }
      }
    }
    // console.log(this.filteredCriticisms);
  }

  actionHandler(event, id){
    switch (event.action){
      case ActionEnum.addVote: {
        this.criticismService.votingCriticisms(id, 1)
          .then(res => {

          })
          .catch(err => {
            this.criticismService.criticisms.getValue().find(el => el.id === id).vote--;
          })
      }
      break;
      case ActionEnum.subVote: {
        this.criticismService.votingCriticisms(id, -1)
          .then(res => {

          })
          .catch(err => {
            this.criticismService.criticisms.getValue().find(el => el.id === id).vote++;
          });
      }
      break;
      case ActionEnum.backward: {
        this.criticismService.backWardCriticism(event.data, id)
          .then(res => {
            this.msgService.message('عقبگرد به خوبی ثبت شد');
          })
          .catch(err => {
            this.msgService.error('در حال حاضر به ثبت عقبگرد نیستیم. دوباره تلاش کنید');
          })
      }
      break;
    }
  }

  changeTab(event){
    switch (event.index){
      case 0:{
        this.criticismService.getAllCriticisms('top');
      }
      break;
      case 1:{
        this.criticismService.getAllCriticisms('all');
      }
      break;
      case 2:{
        this.criticismService.getAllCriticisms('user');
      }
      break;
      case 3:{
        this.criticismService.getAllCriticisms('all');
        this.criticismService.getSubjects();
      }
      break;
    }
  }
}
