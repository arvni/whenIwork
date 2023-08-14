import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Cancel, Close, Done, Pending, SyncLock} from "@mui/icons-material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {convertDate} from "@/Services/helper";
import {useForm} from "@inertiajs/inertia-react";
import CancelRequest from "@/Pages/Shift/Components/CancelRequest";
import {useState} from "react";

const renderStatus = (status) => {
    switch (status) {
        case "waiting":
            return <AccessTimeIcon color={"warning"}/>
        case "rejected":
            return <Cancel color={"error"}/>;
        case "accepted":
            return <Done color={"success"}/>
    }
}

const ExpandedComponent = ({data}) => {
    const {setData, post, reset} = useForm();
    const [openCancel, setOpenCancel] = useState(false);
    const handleCancelRequest = (id) => () => {
        setData({id, _method: "delete"});
        setOpenCancel(true)
    }
    const handleClose = () => {
        reset();
        setOpenCancel(false);
    }
    const onSubmit = () => {
        post(route("client.clientRequest.destroy", data.id), {
            onSuccess: handleClose
        })
    }
    return <>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>نوغ</TableCell>
                    <TableCell>وضعیت</TableCell>
                    <TableCell>زمان درخواست</TableCell>
                    <TableCell>زمان آخرین تغیییرات</TableCell>
                    <TableCell>درخواست یا رد کننده</TableCell>
                    <TableCell>#</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(row => <TableRow key={row.id}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{renderStatus(row.status)}</TableCell>
                    <TableCell>{convertDate(row.created_at)}</TableCell>
                    <TableCell>{convertDate(row.updated_at)}</TableCell>
                    <TableCell>{row?.revisable_by?.name}</TableCell>
                    <TableCell>
                        <IconButton disabled={row.status !== "waiting"} onClick={handleCancelRequest(row.id)}>
                            <Close color={"error"}/>
                        </IconButton>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
        <CancelRequest onClose={handleClose} open={openCancel} onAccept={onSubmit}/>
    </>;
}

export default ExpandedComponent;
