import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

import React, { ReactElement } from "react";
import { Meeting } from "./EventCalendar";
import { addMonths, format } from "date-fns";
import { getLocale } from "./functions";

type CalendarProps = {
  selectedDay: number;
  handleSelectedDay: (idx: number) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  monthDeviation: number;
  dates: {
    date: string;
    isCurrentMonth: boolean;
    isToday: boolean;
  }[];
  meetings: Meeting[];
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
          {month}
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
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {dates.map((date, dateIdx) => {
          const hasEvent = meetings.some(
            (meeting) => meeting.datetime.slice(0, 10) === date.date
          );
          return (
            <button
              key={date.date}
              type="button"
              className={twMerge(
                "py-1.5 relative hover:bg-gray-100 focus:z-10",
                date.isCurrentMonth ? "bg-white" : "bg-gray-50",
                (selectedDay === dateIdx || date.isToday) && "font-semibold",
                selectedDay === dateIdx && "text-white",
                selectedDay !== dateIdx &&
                  date.isCurrentMonth &&
                  !date.isToday &&
                  "text-gray-900",
                selectedDay !== dateIdx &&
                  !date.isCurrentMonth &&
                  !date.isToday &&
                  "text-gray-400",
                date.isToday && selectedDay !== dateIdx && "text-indigo-600",
                dateIdx === 0 && "rounded-tl-lg",
                dateIdx === 6 && "rounded-tr-lg",
                dateIdx === dates.length - 7 && "rounded-bl-lg",
                dateIdx === dates.length - 1 && "rounded-br-lg"
              )}
              onClick={() => handleSelectedDay(dateIdx)}
            >
              <time
                dateTime={date.date}
                className={twMerge(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  selectedDay === dateIdx && date.isToday && "bg-indigo-600",
                  selectedDay === dateIdx && !date.isToday && "bg-gray-900"
                )}
              >
                {date.date.split("-").pop()?.replace(/^0/, "")}
              </time>
              <div
                className={twMerge(
                  "w-1 h-1 bg-red-400 absolute bottom-2 left-[47%] rounded-full hidden",
                  hasEvent && "block"
                )}
              ></div>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
