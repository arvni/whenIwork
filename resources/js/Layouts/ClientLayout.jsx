import Authenticated from "./AuthenticatedLayout";
import {
    ArrowRight,
    Dashboard as DashboardIcon,
} from "@mui/icons-material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import React from "react";

const ClientLayout = ({auth, breadcrumbs, children}) => {
    let isAdmin = false;
    if (auth?.permissions?.length)
        isAdmin = auth.permissions.map(item => /^admin\.*/.test(item)).reduce((a, b) => a || b, false)

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

    if (isAdmin) {
        routes.push({
            title: "رفتن به منو مدیریت",
            href: "admin.dashboard",
            icon: <ArrowRight/>
        });
    }

    return <Authenticated auth={auth} breadcrumbs={breadcrumbs} children={children} routes={routes}/>
}
export default ClientLayout;
