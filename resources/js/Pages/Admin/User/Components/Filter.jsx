import FilterIcon from '@mui/icons-material/FilterAlt'
import {
    Grid,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@mui/material";
import {useState} from "react";
import SelectSearch from "@/Components/SelectSearch";

const Filter = ({defaultFilter, onFilter}) => {

    const [filter, setFilter] = useState(defaultFilter);
    const handleFilter = () => {
        onFilter(filter)();
    }

    const handleChange = (e) => {
        setFilter(prevState => ({...prevState, [e.target.name]: e.target.value ?? ""}));
    };
    return <Accordion sx={{width: "100%"}}>
        <AccordionSummary>
            <FilterIcon/> فیلتر
        </AccordionSummary>
        <AccordionDetails>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                    <TextField sx={{width: "100%"}} name={"search"} value={filter?.search} onChange={handleChange}
                               label={"شناسه یا نام"}/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <SelectSearch url={route("admin.roleApi.index")} value={filter?.role} onChange={handleChange}
                                  name={"role"}/>
                </Grid>
                <Grid item xs={12} sm={2} sx={{display: "flex"}} justifyContent={"center"}>
                    <Button variant={"outlined"} onClick={handleFilter}>فیلتر</Button>
                </Grid>
            </Grid>
        </AccordionDetails>
    </Accordion>
}

export default Filter;
