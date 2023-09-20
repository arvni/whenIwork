import{_ as A,a as ie,b as C,s as re,u as ye,g as ze,e as Oe}from"./styled-92437ef1.js";import{r as a,e as W,a as U,j as Ae}from"./app-def7c5de.js";import{g as Te}from"./generateUtilityClasses-5bad0039.js";import{_ as Xe,j as de,k as oe,u as fe,e as H}from"./Paper-d954a2bc.js";let G=!0,te=!1,he;const Ye={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function We(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&Ye[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function He(e){e.metaKey||e.altKey||e.ctrlKey||(G=!0)}function ee(){G=!1}function Ge(){this.visibilityState==="hidden"&&te&&(G=!0)}function qe(e){e.addEventListener("keydown",He,!0),e.addEventListener("mousedown",ee,!0),e.addEventListener("pointerdown",ee,!0),e.addEventListener("touchstart",ee,!0),e.addEventListener("visibilitychange",Ge,!0)}function Je(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return G||We(t)}function Qe(){const e=a.useCallback(n=>{n!=null&&qe(n.ownerDocument)},[]),t=a.useRef(!1);function r(){return t.current?(te=!0,window.clearTimeout(he),he=window.setTimeout(()=>{te=!1},100),t.current=!1,!0):!1}function l(n){return Je(n)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:l,onBlur:r,ref:e}}function Ze(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function se(e,t){var r=function(i){return t&&a.isValidElement(i)?t(i):i},l=Object.create(null);return e&&a.Children.map(e,function(n){return n}).forEach(function(n){l[n.key]=r(n)}),l}function et(e,t){e=e||{},t=t||{};function r(f){return f in t?t[f]:e[f]}var l=Object.create(null),n=[];for(var i in e)i in t?n.length&&(l[i]=n,n=[]):n.push(i);var o,c={};for(var u in t){if(l[u])for(o=0;o<l[u].length;o++){var p=l[u][o];c[l[u][o]]=r(p)}c[u]=r(u)}for(o=0;o<n.length;o++)c[n[o]]=r(n[o]);return c}function S(e,t,r){return r[t]!=null?r[t]:e.props[t]}function tt(e,t){return se(e.children,function(r){return a.cloneElement(r,{onExited:t.bind(null,r),in:!0,appear:S(r,"appear",e),enter:S(r,"enter",e),exit:S(r,"exit",e)})})}function nt(e,t,r){var l=se(e.children),n=et(t,l);return Object.keys(n).forEach(function(i){var o=n[i];if(a.isValidElement(o)){var c=i in t,u=i in l,p=t[i],f=a.isValidElement(p)&&!p.props.in;u&&(!c||f)?n[i]=a.cloneElement(o,{onExited:r.bind(null,o),in:!0,exit:S(o,"exit",e),enter:S(o,"enter",e)}):!u&&c&&!f?n[i]=a.cloneElement(o,{in:!1}):u&&c&&a.isValidElement(p)&&(n[i]=a.cloneElement(o,{onExited:r.bind(null,o),in:p.props.in,exit:S(o,"exit",e),enter:S(o,"enter",e)}))}}),n}var it=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},rt={component:"div",childFactory:function(t){return t}},ae=function(e){Xe(t,e);function t(l,n){var i;i=e.call(this,l,n)||this;var o=i.handleExited.bind(Ze(i));return i.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},i}var r=t.prototype;return r.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},r.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(n,i){var o=i.children,c=i.handleExited,u=i.firstRender;return{children:u?tt(n,c):nt(n,o,c),firstRender:!1}},r.handleExited=function(n,i){var o=se(this.props.children);n.key in o||(n.props.onExited&&n.props.onExited(i),this.mounted&&this.setState(function(c){var u=A({},c.children);return delete u[n.key],{children:u}}))},r.render=function(){var n=this.props,i=n.component,o=n.childFactory,c=ie(n,["component","childFactory"]),u=this.state.contextValue,p=it(this.state.children).map(o);return delete c.appear,delete c.enter,delete c.exit,i===null?W.createElement(de.Provider,{value:u},p):W.createElement(de.Provider,{value:u},W.createElement(i,c,p))},t}(W.Component);ae.propTypes={};ae.defaultProps=rt;const ot=ae;function st(e){const{className:t,classes:r,pulsate:l=!1,rippleX:n,rippleY:i,rippleSize:o,in:c,onExited:u,timeout:p}=e,[f,g]=a.useState(!1),b=C(t,r.ripple,r.rippleVisible,l&&r.ripplePulsate),x={width:o,height:o,top:-(o/2)+i,left:-(o/2)+n},h=C(r.child,f&&r.childLeaving,l&&r.childPulsate);return!c&&!f&&g(!0),a.useEffect(()=>{if(!c&&u!=null){const R=setTimeout(u,p);return()=>{clearTimeout(R)}}},[u,c,p]),U("span",{className:b,style:x,children:U("span",{className:h})})}const at=Te("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),m=at,lt=["center","classes","className"];let q=e=>e,me,be,ge,Re;const ne=550,ut=80,ct=oe(me||(me=q`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),pt=oe(be||(be=q`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),dt=oe(ge||(ge=q`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),ft=re("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),ht=re(st,{name:"MuiTouchRipple",slot:"Ripple"})(Re||(Re=q`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),m.rippleVisible,ct,ne,({theme:e})=>e.transitions.easing.easeInOut,m.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,m.child,m.childLeaving,pt,ne,({theme:e})=>e.transitions.easing.easeInOut,m.childPulsate,dt,({theme:e})=>e.transitions.easing.easeInOut),mt=a.forwardRef(function(t,r){const l=ye({props:t,name:"MuiTouchRipple"}),{center:n=!1,classes:i={},className:o}=l,c=ie(l,lt),[u,p]=a.useState([]),f=a.useRef(0),g=a.useRef(null);a.useEffect(()=>{g.current&&(g.current(),g.current=null)},[u]);const b=a.useRef(!1),x=a.useRef(0),h=a.useRef(null),R=a.useRef(null);a.useEffect(()=>()=>{x.current&&clearTimeout(x.current)},[]);const _=a.useCallback(d=>{const{pulsate:y,rippleX:T,rippleY:D,rippleSize:I,cb:j}=d;p(E=>[...E,U(ht,{classes:{ripple:C(i.ripple,m.ripple),rippleVisible:C(i.rippleVisible,m.rippleVisible),ripplePulsate:C(i.ripplePulsate,m.ripplePulsate),child:C(i.child,m.child),childLeaving:C(i.childLeaving,m.childLeaving),childPulsate:C(i.childPulsate,m.childPulsate)},timeout:ne,pulsate:y,rippleX:T,rippleY:D,rippleSize:I},f.current)]),f.current+=1,g.current=j},[i]),$=a.useCallback((d={},y={},T=()=>{})=>{const{pulsate:D=!1,center:I=n||y.pulsate,fakeElement:j=!1}=y;if((d==null?void 0:d.type)==="mousedown"&&b.current){b.current=!1;return}(d==null?void 0:d.type)==="touchstart"&&(b.current=!0);const E=j?null:R.current,B=E?E.getBoundingClientRect():{width:0,height:0,left:0,top:0};let v,P,L;if(I||d===void 0||d.clientX===0&&d.clientY===0||!d.clientX&&!d.touches)v=Math.round(B.width/2),P=Math.round(B.height/2);else{const{clientX:k,clientY:V}=d.touches&&d.touches.length>0?d.touches[0]:d;v=Math.round(k-B.left),P=Math.round(V-B.top)}if(I)L=Math.sqrt((2*B.width**2+B.height**2)/3),L%2===0&&(L+=1);else{const k=Math.max(Math.abs((E?E.clientWidth:0)-v),v)*2+2,V=Math.max(Math.abs((E?E.clientHeight:0)-P),P)*2+2;L=Math.sqrt(k**2+V**2)}d!=null&&d.touches?h.current===null&&(h.current=()=>{_({pulsate:D,rippleX:v,rippleY:P,rippleSize:L,cb:T})},x.current=setTimeout(()=>{h.current&&(h.current(),h.current=null)},ut)):_({pulsate:D,rippleX:v,rippleY:P,rippleSize:L,cb:T})},[n,_]),K=a.useCallback(()=>{$({},{pulsate:!0})},[$]),N=a.useCallback((d,y)=>{if(clearTimeout(x.current),(d==null?void 0:d.type)==="touchend"&&h.current){h.current(),h.current=null,x.current=setTimeout(()=>{N(d,y)});return}h.current=null,p(T=>T.length>0?T.slice(1):T),g.current=y},[]);return a.useImperativeHandle(r,()=>({pulsate:K,start:$,stop:N}),[K,$,N]),U(ft,A({className:C(m.root,i.root,o),ref:R},c,{children:U(ot,{component:null,exit:!0,children:u})}))}),bt=mt;function gt(e){return ze("MuiButtonBase",e)}const Rt=Te("MuiButtonBase",["root","disabled","focusVisible"]),yt=Rt,Tt=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],Et=e=>{const{disabled:t,focusVisible:r,focusVisibleClassName:l,classes:n}=e,o=Oe({root:["root",t&&"disabled",r&&"focusVisible"]},gt,n);return r&&l&&(o.root+=` ${l}`),o},Mt=re("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${yt.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Ct=a.forwardRef(function(t,r){const l=ye({props:t,name:"MuiButtonBase"}),{action:n,centerRipple:i=!1,children:o,className:c,component:u="button",disabled:p=!1,disableRipple:f=!1,disableTouchRipple:g=!1,focusRipple:b=!1,LinkComponent:x="a",onBlur:h,onClick:R,onContextMenu:_,onDragLeave:$,onFocus:K,onFocusVisible:N,onKeyDown:d,onKeyUp:y,onMouseDown:T,onMouseLeave:D,onMouseUp:I,onTouchEnd:j,onTouchMove:E,onTouchStart:B,tabIndex:v=0,TouchRippleProps:P,touchRippleRef:L,type:k}=l,V=ie(l,Tt),z=a.useRef(null),M=a.useRef(null),Ee=fe(M,L),{isFocusVisibleRef:le,onFocus:Me,onBlur:Ce,ref:xe}=Qe(),[F,X]=a.useState(!1);p&&F&&X(!1),a.useImperativeHandle(n,()=>({focusVisible:()=>{X(!0),z.current.focus()}}),[]);const[J,ve]=a.useState(!1);a.useEffect(()=>{ve(!0)},[]);const Ve=J&&!f&&!p;a.useEffect(()=>{F&&b&&!f&&J&&M.current.pulsate()},[f,b,F,J]);function w(s,ce,je=g){return H(pe=>(ce&&ce(pe),!je&&M.current&&M.current[s](pe),!0))}const we=w("start",T),Be=w("stop",_),Pe=w("stop",$),Le=w("stop",I),De=w("stop",s=>{F&&s.preventDefault(),D&&D(s)}),ke=w("start",B),Fe=w("stop",j),Se=w("stop",E),$e=w("stop",s=>{Ce(s),le.current===!1&&X(!1),h&&h(s)},!1),Ne=H(s=>{z.current||(z.current=s.currentTarget),Me(s),le.current===!0&&(X(!0),N&&N(s)),K&&K(s)}),Q=()=>{const s=z.current;return u&&u!=="button"&&!(s.tagName==="A"&&s.href)},Z=a.useRef(!1),Ie=H(s=>{b&&!Z.current&&F&&M.current&&s.key===" "&&(Z.current=!0,M.current.stop(s,()=>{M.current.start(s)})),s.target===s.currentTarget&&Q()&&s.key===" "&&s.preventDefault(),d&&d(s),s.target===s.currentTarget&&Q()&&s.key==="Enter"&&!p&&(s.preventDefault(),R&&R(s))}),Ue=H(s=>{b&&s.key===" "&&M.current&&F&&!s.defaultPrevented&&(Z.current=!1,M.current.stop(s,()=>{M.current.pulsate(s)})),y&&y(s),R&&s.target===s.currentTarget&&Q()&&s.key===" "&&!s.defaultPrevented&&R(s)});let Y=u;Y==="button"&&(V.href||V.to)&&(Y=x);const O={};Y==="button"?(O.type=k===void 0?"button":k,O.disabled=p):(!V.href&&!V.to&&(O.role="button"),p&&(O["aria-disabled"]=p));const _e=fe(r,xe,z),ue=A({},l,{centerRipple:i,component:u,disabled:p,disableRipple:f,disableTouchRipple:g,focusRipple:b,tabIndex:v,focusVisible:F}),Ke=Et(ue);return Ae(Mt,A({as:Y,className:C(Ke.root,c),ownerState:ue,onBlur:$e,onClick:R,onContextMenu:Be,onFocus:Ne,onKeyDown:Ie,onKeyUp:Ue,onMouseDown:we,onMouseLeave:De,onMouseUp:Le,onDragLeave:Pe,onTouchEnd:Fe,onTouchMove:Se,onTouchStart:ke,ref:_e,tabIndex:p?-1:v,type:k},O,V,{children:[o,Ve?U(bt,A({ref:Ee,center:i},P)):null]}))}),Pt=Ct;export{Pt as B,ot as T,Ze as _,Qe as u};
