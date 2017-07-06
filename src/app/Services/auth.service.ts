import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {HttpService} from "./http.service";
import { CookieService } from 'ng2-cookies';

@Injectable()
export class AuthService implements CanActivate{
  name: BehaviorSubject<string> = new BehaviorSubject('');
  userName: BehaviorSubject<string> = new BehaviorSubject('');
  access_level: BehaviorSubject<string> = new BehaviorSubject('عادی');
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  email: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private router: Router, private httpService: HttpService,
              private cookieService: CookieService) {
    this.httpService.update('isloggedIn', null, {username: this.userName}).subscribe(
      (data) => {
        console.log(data);
        let dataObj = data.json();
        this.name.next(dataObj.name);
        this.userName.next(dataObj.username);
        this.access_level.next(dataObj.access_level);

        this.isLoggedIn.next(true);
        this.cookieService.set('token', dataObj.token, 3);
        this.cookieService.set('criticism_username', dataObj.username, 3);
      },
      (err) => {
        switch (err.status){
          case 403: {
            this.isLoggedIn.next(false);
            this.cookieService.delete('token');
            this.cookieService.delete('criticism_username');
          }
          case 500: {
            console.log('Error:' + err);
          }
        }
      }
    );
  }

  canActivate(): boolean{
    return this.isLoggedIn.getValue();
  }

  login(username: string, password: string){
    this.httpService.update('login', null, {username: username, password: password}).subscribe(
      (data) => {
        let dataObj = data.json();
        this.cookieService.set('token', dataObj.token, 3);
        this.cookieService.set('criticism_username', dataObj.username, 3);
        this.isLoggedIn.next(true);
        this.name.next(dataObj.name);
        this.userName.next(dataObj.username);
        this.access_level.next(dataObj.access_level);
        this.email.next(dataObj.email);
      },
      (err) => console.log('The username or password is incorrect')
    );
  }

  logout() {
    this.name.next('');
    this.userName.next('');
    this.access_level.next('عادی');
    this.isLoggedIn.next(false);
    this.router.navigate(['home']);
    this.cookieService.delete('token');
    this.cookieService.delete('criticism_username');
  }
}
