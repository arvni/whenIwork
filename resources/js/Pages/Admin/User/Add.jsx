import {useEffect, useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {
    Backdrop,
    CircularProgress
} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserForm from "./Components/Form";

const Add = (props) => {
    const {data, setData, post, errors, processing} = useForm({
        name: "",
        mobile: "",
        email: "",
        avatar: "",
        role: [],
        password: "",
        password_confirmation: ""
    });
    const handleSubmit = () => {
        post(route('admin.users.store'));
    }
    const handleCancel = () => Inertia.visit(route('admin.users.index'));
    return <UserForm values={data} errors={errors} setValues={setData} loading={processing} submit={handleSubmit}
                     cancel={handleCancel}/>;
}

const breadCrumbs = [
    {
        title: "کاربران",
        link: route("admin.users.index"),
        icon: null
    },
    {
        title: "افزودن کاربر",
        link: null,
        icon: null
    }
]
Add.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default Add;
