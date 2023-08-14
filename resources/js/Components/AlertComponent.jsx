import React, {useEffect} from "react";
import {useSnackbar} from "notistack";
import {Slide} from "@mui/material";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const AlertComponent = ({success, status, errors}) => {
    const {enqueueSnackbar} = useSnackbar();
    useEffect(()=>{
        if(success){
            enqueueSnackbar(status, {variant :"success",anchorOrigin:{vertical:"bottom",horizontal:"right"},TransitionComponent:SlideTransition});
        }else if(success!=null && status)
            enqueueSnackbar(status, {variant :"error"});
        if(errors && errors!={})
            for(let item in errors){
                enqueueSnackbar(errors[item], {variant :"warning",anchorOrigin:{vertical:"bottom",horizontal:"right"},TransitionComponent:SlideTransition});
            }
    },[success,status, errors]);
    return (
        <React.Fragment/>
    );
}

export default AlertComponent;
