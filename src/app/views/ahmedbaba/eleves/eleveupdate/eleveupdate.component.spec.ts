import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveupdateComponent } from './eleveupdate.component';

describe('EleveupdateComponent', () => {
  let component: EleveupdateComponent;
  let fixture: ComponentFixture<EleveupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleveupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleveupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
