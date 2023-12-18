import {Head} from "@inertiajs/inertia-react";

import {GridActionsCellItem} from "@mui/x-data-grid";

import TableLayout from "@/Layouts/TableLayout";


import Filter from "./Components/Filter";
import {Inertia} from "@inertiajs/inertia";
import AdminLayout from "@/Layouts/AdminLayout";
import {RemoveRedEye} from "@mui/icons-material";


const MapViewIndex = ({departments, defaultValues}) => {
    const columns = [
        {
            field: 'name',
            headerName: 'عنوان',
            type: "string",
        },
        {
            field: 'id',
            headerName: '#',
            type: 'actions',
            sortable: false,
            renderCell: (params) => <GridActionsCellItem key={"show-map-view-"+params.value}
                                         icon={<RemoveRedEye color="success"/>}
                                         label="نمای کلی"
                                         title="نمای کلی"
                                         href={route("admin.departments.map", params.row.id)}
                                         onClick={showDepartment(route("admin.departments.map", params.row.id))}
                    />
        }
    ];
    const showDepartment = (route) => (e) => {
        e.preventDefault();
        Inertia.visit(route);
    }
    const pageReload = (page, filters, sort, pageSize) => Inertia.visit(route('admin.departments.mapviewList'), {
        only: ["departments", "status", "defaultValues"],
        data: {page, filters, sort, pageSize},
        preserveState: true
    });

    return (
        <>
            <Head title={"لیست دپارتمان ها"}/>
            <TableLayout defaultValues={defaultValues} reload={pageReload}
                         columns={columns} data={departments} Filter={Filter} />
        </>);
}
const breadCrumbs = [
    {
        title: "دپارتمان ها",
        link: null,
        icon: null
    }
]
MapViewIndex.layout = page => <AdminLayout auth={page.props.auth} children={page} breadcrumbs={breadCrumbs}/>

export default MapViewIndex;
