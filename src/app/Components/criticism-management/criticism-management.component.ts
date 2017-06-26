import { Component, OnInit } from '@angular/core';

import {CriticismService} from "../../Services/criticism.service";
import {CriticismModel} from "../../models/criticismModel";

@Component({
  selector: 'app-criticism-management',
  templateUrl: './criticism-management.component.html',
  styleUrls: ['./criticism-management.component.css']
})
export class CriticismManagementComponent implements OnInit {
  filteredCriticisms: CriticismModel[] = [];

  constructor(private criticismService: CriticismService) { }

  ngOnInit() {
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
              return el.title.includes(filterOptions[prop]);
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
}
