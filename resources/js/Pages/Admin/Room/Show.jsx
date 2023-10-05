import {useState} from "react";
import {useForm, usePage} from "@inertiajs/inertia-react";
import {
    Alert,
    Backdrop,
    CircularProgress,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import q2o from "@/Services/querystringToObject";
import DayShiftsContainer from "@/Pages/Admin/Room/Components/DayShiftsContainer";
import ShiftForm from "@/Pages/Admin/Room/Components/ShiftForm";
import {prepareCurrentTimeInString} from "@/Services/helper";
import {fetchData} from "@/Services/fetchData";
import DeleteForm from "@/Components/DeleteForm";
import {Inertia} from "@inertiajs/inertia";
import DatePickerRange from "@/Components/DateRangePicker";
import AdminLayout from "@/Layouts/AdminLayout";
import PublishForm from "@/Pages/Admin/Room/Components/PublishForm";
import ConfirmForm from "@/Components/ConfirmForm";


const Show = () => {
    const {room, week, countShifts, futureWeek} = usePage().props;
    const [expanded, setExpanded] = useState(week.days.find(day => day.today)?.date)
    const {data, setData, post, processing, errors, setError, clearErrors, reset} = useForm({
        room: {
            id: room.id,
            name: room.name
        },
        date: expanded,
        started_at: prepareCurrentTimeInString(),
        ended_at: prepareCurrentTimeInString(8),
        type: "normal",
        noUsers: 1,
        related: "",
        description: ""
    });
    const [waiting, setWaiting] = useState(false);
    const [openDeleteShift, setOpenDeleteShift] = useState(false);
    const [addShiftOpen, setAddShiftOpen] = useState(false);
    const [openConfirmDuplicate, setOpenConfirmDuplicate] = useState(false);
    const [publishShiftOpen, setPublishShiftOpen] = useState(false);
    const [filters, setFilters] = useState({date: week["date"], ...q2o()});

    const reloadPage = (v) => Inertia.visit(route("admin.rooms.show", room.id), {
        data: {date: v},
        only: ["week", "countShifts", "futureWeek"],
        preserveState: true
    });

    const handleDateChange = (name, value) => {
        setFilters({[name]: value});
        reloadPage(value);
    }
    const handleSubmit = () => {
        post(data.id ? route('admin.shifts.update', data.id) : route('admin.shifts.store'), {
            onSuccess: closeAddShiftForm
        });
    }
    const handleDayChange = (date) => () => {
        setExpanded(date);
        setData(prevState => ({...prevState, date}));
    }
    const handleAddShift = () => {
        setAddShiftOpen(true);
    }
    const closeAddShiftForm = () => {
        setAddShiftOpen(false);
        resetData();
    }
    const handleShow = (id) => e => {
        e.preventDefault();
        Inertia.visit(route("admin.shifts.show", id));

    }

    const handlePublish = (id) => () => {
        setData({id});
        setPublishShiftOpen(true);
    }
    const handlePublishShiftClose = () => {
        setPublishShiftOpen(false);
        reset();
    }
    const publish = () => {
        post(route("admin.shifts.publish", data.id), {
            onSuccess: handlePublishShiftClose
        });
    }
    const handleEdit = (id) => () => {
        setWaiting(true);
        fetchData(route("admin.shiftApi.show", id))
            .then((res) => {
                setData({
                    ...res.data,
                    _method: "put"
                });
                console.log(data);
                setAddShiftOpen(true);
            })
            .finally(() => {
                setWaiting(false);
            });
    }
    const handleDelete = (id) => () => {
        setData({id, _method: "delete"});
        setOpenDeleteShift(true);
    }
    const handleCloseDeleteForm = () => {
        setOpenDeleteShift(false);
        resetData();
    }
    const deleteShift = () => {
        post(route("admin.shifts.destroy", data.id), {
            onSuccess: () => {
                setOpenDeleteShift(false);
                resetData();
            }
        });
    }
    const resetData = () => setData({
        room: {
            id: room.id,
            name: room.name
        },
        date: expanded,
        started_at: prepareCurrentTimeInString(),
        ended_at: prepareCurrentTimeInString(8),
        type: "normal",
        noUsers: 1,
        related: "",
        description: ""
    });

    const handleDuplicate = (e) => {
        e.preventDefault();
        setOpenConfirmDuplicate(true)
        setData({
            room: {
                id: room.id,
                name: room.name
            },
            date: filters.date
        });
    }
    const confirmDuplicate = () => {
        post(route("admin.rooms.shifts_duplicate", data.room.id), {
            onSuccess: closeConfirmForm
        });
    }
    const closeConfirmForm = () => {
        setOpenConfirmDuplicate(false);
        resetData()
    }

    return (
        <>
            <Stack width={"100%"}
                   direction={"row"}
                   justifyContent={"space-evenly"}
                   flexWrap={"wrap"}
                   spacing={2}
            >
                <Typography
                    variant={"h1"}
                    fontSize={"xxx-large"}
                >{room.name}</Typography>
                <DatePickerRange weekPicker onChange={handleDateChange} value={filters?.date} name={"date"}/>
            </Stack>
            {!countShifts && futureWeek &&
            <Alert>برای تکرار شیفت های هفته گذشته <a href="#" onClick={handleDuplicate}>اینجا</a> را کلیک کنید </Alert>}
            <Divider sx={{marginBottom: "1em"}}/>
            {week.days.map(day => <DayShiftsContainer onDelete={handleDelete}
                                                      onEdit={handleEdit}
                                                      onShow={handleShow}
                                                      key={day.date}
                                                      day={day}
                                                      expanded={expanded === day.date}
                                                      onChange={handleDayChange}
                                                      onAddClick={handleAddShift}
                                                      onPublish={handlePublish}/>)}
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                      open={waiting}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <ShiftForm
                values={data}
                open={addShiftOpen}
                errors={errors}
                setValues={setData}
                loading={processing}
                setError={setError}
                submit={handleSubmit}
                cancel={closeAddShiftForm}
                clearErrors={clearErrors}
                title={data.id ? "ویرایش شیفت" : "افزودن شیفت"}
            />
            <DeleteForm title={data.date} openDelete={openDeleteShift && !processing} disAgreeCB={handleCloseDeleteForm}
                        agreeCB={deleteShift}/>
            <PublishForm open={publishShiftOpen} onAgree={publish} onClose={handlePublishShiftClose}/>
            <ConfirmForm open={openConfirmDuplicate} onClose={closeConfirmForm} onConfirm={confirmDuplicate}
                         title="آیا میخواهید شیفت های این هفته را تکرار کنید ؟"/>
        </>
    );
}
const breadCrumbs = [
    {
        title: "بخش ها",
        link: route("admin.rooms.index"),
        icon: null
    }
]
Show.layout = page => <AdminLayout auth={page.props.auth} children={page} breadcrumbs={[...breadCrumbs, {
    title: page.props.room.name,
    link: null,
    icon: null
}]}/>

export default Show;

