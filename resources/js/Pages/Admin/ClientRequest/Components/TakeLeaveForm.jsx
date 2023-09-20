import {FormLabel, Grid, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import TimeRangePicker from "@/Components/TimeRangePicker";
import DatePickerRange from "@/Components/DateRangePicker";
import PersianDatepicker from "@/Components/PersianDatepicker";

const TakeLeaveForm = ({leave, onChange}) => {
    const handleChange = (key, value) => {
        onChange("requestable", {...leave, [key]: value})
    }
    const handleTypeChange = (_, v) => {
        handleChange("type", v);
    }
    const handleDateChange = v => handleChange("date", v);
    return <Grid container spacing={2} sx={{marginBottom: 2}}>
        <Grid item>
            <FormLabel sx={{marginRight: 1}}>نوع مرخصی </FormLabel>
            <ToggleButtonGroup color={"primary"}
                               value={leave?.type}
                               exclusive
                               onChange={handleTypeChange}
                               aria-label="نوع مرخصی"
                               size={"small"}
            >
                <ToggleButton value="hourly" aria-label="ساعتی">
                    ساعتی
                </ToggleButton>
                <ToggleButton value="daily" aria-label="روزانه">
                    روزانه
                </ToggleButton>
            </ToggleButtonGroup>
        </Grid>
        {leave?.type && <>
            {leave?.type === "hourly" ?
                <>
                    <Grid item xs={12}>
                        <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"}
                               alignContent={"center"} gap={2}>
                            <FormLabel>تاریخ : </FormLabel>
                            <PersianDatepicker size={"small"} name={"date"} value={leave?.date}
                                               onChange={handleDateChange} type={"date"}
                                               datePickerProps={{disablePast: true}} required/>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <TimeRangePicker name="range" value={leave?.range} onChange={handleChange}
                                         label="ساعت درخواستی"/>
                    </Grid>
                </>
                : <Grid item>
                    <DatePickerRange onChange={handleChange} value={leave?.range} name={"range"} min={new Date()}/>
                </Grid>
            }
        </>}
    </Grid>
}
export default TakeLeaveForm;
