import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationlistComponent } from './facturationlist.component';

describe('FacturationlistComponent', () => {
  let component: FacturationlistComponent;
  let fixture: ComponentFixture<FacturationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturationlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
