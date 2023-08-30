import DatePickerRange from "@/Components/DateRangePicker";


function JalaliCalendar({value, onChange, loading}) {

    return <DatePickerRange onChange={onChange} value={value} weekPicker={true}/>;
}

export default JalaliCalendar;
