import { monNames } from "constant/calendar";

export const getDateMonth = (day: Date) => monNames[day.getMonth()];
