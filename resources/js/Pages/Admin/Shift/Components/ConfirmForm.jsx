import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Typography from "@mui/material/Typography";

const ConfirmForm = ({open, request, onClose, onConfirm}) => {

    return <Dialog open={open}>
        <DialogTitle>تایید درخواست کاربر {request?.user?.name}</DialogTitle>
        <DialogContent>
            <Typography component={"p"}>آیا با این درخواست موافقت میفرمایید ؟</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onConfirm} variant={"contained"} color={"success"}>
                بله
            </Button>
            <Button onClick={onClose}>
                لغو
            </Button>
        </DialogActions>
    </Dialog>;
}
export default ConfirmForm;
