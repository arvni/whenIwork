import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import SelectSearch from "@/Components/SelectSearch";
import ShiftInfo from "@/Pages/ClientRequest/Components/ShiftInfo";
import TakeLeaveForm from "@/Pages/ClientRequest/Components/TakeLeaveForm";

const types = new Map();
types.set("changeUser", "جابه جایی شیفت");
types.set("shift", "درخواست شیفت");
types.set("takeLeave", "درخواست مرخصی")

const ClientRequest = ({clientRequest, open, onClose, onSubmit, onChange}) => {
    const handleChange = (e) => onChange(e.target.name, e.target.value);
    return <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogTitle>
            {types.get(clientRequest?.type)}
            <Divider/>
        </DialogTitle>
        <DialogContent>
            <form onSubmit={onSubmit}>
                {clientRequest?.type !== "takeLeave" ? <ShiftInfo shift={clientRequest?.requestable}/> :
                    <TakeLeaveForm leave={clientRequest?.requestable} onChange={onChange}/>}
                <Grid container spacing={2}>
                    {clientRequest?.type === "changeUser" &&
                    <Grid item xs={12}>
                        {clientRequest?.requestable?.room?.id && <SelectSearch value={clientRequest?.revisable_by}
                                                                               name="revisable_by"
                                                                               onChange={handleChange}
                                                                               url={route("client.roomsApi.users", clientRequest?.requestable?.room?.id)}
                                                                               label="کاربر جایگزین"
                                                                               filterSelectedOptions/>}
                    </Grid>}
                    <Grid item xs={12}>
                        <TextField fullWidth rows={3} multiline label="پیام" value={clientRequest?.message}
                                   name="message"
                                   onChange={handleChange}/>
                    </Grid>
                </Grid>
                <DialogActions>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" type={"submit"}> ثبت </Button>
                        <Button onClick={onClose}>لغو</Button>
                    </Stack>
                </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
}
export default ClientRequest;
