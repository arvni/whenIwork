import{u as E,r as l,j as I,F as j,a as t,H as L,d as R}from"./app-f429c5d1.js";import{T}from"./TableLayout-4cb80c1a.js";import D from"./Filter-1498a36f.js";import G from"./Form-acf5c8dc.js";import{A as H}from"./AdminLayout-761c8cdb.js";import{f as V}from"./fetchData-54372226.js";import{R as _}from"./RemoveRedEye-17674ed1.js";import{E as O}from"./Edit-71d108b1.js";import{G as c}from"./GridActionsCellItem-28918dc7.js";import"./jsx-runtime_commonjs-proxy-f691489f.js";import"./createSvgIcon-539e1997.js";import"./styled-1ab0f523.js";import"./generateUtilityClasses-4cd05fbe.js";import"./Paper-1ada21ca.js";import"./isMuiElement-e45fcb63.js";import"./useId-802135e4.js";import"./useControlled-1f6928c6.js";import"./ButtonBase-c8dbbad4.js";import"./EditCalendar-314a4c39.js";import"./Collapse-e72a8ee6.js";import"./useTheme-bdf5e9b8.js";import"./Copyright-2691578d.js";import"./TextField-980a54da.js";import"./Popover-e6fdd7be.js";import"./Modal-c33185a4.js";import"./Typography-cd01d11e.js";import"./extendSxProp-cd2562c9.js";import"./Box-b481ad4a.js";import"./IconButton-9ba9fc36.js";import"./CircularProgress-d71a0503.js";import"./MenuItem-1cc40d63.js";import"./dividerClasses-5c2922b8.js";import"./usePreviousProps-e928c92e.js";import"./Divider-5aebe879.js";import"./dialogTitleClasses-a4347e9a.js";import"./DialogTitle-b0e8db21.js";import"./DialogContent-dec291f9.js";import"./Grid-417d5d0a.js";import"./DialogActions-26af375b.js";import"./Stack-33d46199.js";import"./styled-b28ad42f.js";import"./Button-ef7b4777.js";import"./Container-1648660f.js";import"./helper-9f361b88.js";import"./TableHead-f77037e2.js";import"./TableRow-dfec8f3e.js";import"./KeyboardArrowRight-1286ad8c.js";import"./FilterAlt-893696d6.js";import"./SelectSearch-90ef96fb.js";import"./Popper-f24e331f.js";import"./createPopper-3cf4315c.js";import"./AccordionSummary-d37ffc77.js";const q=[{title:"بخش ها",link:null,icon:null}],z=({rooms:e,status:u,success:f,defaultValues:h})=>{const{data:i,setData:s,post:w,processing:m,reset:b,errors:n,get:y}=E({name:"",department:null}),[g,a]=l.useState(!1),[B,p]=l.useState(!1),A=[{field:"name",headerName:"نام",type:"string",width:250},{field:"department_name",headerName:"دپارتمان",type:"string",width:150},{field:"id",headerName:"#",type:"actions",width:100,sortable:!1,renderCell:o=>[t(c,{icon:t(_,{color:"info"}),label:"نمایش",onClick:F(o.row.id),href:route("admin.rooms.show",[o.row.id])}),t(c,{icon:t(O,{color:"warning"}),label:"بروزرسانی",onClick:C(o.row.id)})]}],C=o=>()=>{p(!0),V(route("admin.roomApi.show",o)).then(r=>{s({...r,_method:"put"})}).catch(r=>{console.error(r)}).finally(()=>{a(!0),p(!1)})},F=o=>()=>y(route("admin.rooms.show",o)),N=(o,r,k,v)=>{R.Inertia.visit(route("admin.rooms.index"),{data:{page:o,filters:r,sort:k,pageSize:v},preserveState:!0,only:["rooms","defaultValues"]})},x=()=>{a(!0)},S=()=>{w(i.id?route("admin.rooms.update",i.id):route("admin.rooms.store"),{onSuccess:d})},d=()=>{b(),a(!1)};return I(j,{children:[t(L,{title:"لیست بخش ها"}),t(T,{defaultValues:h,addNew:!0,onClickAddNew:x,addNewTitle:"افزودن کاربر",loading:m,success:f,status:u,errors:n,data:e,only:["rooms"],Filter:D,columns:A,processing:m,reload:N,children:t(G,{values:i,errors:n,setValues:s,loading:m,submit:S,cancel:d,open:g})})]})};z.layout=e=>t(H,{auth:e.props.auth,children:e,breadcrumbs:q});export{z as default};