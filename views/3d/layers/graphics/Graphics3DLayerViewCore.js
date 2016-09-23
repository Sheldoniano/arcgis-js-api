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

define(["require","exports","../../../../core/HandleRegistry","./Graphics3DCore","./Graphics3DLabeling","./Graphics3DScaleVisibility","./Graphics3DFrustumVisibility","./Graphics3DElevationAlignment","./Graphics3DVerticalScale"],function(i,e,t,s,n,a,l,r,h){var o=function(){function i(i){var e=this;this._handles=new t,this.layer=i.layer,this.owner=i.owner,this.spatialIndex=i.spatialIndex,this.updateClippingExtent=i.updateClippingExtent,this.updateSuspendResumeExtent=i.updateSuspendResumeExtent,this.elevationChanged=i.elevationChanged,this.graphicsCore=new s,i.frustumVisibilityEnabled&&(this.frustumVisibility=new l,this._handles.add([this.owner.view.on("resize",function(){return e.frustumVisibility.viewChange()}),this.owner.view.navigation.on("currentViewChanged",function(){return e.frustumVisibility.viewChange()})])),i.scaleVisibilityEnabled&&(i.spatialIndex?(this.scaleVisibility=new a,this._handles.add(this.layer.watch("minScale,maxscale",function(){return e.scaleVisibility.layerMinMaxScaleChangeHandler()}))):console.warn("scaleVisibility requires a spatialIndex")),i.elevationAlignmentEnabled&&(this.elevationAlignment=new r,this._handles.add(this.layer.watch("elevationInfo",function(){return e.graphicsCore.elevationInfoChange()}))),i.labelingEnabled&&(this.labeling=new n,this._handles.add(this.layer.watch("labelsVisible",function(){return e.labeling.showLabelsChange()}))),i.verticalScaleEnabled&&(this.verticalScale=new h({sourceSpatialReference:this.layer.spatialReference,destSpatialReference:this.owner.view.spatialReference}))}return i.prototype.initialize=function(){var i=this;this.spatialIndex&&this.spatialIndex.initialize(this.owner,this.layer,this.owner.view.spatialReference,this.graphicsCore),this.frustumVisibility&&this.frustumVisibility.initialize(this.owner);var e=this.owner.view.basemapTerrain;if(this.scaleVisibility&&this.scaleVisibility.initialize(this.owner,this.layer,this.spatialIndex,this.graphicsCore,e),this.elevationAlignment&&this.elevationAlignment.initialize(this.owner,function(e,t,s){return i._elevationChanged(e,t,s)},this.graphicsCore,e),this.labeling){var t=this.layer;this.labeling.initialize(this.owner,t,this.graphicsCore)}this.graphicsCore.initialize(this.owner,this.layer,this.elevationAlignment,this.scaleVisibility,this.spatialIndex,this.labeling,function(){i.updateSuspendResumeExtent&&i._updateSuspendResumeExtent(i.updateSuspendResumeExtent())},function(e){return i.verticalScale?i.verticalScale.adjust(e):e},e),this._handles.add([this.layer.watch("renderer",function(e){return i.graphicsCore.rendererChange(e)}),this.owner.watch("fullOpacity",function(){return i.graphicsCore.opacityChange()})]),this._handles.add(this.layer.on("graphic-update",function(e){return i.graphicsCore.graphicUpdateHandler(e)})),this.owner.view.resourceController.registerIdleFrameWorker(this,{needsUpdate:this._needsIdleUpdate,idleFrame:this._idleUpdate}),this.updateClippingExtent&&(this._handles.add(this.owner.view.watch("clippingArea",function(){return i._updateClippingExtent()})),this._updateClippingExtent())},i.prototype.destroy=function(){this.owner&&this.owner.view.resourceController.deregisterIdleFrameWorker(this),this._handles&&(this._handles.destroy(),this._handles=null),this.frustumVisibility&&(this.frustumVisibility.destroy(),this.frustumVisibility=null),this.scaleVisibility&&(this.scaleVisibility.destroy(),this.scaleVisibility=null),this.elevationAlignment&&(this.elevationAlignment.destroy(),this.elevationAlignment=null),this.labeling&&(this.labeling.destroy(),this.labeling=null),this.graphicsCore&&(this.graphicsCore.destroy(),this.graphicsCore=null),this.layer=null,this.owner=null},i.prototype.canResume=function(){return(!this.frustumVisibility||this.frustumVisibility.canResume())&&(!this.scaleVisibility||this.scaleVisibility.canResume())},i.prototype._needsIdleUpdate=function(){return this.frustumVisibility&&this.frustumVisibility.needsIdleUpdate()?!0:this.scaleVisibility&&this.scaleVisibility.needsIdleUpdate()?!0:this.elevationAlignment&&this.elevationAlignment.needsIdleUpdate()?!0:!1},i.prototype._idleUpdate=function(i){this.frustumVisibility&&this.frustumVisibility.idleUpdate(i),this.scaleVisibility&&this.scaleVisibility.idleUpdate(i),this.elevationAlignment&&this.elevationAlignment.idleUpdate(i)},i.prototype._updateSuspendResumeExtent=function(i){this.frustumVisibility&&this.frustumVisibility.setExtent(i),this.scaleVisibility&&this.scaleVisibility.setExtent(i)},i.prototype._updateClippingExtent=function(){var i=this.owner.view.clippingArea;this.graphicsCore.setClippingExtent(i,this.owner.view.spatialReference)&&(this.updateClippingExtent(i)||this.graphicsCore.recreateAllGraphics())},i.prototype._elevationChanged=function(i,e,t){this.elevationChanged?this.elevationChanged(i,e,t):this.spatialIndex&&this.spatialIndex.intersects(i,e,t)},i}();return o});