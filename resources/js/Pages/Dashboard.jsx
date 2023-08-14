import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import {colors, Typography} from "@mui/material";
import {WbSunny, DarkMode as DarkModeIcon, Brightness7 as Brightness7Icon} from "@mui/icons-material";


const Dashboard = (props) => {
    const greetings = () => {
        let time = new Date().getHours();
        if (time < 10) {
            return <>
                <span>{`صبح بخیر ${props.auth.user.name}`}</span>
                <Brightness7Icon/>
            </>
        } else if (time < 17) {
            return <>
                <span>{`روز بخیر ${props.auth.user.name}`}</span>
                <WbSunny sx={{color: colors.yellow.A700}}/>
            </>

        } else {
            return <>
                <span>{`عصر بخیر ${props.auth.user.name}`}</span>
                <DarkModeIcon/>
            </>
        }
    }
    return (<>
            <Head title="داشبورد"/>
            <Typography variant={"h4"} sx={{mb: "2em"}}> {greetings()}</Typography>
        </>
    );
}

Dashboard.layout = page => <AuthenticatedLayout auth={page.props.auth} errors={page.props.errors} header={"داشبورد"}
                                                children={page}/>
export default Dashboard;
