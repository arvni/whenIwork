import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";

const ChangePasswordForm = ({data, errors, onChange, onSubmit, open, onClose}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }
    const handleChange = (e) => onChange(e.target.name, e.target.value);
    return <Dialog open={open} maxWidth={"xs"}>
        <DialogTitle>تغییر رمز عبور</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit} style={{paddingTop: "1rem", width: "100%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label={"رمزعبور قدیم"}
                            fullWidth
                            name={"current"}
                            onChange={handleChange}
                            error={!!errors?.current}
                            helperText={errors?.current}
                            value={data?.current}
                            type={"password"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label={"رمزعبور جدید"}
                            fullWidth
                            name={"password"}
                            onChange={handleChange}
                            error={!!errors?.password}
                            helperText={errors?.password}
                            value={data?.password}
                            type={"password"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label={"تکرار رمزعبور"}
                            fullWidth
                            name={"password_confirmation"}
                            onChange={handleChange}
                            error={!!errors?.password_confirmation}
                            helperText={errors?.password_confirmation}
                            value={data?.password_confirmation}
                            type={"password"}
                        />
                    </Grid>
                </Grid>
            </form>
        </DialogContent>
        <DialogActions>
            <Stack spacing={2} direction={"row"}>
                <Button onClick={handleSubmit} type={"submit"} variant={"contained"}>ثبت</Button>
                <Button onClick={onClose} type={"reset"}>لغو</Button>
            </Stack>
        </DialogActions>
    </Dialog>
}

export default ChangePasswordForm;
