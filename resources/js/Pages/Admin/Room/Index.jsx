import { useState} from "react";
import {Head, useForm} from "@inertiajs/inertia-react";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {Delete as DeleteIcon, Edit as EditIcon, RemoveRedEye} from "@mui/icons-material";
import TableLayout from "@/Layouts/TableLayout";
import DeleteForm from "@/Components/DeleteForm";
import Filter from "./Components/Filter";

import AddForm from "@/Pages/Admin/Room/Components/Form";
import {Inertia} from "@inertiajs/inertia";
import AdminLayout from "@/Layouts/AdminLayout";

const breadCrumbs = [
    {
        title: "بخش ها",
        link: null,
        icon: null
    }
]

const Index = ({rooms, status, success, defaultValues}) => {
    const {data, setData, post, processing, reset, errors, get} = useForm({
        name: "",
        department: null,
        managers: []
    });
    const [openDestroy, setOpenDestroy] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);

    const columns = [
        {field: 'name', headerName: 'نام', type: "string", width: 250},
        {
            field: 'department_name',
            headerName: 'دپارتمان',
            type: "string",
            width: 150,
        },
        {
            field: 'id',
            headerName: '#',
            type: 'actions',
            width: 100,
            sortable: false,
            renderCell: ({value, row}) => ([
                <GridActionsCellItem key={`show-${value}`} icon={<RemoveRedEye color={"info"}/>} label="نمایش"
                                     onClick={show(value)}/>
            ])
        }
    ];


    const edit = (id) => () => {
        console.log(id)
    };
    const destroy = (params) => () => {
        setData({...params, _method: "delete"});
        setOpenDestroy(true);
    };

    const cancelDelete = () => {
        setOpenDestroy(false);
        setOpenAddForm(false);
        reset();
    }
    const deleteRoom = () => {
        post(route('admin.rooms.destroy', data.id), {
            onSuccess: successCb
        });
    }

    const successCb = () => {
        reset();
        cancelDelete();
    }

    const show = (id) => () => get(route('admin.rooms.show', id));

    const reload = (page, filters, sort, pageSize) => {
        Inertia.visit(route("admin.rooms.index"), {
            data: {page, filters, sort, pageSize},
            preserveState: true,
            only: ["rooms", "defaultValues"]
        });
    }

    const handleAddNew = () => {
        setOpenAddForm(true);
    };

    const handleSubmit = () => {
        post(data.id ? route('admin.rooms.store') : route('admin.rooms.update', data.id), {
            onSuccess: handleCancel
        });
    }
    const handleCancel = () => {
        reset();
        setOpenAddForm(false);
    };


    return (<>
            <Head title={"لیست بخش ها"}/>
            <TableLayout defaultValues={defaultValues} addNew onClickAddNew={handleAddNew} addNewTitle={"افزودن کاربر"}
                         loading={processing} success={success} status={status} errors={errors} data={rooms}
                         only={["rooms"]} Filter={Filter} columns={columns} processing={processing} reload={reload}>
                <DeleteForm title={`بخش ${data?.name}`} openDelete={openDestroy} disAgreeCB={cancelDelete}
                            agreeCB={deleteRoom}/>
                <AddForm values={data} errors={errors} setValues={setData} loading={processing} submit={handleSubmit}
                         cancel={handleCancel} open={openAddForm}/>
            </TableLayout>
        </>
    );
}

Index.layout = page => <AdminLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
