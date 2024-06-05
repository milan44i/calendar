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
