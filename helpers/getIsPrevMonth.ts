import { prevMonths } from "constant/calendar";

export const getIsPrevMonth = (month: string) => {
  return prevMonths.some((prevMonth) => month === prevMonth);
};
