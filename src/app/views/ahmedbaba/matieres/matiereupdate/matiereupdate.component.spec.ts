import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereupdateComponent } from './matiereupdate.component';

describe('MatiereupdateComponent', () => {
  let component: MatiereupdateComponent;
  let fixture: ComponentFixture<MatiereupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatiereupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatiereupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
