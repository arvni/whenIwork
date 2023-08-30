import {Box, Grid} from "@mui/material";
import {convertDate, persianNumber} from "@/Services/helper";

const ShiftInformation=({shift})=>{

    return <Grid container spacing={3} p={2}>
        <Grid item>
            بخش : {shift.room.name}
        </Grid>
        <Grid item>
            تاریخ : {convertDate(shift.date)}
        </Grid>
        <Grid item>
            ساعت شروع : {persianNumber(shift.started_at)}
        </Grid>
        <Grid item>
            ساعت پایان : {persianNumber(shift.ended_at)}
        </Grid>
        <Grid item>
            تعداد نفرات : {persianNumber(shift.noUsers)}
        </Grid>

    </Grid>
}
export default ShiftInformation;
