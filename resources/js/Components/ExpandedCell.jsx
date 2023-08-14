import * as React from 'react';
import {TextField,Popover} from "@mui/material";

export default function ExpandedCell({value}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            {value&&<TextField multiline defaultValue={value} inputProps={{readOnly: true}}
                        sx={{maxHeight: "100%", overflowY: "auto", p: 1, border:"none"}} fullWidth
                        aria-owns={open ? 'mouse-over-popover' : undefined} variant={"standard"}
                        aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}/>}
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                    MaxWidth:"100px"
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                paperprops={{sx:{maxWidth:"px"}}}
            >
                <TextField multiline defaultValue={value} inputProps={{readOnly:true}} sx={{maxHeight:"100%", p:1,pb:0,border:"none"}}
                           aria-owns={open ? 'mouse-over-popover' : undefined} variant={"standard"} fullWidth
                           aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}/>
            </Popover>
        </>
    );
}
