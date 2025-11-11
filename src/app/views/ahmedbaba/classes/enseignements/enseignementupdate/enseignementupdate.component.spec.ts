import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignementupdateComponent } from './enseignementupdate.component';

describe('EnseignementupdateComponent', () => {
  let component: EnseignementupdateComponent;
  let fixture: ComponentFixture<EnseignementupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignementupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignementupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
