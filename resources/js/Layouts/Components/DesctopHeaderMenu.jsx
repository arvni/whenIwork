import {colors, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {AccountCircle, Menu as MenuIcon} from "@mui/icons-material";
import Header from "@/Layouts/Components/Header";
import AppBar from "@/Layouts/Components/AppBar";
import React from "react";

const DesktopHeaderMenu=({open,onDrawerClick,breadcrumbs,logout,userName,openChangePassword})=>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <AppBar position={"absolute"} open={open}>
        <Toolbar sx={{pr: '24px'}}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerClick}
                sx={{
                    marginRight: '36px',
                    ...(open && {display: 'none'}),
                    color: "#fff"
                }}
            >
                <MenuIcon color={colors.common.white}/>
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{flexGrow: 1}}
            >
                <Header breadcrumbs={breadcrumbs}/>
            </Typography>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{color: "#fff"}}
            >
                <AccountCircle color={colors.common.white}/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>{userName}</MenuItem>
                <MenuItem onClick={openChangePassword}>تغییر رمز عیور</MenuItem>
                <MenuItem onClick={logout('logout', "post")}> خروج</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
}

export default DesktopHeaderMenu;
