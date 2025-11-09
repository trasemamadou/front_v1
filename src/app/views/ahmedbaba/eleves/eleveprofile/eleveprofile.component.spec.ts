import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveprofileComponent } from './eleveprofile.component';

describe('EleveprofileComponent', () => {
  let component: EleveprofileComponent;
  let fixture: ComponentFixture<EleveprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleveprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleveprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
