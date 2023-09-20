import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {convertDate, convertDateTime, persianNumber} from "@/Services/helper";
import {requestTypes} from "@/Pages/ClientRequest";

const ExpandedComponent = ({data: requestable}) => {
    return requestable && <Table>
        <TableHead>
            <TableRow>
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
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>
                    {requestTypes.get(requestable.type)}
                </TableCell>
                <TableCell>
                    {convertDate(requestable.date ?? requestable.started_at)}
                </TableCell>
                <TableCell>
                    {convertDateTime(requestable.date + " " + requestable.started_at)}
                </TableCell>
                <TableCell>
                    {convertDateTime(requestable.date + " " + requestable.ended_at)}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>;

}

export default ExpandedComponent;
