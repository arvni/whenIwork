import {Table, TableBody, TableCell, TableHead} from "@mui/material";
import {convertDate, persianNumber} from "@/Services/helper";

const ExpandedComponent = ({data: requestable}) => {
    return requestable && <Table>
        <TableHead>
            <TableCell>
                نوع
            </TableCell>
            <TableCell>
                تاریخ
            </TableCell>
            <TableCell>
                تاریخ شروع
            </TableCell>
            <TableCell>
                تاریخ پایان
            </TableCell>
        </TableHead>
        <TableBody>
            <TableCell>
                {requestable.type}
            </TableCell>
            <TableCell>
                {requestable.date && convertDate(requestable.date)}
            </TableCell>
            <TableCell>
                {persianNumber(requestable.started_at)}
            </TableCell>
            <TableCell>
                {persianNumber(requestable.ended_at)}
            </TableCell>
        </TableBody>
    </Table>;

}

export default ExpandedComponent;
