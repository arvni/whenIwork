import {List} from "@mui/material";

const ShiftList=({shifts})=>{

    return <List>
        {shifts.map(shift=><ShiftListItem key={shift.item} shif={shift}/>)}

    </List>;
}
