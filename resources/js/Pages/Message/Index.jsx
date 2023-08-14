import {useEffect, useState} from "react";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import q2o from "@/Services/querystringToObject";
import {convertDate} from "@/Services/helper";

import {colors, Stack, IconButton} from "@mui/material";
import {Edit as EditIcon, RemoveRedEye, Delete as DeleteIcon} from "@mui/icons-material";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";
import DeleteForm from "@/Components/DeleteForm";
import ExpandedCell from "@/Components/ExpandedCell";

import Show from "./Components/Show";
import Filter from "./Components/Filter";
import AddForm from "./Components/AddForm";

const Index = (props) => {
    const {post, setData, data, reset, processing, wasSuccessful, errors, get} = useForm()
    const columns = [
        {
            field: 'title',
            headerName: 'عنوان',
            type: "string",
            width: "200"
        },
        {
            field: 'sender',
            headerName: 'فرستنده',
            type: "string",
            width: "200",
            renderCell: ({row}) => row.sender.name
        },
        {
            field: 'receivers',
            headerName: 'گیرنده',
            type: "string",
            width: "200",
            renderCell: ({row}) => <ExpandedCell value={row.receivers.map(item => item.name).join(", ")}/>
        },
        {
            field: 'created_at',
            headerName: 'تاریخ ارسال',
            type: "string",
            width: "150",
            renderCell: ({value}) => convertDate(value)
        },
        {
            field: 'id',
            headerName: '#',
            width: 200,
            sortable: false,
            renderCell: ({row, value}) => <Stack spacing={2} direction={"row"}>
                <IconButton onClick={showMessage(value)}><RemoveRedEye sx={{color: colors.green.A700}}/></IconButton>
                {!(row.receivers.map(item => item.pivot.read_at).reduce((a, b) => !!a || !!b, false)) && props.auth.permissions.includes("Message Delete") ?
                    <>
                        <IconButton onClick={editMessage(row)} sx={{color: colors.yellow.A700}}><EditIcon/></IconButton>
                        <IconButton onClick={deleteMessage(row)}
                                    sx={{color: colors.red.A700}}><DeleteIcon/></IconButton>
                    </> : null}
            </Stack>
        }
    ];
    const {messages, status} = usePage().props;
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openShow, setOpenShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        sort: {field: 'created_at', sort: "desc"},
        filterModel: {search: ""},
        page: 0,
        pageSize: 10
    });
    useEffect(() => {
        reset();
        const model = q2o();
        setDefaultValues(prevState => ({...prevState, ...model}));
    }, []);
    useEffect(() => {
        if (wasSuccessful) {
            successCallback();
        }
    }, [wasSuccessful])
    const addNew = () => {
        setOpenAddForm(true);
    }
    const showMessage = (id) => async () => {
        setLoading(true);
        await fetchMessage(id);
        setOpenShow(true);
    };
    const editMessage = (id) => async () => {
        await fetchMessage(id);
        setOpenAddForm(true);
    };
    const deleteMessage = (params) => () => {
        setMessage(params);
        setData({_method: "delete"});
        setOpenDeleteForm(true);
    };
    const fetchMessage = async (id) => {
        setLoading(true);
        const res = await axios.get(route("messages.show", id));
        setLoading(false);
        setData({...res.data.data, _method: 'put'});
    }
    const pageReload = (page, filter, sort, pageSize) => {
        let filterValues = {};
        if (page)
            filterValues.page = page;
        if (filter)
            filterValues.filterModel = filter
        if (sort)
            filterValues.sort = sort;
        if (pageSize)
            filterValues.pageSize = pageSize;
        setDefaultValues(prevState => ({...prevState, ...filterValues}));
        get(route('messages.index', filterValues), {
            only: ["messages", "status"]
        });
    }
    const handleCloseDeleteForm = () => {
        setMessage(null);
        reset();
        setOpenDeleteForm(false);
    };
    const handleDestroy = async () => {
        post(route('messages.destroy', message.id), {preserveState: true});
    };

    const successCallback = () => {
        handleCloseDeleteForm();
        setSuccess(true);
        setOpenAddForm(false);
        setTimeout(() => setSuccess(null), 2000);
    }

    const handleSubmitForm = () => data.hasOwnProperty("id") && data.id ? post(route('messages.update', data.id)) : post(route('messages.store'));

    return (
        <>
            <Head title={"لیست پیام ها"}/>
            <TableLayout defaultValues={defaultValues} success={success} status={status} reload={pageReload}
                         Filter={Filter} columns={columns} data={messages} addNewTitle={"ارسال پیام"}
                         onClickAddNew={addNew} errors={errors} processing={processing || loading}
                         addNew={props.auth.permissions.includes("Message Add")}>
                <DeleteForm title={`پیام ${message?.title}`} agreeCB={handleDestroy}
                            disAgreeCB={handleCloseDeleteForm} openDelete={openDeleteForm}/>
                {openAddForm ?
                    <AddForm title={`ارسال پیام`} loading={processing || loading} open={openAddForm} values={data}
                             setValues={setData} setOpen={setOpenAddForm} submit={handleSubmitForm} reset={reset}
                             errors={errors}/> : null}
                <Show open={openShow} setOpen={setOpenShow} reset={reset}
                      showReceivers={props.auth.permissions.includes("Message Receivers")} values={data}/>
            </TableLayout>
        </>);
}
const breadCrumbs = [
    {
        title: "پیام ها",
        link: null,
        icon: null
    }
]
Index.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
