(this.webpackJsonpecommerce=this.webpackJsonpecommerce||[]).push([[93],{1205:function(e){e.exports=JSON.parse('[{"id":"AL","val":"01"},{"id":"AK","val":"02"},{"id":"AS","val":"60"},{"id":"AZ","val":"04"},{"id":"AR","val":"05"},{"id":"CA","val":"06"},{"id":"CO","val":"08"},{"id":"CT","val":"09"},{"id":"DE","val":"10"},{"id":"DC","val":"11"},{"id":"FL","val":"12"},{"id":"FM","val":"64"},{"id":"GA","val":"13"},{"id":"GU","val":"66"},{"id":"HI","val":"15"},{"id":"ID","val":"16"},{"id":"IL","val":"17"},{"id":"IN","val":"18"},{"id":"IA","val":"19"},{"id":"KS","val":"20"},{"id":"KY","val":"21"},{"id":"LA","val":"22"},{"id":"ME","val":"23"},{"id":"MH","val":"68"},{"id":"MD","val":"24"},{"id":"MA","val":"25"},{"id":"MI","val":"26"},{"id":"MN","val":"27"},{"id":"MS","val":"28"},{"id":"MO","val":"29"},{"id":"MT","val":"30"},{"id":"NE","val":"31"},{"id":"NV","val":"32"},{"id":"NH","val":"33"},{"id":"NJ","val":"34"},{"id":"NM","val":"35"},{"id":"NY","val":"36"},{"id":"NC","val":"37"},{"id":"ND","val":"38"},{"id":"MP","val":"69"},{"id":"OH","val":"39"},{"id":"OK","val":"40"},{"id":"OR","val":"41"},{"id":"PW","val":"70"},{"id":"PA","val":"42"},{"id":"PR","val":"72"},{"id":"RI","val":"44"},{"id":"SC","val":"45"},{"id":"SD","val":"46"},{"id":"TN","val":"47"},{"id":"TX","val":"48"},{"id":"UM","val":"74"},{"id":"UT","val":"49"},{"id":"VT","val":"50"},{"id":"VA","val":"51"},{"id":"VI","val":"78"},{"id":"WA","val":"53"},{"id":"WV","val":"54"},{"id":"WI","val":"55"},{"id":"WY","val":"56"}]')},3386:function(e,t,o){"use strict";o.r(t),o.d(t,"SimpleMap",(function(){return pe}));var r=o(98),a=o(99),n=o(122),c=o(123),i=o(0),s=o.n(i),l=o(579),d=o(580),j=o.p+"static/media/index.8fe56979.md",p=o.p+"static/media/BasicAnnotation.614181e2.md",u=o.p+"static/media/BasicMarker.5ae9cc58.md",h=o.p+"static/media/BasicWorldMap.2d4caaca.md",b=o.p+"static/media/CustomMarker.335936fb.md",m=o.p+"static/media/EuropeMapWithGraticule.8edb5f6c.md",f=o.p+"static/media/Graticule.a7119a74.md",g=o.p+"static/media/MapChartWithTexture.d8c47ff7.md",O=o.p+"static/media/MapChartWithTooltip.b3ae5c11.md",x=o.p+"static/media/ChoroplethMapQuantile.104c6f36.md",v=o.p+"static/media/ChoroplethMapQuantize.79051edc.md",y=o.p+"static/media/StateMap.2e6b9bb8.md",C=o.p+"static/media/ChoroplethMap.35e8381e.md",k=o.p+"static/media/ZoomingAndPannning.6f19649d.md",D=o(648),A=o(2),E=function(e){Object(n.a)(o,e);var t=Object(c.a)(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(a.a)(o,[{key:"render",value:function(){return Object(A.jsxs)(D.ComposableMap,{projection:"geoAzimuthalEqualArea",height:200,projectionConfig:{rotate:[-20,-52,0],scale:700},children:[Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",fill:"#D6D6DA",stroke:"#FFFFFF",strokeWidth:.5,children:function(e){return e.geographies.map((function(e){return Object(A.jsx)(D.Geography,{geography:e},e.rsmKey)}))}}),Object(A.jsx)(D.Annotation,{subject:[2.3522,48.8566],dx:-90,dy:-30,connectorProps:{stroke:"#FF5533",strokeWidth:3,strokeLinecap:"round"},children:Object(A.jsx)("text",{x:"-8",textAnchor:"end",alignmentBaseline:"middle",fill:"#F53",children:"Paris"})})]})}}]),o}(i.Component),M=E,G=[{markerOffset:-15,name:"Buenos Aires",coordinates:[-58.3816,-34.6037]},{markerOffset:-15,name:"La Paz",coordinates:[-68.1193,-16.4897]},{markerOffset:25,name:"Brasilia",coordinates:[-47.8825,-15.7942]},{markerOffset:25,name:"Santiago",coordinates:[-70.6693,-33.4489]},{markerOffset:25,name:"Bogota",coordinates:[-74.0721,4.711]},{markerOffset:25,name:"Quito",coordinates:[-78.4678,-.1807]},{markerOffset:-15,name:"Georgetown",coordinates:[-58.1551,6.8013]},{markerOffset:-15,name:"Asuncion",coordinates:[-57.5759,-25.2637]},{markerOffset:25,name:"Paramaribo",coordinates:[-55.2038,5.852]},{markerOffset:25,name:"Montevideo",coordinates:[-56.1645,-34.9011]},{markerOffset:-15,name:"Caracas",coordinates:[-66.9036,10.4806]},{markerOffset:-15,name:"Lima",coordinates:[-77.0428,-12.0464]}],S=function(e){Object(n.a)(o,e);var t=Object(c.a)(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(a.a)(o,[{key:"render",value:function(){return Object(A.jsxs)(D.ComposableMap,{projection:"geoAzimuthalEqualArea",height:200,projectionConfig:{rotate:[58,20,0],scale:250},children:[Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",children:function(e){return e.geographies.filter((function(e){return"Americas"===e.properties.REGION_UN})).map((function(e){return Object(A.jsx)(D.Geography,{geography:e,fill:"#EAEAEC",stroke:"#D6D6DA"},e.rsmKey)}))}}),G.map((function(e){var t=e.name,o=e.coordinates,r=e.markerOffset;return Object(A.jsxs)(D.Marker,{coordinates:o,children:[Object(A.jsx)("circle",{r:5,fill:"#F00",stroke:"#fff",strokeWidth:2}),Object(A.jsx)("text",{textAnchor:"middle",y:r,style:{fontFamily:"system-ui",fill:"#5D5A6D"},children:t})]},t)}))]})}}]),o}(i.Component),F=S,w=function(e){Object(n.a)(o,e);var t=Object(c.a)(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(a.a)(o,[{key:"render",value:function(){return Object(A.jsx)(D.ComposableMap,{height:200,projectionConfig:{scale:100},children:Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",children:function(e){return e.geographies.map((function(e){return Object(A.jsx)(D.Geography,{geography:e},e.rsmKey)}))}})})}}]),o}(i.Component),B=w,N=[{markerOffset:15,name:"Paramaribo",coordinates:[-55.2038,5.852]},{markerOffset:15,name:"Montevideo",coordinates:[-56.1645,-34.9011]},{markerOffset:15,name:"Lima",coordinates:[-77.0428,-12.0464]}],z=function(e){Object(n.a)(o,e);var t=Object(c.a)(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(a.a)(o,[{key:"render",value:function(){return Object(A.jsxs)(D.ComposableMap,{projection:"geoAzimuthalEqualArea",height:200,projectionConfig:{rotate:[58,20,0],scale:150},children:[Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",children:function(e){return e.geographies.filter((function(e){return"Americas"===e.properties.REGION_UN})).map((function(e){return Object(A.jsx)(D.Geography,{geography:e,fill:"#EAEAEC",stroke:"#D6D6DA"},e.rsmKey)}))}}),N.map((function(e){var t=e.name,o=e.coordinates,r=e.markerOffset;return Object(A.jsxs)(D.Marker,{coordinates:o,children:[Object(A.jsxs)("g",{fill:"none",stroke:"#FF5533",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",transform:"translate(-12, -24)",children:[Object(A.jsx)("circle",{cx:"12",cy:"10",r:"3"}),Object(A.jsx)("path",{d:"M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"})]}),Object(A.jsx)("text",{textAnchor:"middle",y:r,style:{fontFamily:"system-ui",fill:"#5D5A6D"},children:t})]},t)}))]})}}]),o}(i.Component),T=z,W=function(e){Object(n.a)(o,e);var t=Object(c.a)(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(a.a)(o,[{key:"render",value:function(){return Object(A.jsxs)(D.ComposableMap,{projection:"geoAzimuthalEqualArea",height:200,projectionConfig:{rotate:[-20,-52,0],scale:300},children:[Object(A.jsx)(D.Graticule,{stroke:"#EAEAEC"}),Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",children:function(e){return e.geographies.map((function(e){return Object(A.jsx)(D.Geography,{geography:e,fill:"#9998A3",stroke:"#EAEAEC"},e.rsmKey)}))}})]})}}]),o}(i.Component),I=W,L=function(e){Object(n.a)(o,e);var t=Object(c.a)(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(a.a)(o,[{key:"render",value:function(){return Object(A.jsxs)(D.ComposableMap,{projectionConfig:{scale:80},height:200,children:[Object(A.jsx)(D.Graticule,{stroke:"#F53"}),Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",children:function(e){return e.geographies.map((function(e){return Object(A.jsx)(D.Geography,{geography:e},e.rsmKey)}))}})]})}}]),o}(i.Component),H=L,K=o(3411),P=["BRA","VNM","COL","IDN","ETH","HND","IND","UGA","MEX","GTM","PER","NIC","CHN","CIV","CRI","KEN","PNG","TZA","SLV","ECU","CMR","LAO","MDG","GAB","THA","VEN","DOM","HTI","COD","RWA","BDI","PHL","TGO","GIN","YEM","CUB","PAN","BOL","TLS","CAF","NGA","GHA","SLE","AGO","JAM","PRY","MWI","TTO","ZWE","LBR"];function V(e){return e?new Array(361).fill(1).map((function(t,o){return[-180+o,e]})):[[-180,0],[-90,0],[0,0],[90,0],[180,0]]}var R=function(e){Object(n.a)(o,e);var t=Object(c.a)(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(a.a)(o,[{key:"render",value:function(){return Object(A.jsxs)(D.ComposableMap,{projection:"geoEqualEarth",height:200,projectionConfig:{scale:80},children:[Object(A.jsx)(K.a,{id:"lines",height:6,width:6,stroke:"#776865",strokeWidth:1,background:"#F6F0E9",orientation:["diagonal"]}),Object(A.jsx)(D.Sphere,{stroke:"#DDD"}),Object(A.jsx)(D.Graticule,{stroke:"#DDD"}),Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",stroke:"#FFF",strokeWidth:.5,children:function(e){return e.geographies.map((function(e){var t=-1!==P.indexOf(e.properties.ISO_A3);return Object(A.jsx)(D.Geography,{geography:e,fill:t?"url('#lines')":"#F6F0E9",onClick:function(){return console.log(e.properties.ISO_A3)}},e.rsmKey)}))}}),Object(A.jsx)(D.Line,{coordinates:V(0),stroke:"#F53",strokeWidth:2}),Object(A.jsx)(D.Line,{coordinates:V(23),stroke:"#776865",strokeWidth:1,strokeDasharray:[5,5]}),Object(A.jsx)(D.Line,{coordinates:V(-24),stroke:"#776865",strokeWidth:1,strokeDasharray:[5,5]})]})}}]),o}(i.Component),U=R,_=o(62),q=o(1125),J=function(e){var t=e.setTooltipContent;return Object(A.jsx)(D.ComposableMap,{"data-tip":"",height:200,projectionConfig:{scale:80},children:Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",children:function(e){return e.geographies.map((function(e){return Object(A.jsx)(D.Geography,{geography:e,onMouseEnter:function(){var o,r=e.properties,a=r.NAME,n=r.POP_EST;t("".concat(a," \u2014 ").concat((o=n)>1e9?Math.round(o/1e8)/10+"Bn":o>1e6?Math.round(o/1e5)/10+"M":Math.round(o/100)/10+"K"))},onMouseLeave:function(){t("")},style:{default:{fill:"#D6D6DA",outline:"none"},hover:{fill:"#F53",outline:"none"},pressed:{fill:"#E42",outline:"none"}}},e.rsmKey)}))}})})};function Y(){var e=Object(i.useState)(""),t=Object(_.a)(e,2),o=t[0],r=t[1];return Object(A.jsxs)("div",{children:[Object(A.jsx)(J,{setTooltipContent:r}),Object(A.jsx)(q.a,{children:o})]})}var Z=function(e){Object(n.a)(o,e);var t=Object(c.a)(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(a.a)(o,[{key:"render",value:function(){return Object(A.jsx)(Y,{})}}]),o}(i.Component),Q=Z,X=o(3407),$=o(3406),ee=function(){var e=Object(i.useState)([]),t=Object(_.a)(e,2),o=t[0],r=t[1];Object(i.useEffect)((function(){Object($.a)("/data/unemployment-by-county-2017.csv").then((function(e){r(e)}))}),[]);var a=Object(X.a)().domain(o.map((function(e){return e.unemployment_rate}))).range(["#ffedea","#ffcec5","#ffad9f","#ff8a75","#ff5533","#e2492d","#be3d26","#9a311f","#782618"]);return Object(A.jsx)(D.ComposableMap,{height:200,projectionConfig:{scale:450},projection:"geoAlbersUsa",children:Object(A.jsx)(D.Geographies,{geography:"https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json",children:function(e){return e.geographies.map((function(e){var t=o.find((function(t){return t.id===e.id}));return Object(A.jsx)(D.Geography,{geography:e,fill:t?a(t.unemployment_rate):"#EEE"},e.rsmKey)}))}})})},te=o(3369),oe=Object(te.a)().domain([1,10]).range(["#ffedea","#ffcec5","#ffad9f","#ff8a75","#ff5533","#e2492d","#be3d26","#9a311f","#782618"]),re=function(){var e=Object(i.useState)([]),t=Object(_.a)(e,2),o=t[0],r=t[1];return Object(i.useEffect)((function(){Object($.a)("/data/unemployment-by-county-2017.csv").then((function(e){r(e)}))}),[]),Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(D.ComposableMap,{height:200,projectionConfig:{scale:450},projection:"geoAlbersUsa",children:Object(A.jsx)(D.Geographies,{geography:"https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json",children:function(e){return e.geographies.map((function(e){var t=o.find((function(t){return t.id===e.id}));return Object(A.jsx)(D.Geography,{geography:e,fill:oe(t?t.unemployment_rate:"#EEE")},e.rsmKey)}))}})})})},ae=o(1251),ne=o(1205),ce={VT:[50,-8],NH:[34,2],MA:[30,-1],RI:[28,2],CT:[35,10],NJ:[34,1],DE:[33,0],MD:[47,10],DC:[49,21]},ie=function(){return Object(A.jsx)(D.ComposableMap,{height:200,projectionConfig:{scale:450},projection:"geoAlbersUsa",children:Object(A.jsx)(D.Geographies,{geography:"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json",children:function(e){var t=e.geographies;return Object(A.jsxs)(A.Fragment,{children:[t.map((function(e){return Object(A.jsx)(D.Geography,{stroke:"#FFF",geography:e,fill:"#DDD"},e.rsmKey)})),t.map((function(e){var t=Object(ae.a)(e),o=ne.find((function(t){return t.val===e.id}));return Object(A.jsx)("g",{children:o&&t[0]>-160&&t[0]<-67&&(-1===Object.keys(ce).indexOf(o.id)?Object(A.jsx)(D.Marker,{coordinates:t,children:Object(A.jsx)("text",{y:"2",fontSize:7,textAnchor:"middle",children:o.id})}):Object(A.jsx)(D.Annotation,{subject:t,dx:ce[o.id][0],dy:ce[o.id][1],children:Object(A.jsx)("text",{x:4,fontSize:7,alignmentBaseline:"middle",children:o.id})}))},e.rsmKey+"-name")}))]})}})})},se=o(1208),le=Object(se.a)().domain([.29,.68]).range(["#ffedea","#ff5233"]),de=function(){var e=Object(i.useState)([]),t=Object(_.a)(e,2),o=t[0],r=t[1];return Object(i.useEffect)((function(){Object($.a)("/data/vulnerability.csv").then((function(e){r(e)}))}),[]),Object(A.jsxs)(D.ComposableMap,{height:200,projectionConfig:{rotate:[-10,0,0],scale:80},children:[Object(A.jsx)(D.Sphere,{stroke:"#E4E5E6",strokeWidth:.5}),Object(A.jsx)(D.Graticule,{stroke:"#E4E5E6",strokeWidth:.5}),o.length>0&&Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",children:function(e){return e.geographies.map((function(e){var t=o.find((function(t){return t.ISO3===e.properties.ISO_A3}));return Object(A.jsx)(D.Geography,{geography:e,fill:t?le(t[2017]):"#F5F4F6"},e.rsmKey)}))}})]})},je=function(){return Object(A.jsx)("div",{children:Object(A.jsx)(D.ComposableMap,{height:200,projectionConfig:{scale:80},children:Object(A.jsx)(D.ZoomableGroup,{zoom:1,children:Object(A.jsx)(D.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",children:function(e){return e.geographies.map((function(e){return Object(A.jsx)(D.Geography,{geography:e},e.rsmKey)}))}})})})})},pe=function(e){Object(n.a)(o,e);var t=Object(c.a)(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(a.a)(o,[{key:"render",value:function(){return Object(A.jsxs)(s.a.Fragment,{children:[Object(A.jsx)(l.a,{code:p,children:Object(A.jsx)(M,{})}),Object(A.jsx)(l.a,{code:u,children:Object(A.jsx)(F,{})}),Object(A.jsx)(l.a,{code:h,children:Object(A.jsx)(B,{})}),Object(A.jsx)(l.a,{code:b,children:Object(A.jsx)(T,{})}),Object(A.jsx)(l.a,{code:m,children:Object(A.jsx)(I,{})}),Object(A.jsx)(l.a,{code:f,children:Object(A.jsx)(H,{})}),Object(A.jsx)(l.a,{code:g,children:Object(A.jsx)(U,{})}),Object(A.jsx)(l.a,{code:O,children:Object(A.jsx)(Q,{})}),Object(A.jsx)(l.a,{code:x,children:Object(A.jsx)(ee,{})}),Object(A.jsx)(l.a,{code:v,children:Object(A.jsx)(re,{})}),Object(A.jsx)(l.a,{code:y,children:Object(A.jsx)(ie,{})}),Object(A.jsx)(l.a,{code:C,children:Object(A.jsx)(de,{})}),Object(A.jsx)(l.a,{code:k,children:Object(A.jsx)(je,{})}),Object(A.jsx)(d.a,{code:j})]})}}]),o}(i.Component);t.default=pe},579:function(e,t,o){"use strict";var r=o(62),a=o(0),n=o.n(a),c=o(640),i=o.n(c),s=o(98),l=o(99),d=o(122),j=o(123),p=o(3441),u={'code[class*="language-"]':{color:"#a9b7c6",fontFamily:"Consolas, Monaco, 'Andale Mono', monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#a9b7c6",fontFamily:"Consolas, Monaco, 'Andale Mono', monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#2b2b2b"},'pre[class*="language-"]::-moz-selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'pre[class*="language-"] ::-moz-selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'code[class*="language-"]::-moz-selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'code[class*="language-"] ::-moz-selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'pre[class*="language-"]::selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'pre[class*="language-"] ::selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'code[class*="language-"]::selection':{color:"inherit",background:"rgba(33,66,131,.85)"},'code[class*="language-"] ::selection':{color:"inherit",background:"rgba(33,66,131,.85)"},':not(pre) > code[class*="language-"]':{background:"#2b2b2b",padding:".1em",borderRadius:".3em"},comment:{color:"#808080"},prolog:{color:"#808080"},cdata:{color:"#808080"},delimiter:{color:"#cc7832"},boolean:{color:"#cc7832"},keyword:{color:"#cc7832"},selector:{color:"#cc7832"},important:{color:"#cc7832"},atrule:{color:"#cc7832"},operator:{color:"#a9b7c6"},punctuation:{color:"#a9b7c6"},"attr-name":{color:"#a9b7c6"},tag:{color:"#e8bf6a"},"tag .punctuation":{color:"#e8bf6a"},doctype:{color:"#e8bf6a"},builtin:{color:"#e8bf6a"},entity:{color:"#6897bb"},number:{color:"#6897bb"},symbol:{color:"#6897bb"},property:{color:"#9876aa"},constant:{color:"#9876aa"},variable:{color:"#9876aa"},string:{color:"#6a8759"},char:{color:"#6a8759"},"attr-value":{color:"#a5c261"},"attr-value .punctuation":{color:"#a5c261"},"attr-value .punctuation:first-child":{color:"#a9b7c6"},url:{color:"#287bde",textDecoration:"underline"},function:{color:"#ffc66d"},regex:{background:"#364135"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},inserted:{background:"#294436"},deleted:{background:"#484a4a"},"code.language-css .token.property":{color:"#a9b7c6"},"code.language-css .token.property + .token.punctuation":{color:"#a9b7c6"},"code.language-css .token.id":{color:"#ffc66d"},"code.language-css .token.selector > .token.class":{color:"#ffc66d"},"code.language-css .token.selector > .token.attribute":{color:"#ffc66d"},"code.language-css .token.selector > .token.pseudo-class":{color:"#ffc66d"},"code.language-css .token.selector > .token.pseudo-element":{color:"#ffc66d"}},h=o(249),b=o(234),m=o(1115),f=o(1116),g=o(1117),O=o(153),x=o(2),v=function(e){Object(d.a)(o,e);var t=Object(j.a)(o);function o(){var e;Object(s.a)(this,o);for(var r=arguments.length,a=new Array(r),n=0;n<r;n++)a[n]=arguments[n];return(e=t.call.apply(t,[this].concat(a))).state={copied:!1,copyTooltipVisible:!1},e.handleCodeCopied=function(){e.setState({copied:!0})},e.onCopyTooltipVisibleChange=function(t){t?e.setState({copyTooltipVisible:t,copied:!1}):e.setState({copyTooltipVisible:t})},e}return Object(l.a)(o,[{key:"render",value:function(){var e=this,t=this.props,o=t.code,r=t.expand,a=t.isExpand,n=this.state,c=n.copied,i=n.copyTooltipVisible;return Object(x.jsxs)("div",{className:"code-box-actions",children:[Object(x.jsx)("span",{className:"code-box-icon mr-3 ".concat(c&&i?"text-success":""),children:Object(x.jsx)(O.a,{title:c?"Copied":"Copy code",visible:i,onVisibleChange:this.onCopyTooltipVisibleChange,children:Object(x.jsx)(h.CopyToClipboard,{text:o,onCopy:function(){return e.handleCodeCopied()},children:c?Object(x.jsx)(b.a,{}):Object(x.jsx)(m.a,{})})})}),Object(x.jsx)("span",{className:"code-box-icon",onClick:r,children:Object(x.jsx)(O.a,{title:a?"Hide code":"Show code",children:a?Object(x.jsx)(f.a,{}):Object(x.jsx)(g.a,{})})})]})}}]),o}(a.Component),y=v,C=function(e){Object(d.a)(o,e);var t=Object(j.a)(o);function o(){var e;Object(s.a)(this,o);for(var r=arguments.length,a=new Array(r),n=0;n<r;n++)a[n]=arguments[n];return(e=t.call.apply(t,[this].concat(a))).state={codeExpand:!1},e.exapandCallBack=function(){e.setState({codeExpand:!e.state.codeExpand})},e}return Object(l.a)(o,[{key:"render",value:function(){var e=this.props,t=e.language,o=e.value;return Object(x.jsxs)(n.a.Fragment,{children:[Object(x.jsx)(y,{code:o,expand:this.exapandCallBack,isExpand:this.state.codeExpand}),Object(x.jsx)("div",{className:"code-box-highlight ".concat(this.state.codeExpand?"d-block":"d-none"),children:Object(x.jsx)(p.a,{language:t,style:u,children:o})})]})}}]),o}(a.PureComponent);C.defaultProps={language:null};var k=C;t.a=function(e){var t=e.code,o=e.children,n="en-US: ",c=Object(a.useState)(""),s=Object(r.a)(c,2),l=s[0],d=s[1];return Object(a.useEffect)((function(){var e=!0;return fetch(t).then((function(e){return e.text()})).then((function(t){e&&d(t)})),function(){e=!1}}),[t]),Object(x.jsxs)("div",{className:"code-box",children:[Object(x.jsx)("section",{className:"code-box-demo",children:o}),Object(x.jsx)("section",{className:"code-box-description",children:Object(x.jsx)(i.a,{source:l,renderers:{heading:function(e){return Object(x.jsx)("h4",{children:e.children[0].props.value.includes(n)?e.children[0].props.value.replace(n,""):""})},thematicBreak:function(){return Object(x.jsx)(x.Fragment,{})},paragraph:function(e){return Object(x.jsx)(x.Fragment,{children:e.children[0].props.value.match(/[\u4e00-\u9faf]/)?"":Object(x.jsx)("p",{className:"mb-0",children:e.children})})},code:k}})})]})}},580:function(e,t,o){"use strict";var r=o(62),a=o(0),n=o.n(a),c=o(640),i=o.n(c),s=o(1211),l={hljs:{display:"block",overflowX:"auto",padding:"0.5em",background:"#1E1E1E",color:"#DCDCDC"},"hljs-keyword":{color:"#569CD6"},"hljs-literal":{color:"#569CD6"},"hljs-symbol":{color:"#569CD6"},"hljs-name":{color:"#569CD6"},"hljs-link":{color:"#569CD6",textDecoration:"underline"},"hljs-built_in":{color:"#4EC9B0"},"hljs-type":{color:"#4EC9B0"},"hljs-number":{color:"#B8D7A3"},"hljs-class":{color:"#B8D7A3"},"hljs-string":{color:"#D69D85"},"hljs-meta-string":{color:"#D69D85"},"hljs-regexp":{color:"#9A5334"},"hljs-template-tag":{color:"#9A5334"},"hljs-subst":{color:"#DCDCDC"},"hljs-function":{color:"#DCDCDC"},"hljs-title":{color:"#DCDCDC"},"hljs-params":{color:"#DCDCDC"},"hljs-formula":{color:"#DCDCDC"},"hljs-comment":{color:"#57A64A",fontStyle:"italic"},"hljs-quote":{color:"#57A64A",fontStyle:"italic"},"hljs-doctag":{color:"#608B4E"},"hljs-meta":{color:"#9B9B9B"},"hljs-meta-keyword":{color:"#9B9B9B"},"hljs-tag":{color:"#9B9B9B"},"hljs-variable":{color:"#BD63C5"},"hljs-template-variable":{color:"#BD63C5"},"hljs-attr":{color:"#9CDCFE"},"hljs-attribute":{color:"#9CDCFE"},"hljs-builtin-name":{color:"#9CDCFE"},"hljs-section":{color:"gold"},"hljs-emphasis":{fontStyle:"italic"},"hljs-strong":{fontWeight:"bold"},"hljs-bullet":{color:"#D7BA7D"},"hljs-selector-tag":{color:"#D7BA7D"},"hljs-selector-id":{color:"#D7BA7D"},"hljs-selector-class":{color:"#D7BA7D"},"hljs-selector-attr":{color:"#D7BA7D"},"hljs-selector-pseudo":{color:"#D7BA7D"},"hljs-addition":{backgroundColor:"#144212",display:"inline-block",width:"100%"},"hljs-deletion":{backgroundColor:"#600",display:"inline-block",width:"100%"}},d=o(2);t.a=function(e){var t=e.code,o=Object(a.useState)(""),c=Object(r.a)(o,2),j=c[0],p=c[1];return Object(a.useEffect)((function(){var e=!0;return fetch(t).then((function(e){return e.text()})).then((function(t){e&&p(t)})),function(){e=!1}}),[t]),Object(d.jsx)("div",{className:"api-container",children:Object(d.jsx)(i.a,{source:j,renderers:{heading:function(e){return Object(d.jsx)("div",{className:"api-title h".concat(e.level," ").concat(e.children[0].props.value.includes("title: ")?"":e.children[0].props.value.split("").join("").replace(/\s/g,"-").toLowerCase()),children:e.children[0].props.value.includes("title: ")?e.children[0].props.value.replace("title: ",""):e.children})},paragraph:function(e){return Object(d.jsx)(n.a.Fragment,{children:"text-2-1-0"===e.children[0].props.nodeKey?"":Object(d.jsx)("p",{children:e.children})})},code:function(e){return Object(d.jsx)("div",{className:"api-code-highligher",children:Object(d.jsx)(s.a,{style:l,children:e.value})})}}})})}}}]);
//# sourceMappingURL=93.00fae2a9.chunk.js.map