import { Typography, } from "@mui/material";
import React from "react";

 const Copyright = (props)=>{
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © ARIZ '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
  }
  export default Copyright;
