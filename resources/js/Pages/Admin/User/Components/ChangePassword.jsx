import {
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Container,
    Grid,
    Button,
    DialogTitle,
} from "@mui/material";
import {checkPassword} from "@/Services/validation";

const ChangePassword = ({open, onClose, data, setData, onSubmit, errors, setError, currentNeeded = true}) => {

    const handleChange = (e) => setData(prevValues => ({...prevValues, [e.target.name]: e.target.value}));
    const submit = () => {
        if (checkPassword(data, currentNeeded, setError))
            onSubmit();
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                تغییر رمز عبور
            </DialogTitle>
            <DialogContent>
                <Container>
                    <Grid container spacing={2} sx={{pt: "1em"}}>
                        {currentNeeded ? <Grid item xs={12}>
                            <TextField error={Object.keys(errors).includes('current')}
                                       helperText={errors?.current ?? ""}
                                       label={"رمزورود قبلی"} name={"current"} type={"password"}
                                       onChange={handleChange}
                                       sx={{width: "100%"}}/>
                        </Grid> : null}
                        <Grid item xs={12}>
                            <TextField error={Object.keys(errors).includes('password')}
                                       helperText={errors?.password ?? ""}
                                       label={"رمز ورود جدید"} name={"password"} type={"password"}
                                       onChange={handleChange} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={Object.keys(errors).includes('password_confirmation')}
                                       helperText={errors?.password_confirmation ?? ""} label={"تکرار رمز ورود جدید"}
                                       name={"password_confirmation"} type={"password"}
                                       onChange={handleChange} fullWidth/>
                        </Grid>
                    </Grid>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={submit}>ثبت</Button>
                <Button onClick={onClose}>لغو</Button>
            </DialogActions>
        </Dialog>
    );
}
export default ChangePassword;
