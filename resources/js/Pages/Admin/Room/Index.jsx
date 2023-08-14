import {useEffect, useState} from "react";
import {Head, useForm} from "@inertiajs/inertia-react";
import {GridActionsCellItem} from "@mui/x-data-grid";
import q2o from "@/Services/querystringToObject";
import {Delete as DeleteIcon, Edit as EditIcon, RemoveRedEye} from "@mui/icons-material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";
import DeleteForm from "@/Components/DeleteForm";
import Filter from "./Components/Filter";
import {pageReload} from "@/Services/Inertia";
import AddForm from "@/Pages/Admin/Room/Components/Form";

const breadCrumbs = [
    {
        title: "بخش ها",
        link: null,
        icon: null
    }
]

const Index = ({rooms, status}) => {
    const {data,setData, post, processing, reset, errors, wasSuccessful, get} = useForm({
        name: "",
        department: null,
        managers: []
    });
    const [loading, setLoading] = useState(false);
    const [openDestroy, setOpenDestroy] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [success, setSuccess] = useState(null);

    const columns = [
        {field: 'name', headerName: 'نام', type: "string", width: 250},
        {
            field: 'department',
            headerName: 'دپارتمان',
            type: "string",
            sortable: false,
            width: 150,
            renderCell: (params) => params.row.department.name
        },
        {
            field: 'id',
            headerName: '#',
            type: 'actions',
            width: 100,
            sortable: false,
            renderCell: (params) => ([
                <GridActionsCellItem icon={<RemoveRedEye color={"info"}/>} label="نمایش"
                                     onClick={show(params.row.id)}/>,
                <GridActionsCellItem icon={<EditIcon color={"warning"}/>} label="بروزرسانی"
                                     onClick={edit(params.row.id)}/>,
                <GridActionsCellItem icon={<DeleteIcon color={"error"}/>} label="حذف" onClick={destroy(params.row)}/>
            ])
        }
    ];

    const [defaultValues, setDefaultValues] = useState({
        sort: {field: 'id', sort: "asc"},
        filterModel: {search: "", department: null},
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
            successCb();
            reset();
            cancelDelete();
        }
    }, [wasSuccessful])

    const edit = (id) => () =>{

    };
    const destroy = (params) => () => {
        setData({...params,_method: "delete"});
        setOpenDestroy(true);
    };

    const cancelDelete = () => {
        setOpenDestroy(false);
        reset();
    }
    const deleteRoom = () => {
        post(route('admin.rooms.destroy', data.id));
    }

    const successCb = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(null);
            reset();
        }, 2000);
    }

    const show = (id) => () => get(route('admin.rooms.show', id));

    const reload = (page, filter, sort, pageSize) => {
        pageReload({page, filter, sort, pageSize}, {
            url: "admin.rooms.index",
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
            setDefaultValues
        });
    }

    const handleAddNew = () => {
        setOpenAddForm(true);
    };

    const handleSubmit = () => {
        data.id?post(route('admin.rooms.store')):post(route('admin.rooms.store'));
    }
    const handleCancel = () => {
        reset();
        setOpenAddForm(false);
    };


    return (<>
            <Head title={"لیست بخش ها"}/>
            <TableLayout defaultValues={defaultValues} addNew onClickAddNew={handleAddNew} addNewTitle={"افزودن کاربر"}
                         loading={processing || loading} success={success} status={status} errors={errors} data={rooms}
                         only={["rooms"]} Filter={Filter} columns={columns} processing={processing} reload={reload}>
                <DeleteForm title={`${data?.name} بخش`} openDelete={openDestroy} disAgreeCB={cancelDelete}
                            agreeCB={deleteRoom}/>
                <AddForm values={data} errors={errors} setValues={setData} loading={processing} submit={handleSubmit}
                         cancel={handleCancel} open={openAddForm}/>
            </TableLayout>
        </>
    );
}

Index.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
