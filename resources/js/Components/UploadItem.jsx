import {LinearProgress, Stack} from "@mui/material";

const UploadItem = ({loading, progress}) => {
    return loading ? (
        <Stack alignItems={"center"} direction={"row"} width={"100%"} spacing={2}>
            <LinearProgress sx={{minWidth: "300px"}} variant={"determinate"} value={progress ?? 0}/>
            <span style={{width: "50px"}}>{Math.floor(progress)} %</span>
        </Stack>
    ) : null;
}

export default UploadItem;
