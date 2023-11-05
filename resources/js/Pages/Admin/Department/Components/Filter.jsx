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

const Filter = ({defaultFilter, onFilter}) => {
    const [filter, setFilter] = useState(defaultFilter);
    const handleChange = (e) => {
        setFilter(prevState => ({...prevState, search: e.target.value}))
        onFilter({...filter,[e.target.name]:e.target.value});
    };
    const handleFilter = e => {
        e.preventDefault();
        onFilter(filter);
    }
    return (
        <Accordion>
            <AccordionSummary>
                <FilterIcon/>فیلتر
            </AccordionSummary>
            <AccordionDetails>
                <form action="#" onSubmit={handleFilter}>
                    <Stack spacing={2} direction={"row"}>
                        <TextField name={"search"}
                                   value={filter?.search}
                                   onChange={handleChange}
                                   label={"عنوان"}
                        />
                        <Button variant={"outlined"} type="submit">اعمال</Button>
                    </Stack>
                </form>
            </AccordionDetails>
        </Accordion>
    );
}

export default Filter;
