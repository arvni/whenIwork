import FilterIcon from '@mui/icons-material/FilterAlt'
import {
    Grid,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button, Stack,
} from "@mui/material";
import SelectSearch from "@/Components/SelectSearch";
import {useState} from "react";

const Filter = ({defaultFilter, onFilter}) => {
    const [filter, setFilter] = useState(defaultFilter);
    const handleChange = (e) => {
        setFilter(prevState => ({...prevState, [e.target.name]: e.target.value ?? ""}));
        onFilter({...filter,[e.target.name]:e.target.value});
    };
    const handleFilter=e=>{
        e.preventDefault();
        onFilter(filter);
    }
    return <Accordion sx={{width: "100%"}}>
        <AccordionSummary>
            <FilterIcon/> فیلتر
        </AccordionSummary>
        <AccordionDetails>
            <form action="#" onSubmit={handleFilter}>
                <Stack spacing={2} direction="row">
                    <TextField name={"search"}
                               value={filter?.search}
                               onChange={handleChange}
                               label={"نام"}/>
                    <SelectSearch value={filter?.department}
                                  name={"department"}
                                  onChange={handleChange}
                                  url={route("admin.departmentApi.index")}
                                  label={"دپارتمان"} sx={{minWidth:"125px"}}/>
                    <Button variant={"outlined"} type="submit">فیلتر</Button>
                </Stack>
            </form>
        </AccordionDetails>
    </Accordion>
}

export default Filter;
