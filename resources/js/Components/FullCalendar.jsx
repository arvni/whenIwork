import React from "react";
import * as RBC from "react-big-calendar";
import {Container} from "@mui/material";
import localizer from "@/Services/jalaliLocalizer";
import PropTypes from 'prop-types'
import "../../css/calndar.scss";
import ErrorBoundary from "@/Components/ErrorBoundary";


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

function Event({ event,children,...rest }) {
    return (
        <div className={event.className}>
            {children}
    </div>
    )
}
Event.propTypes = {
    event: PropTypes.object,
}

const FullCalendar = ({onNavigate,events = [],}) => {

    return <Container sx={{minHeight: "800px"}}>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <RBC.Calendar onNavigate={onNavigate}
                style={{minHeight: "800px"}}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                culture={"fa-IR"}
                rtl={true}
                messages={lang}
                firstDayOfWeek={6}
                components={{
                    eventWrapper:Event
                }}
            />
        </ErrorBoundary>
    </Container>;
}

export default FullCalendar;
