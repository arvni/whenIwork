import{r as c,j as i,a as t}from"./app-def7c5de.js";import{d}from"./FilterAlt-3f189fb3.js";import{S as l}from"./SelectSearch-626cdd6b.js";import{A as h,a as u,b as x}from"./AccordionSummary-4c88a9d9.js";import{G as e}from"./Grid-344be56c.js";import{T as f}from"./TextField-5344552c.js";import{B as g}from"./Button-62aefd24.js";import"./jsx-runtime_commonjs-proxy-b4cc2a10.js";import"./createSvgIcon-56adb303.js";import"./styled-92437ef1.js";import"./generateUtilityClasses-5bad0039.js";import"./Paper-d954a2bc.js";import"./isMuiElement-658953cd.js";import"./useId-21b257f9.js";import"./useControlled-1f19e9b0.js";import"./ButtonBase-7267a73f.js";import"./IconButton-0f1e2902.js";import"./Popper-10ee685c.js";import"./Modal-0705f4dd.js";import"./useTheme-3a6ceb9a.js";import"./createPopper-3cf4315c.js";import"./usePreviousProps-f2f2fb2c.js";import"./CircularProgress-a1c2fc53.js";import"./Collapse-9c25795f.js";import"./extendSxProp-f48ee653.js";import"./Popover-8bad161c.js";const P=({defaultFilter:a,onFilter:n})=>{const[r,s]=c.useState(a),o=m=>{s(p=>({...p,[m.target.name]:m.target.value??""}))};return i(h,{sx:{width:"100%"},children:[i(u,{children:[t(d,{})," فیلتر"]}),t(x,{children:i(e,{container:!0,spacing:2,children:[t(e,{item:!0,xs:12,sm:5,children:t(f,{sx:{width:"100%"},name:"search",value:r==null?void 0:r.search,onChange:o,label:"نام"})}),t(e,{item:!0,xs:12,sm:5,children:t(l,{value:r==null?void 0:r.department,name:"department",onChange:o,url:route("admin.departmentApi.index"),label:"دپارتمان"})}),t(e,{item:!0,xs:12,sm:2,sx:{display:"flex"},justifyContent:"center",children:t(g,{variant:"outlined",onClick:n,children:"فیلتر"})})]})})]})};export{P as default};
