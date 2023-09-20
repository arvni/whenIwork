import{a as o,u as _,r as v,j as S,H as q,d as x}from"./app-31845fc9.js";import{T as y}from"./TableLayout-8fc7ac53.js";import I from"./Filter-7ca9e228.js";import N from"./ClientRequest-64e199a0.js";import{b as R}from"./Index-fd45cdb5.js";import{a as k}from"./helper-9f361b88.js";import{C as D}from"./ClientLayout-f7ba10cd.js";import{A as z}from"./AssignmentTurnedIn-6aeb83eb.js";import{c as A}from"./createSvgIcon-967baeee.js";import{G as c}from"./GridActionsCellItem-823df0d3.js";import"./jsx-runtime_commonjs-proxy-87c57ac6.js";import"./styled-452014fd.js";import"./Paper-13596fd8.js";import"./generateUtilityClasses-246f0c68.js";import"./isMuiElement-d686a30e.js";import"./useId-4eaa092f.js";import"./useControlled-f1fd1053.js";import"./ButtonBase-251486ab.js";import"./EditCalendar-ce4e6383.js";import"./Collapse-1498333f.js";import"./useTheme-83e926c1.js";import"./Copyright-82f3dbfd.js";import"./TextField-c5f8301a.js";import"./Popover-f8f05ac7.js";import"./Modal-dc55508e.js";import"./Typography-09de9fb4.js";import"./extendSxProp-bdf79a15.js";import"./Box-f9329651.js";import"./IconButton-c8b2faca.js";import"./CircularProgress-4c9bf60e.js";import"./MenuItem-e2f390c4.js";import"./dividerClasses-53ccbfb7.js";import"./usePreviousProps-4059d3b5.js";import"./Divider-1d326ae0.js";import"./dialogTitleClasses-0b6ace63.js";import"./DialogTitle-7eaf66ba.js";import"./DialogContent-0d6f9b12.js";import"./Grid-1be5418d.js";import"./DialogActions-db02471f.js";import"./Stack-a8507552.js";import"./styled-b1cc65eb.js";import"./Button-49bbfe71.js";import"./Container-5926e184.js";import"./TableHead-15ff716c.js";import"./TableRow-762d7ea3.js";import"./KeyboardArrowRight-a4ab0481.js";import"./FilterAlt-8cfd6068.js";import"./SelectSearch-6e46e2e8.js";import"./Popper-643da6c9.js";import"./createPopper-3cf4315c.js";import"./Tabs-deec7e13.js";import"./AccordionSummary-51e3c711.js";import"./ShiftInfo-d418a0b8.js";import"./TakeLeaveForm-1fdc5ed6.js";import"./TimeRangePicker-dfc9b084.js";import"./DateRangePicker-4bd680ff.js";import"./PersianDatepicker-1a58b2b6.js";import"./DesktopDatePicker-68debe68.js";import"./removeClass-9a525042.js";import"./Filter-58c44d75.js";import"./ConfirmForm-b12f2423.js";import"./RejectForm-7a4c99ff.js";import"./CancelRequest-329fa562.js";import"./DialogContentText-fbc6324e.js";import"./Edit-f22cb257.js";const L=A(o("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.06 17v-2.01H12c-1.28 0-2.56-.49-3.54-1.46-1.71-1.71-1.92-4.35-.64-6.29l1.1 1.1c-.71 1.33-.53 3.01.59 4.13.7.7 1.62 1.03 2.54 1.01v-2.14l2.83 2.83L12.06 19zm4.11-4.24-1.1-1.1c.71-1.33.53-3.01-.59-4.13C13.79 8.84 12.9 8.5 12 8.5h-.06v2.15L9.11 7.83 11.94 5v2.02c1.3-.02 2.61.45 3.6 1.45 1.7 1.7 1.91 4.35.63 6.29z"}),"ChangeCircle"),T=({shifts:i,defaultValues:r})=>{const{post:d,processing:u,data:h,setData:m,reset:f}=_({}),[C,s]=v.useState(!1),p=(t,e,n,b)=>{x.Inertia.visit(route("client.shifts.index"),{data:{filters:e,sort:n,pageSize:b,page:t},only:["shifts","defaultValues"],preserveState:!0})},w=[{field:"rooms.name",headerName:"بخش",renderCell:({row:t})=>t.room.name,sortable:!1},{field:"date",headerName:"تاریخ",renderCell:({value:t})=>k(t)},{field:"started_at",headerName:"ساعت شروع"},{field:"ended_at",headerName:"ساعت پایان"},{field:"noUsers",headerName:"تعداد نفرات"},{field:"id",headerName:"#",type:"action",sortable:!1,textAlign:"center",renderCell:t=>{let e=[];return new Date(t.row.started_at_dateTime)>new Date&&(t.row.type==="open"&&!t.row.client_requests_count&&t.row.noUsers>=t.row.works_count&&e.push(o(c,{icon:o(z,{color:"info"}),label:"درخواست شیفت",onClick:l(t.row,"shift")},`shift-${t.row.id}`)),t.row.works_count&&!t.row.client_requests_count&&e.push(o(c,{icon:o(L,{color:"warning"}),label:"تغییر شیفت",onClick:l(t.row,"changeUser")},`change-${t.row.id}`))),e}}],g=(t,e)=>{m(n=>({...n,[t]:e}))},a=()=>{f(),s(!1)},l=(t,e)=>()=>{m({requestable:t,type:e}),s(!0)};return S(y,{loading:u,ExpandedComponent:R,expandedKey:"client_requests",columns:w,data:i,reload:p,defaultValues:r,Filter:I,children:[o(q,{title:"شیفت ها"}),o(N,{onSubmit:t=>{t.preventDefault(),d(route("client.clientRequests.store"),{onSuccess:()=>{a(),p(r.page,r.filters,r.sort,r.pageSize)},preserveState:!0})},onChange:g,clientRequest:h,open:C,onClose:a})]})},j=[{title:"شیفت ها",link:"",icon:""}];T.layout=i=>o(D,{breadcrumbs:j,children:i,auth:i.props.auth});export{T as default};
