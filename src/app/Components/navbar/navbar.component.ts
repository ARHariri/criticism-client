import { Component, OnInit } from '@angular/core';

import {AuthService} from "../../Services/auth.service";
import {MdDialog} from "@angular/material";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string = '';

  constructor(public authService: AuthService, public dialog: MdDialog) { }

  ngOnInit() {
    this.userName = this.authService.name;
    console.log(this.userName);
  }

  login(){
    let dialogRef = this.dialog.open(LoginComponent, {
      height: '500px',
      width: '400px'
    });
  }

  logout(){
    this.authService.logout();
  }
}
