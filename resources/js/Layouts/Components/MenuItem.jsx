import React from "react";
import {ListItemIcon,ListItemText,ListItemButton,Badge} from "@mui/material";

const listItemStyle = {
    "&.Mui-selected": {
        color: "#fff",
        backgroundColor: "#29d",
        "&:hover": {
            fontWeight: "900",
            color: "rgba(0,0,0)",
            backgroundColor: "#29d8",
            "& svg": {
                fill: "rgb(0,0,8)",
                fontSize: "2em"
            }
        },
        "& svg": {
            fill: "#fff",
        }
    }
};

const MenuItem = ({onClick, selected, ...props}) => {
    const handleOnClick = (href) => (e) => {
        e.preventDefault();
        onClick(href)();
    }
    return <ListItemButton {...props} sx={listItemStyle} onClick={handleOnClick(props.href)} href={route(props.href)}>

        <ListItemIcon>
            {props.badge ? <Badge color="primary" badgeContent={props.badge}>
                {props.icon}
            </Badge> : props.icon}
        </ListItemIcon>
        <ListItemText primary={props.title}/>
    </ListItemButton>;
}
export default MenuItem;
