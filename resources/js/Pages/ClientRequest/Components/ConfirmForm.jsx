import {useState} from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Stack,
    Switch,
    TextField,Grid,Button
} from "@mui/material";

import {wordifyRialsInTomans} from "wordifyfa/src/wordifyfa";
import {styled} from "@mui/material/styles";
import {types} from "@/Pages/Payment";

import {convertDate, convertNumber} from "@/Services/helper";

const IOSSwitch = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="32" height="32" viewBox="0 0 122.88 122.88" enable-background="new 0 0 122.88 122.88" xml:space="preserve"><g><path fill="${encodeURIComponent(
                    '#009d00',
                )}" d="M34.388,67.984c-0.286-0.308-0.542-0.638-0.762-0.981c-0.221-0.345-0.414-0.714-0.573-1.097 c-0.531-1.265-0.675-2.631-0.451-3.934c0.224-1.294,0.812-2.531,1.744-3.548l0.34-0.35c2.293-2.185,5.771-2.592,8.499-0.951 c0.39,0.233,0.762,0.51,1.109,0.827l0.034,0.031c1.931,1.852,5.198,4.881,7.343,6.79l1.841,1.651l22.532-23.635 c0.317-0.327,0.666-0.62,1.035-0.876c0.378-0.261,0.775-0.482,1.185-0.661c0.414-0.181,0.852-0.323,1.3-0.421 c0.447-0.099,0.903-0.155,1.356-0.165h0.026c0.451-0.005,0.893,0.027,1.341,0.103c0.437,0.074,0.876,0.193,1.333,0.369 c0.421,0.161,0.825,0.363,1.207,0.604c0.365,0.231,0.721,0.506,1.056,0.822l0.162,0.147c0.316,0.313,0.601,0.653,0.85,1.014 c0.256,0.369,0.475,0.766,0.652,1.178c0.183,0.414,0.325,0.852,0.424,1.299c0.1,0.439,0.154,0.895,0.165,1.36v0.23 c-0.004,0.399-0.042,0.804-0.114,1.204c-0.079,0.435-0.198,0.863-0.356,1.271c-0.16,0.418-0.365,0.825-0.607,1.21 c-0.238,0.377-0.518,0.739-0.832,1.07l-27.219,28.56c-0.32,0.342-0.663,0.642-1.022,0.898c-0.369,0.264-0.767,0.491-1.183,0.681 c-0.417,0.188-0.851,0.337-1.288,0.44c-0.435,0.104-0.889,0.166-1.35,0.187l-0.125,0.003c-0.423,0.009-0.84-0.016-1.241-0.078 l-0.102-0.02c-0.415-0.07-0.819-0.174-1.205-0.31c-0.421-0.15-0.833-0.343-1.226-0.575l-0.063-0.04 c-0.371-0.224-0.717-0.477-1.032-0.754l-0.063-0.06c-1.58-1.466-3.297-2.958-5.033-4.466c-3.007-2.613-7.178-6.382-9.678-9.02 L34.388,67.984L34.388,67.984z M61.44,0c16.96,0,32.328,6.883,43.453,17.987c11.104,11.125,17.986,26.493,17.986,43.453 c0,16.961-6.883,32.329-17.986,43.454C93.769,115.998,78.4,122.88,61.44,122.88c-16.961,0-32.329-6.882-43.454-17.986 C6.882,93.769,0,78.4,0,61.439C0,44.48,6.882,29.112,17.986,17.987C29.112,6.883,44.479,0,61.44,0L61.44,0z M96.899,25.981 C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685c-9.073,9.073-14.684,21.609-14.684,35.458 c0,13.851,5.611,26.387,14.684,35.46s21.609,14.685,35.46,14.685c13.85,0,26.386-5.611,35.459-14.685s14.684-21.609,14.684-35.46 C111.583,47.59,105.973,35.054,96.899,25.981L96.899,25.981z"/></g></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#fff',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="32" height="32" viewBox="0 0 122.88 122.88" enable-background="new 0 0 122.88 122.88" xml:space="preserve"><g><path fill="${encodeURIComponent(
                '#e00000',
            )}" xmlns="http://www.w3.org/2000/svg" d="M61.44,0c16.966,0,32.326,6.877,43.445,17.996c11.119,11.118,17.996,26.479,17.996,43.444 c0,16.967-6.877,32.326-17.996,43.444C93.766,116.003,78.406,122.88,61.44,122.88c-16.966,0-32.326-6.877-43.444-17.996 C6.877,93.766,0,78.406,0,61.439c0-16.965,6.877-32.326,17.996-43.444C29.114,6.877,44.474,0,61.44,0L61.44,0z M80.16,37.369 c1.301-1.302,3.412-1.302,4.713,0c1.301,1.301,1.301,3.411,0,4.713L65.512,61.444l19.361,19.362c1.301,1.301,1.301,3.411,0,4.713 c-1.301,1.301-3.412,1.301-4.713,0L60.798,66.157L41.436,85.52c-1.301,1.301-3.412,1.301-4.713,0c-1.301-1.302-1.301-3.412,0-4.713 l19.363-19.362L36.723,42.082c-1.301-1.302-1.301-3.412,0-4.713c1.301-1.302,3.412-1.302,4.713,0l19.363,19.362L80.16,37.369 L80.16,37.369z M100.172,22.708C90.26,12.796,76.566,6.666,61.44,6.666c-15.126,0-28.819,6.13-38.731,16.042 C12.797,32.62,6.666,46.314,6.666,61.439c0,15.126,6.131,28.82,16.042,38.732c9.912,9.911,23.605,16.042,38.731,16.042 c15.126,0,28.82-6.131,38.732-16.042c9.912-9.912,16.043-23.606,16.043-38.732C116.215,46.314,110.084,32.62,100.172,22.708 L100.172,22.708z"/></g></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));
