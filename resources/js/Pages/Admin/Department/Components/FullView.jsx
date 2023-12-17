import {Navigate, Views} from "react-big-calendar";
import localizer from "@/Services/jalaliLocalizer";
import * as RBC from "react-big-calendar";
import React, {useMemo} from "react";
import {lang, Event} from "@/Components/FullCalendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import * as dates from 'date-arithmetic';


const FullView = ({events, defaultDate, onNavigate, onView = null, hiddenTime = false}) => {
    const {views} = React.useMemo(() => ({
        views: {
            day: true,
        }
    }), [])
    // console.log();
    console.log(new Date(new Date(defaultDate).setHours(23)));
    return <RBC.Calendar onNavigate={onNavigate}
                         defaultDate={defaultDate ? new Date(defaultDate) : new Date()}
                         defaultView={Views.DAY}
                         className={`hidden-title ${hiddenTime ? "hidden-time" : ""}`}
                         style={{minHeight: "800px"}}
                         localizer={localizer}
                         events={events}
                         // min={new Date(new Date(defaultDate).setHours(0))}
                         // max={new Date(new Date(defaultDate).setHours(20))}
                         startAccessor="start"
                         endAccessor="end"
                         culture={"fa-IR"}
                         rtl={true}
                         messages={lang}
                         onView={onView}
                         firstDayOfWeek={6}
                         views={views}
                         toolbar={false}
                         components={{
                             eventWrapper: Event
                         }}
    />;
}

export default FullView;
