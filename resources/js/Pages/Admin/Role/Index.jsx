import {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {GridActionsCellItem} from "@mui/x-data-grid";
import Filter from "./Components/Filter";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";
import DeleteForm from "@/Components/DeleteForm";


const Index = ({roles, status, defaultValues}) => {
    const {post, setData, reset, processing} = useForm()
    const columns = [
        {
            field: 'name',
            headerName: 'عنوان',
            type: "string",
            width: 200
        },
        {
            field: 'id',
            headerName: '#',
            type: 'actions',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                let cols = [
                    <GridActionsCellItem icon={<EditIcon/>} label="بروزرسانی" onClick={editRole(params.row.id)}/>
                ]
                if (params.row.users_count < 1)
                    cols.push(<GridActionsCellItem icon={<DeleteIcon/>} label="حذف"
                                                   onClick={deleteRole(params.row)}/>)
                return cols;
            }
        }
    ];
    const [role, setRole] = useState(null);
    const [success, setSuccess] = useState(null);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const editRole = (id) => () => Inertia.visit(route('admin.roles.edit', id));
    const deleteRole = (params) => () => {
        setRole(params);
        setData({_method: "delete"});
        setOpenDeleteForm(true);
    };
    const pageReload = (page, filterModel, sort, pageSize) => {
        Inertia.visit(route("admin.roles.index"), {
            data: {filterModel, page, sort, pageSize},
            only: ["roles", "defaultValues"],
            preserveState: true
        });
    };
    const resetSuccess = () => setTimeout(() => setSuccess(null), 150);
    const handleCloseDeleteForm = () => {
        setRole(null);
        reset();
        setOpenDeleteForm(false);
    };
    const handleDestroy = async () => {
        post(route('admin.roles.destroy', role.id), {
            preserveState: true,
            onSuccess: () => {
                setSuccess(true);
                resetSuccess();
            }
        });
        handleCloseDeleteForm();
    };
    const addPermission = () => {
        Inertia.visit(route('admin.roles.create'));
    }
    return <TableLayout defaultValues={defaultValues} columns={columns} data={roles} reload={pageReload} Filter={Filter}
                        loading={processing}
                        success={success} status={status} addNew addNewTitle={"افزودن نقش"}
                        onClickAddNew={addPermission}>
        <DeleteForm title={`نقش ${role?.name}`} agreeCB={handleDestroy} disAgreeCB={handleCloseDeleteForm}
                    openDelete={openDeleteForm}/>
    </TableLayout>;
}


const breadCrumbs = [
    {
        title: "نقش ها",
        link: null,
        icon: null
    }
]

Index.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Index;
