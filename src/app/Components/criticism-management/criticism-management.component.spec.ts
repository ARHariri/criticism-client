import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticismManagementComponent } from './criticism-management.component';

describe('CriticismManagementComponent', () => {
  let component: CriticismManagementComponent;
  let fixture: ComponentFixture<CriticismManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticismManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticismManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
