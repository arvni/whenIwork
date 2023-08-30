var C="top",L="bottom",W="right",$="left",Pt="auto",ft=[C,L,W,$],Q="start",ot="end",ue="clippingParents",Kt="viewport",nt="popper",le="reference",Ft=ft.reduce(function(t,e){return t.concat([e+"-"+Q,e+"-"+ot])},[]),Qt=[].concat(ft,[Pt]).reduce(function(t,e){return t.concat([e,e+"-"+Q,e+"-"+ot])},[]),ve="beforeRead",de="read",he="afterRead",me="beforeMain",ge="main",ye="afterMain",we="beforeWrite",be="write",xe="afterWrite",Oe=[ve,de,he,me,ge,ye,we,be,xe];function F(t){return t?(t.nodeName||"").toLowerCase():null}function T(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function J(t){var e=T(t).Element;return t instanceof e||t instanceof Element}function S(t){var e=T(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function Dt(t){if(typeof ShadowRoot>"u")return!1;var e=T(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function H(t){return t.split("-")[0]}var G=Math.max,gt=Math.min,Z=Math.round;function At(){var t=navigator.userAgentData;return t!=null&&t.brands&&Array.isArray(t.brands)?t.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function Zt(){return!/^((?!chrome|android).)*safari/i.test(At())}function _(t,e,r){e===void 0&&(e=!1),r===void 0&&(r=!1);var n=t.getBoundingClientRect(),a=1,o=1;e&&S(t)&&(a=t.offsetWidth>0&&Z(n.width)/t.offsetWidth||1,o=t.offsetHeight>0&&Z(n.height)/t.offsetHeight||1);var p=J(t)?T(t):window,s=p.visualViewport,i=!Zt()&&r,c=(n.left+(i&&s?s.offsetLeft:0))/a,f=(n.top+(i&&s?s.offsetTop:0))/o,h=n.width/a,y=n.height/o;return{width:h,height:y,top:f,right:c+h,bottom:f+y,left:c,x:c,y:f}}function Rt(t){var e=_(t),r=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-r)<=1&&(r=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:r,height:n}}function _t(t,e){var r=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(r&&Dt(r)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function V(t){return T(t).getComputedStyle(t)}function Ae(t){return["table","td","th"].indexOf(F(t))>=0}function q(t){return((J(t)?t.ownerDocument:t.document)||window.document).documentElement}function yt(t){return F(t)==="html"?t:t.assignedSlot||t.parentNode||(Dt(t)?t.host:null)||q(t)}function qt(t){return!S(t)||V(t).position==="fixed"?null:t.offsetParent}function Ee(t){var e=/firefox/i.test(At()),r=/Trident/i.test(At());if(r&&S(t)){var n=V(t);if(n.position==="fixed")return null}var a=yt(t);for(Dt(a)&&(a=a.host);S(a)&&["html","body"].indexOf(F(a))<0;){var o=V(a);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||e&&o.willChange==="filter"||e&&o.filter&&o.filter!=="none")return a;a=a.parentNode}return null}function pt(t){for(var e=T(t),r=qt(t);r&&Ae(r)&&V(r).position==="static";)r=qt(r);return r&&(F(r)==="html"||F(r)==="body"&&V(r).position==="static")?e:r||Ee(t)||e}function Bt(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function at(t,e,r){return G(t,gt(e,r))}function Pe(t,e,r){var n=at(t,e,r);return n>r?r:n}function te(){return{top:0,right:0,bottom:0,left:0}}function ee(t){return Object.assign({},te(),t)}function re(t,e){return e.reduce(function(r,n){return r[n]=t,r},{})}var De=function(e,r){return e=typeof e=="function"?e(Object.assign({},r.rects,{placement:r.placement})):e,ee(typeof e!="number"?e:re(e,ft))};function Re(t){var e,r=t.state,n=t.name,a=t.options,o=r.elements.arrow,p=r.modifiersData.popperOffsets,s=H(r.placement),i=Bt(s),c=[$,W].indexOf(s)>=0,f=c?"height":"width";if(!(!o||!p)){var h=De(a.padding,r),y=Rt(o),u=i==="y"?C:$,b=i==="y"?L:W,d=r.rects.reference[f]+r.rects.reference[i]-p[i]-r.rects.popper[f],v=p[i]-r.rects.reference[i],w=pt(o),O=w?i==="y"?w.clientHeight||0:w.clientWidth||0:0,A=d/2-v/2,l=h[u],m=O-y[f]-h[b],g=O/2-y[f]/2+A,x=at(l,g,m),D=i;r.modifiersData[n]=(e={},e[D]=x,e.centerOffset=x-g,e)}}function Be(t){var e=t.state,r=t.options,n=r.element,a=n===void 0?"[data-popper-arrow]":n;a!=null&&(typeof a=="string"&&(a=e.elements.popper.querySelector(a),!a)||_t(e.elements.popper,a)&&(e.elements.arrow=a))}const nr={name:"arrow",enabled:!0,phase:"main",fn:Re,effect:Be,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function tt(t){return t.split("-")[1]}var Ce={top:"auto",right:"auto",bottom:"auto",left:"auto"};function $e(t,e){var r=t.x,n=t.y,a=e.devicePixelRatio||1;return{x:Z(r*a)/a||0,y:Z(n*a)/a||0}}function Xt(t){var e,r=t.popper,n=t.popperRect,a=t.placement,o=t.variation,p=t.offsets,s=t.position,i=t.gpuAcceleration,c=t.adaptive,f=t.roundOffsets,h=t.isFixed,y=p.x,u=y===void 0?0:y,b=p.y,d=b===void 0?0:b,v=typeof f=="function"?f({x:u,y:d}):{x:u,y:d};u=v.x,d=v.y;var w=p.hasOwnProperty("x"),O=p.hasOwnProperty("y"),A=$,l=C,m=window;if(c){var g=pt(r),x="clientHeight",D="clientWidth";if(g===T(r)&&(g=q(r),V(g).position!=="static"&&s==="absolute"&&(x="scrollHeight",D="scrollWidth")),g=g,a===C||(a===$||a===W)&&o===ot){l=L;var P=h&&g===m&&m.visualViewport?m.visualViewport.height:g[x];d-=P-n.height,d*=i?1:-1}if(a===$||(a===C||a===L)&&o===ot){A=W;var E=h&&g===m&&m.visualViewport?m.visualViewport.width:g[D];u-=E-n.width,u*=i?1:-1}}var R=Object.assign({position:s},c&&Ce),k=f===!0?$e({x:u,y:d},T(r)):{x:u,y:d};if(u=k.x,d=k.y,i){var B;return Object.assign({},R,(B={},B[l]=O?"0":"",B[A]=w?"0":"",B.transform=(m.devicePixelRatio||1)<=1?"translate("+u+"px, "+d+"px)":"translate3d("+u+"px, "+d+"px, 0)",B))}return Object.assign({},R,(e={},e[l]=O?d+"px":"",e[A]=w?u+"px":"",e.transform="",e))}function je(t){var e=t.state,r=t.options,n=r.gpuAcceleration,a=n===void 0?!0:n,o=r.adaptive,p=o===void 0?!0:o,s=r.roundOffsets,i=s===void 0?!0:s,c={placement:H(e.placement),variation:tt(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:a,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,Xt(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:p,roundOffsets:i})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,Xt(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:i})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}const ar={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:je,data:{}};var ht={passive:!0};function Te(t){var e=t.state,r=t.instance,n=t.options,a=n.scroll,o=a===void 0?!0:a,p=n.resize,s=p===void 0?!0:p,i=T(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&c.forEach(function(f){f.addEventListener("scroll",r.update,ht)}),s&&i.addEventListener("resize",r.update,ht),function(){o&&c.forEach(function(f){f.removeEventListener("scroll",r.update,ht)}),s&&i.removeEventListener("resize",r.update,ht)}}const ir={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Te,data:{}};var Le={left:"right",right:"left",bottom:"top",top:"bottom"};function mt(t){return t.replace(/left|right|bottom|top/g,function(e){return Le[e]})}var We={start:"end",end:"start"};function It(t){return t.replace(/start|end/g,function(e){return We[e]})}function Ct(t){var e=T(t),r=e.pageXOffset,n=e.pageYOffset;return{scrollLeft:r,scrollTop:n}}function $t(t){return _(q(t)).left+Ct(t).scrollLeft}function ke(t,e){var r=T(t),n=q(t),a=r.visualViewport,o=n.clientWidth,p=n.clientHeight,s=0,i=0;if(a){o=a.width,p=a.height;var c=Zt();(c||!c&&e==="fixed")&&(s=a.offsetLeft,i=a.offsetTop)}return{width:o,height:p,x:s+$t(t),y:i}}function Me(t){var e,r=q(t),n=Ct(t),a=(e=t.ownerDocument)==null?void 0:e.body,o=G(r.scrollWidth,r.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),p=G(r.scrollHeight,r.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),s=-n.scrollLeft+$t(t),i=-n.scrollTop;return V(a||r).direction==="rtl"&&(s+=G(r.clientWidth,a?a.clientWidth:0)-o),{width:o,height:p,x:s,y:i}}function jt(t){var e=V(t),r=e.overflow,n=e.overflowX,a=e.overflowY;return/auto|scroll|overlay|hidden/.test(r+a+n)}function ne(t){return["html","body","#document"].indexOf(F(t))>=0?t.ownerDocument.body:S(t)&&jt(t)?t:ne(yt(t))}function it(t,e){var r;e===void 0&&(e=[]);var n=ne(t),a=n===((r=t.ownerDocument)==null?void 0:r.body),o=T(n),p=a?[o].concat(o.visualViewport||[],jt(n)?n:[]):n,s=e.concat(p);return a?s:s.concat(it(yt(p)))}function Et(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Se(t,e){var r=_(t,!1,e==="fixed");return r.top=r.top+t.clientTop,r.left=r.left+t.clientLeft,r.bottom=r.top+t.clientHeight,r.right=r.left+t.clientWidth,r.width=t.clientWidth,r.height=t.clientHeight,r.x=r.left,r.y=r.top,r}function Yt(t,e,r){return e===Kt?Et(ke(t,r)):J(e)?Se(e,r):Et(Me(q(t)))}function He(t){var e=it(yt(t)),r=["absolute","fixed"].indexOf(V(t).position)>=0,n=r&&S(t)?pt(t):t;return J(n)?e.filter(function(a){return J(a)&&_t(a,n)&&F(a)!=="body"}):[]}function Ve(t,e,r,n){var a=e==="clippingParents"?He(t):[].concat(e),o=[].concat(a,[r]),p=o[0],s=o.reduce(function(i,c){var f=Yt(t,c,n);return i.top=G(f.top,i.top),i.right=gt(f.right,i.right),i.bottom=gt(f.bottom,i.bottom),i.left=G(f.left,i.left),i},Yt(t,p,n));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function ae(t){var e=t.reference,r=t.element,n=t.placement,a=n?H(n):null,o=n?tt(n):null,p=e.x+e.width/2-r.width/2,s=e.y+e.height/2-r.height/2,i;switch(a){case C:i={x:p,y:e.y-r.height};break;case L:i={x:p,y:e.y+e.height};break;case W:i={x:e.x+e.width,y:s};break;case $:i={x:e.x-r.width,y:s};break;default:i={x:e.x,y:e.y}}var c=a?Bt(a):null;if(c!=null){var f=c==="y"?"height":"width";switch(o){case Q:i[c]=i[c]-(e[f]/2-r[f]/2);break;case ot:i[c]=i[c]+(e[f]/2-r[f]/2);break}}return i}function st(t,e){e===void 0&&(e={});var r=e,n=r.placement,a=n===void 0?t.placement:n,o=r.strategy,p=o===void 0?t.strategy:o,s=r.boundary,i=s===void 0?ue:s,c=r.rootBoundary,f=c===void 0?Kt:c,h=r.elementContext,y=h===void 0?nt:h,u=r.altBoundary,b=u===void 0?!1:u,d=r.padding,v=d===void 0?0:d,w=ee(typeof v!="number"?v:re(v,ft)),O=y===nt?le:nt,A=t.rects.popper,l=t.elements[b?O:y],m=Ve(J(l)?l:l.contextElement||q(t.elements.popper),i,f,p),g=_(t.elements.reference),x=ae({reference:g,element:A,strategy:"absolute",placement:a}),D=Et(Object.assign({},A,x)),P=y===nt?D:g,E={top:m.top-P.top+w.top,bottom:P.bottom-m.bottom+w.bottom,left:m.left-P.left+w.left,right:P.right-m.right+w.right},R=t.modifiersData.offset;if(y===nt&&R){var k=R[a];Object.keys(E).forEach(function(B){var X=[W,L].indexOf(B)>=0?1:-1,I=[C,L].indexOf(B)>=0?"y":"x";E[B]+=k[I]*X})}return E}function Ne(t,e){e===void 0&&(e={});var r=e,n=r.placement,a=r.boundary,o=r.rootBoundary,p=r.padding,s=r.flipVariations,i=r.allowedAutoPlacements,c=i===void 0?Qt:i,f=tt(n),h=f?s?Ft:Ft.filter(function(b){return tt(b)===f}):ft,y=h.filter(function(b){return c.indexOf(b)>=0});y.length===0&&(y=h);var u=y.reduce(function(b,d){return b[d]=st(t,{placement:d,boundary:a,rootBoundary:o,padding:p})[H(d)],b},{});return Object.keys(u).sort(function(b,d){return u[b]-u[d]})}function Fe(t){if(H(t)===Pt)return[];var e=mt(t);return[It(t),e,It(e)]}function qe(t){var e=t.state,r=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var a=r.mainAxis,o=a===void 0?!0:a,p=r.altAxis,s=p===void 0?!0:p,i=r.fallbackPlacements,c=r.padding,f=r.boundary,h=r.rootBoundary,y=r.altBoundary,u=r.flipVariations,b=u===void 0?!0:u,d=r.allowedAutoPlacements,v=e.options.placement,w=H(v),O=w===v,A=i||(O||!b?[mt(v)]:Fe(v)),l=[v].concat(A).reduce(function(K,N){return K.concat(H(N)===Pt?Ne(e,{placement:N,boundary:f,rootBoundary:h,padding:c,flipVariations:b,allowedAutoPlacements:d}):N)},[]),m=e.rects.reference,g=e.rects.popper,x=new Map,D=!0,P=l[0],E=0;E<l.length;E++){var R=l[E],k=H(R),B=tt(R)===Q,X=[C,L].indexOf(k)>=0,I=X?"width":"height",j=st(e,{placement:R,boundary:f,rootBoundary:h,altBoundary:y,padding:c}),M=X?B?W:$:B?L:C;m[I]>g[I]&&(M=mt(M));var ct=mt(M),Y=[];if(o&&Y.push(j[k]<=0),s&&Y.push(j[M]<=0,j[ct]<=0),Y.every(function(K){return K})){P=R,D=!1;break}x.set(R,Y)}if(D)for(var ut=b?3:1,wt=function(N){var rt=l.find(function(vt){var z=x.get(vt);if(z)return z.slice(0,N).every(function(bt){return bt})});if(rt)return P=rt,"break"},et=ut;et>0;et--){var lt=wt(et);if(lt==="break")break}e.placement!==P&&(e.modifiersData[n]._skip=!0,e.placement=P,e.reset=!0)}}const or={name:"flip",enabled:!0,phase:"main",fn:qe,requiresIfExists:["offset"],data:{_skip:!1}};function zt(t,e,r){return r===void 0&&(r={x:0,y:0}),{top:t.top-e.height-r.y,right:t.right-e.width+r.x,bottom:t.bottom-e.height+r.y,left:t.left-e.width-r.x}}function Ut(t){return[C,W,L,$].some(function(e){return t[e]>=0})}function Xe(t){var e=t.state,r=t.name,n=e.rects.reference,a=e.rects.popper,o=e.modifiersData.preventOverflow,p=st(e,{elementContext:"reference"}),s=st(e,{altBoundary:!0}),i=zt(p,n),c=zt(s,a,o),f=Ut(i),h=Ut(c);e.modifiersData[r]={referenceClippingOffsets:i,popperEscapeOffsets:c,isReferenceHidden:f,hasPopperEscaped:h},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":h})}const sr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Xe};function Ie(t,e,r){var n=H(t),a=[$,C].indexOf(n)>=0?-1:1,o=typeof r=="function"?r(Object.assign({},e,{placement:t})):r,p=o[0],s=o[1];return p=p||0,s=(s||0)*a,[$,W].indexOf(n)>=0?{x:s,y:p}:{x:p,y:s}}function Ye(t){var e=t.state,r=t.options,n=t.name,a=r.offset,o=a===void 0?[0,0]:a,p=Qt.reduce(function(f,h){return f[h]=Ie(h,e.rects,o),f},{}),s=p[e.placement],i=s.x,c=s.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=i,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=p}const fr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Ye};function ze(t){var e=t.state,r=t.name;e.modifiersData[r]=ae({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}const pr={name:"popperOffsets",enabled:!0,phase:"read",fn:ze,data:{}};function Ue(t){return t==="x"?"y":"x"}function Ge(t){var e=t.state,r=t.options,n=t.name,a=r.mainAxis,o=a===void 0?!0:a,p=r.altAxis,s=p===void 0?!1:p,i=r.boundary,c=r.rootBoundary,f=r.altBoundary,h=r.padding,y=r.tether,u=y===void 0?!0:y,b=r.tetherOffset,d=b===void 0?0:b,v=st(e,{boundary:i,rootBoundary:c,padding:h,altBoundary:f}),w=H(e.placement),O=tt(e.placement),A=!O,l=Bt(w),m=Ue(l),g=e.modifiersData.popperOffsets,x=e.rects.reference,D=e.rects.popper,P=typeof d=="function"?d(Object.assign({},e.rects,{placement:e.placement})):d,E=typeof P=="number"?{mainAxis:P,altAxis:P}:Object.assign({mainAxis:0,altAxis:0},P),R=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,k={x:0,y:0};if(g){if(o){var B,X=l==="y"?C:$,I=l==="y"?L:W,j=l==="y"?"height":"width",M=g[l],ct=M+v[X],Y=M-v[I],ut=u?-D[j]/2:0,wt=O===Q?x[j]:D[j],et=O===Q?-D[j]:-x[j],lt=e.elements.arrow,K=u&&lt?Rt(lt):{width:0,height:0},N=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:te(),rt=N[X],vt=N[I],z=at(0,x[j],K[j]),bt=A?x[j]/2-ut-z-rt-E.mainAxis:wt-z-rt-E.mainAxis,ie=A?-x[j]/2+ut+z+vt+E.mainAxis:et+z+vt+E.mainAxis,xt=e.elements.arrow&&pt(e.elements.arrow),oe=xt?l==="y"?xt.clientTop||0:xt.clientLeft||0:0,Tt=(B=R==null?void 0:R[l])!=null?B:0,se=M+bt-Tt-oe,fe=M+ie-Tt,Lt=at(u?gt(ct,se):ct,M,u?G(Y,fe):Y);g[l]=Lt,k[l]=Lt-M}if(s){var Wt,pe=l==="x"?C:$,ce=l==="x"?L:W,U=g[m],dt=m==="y"?"height":"width",kt=U+v[pe],Mt=U-v[ce],Ot=[C,$].indexOf(w)!==-1,St=(Wt=R==null?void 0:R[m])!=null?Wt:0,Ht=Ot?kt:U-x[dt]-D[dt]-St+E.altAxis,Vt=Ot?U+x[dt]+D[dt]-St-E.altAxis:Mt,Nt=u&&Ot?Pe(Ht,U,Vt):at(u?Ht:kt,U,u?Vt:Mt);g[m]=Nt,k[m]=Nt-U}e.modifiersData[n]=k}}const cr={name:"preventOverflow",enabled:!0,phase:"main",fn:Ge,requiresIfExists:["offset"]};function Je(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function Ke(t){return t===T(t)||!S(t)?Ct(t):Je(t)}function Qe(t){var e=t.getBoundingClientRect(),r=Z(e.width)/t.offsetWidth||1,n=Z(e.height)/t.offsetHeight||1;return r!==1||n!==1}function Ze(t,e,r){r===void 0&&(r=!1);var n=S(e),a=S(e)&&Qe(e),o=q(e),p=_(t,a,r),s={scrollLeft:0,scrollTop:0},i={x:0,y:0};return(n||!n&&!r)&&((F(e)!=="body"||jt(o))&&(s=Ke(e)),S(e)?(i=_(e,!0),i.x+=e.clientLeft,i.y+=e.clientTop):o&&(i.x=$t(o))),{x:p.left+s.scrollLeft-i.x,y:p.top+s.scrollTop-i.y,width:p.width,height:p.height}}function _e(t){var e=new Map,r=new Set,n=[];t.forEach(function(o){e.set(o.name,o)});function a(o){r.add(o.name);var p=[].concat(o.requires||[],o.requiresIfExists||[]);p.forEach(function(s){if(!r.has(s)){var i=e.get(s);i&&a(i)}}),n.push(o)}return t.forEach(function(o){r.has(o.name)||a(o)}),n}function tr(t){var e=_e(t);return Oe.reduce(function(r,n){return r.concat(e.filter(function(a){return a.phase===n}))},[])}function er(t){var e;return function(){return e||(e=new Promise(function(r){Promise.resolve().then(function(){e=void 0,r(t())})})),e}}function rr(t){var e=t.reduce(function(r,n){var a=r[n.name];return r[n.name]=a?Object.assign({},a,n,{options:Object.assign({},a.options,n.options),data:Object.assign({},a.data,n.data)}):n,r},{});return Object.keys(e).map(function(r){return e[r]})}var Gt={placement:"bottom",modifiers:[],strategy:"absolute"};function Jt(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return!e.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function ur(t){t===void 0&&(t={});var e=t,r=e.defaultModifiers,n=r===void 0?[]:r,a=e.defaultOptions,o=a===void 0?Gt:a;return function(s,i,c){c===void 0&&(c=o);var f={placement:"bottom",orderedModifiers:[],options:Object.assign({},Gt,o),modifiersData:{},elements:{reference:s,popper:i},attributes:{},styles:{}},h=[],y=!1,u={state:f,setOptions:function(w){var O=typeof w=="function"?w(f.options):w;d(),f.options=Object.assign({},o,f.options,O),f.scrollParents={reference:J(s)?it(s):s.contextElement?it(s.contextElement):[],popper:it(i)};var A=tr(rr([].concat(n,f.options.modifiers)));return f.orderedModifiers=A.filter(function(l){return l.enabled}),b(),u.update()},forceUpdate:function(){if(!y){var w=f.elements,O=w.reference,A=w.popper;if(Jt(O,A)){f.rects={reference:Ze(O,pt(A),f.options.strategy==="fixed"),popper:Rt(A)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach(function(E){return f.modifiersData[E.name]=Object.assign({},E.data)});for(var l=0;l<f.orderedModifiers.length;l++){if(f.reset===!0){f.reset=!1,l=-1;continue}var m=f.orderedModifiers[l],g=m.fn,x=m.options,D=x===void 0?{}:x,P=m.name;typeof g=="function"&&(f=g({state:f,options:D,name:P,instance:u})||f)}}}},update:er(function(){return new Promise(function(v){u.forceUpdate(),v(f)})}),destroy:function(){d(),y=!0}};if(!Jt(s,i))return u;u.setOptions(c).then(function(v){!y&&c.onFirstUpdate&&c.onFirstUpdate(v)});function b(){f.orderedModifiers.forEach(function(v){var w=v.name,O=v.options,A=O===void 0?{}:O,l=v.effect;if(typeof l=="function"){var m=l({state:f,name:w,instance:u,options:A}),g=function(){};h.push(m||g)}})}function d(){h.forEach(function(v){return v()}),h=[]}return u}}export{pr as a,cr as b,ar as c,nr as d,ir as e,or as f,F as g,sr as h,S as i,Qt as j,fr as o,ur as p};
