// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Collection","../../core/Handles","../../core/Loadable","../../core/Loadable","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../support/basemapUtils","./support/basemapCompatibilityUtils","./support/BasemapGalleryItem","./support/LocalBasemapsSource","./support/PortalBasemapsSource"],(function(e,t,o,r,i,a,s,n,p,u,c,l,d,y,m,f){var h=i.ofType(y);return function(e){function t(t){var o=e.call(this,t)||this;return o._handles=new a,o.activeBasemap=null,o.items=new h,o.source=new f,o.view=null,o}return o(t,e),t.prototype.initialize=function(){var e=this;this._handles.add([u.init(this,["compatibilityFunction","state"],(function(){return e._updateItems()})),u.on(this,"source.basemaps","change",(function(){return e._updateItems()}))])},t.prototype.destroy=function(){this._handles.destroy(),this._handles=null},Object.defineProperty(t.prototype,"compatibilityFunction",{get:function(){return void 0===this._get("compatibilityFunction")?"3d"===this.get("view.type")?d.default3DCompatibility:d.default2DCompatibility:this._get("compatibilityFunction")},set:function(e){this._set("compatibilityFunction",e)},enumerable:!0,configurable:!0}),t.prototype.castSource=function(e){return Array.isArray(e)||i.isCollection(e)?new m({basemaps:e}):function(e){return e&&"esri.portal.Portal"===e.declaredClass}(e)?new f({portal:e}):function(e){return e&&!(e instanceof f)&&(!!e.portal||!!e.query)}(e)?new f(e):function(e){return e&&"basemaps"in e&&"state"in e&&"refresh"in e}(e)?e:null},Object.defineProperty(t.prototype,"state",{get:function(){return this.get("view.ready")&&this.source?"ready":"disabled"},enumerable:!0,configurable:!0}),t.prototype.basemapEquals=function(e,t){return l.contentEquals(e,t)},t.prototype.refresh=function(){this._updateItems()},t.prototype.load=function(e){return this.addResolvingPromise(s.isLoadable(this.source)?this.source.load(e):p.resolve()),p.resolve(this)},t.prototype._updateItems=function(){var e=this.get("source.basemaps"),t=this.view,o=this.compatibilityFunction;this.items.removeAll().forEach((function(e){return e.destroy()})),this.items.addMany(e.map((function(e){return new y({basemap:e,compatibilityFunction:o,view:t})})))},r([c.property({aliasOf:"view.map.basemap"})],t.prototype,"activeBasemap",void 0),r([c.property({dependsOn:["view.type"]})],t.prototype,"compatibilityFunction",null),r([c.property({readOnly:!0,type:h})],t.prototype,"items",void 0),r([c.property()],t.prototype,"source",void 0),r([c.cast("source")],t.prototype,"castSource",null),r([c.property({readOnly:!0,dependsOn:["view.ready"]})],t.prototype,"state",null),r([c.property()],t.prototype,"view",void 0),t=r([c.subclass("esri.widgets.BasemapGallery.BasemapGalleryViewModel")],t)}(c.declared(n))}));