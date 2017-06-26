import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {WindowRef} from "../../Services/windowRef";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() kind: string = '';
  @Output() filtering = new EventEmitter();

  title: string = null;
  tags: string = null;
  criticismVote: number = null;
  replyVote: number = null;
  advanceVisibility: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  displayAdvance(){
    this.advanceVisibility = !this.advanceVisibility;
  }

  filter(){
    let filterObj = {
      title: (this.title === '' || this.title === null ) ? null : this.title.trim(),
      tags: (this.tags === '' || this.tags === null) ? null : this.tags.trim(),
      criticismVote: this.criticismVote,
      replyVote: this.replyVote
    };

    this.filtering.emit(filterObj);
  }

  remove(object: string){
    switch (object){
      case 'title': this.title = null;
        break;
      case 'tags': this.tags = null;
        break;
      case 'criticismVote': this.criticismVote = null;
        break;
      case 'replyVote': this.replyVote = null;
        break;
      case 'all': {
        this.title = null;
        this.tags = null;
        this.criticismVote = null;
        this.replyVote = null;
      }
      break;
      default: console.log('Object not found');
        break;
    }

    this.filter();
  }
}
