import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import * as Papa from 'papaparse';

interface TimeSheetEntry {
  startDateTime: Date;
  endDateTime: Date;
  overlapping?: boolean; // Optional property to indicate if the entry overlaps with another
}

interface DailySummary {
  hoursWorked: number;
  numEntries: number;
  flags: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
  // BehaviorSubject to hold the time sheet data. It's initialized with an empty array.
  private timeSheetData = new BehaviorSubject<any[]>([]);

  // Publicly exposed observable for components to subscribe to.
  public timeSheetData$ = this.timeSheetData.asObservable();

  constructor() {}


  // Method to read and parse the CSV file. It takes a File object as input.
  readCsvData(file: File): void {
    Papa.parse(file, {
      complete: (result) => {
        console.log(result.data); // Logging the parsed data to the console for debugging.
        // Update the BehaviorSubject with the new data.
        this.timeSheetData.next(result.data);
      },
      header: true, // Assuming the CSV has headers. This maps each row to an object with property names derived from the headers.
      skipEmptyLines: true, // Skips empty lines to ensure clean data.
      dynamicTyping: true, // Automatically converts strings to numbers, booleans, and nulls where appropriate.
    });
  }


  // method to validate time sheet data for overlaps
  validateDataForOverlaps(data: any[]): { isValid: boolean, overlaps: any[] } {
    let isValid = true;
    const overlaps = [];

    // Sort data by startDateTime for easier comparison
    const sortedData = data.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());

    for (let i = 0; i < sortedData.length - 1; i++) {
      for (let j = i + 1; j < sortedData.length; j++) {
        if (new Date(sortedData[i].endDateTime) > new Date(sortedData[j].startDateTime)) {
          // Overlap detected
          isValid = false;
          overlaps.push({ first: sortedData[i], second: sortedData[j] });
          // Assuming we break after finding the first overlap for a pair
          break;
        }
      }
    }

    return { isValid, overlaps };
  }


  //Method to summarize the hours worked daily
  summarizeDailyHours(data: TimeSheetEntry[]): DailySummary[] {
    const summary: { [date: string]: DailySummary } = {};

    data.forEach(entry => {
      const date = entry.startDateTime.toDateString();
      const hoursWorked = (entry.endDateTime.getTime() - entry.startDateTime.getTime()) / (1000 * 60 * 60);

      if (!summary[date]) {
        summary[date] = { hoursWorked: 0, numEntries: 0, flags: '' };
      }

      summary[date].hoursWorked += hoursWorked;
      summary[date].numEntries++;

      // Additional checks for flags could go here
    });

    return Object.keys(summary).map(date => ({
      date,
      ...summary[date],
      hoursWorked: parseFloat(summary[date].hoursWorked.toFixed(2)), // Ensuring hoursWorked is a number with 2 decimal places
    }));
  }

  
  getSummaryData(): Observable<any[]> {
    // Placeholder for the actual summarization logic
    // This should return an Observable of the summary data
    return this.timeSheetData$.pipe(
      map(data => this.summarizeData(data)), // Assuming summarizeData is a method that summarizes your data
    );
  }
  
  // Example summarization method 
  private summarizeData(data: any[]): any[] {
    const summary = data.reduce((acc, curr) => {
      // Summarization logic here
      // For example, aggregate hours worked per day, count entries, and identify flags
      return acc;
    }, {});
  
    // Convert summary object into an array or whatever format you need for display
    return Object.values(summary);
  }
}
