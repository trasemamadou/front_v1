import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignementlistComponent } from './enseignementlist.component';

describe('EnseignementlistComponent', () => {
  let component: EnseignementlistComponent;
  let fixture: ComponentFixture<EnseignementlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignementlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
