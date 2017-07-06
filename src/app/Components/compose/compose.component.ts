import { Component, OnInit } from '@angular/core';

import {CriticismService} from "../../Services/criticism.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrganService} from "../../Services/organ.service";
import {CriticismModel} from "../../models/criticismModel";
import {ActionEnum} from "../../models/actionEnum";

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  subjects = [];
  parts = [];
  filteredSubjects: any;
  filteredParts: any;
  criticismForm: FormGroup;
  similarCriticisms: CriticismModel[] = [];
  similarTemp: CriticismModel[] = [];
  contentWordExtracted: any[] = [];
  ignoredWord: any = ['با', 'از', 'است', 'می باشد', 'میباشد', 'شد', 'شاید', 'باید', 'هست', 'نیست', 'و',
                      'اگر', 'طور', 'این', 'اینطور', 'به', 'برای', 'همین', 'تا', 'کجا'];

  constructor(private criticismService: CriticismService, private organService: OrganService) { }

  ngOnInit() {
    this.initCriticismForm();

    this.filteredSubjects = this.criticismForm.controls['subject'].valueChanges
      .startWith(null)
      .map(name => this.filteringList(name, 'subject'));

    this.filteredParts = this.criticismForm.controls['part'].valueChanges
      .startWith(null)
      .map(name => this.filteringList(name, 'part'));

    this.criticismService.subjects.subscribe(
      (data) => {
        this.subjects = (data) ? data : [];
      },
      (err) => console.log(err)
    );

    this.organService.getParts()
      .then((res) => {
        this.parts = res;
      })
      .catch((err) => {
        console.log(err);
      });

    this.criticismService.getSubjects();

    this.criticismService.criticisms.subscribe(
      (data) => {
        this.contentWordExtracted = [];
        this.similarTemp = data;

        for(let item of data){
          this.contentWordExtracted.push({
            id: item.id,
            value: item.content.split(' ').filter(el => !this.ignoredWord.includes(el))
          });
        }
      },
      (err) => console.log(err)
    );
  }

  filteringList(val: string, controlName: string){
    if(controlName === 'subject')
      return val ? this.subjects.filter(s => s.name.toLowerCase().indexOf(val.toLowerCase()) !== -1).map(el => el.name)
        : this.subjects.map(el => el.name);
    else if(controlName === 'part')
      return val ? this.parts.filter(p => p.name.toLowerCase().indexOf(val.toLowerCase()) !== -1).map(el => el.name)
        : this.parts.map(el => el.name);
  }

  initCriticismForm(){
    this.criticismForm = new FormGroup({
      subject: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      tags: new FormControl(''),
      part: new FormControl('', Validators.required)
    });
  }

  showList(controlName: string){
    this.criticismForm.controls[controlName].setValue(this.criticismForm.controls[controlName].value);
  }

  addCriticism(){
    //Check the part validation
    if(this.parts.find(el => el.name === this.criticismForm.controls['part'].value) === undefined){
      console.log('The specified part is not valid');
      return;
    }

    this.criticismService.addCriticism({
      part: this.parts.find(el => el.name === this.criticismForm.value.part),
      subject: this.criticismForm.value.subject,
      content: this.criticismForm.value.content,
      tags: this.criticismForm.value.tags
    })
      .then((res) => {
        this.criticismForm.reset();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getSimilarCriticisms(){
    this.similarCriticisms = [];
    let temp = (this.criticismForm.controls['content'].value === null) ? null : this.criticismForm.controls['content'].value.split(' ');
    let similarPercent: any = [];
    if(temp === null)
      return;

    for(let item of this.contentWordExtracted){
      similarPercent.push({
        id: item.id,
        value: item.value.filter(el => temp.includes(el)).length
      });
    }

    similarPercent = similarPercent.sort((a, b) => {
      if(a.value > b.value)
        return 1;
      else if(a.value < b.value)
        return -1;
      else
        return 0;
    }).slice(0, 11).filter(el => el.value !== 0);

    similarPercent.forEach(el => {
      this.similarCriticisms.push(this.similarTemp.find(i => i.id === el.id));
    });
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
