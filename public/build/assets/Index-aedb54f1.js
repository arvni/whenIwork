import{u as j,r as n,j as f,F as O,a as e,H as T,d as h}from"./app-31845fc9.js";import{T as B}from"./TableLayout-8fc7ac53.js";import{D as G}from"./DeleteForm-e6091654.js";import H from"./Filter-7a041ca5.js";import L from"./AddForm-c331fab6.js";import{A as V}from"./AdminLayout-f5325d48.js";import{G as p}from"./GridActionsCellItem-823df0d3.js";import{R as $}from"./RemoveRedEye-f421d368.js";import{E as q,D as z}from"./Edit-f22cb257.js";import"./jsx-runtime_commonjs-proxy-87c57ac6.js";import"./createSvgIcon-967baeee.js";import"./styled-452014fd.js";import"./generateUtilityClasses-246f0c68.js";import"./Paper-13596fd8.js";import"./isMuiElement-d686a30e.js";import"./useId-4eaa092f.js";import"./useControlled-f1fd1053.js";import"./ButtonBase-251486ab.js";import"./EditCalendar-ce4e6383.js";import"./Collapse-1498333f.js";import"./useTheme-83e926c1.js";import"./Copyright-82f3dbfd.js";import"./TextField-c5f8301a.js";import"./Popover-f8f05ac7.js";import"./Modal-dc55508e.js";import"./Typography-09de9fb4.js";import"./extendSxProp-bdf79a15.js";import"./Box-f9329651.js";import"./IconButton-c8b2faca.js";import"./CircularProgress-4c9bf60e.js";import"./MenuItem-e2f390c4.js";import"./dividerClasses-53ccbfb7.js";import"./usePreviousProps-4059d3b5.js";import"./Divider-1d326ae0.js";import"./dialogTitleClasses-0b6ace63.js";import"./DialogTitle-7eaf66ba.js";import"./DialogContent-0d6f9b12.js";import"./Grid-1be5418d.js";import"./DialogActions-db02471f.js";import"./Stack-a8507552.js";import"./styled-b1cc65eb.js";import"./Button-49bbfe71.js";import"./Container-5926e184.js";import"./helper-9f361b88.js";import"./TableHead-15ff716c.js";import"./TableRow-762d7ea3.js";import"./KeyboardArrowRight-a4ab0481.js";import"./Popper-643da6c9.js";import"./createPopper-3cf4315c.js";import"./DialogContentText-fbc6324e.js";import"./FilterAlt-8cfd6068.js";import"./AccordionSummary-51e3c711.js";import"./Switch-f8d55f52.js";const J=({departments:i,status:w,errors:D,defaultValues:y,success:F})=>{const{post:d,setData:s,data:o,reset:a,processing:l}=j({name:"",description:"",isActive:!0}),b=[{field:"name",headerName:"عنوان",type:"string"},{field:"rooms_count",headerName:"تعداد بخش ها",type:"string"},{field:"id",headerName:"#",type:"actions",sortable:!1,renderCell:t=>{let r=[e(p,{icon:e($,{color:"info"}),label:"نمایش",onClick:S(t.row.id)},"show-"+t.value),e(p,{icon:e(q,{color:"warning"}),label:"بروزرسانی",onClick:N(t.row.id)},"edit-"+t.value)];return t.row.rooms_count<1&&r.push(e(p,{icon:e(z,{color:"error"}),label:"حذف",onClick:x(t.row)},"delete-"+t.value)),r}}],[g,c]=n.useState(!1),[v,m]=n.useState(!1),[A,C]=n.useState(!1),N=t=>async()=>{C(!0);const r=await axios.get(route("admin.departmentApi.show",t));s({...r.data.data,_method:"put"}),m(!0)},S=t=>()=>h.Inertia.visit(route("admin.departments.show",t)),x=t=>()=>{s({...t,_method:"delete"}),c(!0)},I=(t,r,R,_)=>h.Inertia.visit(route("admin.departments.index"),{only:["departments","status","defaultValues"],data:{page:t,filterModel:r,sort:R,pageSize:_},preserveState:!0}),u=()=>{c(!1),a()},k=async()=>{d(route("admin.departments.destroy",o.id),{preserveState:!0,onSuccess:()=>{u()}})},E=()=>d(o!=null&&o.id?route("admin.departments.update",o.id):route("admin.departments.store"),{onSuccess:()=>{m(!1),a()}});return f(O,{children:[e(T,{title:"لیست دپارتمان ها"}),f(B,{defaultValues:y,success:F,status:w,reload:I,columns:b,data:i,loading:l,Filter:H,addNew:!0,addNewTitle:"افزودن دپارتمان",onClickAddNew:()=>{m(!0)},errors:D,children:[e(G,{title:`دپارتمان ${o==null?void 0:o.name}`,agreeCB:k,disAgreeCB:u,openDelete:g}),e(L,{title:`${A?"بروزرسانی":"افزودن"} دپارتمان`,loading:l,open:v,values:o,reset:a,setValues:s,setOpen:m,submit:E})]})]})},K=[{title:"دپارتمان ها",link:null,icon:null}];J.layout=i=>e(V,{auth:i.props.auth,children:i,breadcrumbs:K});export{J as default};
