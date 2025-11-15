import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametragelistComponent } from './parametragelist.component';

describe('ParametragelistComponent', () => {
  let component: ParametragelistComponent;
  let fixture: ComponentFixture<ParametragelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametragelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametragelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
