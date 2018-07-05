// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.25/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/json","dojo/sniff","../kernel","../lang","./GraphicsLayer","./ImageServiceLayerMixin","../renderers/VectorFieldRenderer","../geometry/Point","../geometry/Extent","../graphic","dojox/gfx"],function(e,i,t,r,s,n,a,l,o,h,m,x,c,u){var d=e([l,o],{declaredClass:"esri.layers.ArcGISImageServiceVectorLayer",constructor:function(e,t){this.symbolTileSize=t&&t.symbolTileSize?t.symbolTileSize:50,this._minMag=null,this._maxMag=null;var r=i.clone(this._params);if(delete r.imageServiceParameters,delete r.pixelFilter,delete r.rendererStyle,delete r.symbolTileSize,this._initialize(e,t),!this.renderer){var s=t&&t.rendererStyle?t.rendererStyle:h.STYLE_SINGLE_ARROW;this.setVectorRendererStyle(s)}this.geometryType="esriGeometryPoint",this.symbolTileSizeUnits="Pixels",i.mixin(this._params,r)},getField:function(e){return this._getField(e,!0)},setVectorRendererStyle:function(e){this.rendererStyle=e,this._updateVectorFieldRenderer(),this.useDefaultRenderer=!0},setRenderer:function(){this.useDefaultRenderer=!1,this.inherited(arguments)},getFlowRepresentation:function(){return this._vectorFlowRepresentation},onResume:function(){this.inherited(arguments),this._toggleTime()},onSuspend:function(){this.inherited(arguments),this._toggleTime()},_refresh:function(e){if(s("ie")<10)return void this.onError(new Error("Unable to refresh. This layer is not supported in the current browser."));if(this._map){this.setImageFormat("LERC",!0);var t=this.fullExtent&&this.fullExtent.xmin,r=this.fullExtent&&this.fullExtent.ymax,n=i.clone(this._map.extent),a=this._map.width*(1/this.symbolTileSize);a=a?Math.ceil(a):50;var l=this._map.height*(1/this.symbolTileSize);l=l?Math.ceil(l):Math.ceil(a*((n.ymax-n.ymin)/(n.xmax-n.xmin)));var o=(n.xmax-n.xmin)/a,h=(n.ymax-n.ymin)/l;n.xmin=t+Math.floor((n.xmin-t)/o)*o,n.xmax=t+Math.ceil((n.xmax-t)/o)*o,n.ymin=r+Math.floor((n.ymin-r)/h)*h,n.ymax=r+Math.ceil((n.ymax-r)/h)*h,this._requestData(n,a,l)}},_drawPixelData:function(){if(this.clear(),this.pixelData){var e=this.pixelData.pixelBlock,i=this.pixelData.extent,t=this.pixelData.locations,s=a.isDefined(e.mask)&&e.mask.length>0;if(e&&i&&t){if(this.useDefaultRenderer&&this.renderer&&(!a.isDefined(this._minMag)||!a.isDefined(this._maxMag))){var n=this._getServiceMinMaxStats();n?(this._minMag=n.min,this._maxMag=n.max):(this._minMag=e.statistics[0].minValue,this._maxMag=e.statistics[0].maxValue);var l={type:"sizeInfo",minSize:u.px2pt(.2*this.symbolTileSize),maxSize:u.px2pt(.8*this.symbolTileSize),minDataValue:this._minMag,maxDataValue:this._maxMag},o=[];o.push(l),o.push({type:"colorInfo"}),this.renderer.setVisualVariables(o)}var h,d,p,f=0,_=0,g=0,y=i.spatialReference?i.spatialReference._getInfo():null;for(f=0;f<e.height;f++)for(_=0;_<e.width;_++,g++)if(h=t[g],(!s||e.mask[g])&&h&&2===h.length){d=new m(h[0],h[1],i.spatialReference),y&&(d.x=x.prototype._normalizeX(d.x,y).x);var S={Magnitude:e.pixels[0][g],Direction:e.pixels[1][g],Location:r.toJson(d.toJson())};p=new c(d,null,S),this.add(p)}}}},_getServiceMinMaxStats:function(){if(!a.isDefined(this.minValues)||!a.isDefined(this.maxValues)||this.minValues.length<2||this.maxValues.length<2)return null;var e=this.minValues[0],i=this.maxValues[0],t=this.minValues[1],r=this.maxValues[1];if(this.pixelFilter&&e&&i&&t&&r){var s=[];s.push([e,i]),s.push([t,r]);var n=this._createPixelData(s);this.pixelFilter(n),n&&n.pixelBlock&&n.pixelBlock.pixels&&n.pixelBlock.pixels.length>0&&(e=n.pixelBlock.pixels[0][0],i=n.pixelBlock.pixels[0][1])}return e&&i?{min:e,max:i}:null},_updateVectorFieldRenderer:function(){var e={type:"sizeInfo",minSize:u.px2pt(.2*this.symbolTileSize),maxSize:u.px2pt(.8*this.symbolTileSize),minDataValue:this._minMag,maxDataValue:this._maxMag},i=[];i.push(e);var t=new h({style:this.rendererStyle,visualVariables:i,flowRepresentation:this._vectorFlowRepresentation});this.setRenderer(t)},_getField:function(e,i){if(a.isDefined(e)){if(i&&(e=e.toLowerCase()),"magnitude"!==e&&"direction"!==e)return null;return{name:e,alias:e,domain:null,editable:!1,length:50,type:"esriFieldTypeDouble"}}},_requestDataErrorHandler:function(e){"CancelError"!==e.name&&(this.clear(),this.onError(e))},_setFlowRepresentation:function(e){e&&this.renderer&&a.isDefined(e.FlowDirection)&&(this._vectorFlowRepresentation="oceanographic"===e.FlowDirection.toLowerCase()?this.renderer.FLOW_TO:this.renderer.FLOW_FROM),this.renderer&&(this.renderer.flowRepresentation=this._vectorFlowRepresentation)}});return s("extend-esri")&&i.setObject("layers.ArcGISImageServiceVectorLayer",d,n),d});