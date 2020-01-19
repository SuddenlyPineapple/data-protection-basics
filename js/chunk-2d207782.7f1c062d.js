(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d207782"],{a151:function(s,h,t){"use strict";t.r(h);var r=function(){var s=this,h=s.$createElement,t=s._self._c||h;return t("v-container",[t("v-row",[t("v-col",{attrs:{cols:"12"}},[t("h2",[s._v("Visual Cryptography - 2 x 2")])]),t("v-col",{attrs:{cols:"12"}},[t("vue-p5",{on:{setup:s.setup,draw:s.draw,"":function(s){},mouseclicked:s.mouseClicked}}),t("v-btn",{staticClass:"white--text",attrs:{color:"purple"},on:{click:s.cipher}},[s._v("Cipher")]),t("v-btn",{staticClass:"white--text ml-3",attrs:{color:"purple"},on:{click:s.overlay}},[s._v("Overlay")]),t("v-btn",{staticClass:"white--text ml-3",attrs:{color:"purple"},on:{click:function(){s.cleanShares(),s.cleanInorout()}}},[s._v("\n        Clear\n      ")])],1)],1)],1)},a=[],i=(t("6c7b"),t("ac6a"),t("75fc")),e=(t("386d"),t("e25d")),o=t.n(e),c={name:"VisualEncryptTwoTwo",data:function(){return{inorout:null,share1:null,share2:null,animValue:0,c:20,r:20,size:10,canva:null,address:window.location.href,cols:20,rows:20}},components:{VueP5:o.a},methods:{setup:function(s){var h=this;if(console.log("setup"),-1!=this.address.search("c=")){this.c=0;for(var t=this.address.search("c=")+2,r=this.address.search("&"),a=1,e=r-1;e>=t;e--)this.c+=this.address[e]*a,a*=10}if(-1!=this.address.search("&r=")){this.r=0;for(var o=this.address.search("r=")+2,c=this.address.length,n=1,l=c-1;l>=o;l--)this.r+=this.address[l]*n,n*=10}this.canva=s.createCanvas(3*this.c*this.size+2*this.size,this.r*this.size),this.inorout=Object(i["a"])(Array(this.c).keys()).map((function(){return Array(h.r)})),this.share1=Object(i["a"])(Array(2*this.c).keys()).map((function(){return Array(2*h.r)})),this.share2=Object(i["a"])(Array(2*this.c).keys()).map((function(){return Array(2*h.r)})),this.cleanInorout(),this.cleanShares()},draw:function(s){s.noLoop(),s.background(255),s.stroke(0);for(var h=0;h<this.c;h++)for(var t=0;t<this.r;t++){var r=h*this.size,a=t*this.size;1==this.inorout[h][t]?s.fill(0):s.fill(255),s.rect(r,a,this.size,this.size)}for(var i=0;i<2*this.c;i++)for(var e=0;e<2*this.r;e++){var o=i*(this.size/2),c=e*(this.size/2);o+=this.size*this.c+this.size,1==this.share1[i][e]?s.fill(0):s.noFill(),s.rect(o,c,this.size/2,this.size/2)}for(var n=0;n<2*this.c;n++)for(var l=0;l<2*this.r;l++){var u=n*(this.size/2),f=l*(this.size/2);u+=2*this.size*this.c+2*this.size-this.animValue,1==this.share2[n][l]?s.fill(0):s.noFill(),s.rect(u,f,this.size/2,this.size/2)}},mouseClicked:function(s){var h=Math.floor(s.mouseX/this.size),t=Math.floor(s.mouseY/this.size);h<this.c&&h>=0&&t<this.r&&t>=0&&(0==this.inorout[h][t]?this.inorout[h][t]=1:this.inorout[h][t]=0),s.draw()},cleanShares:function(){for(var s=0;s<2*this.c;s++)for(var h=0;h<2*this.r;h++)this.share1[s][h]=0,this.share2[s][h]=0},cleanInorout:function(){for(var s=0;s<this.c;s++)for(var h=0;h<this.r;h++)this.inorout[s][h]=0},setColsRows:function(){var s=this.address.search("c=");window.location.href=-1!=s?this.address.slice(0,s-1)+"?c="+this.cols+"&r="+this.rows:this.address+"?c="+this.cols+"&r="+this.rows},cipher:function(){this.cleanShares();for(var s=0;s<this.c;s++)for(var h=0;h<this.r;h++)if(1==this.inorout[s][h])switch(Math.floor(6*Math.random())){case 0:this.share1[2*s][2*h]=this.share1[2*s+1][2*h]=1,this.share2[2*s][2*h+1]=this.share2[2*s+1][2*h+1]=1;break;case 1:this.share1[2*s][2*h+1]=this.share1[2*s+1][2*h+1]=1,this.share2[2*s][2*h]=this.share2[2*s+1][2*h]=1;break;case 2:this.share1[2*s][2*h]=this.share1[2*s][2*h+1]=1,this.share2[2*s+1][2*h]=this.share2[2*s+1][2*h+1]=1;break;case 3:this.share1[2*s+1][2*h]=this.share1[2*s+1][2*h+1]=1,this.share2[2*s][2*h]=this.share2[2*s][2*h+1]=1;break;case 4:this.share1[2*s][2*h]=this.share1[2*s+1][2*h+1]=1,this.share2[2*s+1][2*h]=this.share2[2*s][2*h+1]=1;break;case 5:this.share1[2*s+1][2*h]=this.share1[2*s][2*h+1]=1,this.share2[2*s][2*h]=this.share2[2*s+1][2*h+1]=1;break}else switch(Math.floor(10*Math.random())){case 0:this.share1[2*s][2*h]=this.share1[2*s+1][2*h]=this.share2[2*s][2*h]=this.share2[2*s+1][2*h]=1;break;case 1:this.share1[2*s][2*h+1]=this.share1[2*s+1][2*h+1]=this.share2[2*s][2*h+1]=this.share2[2*s+1][2*h+1]=1;break;case 2:this.share1[2*s][2*h]=this.share1[2*s][2*h+1]=this.share2[2*s][2*h]=this.share2[2*s][2*h+1]=1;break;case 3:this.share1[2*s+1][2*h]=this.share1[2*s+1][2*h+1]=this.share2[2*s+1][2*h]=this.share2[2*s+1][2*h+1]=1;break;case 4:this.share1[2*s][2*h]=this.share1[2*s+1][2*h+1]=this.share2[2*s][2*h]=this.share2[2*s+1][2*h+1]=1;break;case 5:this.share1[2*s+1][2*h]=this.share1[2*s][2*h+1]=this.share2[2*s+1][2*h]=this.share2[2*s][2*h+1]=1;break;case 6:Math.floor(2*Math.random())?this.share1[2*s][2*h]=this.share2[2*s+1][2*h]=1:this.share2[2*s][2*h]=this.share1[2*s+1][2*h]=1;break;case 7:Math.floor(2*Math.random())?this.share1[2*s][2*h+1]=this.share2[2*s+1][2*h+1]=1:this.share2[2*s][2*h+1]=this.share1[2*s+1][2*h+1]=1;break;case 8:Math.floor(2*Math.random())?this.share1[2*s][2*h]=this.share2[2*s][2*h+1]=1:this.share2[2*s][2*h]=this.share1[2*s][2*h+1]=1;break;case 9:Math.floor(2*Math.random())?this.share1[2*s+1][2*h]=this.share2[2*s+1][2*h+1]=1:this.share2[2*s+1][2*h]=this.share1[2*s+1][2*h+1]=1;break}this.animValue=0},overlay:function(){this.animValue=this.c*this.size+this.size}}},n=c,l=t("2877"),u=t("6544"),f=t.n(u),d=t("8336"),v=t("62ad"),k=t("a523"),p=t("0fd9"),b=Object(l["a"])(n,r,a,!1,null,null,null);h["default"]=b.exports;f()(b,{VBtn:d["a"],VCol:v["a"],VContainer:k["a"],VRow:p["a"]})}}]);
//# sourceMappingURL=chunk-2d207782.7f1c062d.js.map