(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[86],{1138:function(e,t,c){"use strict";var a=c(1),s=c(0),n={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M820 436h-40c-4.4 0-8 3.6-8 8v40c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8zm32-104H732V120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM360 180h304v152H360V180zm304 664H360V568h304v276zm200-140H732V500H292v204H160V412c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v292z"}}]},name:"printer",theme:"outlined"},i=c(9),r=function(e,t){return s.createElement(i.a,Object(a.a)(Object(a.a)({},e),{},{ref:t,icon:n}))};r.displayName="PrinterOutlined";t.a=s.forwardRef(r)},3376:function(e,t,c){"use strict";c.r(t),c.d(t,"Invoice",(function(){return p}));var a=c(95),s=c(96),n=c(119),i=c(120),r=c(0),l=c(1138),d=c(644),o=c(576),j=c(122),h=[{key:"1",product:"Samsung Galaxy S20+",quantity:2,price:899},{key:"2",product:"SonicGear Evo 9 BTMI Speaker",quantity:1,price:199},{key:"3",product:"Sharp Aquos 40-Inch Easy Smart LED TV",quantity:1,price:977}],u=c(670),b=c(2),x=d.a.Column,p=function(e){Object(n.a)(c,e);var t=Object(i.a)(c);function c(){return Object(a.a)(this,c),t.apply(this,arguments)}return Object(s.a)(c,[{key:"total",value:function(){var e=0;return h.forEach((function(t){e+=t.price})),e}},{key:"render",value:function(){return Object(b.jsx)("div",{className:"container",children:Object(b.jsxs)(o.a,{children:[Object(b.jsxs)("div",{className:"d-md-flex justify-content-md-between",children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("img",{src:"/img/logo.png",alt:""}),Object(b.jsx)("address",{children:Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{className:"font-weight-semibold text-dark font-size-md",children:"Emilus, Inc."}),Object(b.jsx)("br",{}),Object(b.jsx)("span",{children:"9498 Harvard Street"}),Object(b.jsx)("br",{}),Object(b.jsx)("span",{children:"Fairfield, Chicago Town 06824"}),Object(b.jsx)("br",{}),Object(b.jsx)("abbr",{className:"text-dark",title:"Phone",children:"Phone:"}),Object(b.jsx)("span",{children:"(123) 456-7890"})]})})]}),Object(b.jsxs)("div",{className:"mt-3 text-right",children:[Object(b.jsx)("h2",{className:"mb-1 font-weight-semibold",children:"Invoice #9972"}),Object(b.jsx)("p",{children:"25/7/2018"}),Object(b.jsx)("address",{children:Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{className:"font-weight-semibold text-dark font-size-md",children:"Genting Holdings."}),Object(b.jsx)("br",{}),Object(b.jsx)("span",{children:"8626 Maiden Dr. "}),Object(b.jsx)("br",{}),Object(b.jsx)("span",{children:"Niagara Falls, New York 14304"})]})})]})]}),Object(b.jsxs)("div",{className:"mt-4",children:[Object(b.jsxs)(d.a,{dataSource:h,pagination:!1,className:"mb-5",children:[Object(b.jsx)(x,{title:"No.",dataIndex:"key"},"key"),Object(b.jsx)(x,{title:"Product",dataIndex:"product"},"product"),Object(b.jsx)(x,{title:"Quantity",dataIndex:"quantity"},"quantity"),Object(b.jsx)(x,{title:"Price",render:function(e){return Object(b.jsx)(u.a,{displayType:"text",value:(Math.round(100*e.price)/100).toFixed(2),prefix:"$",thousandSeparator:!0})}},"price"),Object(b.jsx)(x,{title:"Total",render:function(e){return Object(b.jsx)(u.a,{displayType:"text",value:(Math.round(e.price*e.quantity*100)/100).toFixed(2),prefix:"$",thousandSeparator:!0})}},"total")]}),Object(b.jsx)("div",{className:"d-flex justify-content-end",children:Object(b.jsxs)("div",{className:"text-right ",children:[Object(b.jsxs)("div",{className:"border-bottom",children:[Object(b.jsxs)("p",{className:"mb-2",children:[Object(b.jsx)("span",{children:"Sub - Total amount: "}),Object(b.jsx)(u.a,{displayType:"text",value:(Math.round(100*this.total())/100).toFixed(2),prefix:"$",thousandSeparator:!0})]}),Object(b.jsxs)("p",{children:["vat (10%) : ",(Math.round(this.total()/100*10*100)/100).toFixed(2)]})]}),Object(b.jsxs)("h2",{className:"font-weight-semibold mt-3",children:[Object(b.jsx)("span",{className:"mr-1",children:"Grand Total: "}),Object(b.jsx)(u.a,{displayType:"text",value:(Math.round(100*this.total())/100-this.total()/100*10).toFixed(2),prefix:"$",thousandSeparator:!0})]})]})}),Object(b.jsx)("p",{className:"mt-5",children:Object(b.jsx)("small",{children:"In exceptional circumstances, Financial Services can provide an urgent manually processed special cheque. Note, however, that urgent special cheques should be requested only on an emergency basis as manually produced cheques involve duplication of effort and considerable staff resources. Requests need to be supported by a letter explaining the circumstances to justify the special cheque payment"})})]}),Object(b.jsx)("hr",{className:"d-print-none"}),Object(b.jsx)("div",{className:"text-right d-print-none",children:Object(b.jsxs)(j.a,{type:"primary",onClick:function(){return window.print()},children:[Object(b.jsx)(l.a,{type:"printer"}),Object(b.jsx)("span",{className:"ml-1",children:"Print"})]})})]})})}}]),c}(r.Component);t.default=p}}]);
//# sourceMappingURL=86.0127df2e.chunk.js.map