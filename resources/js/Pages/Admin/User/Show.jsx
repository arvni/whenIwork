import {Head} from '@inertiajs/inertia-react';
import FullCalendar from "@/Components/FullCalendar";
import {Inertia} from "@inertiajs/inertia";
import {Stack, Typography} from "@mui/material";
import AdminLayout from "@/Layouts/AdminLayout";


const Show = ({user, events, sumShifts, sumLeaves}) => {
    const handleNavigate = (date) => {
        Inertia.visit(route("admin.users.show", user.id), {
            preserveState: true,
            data: {
                date
            }
        })
    }
    return (<>
            <Head title={user.name}/>
            <Typography><strong>کاربر : </strong>{user.name}</Typography>
            <Stack spacing={2} sx={{marginBottom: 2}}>
                <p>
                    <strong> کارکرد در ماه : </strong>
                    {`${sumShifts / 60 | 0} ساعت ${sumShifts % 60} دقیقه`}
                </p>
                <p>
                    <strong>مرخصی در ماه : </strong>
                    {`${sumLeaves / (24 * 60) | 0} روز و ${(sumLeaves % (24 * 60)) / 60 | 0} ساعت و ${sumLeaves % 60} دقیقه`}
                </p>

            </Stack>
            <FullCalendar onNavigate={handleNavigate} events={events.map(item => ({
                ...item,
                start: new Date(item.start),
                end: new Date(item.end),
            }))}/>
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
