import { format } from "date-fns";
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

export const makeEvent = (selectedDay: Date): Meeting => {
  const time = navigator.language === "sr" ? "17:00" : "5:00 PM";
  return {
    id: 0,
    date: format(selectedDay, "do MMMM yyyy.", {
      locale: getLocale(navigator.language),
    }),
    time,
    datetime: format(selectedDay, "yyyy-MM-dd") + "T17:00",
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  };
};
