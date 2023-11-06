import {Head} from '@inertiajs/inertia-react';
import FullCalendar from "@/Components/FullCalendar";
import {Inertia} from "@inertiajs/inertia";
import ClientLayout from "@/Layouts/ClientLayout";
import Greetings from "@/Components/Greetings";
import {Stack} from "@mui/material";


const Dashboard = ({events, sumShifts, sumLeaves,defaults, ...props}) => {
    const handleNavigate = (defaultDate, defaultView) => {
        Inertia.visit(route("dashboard"), {
            preserveState: true,
            data: {
                defaultDate,
                defaultView,
            },
            only: ["events", "sumShifts", "sumLeaves"]
        })
    }
    const convertedEvents=events.map(item => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
    }));
    return (<>
            <Head title="داشبورد"/>
            <Greetings user={props.auth.user.name}/>
            <Stack spacing={2} sx={{marginBottom: 2}}>
                <p>
                    <strong>ساعت کار در ماه : </strong>
                    {`${sumShifts / 60 | 0} ساعت ${sumShifts % 60} دقیقه`}
                </p>
                <p>
                    <strong>مرخصی در ماه : </strong>
                    {`${sumLeaves / (24 * 60) | 0} روز و ${(sumLeaves % (24 * 60)) / 60 | 0} ساعت و ${sumLeaves % 60} دقیقه`}
                </p>

            </Stack>
            <FullCalendar onNavigate={handleNavigate} events={convertedEvents}  defaultDate={defaults?.defaultDate} defaultView={(defaults?.defaultView+"").toUpperCase()}/>
        </>
    );
}

Dashboard.layout = page => <ClientLayout auth={page.props.auth} errors={page.props.errors} header={"داشبورد"}
                                         children={page}/>
export default Dashboard;
