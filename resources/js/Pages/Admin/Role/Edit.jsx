import {useForm} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {Backdrop,CircularProgress} from "@mui/material";
import AddForm from './Components/Form';
import AdminLayout from "@/Layouts/AdminLayout";

const Edit = ({permissions, role}) => {
    const {data, setData, post, processing} = useForm({...role, _method: "put"});
    const handleSubmit = () => post(route('admin.roles.update', role.id));
    const handleCancel = () => Inertia.visit(route('admin.roles.index'));
    return (
        <>
            <AddForm data={data} edit setData={setData} submit={handleSubmit} permissions={permissions}
                     cancel={handleCancel}/>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={processing}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
}

const breadCrumbs = [
    {
        title: "نقش ها",
        link: "/roles",
        icon: null,
    },
    {
        title: "بروز رسانی نقش",
        link: "",
        icon: null
    }
]

Edit.layout = page => <AdminLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>
export default Edit;
