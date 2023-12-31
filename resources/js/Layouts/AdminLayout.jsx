import Authenticated from "./AuthenticatedLayout";
import {
    BusinessSharp,
    Dashboard as DashboardIcon,
    Groups as GroupsIcon,
    ManageAccounts as ManageAccountsIcon,
    Room
} from "@mui/icons-material";
import React from "react";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import helicopter from "../../images/helicopter.png";

const AdminLayout=({auth, breadcrumbs, children})=>{
    const routes = [
        {
            title: "داشبورد",
            href: 'admin.dashboard',
            icon: <DashboardIcon/>,
        },
        {
            title: "دپارتمانها",
            href: 'admin.departments.index',
            icon: <BusinessSharp/>,
            permission: "admin.departments.index"
        },
        {
            title: "نمای کلی",
            href: 'admin.departments.mapIndex',
            icon: <img src={helicopter} width="30"/>,
            permission: "admin.MapView"
        },
        {
            title: "بخش ها",
            href: 'admin.rooms.index',
            icon: <Room/>,
        },
        {
            title: "درخواست ها",
            href: "admin.clientRequests.index",
            icon: <EditCalendarIcon/>
        },
        {
            title: "لیست کاربران",
            href: "admin.users.index",
            permission: "admin.users.index",
            icon: <GroupsIcon/>,
        },
        {
            title: "نقش ها",
            href: "admin.roles.index",
            permission: "admin.roles.index",
            icon: <ManageAccountsIcon/>
        },
    ]
    return <Authenticated auth={auth} breadcrumbs={breadcrumbs} children={children} routes={routes}/>
}
export default AdminLayout;
