(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[91],{3417:function(e,t,a){"use strict";a.r(t);var c=a(25),n=a.n(c),r=a(76),l=a(67),s=a(0),i=a(720),o=a(161),m=a(568),d=a(569),b=a(576),u=a(505),p=a(122),j=a(534),h=a(37),v=a(72),f=a(2),y={backgroundImage:"url(/img/others/img-17.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover"};t.default=function(){var e=i.a.useForm(),t=Object(l.a)(e,1)[0],a=Object(s.useState)(!1),c=Object(l.a)(a,2),O=c[0],g=c[1],x=Object(h.d)((function(e){return e.theme.currentTheme})),E=function(){var e=Object(r.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(!0),a={url:"https://ecommercenewbackend.riolabz.com/auth/login",handleCodeInApp:!0},e.next=4,v.a.sendPasswordResetEmail(t.email,a).then((function(){g(!1),o.a.success({message:"Please check your email",description:"Email is sent to ".concat(t.email,". Click the link in the email to reset your password.")})})).catch((function(e){o.a.error({message:"Error",description:e.message}),g(!1)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(f.jsx)("div",{className:"h-100",style:y,children:Object(f.jsx)("div",{className:"container d-flex flex-column justify-content-center h-100",children:Object(f.jsx)(m.a,{justify:"center",children:Object(f.jsx)(d.a,{xs:20,sm:20,md:20,lg:9,children:Object(f.jsx)(b.a,{children:Object(f.jsxs)("div",{className:"my-2",children:[Object(f.jsxs)("div",{className:"text-center",children:[Object(f.jsx)("img",{className:"img-fluid",src:"/img/".concat("light"===x?"logo.png":"logo-white.png"),alt:""}),Object(f.jsx)("h3",{className:"mt-3 font-weight-bold",children:"Forgot Password?"}),Object(f.jsx)("p",{className:"mb-4",children:"Enter your Email to reset password"})]}),Object(f.jsx)(m.a,{justify:"center",children:Object(f.jsx)(d.a,{xs:24,sm:24,md:20,lg:20,children:Object(f.jsxs)(i.a,{form:t,layout:"vertical",name:"forget-password",onFinish:E,children:[Object(f.jsx)(i.a.Item,{name:"email",rules:[{required:!0,message:"Please input your email address"},{type:"email",message:"Please enter a validate email!"}],children:Object(f.jsx)(u.a,{placeholder:"Email Address",prefix:Object(f.jsx)(j.a,{className:"text-primary"})})}),Object(f.jsx)(i.a.Item,{children:Object(f.jsx)(p.a,{loading:O,type:"primary",htmlType:"submit",block:!0,children:O?"Sending":"Send"})})]})})})]})})})})})})}},576:function(e,t,a){"use strict";var c=a(5),n=a(3),r=a(0),l=a(6),s=a.n(l),i=a(38),o=a(46),m=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a},d=function(e){var t=e.prefixCls,a=e.className,l=e.hoverable,i=void 0===l||l,d=m(e,["prefixCls","className","hoverable"]);return r.createElement(o.a,null,(function(e){var l=(0,e.getPrefixCls)("card",t),o=s()("".concat(l,"-grid"),a,Object(c.a)({},"".concat(l,"-grid-hoverable"),i));return r.createElement("div",Object(n.a)({},d,{className:o}))}))},b=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a},u=function(e){return r.createElement(o.a,null,(function(t){var a=t.getPrefixCls,c=e.prefixCls,l=e.className,i=e.avatar,o=e.title,m=e.description,d=b(e,["prefixCls","className","avatar","title","description"]),u=a("card",c),p=s()("".concat(u,"-meta"),l),j=i?r.createElement("div",{className:"".concat(u,"-meta-avatar")},i):null,h=o?r.createElement("div",{className:"".concat(u,"-meta-title")},o):null,v=m?r.createElement("div",{className:"".concat(u,"-meta-description")},m):null,f=h||v?r.createElement("div",{className:"".concat(u,"-meta-detail")},h,v):null;return r.createElement("div",Object(n.a)({},d,{className:p}),j,f)}))},p=a(575),j=a(568),h=a(569),v=a(58),f=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a};var y=function(e){var t,a,l,m=r.useContext(o.b),b=m.getPrefixCls,u=m.direction,y=r.useContext(v.b),O=e.prefixCls,g=e.className,x=e.extra,E=e.headStyle,N=void 0===E?{}:E,w=e.bodyStyle,C=void 0===w?{}:w,P=e.title,k=e.loading,S=e.bordered,T=void 0===S||S,I=e.size,K=e.type,z=e.cover,A=e.actions,B=e.tabList,F=e.children,J=e.activeTabKey,L=e.defaultActiveTabKey,R=e.tabBarExtraContent,q=e.hoverable,G=e.tabProps,M=void 0===G?{}:G,D=f(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),H=b("card",O),Q=0===C.padding||"0px"===C.padding?{padding:24}:void 0,U=r.createElement("div",{className:"".concat(H,"-loading-block")}),V=r.createElement("div",{className:"".concat(H,"-loading-content"),style:Q},r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:22},U)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:8},U),r.createElement(h.a,{span:15},U)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:6},U),r.createElement(h.a,{span:18},U)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:13},U),r.createElement(h.a,{span:9},U)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:4},U),r.createElement(h.a,{span:3},U),r.createElement(h.a,{span:16},U))),W=void 0!==J,X=Object(n.a)(Object(n.a)({},M),(t={},Object(c.a)(t,W?"activeKey":"defaultActiveKey",W?J:L),Object(c.a)(t,"tabBarExtraContent",R),t)),Y=B&&B.length?r.createElement(p.a,Object(n.a)({size:"large"},X,{className:"".concat(H,"-head-tabs"),onChange:function(t){var a;null===(a=e.onTabChange)||void 0===a||a.call(e,t)}}),B.map((function(e){return r.createElement(p.a.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(P||x||Y)&&(l=r.createElement("div",{className:"".concat(H,"-head"),style:N},r.createElement("div",{className:"".concat(H,"-head-wrapper")},P&&r.createElement("div",{className:"".concat(H,"-head-title")},P),x&&r.createElement("div",{className:"".concat(H,"-extra")},x)),Y));var Z=z?r.createElement("div",{className:"".concat(H,"-cover")},z):null,$=r.createElement("div",{className:"".concat(H,"-body"),style:C},k?V:F),_=A&&A.length?r.createElement("ul",{className:"".concat(H,"-actions")},function(e){return e.map((function(t,a){return r.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(a)},r.createElement("span",null,t))}))}(A)):null,ee=Object(i.a)(D,["onTabChange"]),te=I||y,ae=s()(H,(a={},Object(c.a)(a,"".concat(H,"-loading"),k),Object(c.a)(a,"".concat(H,"-bordered"),T),Object(c.a)(a,"".concat(H,"-hoverable"),q),Object(c.a)(a,"".concat(H,"-contain-grid"),function(){var t;return r.Children.forEach(e.children,(function(e){e&&e.type&&e.type===d&&(t=!0)})),t}()),Object(c.a)(a,"".concat(H,"-contain-tabs"),B&&B.length),Object(c.a)(a,"".concat(H,"-").concat(te),te),Object(c.a)(a,"".concat(H,"-type-").concat(K),!!K),Object(c.a)(a,"".concat(H,"-rtl"),"rtl"===u),a),g);return r.createElement("div",Object(n.a)({},ee,{className:ae}),l,Z,$,_)};y.Grid=d,y.Meta=u;t.a=y}}]);
//# sourceMappingURL=91.383cf06b.chunk.js.map