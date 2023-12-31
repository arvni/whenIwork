import {Head} from '@inertiajs/inertia-react';
import FullCalendar from "@/Components/FullCalendar";
import {Inertia} from "@inertiajs/inertia";
import {Stack, Typography} from "@mui/material";
import AdminLayout from "@/Layouts/AdminLayout";


const Show = ({user, events, sumShifts, sumLeaves, defaults,...props}) => {
    const handleNavigate = (defaultDate, defaultView) => {
        Inertia.visit(route("admin.users.show", user.id), {
            preserveState: true,
            data: {
                defaultDate,
                defaultView
            }
        })
    }
    const handleViewChange=(defaultView)=>{
        Inertia.visit(route("admin.users.show", user.id), {
            preserveState: true,
            data: {
                defaultDate:defaults?.defaultDate,
                defaultView
            }
        })
    }
    return (<>
            <Head title={user.name}/>
            <Typography><strong>کاربر : </strong>{user.name}</Typography>
            <Stack spacing={2} sx={{marginBottom: 2}}>
                {defaults.defaultView!=="week"?<><p>
                    <strong> کارکرد در ماه : </strong>
                    {`${sumShifts / 60 | 0} ساعت ${sumShifts % 60} دقیقه`}
                </p>
                <p>
                    <strong>مرخصی در ماه : </strong>
                    {`${sumLeaves / (24 * 60) | 0} روز و ${(sumLeaves % (24 * 60)) / 60 | 0} ساعت و ${sumLeaves % 60} دقیقه`}
                </p></>:<><p>
                    <strong> کارکرد در هفته : </strong>
                    {`${sumShifts / 60 | 0} ساعت ${sumShifts % 60} دقیقه`}
                </p>
                    <p>
                    <strong>مرخصی در هفته : </strong>
                {`${sumLeaves / (24 * 60) | 0} روز و ${(sumLeaves % (24 * 60)) / 60 | 0} ساعت و ${sumLeaves % 60} دقیقه`}
            </p></>}

            </Stack>
            <FullCalendar onNavigate={handleNavigate} onView={handleViewChange} events={events.map(item => ({
                ...item,
                start: new Date(item.start),
                end: new Date(item.end),
            }))} defaultDate={defaults?.defaultDate??null} defaultView={(defaults?.defaultView??""+"").toUpperCase()}/>
        </>
    );
}

const breadCrumbs = [
    {
        title: "کاربران",
        link: route("admin.users.index"),
        icon: null
    }
]

Show.layout = page =>
    <AdminLayout auth={page.props.auth} errors={page.props.errors} header={page.props?.user?.name}
                 breadcrumbs={[...breadCrumbs,
                     {
                         title: page.props?.user?.name,
                         link: null,
                         icon: null
                     }
                 ]}
                 children={page}/>
export default Show;
