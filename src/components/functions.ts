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
  return {
    id: 0, // will be changed in handleAddEvent
    date: selectedDay,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  };
};
