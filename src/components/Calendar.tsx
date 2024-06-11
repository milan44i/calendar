import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import React, { ReactElement, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  isSameDay,
  isThisMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Event } from "./types";
import { setCurrentLocaleAsDefault } from "./functions";

interface CalendarProps {
  selectedDay: Date;
  handleSelectedDay: (date: Date) => void;
  events?: Event[];
}

setCurrentLocaleAsDefault();

const weekdays = Array.from({ length: 7 }, (_, i) =>
  format(new Date(1970, 0, i + 5), "EEEEE")
);

const Calendar: React.FC<CalendarProps> = ({
  selectedDay,
  handleSelectedDay,
  events = [],
}): ReactElement => {
  const [monthDeviation, setMonthDeviation] = useState(0);

  const selectedMonthYear = addMonths(new Date(), monthDeviation);
  const monthName = format(addMonths(new Date(), monthDeviation), "LLLL");
  const year = format(addMonths(new Date(), monthDeviation), "yyyy");

  const start = startOfWeek(startOfMonth(selectedMonthYear), {
    weekStartsOn: 1,
  });
  const end = endOfWeek(endOfMonth(selectedMonthYear), {
    weekStartsOn: 1,
  });
  const dates = eachDayOfInterval({
    start,
    end,
  });

  const handlePrevMonth = () => {
    setMonthDeviation((prevMonth) => {
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setMonthDeviation((prevMonth) => {
      return prevMonth + 1;
    });
  };

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
          {monthName} {year}
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
          const hasEvent = events.some((event) =>
            isSameDay(event.datetime as Date, date)
          );
          const isCurrentMonth = isThisMonth(date);
          const currentDaySelected = isSameDay(selectedDay, date);
          const today = isToday(date);

          return (
            <button
              key={date.toISOString()}
              type="button"
              className={clsx(
                "py-1.5 relative hover:bg-gray-100 focus:z-10 text-gray-400",
                isCurrentMonth ? "bg-white" : "bg-gray-50",
                (currentDaySelected || today) && "font-semibold",
                isCurrentMonth && "text-gray-900",
                today && "text-indigo-600",
                currentDaySelected && "text-white"
              )}
              onClick={() => handleSelectedDay(date)}
            >
              <time
                dateTime={date.toString()}
                className={clsx(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  currentDaySelected && "bg-gray-900",
                  currentDaySelected && today && "bg-indigo-600"
                )}
              >
                {getDate(date)}
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
