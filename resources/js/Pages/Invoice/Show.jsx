import Authenticated from "@/Layouts/AuthenticatedLayout";
import {convertDate, convertNumber, persianNumber} from "@/Services/helper";

import {Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography,Box,Grid,IconButton} from "@mui/material";
import {Print} from "@mui/icons-material";

const Show = ({invoice}) => {
    return <Grid container rowSpacing={4}>
        <Grid item xs={12} sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <Stack direction={"row"} spacing={1}>
                <Typography variant={"h4"}> صورت حساب فروش خدمات و کالا</Typography>
                <IconButton href={route("invoices.print", invoice.id)} title={"پرینت"} target={"_blank"}>
                    <Print/>
                </IconButton>
            </Stack>
            <Box sx={{minWidth: "40mm", minHeight: "40mm", display: "flex"}}>
                <Paper sx={{
                    display: "flex",
                    p: "2mm",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    justifyContent: "space-evenly"
                }} variant={"outlined"}>
                    <span> <strong>شماره فاکتور :</strong> {persianNumber(invoice.InvoiceNumber)}</span>
                    <span> <strong>تاریخ فاکتور :</strong> {convertDate(invoice.InvoiceDate)}</span>
                </Paper>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Paper sx={{width: "100%", p: "2mm"}} title={"مشخصات فروشنده"} variant={"outlined"}>
                <Typography title={"مشخصات فروشنده"} variant={"h5"} textAlign={"center"} marginBottom={"5mm"}>مشخصات
                    فروشنده</Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <span> <strong> نام شخص حقوقی/حقیقی : </strong>{invoice.InvoiceCompanyName}</span>
                    </Grid>
                    <Grid item>
                        <span> <strong>شماره اقتصادی : </strong>{invoice.InvoiceCompanyRegistrationCode}</span>
                    </Grid>
                    <Grid item>
                        <span> <strong>نشانی : </strong>{invoice.InvoiceCompanyAddress}</span>
                    </Grid>
                    <Grid item>
                        <span> <strong>شماره تلفن : </strong>{invoice.InvoiceCompanyPhoneNumber}</span>
                    </Grid>
                    <Grid item>
                        <span> <strong>کدپستی : </strong>{invoice.InvoiceCompanyPostalCode}</span>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper sx={{width: "100%", p: "2mm",}} title={"مشخصات خریدار"} variant={"outlined"}>
                <Typography title={"مشخصات خریدار"} variant={"h5"} textAlign={"center"} marginBottom={"5mm"}>مشخصات
                    خریدار</Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <span> <strong> نام شخص حقوقی/حقیقی : </strong>{invoice.InvoiceCustomerName}</span>
                    </Grid>
                    <Grid item>
                        <span> <strong>شماره اقتصادی : </strong>{persianNumber(invoice.InvoiceCustomerEconomicCode)}</span>
                    </Grid>
                    <Grid item>
                        <span> <strong>شناسه ملی : </strong>{persianNumber(invoice.InvoiceCustomerNatinalOrRegistrationCode)}</span>
                    </Grid>
                    <Grid item>
                        <span> <strong>نشانی : </strong>{invoice.InvoiceCustomerAddress}</span>
                    </Grid>
                    <Grid item>
                        <span> <strong>شماره تلفن : </strong>{persianNumber(invoice.InvoiceCustomerPhoneNumber)}</span>
                    </Grid>
                    <Grid item>
                        <span> <strong>کدپستی : </strong>{persianNumber(invoice.InvoiceCustomerPostalCode)}</span>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper sx={{width: "100%", p: "2mm", overflow: "auto"}} variant={"outlined"}
                   title={"مشخصات کالا یا خدمت مورد معامله"}>
                <Typography title={"مشخصات کالا یا خدمت مورد معامله"} variant={"h5"} textAlign={"center"}
                            marginBottom={"5mm"}>مشخصات کالا یا خدمت مورد معامله</Typography>
                <Table title={"مشخصات کالا یا خدمت مورد معامله"} border>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>
                                    ردیف
                                </strong>
                            </TableCell>
                            <TableCell>
                                <strong>
                                    کد کالا
                                </strong>
                            </TableCell>
                            <TableCell>
                                <strong>
                                    شرح کالا / خدمات
                                </strong>
                            </TableCell>
                            <TableCell>
                                <strong>
                                    تعداد
                                </strong>
                            </TableCell>
                            <TableCell>
                                <strong>
                                    واحد اندازه
                                </strong>
                            </TableCell>
                            <TableCell>
                                <strong>
                                    مبلغ واحد
                                </strong>
                            </TableCell>
                            <TableCell>
                                <strong>
                                    ملبع کل
                                </strong>
                            </TableCell>
                            <TableCell>
                                <strong>
                                    مبلغ کل بعد از تحفیف
                                </strong>
                            </TableCell>
                            <TableCell>
                                <strong>
                                    مالیات
                                </strong>
                            </TableCell>
                            <TableCell>
                                <strong>
                                    جمع مبالغ کل
                                </strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoice.invoice_items.map((item, index) => (
                            <TableRow>
                                <TableCell>{persianNumber(item.InvoiceItemRowNumber)}</TableCell>
                                <TableCell>{persianNumber(item.InvoiceItemProductNumber)}</TableCell>
                                <TableCell>{item.InvoiceItemProductName}</TableCell>
                                <TableCell>{Intl.NumberFormat().format(item.InvoiceItemQuantity)}</TableCell>
                                <TableCell>{item.InvoiceItemMajorUnitName}</TableCell>
                                <TableCell
                                    sx={{textAlign: "right"}}>{convertNumber(item.InvoiceItemPriceBaseFee - (item.InvoiceItemReductionAmount / item.InvoiceItemQuantity))}</TableCell>
                                <TableCell
                                    sx={{textAlign: "right"}}>{convertNumber(item.InvoiceItemPrice - item.InvoiceItemReductionAmount)}</TableCell>
                                <TableCell
                                    sx={{textAlign: "right"}}>{convertNumber(item.InvoiceItemPriceAfterDiscount - item.InvoiceItemReductionAmount)}</TableCell>
                                <TableCell
                                    sx={{textAlign: "right"}}>{convertNumber(item.InvoiceItemPolicyTaxes)}</TableCell>
                                <TableCell
                                    sx={{textAlign: "right"}}>{convertNumber(item.InvoiceItemTotalPrice - item.InvoiceItemReductionAmount)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell colSpan={5}>
                                <strong>جمع</strong>
                            </TableCell>
                            <TableCell sx={{textAlign: "right"}}>
                                <strong>
                                    {convertNumber(invoice.invoice_items.map(item => (Number.parseInt(item.InvoiceItemPrice) - Number.parseInt(item.InvoiceItemReductionAmount))).reduce((a, b) => a + b, 0))}
                                </strong>
                            </TableCell>
                            <TableCell sx={{textAlign: "right"}}>
                                <strong>
                                    {convertNumber(invoice.invoice_items.map(item => (Number.parseInt(item.InvoiceItemPriceAfterDiscount) - Number.parseInt(item.InvoiceItemReductionAmount))).reduce((a, b) => a + b, 0))}
                                </strong>
                            </TableCell>
                            <TableCell sx={{textAlign: "right"}}>
                                <strong>
                                    {convertNumber(invoice.invoice_items.map(item => Number.parseInt(item.InvoiceItemPolicyTaxes)).reduce((a, b) => a + b, 0))}
                                </strong>
                            </TableCell>
                            <TableCell sx={{textAlign: "right"}}>
                                <strong>
                                    {convertNumber(invoice.invoice_items.map(item => (Number.parseInt(item.InvoiceItemTotalPrice) - Number.parseInt(item.InvoiceItemReductionAmount))).reduce((a, b) => a + b, 0))}
                                </strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </Paper>
        </Grid>
    </Grid>;
}
const breadCrumbs = [
    {
        title: "فاکتور ها",
        link: route("invoices.index"),
        icon: null
    },
]
Show.layout = (page) => <Authenticated auth={page.props.auth} children={page}
                                       breadcrumbs={[...breadCrumbs, {title: "فاکتور شماره #" + persianNumber(page.props.invoice.InvoiceNumber)}]}/>

export default Show;
