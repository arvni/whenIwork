import {IconButton, Stack, TableCell, TableRow} from "@mui/material";
import {Delete as DeleteIcon, Edit as EditIcon, RemoveRedEye as RemoveRedEyeIcon} from "@mui/icons-material";

const ShiftRow = ({shift, onShow, onEdit, onDelete, day, index}) => {
    return <>
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{shift.started_at.substr(0, shift.started_at.length - 3)}</TableCell>
            <TableCell>{shift.ended_at.substr(0, shift.ended_at.length - 3)}</TableCell>
            <TableCell>{shift.type}</TableCell>
            <TableCell>{shift.noUsers}</TableCell>
            <TableCell>{shift.client_requests_count}</TableCell>
            <TableCell>{shift.accepted_client_requests_count}</TableCell>
            <TableCell>{shift.waiting_client_requests_count}</TableCell>
            <TableCell>
                <Stack direction={"row"} spacing={.5}>
                    <IconButton onClick={onShow(shift.id)} color={"success"}>
                        <RemoveRedEyeIcon/>
                    </IconButton>
                    {new Date(day.date) - new Date(new Date().toDateString()) > 0 ? <>
                        <IconButton color={"warning"} onClick={onEdit(shift.id)}
                                    title={"بروزرسانی شیفت"}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton color={"error"} onClick={onDelete(shift.id)}
                                    title={"حذف شیفت"}>
                            <DeleteIcon/>
                        </IconButton>
                    </> : null}
                </Stack>
            </TableCell>
        </TableRow>
    </>
}
export default ShiftRow;
