import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Helper to format time nicely
const formatTimeRange = (start, end) => {
  return `${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

// Custom event UI component
const CustomEvent = ({ event }) => {
  let bg = "bg-indigo-100 border-indigo-500 text-indigo-900";
  if (event.title.toLowerCase().includes("qa")) {
    bg = "bg-amber-100 border-amber-500 text-amber-900";
  } else if (event.title.toLowerCase().includes("ui")) {
    bg = "bg-emerald-100 border-emerald-500 text-emerald-900";
  }

  return (
    <div
      className={`rounded-xl px-3 py-2 text-sm border-l-4 shadow-sm ${bg} flex flex-col`}
    >
      <span className="font-semibold">{event.title}</span>
      <span className="text-xs font-medium">
        {formatTimeRange(event.start, event.end)}
      </span>
    </div>
  );
};

const InterviewCalendar = ({ height = 500 }) => {
  const today = new Date();

  const [events] = useState([
    {
      title: "Technical Lead",
      start: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        10,
        30
      ),
      end: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        11,
        30
      ),
    },
    {
      title: "QA Manager",
      start: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        13,
        30
      ),
      end: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        14,
        30
      ),
    },
    {
      title: "UI Designer: R2",
      start: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        17,
        0
      ),
      end: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        18,
        30
      ),
    },
  ]);

  return (
    <div
      className="bg-white border rounded-lg shadow-md p-4 flex flex-col"
      style={{ height }}
    >
      <h2 className="text-l font-bold mb-4 text-gray-800">
        Interview Calendar
      </h2>
      <div className="overflow-y-auto flex-1 rounded-lg">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="day"
          views={["day"]}
          defaultDate={today}
          step={30}
          timeslots={1}
          style={{ height: "100%" }}
          components={{ event: CustomEvent }}
          eventPropGetter={() => ({
            className: "p-0",
          })}
        />
      </div>
    </div>
  );
};

export default InterviewCalendar;
