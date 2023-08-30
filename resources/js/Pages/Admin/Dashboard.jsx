import {Head} from '@inertiajs/inertia-react';

import AdminLayout from "@/Layouts/AdminLayout";
import Greetings from "@/Components/Greetings";


const Dashboard = ({events, ...props}) => {
    return (<>
            <Head title="داشبورد"/>
            <Greetings user={props.auth.user.name}/>
        </>
    );
}

Dashboard.layout = page => <AdminLayout auth={page.props.auth} errors={page.props.errors} header={"داشبورد"}
                                        children={page}/>
export default Dashboard;
