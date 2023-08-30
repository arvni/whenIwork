import {
    TextField,
    Container,
    Grid,
    Divider,
    Button, Dialog, DialogContent, DialogActions,
} from "@mui/material";
import SelectSearch from "@/Components/SelectSearch";

const Form = ({values, setValues, cancel, submit, errors, open, loading,disabledDepartment=false}) => {
    const handleChange = (e) => setValues(prevValues => ({...prevValues, [e.target.name]: e.target.value}));
    const check=()=>{

    }
    return (
        <Dialog open={open && !loading}>
            <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField error={Object.keys(errors).includes('name')} helperText={errors?.name ?? ""}
                               label={"نام"}
                               name={"name"} value={values.name} onChange={handleChange} sx={{width: "100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <SelectSearch value={values.department}
                                  disabled={disabledDepartment}
                                  name={"department"}
                                  onChange={handleChange}
                                  url={route("admin.departmentApi.index")}
                                  label={"دپارتمان"}
                                  helperText={errors?.department ?? ""}
                                  error={Object.keys(errors).includes('department')}/>
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container spacing={2} flex justifyContent={"flex-end"} justifyItems={"flex-end"}>
                    <Grid item>
                        <Button onClick={cancel}>لغو</Button>
                    </Grid>
                    <Grid item>
                        <Button variant={"contained"} onClick={submit} sx={{color: "#fff"}}>ثبت</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}
export default Form;
