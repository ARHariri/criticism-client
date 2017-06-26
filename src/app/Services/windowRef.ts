/**
 * Created by Ali on 6/2/2017.
 */
import {Injectable} from "@angular/core";

function _window(){
  return window;
}

@Injectable()
export class WindowRef{
  constructor(){}

  getWindow(){
    return _window();
  }
}