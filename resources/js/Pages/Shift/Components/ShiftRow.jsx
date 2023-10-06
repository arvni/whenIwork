import {IconButton, Stack, TableCell, TableRow, Typography} from "@mui/material";
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    RemoveRedEye as RemoveRedEyeIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon
} from "@mui/icons-material";
import PoperWraper from "@/Components/PoperWraper";

const ShiftTypes={
    open:"باز",
    normal:"موظفی",
}

const ShiftRow = ({shift, onShow, onEdit, onDelete, day, index, onPublish}) => {
    return <>
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{shift.started_at.substr(0, shift.started_at.length - 3)}</TableCell>
            <TableCell>{shift.ended_at.substr(0, shift.ended_at.length - 3)}</TableCell>
            <TableCell>{ShiftTypes[shift.type]}</TableCell>
            <TableCell>{shift.noUsers}</TableCell>
            <TableCell>
                <PoperWraper component={<Typography>{shift.client_requests_count}</Typography>}>
                    <Stack gap={2} p={2}>
                        <span><strong>درخواست های تایید شده</strong> : {shift.accepted_client_requests_count}</span>
                        <span><strong>درخواست های در انتظار</strong> : {shift.waiting_client_requests_count}</span>
                    </Stack>
                </PoperWraper>
            </TableCell>
            <TableCell>{(shift.type === "open" ? shift.roles : shift.users).map(item => item.name).join(",")}</TableCell>
            <TableCell>
                <Stack direction={"row"} spacing={.5}>
                    <IconButton onClick={onShow(shift.id)} color={"success"}>
                        <RemoveRedEyeIcon/>
                    </IconButton>
                    {new Date(day.date) - new Date(new Date().toDateString()) > 0 ? <>
                        {!shift.isActive && <IconButton color={"info"} onClick={onPublish(shift.id)}
                                                        title={"اعلان شبفت"}>
                            <AssignmentTurnedInIcon/>
                        </IconButton>}
                        <IconButton color={"warning"} onClick={onEdit(shift.id)}
                                    title={"ویرایش شیفت"}>
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
