import AppBar from "@/Layouts/Components/AppBar";
import {
    Avatar,
    Box,
    colors,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText,
    Toolbar
} from "@mui/material";
import React, {useState} from "react";
import {AdminPanelSettings, Logout, Menu as MenuIcon, Password} from "@mui/icons-material";

const MobileMenu = ({list, onClick, permissions, openChangePassword, userName}) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    let isAdmin = false;
    if (permissions?.length)
        isAdmin = permissions.map(item => /^admin\.*/.test(item)).reduce((a, b) => a || b, false);
    const isInAdminLayout = /^\/admin/.test(window.location.pathname);
    const toggleDrawer = () => setOpenDrawer(prevState => !prevState);
    return <>
        <AppBar position="fixed" color="primary" sx={{top: 0}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <div/>
                <Avatar src="/images/logo.png"/>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        ...(openDrawer && {display: 'none'}),
                        color: "#fff"
                    }}
                >
                    <MenuIcon color={colors.common.white}/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
            <Toolbar sx={{justifyContent: "space-evenly", alignItems: "center", alignContent: "center"}}>
                {list.map((item, index) => (!item.hasOwnProperty("permission") || permissions.includes(item.permission)) ?
                    <React.Fragment key={index}>
                        {index === Math.floor(list.length / 2) ? <Box width={"56px"}/> : null}
                        <IconButton onClick={onClick(item.href)} href={route(item.href)}
                                    sx={{color: "white"}}>
                            {item.icon}
                        </IconButton></React.Fragment> : null)}
            </Toolbar>
        </AppBar>
        <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer} sx={{zIndex: "12000"}}>
            <Box sx={{width: 'auto'}} role="presentation">
                <List component="nav">
                    <ListItem key={"mobile-header-menu-item-0"}>
                        <ListItemText primary={userName}/>
                    </ListItem>
                    <ListItem disablePadding key={"mobile-header-menu-item-1"}>
                        {isAdmin && <ListItemButton onClick={onClick(isInAdminLayout ? "dashboard" : "admin.dashboard")}
                                                    href={route(isInAdminLayout ? "dashboard" : "admin.dashboard")}>
                            <ListItemIcon>
                                <AdminPanelSettings/>
                            </ListItemIcon>
                            <ListItemText primary={isInAdminLayout ? "منوی کاربری" : "منوی مدیریت"}/>
                        </ListItemButton>}
                    </ListItem>
                    <ListItem disablePadding key={"mobile-header-menu-item-2"}>
                        <ListItemButton onClick={openChangePassword}>
                            <ListItemIcon>
                                <Password/>
                            </ListItemIcon>
                            <ListItemText primary={"تغییر رمز عیور"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding key={"mobile-header-menu-item-3"}>
                        <ListItemButton onClick={onClick("logout","post")}>
                            <ListItemIcon>
                                <Logout/>
                            </ListItemIcon>
                            <ListItemText primary={"خروج"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    </>
}
export default MobileMenu
