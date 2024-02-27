import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetTableComponent } from './time-sheet-table.component';

describe('TimeSheetTableComponent', () => {
  let component: TimeSheetTableComponent;
  let fixture: ComponentFixture<TimeSheetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSheetTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeSheetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
