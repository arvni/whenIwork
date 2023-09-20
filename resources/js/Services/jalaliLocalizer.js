import {DateTime, Settings} from "luxon";
import * as RBC from "react-big-calendar";
import jmoment from "jalali-moment";

Settings.defaultZone = "Asia/Tehran";
Settings.defaultLocale = "fa-IR";
Settings.defaultOutputCalendar = "persian";
const localizer = RBC.luxonLocalizer(DateTime, {firstDayOfWeek: 6});
localizer.firstVisibleDay = (date, _) => {
    const md = jmoment.from(date);
    md.locale("fa");
    let firstOfMonth = md.startOf("jMonth");
    return firstOfMonth.toDate();
};
localizer.lastVisibleDay = (date, _) => {
    const md = jmoment.from(date);
    md.locale("fa");
    let endOfMonth = md.endOf("jMonth");
    return endOfMonth.toDate();
};

localizer.visibleDays = (date, localizer) => {
    const md = jmoment.from(localizer.firstVisibleDay(date));
    const md2 = jmoment.from(localizer.lastVisibleDay(date));
    md.locale("fa");
    md2.locale("fa");
    let current = md.startOf("week").toDate(),
        last = md2.endOf("week").toDate(),
        days = [];
    while (localizer.lt(current, last, "day")) {
        current = localizer.add(current, 1, "day");
        days.push(current);
    }
    // console.log(days);
    return days;
};

let neq = localizer.neq;

localizer.neq = (currentDate, date, unit) => {
    if (unit !== "month") return neq(currentDate, date, unit);
    else if (date) {
        const cmd = jmoment.from(currentDate.toDateString());
        const md = jmoment.from(date.toDateString());
        cmd.locale("fa");
        md.locale("fa");
        //@todo check range
        // return cmd.jMonth() !== md.jMonth();
    }
    return false;
};

let eq = localizer.eq;

localizer.eq = (currentDate, date, unit) => {
    console.log(currentDate,date);
    if (unit !== "month") return eq(currentDate, date, unit);
    else if (date) {
        const cmd = jmoment.from(currentDate.toDateString());
        const md = jmoment.from(date.toDateString());
        cmd.locale("fa");
        md.locale("fa");
        return cmd.jMonth() === md.jMonth();
    }
    return false;
};

export default localizer;
