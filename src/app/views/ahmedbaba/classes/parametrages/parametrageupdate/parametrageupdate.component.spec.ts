import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageupdateComponent } from './parametrageupdate.component';

describe('ParametrageupdateComponent', () => {
  let component: ParametrageupdateComponent;
  let fixture: ComponentFixture<ParametrageupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrageupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrageupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
