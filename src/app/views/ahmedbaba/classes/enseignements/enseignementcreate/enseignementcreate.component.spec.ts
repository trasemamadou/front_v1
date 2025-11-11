import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignementcreateComponent } from './enseignementcreate.component';

describe('EnseignementcreateComponent', () => {
  let component: EnseignementcreateComponent;
  let fixture: ComponentFixture<EnseignementcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignementcreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignementcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
