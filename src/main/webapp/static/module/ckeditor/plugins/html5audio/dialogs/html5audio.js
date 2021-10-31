﻿CKEDITOR.dialog.add("html5audio",function(b){return{title:b.lang.html5audio.title,minWidth:500,minHeight:100,contents:[{id:"info",label:b.lang.html5audio.infoLabel,elements:[{type:"vbox",padding:0,children:[{type:"hbox",widths:["365px","110px"],align:"right",children:[{type:"text",id:"url",label:b.lang.common.url,required:!0,validate:CKEDITOR.dialog.validate.notEmpty(b.lang.html5audio.urlMissing),setup:function(a){this.setValue(a.data.src)},commit:function(a){a.setData("src",this.getValue())}},{type:"button",
id:"browse",style:"display:inline-block;margin-top:14px;",align:"center",label:b.lang.common.browseServer,hidden:!0,filebrowser:"info:url"}]}]},{type:"hbox",id:"alignment",children:[{type:"radio",id:"align",label:b.lang.common.align,items:[[b.lang.common.alignCenter,"center"],[b.lang.common.alignLeft,"left"],[b.lang.common.alignRight,"right"],[b.lang.common.alignNone,"none"]],"default":"center",setup:function(a){a.data.align&&this.setValue(a.data.align)},commit:function(a){a.setData("align",this.getValue())}}]}]},
{id:"Upload",hidden:!0,filebrowser:"uploadButton",label:b.lang.html5audio.upload,elements:[{type:"file",id:"upload",label:b.lang.html5audio.btnUpload,style:"height:40px",size:38},{type:"fileButton",id:"uploadButton",filebrowser:"info:url",label:b.lang.html5audio.btnUpload,"for":["Upload","upload"]}]},{id:"advanced",label:b.lang.html5audio.advanced,elements:[{type:"vbox",padding:10,children:[{type:"hbox",children:[{type:"radio",id:"autoplay",label:b.lang.html5audio.autoplay,items:[[b.lang.html5audio.yes,
"yes"],[b.lang.html5audio.no,"no"]],"default":"no",setup:function(a){a.data.autoplay&&this.setValue(a.data.autoplay)},commit:function(a){a.setData("autoplay",this.getValue())}},{type:"radio",id:"allowdownload",label:b.lang.html5audio.allowdownload,items:[[b.lang.html5audio.yes,"yes"],[b.lang.html5audio.no,"no"]],"default":"no",setup:function(a){a.data.allowdownload&&this.setValue(a.data.allowdownload)},commit:function(a){a.setData("allowdownload",this.getValue())}}]},{type:"hbox",children:[{type:"text",
id:"advisorytitle",label:b.lang.html5audio.advisorytitle,"default":"",setup:function(a){a.data.advisorytitle&&this.setValue(a.data.advisorytitle)},commit:function(a){a.setData("advisorytitle",this.getValue())}}]}]}]}]}});