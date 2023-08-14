import {GridToolbar} from "@mui/x-data-grid";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import {colors,Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from "@mui/material";

const DeleteForm = ({title, agreeCB, disAgreeCB, openDelete}) => {


    return (
        <Dialog components={{Toolbar: GridToolbar}} open={openDelete} onClose={disAgreeCB}
                aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                <ReportProblemIcon sx={{color: colors.red.A700}}/>
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"> {`آیا میخواهید ${title} حذف شود ؟`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={disAgreeCB}>خیر</Button>
                <Button variant="contained" color="success" onClick={agreeCB} autoFocus>بله</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteForm;
