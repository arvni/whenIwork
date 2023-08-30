import React, {forwardRef, useEffect, useState} from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {toPersianChars} from "@persian-tools/persian-tools";

const SelectSearch = forwardRef(({
                                     value,
                                     name,
                                     onChange,
                                     url,
                                     label,
                                     multiple,
                                     filterSelectedOptions,
                                     helperText = "",
                                     error = false,
                                     disabled = false,
                                     ...props
                                 }, ref) => {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        listOptions();
    }, [search]);
    const handleSearch = (e) => setSearch(e ? e.target.value ?? "" : "");
    const listOptions = async () => {
        if (search) {
            setLoading(true);
            const {data} = await axios.get(url + '/?search=' + toPersianChars(search));
            setOptions(data.data);
            setLoading(false);
        }
    }

    const handleChange = (e, v) => {
        onChange({target: {name, value: v ?? ""}}, v ?? "");
    };

    return <Autocomplete name={name} isOptionEqualToValue={(option, value) => option.id === value?.id}
                         disabled={disabled} filterOptions={(opt) => opt} id={"select-search-input"}
                         getOptionLabel={(option) => option ? option.name : ""} noOptionsText={"هیچ دیتایی یافت نشد"}
                         loadingText={"درحال جستجو"}
                         value={value ? value : multiple ? [] : value}
                         onInputChange={handleSearch} multiple={multiple ?? false}
                         onChange={handleChange} disablePortal options={options ?? [value]}
                         renderInput={params => <TextField {...params} ref={ref} InputProps={{
                             ...params.InputProps,
                             endAdornment: (
                                 <React.Fragment>
                                     {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                     {params.InputProps.endAdornment}
                                 </React.Fragment>
                             ),
                         }} label={label} helperText={helperText} error={error}/>} loading={loading}/>
});
export default SelectSearch;
