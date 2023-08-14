import AppBar from "@/Layouts/Components/AppBar";
import {Avatar, Box, IconButton, Toolbar} from "@mui/material";
import React from "react";

const MobileMenu = ({list, onClick, permissions}) => {

    return <>
        <AppBar position="fixed" color="primary" sx={{top: 0}}>
            <Toolbar sx={{justifyContent:"center"}}>
                <Avatar src="/images/logo.png" />
            </Toolbar>
        </AppBar>
        <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
        <Toolbar sx={{justifyContent: "space-evenly", alignItems: "center", alignContent: "center"}}>
            {list.map((item, index) => (!item.hasOwnProperty("permission") || permissions.includes(item.permission)) ?
                <React.Fragment key={index}>
                    {index==Math.floor(list.length/2)?<Box width={"56px"}/>:null}
                    <IconButton onClick={onClick(route(item.href))} href={route(item.href)}
                            sx={{color: "white"}}>
                    {item.icon}
                </IconButton></React.Fragment>: null)}
        </Toolbar>
    </AppBar>
    </>
}
export default MobileMenu
