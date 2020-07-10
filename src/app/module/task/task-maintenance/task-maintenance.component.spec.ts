import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMaintenanceComponent } from './task-maintenance.component';

describe('TaskMaintenanceComponent', () => {
  let component: TaskMaintenanceComponent;
  let fixture: ComponentFixture<TaskMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
