(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0db7f6"],{"6fb2":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("h2",[e._v("Decryption")]),a("v-row",[a("v-col",{attrs:{cols:"12"}},[[a("v-file-input",{attrs:{placeholder:"Upload your txt file",label:"File input",accept:".png, .jpg, .bmp","prepend-icon":"mdi-camera","show-size":""},on:{change:e.loadImageFromFile},scopedSlots:e._u([{key:"selection",fn:function(t){var r=t.text;return[a("v-chip",{attrs:{small:"",label:"",color:"purple"}},[e._v("\n              "+e._s(r)+"\n            ")])]}}]),model:{value:e.file,callback:function(t){e.file=t},expression:"file"}})]],2),e.originalImage?a("v-col",{attrs:{cols:"6",sm:"12",md:"6"}},[a("h5",[e._v("Image with encrypted message")]),a("img",{attrs:{height:"100%",width:"100%",src:e.originalImage}})]):e._e(),a("v-col",{attrs:{cols:"6",sm:"12",md:"6"}},[a("v-textarea",{attrs:{color:"deep-purple",readonly:"",counter:"",label:"Decrypt output","prepend-icon":"mdi-eye",placeholder:"Decrypted text (readonly)..."},model:{value:e.decryptedText,callback:function(t){e.decryptedText=t},expression:"decryptedText"}})],1)],1)],1)},n=[],i=(a("6b54"),a("f576"),a("96cf"),a("3b8d")),o=a("2ef0"),c=a.n(o),l={name:"ImageDecrypiton",data:function(){return{imageToDecrypt:null,file:null,originalImage:"",decryptedText:""}},methods:{decryptImage:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,a,r,n,i,o,l,d,s,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=document.createElement("canvas"),a=new Image,a.src=this.imageToDecrypt,e.next=5,a;case 5:for(t.width=a.width,t.height=a.height,this.originalImage=a.src,r=t.getContext("2d"),r.drawImage(a,0,0,a.width,a.height),n=r.getImageData(0,0,a.width,a.height),i="",o=0;o<n.data.length;o+=4)l=c.a.padStart(n.data[o].toString(2),8,0),d=c.a.padStart(n.data[o+1].toString(2),8,0),s=c.a.padStart(n.data[o+2].toString(2),8,0),i+=l.charAt(7)+d.charAt(7)+s.charAt(7);for(p=0;p<i.length;p+=8)this.decryptedText+=String.fromCharCode(parseInt(i.substring(p,p+8),2));case 14:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),loadImageFromFile:function(){var e=this,t=this.file,a=new FileReader;a.onload=function(t){e.imageToDecrypt=t.target.result,e.decryptImage()},this.file?a.readAsDataURL(t):(this.originalImage="",this.processedImage="")}}},d=l,s=a("2877"),p=a("6544"),h=a.n(p),u=a("cc20"),g=a("62ad"),m=a("a523"),f=a("23a7"),v=a("0fd9"),w=a("a844"),y=Object(s["a"])(d,r,n,!1,null,null,null);t["default"]=y.exports;h()(y,{VChip:u["a"],VCol:g["a"],VContainer:m["a"],VFileInput:f["a"],VRow:v["a"],VTextarea:w["a"]})}}]);
//# sourceMappingURL=chunk-2d0db7f6.4c86869b.js.map