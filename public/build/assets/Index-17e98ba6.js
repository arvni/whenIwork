import{a as t,u as E,r as d,j as v,F as T,H as U,d as l}from"./app-d1dbfdab.js";import{T as _}from"./TableLayout-db217659.js";import{D as B}from"./DeleteForm-753e0ea0.js";import G from"./ChangePassword-17c8b7b1.js";import M from"./Filter-2a1d8b2a.js";import{A as O}from"./AdminLayout-74b932a6.js";import{E as R,D as V}from"./Edit-f429e7e8.js";import{c as $}from"./createSvgIcon-8e57426f.js";import{G as n}from"./GridActionsCellItem-a600e4b7.js";import"./jsx-runtime_commonjs-proxy-b142d019.js";import"./styled-ea4cc06d.js";import"./useSlotProps-d015ad01.js";import"./TransitionGroupContext-a7327adb.js";import"./isMuiElement-4ac4aa11.js";import"./useControlled-f648ed34.js";import"./ButtonBase-58f8f612.js";import"./generateUtilityClasses-aacb770c.js";import"./AuthenticatedLayout-31b58a96.js";import"./Collapse-12d8860d.js";import"./Paper-546bbb26.js";import"./useTheme-d80e1e09.js";import"./Copyright-41d80426.js";import"./TextField-8c801748.js";import"./react-is.production.min-a192e302.js";import"./Modal-12c03e4b.js";import"./Typography-b920a7d0.js";import"./extendSxProp-026b344c.js";import"./Box-70f1a542.js";import"./IconButton-776622ad.js";import"./CircularProgress-67ab0f62.js";import"./MenuItem-cbf24c2a.js";import"./dividerClasses-5ec07f0b.js";import"./usePreviousProps-8ac14aea.js";import"./Divider-d7232a9f.js";import"./DialogContent-df303438.js";import"./DialogTitle-fc4060ed.js";import"./Grid-52381724.js";import"./DialogActions-0070eb61.js";import"./Stack-fbbf0c4c.js";import"./styled-1da70638.js";import"./Button-e4ddfc72.js";import"./Container-518a9f8d.js";import"./helper-a68b4be4.js";import"./TableHead-d61057cc.js";import"./TableCell-ee779cb9.js";import"./TableRow-467dcf0c.js";import"./KeyboardArrowRight-4fbceae4.js";import"./Popper-77f43709.js";import"./createPopper-3cf4315c.js";import"./DialogContentText-bd5c1ce8.js";import"./FilterAlt-8ce198a1.js";import"./SelectSearch-844b9bcc.js";import"./AccordionSummary-963b9755.js";const q=$(t("path",{d:"M2 17h20v2H2v-2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48H7v-1.5H5.3l.85-1.47L4.85 7 4 8.47 3.15 7l-1.3.75.85 1.47H1v1.5h1.7l-.85 1.48 1.3.75zm6.7-.75 1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48H15v-1.5h-1.7l.85-1.47-1.3-.75L12 8.47 11.15 7l-1.3.75.85 1.47H9v1.5h1.7l-.85 1.48zM23 9.22h-1.7l.85-1.47-1.3-.75L20 8.47 19.15 7l-1.3.75.85 1.47H17v1.5h1.7l-.85 1.48 1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48H23v-1.5z"}),"Password"),J=({users:r,status:C,defaultValues:b,success:N})=>{const{setData:i,data:y,post:m,processing:p,reset:c,setError:I,errors:u}=E(),[H,h]=d.useState(!1),[P,s]=d.useState(!1),S=[{field:"userId",headerName:"شناسه",type:"string",width:70},{field:"name",headerName:"نام",type:"string",width:150},{field:"email",headerName:"ایمیل",type:"email",width:150},{field:"mobileNo",headerName:"شماره موبایل",type:"string",width:100},{field:"role",headerName:"نقش",type:"string",sortable:!1,renderCell:e=>e.row.roles.map(a=>a.name).join(", ")},{field:"id",headerName:"#",type:"actions",width:100,sortable:!1,renderCell:e=>[t(n,{icon:t(R,{color:"warning"}),label:"بروزرسانی",onClick:A(e.row.id)},"edit-"+e.value),t(n,{icon:t(q,{}),label:"تغییر رمز عبور",onClick:L(e.row.id)},"change-password-"+e.value),t(n,{icon:t(V,{color:"error"}),label:"حذف",onClick:D(e.row)},"delete-"+e.value)]}],[o,w]=d.useState(null),A=e=>()=>l.Inertia.visit(route("admin.users.edit",e)),D=e=>()=>{w(e),i({_method:"delete"}),h(!0)},f=()=>{c(),h(!1),w(null)},x=()=>{m(route("admin.users.destroy",o.id),{onSuccess:g})},L=e=>()=>{i({current:"",password:"",password_confirmation:"",userId:e,_method:"put"}),s(!0)},k=()=>{m(route("password.update"),{onSuccess:g})},F=()=>{s(!1),c()},g=()=>{s(!1),f()};return v(T,{children:[t(U,{title:"لیست کاربران"}),v(_,{defaultValues:b,addNew:!0,onClickAddNew:()=>l.Inertia.visit(route("admin.users.create")),addNewTitle:"افزودن کاربر",loading:p,success:N,status:C,errors:u,data:r,Filter:M,columns:S,reload:(e,a,j,z)=>l.Inertia.visit(route("admin.users.index"),{only:["users","defaultValues"],data:{filters:a,page:e,sort:j,pageSize:z},preserveState:!0}),children:[t(B,{title:`${o==null?void 0:o.name} User`,openDelete:H,disAgreeCB:f,agreeCB:x}),t(G,{onClose:F,onSubmit:k,data:y,errors:u,setError:I,open:P&&!p,userId:o,currentNeeded:!1,setData:i})]})]})},K=[{title:"کاربران",link:null,icon:null}];J.layout=r=>t(O,{auth:r.props.auth,children:r,breadcrumbs:K});export{J as default};
