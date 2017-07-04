import { Component, OnInit } from '@angular/core';

import {CriticismService} from "../../Services/criticism.service";
import {CriticismModel} from "../../models/criticismModel";
import {WindowRef} from "../../Services/windowRef";
import {ActionEnum} from "../../models/actionEnum";

@Component({
  selector: 'app-criticism-management',
  templateUrl: './criticism-management.component.html',
  styleUrls: ['./criticism-management.component.css']
})
export class CriticismManagementComponent implements OnInit {
  filteredCriticisms: CriticismModel[] = [];
  height: string;

  constructor(private criticismService: CriticismService, private windowRef: WindowRef) { }

  ngOnInit() {
    this.height = this.windowRef.getWindow().innerHeight + "px";
    this.windowRef.getWindow().onresize = (e) => {
      this.height = this.windowRef.getWindow().innerHeight + "px";
    };

    this.criticismService.criticisms.subscribe(
        (data) => {
          this.filteredCriticisms = data;
        },
        (err) => {
          console.log(err);
          this.filteredCriticisms = [];
        }
    );

    this.criticismService.getAllCriticisms();
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
              return el.tags.includes(filterOptions[prop]);
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
    }
  }
}
