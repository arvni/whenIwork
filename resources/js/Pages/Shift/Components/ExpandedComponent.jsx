import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Cancel, Close, Done} from "@mui/icons-material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {convertDateTime} from "@/Services/helper";
import {useForm} from "@inertiajs/inertia-react";
import CancelRequest from "@/Pages/Shift/Components/CancelRequest";
import {useState} from "react";
import {requestTypes} from "@/Pages/ClientRequest";

export const statuses = new Map([["waiting", <AccessTimeIcon color={"warning"}/>],
    ["rejected", <Cancel color={"error"}/>],
    ["canceled", <Cancel color={"error"}/>],
    ["accepted", <Done color={"success"}/>]])

export const renderStatus = (status) => statuses.get(status);

const ExpandedComponent = ({data: requests}) => {
    const {setData, post, reset, data} = useForm();
    const [openCancel, setOpenCancel] = useState(false);
    const handleCancelRequest = (id) => () => {
        setOpenCancel(true);
        setData({id});
    }
    const handleClose = () => {
        setOpenCancel(false);
        reset();
    }
    const onSubmit = () => {
        post(route("clientRequests.cancel", data.id), {
            onSuccess: handleClose,
        })
    }

    return requests.length ? <>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>نوع</TableCell>
                    <TableCell>وضعیت</TableCell>
                    <TableCell>زمان درخواست</TableCell>
                    <TableCell>زمان آخرین تغیییرات</TableCell>
                    <TableCell>درخواست یا رد کننده</TableCell>
                    <TableCell>#</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {requests.map(row => <TableRow key={row.id}>
                    <TableCell>{requestTypes.get(row.type)}</TableCell>
                    <TableCell>{renderStatus(row.status)}</TableCell>
                    <TableCell>{convertDateTime(row.created_at)}</TableCell>
                    <TableCell>{convertDateTime(row.updated_at)}</TableCell>
                    <TableCell>{row?.revisable_by?.name}</TableCell>
                    <TableCell>
                        {row.status === "waiting" && new Date(row.requestable?.started_at_dateTime) > new Date() &&
                        <IconButton onClick={handleCancelRequest(row.id)} title={row.status}>
                            <Close color={"error"}/>
                        </IconButton>}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
        <CancelRequest onClose={handleClose} open={openCancel} onAccept={onSubmit}/>
    </> : null;
}

export default ExpandedComponent;
