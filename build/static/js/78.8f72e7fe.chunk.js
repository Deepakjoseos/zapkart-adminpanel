(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[78],{3430:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(45),r=a(24),s=a.n(r),l=a(70),i=a(61),o=a(92),u=a(596),d=a(197),m=a(508),p=a(586),b=a(123),j=a(719),h=a(245),f=a(602),O=a(160),v=a(521),x=a(594),g=a(138),y=a(50),w=a(151),C={},E="/templates";C.getTemplates=Object(l.a)(s.a.mark((function e(){var t,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(w.a)({url:"".concat(E),method:"get"});case 3:return t=e.sent,a=t.data.filter((function(e){return"Deleted"!==e.status})),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0,"show-err");case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),C.deleteTemplate=function(){var e=Object(l.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(w.a)({url:"".concat(E,"/").concat(t),method:"delete"});case 3:return a=e.sent,e.abrupt("return",a);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0,"show-err");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),C.getTemplateById=function(){var e=Object(l.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(w.a)({url:"".concat(E,"/").concat(t),method:"get"});case 3:return a=e.sent,e.abrupt("return",a.data);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0,"show-err");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),C.createTemplate=function(){var e=Object(l.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(w.a)({url:E,method:"post",data:t});case 3:return a=e.sent,e.abrupt("return",a);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0,"show-err");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),C.editTemplate=function(){var e=Object(l.a)(s.a.mark((function e(t,a){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(w.a)({url:"".concat(E,"/").concat(t),method:"put",data:a});case 3:return n=e.sent,e.abrupt("return",n);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0,"show-err");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,a){return e.apply(this,arguments)}}();var S=C,T=a(584),k=a(2),N=o.a.Option,I=function(e){return"Active"===e?Object(k.jsx)(k.Fragment,{children:Object(k.jsx)(u.a,{color:"green",children:"Active"})}):"Hold"===e?Object(k.jsx)(k.Fragment,{children:Object(k.jsx)(u.a,{color:"red",children:"Hold"})}):null},_=function(){var e=Object(c.g)(),t=Object(n.useState)([]),a=Object(i.a)(t,2),r=a[0],u=a[1],w=Object(n.useState)([]),C=Object(i.a)(w,2),E=C[0],_=C[1],P=Object(n.useState)([]),D=Object(i.a)(P,2),M=D[0],A=D[1],F=Object(n.useState)([]),q=Object(i.a)(F,2),R=(q[0],q[1]),K=Object(n.useState)([]),L=Object(i.a)(K,2),H=L[0],Y=L[1],z=function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.a.getConstants();case 2:(t=e.sent)&&Y(Object.values(t.GENERAL.STATUS));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){var e=function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.getTemplates();case 2:(t=e.sent)&&(u(t),_(t),console.log(t,"show-data"));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e(),z()}),[]);var B=function(t){e.push("/app/dashboards/template/edit-template/".concat(t.id))},V=function(){var e=Object(l.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.deleteTemplate(t.id);case 2:e.sent&&("id",a=r,M.length>1?M.forEach((function(e){a=y.a.deleteArrayRow(a,"id",e.id),u(a),A([])})):(a=y.a.deleteArrayRow(a,"id",t.id),u(a)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=[{title:"Template",dataIndex:"name",sorter:function(e,t){return y.a.antdTableSorter(e,t,"name")}},{title:"Listing Type",dataIndex:"listingType"},{title:"Status",dataIndex:"status",render:function(e){return Object(k.jsx)(g.a,{alignItems:"center",children:I(e)})},sorter:function(e,t){return y.a.antdTableSorter(e,t,"status")}},{title:"",dataIndex:"actions",render:function(e,t){return Object(k.jsx)("div",{className:"text-right",children:Object(k.jsx)(x.a,{menu:(a=t,Object(k.jsxs)(d.a,{children:[Object(k.jsx)(d.a.Item,{onClick:function(){return B(a)},children:Object(k.jsxs)(g.a,{alignItems:"center",children:[Object(k.jsx)(h.a,{}),Object(k.jsx)("span",{className:"ml-2",children:"View Details"})]})}),Object(k.jsx)(d.a.Item,{onClick:function(){return V(a)},children:Object(k.jsxs)(g.a,{alignItems:"center",children:[Object(k.jsx)(f.a,{}),Object(k.jsx)("span",{className:"ml-2",children:M.length>0?"Delete (".concat(M.length,")"):"Delete"})]})})]}))})});var a}}];return Object(k.jsxs)(p.a,{children:[Object(k.jsxs)(g.a,{alignItems:"center",justifyContent:"between",mobileFlex:!1,children:[Object(k.jsxs)(g.a,{className:"mb-1",mobileFlex:!1,children:[Object(k.jsx)("div",{className:"mr-md-3 mb-3",children:Object(k.jsx)(m.a,{placeholder:"Search",prefix:Object(k.jsx)(O.a,{}),onChange:function(e){return function(e){var t=e.currentTarget.value,a=e.currentTarget.value?r:E,n=y.a.wildCardSearch(a,t);u(n),R([])}(e)}})}),Object(k.jsx)("div",{className:"mb-3",children:Object(k.jsxs)(o.a,{className:"w-100",style:{minWidth:180},placeholder:"Status",children:[Object(k.jsx)(N,{value:"",children:"All"}),H.map((function(e){return Object(k.jsx)(N,{value:e,children:e},e.id)}))]})})]}),Object(k.jsx)("div",{children:Object(k.jsx)(b.a,{onClick:function(){e.push("/app/dashboards/template/add-template")},type:"primary",icon:Object(k.jsx)(v.a,{}),block:!0,children:"Add Template"})})]}),Object(k.jsx)("div",{className:"table-responsive",children:Object(k.jsx)(j.a,{columns:W,dataSource:r,rowKey:"id"})})]})},P=a(599),D=a(585),M=a(723),A=a(248),F=a(579),q=a(580),R=a(516),K=a(162),L=a(770),H=a(246),Y=a.n(H),z=o.a.Option,B={name:[{required:!0,message:"Required"}],listingType:[{required:!0,message:"Required"}],status:[{required:!0,message:"Required"}],emailSubject:[{required:!0,message:"Required"}],emailContent:[{required:!0,message:"Required"}],smsTemplateId:[{required:!0,message:"Required"}],smsContent:[{required:!0,message:"Required"}]},V=function(e){var t=e.form,a=e.tempConstants,n=e.form_statuses;return console.log("constants",a),Object(k.jsx)(F.a,{gutter:16,children:Object(k.jsxs)(q.a,{xs:24,sm:24,md:24,children:[Object(k.jsxs)(p.a,{title:"Basic Info",children:[Object(k.jsx)(M.a.Item,{name:"name",label:"Name",rules:B.name,children:Object(k.jsx)(m.a,{placeholder:"Name"})}),Object(k.jsx)(M.a.Item,{name:"listingType",label:"Listing Type",rules:B.listingType,children:Object(k.jsx)(o.a,{placeholder:"Listing Type",showSearch:!0,optionFilterProp:"children",filterOption:function(e,t){return t.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:(null===a||void 0===a?void 0:a.LISTING_TYPES)&&Object.values(a.LISTING_TYPES).map((function(e){return Object(k.jsx)(z,{value:e,children:e})}))})}),Object(k.jsx)(M.a.Item,{name:"status",label:"Status",rules:B.status,children:Object(k.jsx)(o.a,{placeholder:"Status",children:n.map((function(e){return Object(k.jsx)(z,{value:e,children:e},e.id)}))})})]}),Object(k.jsx)(p.a,{title:"Email",children:Object(k.jsxs)(F.a,{gutter:16,children:[Object(k.jsxs)(q.a,{xs:24,sm:24,md:16,children:[Object(k.jsx)(M.a.Item,{name:"emailSubject",label:"Email Subject",rules:B.emailSubject,children:Object(k.jsx)(m.a,{placeholder:"Email Subject"})}),Object(k.jsx)(M.a.Item,{name:"emailContent",label:"Email Content",rules:B.emailContent,children:Object(k.jsx)(L.a,{placeholder:"Write something...",editorHtml:t.getFieldValue("emailContent")||"",onChange:function(e){return t.setFieldsValue({emailContent:e})},name:"emailContent"})})]}),Object(k.jsxs)(q.a,{xs:24,sm:24,md:8,children:[Object(k.jsx)("h5",{children:"Copy Keys"}),Object(k.jsx)("div",{style:{height:"445px",overflow:"auto",padding:"0 16px",border:"1px solid rgba(140, 140, 140, 0.35)"},children:Object(k.jsx)(R.b,{dataSource:(null===a||void 0===a?void 0:a.KEYS)?Object.values(a.KEYS):[],renderItem:function(e){return Object(k.jsxs)(R.b.Item,{children:[Object(k.jsx)(R.b.Item.Meta,{title:e}),Object(k.jsx)(Y.a,{text:e,onCopy:function(){return K.a.success({message:"Copied To Clipboard"})},children:Object(k.jsx)(b.a,{type:"primary",children:"Copy"})})]},e)}})})]}),Object(k.jsx)(q.a,{xs:24,sm:24,md:16,children:Object(k.jsx)(M.a.Item,{name:"emailStatus",label:"Status",rules:B.status,children:Object(k.jsx)(o.a,{placeholder:"Status",children:n.map((function(e){return Object(k.jsx)(z,{value:e,children:e},e.id)}))})})})]})}),Object(k.jsx)(p.a,{title:"SMS",children:Object(k.jsxs)(F.a,{gutter:16,children:[Object(k.jsxs)(q.a,{xs:24,sm:24,md:16,children:[Object(k.jsx)(M.a.Item,{name:"smsTemplateId",label:"SMS Template Id",rules:B.smsTemplateId,children:Object(k.jsx)(m.a,{placeholder:"SMS Template Id"})}),Object(k.jsx)(M.a.Item,{name:"smsContent",label:"SMS Content",rules:B.smsContent,children:Object(k.jsx)(L.a,{placeholder:"Write something...",editorHtml:t.getFieldValue("smsContent")||"",onChange:function(e){return t.setFieldsValue({smsContent:e})},name:"smsContent"})})]}),Object(k.jsxs)(q.a,{xs:24,sm:24,md:8,children:[Object(k.jsx)("h5",{children:"Copy Keys"}),Object(k.jsx)("div",{style:{height:"445px",overflow:"auto",padding:"0 16px",border:"1px solid rgba(140, 140, 140, 0.35)"},children:Object(k.jsx)(R.b,{dataSource:(null===a||void 0===a?void 0:a.KEYS)?Object.values(a.KEYS):[],renderItem:function(e){return Object(k.jsxs)(R.b.Item,{children:[Object(k.jsx)(R.b.Item.Meta,{title:e}),Object(k.jsx)(Y.a,{text:e,onCopy:function(){return K.a.success({message:"Copied To Clipboard"})},children:Object(k.jsx)(b.a,{type:"primary",children:"Copy"})})]},e)}})})]}),Object(k.jsx)(q.a,{xs:24,sm:24,md:16,children:Object(k.jsx)(M.a.Item,{name:"smsStatus",label:"Status",rules:B.status,children:Object(k.jsx)(o.a,{placeholder:"Status",children:n.map((function(e){return Object(k.jsx)(z,{value:e,children:e},e.id)}))})})})]})}),Object(k.jsx)(p.a,{title:"FCM",children:Object(k.jsxs)(F.a,{gutter:16,children:[Object(k.jsxs)(q.a,{xs:24,sm:24,md:16,children:[Object(k.jsx)(M.a.Item,{name:"fcmTitle",label:"FCM Title",rules:B.fcmTitle,children:Object(k.jsx)(m.a,{placeholder:"FCM Title"})}),Object(k.jsx)(M.a.Item,{name:"fcmDescription",label:"FCM Description",rules:B.fcmDescription,children:Object(k.jsx)(L.a,{placeholder:"Write something...",editorHtml:t.getFieldValue("fcmDescription")||"",onChange:function(e){return t.setFieldsValue({fcmDescription:e})},name:"fcmDescription"})})]}),Object(k.jsxs)(q.a,{xs:24,sm:24,md:8,children:[Object(k.jsx)("h5",{children:"Copy Keys"}),Object(k.jsx)("div",{style:{height:"445px",overflow:"auto",padding:"0 16px",border:"1px solid rgba(140, 140, 140, 0.35)"},children:Object(k.jsx)(R.b,{dataSource:(null===a||void 0===a?void 0:a.KEYS)?Object.values(a.KEYS):[],renderItem:function(e){return Object(k.jsxs)(R.b.Item,{children:[Object(k.jsx)(R.b.Item.Meta,{title:e}),Object(k.jsx)(Y.a,{text:e,onCopy:function(){return K.a.success({message:"Copied To Clipboard"})},children:Object(k.jsx)(b.a,{type:"primary",children:"Copy"})})]},e)}})})]}),Object(k.jsx)(q.a,{xs:24,sm:24,md:16,children:Object(k.jsx)(M.a.Item,{name:"fcmStatus",label:"Status",rules:B.status,children:Object(k.jsx)(o.a,{placeholder:"Status",children:n.map((function(e){return Object(k.jsx)(z,{value:e,children:e},e.id)}))})})})]})})]})})},W=D.a.TabPane,G="EDIT",J=function(e){var t=e.mode,a=void 0===t?"ADD":t,r=e.param,o=Object(c.g)(),u=M.a.useForm(),d=Object(i.a)(u,1)[0],m=Object(n.useState)(!1),p=Object(i.a)(m,2),j=p[0],h=p[1],f=Object(n.useState)({}),O=Object(i.a)(f,2),v=O[0],x=O[1],y=Object(n.useState)(!1),w=Object(i.a)(y,2),C=(w[0],w[1]),E=Object(n.useState)([]),N=Object(i.a)(E,2),I=N[0],_=N[1];Object(n.useEffect)((function(){var e=function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.a.getConstants();case 2:(t=e.sent)&&(x(t.TEMPLATE),_(Object.values(t.GENERAL.FORM_STATUS)));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),(null===v||void 0===v?void 0:v.KEYS)&&console.log(Object.values(v.KEYS),"constanttyys"),Object(n.useEffect)((function(){if(a===G){var e=function(){var e=Object(l.a)(s.a.mark((function e(){var t,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.id,e.next=3,S.getTemplateById(t);case 3:(a=e.sent)?(d.setFieldsValue({name:a.name,status:a.status,listingType:a.listingType,emailSubject:a.email.subject,emailContent:a.email.content,emailStatus:a.email.status,smsTemplateId:a.sms.templateId,smsContent:a.sms.content,smsStatus:a.sms.status,fcmTitle:a.fcm.title,fcmDescription:a.fcm.description,fcmStatus:a.fcm.status}),C(!0)):o.replace("/app/dashboards/template/template-list");case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}}),[d,a,r,e]);var F=function(){var e=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:h(!0),d.validateFields().then(function(){var e=Object(l.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n={name:t.name,status:t.status,listingType:t.listingType,email:{subject:t.emailSubject,content:t.emailContent,status:t.emailStatus},sms:{templateId:t.smsTemplateId,content:t.smsContent,status:t.smsStatus},fcm:{title:t.fcmTitle,description:t.fcmDescription,status:t.fcmStatus}},"ADD"!==a){e.next=6;break}return e.next=4,S.createTemplate(n);case 4:e.sent&&(A.b.success("Created ".concat(t.name," to Template list")),o.goBack());case 6:if(a!==G){e.next=11;break}return e.next=9,S.editTemplate(r.id,n);case 9:e.sent&&(A.b.success("Edited ".concat(t.name," to Template list")),o.goBack());case 11:h(!1);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){h(!1),console.log("info",e),A.b.error("Please enter all required field ")}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(k.jsx)(k.Fragment,{children:Object(k.jsxs)(M.a,{layout:"vertical",form:d,name:"advanced_search",className:"ant-advanced-search-form",initialValues:{status:"Hold"},children:[Object(k.jsx)(P.a,{className:"border-bottom",overlap:!0,children:Object(k.jsx)("div",{className:"container",children:Object(k.jsxs)(g.a,{className:"py-2",mobileFlex:!1,justifyContent:"between",alignItems:"center",children:[Object(k.jsxs)("h2",{className:"mb-3",children:["ADD"===a?"Add New Template":"Edit Template"," "]}),Object(k.jsxs)("div",{className:"mb-3",children:[Object(k.jsx)(b.a,{className:"mr-2",onClick:function(){return o.push("/app/dashboards/template/template-list")},children:"Discard"}),Object(k.jsx)(b.a,{type:"primary",onClick:function(){return F()},htmlType:"submit",loading:j,children:"ADD"===a?"Add":"Save"})]})]})})}),Object(k.jsx)("div",{className:"container",children:Object(k.jsx)(D.a,{defaultActiveKey:"1",style:{marginTop:30},children:Object(k.jsx)(W,{tab:"General",children:Object(k.jsx)(V,{tempConstants:v,form:d,form_statuses:I})},"1")})})]})})},U=function(){return Object(k.jsx)(J,{mode:"ADD"})},$=function(e){return Object(k.jsx)(J,{mode:"EDIT",param:e.match.params})};t.default=function(e){var t=e.match;return Object(k.jsxs)(c.d,{children:[Object(k.jsx)(c.a,{exact:!0,from:"".concat(t.url),to:"".concat(t.url,"/template-list")}),Object(k.jsx)(c.b,{path:"".concat(t.url,"/add-template"),component:U}),Object(k.jsx)(c.b,{path:"".concat(t.url,"/edit-template/:id"),component:$}),Object(k.jsx)(c.b,{path:"".concat(t.url,"/template-list"),component:_})]})}},584:function(e,t,a){"use strict";var n=a(24),c=a.n(n),r=a(70),s=a(151),l={};l.getConstants=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(s.a)({url:"/constants",method:"get"});case 3:return t=e.sent,e.abrupt("return",t);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0,"show-err");case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),t.a=l},586:function(e,t,a){"use strict";var n=a(5),c=a(3),r=a(0),s=a(6),l=a.n(s),i=a(38),o=a(46),u=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a},d=function(e){var t=e.prefixCls,a=e.className,s=e.hoverable,i=void 0===s||s,d=u(e,["prefixCls","className","hoverable"]);return r.createElement(o.a,null,(function(e){var s=(0,e.getPrefixCls)("card",t),o=l()("".concat(s,"-grid"),a,Object(n.a)({},"".concat(s,"-grid-hoverable"),i));return r.createElement("div",Object(c.a)({},d,{className:o}))}))},m=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a},p=function(e){return r.createElement(o.a,null,(function(t){var a=t.getPrefixCls,n=e.prefixCls,s=e.className,i=e.avatar,o=e.title,u=e.description,d=m(e,["prefixCls","className","avatar","title","description"]),p=a("card",n),b=l()("".concat(p,"-meta"),s),j=i?r.createElement("div",{className:"".concat(p,"-meta-avatar")},i):null,h=o?r.createElement("div",{className:"".concat(p,"-meta-title")},o):null,f=u?r.createElement("div",{className:"".concat(p,"-meta-description")},u):null,O=h||f?r.createElement("div",{className:"".concat(p,"-meta-detail")},h,f):null;return r.createElement("div",Object(c.a)({},d,{className:b}),j,O)}))},b=a(585),j=a(579),h=a(580),f=a(58),O=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a};var v=function(e){var t,a,s,u=r.useContext(o.b),m=u.getPrefixCls,p=u.direction,v=r.useContext(f.b),x=e.prefixCls,g=e.className,y=e.extra,w=e.headStyle,C=void 0===w?{}:w,E=e.bodyStyle,S=void 0===E?{}:E,T=e.title,k=e.loading,N=e.bordered,I=void 0===N||N,_=e.size,P=e.type,D=e.cover,M=e.actions,A=e.tabList,F=e.children,q=e.activeTabKey,R=e.defaultActiveTabKey,K=e.tabBarExtraContent,L=e.hoverable,H=e.tabProps,Y=void 0===H?{}:H,z=O(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),B=m("card",x),V=0===S.padding||"0px"===S.padding?{padding:24}:void 0,W=r.createElement("div",{className:"".concat(B,"-loading-block")}),G=r.createElement("div",{className:"".concat(B,"-loading-content"),style:V},r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:22},W)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:8},W),r.createElement(h.a,{span:15},W)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:6},W),r.createElement(h.a,{span:18},W)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:13},W),r.createElement(h.a,{span:9},W)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:4},W),r.createElement(h.a,{span:3},W),r.createElement(h.a,{span:16},W))),J=void 0!==q,U=Object(c.a)(Object(c.a)({},Y),(t={},Object(n.a)(t,J?"activeKey":"defaultActiveKey",J?q:R),Object(n.a)(t,"tabBarExtraContent",K),t)),$=A&&A.length?r.createElement(b.a,Object(c.a)({size:"large"},U,{className:"".concat(B,"-head-tabs"),onChange:function(t){var a;null===(a=e.onTabChange)||void 0===a||a.call(e,t)}}),A.map((function(e){return r.createElement(b.a.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(T||y||$)&&(s=r.createElement("div",{className:"".concat(B,"-head"),style:C},r.createElement("div",{className:"".concat(B,"-head-wrapper")},T&&r.createElement("div",{className:"".concat(B,"-head-title")},T),y&&r.createElement("div",{className:"".concat(B,"-extra")},y)),$));var Q=D?r.createElement("div",{className:"".concat(B,"-cover")},D):null,X=r.createElement("div",{className:"".concat(B,"-body"),style:S},k?G:F),Z=M&&M.length?r.createElement("ul",{className:"".concat(B,"-actions")},function(e){return e.map((function(t,a){return r.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(a)},r.createElement("span",null,t))}))}(M)):null,ee=Object(i.a)(z,["onTabChange"]),te=_||v,ae=l()(B,(a={},Object(n.a)(a,"".concat(B,"-loading"),k),Object(n.a)(a,"".concat(B,"-bordered"),I),Object(n.a)(a,"".concat(B,"-hoverable"),L),Object(n.a)(a,"".concat(B,"-contain-grid"),function(){var t;return r.Children.forEach(e.children,(function(e){e&&e.type&&e.type===d&&(t=!0)})),t}()),Object(n.a)(a,"".concat(B,"-contain-tabs"),A&&A.length),Object(n.a)(a,"".concat(B,"-").concat(te),te),Object(n.a)(a,"".concat(B,"-type-").concat(P),!!P),Object(n.a)(a,"".concat(B,"-rtl"),"rtl"===p),a),g);return r.createElement("div",Object(c.a)({},ee,{className:ae}),s,Q,X,Z)};v.Grid=d,v.Meta=p;t.a=v},594:function(e,t,a){"use strict";a(0);var n=a(506),c=a(197),r=a(168),s=a(2),l=function(e){return Object(s.jsx)(n.a,{overlay:e.menu,placement:e.placement,trigger:["click"],children:Object(s.jsx)("div",{className:"ellipsis-dropdown",children:Object(s.jsx)(r.a,{})})})};l.defaultProps={trigger:"click",placement:"bottomRight",menu:Object(s.jsx)(c.a,{})},t.a=l},596:function(e,t,a){"use strict";var n=a(5),c=a(3),r=a(8),s=a(0),l=a(6),i=a.n(l),o=a(38),u=a(124),d=a(46),m=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a},p=function(e){var t,a=e.prefixCls,r=e.className,l=e.checked,o=e.onChange,u=e.onClick,p=m(e,["prefixCls","className","checked","onChange","onClick"]),b=(0,s.useContext(d.b).getPrefixCls)("tag",a),j=i()(b,(t={},Object(n.a)(t,"".concat(b,"-checkable"),!0),Object(n.a)(t,"".concat(b,"-checkable-checked"),l),t),r);return s.createElement("span",Object(c.a)({},p,{className:j,onClick:function(e){null===o||void 0===o||o(!l),null===u||void 0===u||u(e)}}))},b=a(155),j=a(156),h=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a},f=new RegExp("^(".concat(b.a.join("|"),")(-inverse)?$")),O=new RegExp("^(".concat(b.b.join("|"),")$")),v=function(e,t){var a,l=e.prefixCls,m=e.className,p=e.style,b=e.children,v=e.icon,x=e.color,g=e.onClose,y=e.closeIcon,w=e.closable,C=void 0!==w&&w,E=h(e,["prefixCls","className","style","children","icon","color","onClose","closeIcon","closable"]),S=s.useContext(d.b),T=S.getPrefixCls,k=S.direction,N=s.useState(!0),I=Object(r.a)(N,2),_=I[0],P=I[1];s.useEffect((function(){"visible"in E&&P(E.visible)}),[E.visible]);var D=function(){return!!x&&(f.test(x)||O.test(x))},M=Object(c.a)({backgroundColor:x&&!D()?x:void 0},p),A=D(),F=T("tag",l),q=i()(F,(a={},Object(n.a)(a,"".concat(F,"-").concat(x),A),Object(n.a)(a,"".concat(F,"-has-color"),x&&!A),Object(n.a)(a,"".concat(F,"-hidden"),!_),Object(n.a)(a,"".concat(F,"-rtl"),"rtl"===k),a),m),R=function(e){e.stopPropagation(),null===g||void 0===g||g(e),e.defaultPrevented||"visible"in E||P(!1)},K="onClick"in E||b&&"a"===b.type,L=Object(o.a)(E,["visible"]),H=v||null,Y=H?s.createElement(s.Fragment,null,H,s.createElement("span",null,b)):b,z=s.createElement("span",Object(c.a)({},L,{ref:t,className:q,style:M}),Y,C?y?s.createElement("span",{className:"".concat(F,"-close-icon"),onClick:R},y):s.createElement(u.a,{className:"".concat(F,"-close-icon"),onClick:R}):null);return K?s.createElement(j.a,null,z):z},x=s.forwardRef(v);x.displayName="Tag",x.CheckableTag=p;t.a=x},599:function(e,t,a){"use strict";var n=a(61),c=a(0),r=a(37),s=a(28),l=a(2);t.a=Object(r.b)((function(e){return{navType:e.theme.navType}}),{})((function(e){var t=e.children,a=e.background,r=e.className,i=e.overlap,o=e.navType,u=Object(c.useState)(0),d=Object(n.a)(u,2),m=d[0],p=d[1],b=Object(c.useRef)(null);Object(c.useEffect)((function(){if(o===s.d){var e=window.innerWidth,t=b.current.offsetWidth;p((e-t)/2)}}),[o]);return Object(l.jsx)("div",{ref:b,className:"page-header-alt ".concat(r||""," ").concat(i&&"overlap"),style:function(){var e={backgroundImage:a?"url(".concat(a,")"):"none"};return o===s.d&&(e.marginRight=-m,e.marginLeft=-m,e.paddingLeft=0,e.paddingRight=0),e}(),children:o===s.d?Object(l.jsx)("div",{className:"container",children:t}):Object(l.jsx)(l.Fragment,{children:t})})}))},602:function(e,t,a){"use strict";var n=a(1),c=a(0),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},s=a(9),l=function(e,t){return c.createElement(s.a,Object(n.a)(Object(n.a)({},e),{},{ref:t,icon:r}))};l.displayName="DeleteOutlined";t.a=c.forwardRef(l)},770:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(61),c=a(0),r=a(2);function s(e){window.tinymce.dom.Event.domLoaded=!0;var t=e.editorHtml,a=e.placeholder,s=e.onChange,l=e.name,i=Object(c.useState)(!1),o=Object(n.a)(i,2),u=o[0],d=o[1];return Object(c.useEffect)((function(){return setTimeout((function(){var e,t,a;window.tinymce.dom.Event.domLoaded=!0,d(!0),window.tinymce.init({selector:".".concat(l),plugins:"print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",imagetools_cors_hosts:["picsum.photos"],menubar:"file edit view insert format tools table help",toolbar:"undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",toolbar_sticky:!0,autosave_ask_before_unload:!0,autosave_interval:"30s",autosave_prefix:"{path}{query}-{id}-",autosave_restore_when_empty:!1,autosave_retention:"2m",image_advtab:!0,extended_valid_elements:"img[class|src|alt|title|width|loading=lazy]",link_list:[{title:"My page 1",value:"https://www.tiny.cloud"},{title:"My page 2",value:"http://www.moxiecode.com"}],image_list:[{title:"My page 1",value:"https://www.tiny.cloud"},{title:"My page 2",value:"http://www.moxiecode.com"}],image_class_list:[{title:"None",value:""},{title:"Some class",value:"class-name"}],importcss_append:!0,file_picker_callback:function(e,t,a){"file"===a.filetype&&e("https://www.google.com/logos/google.jpg",{text:"My text"}),"image"===a.filetype&&e("https://www.google.com/logos/google.jpg",{alt:"My alt text"}),"media"===a.filetype&&e("movie.mp4",{source2:"alt.ogg",poster:"https://www.google.com/logos/google.jpg"})},templates:[{title:"New Table",description:"creates a new table",content:'<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'},{title:"Starting my story",description:"A cure for writers block",content:"Once upon a time..."},{title:"New list with dates",description:"New List with dates",content:'<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'}],template_cdate_format:"[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",template_mdate_format:"[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",height:350,image_caption:!0,quickbars_selection_toolbar:"bold italic | quicklink h2 h3 blockquote quickimage quicktable",noneditable_noneditable_class:"mceNonEditable",toolbar_mode:"sliding",contextmenu:"link image imagetools table",content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"}),null===(e=window)||void 0===e||null===(t=e.tinymce)||void 0===t||null===(a=t.activeEditor)||void 0===a||a.on("change",(function(){s(window.tinymce.activeEditor.getContent()),console.log("the-content",window.tinymce.activeEditor.getContent())}))}),2e3),function(){var e,t;return null===(e=window)||void 0===e||null===(t=e.tinymce)||void 0===t?void 0:t.remove(".".concat(l))}}),[]),Object(r.jsx)("div",{children:Object(r.jsx)("div",{children:u?Object(r.jsx)("textarea",{hidden:!0,placeholder:a,className:l,onChange:s,name:l,children:t}):Object(r.jsx)("div",{children:"Loading....."})})})}s.defaultProps={placeholder:"Write something..."}}}]);
//# sourceMappingURL=78.8f72e7fe.chunk.js.map