import { Routes } from '@angular/router';
import { TimeSheetUploadComponent } from './time-sheet-upload/time-sheet-upload.component'; 
import { TimeSheetTableComponent } from './time-sheet-table/time-sheet-table.component'; 
import { SummaryTableComponent } from './summary-table/summary-table.component'; 

export const routes: Routes = [
  { path: 'upload', component: TimeSheetUploadComponent },
  { path: 'table', component: TimeSheetTableComponent },
  { path: 'summary', component: SummaryTableComponent }
];
