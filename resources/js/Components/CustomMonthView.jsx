import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'

export default function CustomMonthView({
                                           date,
                                           localizer,
                                           max = localizer.endOf(new Date(), 'day'),
                                           min = localizer.startOf(new Date(), 'day'),
                                           scrollToTime = localizer.startOf(new Date(), 'day'),
                                           ...props
                                       }) {
    const currRange = useMemo(
        () => CustomMonthView.range(date, { localizer }),
        [date, localizer]
    )

    return (
        <TimeGrid
            date={date}
            eventOffset={15}
            localizer={localizer}
            max={max}
            min={min}
            range={currRange}
            scrollToTime={scrollToTime}
            {...props}
        />
    )
}

CustomMonthView.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    localizer: PropTypes.object,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    scrollToTime: PropTypes.instanceOf(Date),
}

CustomMonthView.range = (date, { localizer }) => {
    const start = date
    const end = localizer.add(start, 2, 'day')

    let current = start
    const range = []

    while (localizer.lte(current, end, 'day')) {
        range.push(current)
        current = localizer.add(current, 1, 'day')
    }

    return range
}

CustomMonthView.navigate = (date, action, { localizer }) => {
    switch (action) {
        case Navigate.PREVIOUS:
            return localizer.add(date, -3, 'day')

        case Navigate.NEXT:
            return localizer.add(date, 3, 'day')

        default:
            return date
    }
}

CustomMonthView.title = (date, { localizer }) => {
    const [start, ...rest] = CustomMonthView.range(date, { localizer })
    return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}
