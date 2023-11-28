import React from "react";
import * as RBC from "react-big-calendar";
import {Container} from "@mui/material";
import localizer from "@/Services/jalaliLocalizer";
import PropTypes from 'prop-types'
import "../../css/calndar.scss";
import ErrorBoundary from "@/Components/ErrorBoundary";
import CustomWeekView from "@/Components/CustomWeekView";
import {Views} from "react-big-calendar";


export const lang = {
    week: "هفته",
    work_week: "هفته کاری",
    day: "روز",
    month: "ماه",
    previous: "قبل",
    next: "بعد",
    today: "امروز",
    agenda: "جدول",
    date: "تاریخ",
    time: "زمان",
    event: "رویداد",
    allDay: "همه ی روز",
    yesterday: "دیروز",
    tomorrow: "فردا",

    noEventsInRange: "رویدادی یافت نشد.",
    showMore: function showMore(total) {
        return "+" + total + " بیشتر";
    },
};

export function Event({event, children}) {
    return (
        <div className={event.className}>
            {children}
        </div>
    )
}

Event.propTypes = {
    event: PropTypes.object,
}

const FullCalendar = ({onNavigate, defaultDate, defaultView, events = [],onView=null}) => {

    const {views} = React.useMemo(() => ({
        views: {
            month: true,
            week: CustomWeekView,
            day: true,
            agenda: true
        },
    }), [])
    return <Container sx={{minHeight: "800px"}}>
        <RBC.Calendar onNavigate={onNavigate}
                      defaultDate={defaultDate ? new Date(defaultDate) : new Date()}
                      defaultView={defaultView ? Views[defaultView] : Views.MONTH}
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
                      components={{
                          eventWrapper: Event
                      }}
        />
    </Container>;
}

export default FullCalendar;
