import MobileMenu from "@/Layouts/Components/MobileMenu";
import DesktopMenu from "@/Layouts/Components/DesktopMenu";
import React from "react";
import {useMediaQuery} from "@mui/material";

const AppMenu = ({userName, permissions, breadcrumbs, list, handleVisit, openChangePassword}) => {
    const matches = useMediaQuery('(min-width:600px)', {noSsr: true});
    return !matches ? <MobileMenu list={list} onClick={handleVisit} permissions={permissions}/> :
        <DesktopMenu onClick={handleVisit} permissions={permissions} userName={userName}
                     openChangePassword={openChangePassword}
                     breadcrumbs={breadcrumbs} list={list}/>
}
export default AppMenu;
