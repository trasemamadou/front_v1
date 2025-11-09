import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevelistComponent } from './elevelist.component';

describe('ElevelistComponent', () => {
  let component: ElevelistComponent;
  let fixture: ComponentFixture<ElevelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElevelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
