import{j as r,a as i}from"./app-9ac2a27d.js";import{D as d}from"./dialogTitleClasses-a13ae9f4.js";import{D as h}from"./DialogTitle-7d70dd8f.js";import{D as f}from"./DialogContent-4fc2bf45.js";import{T as s}from"./TextField-e852a59f.js";import{D as g}from"./DialogActions-411c97a3.js";import{B as a}from"./Button-38462903.js";import"./styled-f16d3707.js";import"./generateUtilityClasses-3f2b64a1.js";import"./useTheme-a40d47d0.js";import"./Modal-ab494c8f.js";import"./Paper-631201fe.js";import"./useId-21b8b1a0.js";import"./Typography-8e9e1317.js";import"./extendSxProp-b6a130aa.js";import"./isMuiElement-73000179.js";import"./useControlled-863ae4d3.js";import"./Popover-306611ff.js";import"./createSvgIcon-18282e1e.js";import"./ButtonBase-d98eea35.js";const I=({open:n,request:o,onSubmit:l,onClose:p,onChange:c})=>{var t;const e=m=>c(m.target.name,m.target.value);return r(d,{open:n,fullWidth:!0,maxWidth:"xs",children:[r(h,{children:["رد درخواست کاربر ",(t=o==null?void 0:o.user)==null?void 0:t.name]}),i(f,{children:i(s,{sx:{marginTop:3},fullWidth:!0,rows:3,multiline:!0,name:"comment",value:(o==null?void 0:o.comment)??"",onChange:e,label:"دلیل رد کردن درخواست"})}),r(g,{children:[i(a,{onClick:l,color:"error",variant:"contained",children:"رد درخواست"}),i(a,{onClick:p,children:"لغو"})]})]})};export{I as default};
