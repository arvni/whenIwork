import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import React, {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const PasswordField = ({label, name,onChange,error}) => {
    const [showPassword,setShowPassword]=useState(false);
    const toggleShowPassword=()=>setShowPassword(!showPassword);
  return <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size="small" fullWidth required>
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput onChange={onChange}  name={name} required error={error}
            type={showPassword ? 'text' : 'password'}
                       id="password"
                       autoComplete="password"
            startAdornment={
                <InputAdornment position="start">
                    <IconButton
                        aria-label="نمایش رمزعبور"
                        onClick={toggleShowPassword}
                        edge="start"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
                       inputProps={{style:{direction:"ltr"}}}
            label={label}
        />
    </FormControl>
}
export default PasswordField;
