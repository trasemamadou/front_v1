import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereinfoComponent } from './matiereinfo.component';

describe('MatiereinfoComponent', () => {
  let component: MatiereinfoComponent;
  let fixture: ComponentFixture<MatiereinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatiereinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatiereinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
