import { Injectable } from '@angular/core';
import {MdSnackBar} from "@angular/material";

@Injectable()
export class MessageService {

  constructor(public snackBar: MdSnackBar) { }

  message(msg: string){
    this.snackBar.open(msg, null, {
      duration: 2000,
      extraClasses: ['normal-message']
    });
  }

  error(msg: string){
    this.snackBar.open(msg, 'خطا', {
      duration: 5000,
      extraClasses: ['error-message']
    });
  }

  warn(msg: string){
    this.snackBar.open(msg, 'هشدار', {
      duration: 3000,
      extraClasses: ['warn-message']
    })
  }
}
