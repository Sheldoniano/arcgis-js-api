// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.

define(["require","exports","./IdGen","./Util","./DDSUtil","./gl-matrix","../../../webgl/FramebufferObject","../../../webgl/Texture","../../../webgl/Util","../../../webgl/VertexArrayObject","../../../webgl/BufferObject","../../../webgl/enums","./DefaultVertexBufferLayouts","./DefaultVertexAttributeLocations"],function(e,t,i,a,r,n,s,o,h,p,d,m,u,f){function l(e,t,i,r,n,s,h){h=h!==!1;var p=new Image;p.onerror=function(){s(null),p.onerror=void 0,p.onload=void 0},p.onload=function(){if(a.assert(p.width>=1&&p.height>=1),i.samplingMode=h?9987:9729,i.hasMipmap=h,a.isPowerOfTwo(p.width)&&a.isPowerOfTwo(p.height)){i.width=p.width,i.height=p.height;var t=new o(e,i,p);e.bindTexture(t),s(t)}else{var t=g(e,p,i,r,n);e.bindTexture(t),s(t)}p.onerror=void 0,p.onload=void 0},p.src=t}function g(e,t,i,r,n){var m=a.nextHighestPowerOfTwo(t.width),l=a.nextHighestPowerOfTwo(t.height);a.assert(m!==t.width||l!==t.height),i.width=m,i.height=l;var g=new o(e,i),c=s.createWithAttachments(e,g,{colorTarget:0,depthStencilTarget:0}),x=new o(e,{target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9728,flipped:!0,maxAnisotropy:8},t);if(e.bindFramebuffer(c),void 0===n){var v=e.getViewport();n=[v.x,v.y,v.width,v.height]}e.setViewport(0,0,m,l);var b=r.get("texOnly"),T=w.identity();e.bindProgram(b),b.setUniformMatrix4fv("model",T),b.setUniformMatrix4fv("view",T),b.setUniformMatrix4fv("proj",T),b.setUniform4fv("color",new Float32Array([1,1,1,1])),b.setUniform1i("tex",0);var y=new p(e,f.Default3D,{geometry:u.Pos3Tex},{geometry:d.createVertex(e,35044,a.createQuadVertexUvBuffer())});return e.bindTexture(x,0),e.bindVAO(y),e.setDepthTestEnabled(!1),e.setBlendingEnabled(!1),e.drawArrays(5,0,h.vertexCount(y,"geometry")),e.setDepthTestEnabled(!0),e.bindFramebuffer(null),e.setViewport(n[0],n[1],n[2],n[3]),y.dispose(!0),x.dispose(),e.bindFramebuffer(null),c.detachColorTexture(),c.dispose(),i.hasMipmap&&g.generateMipmap(),g}var w=n.mat4d,c=function(){function e(t,i,a){this.data=t,this.id=e.idGen.gen(i),this.unloadFunc=void 0,this.params=a||{},this.params.wrapClamp=this.params.wrapClamp||!1,this.params.mipmap=this.params.mipmap!==!1,this.params.noUnpackFlip=this.params.noUnpackFlip||!1,this.estimatedTexMemRequiredMB=e.estimateTexMemRequiredMB(this.data,this.params)}return e.estimateTexMemRequiredMB=function(e,t){return null==e?0:e instanceof ArrayBuffer||e instanceof Uint8Array?e.byteLength/1e6:1.3*t.width*t.height*4/1e6},e.prototype.getId=function(){return this.id},e.prototype.getEstimatedTexMemRequiredMB=function(){return this.estimatedTexMemRequiredMB},e.prototype.dispose=function(){this.data=void 0},e.prototype.deferredLoading=function(){return"string"==typeof this.data},e.prototype.getWidth=function(){return this.params.width},e.prototype.getHeight=function(){return this.params.height},e.prototype.initializeThroughUpload=function(t,i,n,s,h){var p=this.data;if(i.flipped=!this.params.noUnpackFlip,i.samplingMode=this.params.mipmap?9987:9729,i.hasMipmap=this.params.mipmap,"string"==typeof p)l(t,p,i,n,s,h,this.params.mipmap);else if(p instanceof Image||p instanceof ImageData||p instanceof HTMLCanvasElement){this.params.width=p.width,this.params.height=p.height;var d=this.params.mipmap||!this.params.wrapClamp;if(!d||a.isPowerOfTwo(p.width)&&a.isPowerOfTwo(p.height)){i.width=p.width,i.height=p.height;var m=new o(t,i,p);t.bindTexture(m),h(m)}else{var m=g(t,p,i,n,s);t.bindTexture(m),h(m)}}else if(p instanceof ArrayBuffer&&this.params.encoding===e.DDS_ENCODING){var m=r.createDDSTexture(t,i,p,this.params.mipmap);t.bindTexture(m),h(m)}else if(p instanceof Uint8Array&&this.params.encoding===e.DDS_ENCODING){var m=r.createDDSTexture(t,i,p.buffer,this.params.mipmap);t.bindTexture(m),h(m)}else if(p instanceof Uint8Array){a.assert(this.params.width>0&&this.params.height>0),i.pixelFormat=1===this.params.components?6409:6408,i.width=this.params.width,i.height=this.params.height;var m=new o(t,i,p);t.bindTexture(m),h(m)}else if(null!==p)throw console.warn("Unsupported image data"),new Error("Unsupported image data");this.data=void 0},e.prototype.setUnloadFunc=function(e){this.unloadFunc=e},e.prototype.unload=function(){void 0!==this.unloadFunc&&(this.unloadFunc(this.id),this.unloadFunc=void 0)},e.idGen=new i,e.DDS_ENCODING="image/vnd-ms.dds",e}();return c});