(this.webpackJsonpecommerce=this.webpackJsonpecommerce||[]).push([[84],{3387:function(e,t,o){"use strict";o.r(t),o.d(t,"Apex",(function(){return q}));var a=o(98),n=o(99),r=o(122),c=o(123),s=o(0),i=o.n(s),l=o(579),d=o(580),u=o(582),b=o(583),h=o.p+"static/media/index.82dcb03b.md",p=o.p+"static/media/BasicLine.24814a29.md",j=o.p+"static/media/DashedLine.6a789c22.md",f=o.p+"static/media/BasicArea.f7b76b9e.md",g=o.p+"static/media/SplineArea.f531104e.md",m=o.p+"static/media/BasicColumn.3818027a.md",O=o.p+"static/media/StackedColumn.04ab142d.md",x=o.p+"static/media/BasicBar.bc871df4.md",y=o.p+"static/media/GroupedBar.39ec1e8f.md",v=o.p+"static/media/Pie.a588bae5.md",C=o.p+"static/media/Donut.c5caaaa9.md",k=o(633),D=o.n(k),w=o(585),A=o(2),S=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[{name:"Desktops",data:[10,41,35,51,49,62,69,91,148]}],options:{chart:{type:"line",zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},colors:[w.e],xaxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]}}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,height:300})}}]),o}(s.Component),T=S,B=o(584),z=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[{name:"Session Duration",data:[45,52,38,24,33,26,21,20,6,8,15,10]},{name:"Page Views",data:[35,41,62,42,13,18,29,37,36,51,32,35]},{name:"Total Visits",data:[87,57,74,99,75,38,62,47,82,56,45,47]}],options:{chart:{height:350,type:"line",zoom:{enabled:!1}},colors:Object(B.a)(w.a),dataLabels:{enabled:!1},stroke:{width:[3,5,3],curve:"straight",dashArray:[0,8,5]},legend:{tooltipHoverFormatter:function(e,t){return e+" - "+t.w.globals.series[t.seriesIndex][t.dataPointIndex]}},markers:{size:0,hover:{sizeOffset:6}},xaxis:{categories:["01 Jan","02 Jan","03 Jan","04 Jan","05 Jan","06 Jan","07 Jan","08 Jan","09 Jan","10 Jan","11 Jan","12 Jan"]},tooltip:{y:[{title:{formatter:function(e){return e+" (mins)"}}},{title:{formatter:function(e){return e+" per session"}}},{title:{formatter:function(e){return e}}}]},grid:{borderColor:"#f1f1f1"}}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,height:300})}}]),o}(s.Component),N=z,M={monthDataSeries1:{prices:[8107.85,8128,8122.9,8165.5,8340.7,8423.7,8423.5,8514.3,8481.85,8487.7,8506.9,8626.2,8668.95,8602.3,8607.55,8512.9,8496.25,8600.65,8881.1,9340.85],dates:["13 Nov 2017","14 Nov 2017","15 Nov 2017","16 Nov 2017","17 Nov 2017","20 Nov 2017","21 Nov 2017","22 Nov 2017","23 Nov 2017","24 Nov 2017","27 Nov 2017","28 Nov 2017","29 Nov 2017","30 Nov 2017","01 Dec 2017","04 Dec 2017","05 Dec 2017","06 Dec 2017","07 Dec 2017","08 Dec 2017"]}},E=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[{name:"STOCK ABC",data:M.monthDataSeries1.prices}],options:{chart:{zoom:{enabled:!1}},colors:[w.c],fill:{type:"gradient",gradient:{shadeIntensity:1,opacityFrom:.7,opacityTo:.9,stops:[0,80,100]}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},labels:M.monthDataSeries1.dates,xaxis:{type:"datetime"},yaxis:{opposite:!0},legend:{horizontalAlign:"left"}}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,type:"area",height:300})}}]),o}(s.Component),F=E,J=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[{name:"series1",data:[31,40,28,51,42,109,100]},{name:"series2",data:[11,32,45,32,34,52,41]}],options:{dataLabels:{enabled:!1},colors:w.a,stroke:{curve:"smooth"},xaxis:{type:"datetime",categories:["2018-09-19T00:00:00.000Z","2018-09-19T01:30:00.000Z","2018-09-19T02:30:00.000Z","2018-09-19T03:30:00.000Z","2018-09-19T04:30:00.000Z","2018-09-19T05:30:00.000Z","2018-09-19T06:30:00.000Z"]},tooltip:{x:{format:"dd/MM/yy HH:mm"}}}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,type:"area",height:300})}}]),o}(s.Component),H=J,L=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[{name:"Net Profit",data:[44,55,57,56,61,58,63,60,66]},{name:"Revenue",data:[76,85,101,98,87,105,91,114,94]},{name:"Free Cash Flow",data:[35,41,36,26,45,48,52,53,41]}],options:{plotOptions:{bar:{horizontal:!1,columnWidth:"55%",endingShape:"rounded"}},colors:[w.c,w.e,w.g],dataLabels:{enabled:!1},stroke:{show:!0,width:2,colors:["transparent"]},xaxis:{categories:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"]},fill:{opacity:1},tooltip:{y:{formatter:function(e){return"$".concat(e," thousands")}}}}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,height:300,type:"bar"})}}]),o}(s.Component),P=L,I=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[{name:"PRODUCT A",data:[44,55,41,67,22,43]},{name:"PRODUCT B",data:[13,23,20,8,13,27]},{name:"PRODUCT C",data:[11,17,15,15,21,14]}],options:{chart:{stacked:!0,toolbar:{show:!0},zoom:{enabled:!0}},colors:[w.c,w.e,w.g],responsive:[{breakpoint:480,options:{legend:{position:"bottom",offsetX:-10,offsetY:0}}}],plotOptions:{bar:{horizontal:!1}},xaxis:{type:"datetime",categories:["01/01/2011 GMT","01/02/2011 GMT","01/03/2011 GMT","01/04/2011 GMT","01/05/2011 GMT","01/06/2011 GMT"]},legend:{position:"right",offsetY:40},fill:{opacity:1}}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,type:"bar",height:300})}}]),o}(s.Component),V=I,G=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[{data:[400,430,448,470,540,580,690,1100,1200,1380]}],options:{plotOptions:{bar:{horizontal:!0}},colors:w.a,dataLabels:{enabled:!1},xaxis:{categories:["South Korea","Canada","United Kingdom","Netherlands","Italy","France","Japan","United States","China","Germany"]}}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,type:"bar",height:300})}}]),o}(s.Component),W=G,Z=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[{data:[44,55,41,64]},{data:[53,32,33,52]}],options:{plotOptions:{bar:{horizontal:!0,dataLabels:{position:"top"}}},colors:w.a,dataLabels:{enabled:!0,offsetX:-6,style:{fontSize:"12px",colors:["#fff"]}},stroke:{show:!0,width:1,colors:["#fff"]},xaxis:{categories:[2001,2002,2003,2004]}}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,height:300,type:"bar"})}}]),o}(s.Component),R=Z,U=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[44,55,13,43,22],options:{colors:w.a,labels:["Team A","Team B","Team C","Team D","Team E"],responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}]}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,height:300,type:"pie"})}}]),o}(s.Component),K=U,Y=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){var e;Object(a.a)(this,o);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={series:[44,55,41,17,15],options:{colors:w.a,responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}]}},e}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.a,{options:this.state.options,series:this.state.series,height:300,type:"donut"})}}]),o}(s.Component),X=Y,q=function(e){Object(r.a)(o,e);var t=Object(c.a)(o);function o(){return Object(a.a)(this,o),t.apply(this,arguments)}return Object(n.a)(o,[{key:"render",value:function(){return Object(A.jsxs)(i.a.Fragment,{children:[Object(A.jsxs)(u.a,{gutter:16,type:"flex",children:[Object(A.jsxs)(b.a,{sm:24,md:24,lg:12,children:[Object(A.jsx)(l.a,{code:p,children:Object(A.jsx)(T,{})}),Object(A.jsx)(l.a,{code:f,children:Object(A.jsx)(F,{})}),Object(A.jsx)(l.a,{code:m,children:Object(A.jsx)(P,{})}),Object(A.jsx)(l.a,{code:x,children:Object(A.jsx)(W,{})}),Object(A.jsx)(l.a,{code:v,children:Object(A.jsx)(K,{})})]}),Object(A.jsxs)(b.a,{sm:24,md:24,lg:12,children:[Object(A.jsx)(l.a,{code:j,children:Object(A.jsx)(N,{})}),Object(A.jsx)(l.a,{code:g,children:Object(A.jsx)(H,{})}),Object(A.jsx)(l.a,{code:O,children:Object(A.jsx)(V,{})}),Object(A.jsx)(l.a,{code:y,children:Object(A.jsx)(R,{})}),Object(A.jsx)(l.a,{code:C,children:Object(A.jsx)(X,{})})]})]}),Object(A.jsx)(d.a,{code:h})]})}}]),o}(s.Component);t.default=q},579:function(e,t,o){"use strict";var a=o(62),n=o(0),r=o.n(n),c=o(640),s=o.n(c),i=o(98),l=o(99),d=o(122),u=o(123),b=o(3441),h={'code[class*="language-"]':{color:"#a9b7c6",fontFamily:"Consolas, Monaco, 'Andale Mono', monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#a9b7c6",fontFamily:"Consolas, Monaco, 'Andale Mono', monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#2b2b2b"},'pre[class*="language-"]::-moz-selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'pre[class*="language-"] ::-moz-selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'code[class*="language-"]::-moz-selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'code[class*="language-"] ::-moz-selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'pre[class*="language-"]::selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'pre[class*="language-"] ::selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'code[class*="language-"]::selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'code[class*="language-"] ::selection':{color:"inherit",background:"rgba(33,66,131,.85)"},':not(pre) > code[class*="language-"]':{background:"#2b2b2b",padding:".1em",borderRadius:".3em"},comment:{color:"#808080"},prolog:{color:"#808080"},cdata:{color:"#808080"},delimiter:{color:"#cc7832"},boolean:{color:"#cc7832"},keyword:{color:"#cc7832"},selector:{color:"#cc7832"},important:{color:"#cc7832"},atrule:{color:"#cc7832"},operator:{color:"#a9b7c6"},punctuation:{color:"#a9b7c6"},"attr-name":{color:"#a9b7c6"},tag:{color:"#e8bf6a"},"tag .punctuation":{color:"#e8bf6a"},doctype:{color:"#e8bf6a"},builtin:{color:"#e8bf6a"},entity:{color:"#6897bb"},number:{color:"#6897bb"},symbol:{color:"#6897bb"},property:{color:"#9876aa"},constant:{color:"#9876aa"},variable:{color:"#9876aa"},string:{color:"#6a8759"},char:{color:"#6a8759"},"attr-value":{color:"#a5c261"},"attr-value .punctuation":{color:"#a5c261"},"attr-value .punctuation:first-child":{color:"#a9b7c6"},url:{color:"#287bde",textDecoration:"underline"},function:{color:"#ffc66d"},regex:{background:"#364135"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},inserted:{background:"#294436"},deleted:{background:"#484a4a"},"code.language-css .token.property":{color:"#a9b7c6"},"code.language-css .token.property + .token.punctuation":{color:"#a9b7c6"},"code.language-css .token.id":{color:"#ffc66d"},"code.language-css .token.selector > .token.class":{color:"#ffc66d"},"code.language-css .token.selector > .token.attribute":{color:"#ffc66d"},"code.language-css .token.selector > .token.pseudo-class":{color:"#ffc66d"},"code.language-css .token.selector > .token.pseudo-element":{color:"#ffc66d"}},p=o(249),j=o(234),f=o(1115),g=o(1116),m=o(1117),O=o(153),x=o(2),y=function(e){Object(d.a)(o,e);var t=Object(u.a)(o);function o(){var e;Object(i.a)(this,o);for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))).state={copied:!1,copyTooltipVisible:!1},e.handleCodeCopied=function(){e.setState({copied:!0})},e.onCopyTooltipVisibleChange=function(t){t?e.setState({copyTooltipVisible:t,copied:!1}):e.setState({copyTooltipVisible:t})},e}return Object(l.a)(o,[{key:"render",value:function(){var e=this,t=this.props,o=t.code,a=t.expand,n=t.isExpand,r=this.state,c=r.copied,s=r.copyTooltipVisible;return Object(x.jsxs)("div",{className:"code-box-actions",children:[Object(x.jsx)("span",{className:"code-box-icon mr-3 ".concat(c&&s?"text-success":""),children:Object(x.jsx)(O.a,{title:c?"Copied":"Copy code",visible:s,onVisibleChange:this.onCopyTooltipVisibleChange,children:Object(x.jsx)(p.CopyToClipboard,{text:o,onCopy:function(){return e.handleCodeCopied()},children:c?Object(x.jsx)(j.a,{}):Object(x.jsx)(f.a,{})})})}),Object(x.jsx)("span",{className:"code-box-icon",onClick:a,children:Object(x.jsx)(O.a,{title:n?"Hide code":"Show code",children:n?Object(x.jsx)(g.a,{}):Object(x.jsx)(m.a,{})})})]})}}]),o}(n.Component),v=y,C=function(e){Object(d.a)(o,e);var t=Object(u.a)(o);function o(){var e;Object(i.a)(this,o);for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))).state={codeExpand:!1},e.exapandCallBack=function(){e.setState({codeExpand:!e.state.codeExpand})},e}return Object(l.a)(o,[{key:"render",value:function(){var e=this.props,t=e.language,o=e.value;return Object(x.jsxs)(r.a.Fragment,{children:[Object(x.jsx)(v,{code:o,expand:this.exapandCallBack,isExpand:this.state.codeExpand}),Object(x.jsx)("div",{className:"code-box-highlight ".concat(this.state.codeExpand?"d-block":"d-none"),children:Object(x.jsx)(b.a,{language:t,style:h,children:o})})]})}}]),o}(n.PureComponent);C.defaultProps={language:null};var k=C;t.a=function(e){var t=e.code,o=e.children,r="en-US: ",c=Object(n.useState)(""),i=Object(a.a)(c,2),l=i[0],d=i[1];return Object(n.useEffect)((function(){var e=!0;return fetch(t).then((function(e){return e.text()})).then((function(t){e&&d(t)})),function(){e=!1}}),[t]),Object(x.jsxs)("div",{className:"code-box",children:[Object(x.jsx)("section",{className:"code-box-demo",children:o}),Object(x.jsx)("section",{className:"code-box-description",children:Object(x.jsx)(s.a,{source:l,renderers:{heading:function(e){return Object(x.jsx)("h4",{children:e.children[0].props.value.includes(r)?e.children[0].props.value.replace(r,""):""})},thematicBreak:function(){return Object(x.jsx)(x.Fragment,{})},paragraph:function(e){return Object(x.jsx)(x.Fragment,{children:e.children[0].props.value.match(/[\u4e00-\u9faf]/)?"":Object(x.jsx)("p",{className:"mb-0",children:e.children})})},code:k}})})]})}},580:function(e,t,o){"use strict";var a=o(62),n=o(0),r=o.n(n),c=o(640),s=o.n(c),i=o(1211),l={hljs:{display:"block",overflowX:"auto",padding:"0.5em",background:"#1E1E1E",color:"#DCDCDC"},"hljs-keyword":{color:"#569CD6"},"hljs-literal":{color:"#569CD6"},"hljs-symbol":{color:"#569CD6"},"hljs-name":{color:"#569CD6"},"hljs-link":{color:"#569CD6",textDecoration:"underline"},"hljs-built_in":{color:"#4EC9B0"},"hljs-type":{color:"#4EC9B0"},"hljs-number":{color:"#B8D7A3"},"hljs-class":{color:"#B8D7A3"},"hljs-string":{color:"#D69D85"},"hljs-meta-string":{color:"#D69D85"},"hljs-regexp":{color:"#9A5334"},"hljs-template-tag":{color:"#9A5334"},"hljs-subst":{color:"#DCDCDC"},"hljs-function":{color:"#DCDCDC"},"hljs-title":{color:"#DCDCDC"},"hljs-params":{color:"#DCDCDC"},"hljs-formula":{color:"#DCDCDC"},"hljs-comment":{color:"#57A64A",fontStyle:"italic"},"hljs-quote":{color:"#57A64A",fontStyle:"italic"},"hljs-doctag":{color:"#608B4E"},"hljs-meta":{color:"#9B9B9B"},"hljs-meta-keyword":{color:"#9B9B9B"},"hljs-tag":{color:"#9B9B9B"},"hljs-variable":{color:"#BD63C5"},"hljs-template-variable":{color:"#BD63C5"},"hljs-attr":{color:"#9CDCFE"},"hljs-attribute":{color:"#9CDCFE"},"hljs-builtin-name":{color:"#9CDCFE"},"hljs-section":{color:"gold"},"hljs-emphasis":{fontStyle:"italic"},"hljs-strong":{fontWeight:"bold"},"hljs-bullet":{color:"#D7BA7D"},"hljs-selector-tag":{color:"#D7BA7D"},"hljs-selector-id":{color:"#D7BA7D"},"hljs-selector-class":{color:"#D7BA7D"},"hljs-selector-attr":{color:"#D7BA7D"},"hljs-selector-pseudo":{color:"#D7BA7D"},"hljs-addition":{backgroundColor:"#144212",display:"inline-block",width:"100%"},"hljs-deletion":{backgroundColor:"#600",display:"inline-block",width:"100%"}},d=o(2);t.a=function(e){var t=e.code,o=Object(n.useState)(""),c=Object(a.a)(o,2),u=c[0],b=c[1];return Object(n.useEffect)((function(){var e=!0;return fetch(t).then((function(e){return e.text()})).then((function(t){e&&b(t)})),function(){e=!1}}),[t]),Object(d.jsx)("div",{className:"api-container",children:Object(d.jsx)(s.a,{source:u,renderers:{heading:function(e){return Object(d.jsx)("div",{className:"api-title h".concat(e.level," ").concat(e.children[0].props.value.includes("title: ")?"":e.children[0].props.value.split("").join("").replace(/\s/g,"-").toLowerCase()),children:e.children[0].props.value.includes("title: ")?e.children[0].props.value.replace("title: ",""):e.children})},paragraph:function(e){return Object(d.jsx)(r.a.Fragment,{children:"text-2-1-0"===e.children[0].props.nodeKey?"":Object(d.jsx)("p",{children:e.children})})},code:function(e){return Object(d.jsx)("div",{className:"api-code-highligher",children:Object(d.jsx)(i.a,{style:l,children:e.value})})}}})})}},582:function(e,t,o){"use strict";var a=o(276);t.a=a.a},583:function(e,t,o){"use strict";var a=o(270);t.a=a.a},584:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));var a=o(201);var n=o(160);function r(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(n.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},585:function(e,t,o){"use strict";o.d(t,"c",(function(){return n})),o.d(t,"e",(function(){return r})),o.d(t,"g",(function(){return c})),o.d(t,"d",(function(){return s})),o.d(t,"f",(function(){return i})),o.d(t,"a",(function(){return l})),o.d(t,"b",(function(){return d})),o.d(t,"h",(function(){return u})),o.d(t,"i",(function(){return b})),o.d(t,"l",(function(){return h})),o.d(t,"j",(function(){return p})),o.d(t,"k",(function(){return j})),o.d(t,"m",(function(){return f})),o.d(t,"n",(function(){return g}));var a=o(16),n="#3e82f7",r="#04d182",c="#ffc107",s="rgba(62, 130, 247, 0.15)",i="rgba(4, 209, 130, 0.1)",l=[n,r,"#ff6b72",c,"#a461d8","#fa8c16","#17bcff"],d=[s,i,"rgba(222, 68, 54, 0.1)","rgba(255, 193, 7, 0.1)","rgba(139, 75, 157, 0.1)","rgba(250, 140, 22, .1)","rgba(23, 188, 255, 0.15)"],u="#edf2f9",b="#455560",h={chart:{zoom:{enabled:!1},toolbar:{show:!1}},colors:[].concat(l),dataLabels:{enabled:!1},stroke:{width:3,curve:"smooth",lineCap:"round"},legend:{position:"top",horizontalAlign:"right",offsetY:-15,itemMargin:{vertical:20},tooltipHoverFormatter:function(e,t){return e+" - "+t.w.globals.series[t.seriesIndex][t.dataPointIndex]}},xaxis:{categories:[]},grid:{xaxis:{lines:{show:!0}},yaxis:{lines:{show:!1}}}},p=Object(a.a)({},h),j={chart:{zoom:{enabled:!1},toolbar:{show:!1}},plotOptions:{bar:{horizontal:!1,columnWidth:"25px",startingShapre:"rounded",endingShape:"rounded"}},colors:[].concat(l),dataLabels:{enabled:!1},stroke:{show:!0,width:6,curve:"smooth",colors:["transparent"]},legend:{position:"top",horizontalAlign:"right",offsetY:-15,inverseOrder:!0,itemMargin:{vertical:20},tooltipHoverFormatter:function(e,t){return e+" - "+t.w.globals.series[t.seriesIndex][t.dataPointIndex]}},xaxis:{categories:[]},fill:{opacity:1},tooltip:{y:{formatter:function(e){return"".concat(e)}}}},f={colors:[].concat(l),plotOptions:{pie:{size:50,donut:{labels:{show:!0,total:{show:!0,showAlways:!0,label:"",fontSize:"18px",fontFamily:"Roboto",fontWeight:"bold",color:"#1a3353",formatter:function(e){return e.globals.seriesTotals.reduce((function(e,t){return e+t}),0)}}},size:"87%"}}},labels:[],dataLabels:{enabled:!1},legend:{show:!1}},g={chart:{type:"line",sparkline:{enabled:!0}},stroke:{width:2,curve:"smooth"},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}}}}]);
//# sourceMappingURL=84.daaa89af.chunk.js.map