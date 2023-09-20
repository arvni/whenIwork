import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmForm({onConfirm, onClose, open, content, title}) {
    return (<Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-form-title"
            aria-describedby="confirm-form-description"
        >
            {title && <DialogTitle id="confirm-form-title">
                {title}
            </DialogTitle>}
            {content && <DialogContent>
                <DialogContentText id="confirm-form-description">
                    {content}
                </DialogContentText>
            </DialogContent>}
            <DialogActions>
                <Button onClick={onClose}>خیر</Button>
                <Button onClick={onConfirm} autoFocus variant="contained">
                    بله
                </Button>
            </DialogActions>
        </Dialog>
    );
}
