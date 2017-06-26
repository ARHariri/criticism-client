import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from "@angular/forms";

import {UserModel} from "../../models/userModel";
import {OrganService} from "../../Services/organ.service";

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.css']
})
export class OrganComponent implements OnInit {
  users: UserModel[] = [];
  parts: any[] = [];
  userForm: FormGroup;
  partForm: FormGroup;
  accessLevels: string[] = [];
  responsibleUsers: UserModel[] = [];

  constructor(private organService: OrganService) { }

  ngOnInit() {
    this.getParts();
    this.getAccessLevels();
    this.initPartForm();
    this.initUserForm();
    this.getUsers();
  }

  initUserForm(){
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)),
      accessLevel: new FormControl('', Validators.required)
    })
  }

  initPartForm(){
    this.partForm = new FormGroup({
      name: new FormControl('', Validators.required),
      responsibleId: new FormControl('', Validators.required),
      parentName: new FormControl('')
    });
  }

  addUser(){
    this.organService.addUser(UserModel.convertToObject(this.userForm.value))
        .then((res) => {
          let tempUser = new UserModel();
          tempUser.id = res.json();
          tempUser.name = this.userForm.value.name;
          tempUser.username = this.userForm.value.username;
          tempUser.rank = 0;
          tempUser.image = '';
          tempUser.email = this.userForm.value.email;
          tempUser.accessLevel = this.userForm.value.accessLevel;
          this.users.push(tempUser);

          //Clear fields
          this.userForm.value.name = null;
          this.userForm.value.username = null;
          this.userForm.value.email = null;
          this.userForm.value.accessLevel = null;
        })
        .catch((err) => {
          console.log(err);
        });
  }

  addPart(){
    this.organService.addPart({
      name: this.partForm.value.name,
      responsible_id: this.partForm.value.responsibleId,
      parent_organ: (this.partForm.value.parentName === null || this.partForm.value.parentName === '') ? null : this.parts.find(el => el.name === this.partForm.value.parentName).id
    })
        .then((res) => {
          let tempPart = {
            id: res.json().oid,
            name: this.partForm.value.name,
            responsibleName: this.responsibleUsers.find(el => el.id === this.partForm.value.responsibleId).name,
            parent_organ: this.partForm.value.parentName
          };

          this.parts.push(tempPart);

          //Clear fields
          this.partForm.value.name = null;
          this.partForm.value.responsibleId = null;
          this.partForm.value.parent_organ = null;
        })
        .catch((err) => {

        })
  }

  getAccessLevels(){
    this.organService.getAccessLevels()
        .then((res) => {
          this.accessLevels = res;
        })
        .catch((err) => {
          console.log(err);
        })
  }

  getParts(){
    this.organService.getParts()
        .then((res) => {
          this.parts = [];

          for(let item of res){
            this.parts.push({
              id: item.id,
              name: item.name,
              responsibleId: item.responsible_id,
              responsibleName: item.responsible_name,
              responsibleUsername: item.username,
              responsibleEmail: item.email,
              parentName: item.parent_name
            });
          }
        })
        .catch((err) => {
          this.parts = [];
        })
  }

  getUsers(){
    this.organService.getUsers()
      .then((res) => {
        this.users = [];
        for(let item of res)
          this.users.push(UserModel.convertToModel(item));

        this.responsibleUsers = this.users.filter(el => el.accessLevel === 'پاسخگو');
      })
      .catch((err) => {
        console.log(err);
        this.users = [];
      })
  }

  changeTab(event){
    if(event.index === 0) {
      this.initUserForm();
      this.getAccessLevels();
      this.getUsers();
    }
    else {
      this.responsibleUsers = this.users.filter(el => el.accessLevel === 'پاسخگو');
      this.initPartForm();
      this.getParts();
    }
  }
}
