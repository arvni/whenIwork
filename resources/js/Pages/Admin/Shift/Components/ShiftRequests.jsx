import {IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {convertDate, convertDateTime} from "@/Services/helper";
import {renderStatus} from "@/Pages/Shift/Components/ExpandedComponent";
import {Close, Done} from "@mui/icons-material";
import ExpandedCell from "@/Components/ExpandedCell";

const ShiftRequests = ({requests, onReject, onConfirm, active, onUsersClick}) => {
    const handleShowUser=(id)=>(e)=>{
        e.preventDefault();
        onUsersClick(id);
    }
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>درخواست کننده</TableCell>
                <TableCell>متن پیام</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell>زمان درخواست</TableCell>
                <TableCell>زمان آخرین تغیییرات</TableCell>
                <TableCell>بررسی کننده</TableCell>
                <TableCell>دلیل ردشدن درخواست</TableCell>
                <TableCell>#</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {requests.map(row => <TableRow key={row.id}>
                <TableCell>
                    <a href={"#"} onClick={handleShowUser(row?.user?.id)}>{row?.user?.name}</a>
                </TableCell>
                <TableCell>
                    <ExpandedCell value={row.message}/>
                </TableCell>
                <TableCell>
                    {renderStatus(row.status)}
                </TableCell>
                <TableCell>
                    {convertDateTime(row.created_at)}
                </TableCell>
                <TableCell>
                    {convertDateTime(row.updated_at)}
                </TableCell>
                <TableCell>
                    {row?.revisable_by?.name}
                </TableCell>
                <TableCell>
                    <ExpandedCell value={row?.comment}/>
                </TableCell>
                <TableCell>
                    {active && row.status === "waiting" && <Stack direction={"row"} gap={1}>
                        <IconButton onClick={onReject(row.id)} color={"error"} title={"رد"}>
                            <Close/>
                        </IconButton>
                        <IconButton onClick={onConfirm(row.id)} color={"success"} title={"تایید"}>
                            <Done/>
                        </IconButton>
                    </Stack>}
                </TableCell>
            </TableRow>)}
        </TableBody>
    </Table>
}
export default ShiftRequests;
