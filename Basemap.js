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

define(["require","exports","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./core/accessorSupport/decorators","dojo/_base/lang","./support/basemapDefinitions","./core/Collection","./core/collectionUtils","./core/Evented","./core/JSONSupport","./core/Loadable","./core/promiseUtils","./core/requireUtils","./core/urlUtils","./core/Logger","./portal/Portal","./portal/PortalItem","./layers/Layer"],function(e,r,t,o,a,i,n,s,l,p,u,c,y,f,h,d,m,b,L){function I(){return u}var g=0,w=s.ofType(L),v=d.getLogger("esri.Basemap"),S=function(r){function p(e){r.call(this),this.id=null,this.portalItem=null,this.resourceInfo=null,this.thumbnailUrl=null,this.title="",this.id=Date.now().toString(16)+"-basemap-"+g++,this.baseLayers=new s,this.referenceLayers=new s;var t=function(e){"esri.layers.ElevationLayer"===e.declaredClass&&v.error("Layer '"+e.title+", id:"+e.id+"' of type '"+e.declaredClass+"' cannot be added as a basemap layer.")};this.baseLayers.on("after-add",function(e){return t(e.item)}),this.referenceLayers.on("after-add",function(e){return t(e.item)})}return t(p,r),p.prototype.initialize=function(){this.resourceInfo&&this.read(this.resourceInfo)},Object.defineProperty(p.prototype,"baseLayers",{set:function(e){this._set("baseLayers",l.referenceSetter(e,this._get("baseLayers"),w))},enumerable:!0,configurable:!0}),p.prototype.writeBaseLayers=function(e,r,t){var o=[];return e?(t=i.mixin({},t,{layerContainerType:"basemap"}),this.baseLayers.forEach(function(e){if(e.write){var r={};e.write(r,t)&&o.push(r)}}),this.referenceLayers.forEach(function(e){if(e.write){var r={isReference:!0};e.write(r,t)&&o.push(r)}}),void(r.baseMapLayers=o)):o},Object.defineProperty(p.prototype,"referenceLayers",{set:function(e){this._set("referenceLayers",l.referenceSetter(e,this._get("referenceLayers"),w))},enumerable:!0,configurable:!0}),p.prototype.writeTitle=function(e,r){e&&(r.title=e)},p.prototype.load=function(){return this.addResolvingPromise(this._loadFromSource()),this},p.prototype.clone=function(){var e={id:this.id,title:this.title};return this.resourceInfo||this.portalItem?(e.portalItem=this.portalItem,e.resourceInfo=this.resourceInfo):(e.baseLayers=this.baseLayers.slice(),e.referenceLayers=this.referenceLayers.slice()),new p(e)},p.prototype.read=function(e,r){return r&&r.origin&&(this._layerOrigin=r.origin),this.inherited(arguments)},p.prototype.write=function(e,r){return e=e||{},!this.loaded&&this.resourceInfo?i.mixin(e,this.resourceInfo):this.inherited(arguments,[e,r]),e},p.prototype.toJSON=function(){return this.write(null,{origin:"web-map"})},p.prototype._loadFromSource=function(){var e=this.resourceInfo,r=this.portalItem;return e?this._loadFromJSON(e):r?this._loadFromItem(r):y.resolve(null)},p.prototype._loadFromJSON=function(r,t){var o=this,a=this.portalItem&&this.portalItem.portal;return f.when(e,"./portal/support/layersCreator").then(function(e){var i=[];if(r.baseMapLayers&&Array.isArray(r.baseMapLayers)){var n={context:{origin:o._layerOrigin||"web-map",layerContainerType:"basemap",url:t,portal:a},defaultLayerType:"DefaultTileLayer"},s=e.populateOperationalLayers(o.baseLayers,r.baseMapLayers.filter(function(e){return!e.isReference}),n);i.push.apply(i,s);var l=e.populateOperationalLayers(o.referenceLayers,r.baseMapLayers.filter(function(e){return e.isReference}),n);i.push.apply(i,l)}return y.eachAlways(i)}).then(function(){})},p.prototype._loadFromItem=function(e){var r=this;return e.load().then(function(e){return r.read({title:e.title,thumbnailUrl:e.thumbnailUrl},{origin:"portal-item",portal:e.portal||m.getDefault()}),e}).then(function(e){return e.fetchData()}).then(function(t){r.resourceInfo=t.baseMap;var o=h.urlToObject(e.itemUrl);return r.read(r.resourceInfo,{origin:"portal-item",portal:e.portal||m.getDefault(),url:o}),r._loadFromJSON(r.resourceInfo,o)})},p.fromJSON=function(e){return e?new p({resourceInfo:e}):null},p.fromId=function(e){var r=n[e];return r?p.fromJSON(r):null},o([a.property({type:w,json:{writeAlways:!0}}),a.cast(l.castForReferenceSetter)],p.prototype,"baseLayers",null),o([a.write("baseLayers")],p.prototype,"writeBaseLayers",null),o([a.property({json:{origins:{webScene:{writable:!0}}}})],p.prototype,"id",void 0),o([a.property({type:b})],p.prototype,"portalItem",void 0),o([a.property({type:w}),a.cast(l.castForReferenceSetter)],p.prototype,"referenceLayers",null),o([a.property()],p.prototype,"resourceInfo",void 0),o([a.property()],p.prototype,"thumbnailUrl",void 0),o([a.property()],p.prototype,"title",void 0),o([a.write("title")],p.prototype,"writeTitle",null),p=o([a.subclass("esri.Basemap")],p)}(a.declared(I(),p,c));return S});