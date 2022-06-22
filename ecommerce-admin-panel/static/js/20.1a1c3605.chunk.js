(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[20,39],{1084:function(e,t,a){"use strict";a(0);var c=a(2),n=function(e){var t;switch(e.size){case"lg":t=Object(c.jsx)("h1",{className:"mb-0 font-weight-bold",children:e.value});break;case"md":t=Object(c.jsx)("h2",{className:"mb-0 font-weight-bold",children:e.value});break;default:t=Object(c.jsx)("h3",{className:"mb-0 font-weight-bold",children:e.value})}return t},r=function(e){var t=e.size,a=e.value,r=e.title;return Object(c.jsxs)("div",{children:[Object(c.jsx)(n,{value:a,size:t}),Object(c.jsx)("p",{className:"mb-0 text-muted",children:r})]})};r.defaultProps={size:"md"},t.a=r},1312:function(e,t,a){"use strict";a.r(t);a(0);var c=a(1084),n=a(587),r=a(3403),l=a(620),o=a(576),s=a(2),i=function(){return Object(s.jsxs)("div",{className:"d-flex align-items-center",children:[Object(s.jsx)("div",{className:"mr-5",children:Object(s.jsx)(c.a,{size:"lg",value:"1,128",title:"Active Users"})}),Object(s.jsx)("div",{className:"mr-5",children:Object(s.jsx)(c.a,{size:"md",value:"1,128",title:"Active Users"})}),Object(s.jsx)("div",{children:Object(s.jsx)(c.a,{size:"sm",value:"1,128",title:"Active Users"})})]})};t.default=function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"CustomStatistic"}),Object(s.jsxs)("div",{className:"mt-4",children:[Object(s.jsx)(n.default,{name:"Location",desc:"src/components/shared-components/CustomStatistic.js"}),Object(s.jsx)(n.default,{name:"Description",desc:"highlight data with description"}),Object(s.jsx)("div",{className:"mt-4",children:Object(s.jsxs)(o.a,{title:"Example",children:[Object(s.jsx)(i,{}),Object(s.jsx)("div",{className:"mt-4",children:Object(s.jsx)(r.a,{className:"hl-code",language:"jsx",style:l.a,children:"import React from 'react'\nimport CustomStatistic from 'components/shared-components/CustomStatistic'\n\nexport default const Demo = () =>  (\n\t<div className=\"d-flex align-items-center\">\n\t\t<div className=\"mr-5\">\n\t\t\t<CustomStatistic size={'lg'} value={'1,128'} title={'Active Users'}/>\n\t\t</div>\n\t\t<div className=\"mr-5\">\n\t\t\t<CustomStatistic size={'md'} value={'1,128'} title={'Active Users'}/>\n\t\t</div>\n\t\t<div>\n\t\t\t<CustomStatistic size={'sm'} value={'1,128'} title={'Active Users'}/>\n\t\t</div>\n\t</div>\n)"})})]})}),Object(s.jsx)("h4",{className:"mt-4",children:"Props"}),Object(s.jsx)("div",{className:"api-container border-0 p-0",children:Object(s.jsxs)("table",{children:[Object(s.jsx)("thead",{children:Object(s.jsxs)("tr",{children:[Object(s.jsx)("th",{children:"Property"}),Object(s.jsx)("th",{children:"Description"}),Object(s.jsx)("th",{children:"Type"}),Object(s.jsx)("th",{children:"Default"})]})}),Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{children:"value"}),Object(s.jsx)("td",{children:"Display value"}),Object(s.jsx)("td",{children:"string | number"}),Object(s.jsx)("td",{})]}),Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{children:"title"}),Object(s.jsx)("td",{children:"Display title"}),Object(s.jsx)("td",{children:"string"}),Object(s.jsx)("td",{})]}),Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{children:"size"}),Object(s.jsx)("td",{children:"Value size"}),Object(s.jsx)("td",{children:"sm | md | lg"}),Object(s.jsx)("td",{children:"md"})]})]})]})})]})]})}},576:function(e,t,a){"use strict";var c=a(5),n=a(3),r=a(0),l=a(6),o=a.n(l),s=a(38),i=a(46),d=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a},m=function(e){var t=e.prefixCls,a=e.className,l=e.hoverable,s=void 0===l||l,m=d(e,["prefixCls","className","hoverable"]);return r.createElement(i.a,null,(function(e){var l=(0,e.getPrefixCls)("card",t),i=o()("".concat(l,"-grid"),a,Object(c.a)({},"".concat(l,"-grid-hoverable"),s));return r.createElement("div",Object(n.a)({},m,{className:i}))}))},b=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a},u=function(e){return r.createElement(i.a,null,(function(t){var a=t.getPrefixCls,c=e.prefixCls,l=e.className,s=e.avatar,i=e.title,d=e.description,m=b(e,["prefixCls","className","avatar","title","description"]),u=a("card",c),j=o()("".concat(u,"-meta"),l),p=s?r.createElement("div",{className:"".concat(u,"-meta-avatar")},s):null,h=i?r.createElement("div",{className:"".concat(u,"-meta-title")},i):null,v=d?r.createElement("div",{className:"".concat(u,"-meta-description")},d):null,O=h||v?r.createElement("div",{className:"".concat(u,"-meta-detail")},h,v):null;return r.createElement("div",Object(n.a)({},m,{className:j}),p,O)}))},j=a(575),p=a(567),h=a(568),v=a(56),O=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a};var x=function(e){var t,a,l,d=r.useContext(i.b),b=d.getPrefixCls,u=d.direction,x=r.useContext(v.b),f=e.prefixCls,g=e.className,y=e.extra,E=e.headStyle,C=void 0===E?{}:E,N=e.bodyStyle,F=void 0===N?{}:N,w=e.title,S=e.loading,z=e.bordered,A=void 0===z||z,k=e.size,P=e.type,D=e.cover,T=e.actions,B=e.tabList,H=e.children,M=e.activeTabKey,K=e.defaultActiveTabKey,U=e.tabBarExtraContent,I=e.hoverable,W=e.tabProps,L=void 0===W?{}:W,R=O(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),J=b("card",f),G=0===F.padding||"0px"===F.padding?{padding:24}:void 0,V=r.createElement("div",{className:"".concat(J,"-loading-block")}),q=r.createElement("div",{className:"".concat(J,"-loading-content"),style:G},r.createElement(p.a,{gutter:8},r.createElement(h.a,{span:22},V)),r.createElement(p.a,{gutter:8},r.createElement(h.a,{span:8},V),r.createElement(h.a,{span:15},V)),r.createElement(p.a,{gutter:8},r.createElement(h.a,{span:6},V),r.createElement(h.a,{span:18},V)),r.createElement(p.a,{gutter:8},r.createElement(h.a,{span:13},V),r.createElement(h.a,{span:9},V)),r.createElement(p.a,{gutter:8},r.createElement(h.a,{span:4},V),r.createElement(h.a,{span:3},V),r.createElement(h.a,{span:16},V))),Q=void 0!==M,X=Object(n.a)(Object(n.a)({},L),(t={},Object(c.a)(t,Q?"activeKey":"defaultActiveKey",Q?M:K),Object(c.a)(t,"tabBarExtraContent",U),t)),Y=B&&B.length?r.createElement(j.a,Object(n.a)({size:"large"},X,{className:"".concat(J,"-head-tabs"),onChange:function(t){var a;null===(a=e.onTabChange)||void 0===a||a.call(e,t)}}),B.map((function(e){return r.createElement(j.a.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(w||y||Y)&&(l=r.createElement("div",{className:"".concat(J,"-head"),style:C},r.createElement("div",{className:"".concat(J,"-head-wrapper")},w&&r.createElement("div",{className:"".concat(J,"-head-title")},w),y&&r.createElement("div",{className:"".concat(J,"-extra")},y)),Y));var Z=D?r.createElement("div",{className:"".concat(J,"-cover")},D):null,$=r.createElement("div",{className:"".concat(J,"-body"),style:F},S?q:H),_=T&&T.length?r.createElement("ul",{className:"".concat(J,"-actions")},function(e){return e.map((function(t,a){return r.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(a)},r.createElement("span",null,t))}))}(T)):null,ee=Object(s.a)(R,["onTabChange"]),te=k||x,ae=o()(J,(a={},Object(c.a)(a,"".concat(J,"-loading"),S),Object(c.a)(a,"".concat(J,"-bordered"),A),Object(c.a)(a,"".concat(J,"-hoverable"),I),Object(c.a)(a,"".concat(J,"-contain-grid"),function(){var t;return r.Children.forEach(e.children,(function(e){e&&e.type&&e.type===m&&(t=!0)})),t}()),Object(c.a)(a,"".concat(J,"-contain-tabs"),B&&B.length),Object(c.a)(a,"".concat(J,"-").concat(te),te),Object(c.a)(a,"".concat(J,"-type-").concat(P),!!P),Object(c.a)(a,"".concat(J,"-rtl"),"rtl"===u),a),g);return r.createElement("div",Object(n.a)({},ee,{className:ae}),l,Z,$,_)};x.Grid=m,x.Meta=u;t.a=x},587:function(e,t,a){"use strict";a.r(t);a(0);var c=a(2);t.default=function(e){var t=e.name,a=e.desc;return Object(c.jsxs)("div",{className:"mb-3",children:[Object(c.jsxs)("span",{className:"font-weight-bold text-dark",children:[t,":"]}),Object(c.jsxs)("span",{className:"text-gray-light",children:[" ",a]})]})}},620:function(e,t,a){"use strict";t.a={'code[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em",background:"#1d1f21"},':not(pre) > code[class*="language-"]':{background:"#1d1f21",padding:".1em",borderRadius:".3em"},comment:{color:"#7C7C7C"},prolog:{color:"#7C7C7C"},doctype:{color:"#7C7C7C"},cdata:{color:"#7C7C7C"},punctuation:{color:"#c5c8c6"},".namespace":{Opacity:".7"},property:{color:"#96CBFE"},keyword:{color:"#96CBFE"},tag:{color:"#96CBFE"},"class-name":{color:"#FFFFB6",textDecoration:"underline"},boolean:{color:"#99CC99"},constant:{color:"#99CC99"},symbol:{color:"#f92672"},deleted:{color:"#f92672"},number:{color:"#FF73FD"},selector:{color:"#A8FF60"},"attr-name":{color:"#A8FF60"},string:{color:"#A8FF60"},char:{color:"#A8FF60"},builtin:{color:"#A8FF60"},inserted:{color:"#A8FF60"},variable:{color:"#C6C5FE"},operator:{color:"#EDEDED"},entity:{color:"#FFFFB6",cursor:"help"},url:{color:"#96CBFE"},".language-css .token.string":{color:"#87C38A"},".style .token.string":{color:"#87C38A"},atrule:{color:"#F9EE98"},"attr-value":{color:"#F9EE98"},function:{color:"#DAD085"},regex:{color:"#E9C062"},important:{color:"#fd971f",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}}}]);
//# sourceMappingURL=20.1a1c3605.chunk.js.map