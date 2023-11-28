import {Divider, Grid, Stack, Typography} from "@mui/material";
import FullView from "@/Pages/Admin/Department/Components/FullView";
import Loading from "@/Components/Loading";
import AdminLayout from "@/Layouts/AdminLayout";
import {Inertia} from "@inertiajs/inertia";
import {useState} from "react";
import PersianDateTimePicker from "@/Components/PersianDatepicker";

const MapView = ({department,rooms,defaultValues}) => {
    const [loading,setLoading]=useState(false);
    const pageReload = (date) => Inertia.visit(route('admin.departments.map', department.id), {
            data: {
                date
            },
            only: ["rooms", "defaultValues"],
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false)
        });


    return  <>
        <Stack direction={"row"} alignItems={"center"} alignContent={"center"} justifyContent={"space-evenly"}>
            <Typography component="h1" fontSize={"2em"}>{department.name}</Typography>
            <PersianDateTimePicker value={defaultValues.date} name={"date"} label={"تاریخ"}
                                   onChange={pageReload} />
        </Stack>
        <Divider sx={{my:2}}/>
        <Grid container sx={{flexWrap: "nowrap"}} direction={"row"} >
        {rooms.map((item,index)=><Grid item key={item.id}>
            <Typography textAlign="center" component="h2" sx={{fontWeight:500,fontSize:"1.5em"}}>{item.title}</Typography>
            <FullView events={item.shifts.map(item => ({
                ...item,
                start: new Date(item.start),
                end: new Date(item.end),
            }))} hiddenTime={index!==0} defaultDate={defaultValues.date}/>
        </Grid>)}
    </Grid>
    <Loading open={loading}/>
    </>;
}
const breadCrumbs = [
    {
        title: "دپارتمان ها",
        link: route("admin.departments.index"),
        icon: null
    }
]
MapView.layout = page => <AdminLayout auth={page.props.auth} children={page} breadcrumbs={[...breadCrumbs, {
    title: `دپارتمان ${page.props.department.name}`,
    link: null,
    icon: null
}]}/>

export default MapView;
