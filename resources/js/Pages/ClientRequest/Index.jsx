import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import {convertDate, convertDateTime} from "@/Services/helper";

import {IconButton, Stack} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon, Close, Done
} from '@mui/icons-material';


import TableLayout from "@/Layouts/TableLayout";
import ExpandedCell from "@/Components/ExpandedCell";
import Filter from "./Components/Filter";
import AddForm from "../Shift/Components/ClientRequest";
import ExpandedComponent from "./Components/ExpandedComponent";
import ConfirmForm from "@/Pages/Admin/Shift/Components/ConfirmForm";
import RejectForm from "@/Pages/Admin/Shift/Components/RejectForm";
import ClientLayout from "@/Layouts/ClientLayout";
import {renderStatus} from "@/Pages/Shift/Components/ExpandedComponent";


export const requestTypes = new Map([
    ["shift", "درخواست شیفت"],
    ["changeUser", "درخواست جابه جایی شیفت"],
    ["takeLeave", "درخواست مرخصی"],
    ["daily", "مرخصی روزانه"],
    ["hourly", "مرخصی ساعتی"],
]);


const Index = () => {
    const {post, setData, data, reset, processing} = useForm()
    const columns = [
        {
            field: 'name',
            headerName: 'کاربر',
            type: "string",
            flex: 1,
            sortable: false,
            renderCell: ({row}) => row.user.name
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
            renderCell: (params) => {
                let cols = []

                if (params.row.status === "waiting" && new Date()<new Date(params?.row?.requestable?.date)) {
                    if (auth.user.id === params.row.user.id && params.row.status === "waiting") {
                        cols.push(<IconButton key={"edit-" + params.value} title="بروررسانی"
                                              onClick={editClientRequest(params.row)}
                                              color={"warning"}>
                            <EditIcon/>
                        </IconButton>);
                        cols.push(<IconButton key={"cancel-" + params.value} title="حذف"
                                              onClick={deleteClientRequest(params.row)} color={"error"}>
                            <DeleteIcon/>
                        </IconButton>);
                    }
                    console.log(defaultValues?.filters?.type);
                    if (defaultValues?.filters?.type === "revised")
                        cols.push(<Stack direction={"row"} gap={1}>
                            <IconButton onClick={handleReject(params.value)} color={"error"} title={"رد"}>
                                <Close/>
                            </IconButton>
                            <IconButton onClick={handleConfirm(params.value)} color={"success"} title={"تایید"}>
                                <Done/>
                            </IconButton>
                        </Stack>)
                }

                return cols;
            }
        }
    ];
    const {clientRequests, status, errors, auth, success, defaultValues} = usePage().props;
    const [loading, setLoading] = useState(false);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openReject, setOpenReject] = useState(false);

    const editClientRequest = (id) => () => {
        setLoading(true);
        fetchClientRequest(id).finally(() => {
            setOpenAddForm(true);
            setLoading(false);
        });
    };
    const fetchClientRequest = async (id) => id ? axios.get(route("clientRequestsApi.show", id)).then((res) => {
        setData({...res.data.data, _method: 'put'});
    }) : null;
    const successCb = () => {
        reset();
        setOpenAddForm(false);
        setOpenDeleteForm(false);
    }

    const deleteClientRequest = (params) => () => {
        setData({...params, _method: "delete"});
        setOpenDeleteForm(true);
    };
    const pageReload = (page, filters, sort, pageSize) => Inertia.visit(route('client.clientRequests.index'), {
        only: ["clientRequests", "status", "defaultValues"],
        data: {page, filters, sort, pageSize},
        preserveState: true,
    });

    const handleDestroy = async () => {
        post(route('client.clientRequests.destroy', data.id), {
            preserveState: true,
            onSuccess: successCb
        });
    };
    const handleSubmitForm = (e) => {
        e.preventDefault();
        post(data.id ? route('client.clientRequests.update', data.id) : route("client.clientRequests.store"), {onSuccess: successCb});
    }
    const addNew = () => {
        setData({type: "takeLeave"});
        setOpenAddForm(true);
    }
    const handleClose = () => {
        reset();
        setOpenAddForm(false);
        setOpenConfirm(false);
        setOpenReject(false);
        reset();
    }
    const handleCloseDeleteForm = () => {
        setOpenDeleteForm(false);
        reset();
    }

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
        post(route("client.clientRequests.confirm", data.id), {
            onSuccess: handleClose
        });
    }
    const reject = () => {
        post(route("client.clientRequests.reject", data.id), {
            onSuccess: handleClose
        })
    }

    const handleChange = (key, value) => {
        setData(previousData => ({...previousData, [key]: value}));
    }

    return (
        <>
            <Head title={"لیست درخواست ها"} />
            <TableLayout defaultValues={defaultValues} success={success} status={status} reload={pageReload}
                         columns={columns} data={clientRequests} rowHeight={100}
                         addNew={defaultValues?.filters?.type === "takeLeave"}
                         onClickAddNew={addNew} loading={processing || loading} Filter={Filter}
                         expandedKey={"requestable"} ExpandedComponent={ExpandedComponent}>
            </TableLayout>
            <AddForm clientRequest={data} open={openAddForm} onClose={handleClose} onSubmit={handleSubmitForm}
                     onChange={handleChange}/>

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
Index.layout = page => <ClientLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
