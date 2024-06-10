import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  CalendarIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  startOfWeek,
  endOfWeek,
  getMonth,
} from "date-fns";
import React, { ReactElement, useState } from "react";
import Calendar from "./Calendar";
import { makeEvent } from "./functions";
import clsx from "clsx";
import { mockEvents } from "./data";
import { Event } from "./types";

const EventCalendar: React.FC = (): ReactElement => {
  const [events, setEvents] = useState(mockEvents);
  const [monthDeviation, setMonthDeviation] = useState(0);
  const [yearDeviation, setYearDeviation] = useState(0);
  const [selectedDay, setSelectedDay] = useState(new Date());

  const currentMonth = getMonth(new Date());
  const selectedMonth = (currentMonth + monthDeviation + 12) % 12; // 0-11
  const currentYear = new Date().getFullYear();
  const selectedYear = currentYear + yearDeviation;

  const start = startOfWeek(
    startOfMonth(new Date(currentYear + yearDeviation, selectedMonth, 1)),
    {
      weekStartsOn: 1,
    }
  );
  const end = endOfWeek(
    endOfMonth(new Date(currentYear + yearDeviation, selectedMonth, 1)),
    {
      weekStartsOn: 1,
    }
  );
  const dates = eachDayOfInterval({
    start,
    end,
  });

  const handleSelectedDay = (date: Date) => {
    setSelectedDay(date);
  };

  const handlePrevMonth = () => {
    setMonthDeviation((prevMonth) => {
      if (selectedMonth === 0) {
        setYearDeviation((prevYear) => prevYear - 1);
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setMonthDeviation((prevMonth) => {
      if (selectedMonth === 11) {
        setYearDeviation((prevYear) => prevYear + 1);
      }
      return prevMonth + 1;
    });
  };

  const handleAddEvent = (event: Event) => {
    setEvents((prev) => [...prev, { ...event, id: prev.length + 1 }]);
  };

  return (
    <div className="m-28 px-20 py-6 border-neutral-200 border rounded-lg">
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Upcoming events
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <Calendar
            selectedDay={selectedDay}
            handleSelectedDay={handleSelectedDay}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            monthDeviation={monthDeviation}
            dates={dates}
            events={events}
            year={selectedYear}
          />
          <button
            type="button"
            className="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handleAddEvent(makeEvent(selectedDay))}
          >
            Add event
          </button>
        </div>
        {events.length > 0 ? (
          <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
            {events.map((event) => (
              <li
                key={event.id}
                className="relative flex space-x-6 py-6 xl:static"
              >
                <img
                  src={event.imageUrl}
                  alt=""
                  className="h-14 w-14 flex-none rounded-full"
                />
                <div className="flex-auto">
                  <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                    {event.name}
                  </h3>
                  <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                    <div className="flex items-start space-x-3">
                      <dt className="mt-0.5">
                        <span className="sr-only">Date</span>
                        <CalendarIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd>
                        <time
                          dateTime={format(
                            event.datetime,
                            "yyyy-MM-dd'T'HH:mm"
                          )}
                        >
                          {event.date} at {event.time}
                        </time>
                      </dd>
                    </div>
                    <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                      <dt className="mt-0.5">
                        <span className="sr-only">Location</span>
                        <MapPinIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd>{event.location}</dd>
                    </div>
                  </dl>
                </div>
                <Menu
                  as="div"
                  className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
                >
                  <div>
                    <MenuButton className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <EllipsisHorizontalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </MenuButton>
                  </div>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={clsx(
                                focus
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Edit
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={clsx(
                                focus
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Cancel
                            </a>
                          )}
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Transition>
                </Menu>
              </li>
            ))}
          </ol>
        ) : (
          <div>Empty State</div>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
