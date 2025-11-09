import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantprofileComponent } from './enseignantprofile.component';

describe('EnseignantprofileComponent', () => {
  let component: EnseignantprofileComponent;
  let fixture: ComponentFixture<EnseignantprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
