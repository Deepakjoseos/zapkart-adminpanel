(this.webpackJsonpecommerce=this.webpackJsonpecommerce||[]).push([[95],{1159:function(e,s,t){"use strict";var a=t(62),c=t(0),i=t(37),r=t(550),n=t(1076),l=t(716),o=t(638),m=t(511),d=t(125),j=t(41),u=t(46),h=t(1145),b=t(2),g={email:[{required:!0,message:"Please input your email address"},{type:"email",message:"Please enter a validate email!"}],password:[{required:!0,message:"Please input your password"}],confirm:[{required:!0,message:"Please confirm your password!"},function(e){var s=e.getFieldValue;return{validator:function(e,t){return t&&s("password")!==t?Promise.reject("Passwords do not match!"):Promise.resolve()}}}]},x={signUp:j.m,showAuthMessage:j.d,hideAuthMessage:j.b,showLoading:j.e};s.a=Object(i.b)((function(e){var s=e.auth;return{loading:s.loading,message:s.message,showMessage:s.showMessage,token:s.token,redirect:s.redirect}}),x)((function(e){var s=e.signUp,t=e.showLoading,i=e.token,j=e.loading,x=e.redirect,p=e.message,O=e.showMessage,f=e.hideAuthMessage,w=e.allowRedirect,v=l.a.useForm(),y=Object(a.a)(v,1)[0],k=Object(u.g)();return Object(c.useEffect)((function(){null!==i&&w&&k.push(x),O&&setTimeout((function(){f()}),3e3)})),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(h.a.div,{initial:{opacity:0,marginBottom:0},animate:{opacity:O?1:0,marginBottom:O?20:0},children:Object(b.jsx)(o.a,{type:"error",showIcon:!0,message:p})}),Object(b.jsxs)(l.a,{form:y,layout:"vertical",name:"register-form",onFinish:function(){y.validateFields().then((function(e){t(),s(e)})).catch((function(e){console.log("Validate Failed:",e)}))},children:[Object(b.jsx)(l.a.Item,{name:"email",label:"Email",rules:g.email,hasFeedback:!0,children:Object(b.jsx)(m.a,{prefix:Object(b.jsx)(r.a,{className:"text-primary"})})}),Object(b.jsx)(l.a.Item,{name:"password",label:"Password",rules:g.password,hasFeedback:!0,children:Object(b.jsx)(m.a.Password,{prefix:Object(b.jsx)(n.a,{className:"text-primary"})})}),Object(b.jsx)(l.a.Item,{name:"confirm",label:"ConfirmPassword",rules:g.confirm,hasFeedback:!0,children:Object(b.jsx)(m.a.Password,{prefix:Object(b.jsx)(n.a,{className:"text-primary"})})}),Object(b.jsx)(l.a.Item,{children:Object(b.jsx)(d.a,{type:"primary",htmlType:"submit",block:!0,loading:j,children:"Sign Up"})})]})]})}))},3435:function(e,s,t){"use strict";t.r(s);var a=t(16),c=(t(0),t(1159)),i=t(582),r=t(583),n=t(37),l=t(2),o={backgroundImage:"url(".concat("/img/others/img-17.jpg",")"),backgroundRepeat:"no-repeat",backgroundSize:"cover"};s.default=function(e){var s=Object(n.d)((function(e){return e.theme.currentTheme}));return Object(l.jsx)("div",{className:"h-100 ".concat("light"===s?"bg-white":""),children:Object(l.jsxs)(i.a,{justify:"center",className:"align-items-stretch h-100",children:[Object(l.jsx)(r.a,{xs:20,sm:20,md:24,lg:16,children:Object(l.jsx)("div",{className:"container d-flex flex-column justify-content-center h-100",children:Object(l.jsx)(i.a,{justify:"center",children:Object(l.jsxs)(r.a,{xs:24,sm:24,md:20,lg:12,xl:8,children:[Object(l.jsx)("h1",{children:"Sign Up"}),Object(l.jsxs)("p",{children:["Already have an account? ",Object(l.jsx)("a",{href:"/auth/login-2",children:"Sign In"})]}),Object(l.jsx)("div",{className:"mt-4",children:Object(l.jsx)(c.a,Object(a.a)({},e))})]})})})}),Object(l.jsx)(r.a,{xs:0,sm:0,md:0,lg:8,children:Object(l.jsxs)("div",{className:"d-flex flex-column justify-content-between h-100 px-4",style:o,children:[Object(l.jsx)("div",{className:"text-right",children:Object(l.jsx)("img",{src:"/img/logo-white.png",alt:"logo"})}),Object(l.jsx)(i.a,{justify:"center",children:Object(l.jsxs)(r.a,{xs:0,sm:0,md:0,lg:20,children:[Object(l.jsx)("img",{className:"img-fluid mb-5",src:"/img/others/img-19.png",alt:""}),Object(l.jsx)("h1",{className:"text-white",children:"Welcome to emilus"}),Object(l.jsx)("p",{className:"text-white",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque."})]})})]})})]})})}},582:function(e,s,t){"use strict";var a=t(276);s.a=a.a},583:function(e,s,t){"use strict";var a=t(270);s.a=a.a}}]);
//# sourceMappingURL=95.3aa31428.chunk.js.map