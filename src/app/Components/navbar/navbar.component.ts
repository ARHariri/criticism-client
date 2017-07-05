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
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, public dialog: MdDialog) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(
      (data) => this.isLoggedIn = data,
      (err) => console.log(err)
    );

    this.authService.name.subscribe(
      (data) => this.userName = data,
      (err) => console.log(err)
    );
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
