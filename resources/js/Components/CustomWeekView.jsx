import PropTypes from 'prop-types';
import {useMemo} from "react";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import { Navigate } from 'react-big-calendar'
import jmoment from "jalali-moment";
function MyWeek({
                    date,
                    localizer,
                    max = localizer.endOf(new Date(), 'day'),
                    min = localizer.startOf(new Date(), 'day'),
                    scrollToTime = localizer.startOf(new Date(), 'day'),
                    ...props
                }) {
    const currRange = useMemo(
        () => MyWeek.range(date, { localizer }),
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

MyWeek.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    localizer: PropTypes.object,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    scrollToTime: PropTypes.instanceOf(Date),
}

MyWeek.range = (date, { localizer }) => {
    const md = jmoment.from(date, "fa");
    let offset=md.weekday();
    if (offset>5)
        offset-=6;
    else
        offset+=1
    offset*=-1;
    const start = localizer.add(date,offset,'day');
    const end =localizer.add(date,6+offset,'day');;

    let current = start
    const range = []
    while (localizer.lte(current, end, 'day')) {
        range.push(current)
        current = localizer.add(current, 1, 'day')
    }

    return range
}

MyWeek.navigate = (date, action, { localizer }) => {
    switch (action) {
        case Navigate.PREVIOUS:
            return localizer.add(date, -7, 'day')

        case Navigate.NEXT:
            return localizer.add(date, 7, 'day')

        default:
            return date
    }
}

MyWeek.title = (date) => {
    const md = jmoment.from(date);
    let offset=md.weekday()+1;
    if (offset>6)
        offset-=6;
    offset*=-1;
    const start = md.add(offset,"day").locale("fa").format('jYYYY/jMM/jDD');
    const end = md.add(8+offset,"day").locale("fa").format('jYYYY/jMM/jDD');
    return `${start} - ${end} `
}
export default MyWeek;
