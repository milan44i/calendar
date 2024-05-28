import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isThisMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import React, { ReactElement, useState } from "react";

type Meeting = {
  id: number;
  date: string;
  time: string;
  datetime: string;
  name: string;
  imageUrl: string;
  location: string;
};

type CalendarProps = {
  meetings?: Meeting[];
  handleAddEvent: () => void;
};

// const meetings = [
//   {
//     id: 1,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
//   {
//     id: 2,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
//   {
//     id: 3,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
// ];

const start = startOfWeek(startOfMonth(new Date()));
const end = endOfWeek(endOfMonth(new Date()));

const dates = eachDayOfInterval({
  start,
  end,
}).map((date) => ({
  date: format(date, "yyyy-MM-dd"),
  isCurrentMonth: isThisMonth(date),
  isToday: format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
}));

const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

const Calendar: React.FC<CalendarProps> = ({
  handleAddEvent,
  meetings = [],
}): ReactElement => {
  const [selectedDay, setSelectedDay] = useState(-1);

  const handleSelectedDay = (idx: number) => {
    setSelectedDay(idx);
  };
  return (
    <div className="m-28 px-20 py-6 border-neutral-200 border rounded-lg">
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Upcoming meetings
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">January</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            {weekdays.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {dates.map((date, dateIdx) => (
              <button
                key={date.date}
                type="button"
                className={twMerge(
                  "py-1.5 hover:bg-gray-100 focus:z-10",
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
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleAddEvent}
          >
            Add event
          </button>
        </div>
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="relative flex space-x-6 py-6 xl:static"
            >
              <img
                src={meeting.imageUrl}
                alt=""
                className="h-14 w-14 flex-none rounded-full"
              />
              <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                  {meeting.name}
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
                      <time dateTime={meeting.datetime}>
                        {meeting.date} at {meeting.time}
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
                    <dd>{meeting.location}</dd>
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
                            className={twMerge(
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
                            className={twMerge(
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
      </div>
    </div>
  );
};

export default Calendar;