const CustomDiv = styled((props => <div {...props}/>))(({theme}) => ({
    display: "inline-flex",
    "& strong": {
        marginRight: ".5em"
    }
}));

const ConfirmForm = ({values, setValues, submit, open, title, onClose}) => {
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setValues(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const handleSubmit = () => {
        if (check())
            submit();
    }
    const check = () => {
        let tmp = {};
        if (!values.confirm) {
            if (!values.details)
                tmp.details = "لطفا دلیل رد کردن این درخواست را وارد کنید ";
        }
        setErrors(tmp);
        return Object.keys(tmp).length < 1;
    }

    const handleConfirmChanged = (_, val) => setValues(prevState => ({
        ...prevState,
        confirm: val,
        details: val ? "" : prevState.details
    }))

    return <Dialog open={open} onClose={onClose} maxWidth={"sm"}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{p: "1em"}}>
            <Grid container sx={{marginTop: "1em"}} spacing={3}>
                <Grid item xs={12}>
                    <Stack spacing={2}>
                        <CustomDiv>
                            <strong>کاربر: </strong><span>{values?.user?.name}</span>
                        </CustomDiv>
                        <CustomDiv>
                            <strong>مبلغ
                                : </strong><span>{convertNumber(values?.price)} ریال</span><span>معادل {wordifyRialsInTomans(values?.price)}</span>
                        </CustomDiv>
                        <CustomDiv>
                            <strong>نحوه پرداخت : </strong><span>{types[values?.type]}</span>
                        </CustomDiv>

                        {values.type === "cheque" ?
                            <CustomDiv>
                                <strong>شماره چک : </strong>
                                <span>{values?.chequeNumber}</span>
                            </CustomDiv> : values.type === "deposit" ? <>
                                <CustomDiv>
                                    <strong>صاحب حساب واریز کننده : </strong>
                                    <span>{values?.accountOwner}</span>
                                </CustomDiv>
                                <CustomDiv>
                                    <strong>بانک مبدا : </strong>
                                    <span>{values.originBank}</span>
                                </CustomDiv>
                            </> : values.type === "card" ?
                                <>
                                    <CustomDiv>
                                        <strong>شماره کارت : </strong>
                                        <span>{values.originCard}</span>
                                    </CustomDiv>
                                    <CustomDiv>
                                        <strong>کد رهگیری</strong>
                                        <span>{values.trackingCode}</span>
                                    </CustomDiv>
                                </> : null}
                        <CustomDiv>
                            <strong>تاریخ واریز : </strong>
                            <span>{convertDate(values?.date)}</span>
                        </CustomDiv>
                        <CustomDiv>
                            <strong>تاریخ ایجاد : </strong>
                            <span>{convertDate(values?.created_at)}</span>
                        </CustomDiv>

                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <span>رد</span>
                        <IOSSwitch sx={{m: .5}} checked={values.confirm} onChange={handleConfirmChanged}/>
                        <span>تایید</span>
                    </Stack>

                </Grid>
                {!values.confirm ? <Grid item xs={12}>
                    <TextField multiline rows={3} label={"توضیحات"} name={"details"} onChange={handleChange}
                               fullWidth
                               value={values.details} error={errors.hasOwnProperty("details")}
                               helperText={errors.hasOwnProperty("details") ? errors.details : null}/>
                </Grid> : null}
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSubmit} variant={"contained"}>ثبت</Button>
            <Button onClick={onClose}>لغو</Button>
        </DialogActions>

    </Dialog>
}

export default ConfirmForm;
