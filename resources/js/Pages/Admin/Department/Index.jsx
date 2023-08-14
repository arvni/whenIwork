import {useEffect, useState} from "react";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import {GridActionsCellItem} from "@mui/x-data-grid";
import {Edit as EditIcon, Delete as DeleteIcon, RemoveRedEye} from "@mui/icons-material";

import q2o from "@/Services/querystringToObject";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";

import DeleteForm from "@/Components/DeleteForm";

import Filter from "./Components/Filter";
import AddForm from "./Components/AddForm";
import {Inertia} from "@inertiajs/inertia";

const Index = ({departments, status, errors, defaultValues}) => {
    const {post, setData, data, reset, processing, get} = useForm()
    const columns = [
        {
            field: 'name',
            headerName: 'عنوان',
            type: "string",
        },
        {
            field: 'rooms_count',
            headerName: 'تعداد بخش ها',
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
                                         onClick={showDepartment(params.row.id)}
                    />,
                    <GridActionsCellItem icon={<EditIcon color={"warning"}/>} label="بروزرسانی"
                                         onClick={editDepartment(params.row.id)}
                    />
                ]
                if (params.row.rooms_count < 1)
                    cols.push(<GridActionsCellItem icon={<DeleteIcon color={"error"}/>} label="حذف"
                                                   onClick={deleteDepartment(params.row)}/>)
                return cols;
            }
        }
    ];
    const [department, setDepartment] = useState({name: "", description: "", isActive: true});
    const [success, setSuccess] = useState(null);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const editDepartment = (id) => async () => {
        setEdit(true);
        const res = await axios.get(route("admin.departmentApi.show", id));
        setData({...res.data.data, _method: 'put'});
        setOpenAddForm(true);
    };
    const showDepartment = (id) => () => Inertia.visit(route("admin.departments.show", id));
    const deleteDepartment = (params) => () => {
        setDepartment(params);
        setData({_method: "delete"});
        setOpenDeleteForm(true);
    };
    const pageReload = (page, filterModel, sort, pageSize) => Inertia.visit(route('admin.departments.index'), {
        only: ["departments", "status", "defaultValues"],
        data: {page, filterModel, sort, pageSize},
        preserveState: true
    });
    const handleCloseDeleteForm = () => {
        setDepartment({name: "", description: "", isActive: true});
        reset();
        setOpenDeleteForm(false);
    };
    const handleDestroy = async () => {
        post(route('admin.departments.destroy', department.id), {
            preserveState: true,
            onSuccess: (params) => {
                setSuccess(true);
                setTimeout(() => setSuccess(null), 2000);
                handleCloseDeleteForm();
            }
        });
    };
    const handleSubmitForm = () => post(data?.id ? route('admin.departments.update', data.id) : route('admin.departments.store'), {
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
            <Head title={"لیست دپارتمان ها"}/>
            <TableLayout defaultValues={defaultValues} success={success} status={status} reload={pageReload}
                         columns={columns} data={departments}
                         loading={processing} Filter={Filter} addNew addNewTitle={"افزودن دپارتمان"}
                         onClickAddNew={addNew} errors={errors}>
                <DeleteForm title={`${department?.name} دپارتمان`} agreeCB={handleDestroy}
                            disAgreeCB={handleCloseDeleteForm} openDelete={openDeleteForm}/>
                <AddForm title={`${!edit ? "افزودن" : "بروزرسانی"} دپارتمان`} loading={processing} open={openAddForm}
                         values={data} reset={reset}
                         setValues={setData} setOpen={setOpenAddForm} submit={handleSubmitForm}/>
            </TableLayout>
        </>);
}
const breadCrumbs = [
    {
        title: "دپارتمان ها",
        link: null,
        icon: null
    }
]
Index.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
