(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f518f41"],{"3a66":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var o=i("fe6c"),r=i("58df");function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(r["a"])(Object(o["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}},"615b":function(t,e,i){},"8ce9":function(t,e,i){},b5b6:function(t,e,i){},ce7e6:function(t,e,i){"use strict";i("8e6e"),i("ac6a"),i("456d");var o=i("bd86"),r=(i("8ce9"),i("7560"));function a(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function s(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?a(i,!0).forEach((function(e){Object(o["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):a(i).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}e["a"]=r["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:s({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:s({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},d123:function(t,e,i){t.exports=i.p+"img/PolitechnikaPoznanska.c9eceb7a.png"},fd2d:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-footer",{attrs:{dark:""}},[i("v-card",{staticClass:"grey darken-4 white--text text-center",attrs:{flat:"",tile:""}},[i("v-card-text",t._l(t.socialMedia,(function(e){return i("v-btn",{key:e.icon,staticClass:"mx-4 white--text",attrs:{icon:"",href:e.link}},[i("v-icon",{attrs:{size:"24px"}},[t._v(t._s(e.icon))])],1)})),1),i("v-row",[i("v-col",{staticClass:"px-5",attrs:{cols:"12",md:"9"}},[i("v-card-text",{staticClass:"white--text pt-0 text-left"},[t._v("\n          Project for classes on the Basics of Data Protection at the Poznan\n          University of Technology. The material mainly covers issues in the\n          field of cryptography and cryptanalysis. It is also good code base &\n          user interface example for other projects from that subject.\n        ")]),i("v-card-text",{staticClass:"white--text pt-0 text-left"},[t._v("\n          Made with 💖 using "),i("strong",[t._v("Vue")]),t._v(" and\n          "),i("strong",[t._v("Vuetify.")])])],1),i("v-col",{staticClass:"max-height pt-0",attrs:{cols:"12",md:"3"}},[i("v-img",{attrs:{src:t.ppLogo,alt:"Politechnika Poznańska Logo",height:"80",contain:""}})],1)],1),i("v-divider"),i("v-card-text",{staticClass:"white--text"},[t._v("\n      "+t._s((new Date).getFullYear())+" —\n      "),i("strong",[t._v("©Wojciech Kasperski ")]),i("a",{staticClass:"font-weight-light white--text",attrs:{href:"mailto:wojciech.kasperski97@gmail.com"}},[t._v("<wojciech.kasperski97@gmail.com>")])])],1)],1)},r=[],a={name:"Footer",data:function(){return{socialMedia:[{icon:"mdi-github-circle",link:"https://github.com/SuddenlyPineapple"},{icon:"mdi-facebook",link:"https://www.facebook.com/wojciech.kasperski.900"},{icon:"mdi-linkedin",link:"https://www.linkedin.com/in/wojciech-kasperski-83782b111"}],ppLogo:i("d123")}}},s=a,n=i("2877"),c=i("6544"),l=i.n(c),p=i("8336"),h=(i("8e6e"),i("ac6a"),i("456d"),i("bd86")),d=(i("c5f6"),i("615b"),i("10d2")),u=i("297c"),f=i("1c87"),v=i("58df");function b(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function g(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?b(i,!0).forEach((function(e){Object(h["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):b(i).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var m=Object(v["a"])(u["a"],f["a"],d["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},outlined:Boolean,raised:Boolean,shaped:Boolean},computed:{classes:function(){return g({"v-card":!0},f["a"].options.computed.classes.call(this),{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.loading||this.disabled,"v-card--outlined":this.outlined,"v-card--raised":this.raised,"v-card--shaped":this.shaped},d["a"].options.computed.classes.call(this))},styles:function(){var t=g({},d["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=u["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),i=e.tag,o=e.data;return o.style=this.styles,this.isClickable&&(o.attrs=o.attrs||{},o.attrs.tabindex=0),t(i,this.setBackgroundColor(this.color,o),[this.genProgress(),this.$slots.default])}}),y=i("80d2"),O=(Object(y["g"])("v-card__actions"),Object(y["g"])("v-card__text")),j=(Object(y["g"])("v-card__title"),i("62ad")),w=i("ce7e6"),P=(i("d263"),i("b5b6"),i("3a66")),k=i("8dd9"),x=i("d10f");function _(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function B(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?_(i,!0).forEach((function(e){Object(h["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):_(i).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var C=Object(v["a"])(k["a"],Object(P["a"])("footer",["height","inset"]),x["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tile:{type:Boolean,default:!0}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return B({},k["a"].options.computed.classes.call(this),{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return B({},k["a"].options.computed.styles.call(this),{height:isNaN(t)?t:Object(y["e"])(t),left:Object(y["e"])(this.computedLeft),right:Object(y["e"])(this.computedRight),bottom:Object(y["e"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t("footer",e,this.$slots.default)}}),$=i("132d"),D=i("adda"),V=i("0fd9"),S=Object(n["a"])(s,o,r,!1,null,null,null);e["default"]=S.exports;l()(S,{VBtn:p["a"],VCard:m,VCardText:O,VCol:j["a"],VDivider:w["a"],VFooter:C,VIcon:$["a"],VImg:D["a"],VRow:V["a"]})}}]);
//# sourceMappingURL=chunk-6f518f41.3ff3d680.js.map