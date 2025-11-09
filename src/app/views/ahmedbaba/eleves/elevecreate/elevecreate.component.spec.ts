import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevecreateComponent } from './elevecreate.component';

describe('ElevecreateComponent', () => {
  let component: ElevecreateComponent;
  let fixture: ComponentFixture<ElevecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElevecreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
