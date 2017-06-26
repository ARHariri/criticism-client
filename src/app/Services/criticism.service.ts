import { Injectable } from '@angular/core';

import {CriticismModel} from "../models/criticismModel";
import {HttpService} from "./http.service";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class CriticismService {
  criticisms: BehaviorSubject<CriticismModel[]> = new BehaviorSubject([]);

  constructor(private httpService: HttpService) { }

  getAllCriticisms(){
    this.httpService.get('criticism').subscribe(
        (data) => {
          let tempCriticisms = [];

          for(let item of data){
            let value: CriticismModel = new CriticismModel();

            value.id = item.id;
            value.title = item.title;
            value.writerName = item.writerName;
            // value.writerImage = item.writerImage;
            value.tags = this.separateTags(item.tags);
            value.content = item.content;
            value.vote = item.vote;

            tempCriticisms.push(value);
          }
        },
        (err) => console.log(err.message)
    )
  }

  getTopPeople(): any{
    return new Promise((resolve, reject) => {
      this.httpService.get('/user/top').subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            console.log(err);
            reject(err);
          }
      )
    });
  }

  separateTags(tags: string): string[]{
    let result: string[] = [];

    result = tags.split('-');

    for(let item of result){
      item = item.trim();
    }

    return result;
  }
}
