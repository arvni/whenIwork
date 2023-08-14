import {useState} from "react";
import AdapterJalali from "@date-io/date-fns-jalali";
import {wordifyRials} from "wordifyfa/src/wordifyfa";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {
    DialogActions,
    DialogContent,
    FormControl, FormHelperText,
    InputLabel,
    Select,
    TextField,Grid,Button,MenuItem,DialogTitle,Dialog
} from "@mui/material";


const AddForm = ({values, setValues, submit, open, title, onClose, loading}) => {
    const [errors, setErrors] = useState({});
    const handleChange = (e) => setValues(prevState => ({...prevState, [e.target.name]: e.target.value}));
    const handleDateChanged = (v) => setValues(prevState => ({...prevState, date: v}));

    const handleSubmit = () => {
        if (check())
            submit();
    }
    const check = () => {
        let tmp = {};
        if (!values.price * 1 > 0)
            tmp.price = "مبلغ باید بزرگتر از ۱ ریال  باشد ";
        if (!values.type)
            tmp.type = "لطفا نحوه واریز وجه را انتخاب کنید ";
        if (!values.date)
            tmp.date = "لطفا تاریخ را وارد کنید"
        if (values.type === "deposit") {
            if (!values.accountOwner)
                tmp.accountOwner = "لطفا صاحب حساب را وارد کنید"
            if (!values.originBank)
                tmp.originBank = "لطفا صاحب حساب را وارد کنید"
        }
        if (values.type === "card") {
            if (!values.originCard)
                tmp.originCard = "لطفا شماره کارت را وارد کنید"
            if (!values.trackingCode)
                tmp.trackingCode = "لطفا کد رهگیری را وارد کنید"
        }
        if (values.type === "cheque") {
            if (!values.chequeNumber)
                tmp.chequeNumber = "لطفا شماره چک را وارد کنید"
        }
        setErrors(tmp);
        return Object.keys(tmp).length < 1;
    }

    return <Dialog open={open} onClose={onClose} maxWidth={"sm"} keepMounted>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{p: "1em"}}>
            <Grid container sx={{marginTop: "1em"}} spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField inputProps={{min: 1}} label={"مبلغ"} helperText={wordifyRials(values.price)} fullWidth
                               value={values.price} type={"number"} onChange={handleChange} name={"price"}
                               error={errors.hasOwnProperty("price")}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth defaultValue={values.type} error={errors.hasOwnProperty("type")}>
                        <InputLabel id={"type-label"}>نحوه پرداخت</InputLabel>
                        <Select type={"number"} labelId={"type-label"} label={"نحوه پرداخت"} name={"type"}
                                onChange={handleChange} defaultValue={values.type}>
                            <MenuItem value={"deposit"}>واریز به حساب</MenuItem>
                            <MenuItem value={"cheque"}>چک</MenuItem>
                            <MenuItem value={"card"}>کارت به کارت</MenuItem>
                        </Select>
                        <FormHelperText
                            error={errors.hasOwnProperty("type")}>{errors.hasOwnProperty("error") ? errors.type : null}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DesktopDatePicker
                            label={`تاریخ ${values.type === "cheque" ? "چک" : values.type === "card" ? "تاریخ کارت به کارت" : "تاریخ واریز به حساب"}`}
                            inputFormat="dd/MM/yyyy"
                            onChange={handleDateChanged}
                            name={"date"}
                            value={values.date}
                            renderInput={(params) => <TextField {...params} fullWidth
                                                                error={errors.hasOwnProperty("date")}
                                                                helperText={errors.hasOwnProperty("date") ? errors.date : null}/>}
                        />
                    </LocalizationProvider>
                </Grid>
                {values.type === "cheque" ? <Grid item xs={12} sm={6}>

                    <TextField label={"شماره چک"} name={"chequeNumber"} onChange={handleChange} fullWidth
                               value={values.chequeNumber} error={errors.hasOwnProperty("chequeNumber")}
                               helperText={errors.hasOwnProperty("chequeNumber") ? errors.chequeNumber : null}/>
                </Grid> : null}
                {values.type === "deposit" ? <>
                    <Grid item xs={12} sm={6}>
                        <TextField label={"صاحب حساب واریز کننده"} name={"accountOwner"} onChange={handleChange}
                                   fullWidth
                                   value={values.accountOwner} error={errors.hasOwnProperty("accountOwner")}
                                   helperText={errors.hasOwnProperty("accountOwner") ? errors.accountOwner : null}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label={"بانک مبدا"} name={"originBank"} onChange={handleChange} fullWidth
                                   value={values.originBank} error={errors.hasOwnProperty("originBank")}
                                   helperText={errors.hasOwnProperty("originBank") ? errors.originBank : null}/>
                    </Grid>
                </> : null}
                {values.type === "card" ? <>
                    <Grid item xs={12} sm={6}>
                        <TextField label={"شماره کارت"} name={"originCard"} onChange={handleChange} fullWidth
                                   value={values.originCard} error={errors.hasOwnProperty("originCard")}
                                   helperText={errors.hasOwnProperty("originCard") ? errors.originCard : null}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label={"کد رهگیری"} name={"trackingCode"} onChange={handleChange} fullWidth
                                   value={values.trackingCode} error={errors.hasOwnProperty("trackingCode")}
                                   helperText={errors.hasOwnProperty("trackingCode") ? errors.trackingCode : null}/>
                    </Grid>
                </> : null}
                <Grid item xs={12} sm={6}>
                    <TextField multiline rows={3} label={"توضیحات"} name={"description"} onChange={handleChange} fullWidth
                               value={values.description}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSubmit} variant={"contained"} disabled={loading}>ثبت</Button>
            <Button onClick={onClose}>لغو</Button>
        </DialogActions>

    </Dialog>
}

export default AddForm;
