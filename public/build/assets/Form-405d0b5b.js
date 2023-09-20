import{j as a,a as i,F as f}from"./app-9ac2a27d.js";import{S as b}from"./SelectSearch-8d4843db.js";import{C as w}from"./Container-b3c84887.js";import{G as t}from"./Grid-e1bdc360.js";import{T as l}from"./TextField-e852a59f.js";import{F as C,S as y}from"./Switch-243dbc30.js";import{S as j}from"./Stack-ef7e8c0e.js";import{T as k}from"./Typography-8e9e1317.js";import{D as p}from"./Divider-4e31641e.js";import{B as h}from"./Button-38462903.js";import"./styled-f16d3707.js";import"./createSvgIcon-18282e1e.js";import"./generateUtilityClasses-3f2b64a1.js";import"./IconButton-f2f79b09.js";import"./ButtonBase-d98eea35.js";import"./Paper-631201fe.js";import"./Popper-677ea27b.js";import"./Modal-ab494c8f.js";import"./useTheme-a40d47d0.js";import"./createPopper-3cf4315c.js";import"./useId-21b8b1a0.js";import"./useControlled-863ae4d3.js";import"./usePreviousProps-ad903b60.js";import"./CircularProgress-0d57a603.js";import"./styled-34ab6540.js";import"./extendSxProp-b6a130aa.js";import"./isMuiElement-73000179.js";import"./Popover-306611ff.js";import"./dividerClasses-eeffca2a.js";const ee=({values:m,setValues:o,cancel:s,loading:T,submit:u,errors:e,edit:x})=>{const n=d=>o(c=>({...c,[d.target.name]:d.target.value})),r=(d,c)=>{o(g=>({...g,[d.target.name]:c}))};return a(w,{children:[a(t,{container:!0,spacing:2,children:[i(t,{item:!0,xs:12,sm:6,md:4,children:i(l,{error:Object.keys(e).includes("name"),helperText:(e==null?void 0:e.name)??"",label:"نام",name:"name",value:m.name,onChange:n,sx:{width:"100%"}})}),i(t,{item:!0,xs:12,sm:6,md:4,children:i(l,{error:Object.keys(e).includes("userId"),helperText:(e==null?void 0:e.userId)??"",label:"نام کاربری",name:"userId",value:m.userId,onChange:n,sx:{width:"100%"}})}),i(t,{item:!0,xs:12,sm:6,md:4,children:i(l,{error:Object.keys(e).includes("email"),helperText:(e==null?void 0:e.email)??"",label:"ایمیل",name:"email",type:"email",value:m.email,onChange:n,sx:{width:"100%"}})}),i(t,{item:!0,xs:12,sm:6,md:4,children:i(l,{error:Object.keys(e).includes("mobile"),helperText:(e==null?void 0:e.mobile)??"",label:"موبایل",name:"mobile",value:m.mobile,onChange:n,sx:{width:"100%"}})}),i(t,{item:!0,xs:12,sm:6,md:4,children:i(b,{multiple:!0,url:route("admin.roleApi.index"),error:Object.keys(e).includes("roles"),helperText:(e==null?void 0:e.roles)??"",value:m.roles,onChange:n,label:"نقش ها",name:"roles"})}),i(t,{item:!0,xs:12,sm:6,md:4,children:i(C,{labelPlacement:"start",control:a(j,{direction:"row",spacing:"1",alignItems:"center",children:[i("span",{children:" غیرفعال "}),i(y,{checked:m.isActive,onChange:r,name:"isActive"}),i("span",{children:" فعال "})]}),label:i(k,{children:" وضعیت : "})})})]}),i(p,{sx:{marginY:"1em"}}),x?null:a(f,{children:[a(t,{container:!0,spacing:2,children:[i(t,{item:!0,xs:12,sm:6,children:i(l,{error:Object.keys(e).includes("password"),helperText:(e==null?void 0:e.password)??"",label:"رمزعبور",name:"password",type:"password",onChange:n,sx:{width:"100%"}})}),i(t,{item:!0,xs:12,sm:6,children:i(l,{error:Object.keys(e).includes("password_confirmation"),helperText:(e==null?void 0:e.password_confirmation)??"",label:"تایید رمزعبور",name:"password_confirmation",type:"password",onChange:n,sx:{width:"100%"}})})]}),i(p,{sx:{marginY:"1em"}})]}),a(t,{container:!0,spacing:2,flex:!0,justifyContent:"flex-end",justifyItems:"flex-end",children:[i(t,{item:!0,children:i(h,{onClick:s,children:"لغو"})}),i(t,{item:!0,children:i(h,{variant:"contained",onClick:u,sx:{color:"#fff"},children:"ثبت"})})]})]})};export{ee as default};