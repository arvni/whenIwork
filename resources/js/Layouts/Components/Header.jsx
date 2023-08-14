import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "@inertiajs/inertia-react";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import {useState} from "react";
import Loading from "@/Components/Loading";
const Header = ({breadcrumbs}) => {
    const [loading, setLoading]=useState(false);
    const handleStart=()=>setLoading(true);
    const handleFinish=()=>setLoading(false);
    return (
        <>
        <Breadcrumbs aria-label="breadcrumb" sx={{color:"#fff"}}>
            {route().current("dashboard")? <Typography sx={{ display: 'flex', alignItems: 'center', Color:"#fff" }}>داشبورد</Typography>:<Link onStart={handleStart} onFinish={handleFinish} method="get" href="/dashboard" type="button"  style={{textDecoration:"none",color:"#fff", fill:"#fff"}}>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> داشبورد
            </Link>}
        {breadcrumbs?.map((item, index)=>item.link?(
            <Link method="get" onStart={handleStart} onFinish={handleFinish} key={index} href={item.link} type="button" style={{textDecoration:"none",color:"#fff", fill:"#fff"}}>
                {item.icon??null} {item.title}
            </Link>
        ):(
            <Typography key={index} sx={{ display: 'flex', alignItems: 'center', Color:"#fff" }}>
                {item.title}
             </Typography>))}
        </Breadcrumbs>
            <Loading open={loading}/>
            </>
            )
}

export default Header;
