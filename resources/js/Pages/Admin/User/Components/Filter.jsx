import FilterIcon from '@mui/icons-material/FilterAlt'
import {
    Grid,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button, Stack,
} from "@mui/material";
import {useState} from "react";
import SelectSearch from "@/Components/SelectSearch";

const Filter = ({defaultFilter, onFilter}) => {

    const [filter, setFilter] = useState(defaultFilter);
    const handleFilter = e => {
        e.preventDefault();
        onFilter(filter);
    }

    const handleChange = (e) => {
        setFilter(prevState => ({...prevState, [e.target.name]: e.target.value ?? ""}));
        onFilter({...filter,[e.target.name]:e.target.value});
    };
    return <Accordion sx={{width: "100%"}}>
        <AccordionSummary>
            <FilterIcon/> فیلتر
        </AccordionSummary>
        <AccordionDetails>
            <form action="#" onSubmit={handleFilter}>
                <Stack spacing={2} direction="row">
                    <TextField name={"search"} value={filter?.search} onChange={handleChange} label={"شناسه یا نام"}/>
                    <SelectSearch url={route("admin.roleApi.index")} value={filter?.role} onChange={handleChange}
                                  name={"role"} label={"نقش"} sx={{minWidth:"125px"}}/>
                    <Button variant={"outlined"} type="submit">فیلتر</Button>
                </Stack>
            </form>
        </AccordionDetails>
    </Accordion>
}

export default Filter;
