import{r as c,j as i,a as t}from"./app-f429c5d1.js";import{d}from"./FilterAlt-893696d6.js";import{S as l}from"./SelectSearch-90ef96fb.js";import{A as h,a as u,b as x}from"./AccordionSummary-d37ffc77.js";import{G as e}from"./Grid-417d5d0a.js";import{T as f}from"./TextField-980a54da.js";import{B as g}from"./Button-ef7b4777.js";import"./jsx-runtime_commonjs-proxy-f691489f.js";import"./createSvgIcon-539e1997.js";import"./styled-1ab0f523.js";import"./generateUtilityClasses-4cd05fbe.js";import"./Paper-1ada21ca.js";import"./isMuiElement-e45fcb63.js";import"./useId-802135e4.js";import"./useControlled-1f6928c6.js";import"./ButtonBase-c8dbbad4.js";import"./IconButton-9ba9fc36.js";import"./Popper-f24e331f.js";import"./Modal-c33185a4.js";import"./useTheme-bdf5e9b8.js";import"./createPopper-3cf4315c.js";import"./usePreviousProps-e928c92e.js";import"./CircularProgress-d71a0503.js";import"./Collapse-e72a8ee6.js";import"./extendSxProp-cd2562c9.js";import"./Popover-e6fdd7be.js";const P=({defaultFilter:a,onFilter:n})=>{const[r,s]=c.useState(a),o=m=>{s(p=>({...p,[m.target.name]:m.target.value??""}))};return i(h,{sx:{width:"100%"},children:[i(u,{children:[t(d,{})," فیلتر"]}),t(x,{children:i(e,{container:!0,spacing:2,children:[t(e,{item:!0,xs:12,sm:5,children:t(f,{sx:{width:"100%"},name:"search",value:r==null?void 0:r.search,onChange:o,label:"نام"})}),t(e,{item:!0,xs:12,sm:5,children:t(l,{value:r==null?void 0:r.department,name:"department",onChange:o,url:route("admin.departmentApi.index"),label:"دپارتمان"})}),t(e,{item:!0,xs:12,sm:2,sx:{display:"flex"},justifyContent:"center",children:t(g,{variant:"outlined",onClick:n,children:"فیلتر"})})]})})]})};export{P as default};
