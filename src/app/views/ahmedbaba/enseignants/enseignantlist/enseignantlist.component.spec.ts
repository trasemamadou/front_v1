import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantlistComponent } from './enseignantlist.component';

describe('EnseignantlistComponent', () => {
  let component: EnseignantlistComponent;
  let fixture: ComponentFixture<EnseignantlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
