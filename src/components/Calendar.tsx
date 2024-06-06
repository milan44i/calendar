import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import React, { ReactElement } from "react";
import { addMonths, format, isToday } from "date-fns";
import { areDatesEqual, getLocale, isCurrentMonth } from "./functions";
import { Meeting } from "./types";

type CalendarProps = {
  selectedDay: Date;
  handleSelectedDay: (date: Date) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  monthDeviation: number;
  dates: Date[];
  meetings: Meeting[];
  year: number;
};

const locale = navigator.language;
const localeObject = getLocale(locale);

const weekdays =
  locale === "en-US"
    ? ["M", "T", "W", "T", "F", "S", "S"]
    : ["P", "U", "S", "Č", "P", "S", "N"];

const Calendar: React.FC<CalendarProps> = ({
  selectedDay,
  handleSelectedDay,
  handlePrevMonth,
  handleNextMonth,
  monthDeviation,
  dates,
  meetings,
  year,
}): ReactElement => {
  const month = format(addMonths(new Date(), monthDeviation), "LLLL", {
    locale: localeObject,
  });

  return (
    <>
      <div className="flex items-center text-gray-900">
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={handlePrevMonth}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto text-sm font-semibold capitalize">
          {month} {year}
        </div>
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={handleNextMonth}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        {weekdays.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200 overflow-hidden">
        {dates.map((date) => {
          const formattedDate = format(date, "yyyy-MM-dd");
          const hasEvent = meetings.some((meeting) =>
            areDatesEqual(meeting.datetime as Date, date)
          );
          return (
            <button
              key={date.toISOString()}
              type="button"
              className={clsx(
                "py-1.5 relative hover:bg-gray-100 focus:z-10 text-gray-400",
                isCurrentMonth(date) ? "bg-white" : "bg-gray-50",
                (areDatesEqual(selectedDay, date) || isToday(date)) &&
                  "font-semibold",
                isCurrentMonth(date) && "text-gray-900",
                isToday(date) && "text-indigo-600",
                areDatesEqual(selectedDay, date) && "text-white"
              )}
              onClick={() => handleSelectedDay(date)}
            >
              <time
                dateTime={formattedDate}
                className={clsx(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  areDatesEqual(selectedDay, date) && "bg-gray-900",
                  areDatesEqual(selectedDay, date) &&
                    isToday(date) &&
                    "bg-indigo-600"
                )}
              >
                {formattedDate.split("-").pop()?.replace(/^0/, "")}
              </time>
              <div
                className={clsx(
                  "w-1 h-1 bg-red-400 absolute bottom-2 left-[46%] rounded-full hidden",
                  hasEvent && "!block"
                )}
              />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
