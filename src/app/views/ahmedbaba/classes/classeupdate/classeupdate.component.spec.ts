import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseupdateComponent } from './classeupdate.component';

describe('ClasseupdateComponent', () => {
  let component: ClasseupdateComponent;
  let fixture: ComponentFixture<ClasseupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasseupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
