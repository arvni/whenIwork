import {
    Grid,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button, Tab, Typography, Tabs, ToggleButtonGroup, ToggleButton,
} from "@mui/material";

import FilterIcon from '@mui/icons-material/FilterAlt';
import React, {useState} from "react";

const Filter = ({defaultFilter, onFilter}) => {
    const [filter, setFilter] = useState(defaultFilter);
    const handleTypeChange = (_, type) => {
        onFilter({type})();
        setFilter({type});
    }
    return (<>
            <Tabs onChange={handleTypeChange} value={filter?.type ?? "shift"} sx={{marginBottom: "1rem"}} centered
                  title={"نوع درخواست"}>
                <Tab value={"shift"} label={<Typography fontWeight={800}> درخواست شیفت</Typography>}/>
                <Tab value={"changeUser"} label={<Typography fontWeight={800}> درخواست تغییر شیفت</Typography>}/>
                <Tab value={"takeLeave"} label={<Typography fontWeight={800}> درخواست مرخصی</Typography>}/>
                <Tab value={"revised"} label={<Typography fontWeight={800}> درخواست بازبینی </Typography>}/>
            </Tabs>
            <Accordion>
                <AccordionSummary>
                    <FilterIcon/>فیلتر
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2} sx={{display: "flex"}} justifyContent={"center"}>
                            <Button variant={"outlined"} onClick={onFilter(filter)}>فیلتر</Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default Filter;
