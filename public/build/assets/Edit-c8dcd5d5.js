import{u as s,a as r,d as a}from"./app-9ac2a27d.js";import n from"./Form-405d0b5b.js";import{A as u}from"./AdminLayout-8f7d6561.js";import"./SelectSearch-8d4843db.js";import"./styled-f16d3707.js";import"./TextField-e852a59f.js";import"./generateUtilityClasses-3f2b64a1.js";import"./isMuiElement-73000179.js";import"./useId-21b8b1a0.js";import"./useControlled-863ae4d3.js";import"./useTheme-a40d47d0.js";import"./Popover-306611ff.js";import"./Modal-ab494c8f.js";import"./Paper-631201fe.js";import"./createSvgIcon-18282e1e.js";import"./IconButton-f2f79b09.js";import"./ButtonBase-d98eea35.js";import"./Popper-677ea27b.js";import"./createPopper-3cf4315c.js";import"./usePreviousProps-ad903b60.js";import"./CircularProgress-0d57a603.js";import"./Container-b3c84887.js";import"./styled-34ab6540.js";import"./Grid-e1bdc360.js";import"./extendSxProp-b6a130aa.js";import"./Switch-243dbc30.js";import"./Typography-8e9e1317.js";import"./Stack-ef7e8c0e.js";import"./Divider-4e31641e.js";import"./dividerClasses-eeffca2a.js";import"./Button-38462903.js";import"./EditCalendar-63f7cc98.js";import"./Collapse-030a1bee.js";import"./Copyright-8e533291.js";import"./Box-103c0ea1.js";import"./jsx-runtime_commonjs-proxy-5611237a.js";import"./MenuItem-ca8e00ef.js";import"./dialogTitleClasses-a13ae9f4.js";import"./DialogTitle-7d70dd8f.js";import"./DialogContent-4fc2bf45.js";import"./DialogActions-411c97a3.js";const d=t=>{const{data:i,setData:o,post:m,processing:p,errors:e}=s({...t.user,_method:"put"});return r(n,{values:i,errors:e,setValues:o,loading:p,submit:()=>m(route("admin.users.update",t.user.id)),cancel:()=>a.Inertia.visit(route("users.index")),edit:!0})},l=[{title:"کاربران",link:route("admin.users.index"),icon:null},{title:"بروز رسانی کاربر",link:null,icon:null}];d.layout=t=>r(u,{auth:t.props.auth,children:t,breadcrumbs:l});export{d as default};
