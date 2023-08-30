import {FormLabel, Stack, TextField} from "@mui/material";

const TimeRangePicker = ({name, onChange, value, label}) => {
    const handleChange = (v) => {
        onChange(name, {...value, [v.target.name]: v.target.value})
    }
    return <Stack spacing={1} direction={"row"} alignItems={"center"}>
        {label && <FormLabel>{label}</FormLabel>}
        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"} gap={2}>
            <TextField value={value?.from ?? " "} inputMode={"numeric"} type={"time"} name={"from"} label={"از"}
                       size={"small"} onChange={handleChange} />
            <TextField value={value?.to ?? " "} inputMode={"numeric"} type={"time"} name={"to"} label={"تا"}
                       size={"small"} onChange={handleChange}/>
        </Stack>
    </Stack>
}
export default TimeRangePicker;
