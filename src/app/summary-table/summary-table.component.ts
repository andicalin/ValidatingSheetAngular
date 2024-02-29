import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf and *ngFor
import { TimeSheetService } from '../time-sheet.service';
import { Summary } from '../models/summary-model';


@Component({
  selector: 'app-summary-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-table.component.html',
  styleUrl: './summary-table.component.scss'
  
})
export class SummaryTableComponent implements OnInit {
  summaryData: Summary[] = []; // Array to store summary data
  expandedRows = new Set<number>(); // Set to keep track of expanded rows by their indices

  constructor(private timeSheetService: TimeSheetService) {}

  ngOnInit(): void {
    // Assuming a method getSummaryData() that returns the summarized data as an observable
    this.timeSheetService.getSummaryData().subscribe(data => {
      this.summaryData = data;
    });
  }

  // Function to toggle the expansion state of a row by its index
  toggleRow(index: number): void {
    if (this.expandedRows.has(index)) {
      this.expandedRows.delete(index); // Collapse the row if it's already expanded
    } else {
      this.expandedRows.add(index); // Expand the row if it's collapsed
    }
  }
}
