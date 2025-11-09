import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassecreateComponent } from './classecreate.component';

describe('ClassecreateComponent', () => {
  let component: ClassecreateComponent;
  let fixture: ComponentFixture<ClassecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassecreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
