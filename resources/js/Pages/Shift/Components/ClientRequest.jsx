import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import SelectSearch from "@/Components/SelectSearch";

const ClientRequest = ({clientRequest, open, onClose, onSubmit, onChange}) => {
    const handleChange = (e) => {
        onChange(e.target.name, e.target.value);
    }
    return <Dialog open={open} maxWidth={"xs"} fullWidth>
        <DialogTitle>
            {clientRequest.type === "changeUser" ? "جابه جایی شیفت" : "درخواست شیفت"}
            <Divider/>
        </DialogTitle>
        <DialogContent>
            <Stack direction={"row"} spacing={2} flexWrap={"wrap"} sx={{marginBottom:"1rem"}}>
                <span>{`تاریخ : ${clientRequest?.shift?.date}`}</span>
                <span>{`${clientRequest?.shift?.started_at} - ${clientRequest?.shift?.ended_at}`}</span>
            </Stack>
            <Grid container spacing={2}>
                {clientRequest?.type === "changeUser" ?
                    <Grid item xs={12}>
                        <SelectSearch value={clientRequest?.changeUser}
                                      name={"changeUser"}
                                      onChange={onChange}
                                      url={clientRequest?.shift && route("client.roomsApi.users", clientRequest?.shift?.room?.id)}
                                      label={"کاربر جایگزین"}
                                      filterSelectedOptions/>
                    </Grid> : null}
                <Grid item xs={12}>
                    <TextField fullWidth rows={3} multiline label={"پیام"} value={clientRequest.message}
                               name={"message"}
                               onChange={handleChange}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Stack direction={"row"} spacing={2}>
                <Button variant={"contained"} onClick={onSubmit}>ثبت</Button>
                <Button onClick={onClose}>لغو</Button>
            </Stack>
        </DialogActions>
    </Dialog>
}
export default ClientRequest;
