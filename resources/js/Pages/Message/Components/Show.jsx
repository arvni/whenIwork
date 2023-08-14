import {
    DialogContent,
    Table,
    TableBody, Dialog,
    TableCell, TableHead, DialogTitle,
    TableRow, Container, Grid
} from "@mui/material";
import {convertDate} from "@/Services/helper";

const Show = ({values, open, setOpen, reset, showReceivers = false}) => {
    const handleClose = () => {
        setOpen(false);
        reset();
    }
    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{values.title}</DialogTitle>
        <DialogContent sx={{p: "1em"}}>
            <Container>
                <Grid container sx={{marginTop: "1em"}} spacing={2}>
                    <Grid item xs={12}>
                        <p>
                            {values.context}
                        </p>
                    </Grid>
                    {showReceivers && values ? <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        گیرندگان
                                    </TableCell>
                                    <TableCell>
                                        تاریخ خواندن پیام
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {values?.receivers?.map(item => <TableRow>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {convertDate(item.read_at)}
                                    </TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </Grid> : null}

                </Grid>
            </Container>
        </DialogContent>
    </Dialog>
}

export default Show;
