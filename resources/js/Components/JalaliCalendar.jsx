import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en"
import {Calendar} from "react-multi-date-picker"


function JalaliCalendar({value, onChange, loading}) {
    const handleChange = (v) => {
        onChange(v.map(item => item.convert(gregorian, gregorian_en).format("YYYY-MM-DD")));
    }
    const v = () => {
        if(Array.isArray(value))
            return value.map(item=>new Date(item));
        switch (typeof value) {
            case "object":
                return value;
            case "string":
                return new Date(value);
        }
    };
    return <Calendar calendar={persian}
                     locale={persian_fa}
                     range
                     weekPicker
                     value={v()} onChange={handleChange}/>;
}

export default JalaliCalendar;
