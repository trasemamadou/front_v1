import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationinfoComponent } from './facturationinfo.component';

describe('FacturationinfoComponent', () => {
  let component: FacturationinfoComponent;
  let fixture: ComponentFixture<FacturationinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturationinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturationinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
