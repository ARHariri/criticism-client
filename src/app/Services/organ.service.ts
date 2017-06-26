import { Injectable } from '@angular/core';

import {HttpService} from "./http.service";

@Injectable()
export class OrganService {

  constructor(private httpService: HttpService) { }

  getUsers(): any{
    return new Promise((resolve, reject) => {
      this.httpService.get('user').subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
      )
    });
  }

  addUser(user): any{
    return new Promise((resolve, reject) => {
      this.httpService.insert('/user', user).subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
      );
    });
  }

  getParts(): any{
    return new Promise((resolve, reject) => {
      this.httpService.get('organ/part').subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
      )
    })
  }

  addPart(part): any{
    return new Promise((resolve, reject) => {
      this.httpService.insert('/organ/part', part).subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
      );
    })
  }

  getAccessLevels(): any{
    return new Promise((resolve, reject) => {
      this.httpService.get('organ/accessLevel').subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
      )
    })
  }
}
