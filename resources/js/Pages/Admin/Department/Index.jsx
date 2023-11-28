import {useState} from "react";
import {Head, useForm} from "@inertiajs/inertia-react";

import {GridActionsCellItem} from "@mui/x-data-grid";
import {Edit as EditIcon, Delete as DeleteIcon, RemoveRedEye} from "@mui/icons-material";
import MapIcon from '@mui/icons-material/Map';

import TableLayout from "@/Layouts/TableLayout";

import DeleteForm from "@/Components/DeleteForm";

import Filter from "./Components/Filter";
import AddForm from "./Components/AddForm";
import {Inertia} from "@inertiajs/inertia";
import AdminLayout from "@/Layouts/AdminLayout";


const Index = ({departments, status, errors, defaultValues,success}) => {
    const {post, setData, data, reset, processing} = useForm({name: "", description: "", isActive: true})
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
                    <GridActionsCellItem key={"show-"+params.value}
                                         icon={<RemoveRedEye color={"info"}/>}
                                         label="نمایش"
                                         title="نمایش"
                                         href={route("admin.departments.show", params.row.id)}
                                         onClick={showDepartment(route("admin.departments.show", params.row.id))}
                    />,
                    <GridActionsCellItem key={"show-map-view-"+params.value}
                                         icon={<MapIcon color={"success"}/>}
                                         label="نمای کلی"
                                         title="نمای کلی"
                                         href={route("admin.departments.map", params.row.id)}
                                         onClick={showDepartment(route("admin.departments.map", params.row.id))}
                    />,
                    <GridActionsCellItem key={"edit-"+params.value}
                                         icon={<EditIcon color={"warning"}/>}
                                         label="بروزرسانی"
                                         title="بروزرسانی"
                                         onClick={editDepartment(params.row.id)}
                    />
                ]
                if (params.row.rooms_count < 1)
                    cols.push(<GridActionsCellItem key={"delete-"+params.value}
                                                   icon={<DeleteIcon color={"error"}/>}
                                                   label="حذف"
                                                   onClick={deleteDepartment(params.row)}/>)
                return cols;
            }
        }
    ];
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const editDepartment = (id) => async () => {
        setEdit(true);
        const res = await axios.get(route("admin.departmentApi.show", id));
        setData({...res.data.data, _method: 'put'});
        setOpenAddForm(true);
    };
    const showDepartment = (route) => (e) => {
        e.preventDefault();
        Inertia.visit(route);
    }
    const deleteDepartment = (params) => () => {
        setData({...params,_method: "delete"});
        setOpenDeleteForm(true);
    };
    const pageReload = (page, filters, sort, pageSize) => Inertia.visit(route('admin.departments.index'), {
        only: ["departments", "status", "defaultValues"],
        data: {page, filters, sort, pageSize},
        preserveState: true
    });
    const handleCloseDeleteForm = () => {
        setOpenDeleteForm(false);
        reset();
    };
    const handleDestroy = async () => {
        post(route('admin.departments.destroy', data.id), {
            preserveState: true,
            onSuccess: () => {
                handleCloseDeleteForm();
            }
        });
    };
    const handleSubmitForm = () => post(data?.id ? route('admin.departments.update', data.id) : route('admin.departments.store'), {
        onSuccess: () => {
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
                <DeleteForm title={`دپارتمان ${data?.name}`} agreeCB={handleDestroy}
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
Index.layout = page => <AdminLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
