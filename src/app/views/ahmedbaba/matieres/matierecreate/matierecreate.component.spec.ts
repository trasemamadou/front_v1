import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatierecreateComponent } from './matierecreate.component';

describe('MatierecreateComponent', () => {
  let component: MatierecreateComponent;
  let fixture: ComponentFixture<MatierecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatierecreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatierecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
