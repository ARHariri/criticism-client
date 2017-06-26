import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {HttpService} from "./http.service";
import { CookieService } from 'ng2-cookies';

@Injectable()
export class AuthService implements CanActivate{
  name: string = '';
  userName: string = '';
  password: string = '';
  isAdmin: boolean = false;
  access_level: string = 'عادی';
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private httpService: HttpService,
              private cookieService: CookieService) {
    this.httpService.update('isloggedIn', null, {username: this.userName, password: this.password}).subscribe(
      (data) => {
        console.log(data);
        let dataObj = data.json();
        this.name = dataObj.name;
        this.userName = dataObj.username;
        this.access_level = dataObj.access_level;
        this.isAdmin = (dataObj.access_level === 'مدیر') ? true : false;

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
        this.cookieService.set('token', data.json(), 3);
        this.cookieService.set('criticism_username', username, 3);
        this.isLoggedIn.next(true);
      },
      (err) => console.log('The username or password is incorrect')
    );
  }

  logout() {
    // this.restService.update('logout', null, null).subscribe(
    //   (data) => {
    //     this.isLoggedIn.next(false);
    //     this.router.navigate(['login']);
    //   },
    //   (err) => console.log('Error: ' + err)
    // );
    this.isLoggedIn.next(false);
    this.cookieService.delete('token');
    this.cookieService.delete('criticism_username');
  }
}
