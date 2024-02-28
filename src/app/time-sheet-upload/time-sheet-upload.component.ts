import { Component } from '@angular/core';
import { TimeSheetService } from '../time-sheet.service';


@Component({
  selector: 'app-time-sheet-upload',
  standalone: true,
  imports: [], 
  templateUrl: './time-sheet-upload.component.html',
  styleUrl: './time-sheet-upload.component.scss'
})
export class TimeSheetUploadComponent {
  // Inject the TimeSheetService to handle the uploaded file
  constructor(private timeSheetService: TimeSheetService) {}

  // Define the onFileSelected method to handle file input change events
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Use the TimeSheetService to read and process the CSV file
      this.timeSheetService.readCsvData(file);
    }
  }
}
