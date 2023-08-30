import {Head, useForm} from "@inertiajs/inertia-react";
import ShiftInformation from "@/Pages/Admin/Shift/Components/ShiftInformation";
import ShiftRequests from "@/Pages/Admin/Shift/Components/ShiftRequests";
import {Divider, Typography} from "@mui/material";
import {useState} from "react";
import ConfirmForm from "@/Pages/Admin/Shift/Components/ConfirmForm";
import RejectForm from "@/Pages/Admin/Shift/Components/RejectForm";
import ShiftWorks from "@/Pages/Admin/Shift/Components/ShiftWorks";
import AdminLayout from "@/Layouts/AdminLayout";

const Show = ({shift}) => {

    const {data, post, setData, errors, reset} = useForm();

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openReject, setOpenReject] = useState(false);

    const getDataRequestData = (id) => {
        setData(shift.client_requests.find((item) => item.id === id));
    }

    const handleConfirm = (id) => () => {
        getDataRequestData(id);
        setOpenConfirm(true);
    }

    const handleReject = (id) => () => {
        getDataRequestData(id);
        setOpenReject(true);
    }

    const handleClose = () => {
        setOpenConfirm(false);
        setOpenReject(false);
        reset();
    }
    const confirm = () => {
        post(route("admin.clientRequests.confirm", data.id), {
            onSuccess: handleClose
        });
    }

    const reject = () => {
        post(route("admin.clientRequests.reject", data.id), {
            onSuccess: handleClose
        })
    }

    const handleChange = (key, value) => setData(previousData => ({...previousData, [key]: value}));
    const active = new Date(shift.date + " " + shift.started_at) > new Date() && (shift.client_requests_count <= shift.noUsers || shift.type === "normal");
    return <>
        <Head title={`شیفت #${shift.id}`}/>
        <Divider><Typography component={"h5"}>شیفت #{shift.id}</Typography></Divider>
        <ShiftInformation shift={shift}/>
        <Divider sx={{marginTop: 3}}><Typography component={"h5"}>کاربران</Typography></Divider>
        <ShiftWorks works={shift.works}/>
        <Divider sx={{marginTop: 3}}><Typography component={"h5"}>درخواست ها</Typography></Divider>
        <ShiftRequests requests={shift.client_requests}
                       active={active}
                       onConfirm={handleConfirm}
                       onReject={handleReject}/>
        <ConfirmForm onConfirm={confirm} onClose={handleClose} open={openConfirm} request={data}/>
        <RejectForm onChange={handleChange} onSubmit={reject} onClose={handleClose} open={openReject} request={data}/>
    </>;
}
Show.layout = page => <AdminLayout
    auth={page.props.auth}
    children={page}
    breadcrumbs={
        [
            {
                title: `بخش ${page.props.shift?.room?.name}`,
                link: route("admin.rooms.show", page.props.shift?.room?.id),
                icon: null
            },
            {
                title: `شیفت #${page.props.shift?.id}`,
                link: null,
                icon: null
            }
        ]
    }
/>;

export default Show;
