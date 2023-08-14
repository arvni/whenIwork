import {useEffect, useState} from "react";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import {convertDate, convertNumber} from "@/Services/helper";
import q2o from "@/Services/querystringToObject";

import {GridActionsCellItem} from "@mui/x-data-grid";
import {colors, Stack} from "@mui/material";
import {
    PendingActions as PendingActionsIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";
import DeleteForm from "@/Components/DeleteForm";

import ExpandedCell from "@/Components/ExpandedCell";

import Filter from "./Components/Filter";
import AddForm from "./Components/AddForm";


export const types = {
    "cheque": "چک",
    "deposit": "واریز به حساب",
    "card": "کارت به کارت",
}

export const renderOtherData = ({row}) => <Stack spacing={2}>
    {row.type === "cheque" ?
        <span>
            <strong>شماره چک : </strong>
            <span>{row.chequeNumber}</span>
        </span>
        : row.type === "deposit" ?
            <Stack spacing={1}>
                <span>
                    <strong>صاحب حساب واریز کننده : </strong>
                    <span>{row.accountOwner}</span>
                </span>
                <span>
                    <strong>بانک مبدا : </strong>
                    <span>{row.originBank}</span>
                </span>
            </Stack> : row.type === "card" ?
                <Stack spacing={1}>
                    <span>
                        <strong>شماره کارت : </strong>
                        <span>{row.originCard}</span>
                    </span>
                    <Stack spacing={1}>
                        <strong>کد رهگیری</strong>
                        <span>{row.trackingCode}</span>
                    </Stack>
                </Stack> : null}
</Stack>;
const renderStatus = ({row}) => {
    switch (row.status) {
        case "pending":
            return <PendingActionsIcon sx={{color: colors.yellow.A700}}/>;
        case "confirm":
            return <CheckCircleIcon sx={{color: colors.green.A700}}/>;
        case "reject":
            return <CancelIcon sx={{color: colors.red.A400}}/>;
    }
}

const Index = (props) => {
    const {post, setData, data, reset, processing, wasSuccessful, get} = useForm({
        price: 0,
        type: "deposit",
        date: new Date(),
        chequeNumber: "",
        accountOwner: "",
        originBank: "",
        originCard: "",
        trackingCode: "",
        description: "",
        details: "",
        confirm: false,
        ...q2o()
    })
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
            field: 'price',
            headerName: 'مبلغ (ریال)',
            type: "number",
            flex: .4,
            sortable: false,
            renderCell: ({row}) => convertNumber(row.price)
        },
        {
            field: 'type',
            headerName: 'نحوه پرداخت',
            type: "string",
            flex: .3,
            sortable: false,
            renderCell: ({row}) => types[row.type]
        },
        {
            field: 'originBank',
            headerName: 'سایر اطلاعات',
            type: "string",
            flex: 1,
            sortable: false,
            renderCell: renderOtherData
        },
        {
            field: 'date',
            headerName: 'تاریخ واریز',
            type: "date",
            flex: .3,
            renderCell: ({value}) => convertDate(value)
        },
        {
            field: 'created_at',
            headerName: 'تاریخ ایجاد',
            type: "date",
            flex: .4,
            renderCell: ({value}) => convertDate(value)
        },
        {
            field: 'description',
            headerName: ' توضیحات پرداخت کننده',
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
            renderCell: renderStatus
        },
        {
            field: 'confirmed_by',
            headerName: 'بررسی کننده',
            type: "string",
            flex: .5,
            renderCell: ({row}) => row.confirmed_by?.name
        },
        {
            field: 'confirmed_at',
            headerName: 'تاریخ بررسی',
            type: "string",
            flex: .4,
            renderCell: ({value}) => value ? convertDate(value) : null
        },
        {
            field: 'details',
            headerName: 'توضیحات بررسی کننده',
            type: "string",
            flex: .5,
            sortable: false,
            renderCell: ExpandedCell
        },
        {
            field: 'id',
            headerName: '#',
            type: 'actions',
            flex: .2,
            renderCell: (params) => {
                let cols = []
                if (params.row.status === "pending") {
                    if (auth.permissions.includes("ClientRequest Add"))
                        cols.push(<GridActionsCellItem icon={<EditIcon/>} label="بروررسانی"
                                                       onClick={editClientRequest(params.row.id)}
                                                       showInMenu/>);
                    if (auth.permissions.includes("ClientRequest Confirm"))
                        cols.push(<GridActionsCellItem icon={<EditIcon/>} label="بررسی"
                                                       onClick={confirmClientRequest(params.row.id)}
                                                       showInMenu/>)
                    if (auth.permissions.includes("ClientRequest Delete"))
                        cols.push(<GridActionsCellItem icon={<DeleteIcon/>} label="حذف" showInMenu
                                                       onClick={deleteClientRequest(params.row)}/>)
                }
                return cols;
            }
        }
    ];
    const {clientRequests, status, errors, auth} = usePage().props;
    const [loading, setLoading] = useState(false);
    const [openConfirmForm, setOpenConfirmForm] = useState(false);
    const [clientRequest, setClientRequest] = useState(null);
    const [success, setSuccess] = useState(null);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [url, setUrl] = useState("");
    const [defaultValues, setDefaultValues] = useState({
        sort: {field: 'created_at', sort: "desc"},
        filterModel: {search: ""},
        page: 0,
        pageSize: 10
    });
    const editClientRequest = (id) => async () => {
        setEdit(true);
        setLoading(true);
        const res = await axios.get(route("clientRequests.show", id));
        setData({...res.data.data, _method: 'put'});
        setOpenAddForm(true);
        setUrl(route('clientRequests.update', id))
        setLoading(false);
    };
    const successCb = () => {
        setSuccess(true);
        reset();
        setOpenConfirmForm(false);
        setOpenAddForm(false);
        setOpenDeleteForm(false);
        setTimeout(() => setSuccess(null), 200);
    }
    const confirmClientRequest = (id) => async () => {
        setEdit(true);
        setLoading(true);
        const res = await axios.get(route("clientRequests.show", id));
        setData(previousData => ({...previousData, ...res.data.data}));
        setUrl(route("clientRequests.confirm", id));
        setOpenConfirmForm(true);
        setLoading(false);
    };
    const deleteClientRequest = (params) => () => {
        setClientRequest(params);
        setData({_method: "delete"});
        setOpenDeleteForm(true);
    };
    const pageReload = (page, filter, sort, pageSize) => {
        let filterValues = {};
        if (page)
            filterValues.page = page + 1;
        if (filter)
            filterValues.filterModel = filter
        if (sort)
            filterValues.sort = sort;
        if (pageSize)
            filterValues.pageSize = pageSize;
        setDefaultValues(prevState => ({...prevState, ...filterValues}));
        get(route('clientRequests.index', filterValues), {
            only: ["clientRequests", "status"]
        });
    }
    const handleCloseDeleteForm = () => {
        setClientRequest(null);
        reset();
        setOpenDeleteForm(false);
    };

    const handleDestroy = async () => {
        post(route('clientRequests.destroy', clientRequest.id), {
            preserveState: true,
            onSuccess: successCb
        });
        handleCloseDeleteForm();
    };
    const handleSubmitForm = () => post(url, {onSuccess: successCb});
    const addNew = () => {
        setOpenAddForm(true);
        setUrl(route("clientRequests.store"))
    }
    const handleClose = () => {
        reset();
        setOpenAddForm(false);
        setOpenConfirmForm(false);
        setEdit(false);
    }
    return (
        <>
            <Head title={"لیست درخواست ها"}/>
            <TableLayout defaultValues={defaultValues} success={success} status={status} reload={pageReload}
                         columns={columns} data={clientRequests} rowHeight={100}
                         loading={processing || loading} Filter={Filter} addNew addNewTitle={"ثپت پرداخت"}
                         onClickAddNew={addNew} errors={errors}>
                <DeleteForm title={`پرداخت`} agreeCB={handleDestroy}
                            disAgreeCB={handleCloseDeleteForm} openDelete={openDeleteForm}/>
                <AddForm title={`${!edit ? "ثبت" : "بروزرسانی"} پرداخت`} loading={processing || loading}
                         open={openAddForm}
                         values={data} setValues={setData} setOpen={setOpenAddForm} submit={handleSubmitForm}
                         onClose={handleClose}/>
            </TableLayout>
        </>);
}
const breadCrumbs = [
    {
        title: "پرداخت ها",
        link: null,
        icon: null
    }
]
Index.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
