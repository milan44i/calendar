import { format, isThisMonth } from "date-fns";
import { enUS, srLatn } from "date-fns/locale";

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
