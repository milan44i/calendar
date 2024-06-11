import React, { ReactElement, useState } from "react";
import Calendar from "./Calendar";
import { makeEvent, setCurrentLocaleAsDefault } from "./functions";
import { mockEvents } from "./data";
import { Event } from "./types";
import Events from "./Events";

setCurrentLocaleAsDefault();

const EventCalendar: React.FC = (): ReactElement => {
  const [events, setEvents] = useState(mockEvents);
  const [selectedDay, setSelectedDay] = useState(new Date());

  const handleSelectedDay = (date: Date) => {
    setSelectedDay(date);
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
            events={events}
          />
          <button
            type="button"
            className="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handleAddEvent(makeEvent(selectedDay))}
          >
            Add event
          </button>
        </div>
        <Events events={events} />
      </div>
    </div>
  );
};

export default EventCalendar;
