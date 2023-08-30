import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

const ShiftWorks = ({works}) => {

    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>کاربر</TableCell>
                <TableCell>تغییر کرده</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {works.map(row => <TableRow key={row.id}>
                <TableCell>{row?.user?.name}</TableCell>
                <TableCell>{row.changed ? "بله" : "خیر"}</TableCell>
            </TableRow>)}
        </TableBody>
    </Table>
}
export default ShiftWorks;
