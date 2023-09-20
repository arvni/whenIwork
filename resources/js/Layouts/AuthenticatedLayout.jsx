import React, {useEffect, useState} from 'react';
import {useForm} from '@inertiajs/inertia-react';
import {InertiaProgress} from '@inertiajs/progress';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {SnackbarProvider} from "notistack";
import {
    Paper,
    CssBaseline,
    Box,
    Toolbar,
    Container
} from "@mui/material";

import Copyright from './Components/Copyright';

import AlertComponent from "@/Components/AlertComponent";
import AppMenu from "@/Layouts/Components/AppMenu";
import Loading from "@/Components/Loading";
import {Inertia} from "@inertiajs/inertia";
import ChangePasswordForm from "@/Components/ChangePasswordForm";

InertiaProgress.init({
    // The delay after which the progress bar will
    // appear during navigation, in milliseconds.
    delay: 100,

    // The color of the progress bar.
    color: '#00adef',

    // Whether to include the default NProgress styles.
    includeCSS: true,

    // Whether the NProgress spinner will be shown.
    showSpinner: true,
});
const mdTheme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: "#00adef",
            light: "#00bbe4"
        }
    },
    typography: {
        fontFamily: "YekanBakh, thoma",
    },
});
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});


export default function Authenticated({auth, breadcrumbs, children,routes}) {
    const {post, data, setData, reset} = useForm();
    const [loading, setLoading] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const handleVisit = (href, method = "get") => () => {
        if (method === "post")
            post(route(href))
        else
            Inertia.visit(route(href));
    };
    useEffect(() => {
        document.addEventListener('inertia:start', function () {
            setLoading(true);
        })
        document.addEventListener('inertia:finish', function () {
            setLoading(false)
        })
    }, []);
    const handleOpenChangePassword = () => {
        handleChangePasswordForm("_method", "put");
        setOpenChangePassword(true);
    };
    const handleChangePasswordForm = (key, value) => {
        setData(previousData => ({...previousData, [key]: value}));
    }
    const handleSubmitChangePassword = () => {
        post(route("password.update"), {
            onSuccess: handleCloseChangePasswordForm
        })
    }
    const handleCloseChangePasswordForm = () => {
        reset();
        setOpenChangePassword(false);
    }
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppMenu list={routes} permissions={auth.permissions} userName={auth.user.name}
                             breadcrumbs={breadcrumbs} handleVisit={handleVisit}
                             openChangePassword={handleOpenChangePassword}/>
                    <Box component="main" sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: 'calc(100vh - 55px)',
                        overflow: 'auto',
                    }}>
                        <Toolbar/>
                        <Container sx={{mt: 4, mb: 4,}} maxWidth={false}>
                            <Paper elevation={12} sx={{p: 2, borderRadius: "1em"}}>
                                {children}
                            </Paper>
                        </Container>
                    </Box>
                </Box>
                <Copyright sx={{pt: 4}}/>
                <Loading open={loading}/>
                <SnackbarProvider maxSnack={3}>
                    <AlertComponent status={children.props?.status} errors={children.props?.errors}
                                    success={children.props?.success}/>
                </SnackbarProvider>
                <ChangePasswordForm data={data} open={openChangePassword} onChange={handleChangePasswordForm}
                                    onSubmit={handleSubmitChangePassword} onClose={handleCloseChangePasswordForm}/>
            </ThemeProvider>
        </CacheProvider>
    );
}
