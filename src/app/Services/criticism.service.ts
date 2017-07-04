import {Injectable} from '@angular/core';

import {CriticismModel} from "../models/criticismModel";
import {HttpService} from "./http.service";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class CriticismService {
  criticisms: BehaviorSubject<CriticismModel[]> = new BehaviorSubject([]);
  subjects: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private httpService: HttpService) {
  }

  getAllCriticisms() {
    this.httpService.get('criticism').subscribe(
      (data) => {
        let tempCriticisms = [];

        for (let item of data) {
          let value: CriticismModel = new CriticismModel();

          value.id = item.cid;
          value.subject = item.subject;
          value.writerName = item.creator_name;
          // value.writerImage = item.writerImage;
          value.tags = (item.tags === null) ? null : this.separateTags(item.tags);
          value.content = item.content;
          value.vote = item.rank;

          tempCriticisms.push(value);
        }

        this.criticisms.next(tempCriticisms);
      },
      (err) => console.log(err.message)
    )
  }

  getAllNotReplyCriticisms(): any{
    return new Promise((resolve, reject) => {
      this.httpService.get('criticism/notreply').subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  getTopPeople(): any {
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

  separateTags(tags: string): string[] {
    let result: string[] = [];

    result = tags.split('-');

    for (let item of result) {
      item = item.trim();
    }

    return result;
  }

  getSubjects(){
    this.httpService.get('criticism/subject')
      .subscribe(
        (data) => this.subjects.next(data),
        (err) => console.log(err)
      );
  }

  addCriticism(data){
    return new Promise((resolve, reject) => {
      let tempSubject = this.subjects.getValue().find(el => el.name === data.subject);

      let tempModel = new CriticismModel();
      tempModel.content = data.content;
      tempModel.responsibleName = data.part.name;
      tempModel.responsibleId = data.part.id;
      tempModel.subject = data.subject;
      tempModel.tags = (data.tags === null) ? null : this.separateTags(data.tags);
      tempModel.subject_id = (tempSubject === undefined) ? null : tempSubject.sid;

      this.httpService.insert('criticism', CriticismModel.convertToObject(tempModel)).subscribe(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  addReply(data){
    return new Promise((resolve, reject) => {
      this.httpService.insert('reply', data).subscribe(
        (res) => resolve(res),
        (err) => reject(err)
      );
    })
  }

  getReply(criticism_id){
    return new Promise((resolve, reject) => {
      this.httpService.get('reply/' + criticism_id).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  votingCriticisms(cid, vote){
    return new Promise((resolve, reject) => {
      this.httpService.update('criticism/vote', cid, {value: vote}).subscribe(
        (data) => {
          resolve();
        },
        (err) => {
          reject();
        }
      );
    })
  }

  votingReply(rid, vote){
    return new Promise((resolve, reject) => {
      this.httpService.update('reply/vote', rid, {value: vote}).subscribe(
        (data) => {
          resolve();
        },
        (err) => {
          reject();
        }
      );
    })
  }
}
