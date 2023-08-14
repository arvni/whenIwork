import {DialogActions, DialogContent, TextField, Grid, Button, Container, DialogTitle, Dialog} from "@mui/material";
import SelectSearch from "@/Components/SelectSearch";

const AddForm = ({values, setValues, submit, open, setOpen, title, loading, reset, errors}) => {
    const handleChange = (e) => setValues(prevState => ({...prevState, [e.target.name]: e.target.value}));
    const handleClose = () => {
        setOpen(false);
        reset();
    }
    return <Dialog open={open} onClose={handleClose} keepMounted>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{p: "1em"}}>
            <Container>
                <Grid container sx={{marginTop: "1em"}} spacing={2}>
                    <Grid item>
                        <SelectSearch
                            sx={{minWidth: "400px"}}
                            url={route("clientIndex")}
                            value={values?.receivers}
                            name={"receivers"}
                            onChange={handleChange}
                            label="گیرنده یا گیرندگان"
                            multiple
                            filterSelectedOptions
                            helperText={errors.hasOwnProperty("receivers") ? errors.receivers : null}
                            error={errors.hasOwnProperty("receivers")}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label={"عنوان"} name={"title"} onChange={handleChange}
                                   value={values.title}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField rows={5} fullWidth multiline label={"متن"} name={"context"} onChange={handleChange}
                                   value={values.context}/>
                    </Grid>
                </Grid>
            </Container>
        </DialogContent>
        <DialogActions>
            <Button disabled={loading} onClick={submit} variant={"contained"}>ثبت</Button>
            <Button onClick={handleClose}>لغو</Button>
        </DialogActions>

    </Dialog>
}

export default AddForm;
