import {Stack} from "@mui/material";

const ShiftInfo=({shift})=>{

    return <Stack direction="row" spacing={5} flexWrap="wrap" sx={{marginBottom: "1rem"}}>
        {shift?.date && <span>{`تاریخ : ${shift?.date}`}</span>}
        <span>{`${shift?.started_at} - ${shift?.ended_at}`}</span>
        {shift?.room?.name &&
        <span>{`بخش : ${shift?.room?.name}`}</span>}
    </Stack>
}
export default ShiftInfo;
