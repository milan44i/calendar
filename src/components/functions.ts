import { format, isThisMonth } from "date-fns";
import { enUS, srLatn } from "date-fns/locale";
import { Meeting } from "./types";

export const getLocale = (locale: string) => {
  switch (locale) {
    case "en-US":
      return enUS;
    case "sr":
      return srLatn;
    default:
      return enUS;
  }
};

export const isCurrentMonth = (date: Date) => isThisMonth(date);
export const isToday = (date: Date) =>
  format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

export const makeEvent = (selectedDay: Date): Meeting => {
  const time = navigator.language === "sr" ? "17:00" : "5:00 PM";
  return {
    id: 0,
    date: format(selectedDay, "do MMMM yyyy.", {
      locale: getLocale(navigator.language),
    }),
    time,
    datetime: format(selectedDay, "yyyy-MM-dd") + "T" + time,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  };
};

export const areDatesEqual = (date1: Date, date2: Date) =>
  format(date1, "yyyy-MM-dd") === format(date2, "yyyy-MM-dd");
