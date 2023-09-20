import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

const ShiftWorks = ({works,onUsersClick}) => {
    const handleShowUser=(id)=>(e)=>{
        e.preventDefault();
        onUsersClick(id);
    }
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>کاربر</TableCell>
                <TableCell>تغییر کرده</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {works.map(row => <TableRow key={row.id}>
                <TableCell><a href={"#"} onClick={handleShowUser(row?.user?.id)}>{row?.user?.name}</a></TableCell>
                <TableCell>{row.changed ? "بله" : "خیر"}</TableCell>
            </TableRow>)}
        </TableBody>
    </Table>
}
export default ShiftWorks;
