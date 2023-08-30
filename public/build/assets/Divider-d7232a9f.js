import{s as f,_ as r,e as w,u as D,a as C,c as R,d as L}from"./styled-ea4cc06d.js";import{r as W,a as v}from"./app-d1dbfdab.js";import{g as $}from"./dividerClasses-5ec07f0b.js";const I=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],B=t=>{const{absolute:i,children:e,classes:n,flexItem:c,light:l,orientation:a,textAlign:o,variant:s}=t;return L({root:["root",i&&"absolute",s,l&&"light",a==="vertical"&&"vertical",c&&"flexItem",e&&"withChildren",e&&a==="vertical"&&"withChildrenVertical",o==="right"&&a!=="vertical"&&"textAlignRight",o==="left"&&a!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",a==="vertical"&&"wrapperVertical"]},$,n)},N=f("div",{name:"MuiDivider",slot:"Root",overridesResolver:(t,i)=>{const{ownerState:e}=t;return[i.root,e.absolute&&i.absolute,i[e.variant],e.light&&i.light,e.orientation==="vertical"&&i.vertical,e.flexItem&&i.flexItem,e.children&&i.withChildren,e.children&&e.orientation==="vertical"&&i.withChildrenVertical,e.textAlign==="right"&&e.orientation!=="vertical"&&i.textAlignRight,e.textAlign==="left"&&e.orientation!=="vertical"&&i.textAlignLeft]}})(({theme:t,ownerState:i})=>r({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},i.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},i.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:w(t.palette.divider,.08)},i.variant==="inset"&&{marginLeft:72},i.variant==="middle"&&i.orientation==="horizontal"&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},i.variant==="middle"&&i.orientation==="vertical"&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},i.orientation==="vertical"&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},i.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:t})=>r({},t.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:t,ownerState:i})=>r({},i.children&&i.orientation!=="vertical"&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`}}),({theme:t,ownerState:i})=>r({},i.children&&i.orientation==="vertical"&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(t.vars||t).palette.divider}`}}),({ownerState:t})=>r({},t.textAlign==="right"&&t.orientation!=="vertical"&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},t.textAlign==="left"&&t.orientation!=="vertical"&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),T=f("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(t,i)=>{const{ownerState:e}=t;return[i.wrapper,e.orientation==="vertical"&&i.wrapperVertical]}})(({theme:t,ownerState:i})=>r({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},i.orientation==="vertical"&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`})),u=W.forwardRef(function(i,e){const n=D({props:i,name:"MuiDivider"}),{absolute:c=!1,children:l,className:a,component:o=l?"div":"hr",flexItem:s=!1,light:p=!1,orientation:x="horizontal",role:g=o!=="hr"?"separator":void 0,textAlign:b="center",variant:m="fullWidth"}=n,A=C(n,I),d=r({},n,{absolute:c,component:o,flexItem:s,light:p,orientation:x,role:g,textAlign:b,variant:m}),h=B(d);return v(N,r({as:o,className:R(h.root,a),role:g,ref:e,ownerState:d},A,{children:l?v(T,{className:h.wrapper,ownerState:d,children:l}):null}))});u.muiSkipListHighlight=!0;const M=u;export{M as D};
