import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Head, useForm} from "@inertiajs/inertia-react";

import {GridActionsCellItem} from "@mui/x-data-grid";
import {AssignmentTurnedIn as AssignmentTurnedInIcon, ChangeCircle as ChangeCircleIcon} from "@mui/icons-material";

import TableLayout from "@/Layouts/TableLayout";
import Filter from "./Components/Filter";
import ClientRequest from "./Components/ClientRequest";
import ExpandedComponent from "./Components/ExpandedComponent";


import {convertDate} from "@/Services/helper";
import ClientLayout from "@/Layouts/ClientLayout";


const Index = ({shifts, defaultValues}) => {
    const {post, processing, data, setData, reset} = useForm({});
    const [open, setOpen] = useState(false);
    const pageReload = (page, filters, sort, pageSize) => Inertia.visit(route("client.shifts.index"), {
            data: {
                filters,
                sort,
                pageSize,
                page
            },
            only: ["shifts", "defaultValues"],
            preserveState: true
        });
    const columns = [
        {
            field: 'rooms.name',
            headerName: 'بخش',
            renderCell: ({row}) => row.room.name,
            sortable: false,
        },
        {
            field: 'date',
            headerName: 'تاریخ',
            renderCell: ({value}) => convertDate(value)
        },
        {
            field: 'started_at',
            headerName: 'ساعت شروع',
        },
        {
            field: 'ended_at',
            headerName: 'ساعت پایان',
        },
        {
            field: 'noUsers',
            headerName: 'تعداد نفرات',
        },
        {
            field: 'id',
            headerName: '#',
            type: "action",
            sortable: false,
            textAlign: "center",
            renderCell: (params) => {
                let cols = []
                if (new Date(params.row.started_at_dateTime) > new Date()) {
                    if (params.row.type === "open")
                        !params.row.client_requests_count && params.row.noUsers >= params.row.works_count && cols.push(
                            <GridActionsCellItem key={`shift-${params.row.id}`}
                                                 icon={<AssignmentTurnedInIcon color={"info"}/>} label="درخواست شیفت"
                                                 onClick={handleOpenRequest(params.row, "shift")}/>
                        );
                    else
                        !params.row.client_requests_count && cols.push(<GridActionsCellItem
                            key={`change-${params.row.id}`}
                            icon={<ChangeCircleIcon color={"warning"}/>} label="تغییر شیفت"
                            onClick={handleOpenRequest(params.row, "changeUser")}/>)
                }
                return cols;
            }
        },
    ];

    const handleChange = (key, value) => {
        setData(previousData => ({...previousData, [key]: value}));
    }
    const handleCloseRequest = () => {
        reset();
        setOpen(false);
    }
    const handleOpenRequest = (params, type) => () => {
        setData({requestable: params, type});
        setOpen(true);
    }
    const handleSubmit = () => post(route("client.clientRequests.store"), {onSuccess: handleCloseRequest});

    return <TableLayout loading={processing} reload={pageReload} defaultValues={defaultValues} data={shifts}
                        columns={columns} Filter={Filter} ExpandedComponent={ExpandedComponent}
                        expandedKey={"client_requests"}>
        <Head title={"شیفت ها"}/>
        <ClientRequest onSubmit={handleSubmit} onChange={handleChange} clientRequest={data} open={open}
                       onClose={handleCloseRequest}/>
    </TableLayout>;
}

const breadcrumbs = [
    {
        title: "شیفت ها",
        link: "",
        icon: ""
    }
];

Index.layout = (page) => <ClientLayout breadcrumbs={breadcrumbs} children={page} auth={page.props.auth}/>

export default Index;
