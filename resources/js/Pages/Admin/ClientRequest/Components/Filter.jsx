import FilterIcon from '@mui/icons-material/FilterAlt'
import {
    Grid,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button, FormControl, InputLabel, Select, MenuItem, FormGroup, Stack,
} from "@mui/material";
import {useState} from "react";
import {requestTypes} from "@/Pages/ClientRequest";

const Filter = ({defaultFilter, onFilter}) => {
    const [filter, setFilter] = useState(defaultFilter);
    const handleChange = (e) => setFilter(prevState => ({...prevState, [e.target.name]: e.target.value}));
    const handleFilter = (e) => {
        e.preventDefault();
        onFilter(filter)
    }
    return (
        <Accordion>
            <AccordionSummary>
                <FilterIcon/>فیلتر
            </AccordionSummary>
            <AccordionDetails>
                <form action="#" onSubmit={handleFilter}>
                    <Stack direction={"row"} spacing={2}>
                        <TextField fullWidth
                                   name="search"
                                   value={filter?.search}
                                   onChange={handleChange}
                                   label="عنوان"
                        />
                        <FormControl fullWidth>
                            <InputLabel id="type">نوع درخواست</InputLabel>
                            <Select
                                sx={{minWidth: "125px"}}
                                labelId="type"
                                id="request-type"
                                value={filter?.type ?? null}
                                label="نوع درخواست"
                                onChange={handleChange}
                                fullWidth
                                name="type"
                            >
                                <MenuItem value={null}>همه</MenuItem>
                                <MenuItem value={"changeUser"}>{requestTypes.get("changeUser")}</MenuItem>
                                <MenuItem value={"takeLeave"}>{requestTypes.get("takeLeave")}</MenuItem>
                                <MenuItem value={"shift"}>{requestTypes.get("shift")}</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant={"outlined"} type="submit">اعمال</Button>
                    </Stack>
                </form>
            </AccordionDetails>
        </Accordion>
    );
}

export default Filter;
