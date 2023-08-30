import React from "react";
import * as RBC from "react-big-calendar";
import {Container} from "@mui/material";
import localizer from "@/Services/jalaliLocalizer";
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
    // showMore: (total) => `+${total} إضافي`
};

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
            />
        </ErrorBoundary>
    </Container>;
}

export default FullCalendar;
