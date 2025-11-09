import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationcreateComponent } from './facturationcreate.component';

describe('FacturationcreateComponent', () => {
  let component: FacturationcreateComponent;
  let fixture: ComponentFixture<FacturationcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturationcreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturationcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
