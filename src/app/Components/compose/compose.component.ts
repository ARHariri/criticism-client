import { Component, OnInit } from '@angular/core';

import {CriticismService} from "../../Services/criticism.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrganService} from "../../Services/organ.service";

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
  similarCriticisms: any = [];

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
}
