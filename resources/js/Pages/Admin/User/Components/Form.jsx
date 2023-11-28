import {
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    Typography,
    Container,
    Grid,
    Divider,
    Button,
} from "@mui/material";
import SelectSearch from "@/Components/SelectSearch";

const UserForm = ({values, setValues, cancel, loading, submit, errors, edit}) => {
    const handleChange = (e) => setValues(prevValues => ({...prevValues, [e.target.name]: e.target.value}));
    const handleSwitchChange = (e, v) => {
        setValues(prevValues => ({...prevValues, [e.target.name]: v}))
    };
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField error={Object.keys(errors).includes('userId')} helperText={errors?.userId ?? ""}
                               label={"شناسه کاربری"}
                               name={"userId"} value={values.userId} onChange={handleChange} sx={{width: "100%"}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField error={Object.keys(errors).includes('name')} helperText={errors?.name ?? ""}
                               label={"نام و نام خانوادگی"}
                               name={"name"} value={values.name} onChange={handleChange} sx={{width: "100%"}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField error={Object.keys(errors).includes('email')} helperText={errors?.email ?? ""}
                               label={"ایمیل"} name={"email"} type={"email"} value={values.email}
                               onChange={handleChange} sx={{width: "100%"}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField error={Object.keys(errors).includes('mobileNo')} helperText={errors?.mobileNo ?? ""}
                               label={"موبایل"} name={"mobileNo"} value={values.mobileNo} onChange={handleChange}
                               sx={{width: "100%"}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SelectSearch multiple url={route("admin.roleApi.index")} error={Object.keys(errors).includes('roles')}
                                  helperText={errors?.roles ?? ""} value={values.roles} onChange={handleChange} label={"نقش ها"}
                                  name={"roles"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel labelPlacement={"start"}
                                      control={
                                          <Stack direction={"row"} spacing={"1"}
                                                 alignItems={"center"}><span> غیرفعال </span>
                                              <Switch checked={values.isActive} onChange={handleSwitchChange}
                                                      name="isActive"/>
                                              <span> فعال </span>
                                          </Stack>
                                      }
                                      label={<Typography> وضعیت : </Typography>}
                    />
                </Grid>
            </Grid>
            <Divider sx={{marginY: "1em"}}/>
            {!edit ? <>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField error={Object.keys(errors).includes('password')} helperText={errors?.password ?? ""}
                                   label={"رمزعبور"} name={"password"} type={"password"} onChange={handleChange}
                                   sx={{width: "100%"}}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField error={Object.keys(errors).includes('password_confirmation')}
                                   helperText={errors?.password_confirmation ?? ""} label={"تایید رمزعبور"}
                                   name={"password_confirmation"} type={"password"}
                                   onChange={handleChange} sx={{width: "100%"}}/>
                    </Grid>
                </Grid>
                <Divider sx={{marginY: "1em"}}/>
            </> : null}
            <Grid container spacing={2} flex justifyContent={"flex-end"} justifyItems={"flex-end"}>
                <Grid item>
                    <Button onClick={cancel}>لغو</Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} onClick={submit} sx={{color: "#fff"}}>ثبت</Button>
                </Grid>
            </Grid>
        </Container>
    );
}
export default UserForm;
