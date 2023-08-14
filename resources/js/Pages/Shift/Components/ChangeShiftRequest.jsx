import Grid from "@mui/material/Grid";
import SelectSearch from "@/Components/SelectSearch";
import {TextField} from "@mui/material";

const ChangeShiftRequest = ({onChange, defaultValues}) => {

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <SelectSearch value={defaultValues?.changeUser}
                          name={"changeUser"}
                          onChange={handleChange}
                          url={defaultValues?.shift && route("client.roomsApi.users", defaultValues?.shift?.room?.id)}
                          label={"کاربر جایگزین"}
                          filterSelectedOptions/>
        </Grid>
    </Grid>
}

export default ChangeShiftRequest;
