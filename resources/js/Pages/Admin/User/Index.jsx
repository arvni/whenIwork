import {useState} from "react";
import {Head, useForm} from "@inertiajs/inertia-react";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {Password, Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";
import DeleteForm from "@/Components/DeleteForm";
import ChangePassword from "./Components/ChangePassword";
import Filter from "./Components/Filter";
import {useInertiaVisit} from "@/Services/Inertia";
import {Inertia} from "@inertiajs/inertia";

const Index = ({users, status, defaultValues}) => {
    const {setData, data, post, processing, reset, setError, errors} = useForm();
    const [open, setOpen] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [success, setSuccess] = useState(null);
    const columns = [
        {field: 'userId', headerName: 'شناسه', type: "string", width: 70},
        {field: 'name', headerName: 'نام', type: "string", width: 150},
        {field: 'email', headerName: 'ایمیل', type: "email", width: 150},
        {field: 'mobileNo', headerName: 'شماره موبایل', type: "string", width: 100},
        {
            field: 'role',
            headerName: 'نقش',
            type: "string",
            sortable: false,
            renderCell: (params) => params.row.roles.map(item => item.name).join(", ")
        },
        {
            field: 'id',
            headerName: '#',
            type: 'actions',
            width: 100,
            sortable: false,
            renderCell: (params) => ([
                <GridActionsCellItem icon={<EditIcon color={"warning"}/>} label="بروزرسانی"
                                     onClick={edit(params.row.id)}/>,
                <GridActionsCellItem icon={<Password/>} label="تغییر رمز عبور" onClick={editPassword(params.row.id)}
                />,
                <GridActionsCellItem icon={<DeleteIcon color={"error"}/>} label="حذف"
                                     onClick={destroy(params.row)}/>
            ])
        }
    ];
    const [user, setUser] = useState(null);

    const edit = (id) => () => Inertia.visit(route('admin.users.edit', id));

    const destroy = (params) => () => {
        setUser(params);
        setData({_method: "delete"});
        setOpen(true);
    };
    const cancelDelete = () => {
        setOpen(false);
        setUser(null);
    }
    const deleteUser = () => {
        post(route('admin.users.destroy', user.id), {onSuccess: successCb});
    }

    const editPassword = (id) => () => {
        setData({
            current: "",
            password: "",
            password_confirmation: "",
            userId: id,
            _method: "put"
        })
        setOpenChangePassword(true);
    }
    const changePassword = () => {
        post(route("password.update"), {
            onSuccess: successCb
        });
    }
    const closeChangePassword = () => {
        setOpenChangePassword(false);
    }

    const successCb = () => {
        setSuccess(true);
        setOpenChangePassword(false);
        cancelDelete();
        setTimeout(() => {
            setSuccess(null);
            reset();
        }, 2000);
    }
    const pageReload = (page, filter, sort, pageSize) =>
        Inertia.visit(route('admin.users.index'), {
            only: ["users", "defaultValues"],
            data: {
                filterModel: filter,
                page,
                sort,
                pageSize
            },
            preserveState: true
        });

    const handleAddNew = () => Inertia.visit(route('admin.users.create'));
    return (<>
            <Head title={"لیست کاربران"}/>
            <TableLayout
                defaultValues={defaultValues}
                addNew
                onClickAddNew={handleAddNew}
                addNewTitle={"افزودن کاربر"}
                loading={processing}
                success={success}
                status={status}
                errors={errors}
                data={users}
                Filter={Filter}
                columns={columns}
                reload={pageReload}
            >
                <DeleteForm title={`${user?.name} User`} openDelete={open} disAgreeCB={cancelDelete}
                            agreeCB={deleteUser}/>
                <ChangePassword onClose={closeChangePassword} onSubmit={changePassword} data={data} errors={errors}
                                setError={setError} open={openChangePassword && !processing} userId={user}
                                currentNeeded={false} setData={setData}/>
            </TableLayout>
        </>
    );
}

const breadCrumbs = [
    {
        title: "کاربران",
        link: null,
        icon: null
    }
]

Index.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
