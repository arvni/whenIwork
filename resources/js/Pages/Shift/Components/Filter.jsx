import React, {useState} from "react";
import {Grid, Accordion, AccordionDetails, AccordionSummary, Button, Tab, Tabs, Typography} from "@mui/material";
import FilterIcon from '@mui/icons-material/FilterAlt'
import SelectSearch from "@/Components/SelectSearch";

const Filter = ({defaultFilter, onFilter}) => {
    const [filter, setFilter] = useState(defaultFilter);
    const handleChange = (e) => {
        setFilter(prevState => ({...prevState, room: e.target.value}));
        onFilter({...filter,room:e.target.value});
    }
    const handleTypeChange = (_, v) => {
        setFilter(prevState => ({...prevState, type: v}));
        onFilter({...filter, type: v})();
    }
    const handleFilter = (e) => {
        e.preventDefault();
        onFilter(filter);
    }
    return (<>
            <Tabs onChange={handleTypeChange} value={filter?.type ?? "open"} sx={{marginBottom: "1rem"}} centered
                  title={"نوع شیفت"}>
                <Tab value={"open"} label={<Typography fontWeight={800}>آزاد</Typography>}/>
                <Tab value={"normal"} label={<Typography fontWeight={800}>موظفی</Typography>}/>
            </Tabs>
            <Accordion>
                <AccordionSummary>
                    <FilterIcon/>فیلتر
                </AccordionSummary>
                <AccordionDetails>
                    <form action="#" onSubmit={handleFilter}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                                <SelectSearch
                                    value={filter?.room}
                                    name={"room"}
                                    onChange={handleChange}
                                    url={route("roomsApi.index")}
                                    label={"بخش ها"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} sx={{display: "flex"}} justifyContent={"center"}>
                                <Button variant={"outlined"} type="submit">جستجو</Button>
                            </Grid>
                        </Grid>
                    </form>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default Filter;
