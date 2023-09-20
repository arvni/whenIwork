import{b as $,u as B,r as a,j as b,F as G,a as t,H,d as g}from"./app-31845fc9.js";import{T as O}from"./TableLayout-8fc7ac53.js";import{D as P}from"./DeleteForm-e6091654.js";import q from"./Filter-7a041ca5.js";import z from"./Form-6c9698ff.js";import{f as J}from"./fetchData-54372226.js";import{L as K}from"./EditCalendar-ce4e6383.js";import{A as M}from"./AdminLayout-f5325d48.js";import{R as Q}from"./RemoveRedEye-f421d368.js";import{E as U,D as W}from"./Edit-f22cb257.js";import{G as p}from"./GridActionsCellItem-823df0d3.js";import"./jsx-runtime_commonjs-proxy-87c57ac6.js";import"./createSvgIcon-967baeee.js";import"./styled-452014fd.js";import"./generateUtilityClasses-246f0c68.js";import"./Paper-13596fd8.js";import"./isMuiElement-d686a30e.js";import"./useId-4eaa092f.js";import"./useControlled-f1fd1053.js";import"./ButtonBase-251486ab.js";import"./helper-9f361b88.js";import"./Container-5926e184.js";import"./styled-b1cc65eb.js";import"./TableHead-15ff716c.js";import"./TableRow-762d7ea3.js";import"./Typography-09de9fb4.js";import"./extendSxProp-bdf79a15.js";import"./KeyboardArrowRight-a4ab0481.js";import"./useTheme-83e926c1.js";import"./IconButton-c8b2faca.js";import"./TextField-c5f8301a.js";import"./Popover-f8f05ac7.js";import"./Modal-dc55508e.js";import"./MenuItem-e2f390c4.js";import"./dividerClasses-53ccbfb7.js";import"./Collapse-1498333f.js";import"./dialogTitleClasses-0b6ace63.js";import"./Popper-643da6c9.js";import"./createPopper-3cf4315c.js";import"./Box-f9329651.js";import"./DialogTitle-7eaf66ba.js";import"./DialogContent-0d6f9b12.js";import"./DialogContentText-fbc6324e.js";import"./DialogActions-db02471f.js";import"./Button-49bbfe71.js";import"./FilterAlt-8cfd6068.js";import"./AccordionSummary-51e3c711.js";import"./Grid-1be5418d.js";import"./SelectSearch-6e46e2e8.js";import"./usePreviousProps-4059d3b5.js";import"./CircularProgress-4c9bf60e.js";import"./Copyright-82f3dbfd.js";import"./Divider-1d326ae0.js";import"./Stack-a8507552.js";const X=()=>{const{department:o,status:C,errors:c,defaultValues:D}=$().props,{post:n,data:s,setData:i,reset:l,processing:u}=B(),F=[{field:"name",headerName:"عنوان",type:"string"},{field:"id",headerName:"#",type:"actions",sortable:!1,renderCell:e=>{let r=[t(p,{icon:t(Q,{color:"info"}),label:"نمایش",onClick:N(e.row.id),href:route("admin.rooms.show",[e.row.id])}),t(p,{icon:t(U,{color:"warning"}),label:"بروزرسانی",onClick:k(e.row.id)})];return e.row.shifts_count<1&&r.push(t(p,{icon:t(W,{color:"error"}),label:"حذف",onClick:E(e.row)})),r}}],[y,f]=a.useState(null),[S,d]=a.useState(!1),[A,m]=a.useState(!1),[R,h]=a.useState(!1),w=()=>{l(),m(!1),d(!1),f(!0),setTimeout(()=>f(null),2e3)},k=e=>()=>{h(!0),J(route("admin.roomApi.show",e)).then(r=>{i({...r,_method:"put"})}).catch(r=>{console.error(r)}).finally(()=>{m(!0),h(!1)})},v=()=>{i({name:"",department:{name:o.name,id:o.id},managers:[]}),m(!0)},x=()=>s.id?n(route("admin.rooms.update",s.id)):n(route("admin.rooms.store"),{onSuccess:w}),I=()=>{m(!1),l()},N=e=>()=>g.Inertia.visit(route("admin.rooms.show",e)),L=(e,r,V,_)=>g.Inertia.visit(route("admin.departments.show",o.id),{data:{page:e,filterModel:r,sort:V,pageSize:_},only:["departments","status","defaultValues"],preserveState:!0}),E=e=>()=>{i({...e,_method:"delete"}),d(!0)},T=()=>{d(!1),l()},j=()=>n(route("admin.rooms.destroy",s.id),{preserveState:!0,onSuccess:w});return b(G,{children:[t(H,{title:`دپارتمان ${o.name}`}),b(O,{defaultValues:D,success:y,status:C,reload:L,columns:F,data:o.rooms,loading:u,Filter:q,addNew:!0,addNewTitle:"افزودن بخش",onClickAddNew:v,errors:c,children:[t(P,{title:`${o==null?void 0:o.name} اتاق`,agreeCB:j,disAgreeCB:T,openDelete:S}),t(z,{values:s,errors:c,setValues:i,loading:u,submit:x,cancel:I,open:A,disabledDepartment:!0})]}),t(K,{open:R})]})},Y=[{title:"دپارتمان ها",link:route("admin.departments.index"),icon:null}];X.layout=o=>t(M,{auth:o.props.auth,children:o,breadcrumbs:[...Y,{title:`دپارتمان ${o.props.department.name}`,link:null,icon:null}]});export{X as default};
