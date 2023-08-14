import {useEffect, useState} from "react";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import {GridActionsCellItem} from "@mui/x-data-grid";
import {Edit as EditIcon, Delete as DeleteIcon} from "@mui/icons-material";

import q2o from "@/Services/querystringToObject";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";

import DeleteForm from "@/Components/DeleteForm";

import Filter from "./Components/Filter";
import AddForm from "./Components/AddForm";

const Index = () => {
    const {post, setData, data, reset, processing, get} = useForm()
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            type: "number",
            width: "70",
            hidden: true
        },
        {
            field: 'name',
            headerName: 'Title',
            type: "string",
            width: "200"
        },
        {
            field: 'action',
            headerName: 'Action',
            type: 'actions',
            sortable: false,
            getActions: (params) => {
                let cols = [
                    <GridActionsCellItem icon={<EditIcon/>} label="Edit" onClick={editPermission(params.row.id)}
                                         showInMenu/>
                ]
                if (params.row.roles_count < 1)
                    cols.push(<GridActionsCellItem icon={<DeleteIcon/>} label="Delete" showInMenu
                                                   onClick={deletePermission(params.row)}/>)
                return cols;
            }
        }
    ];
    const {permissions, status, errors} = usePage().props;
    const [permission, setPermission] = useState(null);
    const [success, setSuccess] = useState(null);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        sort: {field: 'id', sort: "asc"},
        filterModel: {search: ""},
        page: 0,
        pageSize: 10
    });
    useEffect(() => {
        reset();
        const model = q2o();
        setDefaultValues(prevState => ({...prevState, ...model}));
    }, []);
    const editPermission = (id) => async () => {
        setEdit(true);
        const res = await axios.get(route("permissionApi.show", id));
        setData({...res.data.data, _method: 'put'});
        setOpenAddForm(true);
    };
    const deletePermission = (params) => () => {
        setPermission(params);
        setData({_method: "delete"});
        setOpenDeleteForm(true);
    };
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
        get(route('admin.permissions.index', filterValues), {
            only: ["permissions", "status"]
        });
    }
    const handleCloseDeleteForm = () => {
        setPermission(null);
        reset();
        setOpenDeleteForm(false);
    };
    const handleDestroy = async () => {
        post(route('permissions.destroy', permission.id), {
            preserveState: true,
            onSuccess: (params) => {
                setSuccess(true);
                setTimeout(() => setSuccess(null), 2000);
            }
        });
        handleCloseDeleteForm();
    };
    const handleSubmitForm = () => post(edit ? route('admin.permissions.update', data.id) : route('admin.permissions.store'), {
        onSuccess: (e) => {
            setOpenAddForm(false);
            reset();
        },
    });
    const addNew = () => {
        setOpenAddForm(true);
    }
    return (
        <>
            <Head title={"Permissions List"}/>
            <TableLayout defaultValues={defaultValues} success={success} status={status} reload={pageReload}
                         columns={columns} data={permissions}
                         processing={processing} Filter={Filter} addNew addNewTitle={"Add New Permission"}
                         onClickAddNew={addNew} errors={errors}>
                <DeleteForm title={`${permission?.name} Permission`} agreeCB={handleDestroy}
                            disAgreeCB={handleCloseDeleteForm} openDelete={openDeleteForm}/>
                <AddForm title={`${!edit ? "Add New" : "Edit"} Permission`} loading={processing} open={openAddForm}
                         values={data} reset={reset}
                         setValues={setData} setOpen={setOpenAddForm} submit={handleSubmitForm}/>
            </TableLayout>
        </>);
}
const breadCrumbs = [
    {
        title: "Permissions",
        link: null,
        icon: null
    }
]
Index.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
