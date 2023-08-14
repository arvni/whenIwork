import React from "react";
import FilterIcon from '@mui/icons-material/FilterAlt'
import {Button, Grid, TextField, Accordion, AccordionDetails, AccordionSummary} from "@mui/material";

const Filter = ({filter, setFilter, onFilter}) => {

    const handleChange = (e) => {

        setFilter(prevState => ({...prevState, search: e.target.value}))
    };
    return (
        <Accordion>
            <AccordionSummary>
                <FilterIcon/>فیلتر
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                        <TextField sx={{width: "100%"}} name={"search"} value={filter?.search} onChange={handleChange}
                                   label={"جستجو"}/>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{display: "flex"}} justifyContent={"center"}>
                        <Button variant={"outlined"} onClick={onFilter}>فیلتر</Button>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}

export default Filter;
