import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const RejectForm = ({open, request, onSubmit, onClose, onChange}) => {
    const handleChange=(e)=>onChange(e.target.name,e.target.value);
    return <Dialog open={open} fullWidth maxWidth={"xs"}>
        <DialogTitle>رد درخواست کاربر {request?.user?.name}</DialogTitle>
        <DialogContent>
            <TextField sx={{marginTop:3}} fullWidth rows={3} multiline name={"comment"} value={request?.comment??""} onChange={handleChange} label={"دلیل رد کردن درخواست"}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={onSubmit} color={"error"} variant={"contained"}>رد درخواست</Button>
            <Button onClick={onClose}>لغو</Button>
        </DialogActions>
    </Dialog>
}
export default RejectForm;
