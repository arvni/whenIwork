import {Brightness7 as Brightness7Icon, DarkMode as DarkModeIcon, WbSunny} from "@mui/icons-material";
import {colors, Typography} from "@mui/material";

const Greetings = ({user}) => {
    let time = new Date().getHours();
    let title
    if (time < 10) {
        title = <>
            <span>{`صبح بخیر ${user}`}</span>
            <Brightness7Icon/>
        </>
    } else if (time < 17) {
        title = <>
            <span>{`روز بخیر ${user}`}</span>
            <WbSunny sx={{color: colors.yellow.A700}}/>
        </>

    } else {
        title = <>
            <span>{`عصر بخیر ${user}`}</span>
            <DarkModeIcon/>
        </>
    }

    return <Typography variant={"h4"} sx={{mb: "2em"}}>{title}</Typography>
}
export default Greetings;
