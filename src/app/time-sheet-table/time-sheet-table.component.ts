import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf and *ngFor
import { Subscription } from 'rxjs';
import { TimeSheetService } from '../time-sheet.service';
@Component({
  selector: 'app-time-sheet-table',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for *ngIf and *ngFor directives
  templateUrl: './time-sheet-table.component.html',
  styleUrl: './time-sheet-table.component.scss'
})
export class TimeSheetTableComponent implements OnInit, OnDestroy {
  // Array to store the time sheet data
  public timeSheetData: any[] = [];
  // Subscription to manage the observable subscription
  private subscription: Subscription = new Subscription();

  constructor(private timeSheetService: TimeSheetService) {}

  ngOnInit(): void {
    // Subscribe to the timeSheetData$ observable to receive the time sheet data
    this.subscription.add(this.timeSheetService.timeSheetData$.subscribe(data => {
      this.timeSheetData = data;
    }));
  }

  ngOnDestroy(): void {
    // Ensure we unsubscribe from the observable when the component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  processTimeSheetData(): void {
    // Implementation here. This should trigger data processing.
    // For example, calling a method on the TimeSheetService to process the data
    console.log('Processing time sheet data...');
    // You might call a method from the TimeSheetService, like this:
    // this.timeSheetService.processData(this.timeSheetData);
  }
}
