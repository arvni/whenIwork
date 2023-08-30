import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box, Button,
    Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material";
import {
    Add,
    Minimize,
} from "@mui/icons-material";
import ShiftRow from "@/Pages/Shift/Components/ShiftRow";


const DayShiftsContainer = ({day, onChange, onAddClick, onShow, onEdit, onDelete, expanded = false}) => {
    const isFutureDay = new Date(day.date) - new Date(new Date().toDateString()) > 0;

    return <Accordion expanded={expanded} onChange={onChange(day.date)}>
        <AccordionSummary expandIcon={expanded ? <Minimize/> : <Add/>}>{day.title}</AccordionSummary>
        <AccordionDetails sx={{overflow: "auto"}}>
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
                            تعداد درخواست ها
                        </TableCell>
                        <TableCell>
                            تعداد درخواست های تایید شده
                        </TableCell>
                        <TableCell>
                            تعداد درخواست های منتظر
                        </TableCell>
                        <TableCell>#</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {day.shifts.map((shift, index) => <ShiftRow index={index}
                                                                shift={shift}
                                                                key={shift.id}
                                                                onShow={onShow}
                                                                onEdit={onEdit}
                                                                onDelete={onDelete}
                                                                day={day}/>)}
                </TableBody>
            </Table> : null}
            {isFutureDay && (<Box sx={{padding: 1, textAlign: "center"}}>
                <Button color={"success"}
                        variant={"contained"}
                        sx={{color: "white"}}
                        startIcon={<Add/>}
                        onClick={onAddClick}>
                    افزودن شیفت
                </Button>
            </Box>)}
        </AccordionDetails>
    </Accordion>;
}

export default DayShiftsContainer;
