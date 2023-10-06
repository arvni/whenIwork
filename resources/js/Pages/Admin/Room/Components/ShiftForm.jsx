import {
    Grid,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    FormControlLabel, DialogTitle, FormLabel,
} from "@mui/material";
import SelectSearch from "@/Components/SelectSearch";
import PersianDateTimePicker from "@/Components/PersianDatepicker";
import Switch from "@/Components/Switch";
import {checkTime} from "@/Services/helper";
import {TimePicker} from "@mui/x-date-pickers";

const Form = ({values, setValues, cancel, submit, errors, open, loading, title, setError, clearErrors}) => {
    const handleChange = (e) => change({[e.target.name]: e.target.value});
    const check = () => {
        let output = true;
        if (new Date(new Date(values.date).toDateString()) < new Date(new Date().toDateString())) {
            setError("date", "تاریخ انتخابی اشتباه است باشد");
            output = false;
        }
        if (!values.started_at) {
            setError("started_at", "زمان شروع را وارد کنید");
            output = false
        }
        if (!values.ended_at) {
            setError("ended_at", "زمان پایان را وارد کنید");
            output = false
        }
        if (checkTime(values.started_at, values.ended_at)) {
            setError("ended_at", "زمان پایان شیفت باید بزرگتر از شروع باشد");
            output = false
        }
        if (values.type !== "open") {
            if (values.related === "" || !values?.related?.id) {
                setError("related", "لطفا یک کاربر را انتخاب کنید");
                output = false;
            }
        } else {
            if (!values?.related?.length) {
                setError("related", "لطفا یک نقش را انتخاب کنید");
                output = false;
            }
        }
        if (values.noUsers < 1) {
            setError("noUsers", "تعداد کاربران باید حداقل یک نفر باشد");
            output = false;
        }

        return output;

    }
    const handleSubmit = () => {
        clearErrors();
        if (check())
            submit();
    }
    const handleDateChange = (date) => change({date});
    const handleTypeChange = (_, v) => change({type: v ? "open" : "normal", related: v ? [] : ""})
    const change = (newValues) => setValues(prevValues => ({...prevValues, ...newValues}));
    return (
        <Dialog open={open && !loading} maxWidth={"xs"}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                <Grid container spacing={3} sx={{marginTop: ".5em"}}>
                    <Grid item xs={12}>
                        <PersianDateTimePicker value={values.date} name={"date"} fullWidth label={"تاریخ"}
                                               onChange={handleDateChange} error={errors?.date}
                                               helperText={errors?.date}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth onChange={handleChange} name={"started_at"} value={values.started_at}
                                   label={"شروع"} type={"time"} error={errors.hasOwnProperty("started_at")}
                                   helperText={errors?.started_at}
                                   inputProps={{step: 3600, pattern: "[0-9]{2}:[0-9]{2}", max: values.ended_at}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name={"ended_at"} fullWidth onChange={handleChange} value={values.ended_at}
                                   label={"پایان"} type={"time"} error={errors.hasOwnProperty("ended_at")}
                                   helperText={errors?.ended_at}
                                   inputProps={{step: 3600, pattern: "[0-2][0-9]:[0-5][0-9]", min: values.started_at}}/>
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={7.5}
                          sx={{display: "flex", alignItems: "center", alignContent: "center", justifyContent: "start"}}>
                        <FormControlLabel
                            control={<Switch leftLabel={"موظفی"} rightLabel={"باز"} checked={values.type === "open"}
                                             onChange={handleTypeChange}/>}
                            label={<FormLabel>نوع شیفت</FormLabel>} labelPlacement={"top"}
                            sx={{alignItems: "center", justifyContent: "space-between", width: "100%", margin: 0}}/>
                    </Grid>
                    {values?.room?.id && (values.type === "open" ? <>
                            <Grid item xs={4.5}>
                                <TextField name={"noUsers"} fullWidth onChange={handleChange} value={values.noUsers}
                                           label={"تعداد کاربران"} type={"number"} error={errors.hasOwnProperty("noUsers")}
                                           helperText={errors?.noUsers} inputProps={{min: 1}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <SelectSearch value={values?.related} multiple
                                              name={"related"}
                                              onChange={handleChange}
                                              url={route("client.roomsApi.roles", values.room.id)}
                                              label={"نقش های مرتبط با شیفت"}
                                              helperText={errors?.related ?? ""}
                                              error={Object.keys(errors).includes('related')}/>
                            </Grid>
                        </> :
                        <Grid item xs={12}>
                            <SelectSearch value={values?.related}
                                          name={"related"}
                                          onChange={handleChange}
                                          url={route("client.roomsApi.users", values.room.id)}
                                          label={"کابر"}
                                          helperText={errors?.related ?? ""}
                                          error={Object.keys(errors).includes('related')}/>
                        </Grid>)}
                    <Grid item xs={12}>
                        <TextField name={"description"} fullWidth onChange={handleChange} value={values.description}
                                   label={"توضیحات"} multiline rows={3} error={errors.hasOwnProperty("description")}
                                   helperText={errors?.description}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container spacing={2} flex justifyContent={"flex-end"} justifyItems={"flex-end"}>
                    <Grid item>
                        <Button onClick={cancel}>لغو</Button>
                    </Grid>
                    <Grid item>
                        <Button variant={"contained"} onClick={handleSubmit} sx={{color: "#fff"}}>ثبت</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}
export default Form;
