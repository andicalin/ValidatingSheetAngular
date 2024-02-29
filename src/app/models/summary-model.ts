// Summarizes the time sheet data for a single day
export interface Summary {
    date: Date;
    hoursWorked: number;
    numEntries: number;
    flags: string[];
  }
  
  