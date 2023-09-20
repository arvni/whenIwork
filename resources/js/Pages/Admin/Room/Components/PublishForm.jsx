import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";

const PublishForm = ({onAgree, onClose, open}) => {

    return <Dialog open={open}>
        <DialogTitle>آیا از نمایش شیفت مطمئن هستید؟</DialogTitle>
        <DialogActions>
            <Button variant={"contained"} onClick={onAgree} color={"success"}>بله</Button>
            <Button color={"error"} onClick={onClose}>خیر</Button>
        </DialogActions>
    </Dialog>
}

export default PublishForm;
