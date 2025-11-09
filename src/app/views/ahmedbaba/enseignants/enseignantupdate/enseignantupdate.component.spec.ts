import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantupdateComponent } from './enseignantupdate.component';

describe('EnseignantupdateComponent', () => {
  let component: EnseignantupdateComponent;
  let fixture: ComponentFixture<EnseignantupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
