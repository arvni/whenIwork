import React, {useEffect} from 'react';
import {Head, useForm} from '@inertiajs/inertia-react';
import {Inertia} from '@inertiajs/inertia';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    CircularProgress,
    FormGroup,
    Button,
    CssBaseline,
    TextField,
    Container,
    Grid,
    Backdrop,
    IconButton,
    Paper,
    Stack
} from "@mui/material";

import {Refresh} from "@mui/icons-material";
import Copyright from "@/Layouts/Components/Copyright";
import PasswordField from "@/Components/PasswordField";


const theme = createTheme({
    typography: {
        fontFamily: "YekanBakh, tahoma",
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    textAlign: "right",
                    "& label.MuiInputLabel": {
                        "&-root": {
                            right: "24px",
                            left: "unset",
                            transformOrigin: "top right"
                        },
                        "&-shrink": {
                            transform: "translate(9px, -9px) scale(0.75)"
                        }
                    },
                    "& fieldset": {
                        textAlign: "right",
                        right: "0",
                    }
                },
            }
        },
    }
});


export default function Welcome(props) {
    const {data, setData, post, processing, errors, reset, setError, clearErrors, get} = useForm({
        userId: '',
        password: '',
        captcha: ''
    });


    useEffect(() => {
        if (props?.auth?.user)
            Inertia.visit('/dashboard');
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (check())
            post(route('login'));
    };
    const check = () => {
        let tmp = true;
        clearErrors();
        if (!data.password) {
            tmp = false
            setError("password", "لطفا رمز عبور را وارد کنید")
        }
        if (!data.userId) {
            tmp = false
            setError("userId", "لطفا شناسع کارری را وارد کنید")
        }
        if (!data.captcha) {
            tmp = false
            setError("captcha", "لطفا کد امنیتی را وارد کنید ")
        }
        return tmp;
    }

    const captchaReload = () => {
        get("/", {
            preserveState: true,
            only: ["captchaSrc"]
        });
    }

    return (
        <>
            <Head title="Login"/>
            <Grid container sx={{minHeight: "100vh"}} justifyContent={"center"} alignItems={"center"}
                  alignContent={"center"}>
                <Grid item xs={12}>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="md">
                            <CssBaseline/>
                            <Paper sx={{backgroundColor: "#eff2f7", height: "100%"}} elevation={10}>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Stack spacing={5} justifyContent={"center"} alignItems={"center"}
                                               height={"100%"}>
                                            <img src={"/images/logo.png"} width="50%"/>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} sx={{pt: "1em"}}>
                                        <form onSubmit={handleSubmit} action={route("login")} method={"post"}>
                                            <Stack alignItems={"center"} sx={{maxWidth: "224px", mx: "auto"}}>
                                                <FormGroup s={{width:"100%"}}>
                                                    <TextField onChange={onHandleChange} margin="normal" required
                                                               inputProps={{style:{direction:"ltr"}}}
                                                               id="userId" label="شناسه کاربری" size={"small"}
                                                               error={errors.hasOwnProperty("userId")} fullWidth
                                                               helperText={errors.hasOwnProperty("userId") ? errors.userId : ""}
                                                               name="userId" autoComplete="userId" autoFocus/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <PasswordField onChange={onHandleChange}
                                                               name="password" label="رمز عبور" error={errors?.password} />
                                                </FormGroup>
                                                <FormGroup sx={{mt: "1em"}}>
                                                    <Stack direction={"row"} alignItems={"center"}
                                                           justifyContent={"center"}
                                                           spacing={3}>
                                                        <IconButton onClick={captchaReload}>
                                                            <Refresh/>
                                                        </IconButton>
                                                        <img src={props.captchaSrc}/>
                                                    </Stack>
                                                    <TextField onChange={onHandleChange} margin="normal" required
                                                               inputMode={"numeric"} name="captcha" label="کد امنیتی"
                                                               size={"small"} sx={{maxWidth: "224px"}}
                                                               id="captcha" error={errors.hasOwnProperty("captcha")}
                                                               helperText={errors.hasOwnProperty("captcha") ? errors.captcha : ""}/>
                                                </FormGroup>
                                                <Button onClick={handleSubmit} variant="contained" sx={{mt: 3, mb: 2}}
                                                        disabled={processing} type={"submit"}>

                                                    ورود
                                                </Button>
                                            </Stack>
                                        </form>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Copyright sx={{mt: 8, mb: 4}}/>
                        </Container>
                    </ThemeProvider>
                </Grid>
            </Grid>
            <Backdrop open={processing}>
                <CircularProgress/>
            </Backdrop>
        </>
    );
}
