import {Head} from '@inertiajs/inertia-react';
import FullCalendar from "@/Components/FullCalendar";
import {Inertia} from "@inertiajs/inertia";
import ClientLayout from "@/Layouts/ClientLayout";
import Greetings from "@/Components/Greetings";


const Dashboard = ({events, ...props}) => {
    const handleNavigate = (date) => {
        Inertia.visit(route("dashboard"), {
            preserveState: true,
            data: {
                date
            }
        })
    }
    return (<>
            <Head title="داشبورد"/>
            <Greetings user={props.auth.user.name}/>
            <FullCalendar onNavigate={handleNavigate} events={events.map(item => ({
                ...item,
                start: new Date(item.start),
                end: new Date(item.end)
            }))}/>
        </>
    );
}

Dashboard.layout = page => <ClientLayout auth={page.props.auth} errors={page.props.errors} header={"داشبورد"}
                                         children={page}/>
export default Dashboard;
