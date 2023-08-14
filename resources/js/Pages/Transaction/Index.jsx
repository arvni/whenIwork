import {useEffect, useState} from "react";
import {Head} from "@inertiajs/inertia-react";

import SelectSearch from "@/Components/SelectSearch";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Grid,
    CircularProgress,
    FormControl,
    InputLabel,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    MenuItem,
    Backdrop
} from "@mui/material";
import {DataGrid, faIR} from "@mui/x-data-grid";

import {convertNumber} from "@/Services/helper";
import ExpandedCell from "@/Components/ExpandedCell";

const Index = ({user = null, users = [],...props}) => {

    const columns = [
        {
            field: 'Description',
            headerName: 'عنوان',
            type: "string",
            width:800,
            renderCell:ExpandedCell
        },
        {
            field: 'BookingDate',
            headerName: 'تاریخ',
            type: "date",
            renderCell: ({row}) => (new Date(row.BookingDate)).toLocaleDateString("fa-IR")
        },
        {
            field: 'GLAmount',
            headerName: 'مبلغ',
            type: "number",
            p:"1em",
            renderCell: ({row}) => convertNumber(row.GLAmount)
        },
    ];

    const [userId, setUserId] = useState(user?.clientId);
    const [account, setAccount] = useState("");
    const [accounts, setAccounts] = useState(user?.accounts?.data ?? []);
    const [loading, setLoading] = useState(false);
    const [disabled,setDisabled]=useState(false);
    const [debtorLoading, setDebtorLoading] = useState(false);
    const [debtorDefaultValues, setDebtorDefaultValues] = useState({
        pageSize: 10,
        page: 0,
        sort: [{field: "date", sort: "asc"}]
    })
    useEffect(()=>{
        if(!props.auth.permissions.includes("Financial List All"))
            setDisabled(true);
    },[])
    const [creditorDefaultValues, setCreditorDefaultValues] = useState({
        pageSize: 10,
        filterModel: [],
        page: 0,
        sort: [{field: "date", sort: "asc"}]
    });
    const [creditorTransactions, setCreditorTransactions] = useState({
        data: [],
        meta: {
            total: 0,
            current_page: 0
        },
    });
    const [debtorTransactions, setDebtorTransactions] = useState({
        data: [],
        meta: {
            total: 0,
            current_page: 0
        },
    });
    const [creditorLoading, setCreditorLoading] = useState(false);
    const handleUserChange = async (e, v) => {
        setUserId(v);
        if (v)
            await getAccounts(v);
        setAccount(null);
    }
    const getAccounts = async (v) => {
        setLoading(true);
        let res = await axios.get(route("accounts.index", {userId: v.id}));
        setAccounts(res.data.data);
        setLoading(false);
    }

    const handleAccountChange = async (e) => {
        setLoading(true);
        getAccount(e.target.value).then(() => {
            setLoading(false);
            listCreditorTransactions(e.target.value);
            listDebtorTransactions(e.target.value);
        });
    }


    const getAccount = async (v) => {
        let res = await axios.get(route("accounts.show", v))
        setAccount(res.data.data);

    }

    const listDebtorTransactions = (account, options = debtorDefaultValues) => {
        let tmp = {...debtorDefaultValues, ...{...options, page: options.page ? options.page + 1 : 1}};
        setDebtorDefaultValues(prevState => ({
            ...prevState,
            ...options
        }));
        setDebtorLoading(true);
        axios.get(route("transactions.debtor", {...tmp, account, sort: tmp.sort[0]})).then(({data}) => {
            setDebtorTransactions(data);
            setDebtorLoading(false);
        });
    }
    const listCreditorTransactions = (account, options = creditorDefaultValues) => {
        setCreditorLoading(true);
        let tmp = {...creditorDefaultValues, ...{...options, page: options.page ? options.page + 1 : 1}};
        setCreditorDefaultValues(prevState => ({
            ...prevState,
            ...options
        }));
        axios.get(route("transactions.creditor", {...tmp, account, sort: tmp.sort[0]})).then(({data}) => {
            setCreditorTransactions(data);
            setCreditorLoading(false);
        });
    }

    return <>
        <Head title={"Balance "}/>
        <Grid container spacing={3}>
            <Grid item>
                <SelectSearch sx={{minWidth: "400px"}} onChange={handleUserChange} disabled={disabled}
                              label={"لطفا آزمایشگاه را انتخاب کنید"} name={"userId"}
                              value={userId} url={route("clientIndex")}/>
            </Grid>
            {accounts.length && userId ? <Grid item>
                <FormControl>
                    <InputLabel id={"account-label"}>لطفا حساب را انتخاب کنید</InputLabel>
                    <Select sx={{minWidth: "400px"}} defaultValue={account} variant={"outlined"}
                            label={"لطفا حساب را انتخاب کنید"}
                            labelId={"account-label"} onChange={handleAccountChange}>
                        {accounts.map((item, index) => <MenuItem key={index} value={item.id}>{item.Name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid> : null}
        </Grid>
        {account ? <Paper variant={"elevation"} elevation={10} sx={{p: "1em", mt: "2em", overflowX: "auto"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            تعداد فاکتورهای تسویه نشده
                        </TableCell>
                        <TableCell>
                            مبلغ کل فاکتور تسویه نشده
                        </TableCell>
                        <TableCell>
                            تعداد فروش تسویه نشده
                        </TableCell>
                        <TableCell>
                            مبلغ کل فروش تسویه نشده
                        </TableCell>
                        <TableCell>
                            تعداد چک برگشت خورده
                        </TableCell>
                        <TableCell>
                            مبلغ کل چک های برگشت خورده
                        </TableCell>
                        <TableCell>
                            جمع کل فاکتورها
                        </TableCell>
                        <TableCell>
                            مبلغ تسویه شده
                        </TableCell>
                        <TableCell>
                            مانده
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {convertNumber(account.UnSettledInvoiceCount)}
                        </TableCell>
                        <TableCell>
                            {convertNumber(account.UnSettledInvoiceTotalPrice)}
                        </TableCell>
                        <TableCell>
                            {convertNumber(account.UnSettledSaleRequestCount)}
                        </TableCell>
                        <TableCell>
                            {convertNumber(account.UnSettledSaleRequestTotalPrice)}
                        </TableCell>
                        <TableCell>
                            {convertNumber(account.RejectedChequesCount)}
                        </TableCell>
                        <TableCell>
                            {convertNumber(account.RejectedChequeTotalAmount)}
                        </TableCell>
                        <TableCell>
                            {convertNumber(account.DebitBalance)}
                        </TableCell>
                        <TableCell>
                            {convertNumber(account.CreditBalance)}
                        </TableCell>
                        <TableCell>
                            {convertNumber(account.Balance)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper> : null}
        <Backdrop open={loading} sx={{zIndex: "10000"}}>
            <CircularProgress color="inherit"/>
        </Backdrop>
        <Grid container sx={{mt: "2rem"}} spacing={2}>
            {account && <Grid item xs={12}>
                <DataGrid localeText={{
                    ...faIR.components.MuiDataGrid.defaultProps.localeText,
                    MuiTablePagination: {
                        ...faIR.components.MuiDataGrid.defaultProps.localeText.MuiTablePagination,
                        labelDisplayedRows: ({From, to, count}) => `تعداد کل سطر ها : ${count}`,

                    }
                }}
                          onSortModelChange={sort => listDebtorTransactions(account, {sort, page: 0})}
                          disableColumnFilter disableMultipleColumnsFiltering disableMultipleSelection
                          onPageChange={page => listDebtorTransactions(account, {page})}
                          onPageSizeChange={pageSize => listDebtorTransactions(account, {page: 0, pageSize})}
                          page={debtorTransactions.meta.current_page - 1}
                          disableMultipleColumnsSorting disableSelectionOnClick filterMode={"server"}
                          pageSize={debtorDefaultValues.pageSize}
                          hideFooterSelectedRowCount paginationMode={"serve"} rowCount={debtorTransactions.meta.total}
                          rowsPerPageOptions={[10, 20, 100]} sortingOrder={debtorDefaultValues.sort}
                          loading={debtorLoading}
                          sortingMode={"server"} columns={columns} rows={debtorTransactions.data} autoHeight/>
            </Grid>}
        </Grid>

    </>
}
Index.layout = (page) => <Authenticated breadcrumbs={[]} auth={page.props.auth} children={page}/>
export default Index;
