import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticismComponent } from './criticism.component';

describe('CriticismComponent', () => {
  let component: CriticismComponent;
  let fixture: ComponentFixture<CriticismComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticismComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
