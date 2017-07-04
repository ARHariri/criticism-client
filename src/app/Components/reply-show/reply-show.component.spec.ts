import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyShowComponent } from './reply-show.component';

describe('ReplyShowComponent', () => {
  let component: ReplyShowComponent;
  let fixture: ComponentFixture<ReplyShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
