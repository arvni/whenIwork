
import {useEffect, useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import {RemoveRedEye} from "@mui/icons-material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";
import q2o from "@/Services/querystringToObject";
import {convertDate, convertNumber, persianNumber} from "@/Services/helper";
import Filter from "./Components/Filter";

const breadCrumbs = [
    {
        title: "فاکتور ها",
        link: null,
        icon: null
    }
]

const Index = (props) => {
    const {invoices, status, errors} = props;
    const {processing, reset, get} = useForm();
    const [success, setSuccess] = useState(null);
    const [columns, setColumns] = useState([
        {
            field: 'InvoiceNumber',
            headerName: 'شماره فاکتور',
            type: "string",
            minWidth: 110,
            valueFormatter: ({value}) => persianNumber(value),
            align: "center",
            flex:.5
        },
        {
            field: 'InvoiceDate',
            headerName: 'تاریخ',
            type: "string",
            minWidth: 100,
            flex:.5,
            renderCell: ({row}) => convertDate(row.InvoiceDate)
        },
        {
            field: 'InvoicePrice',
            headerName: 'مبلغ',
            type: "email",
            align: "right",
            minWidth: 120,
            flex:.5,
            sortable: false,
            valueFormatter: ({value}) => convertNumber(value)
        },
        {
            field: 'InvoiceNetPrice',
            headerName: 'مبلغ خالص',
            type: "string",
            align: "right",
            minWidth: 120,
            flex:.5,
            sortable: false,
            valueFormatter: ({value}) => convertNumber(value)
        },
        {
            field: 'InvoiceSalesType',
            headerName: 'نوع',
            type: "string",
            sortable: false,
            minWidth: 150,
            flex: .5
        },
        {
            field: 'id',
            headerName: '#',
            minWidth: 70,
            flex:.2,
            sortable: false,
            renderCell: (params) => <a title="نمایش" href={route("invoices.show", params.row.id)} target={"_blank"}
                                       style={{textDecoration: "none"}}><RemoveRedEye/></a>
        },
    ]);
    const [defaultValues, setDefaultValues] = useState({
        sort: {field: 'id', sort: "desc"},
        filterModel: {search: "", role: ""},
        page: 0,
        pageSize: 10
    });
    useEffect(() => {
        reset();
        const model = q2o();
        setDefaultValues(prevState => ({...prevState, ...model}));
        let col = {field: 'InvoiceCustomerName', headerName: 'نام مشتری', type: "string", minWidth: 300,flex:.8}
        if (props.auth?.permissions?.includes("Invoice List All") && !columns?.includes(col))
            setColumns(prevState => ([col, ...prevState]));
    }, []);
    useEffect(() => {
        if (props.success) {
            setSuccess(true);
        }
    }, [props.success]);
    const pageReload = (page, filter, sort, pageSize) => {
        let filterValues = {};
        if (page)
            filterValues.page = page;
        if (filter) {
            if (filter.hasOwnProperty("search"))
                filterValues.filterModel = {search: filter.search}
            if (filter.hasOwnProperty("role") && filter.role)
                filterValues.filterModel = {...(filterValues.filter ? filterValues.filter : {}), role: {...filter.role}}
        }
        if (sort)
            filterValues.sort = sort;
        if (pageSize)
            filterValues.pageSize = pageSize;
        setDefaultValues(prevState => ({...prevState, ...filterValues}));
        get(route('invoices.index',filterValues), {
            only: ["invoices", "status"]
        });
    }
    return (
        <TableLayout defaultValues={defaultValues} loading={processing} success={success} status={status}
                     errors={errors} data={invoices} only={["invoices"]} Filter={Filter}
                     url={"/invoices"} columns={columns} processing={processing} reload={pageReload}>
        </TableLayout>
    );
}

Index.layout = page => <AuthenticatedLayout auth={page.props.auth} children={page}
                                            breadcrumbs={breadCrumbs}/>

export default Index;
