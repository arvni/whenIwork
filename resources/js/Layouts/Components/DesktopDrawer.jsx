import React from "react";
import {Divider, IconButton, List, Toolbar} from "@mui/material";
import {ChevronRight as ChevronRightIcon} from "@mui/icons-material";
import ListMenuItem from "@/Layouts/Components/MenuItem";
import Drawer from "@/Layouts/Components/Drawer";

const DesktopDrawer = ({toggleDrawer, list, onClick, permissions, open}) => {

    return <Drawer variant="permanent" open={open}>
        <Toolbar sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: [1],
        }}>
            <img src="/images/logo.png" height={"50"}/>
            <IconButton onClick={toggleDrawer}>
                <ChevronRightIcon/>
            </IconButton>
        </Toolbar>
        <Divider/>
        <List component="nav">
            {list.map((item, index) => (!item.hasOwnProperty("permission") || permissions.includes(item.permission)) ?
                <ListMenuItem key={index} onClick={onClick} {...item}/> : null)}
        </List>
    </Drawer>
}
export default DesktopDrawer;
