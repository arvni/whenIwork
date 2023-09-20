import{a as i,j as c,F as M}from"./app-31845fc9.js";import{S as u}from"./SelectSearch-6e46e2e8.js";import{P}from"./PersianDatepicker-1a58b2b6.js";import{s as j}from"./styled-452014fd.js";import{S as F,F as O}from"./Switch-f8d55f52.js";import{S as U}from"./Stack-a8507552.js";import{T as b}from"./Typography-09de9fb4.js";import{b as W}from"./helper-9f361b88.js";import{D as A}from"./dialogTitleClasses-0b6ace63.js";import{D as I}from"./DialogTitle-7eaf66ba.js";import{D as B}from"./DialogContent-0d6f9b12.js";import{G as a}from"./Grid-1be5418d.js";import{T as p,F as V}from"./TextField-c5f8301a.js";import{D as G}from"./DialogActions-db02471f.js";import{B as x}from"./Button-49bbfe71.js";import"./createSvgIcon-967baeee.js";import"./generateUtilityClasses-246f0c68.js";import"./IconButton-c8b2faca.js";import"./ButtonBase-251486ab.js";import"./Paper-13596fd8.js";import"./Popper-643da6c9.js";import"./Modal-dc55508e.js";import"./useTheme-83e926c1.js";import"./createPopper-3cf4315c.js";import"./useId-4eaa092f.js";import"./useControlled-f1fd1053.js";import"./usePreviousProps-4059d3b5.js";import"./CircularProgress-4c9bf60e.js";import"./DesktopDatePicker-68debe68.js";import"./Popover-f8f05ac7.js";import"./removeClass-9a525042.js";import"./styled-b1cc65eb.js";import"./extendSxProp-bdf79a15.js";import"./isMuiElement-d686a30e.js";const L=j(t=>i(F,{focusVisibleClassName:".Mui-focusVisible",disableRipple:!0,...t}))(({theme:t})=>({width:42,height:26,padding:0,"& .MuiSwitch-switchBase":{padding:0,margin:2,transitionDuration:"300ms","&.Mui-checked":{transform:"translateX(16px)",color:"#fff","& + .MuiSwitch-track":{backgroundColor:t.palette.mode==="dark"?"#2ECA45":"#65C466",opacity:1,border:0},"&.Mui-disabled + .MuiSwitch-track":{opacity:.5}},"&.Mui-focusVisible .MuiSwitch-thumb":{color:"#33cf4d",border:"6px solid #fff"},"&.Mui-disabled .MuiSwitch-thumb":{color:t.palette.mode==="light"?t.palette.grey[100]:t.palette.grey[600]},"&.Mui-disabled + .MuiSwitch-track":{opacity:t.palette.mode==="light"?.7:.3}},"& .MuiSwitch-thumb":{boxSizing:"border-box",width:22,height:22},"& .MuiSwitch-track":{borderRadius:26/2,backgroundColor:t.palette.mode==="light"?"#E9E9EA":"#39393D",opacity:1,transition:t.transitions.create(["background-color"],{duration:500})}})),R=({leftLabel:t,rightLabel:m,...r})=>c(U,{direction:"row",spacing:1,alignItems:"center",children:[t&&i(b,{children:t}),i(L,{...r}),m&&i(b,{children:m})]}),Ct=({values:t,setValues:m,cancel:r,submit:y,errors:e,open:w,loading:C,title:f,setError:o,clearErrors:S})=>{var g;const l=n=>h({[n.target.name]:n.target.value}),k=()=>{var d,s;let n=!0;return new Date(new Date(t.date).toDateString())<new Date(new Date().toDateString())&&(o("date","تاریخ انتخابی اشتباه است باشد"),n=!1),t.started_at||(o("started_at","زمان شروع را وارد کنید"),n=!1),t.ended_at||(o("ended_at","زمان پایان را وارد کنید"),n=!1),W(t.started_at,t.ended_at)&&(o("ended_at","زمان پایان شیفت باید بزرگتر از شروع باشد"),n=!1),t.type!=="open"?(t.related===""||!((d=t==null?void 0:t.related)!=null&&d.id))&&(o("related","لطفا یک کاربر را انتخاب کنید"),n=!1):(s=t==null?void 0:t.related)!=null&&s.length||(o("related","لطفا یک نقش را انتخاب کنید"),n=!1),t.noUsers<1&&(o("noUsers","تعداد کاربران باید حداقل یک نفر باشد"),n=!1),n},D=()=>{S(),k()&&y()},_=n=>h({date:n}),T=(n,d)=>h({type:d?"open":"normal",related:d?[]:""}),h=n=>m(d=>({...d,...n}));return c(A,{open:w&&!C,maxWidth:"xs",children:[f&&i(I,{children:f}),i(B,{children:c(a,{container:!0,spacing:3,sx:{marginTop:".5em"},children:[i(a,{item:!0,xs:12,children:i(P,{value:t.date,name:"date",fullWidth:!0,label:"تاریخ",onChange:_,error:e==null?void 0:e.date,helperText:e==null?void 0:e.date})}),i(a,{item:!0,xs:6,children:i(p,{fullWidth:!0,onChange:l,name:"started_at",value:t.started_at,label:"شروع",type:"time",error:e.hasOwnProperty("started_at"),helperText:e==null?void 0:e.started_at,inputProps:{step:3600,pattern:"[0-9]{2}:[0-9]{2}",max:t.ended_at}})}),i(a,{item:!0,xs:6,children:i(p,{name:"ended_at",fullWidth:!0,onChange:l,value:t.ended_at,label:"پایان",type:"time",error:e.hasOwnProperty("ended_at"),helperText:e==null?void 0:e.ended_at,inputProps:{step:3600,pattern:"[0-2][0-9]:[0-5][0-9]",min:t.started_at}})}),i(a,{item:!0,xs:6}),i(a,{item:!0,xs:7.5,sx:{display:"flex",alignItems:"center",alignContent:"center",justifyContent:"start"},children:i(O,{control:i(R,{leftLabel:"معمولی",rightLabel:"باز",checked:t.type==="open",onChange:T}),label:i(V,{children:"نوع شیفت"}),labelPlacement:"top",sx:{alignItems:"center",justifyContent:"space-between",width:"100%",margin:0}})}),((g=t==null?void 0:t.room)==null?void 0:g.id)&&(t.type==="open"?c(M,{children:[i(a,{item:!0,xs:4.5,children:i(p,{name:"noUsers",fullWidth:!0,onChange:l,value:t.noUsers,label:"تعداد کاربران",type:"number",error:e.hasOwnProperty("noUsers"),helperText:e==null?void 0:e.noUsers,inputProps:{min:1}})}),i(a,{item:!0,xs:12,children:i(u,{value:t==null?void 0:t.related,multiple:!0,name:"related",onChange:l,url:route("client.roomsApi.roles",t.room.id),label:"نقش های مرتبط با شیفت",helperText:(e==null?void 0:e.related)??"",error:Object.keys(e).includes("related")})})]}):i(a,{item:!0,xs:12,children:i(u,{value:t==null?void 0:t.related,name:"related",onChange:l,url:route("client.roomsApi.users",t.room.id),label:"کابر",helperText:(e==null?void 0:e.related)??"",error:Object.keys(e).includes("related")})})),i(a,{item:!0,xs:12,children:i(p,{name:"description",fullWidth:!0,onChange:l,value:t.description,label:"توضیحات",multiline:!0,rows:3,error:e.hasOwnProperty("description"),helperText:e==null?void 0:e.description})})]})}),i(G,{children:c(a,{container:!0,spacing:2,flex:!0,justifyContent:"flex-end",justifyItems:"flex-end",children:[i(a,{item:!0,children:i(x,{onClick:r,children:"لغو"})}),i(a,{item:!0,children:i(x,{variant:"contained",onClick:D,sx:{color:"#fff"},children:"ثبت"})})]})})]})};export{Ct as default};
