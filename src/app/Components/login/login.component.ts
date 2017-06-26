import { Component, OnInit } from '@angular/core';

import {AuthService} from "../../Services/auth.service";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, public dialogRef: MdDialogRef<LoginComponent>) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(
        (data) => {
          if(data)
            this.dialogRef.close();
        }
    )
  }

  login(){
    if(this.username !== '' && this.password !== '')
      this.authService.login(this.username, this.password);
  }
}
