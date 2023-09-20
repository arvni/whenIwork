import {useState} from "react";
import {Head, useForm} from "@inertiajs/inertia-react";

import {Close, Done} from "@mui/icons-material";
import {IconButton, Stack} from "@mui/material";

import AdminLayout from "@/Layouts/AdminLayout";
import TableLayout from "@/Layouts/TableLayout";

import Filter from "./Components/Filter";
import {renderStatus} from "@/Pages/Shift/Components/ExpandedComponent";
import ConfirmForm from "@/Pages/Admin/Shift/Components/ConfirmForm";
import RejectForm from "@/Pages/Admin/Shift/Components/RejectForm";

import {convertDate, convertDateTime} from "@/Services/helper";
import {requestTypes} from "@/Pages/ClientRequest";

const Index = ({leaves, status, success, errors, requestInputs}) => {
    const {post, setData, data, reset, processing, get} = useForm()
    const columns = [
        {
            field: 'user_name',
            headerName: 'نام',
            type: "string",
            width: "200"
        },
        {
            field: 'type',
            headerName: 'نوع مرخصی',
            type: "string",
            width: "100",
            renderCell: ({value}) => requestTypes.get(value)
        },
        {
            field: 'started_at',
            headerName: 'شروع',
            type: "string",
            width: "200",
            renderCell: ({value, row}) => row.type === "daily" ? convertDate(value) : convertDateTime(value)
        },
        {
            field: 'ended_at',
            headerName: 'پایان',
            type: "string",
            width: "200",
            renderCell: ({value, row}) => row.type === "daily" ? convertDate(value) : convertDateTime(value)
        },
        {
            field: 'status',
            headerName: 'وضعیت',
            type: "string",
            width: "200",
            renderCell: ({value}) => renderStatus(value)
        },
        {
            field: 'client_requests_message',
            headerName: 'متن پیام',
            type: "string",
            width: "200"
        },
        {
            field: 'acceptor_name',
            headerName: 'بررسی کننده',
            type: "string",
            width: "200"
        },
        {
            field: 'acceptor_comment',
            headerName: 'پیام بررسی کننده',
            type: "string",
            width: "200"
        },
        {
            field: 'id',
            headerName: 'Action',
            type: 'actions',
            sortable: false,
            renderCell: ({value}) => <Stack spacing={2} direction={"row"}>
                <IconButton label="Edit" color={"success"} onClick={confirm(value)}><Done/></IconButton>
                <IconButton title="Delete" color={"error"} onClick={reject(value)}><Close/></IconButton>
            </Stack>
        }
    ];

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);

    const pageReload = (page, filters, sort, pageSize) => {
        get(route('admin.leaves.index'), {
            only: ["leaves", "status", "defaultValues"],
            data: {page, filters, sort, pageSize}
        });
    }

    const handleSubmitForm = () => post(route(`admin.leaves.${data.type}`, data.id), {
        onSuccess: (e) => {
            reset();
        },
    });
    const confirm = (id) => () => {
        setData({id, type: "confirm"});
        setConfirmOpen(true);
    }
    const reject = (id) => () => {
        setData({id, type: "reject"});
        setRejectOpen(true);
    }
    const handleClose = () => {
        if (data.type === "confirm")
            setConfirmOpen(false);
        else
            setRejectOpen(false);
        reset();
    }
    const handleChange = (key, value) => setData(previousData => ({...previousData, [key]: value}));
    return (
        <>
            <Head title={"Leaves List"}/>
            <TableLayout defaultValues={requestInputs} success={success} status={status} reload={pageReload}
                         columns={columns} data={leaves} processing={processing} Filter={Filter} errors={errors}>
            </TableLayout>
            <ConfirmForm request={data} open={confirmOpen} onClose={handleClose} onConfirm={handleSubmitForm}/>
            <RejectForm onClose={handleClose} open={rejectOpen} request={data} onSubmit={handleSubmitForm}
                        onChange={handleChange}/>
        </>);
}
const breadCrumbs = [
    {
        title: "Leaves",
        link: null,
        icon: null
    }
]
Index.layout = page => <AdminLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
