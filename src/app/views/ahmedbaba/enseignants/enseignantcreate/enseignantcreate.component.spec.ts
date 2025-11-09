import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantcreateComponent } from './enseignantcreate.component';

describe('EnseignantcreateComponent', () => {
  let component: EnseignantcreateComponent;
  let fixture: ComponentFixture<EnseignantcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantcreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
