import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box, Button,
    IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material";
import {
    Add,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Minimize,
    RemoveRedEye as RemoveRedEyeIcon
} from "@mui/icons-material";

const DayShiftsContainer = ({day, onChange, onAddClick, onShow, onEdit, onDelete, expanded = false}) => {

    return <Accordion expanded={expanded} onChange={onChange(day.date)}>
        <AccordionSummary expandIcon={expanded ? <Minimize/> : <Add/>}>{day.title}</AccordionSummary>
        <AccordionDetails sx={{overflow:"auto"}}>
            {day.shifts.length ? <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            ردیف
                        </TableCell>
                        <TableCell>
                            ساعت شروع
                        </TableCell>
                        <TableCell>
                            ساعت پایان
                        </TableCell>
                        <TableCell>
                            نوع شیفت
                        </TableCell>
                        <TableCell>
                            تعداد نفرات
                        </TableCell>
                        <TableCell>
                            گروه یا شخص مرتبط
                        </TableCell>
                        <TableCell>#</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {day.shifts.map((shift, index) => <TableRow key={shift.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{shift.started_at.substr(0, shift.started_at.length - 3)}</TableCell>
                        <TableCell>{shift.ended_at.substr(0, shift.ended_at.length - 3)}</TableCell>
                        <TableCell>{shift.type}</TableCell>
                        <TableCell>{shift.noUsers}</TableCell>
                        <TableCell><Stack spacing={.5} direction={"row"}>{shift.attendances.map(attendance =>
                            <span key={attendance.id}>{attendance.attendable.name}</span>)}</Stack>
                        </TableCell>
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
                    </TableRow>)}
                </TableBody>
            </Table> : null}
            {new Date(day.date) - new Date(new Date().toDateString()) > 0 ? <Box sx={{padding: 1, textAlign: "center"}}>
                <Button color={"success"} variant={"contained"} sx={{color: "white"}} startIcon={<Add/>}
                        onClick={onAddClick}>
                    افزودن شیفت
                </Button></Box> : null}
        </AccordionDetails>
    </Accordion>;
}

export default DayShiftsContainer;
