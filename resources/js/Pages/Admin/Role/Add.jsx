import {useForm} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {CircularProgress,Backdrop } from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddForm from './Components/Form';

const Add = ({permissions}) => {
    const {data, setData, post, processing} = useForm({name: "", permissions: []});
    const handleSubmit = () => post(route('admin.roles.store'));
    const handleCancel = () => Inertia.visit(route('admin.roles.index'));
    return (
        <>
            <AddForm data={data} setData={setData} submit={handleSubmit} permissions={permissions}
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
        title: "افزودن نقش",
        link: "",
        icon: null
    }
]

Add.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>
export default Add;
