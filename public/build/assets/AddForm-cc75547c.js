import{j as m,a as r}from"./app-d5838e02.js";import{D}from"./dialogTitleClasses-abf5e354.js";import{D as b}from"./DialogTitle-83f853a9.js";import{D as v}from"./DialogContent-625aab1d.js";import{C as A}from"./Container-efb457d9.js";import{G as i}from"./Grid-8a5bdd48.js";import{T as c}from"./TextField-297889ea.js";import{F as k,S as F}from"./Switch-387346d5.js";import{D as T}from"./DialogActions-fa2f4723.js";import{B as p}from"./Button-bd486041.js";import{C as j}from"./CircularProgress-3e7a60aa.js";import"./styled-fdefee23.js";import"./generateUtilityClasses-7c282334.js";import"./useTheme-72d1cf85.js";import"./Modal-a0e8bcd3.js";import"./Paper-526edff1.js";import"./useId-50d02417.js";import"./Typography-fc61ae90.js";import"./extendSxProp-6a4e3e6f.js";import"./styled-a285cb07.js";import"./isMuiElement-169c2545.js";import"./useControlled-3887b5a3.js";import"./Popover-83ee7fd6.js";import"./createSvgIcon-cbfcc346.js";import"./Stack-b57726d9.js";import"./ButtonBase-c8b95147.js";const V=({values:o,setValues:a,submit:d,open:h,setOpen:u,title:f,reset:C,loading:e})=>{const l=t=>a(n=>({...n,[t.target.name]:t.target.value})),s=()=>{u(!1),C()},g=(t,n)=>a(x=>({...x,isActive:n}));return m(D,{open:h,onClose:s,keepMounted:!0,children:[r(b,{children:f}),r(v,{sx:{p:"1em"},children:r(A,{children:m(i,{container:!0,sx:{marginTop:"1em"},spacing:2,children:[r(i,{item:!0,xs:8,children:r(c,{label:"عنوان",name:"name",onChange:l,value:o.name,fullWidth:!0})}),r(i,{item:!0,xs:4,children:r(k,{control:r(F,{name:"isActive",checked:o.isActive,onChange:g}),label:"فعال"})}),r(i,{item:!0,xs:12,children:r(c,{multiline:!0,rows:3,label:"توضیحات",name:"description",onChange:l,value:o.description,fullWidth:!0})})]})})}),m(T,{children:[r(p,{onClick:s,disabled:e,children:"لغو"}),r(p,{onClick:d,variant:"contained",disabled:e,endIcon:e?r(j,{}):null,sx:{color:"white"},children:"ثبت"})]})]})};export{V as default};
