import React from "react";
import {Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import {AdminPanelSettings, ChevronRight as ChevronRightIcon} from "@mui/icons-material";
import ListMenuItem from "@/Layouts/Components/MenuItem";
import Drawer from "@/Layouts/Components/Drawer";

const DesktopDrawer = ({toggleDrawer, list, onClick, permissions, open}) => {

    let isAdmin = false;
    if (permissions?.length)
        isAdmin = permissions.map(item => /^admin\.*/.test(item)).reduce((a, b) => a || b, false);
    const isInAdminLayout = /^\/admin/.test(window.location.pathname);
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
            {isAdmin && <ListItemButton onClick={onClick(isInAdminLayout ? "dashboard" : "admin.dashboard")}
                                        href={route(isInAdminLayout ? "dashboard" : "admin.dashboard")}>
                <ListItemIcon>
                    <AdminPanelSettings/>
                </ListItemIcon>
                <ListItemText primary={isInAdminLayout ? "منوی کاربری" : "منوی مدیریت"}/>
            </ListItemButton>}
        </List>
    </Drawer>
}
export default DesktopDrawer;
