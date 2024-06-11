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
import { format, getTime } from "date-fns";
import React, { ReactElement } from "react";
import { Event } from "./types";
import { twMerge } from "tailwind-merge";
import { setCurrentLocaleAsDefault } from "./functions";

interface EventsProps {
  events: Event[];
}

setCurrentLocaleAsDefault();

const Events: React.FC<EventsProps> = ({ events }): ReactElement => {
  return events.length > 0 ? (
    <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
      {events.map((event) => {
        const date = format(event.date, "PPP");
        const time = format(getTime(event.date), "p");
        return (
          <li key={event.id} className="relative flex space-x-6 py-6 xl:static">
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
                    <time dateTime={event.date.toString()}>
                      {date} at {time}
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
        );
      })}
    </ol>
  ) : (
    <div>Empty State</div>
  );
};
export default Events;
