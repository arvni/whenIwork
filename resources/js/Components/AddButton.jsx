import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {useMediaQuery} from "@mui/material";

const AddButton = ({onClick, title}) => {
    const matches = useMediaQuery('(min-width:600px)', {noSsr: true});
    return <Fab onClick={onClick} aria-label={title} sx={{
        position: 'absolute',
        zIndex: 10000,
        bottom: 16,
        right: matches ? 16 : "calc( 50% - 28px )",
    }} color={"success"}>
        <AddIcon/>
    </Fab>;
}
export default AddButton;
