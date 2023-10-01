import {DateTime, Settings} from "luxon";
import * as RBC from "react-big-calendar";
import jmoment from "jalali-moment";


Settings.defaultLocale = "fa-IR";
Settings.defaultOutputCalendar = "persian";


const localizer = RBC.luxonLocalizer(DateTime, {firstDayOfWeek: -1});
localizer.firstVisibleDay = (date, _) => {
    const md = jmoment.from(date, "fa");
    let firstOfMonth = md.startOf("jMonth");
    let sub = firstOfMonth.day() >= 6 ? firstOfMonth.day() - 6 : firstOfMonth.day() + 1;
    return firstOfMonth.subtract(sub, "day").toDate();
};
localizer.lastVisibleDay = (date, _) => {
    const md = jmoment.from(date, "fa");
    let endOfMonth = md.endOf("jMonth");
    let add = 6 - endOfMonth.day();
    return endOfMonth.add(add, "day").toDate();
};

localizer.visibleDays = (date, localizer) => {
    const md = jmoment.from(localizer.firstVisibleDay(date), "fa");
    const md2 = jmoment.from(localizer.lastVisibleDay(date), "fa");
    let current = md.toDate(),
        last = md2.toDate(),
        days = [];
    while (localizer.lt(current, last, "day")) {
        days.push(current);
        current = localizer.add(current, 1, "day");
    }
    return days;
};

let neq = localizer.neq;

localizer.neq = (currentDate, date, unit) => {
    if (unit !== "month") return neq(currentDate, date, unit);
    else if (date) {
        const cmd = jmoment.from(currentDate, "fa");
        const md = jmoment.from(date, "fa");
        //@todo check range
        return cmd.jMonth() !== md.jMonth();
    }
    return false;
};

let eq = localizer.eq;

localizer.eq = (currentDate, date, unit) => {
    if (unit !== "month") return eq(currentDate, date, unit);
    else if (date) {
        const cmd = jmoment.from(currentDate, "fa");
        const md = jmoment.from(date, "fa");
        return cmd.jMonth() === md.jMonth();
    }
    return false;
};


export default localizer;
