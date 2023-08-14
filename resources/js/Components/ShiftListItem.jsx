import {Avatar, ListItem, ListItemAvatar, ListItemText} from '@mui/material';


const ShiftListItem=({shift})=>{
    return <ListItem>
        <ListItemText primary={shift.title} secondary={shift.ended_at} />
    </ListItem>;
}
