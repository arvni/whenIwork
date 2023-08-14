import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";

export default function Loading ({open}){

    return  <Backdrop open={open} sx={{zIndex: 10000}}>
        <CircularProgress/>
    </Backdrop>
}
