import { iDay, monNames, temp } from "constant/calendar";
import { ItemOfDatePicker } from "types/calendarTypes";
import { getEmptyCalendarItem } from "helpers/getEmptyCalendarItem";

const getDateEnd = function (days: number, date: Date) {
  let dat = new Date(date.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

export const getCalendarDatas = (year: number) => {
  const datas: ItemOfDatePicker[] = [];
  let dateStart: any = new Date(year, 0, 1);
  let dateEnd: any = getDateEnd(365, dateStart);

  let item: ItemOfDatePicker = getEmptyCalendarItem();

  let couter = 1;

  let past = [];
  let testDate = dateStart;
  let iDayOfWeek = temp[testDate.getDay()];

  for (let i = iDayOfWeek; i >= 0; i--) {
    past.push(testDate);
    testDate -= iDay;
  }

  for (let i = past.length - 1; i > 0; i--) {
    let thisDay = new Date(past[i]);
    let month = monNames[thisDay.getMonth()];

    item.days.push(thisDay);
    item.month = month;

    if (couter % 7 === 0) {
      datas.push(item);
      item = getEmptyCalendarItem();
    }
    couter++;
  }

  iDayOfWeek = new Date(dateEnd.valueOf() + iDay).getDay();

  if (iDayOfWeek < 7) {
    dateEnd = dateEnd.valueOf() + (7 - iDayOfWeek) * iDay;
  }

  for (let i = dateStart.valueOf(); i < dateEnd.valueOf(); i += iDay) {
    const thisDay = new Date(i);
    const month = monNames[thisDay.getMonth()];
    item.days.push(thisDay);

    if (!item.month) {
      item.month = month;
    }

    if (couter % 7 === 0) {
      if (!item.month) {
        item.month = month;
      }
      datas.push(item);
      item = getEmptyCalendarItem();
    }
    couter++;
  }

  return datas;
};
