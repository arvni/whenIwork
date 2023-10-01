import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import {convertDateTime} from "@/Services/helper";

import {IconButton, Stack} from "@mui/material";
import {Close, Done} from '@mui/icons-material';


import TableLayout from "@/Layouts/TableLayout";
import AdminLayout from "@/Layouts/AdminLayout";

import ExpandedCell from "@/Components/ExpandedCell";
import Filter from "./Components/Filter";
import ExpandedComponent from "./Components/ExpandedComponent";
import ConfirmForm from "@/Pages/Admin/Shift/Components/ConfirmForm";
import RejectForm from "@/Pages/Admin/Shift/Components/RejectForm";
import {renderStatus} from "@/Pages/Shift/Components/ExpandedComponent";
import {requestTypes} from "@/Pages/ClientRequest";


const Index = () => {
    const {post, setData, data, reset, processing} = useForm();
    const {clientRequests, status, errors, auth, success, defaultValues} = usePage().props;
    const columns = [
        {
            field: 'name',
            headerName: 'کاربر',
            type: "string",
            flex: 1,
            sortable: false,
            renderCell: ({row}) => <a href="#" onClick={showUser(row.user.id)}>{row.user.name}</a>
        },
        {
            field: 'type',
            headerName: 'نوع',
            type: "string",
            flex: .3,
            renderCell: ({value}) => requestTypes.get(value)
        },
        {
            field: 'created_at',
            headerName: 'تاریخ درخواست',
            type: "date",
            flex: .3,
            renderCell: ({value}) => convertDateTime(value)
        },
        {
            field: 'message',
            headerName: 'توضیحات',
            type: "string",
            sortable: false,
            flex: .5,
            renderCell: ExpandedCell
        },
        {
            field: 'status',
            headerName: 'وضعیت',
            type: "string",
            flex: .2,
            sortable: false,
            disableMenu: true,
            align: "center",
            renderCell: ({value}) => renderStatus(value)
        },
        {
            field: 'revisable_by',
            headerName: 'بررسی کننده',
            type: "string",
            flex: .5,
            renderCell: ({row}) => row.revisable_by?.name
        },
        {
            field: 'comment',
            headerName: 'توضیحات برزسی کننده',
            type: "string",
            flex: .5,
        },
        {
            field: 'updated_at',
            headerName: 'تاریخ آخرین تغییر',
            type: "string",
            flex: .4,
            renderCell: ({value}) => value ? convertDateTime(value) : null
        },
        {
            field: 'id',
            headerName: '#',
            type: 'actions',
            sortable: false,
            flex: .2,
            renderCell: ({row}) => {
                let cols = []
                if (row.status === "waiting" && new Date() < new Date(row.requestable?.date ? row.requestable?.date + " " + row.requestable?.started_at : row.requestable?.started_at)) {
                    cols.push(<Stack direction={"row"} gap={1}>
                        <IconButton onClick={handleReject(row.id)} color={"error"} title={"رد"}>
                            <Close/>
                        </IconButton>
                        <IconButton onClick={handleConfirm(row.id)} color={"success"} title={"تایید"}>
                            <Done/>
                        </IconButton>
                    </Stack>)
                }

                return cols;
            }
        }
    ];

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openReject, setOpenReject] = useState(false);

    const pageReload = (page, filters, sort, pageSize) => Inertia.visit(route('client.clientRequests.index'), {
        only: ["clientRequests", "status", "defaultValues"],
        data: {page, filters, sort, pageSize},
        preserveState: true,
    });
    const handleClose = () => {
        reset();
        setOpenConfirm(false);
        setOpenReject(false);
        reset();
    }

    const showUser = (id) => () => Inertia.visit(route("admin.users.show", id));

    const getDataRequestData = (id) => {
        setData(clientRequests.data.find((item) => item.id === id));
    }
    const handleConfirm = (id) => () => {
        getDataRequestData(id);
        setOpenConfirm(true);
    }
    const handleReject = (id) => () => {
        getDataRequestData(id);
        setOpenReject(true);
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

    const handleChange = (key, value) => {
        setData(previousData => ({...previousData, [key]: value}));
    }

    return (
        <>
            <Head title={"لیست درخواست ها"}/>
            <TableLayout defaultValues={defaultValues} success={success} status={status} reload={pageReload}
                         columns={columns} data={clientRequests} rowHeight={100}
                         loading={processing} Filter={Filter}
                         expandedKey={"requestable"} ExpandedComponent={ExpandedComponent}>
            </TableLayout>

            <ConfirmForm onConfirm={confirm} onClose={handleClose} open={openConfirm} request={data}/>
            <RejectForm onChange={handleChange} onSubmit={reject} onClose={handleClose} open={openReject}
                        request={data}/>
        </>);
}
const breadCrumbs = [
    {
        title: "درخواست ها",
        link: null,
        icon: null
    }
]
Index.layout = page => <AdminLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
