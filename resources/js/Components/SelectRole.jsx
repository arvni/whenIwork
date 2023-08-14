import React, {useEffect, useState} from "react";
import {Autocomplete,CircularProgress,TextField} from "@mui/material";

const SelectRole = ({value, name, onChange, ...props}) => {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        listRoles();
    }, [search]);

    const handleSearch = (e) => setSearch(e ? e.target.value : "");
    const listRoles = async () => {
        setLoading(true);
        const {data} = await axios.get('/api/roles/?search=' + search);
        setRoles(data.data);
        setLoading(false);
    }

    const handleChange = (e) => {

        if (e.target.getAttribute("data-option-index")) {
            onChange({...e, target: {...e.target, name, value: roles[e.target.getAttribute("data-option-index")]}});
        } else {
            onChange({...e, target: {...e.target, name, value: ""}});
            setSearch("");
        }
    };

    return <Autocomplete name={"role"} isOptionEqualToValue={(option, value) => option.id === value?.id}
                         getOptionLabel={(option) => option ? option.name : ""} value={value}
                         onInputChange={handleSearch}
                         onChange={handleChange} disablePortal options={roles}
                         renderInput={params => <TextField {...params} {...props} InputProps={{
                             ...params.InputProps,
                             endAdornment: (
                                 <React.Fragment>
                                     {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                     {params.InputProps.endAdornment}
                                 </React.Fragment>
                             ),
                         }} label={"نقش"}/>} loading={loading}/>
}
export default SelectRole;
