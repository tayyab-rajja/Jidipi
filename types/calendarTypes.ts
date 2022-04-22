export interface DaysOfDatePicker {
  isPrevMonth: boolean;
  day: Date;
}

export interface ItemOfDatePicker {
  month: string;
  days: DaysOfDatePicker[];
}
