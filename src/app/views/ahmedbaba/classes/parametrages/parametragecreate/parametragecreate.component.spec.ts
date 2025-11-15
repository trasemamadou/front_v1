import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametragecreateComponent } from './parametragecreate.component';

describe('ParametragecreateComponent', () => {
  let component: ParametragecreateComponent;
  let fixture: ComponentFixture<ParametragecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametragecreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametragecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
