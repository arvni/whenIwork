import Authenticated from "./AuthenticatedLayout";
import {
    Dashboard as DashboardIcon,
} from "@mui/icons-material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import React from "react";

const ClientLayout = ({auth, breadcrumbs, children}) => {

    let routes = [
        {
            title: "داشبورد",
            href: 'dashboard',
            icon: <DashboardIcon/>,
        },
        {
            title: "شیفت ها",
            href: "client.shifts.index",
            icon: <PendingActionsIcon/>
        },
        {
            title: "درخواست ها",
            href: "client.clientRequests.index",
            icon: <EditCalendarIcon/>
        },
    ]

    return <Authenticated auth={auth} breadcrumbs={breadcrumbs} children={children} routes={routes}/>
}
export default ClientLayout;
