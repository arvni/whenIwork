import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Head, useForm} from "@inertiajs/inertia-react";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {
    Cancel as CancelIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon,
    ChangeCircle as ChangeCircleIcon
} from "@mui/icons-material";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import TableLayout from "@/Layouts/TableLayout";
import Filter from "./Components/Filter";
import ClientRequest from "./Components/ClientRequest";
import ExpandedComponent from "@/Pages/Shift/Components/ExpandedComponent";


const Index = ({shifts, defaultValues}) => {
    const {post, processing, data, setData, reset} = useForm({});
    const pageReload = (page, filterModel, sort, pageSize) => {
        Inertia.visit(route("client.shifts.index"), {
            data: {
                filterModel,
                sort,
                pageSize,
                page
            },
            only: ["shifts", "defaultValues"],
            preserveState: true
        })
    };
    const [open, setOpen] = useState(false);
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
                if (params.row.type === "open")
                    cols.push(!params.row.client_requests_count ?
                        <GridActionsCellItem key={`shift-${params.row.id}`}
                                             icon={<AssignmentTurnedInIcon color={"info"}/>} label="درخواست شیفت"
                                             onClick={handleOpenRequest(params.row, "shift")}/> :
                        <GridActionsCellItem key={`delete-${params.row.id}`} icon={<CancelIcon color={"red"}/>}
                                             label="کنسل کردن درخواست"/>
                    );
                else
                    cols.push(<GridActionsCellItem key={`change-${params.row.id}`}
                                                   icon={<ChangeCircleIcon color={"warning"}/>} label="تغییر شیفت"
                                                   onClick={handleOpenRequest(params.row, "changeUser")}/>)
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
        setData({shift: params, type});
        setOpen(true);
    }
    const handleSubmit = () => post(route("clientRequests.store"), {onSuccess: handleCloseRequest});
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

Index.layout = (page) => <Authenticated breadcrumbs={breadcrumbs} children={page} auth={page.props.auth}/>

export default Index;
