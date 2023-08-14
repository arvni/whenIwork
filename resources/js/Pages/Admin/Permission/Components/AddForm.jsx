import {
    DialogActions,
    DialogContent,
    TextField,
    Dialog,
    DialogTitle,
    Grid,
    Button,
    Container, FormControlLabel, Switch,
} from "@mui/material";


const AddForm = ({values, setValues, submit, open, setOpen, title, reset}) => {
    const handleChange = (e) => setValues(prevState => ({...prevState, [e.target.name]: e.target.value}));
    const handleClose = () => {
        setOpen(false);
        reset();
    }
    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{p: "1em"}}>
            <Container>
                <Grid container sx={{marginTop: "1em"}}>
                    <Grid item>
                        <TextField label={"Title"} name={"name"} onChange={handleChange} value={values.name}/>
                    </Grid>
                </Grid>
            </Container>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submit} variant={"contained"}>Submit</Button>
        </DialogActions>

    </Dialog>
}

export default AddForm;
