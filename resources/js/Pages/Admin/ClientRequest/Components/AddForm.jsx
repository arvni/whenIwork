import {
    DialogActions,
    DialogContent,
    TextField,
    Dialog,
    DialogTitle,
    Grid,
    Button,
    Container, FormControlLabel, Switch, CircularProgress,
} from "@mui/material";


const AddForm = ({values, setValues, submit, open, setOpen, title, reset, loading}) => {
    const handleChange = (e) => setValues(prevState => ({...prevState, [e.target.name]: e.target.value}));
    const handleClose = () => {
        setOpen(false);
        reset();
    }
    const handleIsActiveChange = (_, v) => setValues(prevValues => ({...prevValues, isActive: v}));
    return <Dialog open={open} onClose={handleClose} keepMounted>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{p: "1em"}}>
            <Container>
                <Grid container sx={{marginTop: "1em"}} spacing={2}>
                    <Grid item xs={8}>
                        <TextField label={"عنوان"} name={"name"} onChange={handleChange} value={values.name} fullWidth/>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel control={<Switch name={"isActive"} checked={values.isActive}
                            onChange={handleIsActiveChange}/>} label={"فعال"} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField multiline rows={3} label={"توضیحات"} name={"description"} onChange={handleChange}
                                   value={values.description} fullWidth/>
                    </Grid>
                </Grid>
            </Container>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} disabled={loading}>لغو</Button>
            <Button onClick={submit} variant={"contained"} disabled={loading}
                    endIcon={loading ? <CircularProgress/> : null} sx={{color: "white"}}>ثبت</Button>
        </DialogActions>

    </Dialog>
}

export default AddForm;
