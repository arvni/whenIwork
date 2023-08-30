
import {useForm} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import UserForm from "./Components/Form";
import AdminLayout from "@/Layouts/AdminLayout";

const Add = (props) => {
    const {data, setData, post, processing, errors} = useForm({...props.user, _method: "put"});
    const handleSubmit = () => post(route('admin.users.update', props.user.id));
    const handleCancel = () => Inertia.visit(route('users.index'));
    return <UserForm values={data} errors={errors} setValues={setData} loading={processing} submit={handleSubmit}
                      cancel={handleCancel} edit/>;
}

const breadCrumbs = [
    {
        title: "کاربران",
        link: route("admin.users.index"),
        icon: null
    },
    {
        title: "بروز رسانی کاربر",
        link: null,
        icon: null
    }
]
Add.layout = page => <AdminLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Add;
