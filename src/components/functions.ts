import { Locale, format, setDefaultOptions } from "date-fns";
import { enUS, srLatn } from "date-fns/locale";
import { Event } from "./types";

export const getLocale = (locale: string): Locale => {
  switch (locale) {
    case "en-US":
      return enUS;
    case "sr":
      return srLatn;
    default:
      return enUS;
  }
};

export const setCurrentLocaleAsDefault = (): void => {
  const locale = navigator.language;
  const localeObject = getLocale(locale);
  setDefaultOptions({ locale: localeObject });
};

export const makeEvent = (selectedDay: Date): Event => {
  const time = navigator.language === "sr" ? "17:00" : "5:00 PM";
  return {
    id: 0, // will be changed in handleAddEvent
    date: format(selectedDay, "do MMMM yyyy."),
    time,
    datetime: format(selectedDay, "yyyy-MM-dd") + "T17:00",
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  };
};
