import{g as T,s as B,c as u,_ as s,u as W,a as C,b as M,e as P}from"./styled-f16d3707.js";import{r as R,a as U}from"./app-9ac2a27d.js";import{g as _}from"./generateUtilityClasses-3f2b64a1.js";import{e as N}from"./extendSxProp-b6a130aa.js";function $(t){return T("MuiTypography",t)}_("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const j=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],L=t=>{const{align:a,gutterBottom:r,noWrap:n,paragraph:e,variant:o,classes:p}=t,i={root:["root",o,t.align!=="inherit"&&`align${u(a)}`,r&&"gutterBottom",n&&"noWrap",e&&"paragraph"]};return P(i,$,p)},w=B("span",{name:"MuiTypography",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:r}=t;return[a.root,r.variant&&a[r.variant],r.align!=="inherit"&&a[`align${u(r.align)}`],r.noWrap&&a.noWrap,r.gutterBottom&&a.gutterBottom,r.paragraph&&a.paragraph]}})(({theme:t,ownerState:a})=>s({margin:0},a.variant&&t.typography[a.variant],a.align!=="inherit"&&{textAlign:a.align},a.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},a.gutterBottom&&{marginBottom:"0.35em"},a.paragraph&&{marginBottom:16})),y={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},z={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},A=t=>z[t]||t,D=R.forwardRef(function(a,r){const n=W({props:a,name:"MuiTypography"}),e=A(n.color),o=N(s({},n,{color:e})),{align:p="inherit",className:i,component:h,gutterBottom:d=!1,noWrap:f=!1,paragraph:l=!1,variant:g="body1",variantMapping:c=y}=o,v=C(o,j),m=s({},o,{align:p,color:e,className:i,component:h,gutterBottom:d,noWrap:f,paragraph:l,variant:g,variantMapping:c}),x=h||(l?"p":c[g]||y[g])||"span",b=L(m);return U(w,s({as:x,ref:r,ownerState:m,className:M(b.root,i)},v))}),k=D;export{k as T};