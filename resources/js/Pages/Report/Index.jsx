import React, {createRef, useEffect, useState} from "react";
import {Head} from '@inertiajs/inertia-react';
import ExportJsonExcel from "js-export-excel";
import {styled} from "@mui/material/styles";
import {
    CircularProgress, IconButton, Input,
    Paper as MuiPaper,
    Stack,
    Typography,
    Grid,
    Divider,
    Backdrop,
} from "@mui/material";
import {DataGrid, faIR} from "@mui/x-data-grid";
import {ArrowBackIos} from "@mui/icons-material";

import {convertNumber, persianNumber} from "@/Services/helper";


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SelectSearch from "@/Components/SelectSearch";
import ExpandedCell from "@/Components/ExpandedCell";

const style = {
    minHeight: "6em", display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
    cursor: "pointer"
};

const Paper = styled(MuiPaper)(style);

const columns = {
    test: [
        {
            field: "id",
            headerName: "ردیف",
            sortable: false,
            width: 70,
            align: "center",
            valueFormatter: ({value}) => persianNumber(value + 1),
        },
        {
            field: "MTestCode",
            headerName: "کد تست",
            sortable: false,
            width: 100,
            align: "center",
            valueFormatter: ({value}) => persianNumber(value),
            filter: true
        },
        {
            field: "MTestName",
            headerName: "نام تست",
            sortable: false,
            width: 250,
            filter: true
        },
        {
            field: "Quantity",
            headerName: "تعداد",
            valueFormatter: ({value}) => convertNumber(value * 1),
            sortable: false,
            width: 70,
            align: "center"
        },
        {
            field: "RAmount",
            headerName: "قیمت واحد",
            valueFormatter: ({value}) => convertNumber(value * 1),
            sortable: false,
            align: "right",
            width: 150,
        },
        {
            field: "Discount",
            headerName: "تخفیف",
            valueFormatter: ({value}) => convertNumber(value * 1),
            sortable: false,
            align: "right",
            width: 100
        },
        {
            field: "MAmount",
            headerName: "مبلغ",
            valueFormatter: ({value}) => convertNumber(value * 1),
            sortable: false,
            align: "right",
            width: 150,
        },
    ],
    patient: [
        {
            field: "id",
            headerName: "ردیف",
            sortable: false,
            width: 70,
            align: "center",
            valueFormatter: ({value}) => persianNumber(value + 1),
        },
        {
            field: "PatientCode",
            headerName: "پذیرش ارجاعی",
            sortable: false,
            filter: true,
            width: 150
        },
        {
            field: "PatientName",
            headerName: "نام بیمار",
            sortable: false,
            width: 250,
            filter: true
        },
        {
            field: "AcceptCode",
            headerName: "پذیرش کولایف",
            sortable: false,
            filter: true,
            width: 150
        },
        {
            field: "TestNames",
            headerName: "نام تست ها",
            sortable: false,
            width: 300,
            renderCell: ({value}) => <ExpandedCell value={value}/>
        },
        {
            field: "Quantity",
            headerName: "تعداد",
            valueFormatter: ({value}) => convertNumber(value * 1),
            sortable: false,
            width: 70,
            align: "center"
        },
        {
            field: "Discount",
            headerName: "تحفیف",
            valueFormatter: ({value}) => convertNumber(value * 1),
            sortable: false,
            align: "right",
            width: 100,
        },
        {
            field: "Amount",
            headerName: "مبلغ",
            valueFormatter: ({value}) => convertNumber(value * 1),
            sortable: false,
            align: "right",
            width: 150,
        },
    ]
}

