import {useEffect, useState} from "react";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import {GridActionsCellItem} from "@mui/x-data-grid";
import {Edit as EditIcon, Delete as DeleteIcon, RemoveRedEye} from "@mui/icons-material";

import q2o from "@/Services/querystringToObject";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";

import DeleteForm from "@/Components/DeleteForm";

import Filter from "./Components/Filter";
import AddForm from "@/Pages/Admin/Room/Components/Form";
import {fetchData} from "@/Services/fetchData";
import {Inertia} from "@inertiajs/inertia";
import Loading from "@/Components/Loading";

const Index = () => {
    const {department, status, errors, defaultValues} = usePage().props;
    const {post, data, setData, reset, processing, get, wasSuccessful} = useForm();
    const columns = [
        {
            field: 'name',
            headerName: 'عنوان',
            type: "string",
        },
        {
            field: 'id',
            headerName: '#',
            type: 'actions',
            sortable: false,
            renderCell: (params) => {
                let cols = [
                    <GridActionsCellItem icon={<RemoveRedEye color={"info"}/>} label="نمایش"
                                         onClick={showRoom(params.row.id)}
                                         href={route("admin.rooms.show", [params.row.id])}
                    />,
                    <GridActionsCellItem icon={<EditIcon color={"warning"}/>} label="بروزرسانی"
                                         onClick={editRoom(params.row.id)}
                    />
                ]
                if (params.row.shifts_count < 1)
                    cols.push(<GridActionsCellItem icon={<DeleteIcon color={"error"}/>} label="حذف"
                                                   onClick={deleteRoom(params.row)}/>)
                return cols;
            }
        }
    ];
    const [success, setSuccess] = useState(null);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const successCb = () => {
        reset();
        setOpenAddForm(false);
        setOpenDeleteForm(false);
        setSuccess(true);
        setTimeout(() => setSuccess(null), 2000);
    }

    const editRoom = (id) => () => {
        setLoading(true);
        fetchData(route("admin.roomApi.show", id)).then(res => {
            setData({...res, _method: "put"});
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setOpenAddForm(true);
            setLoading(false);
        });
    };
    const addNew = () => {
        setData({
            name: "",
            department: {
                name: department.name,
                id: department.id
            },
            managers: []
        });
        setOpenAddForm(true);
    }

    const handleSubmit = () => data.id ? post(route(`admin.rooms.update`, data.id)) : post(route("admin.rooms.store"), {onSuccess: successCb});

    const handleCloseAddForm = () => {
        setOpenAddForm(false);
        reset();
    }

    const showRoom = (id) => () => Inertia.visit(route("admin.rooms.show", id));

    const pageReload = (page, filterModel, sort, pageSize) => Inertia.visit(route('admin.departments.show', department.id), {
        data: {
            page, filterModel, sort, pageSize
        },
        only: ["departments", "status", "defaultValues"],
        preserveState: true
    });

    const deleteRoom = (params) => () => {
        setData({...params, _method: "delete"});
        setOpenDeleteForm(true);
    };
    const handleCloseDeleteForm = () => {
        setOpenDeleteForm(false);
        reset();
    };
    const handleDestroy = () => post(route('admin.rooms.destroy', data.id), {
        preserveState: true,
        onSuccess: successCb
    });
    return (
        <>
            <Head title={`دپارتمان ${department.name}`}/>
            <TableLayout defaultValues={defaultValues} success={success} status={status} reload={pageReload}
                         columns={columns} data={department.rooms}
                         loading={processing} Filter={Filter} addNew addNewTitle={"افزودن بخش"}
                         onClickAddNew={addNew} errors={errors}>
                <DeleteForm title={`${department?.name} اتاق`} agreeCB={handleDestroy}
                            disAgreeCB={handleCloseDeleteForm} openDelete={openDeleteForm}/>
                <AddForm values={data} errors={errors} setValues={setData} loading={processing} submit={handleSubmit}
                         cancel={handleCloseAddForm} open={openAddForm} disabledDepartment={true}/>
            </TableLayout>
            <Loading open={loading}/>
        </>);
}
const breadCrumbs = [
    {
        title: "دپارتمان ها",
        link: route("admin.departments.index"),
        icon: null
    }
]
Index.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={[...breadCrumbs, {
    title: `دپارتمان ${page.props.department.name}`,
    link: null,
    icon: null
}]}/>

export default Index;
