import {Navigate, Views} from "react-big-calendar";
import localizer from "@/Services/jalaliLocalizer";
import * as RBC from "react-big-calendar";
import React, {useMemo} from "react";
import {lang, Event} from "@/Components/FullCalendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import * as dates from 'date-arithmetic';


function MyWeek({
                    date,
                    localizer,
                    max = localizer.endOf(new Date(), 'day'),
                    min = localizer.startOf(new Date(), 'day'),
                    scrollToTime = localizer.startOf(new Date(), 'day'),
                    ...props
                }) {
    const currRange = useMemo(
        () => MyWeek.range(date, {localizer}),
        [date, localizer]
    )

    return (
        <TimeGrid
            date={date}
            localizer={localizer}
            max={max}
            min={min}
            range={currRange}
            scrollToTime={scrollToTime}
            {...props}
        />
    )
}

MyWeek.range = (date, {localizer}) => {
    const start = date
    const end = dates.add(start, 0, 'day')

    let current = start
    const range = []

    while (localizer.lte(current, end, 'day')) {
        range.push(current)
        current = localizer.add(current, 1, 'day')
    }
    return range
}

MyWeek.navigate = (date, action, {localizer}) => {
    switch (action) {
        case Navigate.PREVIOUS:
            return localizer.add(date, -1, 'day')

        case Navigate.NEXT:
            return localizer.add(date, 1, 'day')

        default:
            return date
    }
}

MyWeek.title = (date) => {
    return `${date.toLocaleDateString()}`
}


const FullView = ({events, defaultDate, onNavigate, onView = null, hiddenTime = false}) => {
    const {views} = React.useMemo(() => ({
        views: {
            week: MyWeek,
        }
    }), [])
    return <RBC.Calendar onNavigate={onNavigate}
                         defaultDate={defaultDate ? new Date(defaultDate) : new Date()}
                         defaultView={Views.WEEK}
                         className={`hidden-title ${hiddenTime ? "hidden-time" : ""}`}
                         style={{minHeight: "800px"}}
                         localizer={localizer}
                         events={events}
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
