(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[0],{1110:function(e,t,n){"use strict";var a=n(1),r=n(0),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},o=n(9),i=function(e,t){return r.createElement(o.a,Object(a.a)(Object(a.a)({},e),{},{ref:t,icon:c}))};i.displayName="PlusOutlined";t.a=r.forwardRef(i)},568:function(e,t,n){"use strict";var a=n(273);t.a=a.a},569:function(e,t,n){"use strict";var a=n(267);t.a=a.a},575:function(e,t,n){"use strict";var a=n(3),r=n(5),c=n(0),o=n(8),i=n(24),l=n(14),u=n(1),s=n(6),d=n.n(s),f=n(49),b=n(160),v=n(57),m=n(13),h=n(32),p=n(84);function O(e){var t=Object(c.useRef)(),n=Object(c.useRef)(!1);return Object(c.useEffect)((function(){return function(){n.current=!0,h.a.cancel(t.current)}}),[]),function(){for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];n.current||(h.a.cancel(t.current),t.current=Object(h.a)((function(){e.apply(void 0,r)})))}}var j=n(34);function y(e,t){var n,a=e.prefixCls,o=e.id,i=e.active,l=e.tab,u=l.key,s=l.tab,f=l.disabled,b=l.closeIcon,v=e.closable,m=e.renderWrapper,h=e.removeAriaLabel,p=e.editable,O=e.onClick,y=e.onRemove,g=e.onFocus,E=e.style,k="".concat(a,"-tab");c.useEffect((function(){return y}),[]);var x=p&&!1!==v&&!f;function w(e){f||O(e)}var C=c.createElement("div",{key:u,ref:t,className:d()(k,(n={},Object(r.a)(n,"".concat(k,"-with-remove"),x),Object(r.a)(n,"".concat(k,"-active"),i),Object(r.a)(n,"".concat(k,"-disabled"),f),n)),style:E,onClick:w},c.createElement("div",{role:"tab","aria-selected":i,id:o&&"".concat(o,"-tab-").concat(u),className:"".concat(k,"-btn"),"aria-controls":o&&"".concat(o,"-panel-").concat(u),"aria-disabled":f,tabIndex:f?null:0,onClick:function(e){e.stopPropagation(),w(e)},onKeyDown:function(e){[j.a.SPACE,j.a.ENTER].includes(e.which)&&(e.preventDefault(),w(e))},onFocus:g},s),x&&c.createElement("button",{type:"button","aria-label":h||"remove",tabIndex:0,className:"".concat(k,"-remove"),onClick:function(e){var t;e.stopPropagation(),(t=e).preventDefault(),t.stopPropagation(),p.onEdit("remove",{key:u,event:t})}},b||p.removeIcon||"\xd7"));return m?m(C):C}var g=c.forwardRef(y),E={width:0,height:0,left:0,top:0};var k={width:0,height:0,left:0,top:0,right:0};var x=n(88),w=n(310);function C(e,t){var n=e.prefixCls,a=e.editable,r=e.locale,o=e.style;return a&&!1!==a.showAdd?c.createElement("button",{ref:t,type:"button",className:"".concat(n,"-nav-add"),style:o,"aria-label":(null===r||void 0===r?void 0:r.addAriaLabel)||"Add tab",onClick:function(e){a.onEdit("add",{event:e})}},a.addIcon||"+"):null}var N=c.forwardRef(C);function T(e,t){var n=e.prefixCls,a=e.id,i=e.tabs,l=e.locale,u=e.mobile,s=e.moreIcon,f=void 0===s?"More":s,b=e.moreTransitionName,v=e.style,m=e.className,h=e.editable,p=e.tabBarGutter,O=e.rtl,y=e.removeAriaLabel,g=e.onTabClick,E=Object(c.useState)(!1),k=Object(o.a)(E,2),C=k[0],T=k[1],I=Object(c.useState)(null),P=Object(o.a)(I,2),S=P[0],R=P[1],M="".concat(a,"-more-popup"),L="".concat(n,"-dropdown"),A=null!==S?"".concat(M,"-").concat(S):null,B=null===l||void 0===l?void 0:l.dropdownAriaLabel;var D=c.createElement(x.f,{onClick:function(e){var t=e.key,n=e.domEvent;g(t,n),T(!1)},id:M,tabIndex:-1,role:"listbox","aria-activedescendant":A,selectedKeys:[S],"aria-label":void 0!==B?B:"expanded dropdown"},i.map((function(e){var t=h&&!1!==e.closable&&!e.disabled;return c.createElement(x.d,{key:e.key,id:"".concat(M,"-").concat(e.key),role:"option","aria-controls":a&&"".concat(a,"-panel-").concat(e.key),disabled:e.disabled},c.createElement("span",null,e.tab),t&&c.createElement("button",{type:"button","aria-label":y||"remove",tabIndex:0,className:"".concat(L,"-menu-item-remove"),onClick:function(t){var n,a;t.stopPropagation(),n=t,a=e.key,n.preventDefault(),n.stopPropagation(),h.onEdit("remove",{key:a,event:n})}},e.closeIcon||h.removeIcon||"\xd7"))})));function K(e){for(var t=i.filter((function(e){return!e.disabled})),n=t.findIndex((function(e){return e.key===S}))||0,a=t.length,r=0;r<a;r+=1){var c=t[n=(n+e+a)%a];if(!c.disabled)return void R(c.key)}}Object(c.useEffect)((function(){var e=document.getElementById(A);e&&e.scrollIntoView&&e.scrollIntoView(!1)}),[S]),Object(c.useEffect)((function(){C||R(null)}),[C]);var W=Object(r.a)({},O?"marginRight":"marginLeft",p);i.length||(W.visibility="hidden",W.order=1);var q=d()(Object(r.a)({},"".concat(L,"-rtl"),O)),V=u?null:c.createElement(w.a,{prefixCls:L,overlay:D,trigger:["hover"],visible:C,transitionName:b,onVisibleChange:T,overlayClassName:q,mouseEnterDelay:.1,mouseLeaveDelay:.1},c.createElement("button",{type:"button",className:"".concat(n,"-nav-more"),style:W,tabIndex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":M,id:"".concat(a,"-more"),"aria-expanded":C,onKeyDown:function(e){var t=e.which;if(C)switch(t){case j.a.UP:K(-1),e.preventDefault();break;case j.a.DOWN:K(1),e.preventDefault();break;case j.a.ESC:T(!1);break;case j.a.SPACE:case j.a.ENTER:null!==S&&g(S,e)}else[j.a.DOWN,j.a.SPACE,j.a.ENTER].includes(t)&&(T(!0),e.preventDefault())}},f));return c.createElement("div",{className:d()("".concat(n,"-nav-operations"),m),style:v,ref:t},V,c.createElement(N,{prefixCls:n,locale:l,editable:h}))}var I=c.memo(c.forwardRef(T),(function(e,t){return t.tabMoving})),P=Object(c.createContext)(null),S=Math.pow(.995,20);function R(e,t){var n=c.useRef(e),a=c.useState({}),r=Object(o.a)(a,2)[1];return[n.current,function(e){var a="function"===typeof e?e(n.current):e;a!==n.current&&t(a,n.current),n.current=a,r({})}]}var M=function(e){var t,n=e.position,a=e.prefixCls,r=e.extra;if(!r)return null;var o={};return r&&"object"===Object(i.a)(r)&&!c.isValidElement(r)?o=r:o.right=r,"right"===n&&(t=o.right),"left"===n&&(t=o.left),t?c.createElement("div",{className:"".concat(a,"-extra-content")},t):null};function L(e,t){var n,i=c.useContext(P),l=i.prefixCls,s=i.tabs,f=e.className,b=e.style,v=e.id,j=e.animated,y=e.activeKey,x=e.rtl,w=e.extra,C=e.editable,T=e.locale,L=e.tabPosition,A=e.tabBarGutter,B=e.children,D=e.onTabClick,K=e.onTabScroll,W=Object(c.useRef)(),q=Object(c.useRef)(),V=Object(c.useRef)(),z=Object(c.useRef)(),H=function(){var e=Object(c.useRef)(new Map);return[function(t){return e.current.has(t)||e.current.set(t,c.createRef()),e.current.get(t)},function(t){e.current.delete(t)}]}(),G=Object(o.a)(H,2),Y=G[0],_=G[1],F="top"===L||"bottom"===L,X=R(0,(function(e,t){F&&K&&K({direction:e>t?"left":"right"})})),J=Object(o.a)(X,2),U=J[0],Q=J[1],Z=R(0,(function(e,t){!F&&K&&K({direction:e>t?"top":"bottom"})})),$=Object(o.a)(Z,2),ee=$[0],te=$[1],ne=Object(c.useState)(0),ae=Object(o.a)(ne,2),re=ae[0],ce=ae[1],oe=Object(c.useState)(0),ie=Object(o.a)(oe,2),le=ie[0],ue=ie[1],se=Object(c.useState)(0),de=Object(o.a)(se,2),fe=de[0],be=de[1],ve=Object(c.useState)(0),me=Object(o.a)(ve,2),he=me[0],pe=me[1],Oe=Object(c.useState)(null),je=Object(o.a)(Oe,2),ye=je[0],ge=je[1],Ee=Object(c.useState)(null),ke=Object(o.a)(Ee,2),xe=ke[0],we=ke[1],Ce=Object(c.useState)(0),Ne=Object(o.a)(Ce,2),Te=Ne[0],Ie=Ne[1],Pe=Object(c.useState)(0),Se=Object(o.a)(Pe,2),Re=Se[0],Me=Se[1],Le=function(e){var t=Object(c.useRef)([]),n=Object(c.useState)({}),a=Object(o.a)(n,2)[1],r=Object(c.useRef)("function"===typeof e?e():e),i=O((function(){var e=r.current;t.current.forEach((function(t){e=t(e)})),t.current=[],r.current=e,a({})}));return[r.current,function(e){t.current.push(e),i()}]}(new Map),Ae=Object(o.a)(Le,2),Be=Ae[0],De=Ae[1],Ke=function(e,t,n){return Object(c.useMemo)((function(){for(var n,a=new Map,r=t.get(null===(n=e[0])||void 0===n?void 0:n.key)||E,c=r.left+r.width,o=0;o<e.length;o+=1){var i,l=e[o].key,s=t.get(l);s||(s=t.get(null===(i=e[o-1])||void 0===i?void 0:i.key)||E);var d=a.get(l)||Object(u.a)({},s);d.right=c-d.left-d.width,a.set(l,d)}return a}),[e.map((function(e){return e.key})).join("_"),t,n])}(s,Be,re),We="".concat(l,"-nav-operations-hidden"),qe=0,Ve=0;function ze(e){return e<qe?qe:e>Ve?Ve:e}F?x?(qe=0,Ve=Math.max(0,re-ye)):(qe=Math.min(0,ye-re),Ve=0):(qe=Math.min(0,xe-le),Ve=0);var He=Object(c.useRef)(),Ge=Object(c.useState)(),Ye=Object(o.a)(Ge,2),_e=Ye[0],Fe=Ye[1];function Xe(){Fe(Date.now())}function Je(){window.clearTimeout(He.current)}function Ue(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=Ke.get(e)||{width:0,height:0,left:0,right:0,top:0};if(F){var n=U;x?t.right<U?n=t.right:t.right+t.width>U+ye&&(n=t.right+t.width-ye):t.left<-U?n=-t.left:t.left+t.width>-U+ye&&(n=-(t.left+t.width-ye)),te(0),Q(ze(n))}else{var a=ee;t.top<-ee?a=-t.top:t.top+t.height>-ee+xe&&(a=-(t.top+t.height-xe)),Q(0),te(ze(a))}}!function(e,t){var n=Object(c.useState)(),a=Object(o.a)(n,2),r=a[0],i=a[1],l=Object(c.useState)(0),u=Object(o.a)(l,2),s=u[0],d=u[1],f=Object(c.useState)(0),b=Object(o.a)(f,2),v=b[0],m=b[1],h=Object(c.useState)(),p=Object(o.a)(h,2),O=p[0],j=p[1],y=Object(c.useRef)(),g=Object(c.useRef)(),E=Object(c.useRef)(null);E.current={onTouchStart:function(e){var t=e.touches[0],n=t.screenX,a=t.screenY;i({x:n,y:a}),window.clearInterval(y.current)},onTouchMove:function(e){if(r){e.preventDefault();var n=e.touches[0],a=n.screenX,c=n.screenY;i({x:a,y:c});var o=a-r.x,l=c-r.y;t(o,l);var u=Date.now();d(u),m(u-s),j({x:o,y:l})}},onTouchEnd:function(){if(r&&(i(null),j(null),O)){var e=O.x/v,n=O.y/v,a=Math.abs(e),c=Math.abs(n);if(Math.max(a,c)<.1)return;var o=e,l=n;y.current=window.setInterval((function(){Math.abs(o)<.01&&Math.abs(l)<.01?window.clearInterval(y.current):t(20*(o*=S),20*(l*=S))}),20)}},onWheel:function(e){var n=e.deltaX,a=e.deltaY,r=0,c=Math.abs(n),o=Math.abs(a);c===o?r="x"===g.current?n:a:c>o?(r=n,g.current="x"):(r=a,g.current="y"),t(-r,-r)&&e.preventDefault()}},c.useEffect((function(){function t(e){E.current.onTouchMove(e)}function n(e){E.current.onTouchEnd(e)}return document.addEventListener("touchmove",t,{passive:!1}),document.addEventListener("touchend",n,{passive:!1}),e.current.addEventListener("touchstart",(function(e){E.current.onTouchStart(e)}),{passive:!1}),e.current.addEventListener("wheel",(function(e){E.current.onWheel(e)})),function(){document.removeEventListener("touchmove",t),document.removeEventListener("touchend",n)}}),[])}(W,(function(e,t){function n(e,t){e((function(e){return ze(e+t)}))}if(F){if(ye>=re)return!1;n(Q,e)}else{if(xe>=le)return!1;n(te,t)}return Je(),Xe(),!0})),Object(c.useEffect)((function(){return Je(),_e&&(He.current=window.setTimeout((function(){Fe(0)}),100)),Je}),[_e]);var Qe=function(e,t,n,a,r){var o,i,l,u=r.tabs,s=r.tabPosition,d=r.rtl;["top","bottom"].includes(s)?(o="width",i=d?"right":"left",l=Math.abs(t.left)):(o="height",i="top",l=-t.top);var f=t[o],b=n[o],v=a[o],m=f;return b+v>f&&(m=f-v),Object(c.useMemo)((function(){if(!u.length)return[0,0];for(var t=u.length,n=t,a=0;a<t;a+=1){var r=e.get(u[a].key)||k;if(r[i]+r[o]>l+m){n=a-1;break}}for(var c=0,s=t-1;s>=0;s-=1)if((e.get(u[s].key)||k)[i]<l){c=s+1;break}return[c,n]}),[e,l,m,s,u.map((function(e){return e.key})).join("_"),d])}(Ke,{width:ye,height:xe,left:U,top:ee},{width:fe,height:he},{width:Te,height:Re},Object(u.a)(Object(u.a)({},e),{},{tabs:s})),Ze=Object(o.a)(Qe,2),$e=Ze[0],et=Ze[1],tt={};"top"===L||"bottom"===L?tt[x?"marginRight":"marginLeft"]=A:tt.marginTop=A;var nt=s.map((function(e,t){var n=e.key;return c.createElement(g,{id:v,prefixCls:l,key:n,tab:e,style:0===t?void 0:tt,closable:e.closable,editable:C,active:n===y,renderWrapper:B,removeAriaLabel:null===T||void 0===T?void 0:T.removeAriaLabel,ref:Y(n),onClick:function(e){D(n,e)},onRemove:function(){_(n)},onFocus:function(){Ue(n),Xe(),W.current&&(x||(W.current.scrollLeft=0),W.current.scrollTop=0)}})})),at=O((function(){var e,t,n,a,r,c,o,i,l,u=(null===(e=W.current)||void 0===e?void 0:e.offsetWidth)||0,d=(null===(t=W.current)||void 0===t?void 0:t.offsetHeight)||0,f=(null===(n=z.current)||void 0===n?void 0:n.offsetWidth)||0,b=(null===(a=z.current)||void 0===a?void 0:a.offsetHeight)||0,v=(null===(r=V.current)||void 0===r?void 0:r.offsetWidth)||0,m=(null===(c=V.current)||void 0===c?void 0:c.offsetHeight)||0;ge(u),we(d),Ie(f),Me(b);var h=((null===(o=q.current)||void 0===o?void 0:o.offsetWidth)||0)-f,p=((null===(i=q.current)||void 0===i?void 0:i.offsetHeight)||0)-b;ce(h),ue(p);var O=null===(l=V.current)||void 0===l?void 0:l.className.includes(We);be(h-(O?0:v)),pe(p-(O?0:m)),De((function(){var e=new Map;return s.forEach((function(t){var n=t.key,a=Y(n).current;a&&e.set(n,{width:a.offsetWidth,height:a.offsetHeight,left:a.offsetLeft,top:a.offsetTop})})),e}))})),rt=s.slice(0,$e),ct=s.slice(et+1),ot=[].concat(Object(m.a)(rt),Object(m.a)(ct)),it=Object(c.useState)(),lt=Object(o.a)(it,2),ut=lt[0],st=lt[1],dt=Ke.get(y),ft=Object(c.useRef)();function bt(){h.a.cancel(ft.current)}Object(c.useEffect)((function(){var e={};return dt&&(F?(x?e.right=dt.right:e.left=dt.left,e.width=dt.width):(e.top=dt.top,e.height=dt.height)),bt(),ft.current=Object(h.a)((function(){st(e)})),bt}),[dt,F,x]),Object(c.useEffect)((function(){Ue()}),[y,dt,Ke,F]),Object(c.useEffect)((function(){at()}),[x,A,y,s.map((function(e){return e.key})).join("_")]);var vt,mt,ht,pt,Ot=!!ot.length,jt="".concat(l,"-nav-wrap");return F?x?(mt=U>0,vt=U+ye<re):(vt=U<0,mt=-U+ye<re):(ht=ee<0,pt=-ee+xe<le),c.createElement("div",{ref:t,role:"tablist",className:d()("".concat(l,"-nav"),f),style:b,onKeyDown:function(){Xe()}},c.createElement(M,{position:"left",extra:w,prefixCls:l}),c.createElement(p.a,{onResize:at},c.createElement("div",{className:d()(jt,(n={},Object(r.a)(n,"".concat(jt,"-ping-left"),vt),Object(r.a)(n,"".concat(jt,"-ping-right"),mt),Object(r.a)(n,"".concat(jt,"-ping-top"),ht),Object(r.a)(n,"".concat(jt,"-ping-bottom"),pt),n)),ref:W},c.createElement(p.a,{onResize:at},c.createElement("div",{ref:q,className:"".concat(l,"-nav-list"),style:{transform:"translate(".concat(U,"px, ").concat(ee,"px)"),transition:_e?"none":void 0}},nt,c.createElement(N,{ref:z,prefixCls:l,locale:T,editable:C,style:Object(u.a)(Object(u.a)({},0===nt.length?void 0:tt),{},{visibility:Ot?"hidden":null})}),c.createElement("div",{className:d()("".concat(l,"-ink-bar"),Object(r.a)({},"".concat(l,"-ink-bar-animated"),j.inkBar)),style:ut}))))),c.createElement(I,Object(a.a)({},e,{removeAriaLabel:null===T||void 0===T?void 0:T.removeAriaLabel,ref:V,prefixCls:l,tabs:ot,className:!Ot&&We,tabMoving:!!_e})),c.createElement(M,{position:"right",extra:w,prefixCls:l}))}var A=c.forwardRef(L);function B(e){var t=e.id,n=e.activeKey,a=e.animated,o=e.tabPosition,i=e.rtl,l=e.destroyInactiveTabPane,u=c.useContext(P),s=u.prefixCls,f=u.tabs,b=a.tabPane,v=f.findIndex((function(e){return e.key===n}));return c.createElement("div",{className:d()("".concat(s,"-content-holder"))},c.createElement("div",{className:d()("".concat(s,"-content"),"".concat(s,"-content-").concat(o),Object(r.a)({},"".concat(s,"-content-animated"),b)),style:v&&b?Object(r.a)({},i?"marginRight":"marginLeft","-".concat(v,"00%")):null},f.map((function(e){return c.cloneElement(e.node,{key:e.key,prefixCls:s,tabKey:e.key,id:t,animated:b,active:e.key===n,destroyInactiveTabPane:l})}))))}function D(e){var t=e.prefixCls,n=e.forceRender,a=e.className,r=e.style,i=e.id,l=e.active,s=e.animated,f=e.destroyInactiveTabPane,b=e.tabKey,v=e.children,m=c.useState(n),h=Object(o.a)(m,2),p=h[0],O=h[1];c.useEffect((function(){l?O(!0):f&&O(!1)}),[l,f]);var j={};return l||(s?(j.visibility="hidden",j.height=0,j.overflowY="hidden"):j.display="none"),c.createElement("div",{id:i&&"".concat(i,"-panel-").concat(b),role:"tabpanel",tabIndex:l?0:-1,"aria-labelledby":i&&"".concat(i,"-tab-").concat(b),"aria-hidden":!l,style:Object(u.a)(Object(u.a)({},j),r),className:d()("".concat(t,"-tabpane"),l&&"".concat(t,"-tabpane-active"),a)},(l||p||n)&&v)}var K=["id","prefixCls","className","children","direction","activeKey","defaultActiveKey","editable","animated","tabPosition","tabBarGutter","tabBarStyle","tabBarExtraContent","locale","moreIcon","moreTransitionName","destroyInactiveTabPane","renderTabBar","onChange","onTabClick","onTabScroll"],W=0;function q(e,t){var n,s,m=e.id,h=e.prefixCls,p=void 0===h?"rc-tabs":h,O=e.className,j=e.children,y=e.direction,g=e.activeKey,E=e.defaultActiveKey,k=e.editable,x=e.animated,w=void 0===x?{inkBar:!0,tabPane:!1}:x,C=e.tabPosition,N=void 0===C?"top":C,T=e.tabBarGutter,I=e.tabBarStyle,S=e.tabBarExtraContent,R=e.locale,M=e.moreIcon,L=e.moreTransitionName,D=e.destroyInactiveTabPane,q=e.renderTabBar,V=e.onChange,z=e.onTabClick,H=e.onTabScroll,G=Object(l.a)(e,K),Y=function(e){return Object(f.a)(e).map((function(e){if(c.isValidElement(e)){var t=void 0!==e.key?String(e.key):void 0;return Object(u.a)(Object(u.a)({key:t},e.props),{},{node:e})}return null})).filter((function(e){return e}))}(j),_="rtl"===y;s=!1===w?{inkBar:!1,tabPane:!1}:!0===w?{inkBar:!0,tabPane:!0}:Object(u.a)({inkBar:!0,tabPane:!1},"object"===Object(i.a)(w)?w:{});var F=Object(c.useState)(!1),X=Object(o.a)(F,2),J=X[0],U=X[1];Object(c.useEffect)((function(){U(Object(b.a)())}),[]);var Q=Object(v.a)((function(){var e;return null===(e=Y[0])||void 0===e?void 0:e.key}),{value:g,defaultValue:E}),Z=Object(o.a)(Q,2),$=Z[0],ee=Z[1],te=Object(c.useState)((function(){return Y.findIndex((function(e){return e.key===$}))})),ne=Object(o.a)(te,2),ae=ne[0],re=ne[1];Object(c.useEffect)((function(){var e,t=Y.findIndex((function(e){return e.key===$}));-1===t&&(t=Math.max(0,Math.min(ae,Y.length-1)),ee(null===(e=Y[t])||void 0===e?void 0:e.key));re(t)}),[Y.map((function(e){return e.key})).join("_"),$,ae]);var ce=Object(v.a)(null,{value:m}),oe=Object(o.a)(ce,2),ie=oe[0],le=oe[1],ue=N;J&&!["left","right"].includes(N)&&(ue="top"),Object(c.useEffect)((function(){m||(le("rc-tabs-".concat(W)),W+=1)}),[]);var se,de={id:ie,activeKey:$,animated:s,tabPosition:ue,rtl:_,mobile:J},fe=Object(u.a)(Object(u.a)({},de),{},{editable:k,locale:R,moreIcon:M,moreTransitionName:L,tabBarGutter:T,onTabClick:function(e,t){null===z||void 0===z||z(e,t);var n=e!==$;ee(e),n&&(null===V||void 0===V||V(e))},onTabScroll:H,extra:S,style:I,panes:j});return se=q?q(fe,A):c.createElement(A,fe),c.createElement(P.Provider,{value:{tabs:Y,prefixCls:p}},c.createElement("div",Object(a.a)({ref:t,id:m,className:d()(p,"".concat(p,"-").concat(ue),(n={},Object(r.a)(n,"".concat(p,"-mobile"),J),Object(r.a)(n,"".concat(p,"-editable"),k),Object(r.a)(n,"".concat(p,"-rtl"),_),n),O)},G),se,c.createElement(B,Object(a.a)({destroyInactiveTabPane:D},de,{animated:s}))))}var V=c.forwardRef(q);V.TabPane=D;var z=V,H=n(166),G=n(1110),Y=n(123),_=n(41),F=n(46),X=n(58),J=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n};function U(e){var t,n=e.type,o=e.className,i=e.size,l=e.onEdit,u=e.hideAdd,s=e.centered,f=e.addIcon,b=J(e,["type","className","size","onEdit","hideAdd","centered","addIcon"]),v=b.prefixCls,m=b.moreIcon,h=void 0===m?c.createElement(H.a,null):m,p=c.useContext(F.b),O=p.getPrefixCls,j=p.direction,y=O("tabs",v);"editable-card"===n&&(t={onEdit:function(e,t){var n=t.key,a=t.event;null===l||void 0===l||l("add"===e?a:n,e)},removeIcon:c.createElement(Y.a,null),addIcon:f||c.createElement(G.a,null),showAdd:!0!==u});var g=O();return Object(_.a)(!("onPrevClick"in b)&&!("onNextClick"in b),"Tabs","`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead."),c.createElement(X.b.Consumer,null,(function(e){var l,u=void 0!==i?i:e;return c.createElement(z,Object(a.a)({direction:j,moreTransitionName:"".concat(g,"-slide-up")},b,{className:d()((l={},Object(r.a)(l,"".concat(y,"-").concat(u),u),Object(r.a)(l,"".concat(y,"-card"),["card","editable-card"].includes(n)),Object(r.a)(l,"".concat(y,"-editable-card"),"editable-card"===n),Object(r.a)(l,"".concat(y,"-centered"),s),l),o),editable:t,moreIcon:h,prefixCls:y}))}))}U.TabPane=D;t.a=U}}]);
//# sourceMappingURL=0.9b6a7d48.chunk.js.map