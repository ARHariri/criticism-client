import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class HttpService {
  baseAddress = '/api/';
  constructor(private http: Http) { }

  insert(api: string, values: any): Observable<any>{
    return this.http.put(this.baseAddress + api, values, {
      withCredentials: true
    });
  }
  //
  // delete(api: string, id: number): Observable<any>{
  //
  // }
  //
  update(api: string, id: number, values: any): Observable<any>{
    return this.http.post(this.baseAddress + api + (id ? '/' + id : ''), values, {
      withCredentials: true
    });
  }

  get(api: string): Observable<any>{
    return this.http.get(this.baseAddress + api, {
      withCredentials: true
    }).map((data: Response) => data.json());
  }
}
