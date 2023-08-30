import AdapterJalali from "@date-io/date-fns-jalali";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TextField} from "@mui/material";

const PersianDateTimePicker = ({
                                   disabled,
                                   value,
                                   label,
                                   name,
                                   error,
                                   onChange,
                                   helperText,
                                   inputFormat = "yyyy/MM/dd",
                                   required = false,
                                   fullWidth = false,
                                   sx = null,
                                   ...rest
                               }) => {
    return <LocalizationProvider required dateAdapter={AdapterJalali}>
        <DesktopDatePicker
            disabled={disabled}
            label={label}
            inputFormat={inputFormat}
            onChange={onChange}
            name={name}
            value={value}
            error={error}
            sx={sx}
            renderInput={(params) => <TextField {...params} fullWidth={fullWidth} required={required}
                                                error={error}
                                                helperText={helperText} {...rest}/>}
        />
    </LocalizationProvider>
}
export default PersianDateTimePicker;