function Index(props) {
    const [userId, setUserId] = useState();
    const [filterModel, setFilterModel] = useState({})
    const userIdInput = createRef();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [show, setShow] = useState(false);
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!props.auth.permissions.includes("Report All"))
            setUserId({id: props.auth.user.userId, name: props.auth.user.name});
    }, []);
    useEffect(() => {
        changeFiltered()
    }, [filterModel])
    const handleUserChange = (_, v) => {
        setUserId(v);
        setLoading(false);
        setItems([]);
        setShow(false);
    };
    const changeFiltered = () => {
        setLoading(true);
        setFilteredItems(items.filter(item => Object.keys(filterModel).map(key => (item[key] + "").toLowerCase().includes(filterModel[key].toLowerCase())).reduce((a, b) => a && b, true)));
        setLoading(false);
    }
    const handleClick = (t, u) => () => {
        setType(t);
        if (userId) {
            setLoading(true);
            axios.get(route("reports." + u, {userId: userId.id, type: t})).then((res) => {
                setLoading(false);
                setShow(true);
                setItems(res.data.map((item, index) => ({...item, id: index})));
                setFilteredItems(res.data.map((item, index) => ({...item, id: index})));
            });
        } else userIdInput.current.focus();
    };
    const handleBack = () => {
        setShow(false);
        setItems(false);
    }
    const handleFilterChanged = (e) => {
        setFilterModel(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const export2excel = () => {
        var option = {};

        option.fileName = "excel";
        let sheetHeader = columns[type].map(item => item.headerName);
        let fields = columns[type].map(item => item.field);
        let sheetData = items.map(item => {
            let tmp = {}
            fields.forEach(field => {
                if (item.hasOwnProperty(field)) {
                    if (item.hasOwnProperty("valueFormatter")) {
                        tmp[field] = item["valueFormatter"]({value: item[field]});

                    } else
                        tmp[field] = item[field];
                }
            })
            return tmp;
        });
        option.datas = [
            {
                sheetData,
                sheetHeader,
            },
        ];

        const toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
    return (
        <>
            <Head title="گزارشات"/>
            {props.auth.permissions.includes("Report All") ? <Grid container sx={{mb: "2em"}}>
                <Grid item>
                    <SelectSearch sx={{minWidth: "400px"}} onChange={handleUserChange} ref={userIdInput}
                                  label={"لطفا آزمایشگاه را انتخاب کنید"} name={"userId"}
                                  value={userId} url={route("clientIndex")}
                                  disabled={!props.auth.permissions.includes("Report All")}/>
                </Grid>
            </Grid> : null}
            <Divider sx={{mb: "1em"}}/>
            {!show ? <Grid container spacing={3} sx={{mt: "3em"}} justifyContent={"space-around"}>
                <Grid item xs={10} sm={4}>
                    <Typography variant={"h4"} sx={{mb: "1em"}} textAlign={"center"}> ریز تست ها</Typography>
                    <Stack spacing={3}>
                        <Paper variant={"outlined"} onClick={handleClick("test", "pastMonth")}>
                            <Typography textAlign={"center"} variant={"h5"}>{`${props.pastMonth} ماه`}</Typography>
                        </Paper>
                        <Paper variant={"outlined"} onClick={handleClick("test", "twoMonthAgo")}>
                            <Typography textAlign={"center"} variant={"h5"}>{`${props.twoMonthAgo} ماه`}</Typography>
                        </Paper>
                    </Stack>
                </Grid>
                <Grid item xs={10} sm={4}>
                    <Typography variant={"h4"} sx={{mb: "1em"}} textAlign={"center"}>ریز بیماران</Typography>
                    <Stack spacing={3}>
                        <Paper variant={"outlined"} onClick={handleClick("patient", "pastMonth")}>
                            <Typography textAlign={"center"} variant={"h5"}>{`${props.pastMonth} ماه`}</Typography>
                        </Paper>
                        <Paper variant={"outlined"} onClick={handleClick("patient", "twoMonthAgo")}>
                            <Typography textAlign={"center"} variant={"h5"}>{`${props.twoMonthAgo} ماه`}</Typography>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid> : <Grid container spacing={2}>
                <Grid item xs={12} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant={"h4"}>گزارش</Typography>
                        <IconButton onClick={export2excel}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px">
                                <path fill="#169154" d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"/>
                                <path fill="#18482a" d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"/>
                                <path fill="#0c8045" d="M14 15.003H29V24.005000000000003H14z"/>
                                <path fill="#17472a" d="M14 24.005H29V33.055H14z"/>
                                <g>
                                    <path fill="#29c27f" d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"/>
                                    <path fill="#27663f"
                                          d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"/>
                                    <path fill="#19ac65" d="M29 15.003H44V24.005000000000003H29z"/>
                                    <path fill="#129652" d="M29 24.005H44V33.055H29z"/>
                                </g>
                                <path fill="#0c7238"
                                      d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"/>
                                <path fill="#fff"
                                      d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"/>
                            </svg>
                        </IconButton>
                    </Stack>
                    <a style={{
                        textDecoration: "none",
                        color: "#585858",
                        "&:visit": {color: "#585858"},
                        cursor: "pointer",
                        marginTop: "auto"
                    }} title={"بازگشت"} onClick={handleBack}>
                        <ArrowBackIos/>
                    </a>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{mb: "1em"}}/>
                    <Stack spacing={2} direction={"row"}>
                        {columns[type].map((item, index) => item.hasOwnProperty("filter") ?
                            <Input key={index} name={item.field} placeholder={item.headerName}
                                   onChange={handleFilterChanged}/> : null)}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    {items.length ? <DataGrid rowHeight={50} autoHeight disableColumnFilter disableColumnMenu
                                              sx={{fontSize: "20px"}}
                                              disableSelectionOnClick
                                              localeText={{
                                                  ...faIR.components.MuiDataGrid.defaultProps.localeText,
                                                  MuiTablePagination: {
                                                      ...faIR.components.MuiDataGrid.defaultProps.localeText.MuiTablePagination,
                                                      labelDisplayedRows: ({
                                                                               From,
                                                                               to,
                                                                               count
                                                                           }) => `تعداد کل سطر ها : ${count}`,

                                                  }
                                              }} columns={columns[type]} rows={filteredItems}/> : null}
                </Grid>
            </Grid>}
            <Backdrop open={loading} sx={{zIndex: "10000"}}>
                <CircularProgress/>
            </Backdrop>
        </>
    );
}

Index.layout = page => <AuthenticatedLayout auth={page.props.auth} errors={page.props.errors} header={"گزارشات"}
                                            children={page} breadcrumbs={[{title: "گزارشات", link: "", icon: ""}]}/>

export default Index;
