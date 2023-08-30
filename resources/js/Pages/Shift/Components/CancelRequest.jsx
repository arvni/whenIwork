import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Stack} from "@mui/material";

export default function CancelRequest({open, onClose, onAccept}) {

    return (<Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {"لغو درخواست"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                آیا میخواهید درخواست خود را کنسل کنید ؟
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Stack spacing={2} direction={"row"}>
                <Button onClick={onAccept} autoFocus variant={"contained"} sx={{color: "#f2f2f2"}}>
                    بله
                </Button>
                <Button onClick={onClose}>خیر</Button>
            </Stack>
        </DialogActions>
    </Dialog>);
}
