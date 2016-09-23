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

define(["./Widget","./RendererSlider","./RendererSlider/sliderUtils","../Color","../core/numberUtils","../renderers/support/utils","dijit/_TemplatedMixin","dojo/_base/array","dojo/_base/lang","dojo/dom-style","dojox/gfx","dojo/text!./ClassedSizeSlider/templates/ClassedSizeSlider.html"],function(s,i,t,e,a,h,n,r,o,l,u,m){var d=s.createSubclass([n],{_rampNode:null,_sliderHeight:null,_colorRampSurface:null,_histogramSurface:null,_surfaceRect:null,_barsGroup:null,_updateTimer:null,_css:null,declaredClass:"esri.widgets.ClassedSizeSlider",templateString:m,properties:{breakInfos:null,histogram:null,statistics:null,handles:[],showHistogram:!0,showStatistics:!0,showLabels:!0,showTicks:!0,showHandles:!0,classificationMethod:null,normalizationType:null,histogramWidth:100,rampWidth:26},constructor:function(s,i){i&&(this.breakInfos=o.clone(s.breakInfos),this.set("values",this._getHandleInfo(this.breakInfos)),this._css={container:"esri-classed-size-slider"})},postCreate:function(){this.inherited(arguments),this._setupDataDefaults()},startup:function(){this.inherited(arguments),this._slider=new i({type:"ClassedSizeSlider",values:this.values,minimum:this.minValue,maximum:this.maxValue,showLabels:this.showLabels,showTicks:this.showTicks,showHandles:this.showHandles,classificationMethod:this.classificationMethod,normalizationType:this.normalizationType},this._sliderNode),this._slider.startup(),this._rampNode=this._slider._sliderAreaRight,this._sliderHeight=l.get(this._rampNode,"height")||155,this._createSVGSurfaces(),this._slider.on("slide",o.hitch(this,function(s){this._updateBreakInfos(s.values),this._updateBreakInfoLabels(),this._fillRamp()})),this._slider.on("data-change",o.hitch(this,function(s){s.values&&(this.set("values",s.values),this._updateBreakInfos(s.values),this._updateBreakInfoLabels()),this._fillRamp(),this.emit("change",{minValue:this.minValue,maxValue:this.maxValue,breakInfos:o.clone(this.breakInfos)})})),this._slider.on("handle-value-change",o.hitch(this,function(s){this._updateBreakInfos(s.values),this._updateBreakInfoLabels(),this._fillRamp(),this.emit("handle-value-change",{minValue:this.minValue,maxValue:this.maxValue,breakInfos:o.clone(this.breakInfos)})})),this._slider.on("data-value-change",o.hitch(this,function(s){this.set("minValue",s.min),this.breakInfos[0].minValue=s.min,this.set("maxValue",s.max),this.breakInfos[this.breakInfos.length-1].maxValue=s.max,this._updateBreakInfoLabels(),this._updateRendererSlider(),this.emit("data-value-change",{minValue:this.minValue,maxValue:this.maxValue,breakInfos:o.clone(this.breakInfos)})})),this._slider.on("stop",o.hitch(this,function(s){this.emit("handle-value-change",{minValue:this.minValue,maxValue:this.maxValue,breakInfos:o.clone(this.breakInfos)})})),this.histogram&&this.showHistogram&&this._generateHistogram(),this.statistics&&this.showStatistics&&this._generateStatistics(),this.watch("breakInfos, handles, statistics, showHandles, showLabels, showTicks",this._updateTimeout),this.watch("histogram",this._showHistogram),this.watch("showHistogram",this._toggleHistogram)},destroy:function(){this.inherited(arguments),this._slider&&this._slider.destroy(),this._avgHandleObjs&&this._avgHandleObjs.avgHandleTooltip&&this._avgHandleObjs.avgHandleTooltip.destroy(),this.countTooltips&&r.forEach(this.countTooltips,function(s){s.destroy()})},_updateTimeout:function(){this._updateRendererSlider()},_updateRendererSlider:function(){this.set({minValue:this.breakInfos[0].minValue,maxValue:this.breakInfos[this.breakInfos.length-1].maxValue}),this._slider.set({minimum:this.minValue,maximum:this.maxValue,values:this._getHandleInfo(this.breakInfos),handles:this.handles}),this._slider._reset(),this._slider._updateRoundedLabels(),this._slider._generateMoveables(),this._clearRect(),this._createSVGSurfaces(),this.histogram&&this.showHistogram&&this._generateHistogram(),this.statistics&&this.showStatistics&&this._generateStatistics()},_getHandleInfo:function(s){var i=r.map(s,function(s,i){return s.maxValue});return i.pop(),i},_updateBreakInfos:function(s){var i=this.breakInfos;h.updateClassBreak({classBreaks:i,normalizationType:this.normalizationType,classificationMethod:this.classificationMethod,change:s}),r.forEach(s,function(s,t){i[t].maxValue=s,i[t+1]&&(i[t+1].minValue=s)})},_updateBreakInfoLabels:function(){h.setLabelsForClassBreaks({classBreaks:this.breakInfos,normalizationType:this.normalizationType,classificationMethod:this.classificationMethod,round:!0})},_setupDataDefaults:function(){null!==this.breakInfos&&this.breakInfos.length>1?this.set({minValue:this.breakInfos[0].minValue,maxValue:this.breakInfos[this.breakInfos.length-1].maxValue}):null!==this.breakInfos&&1===this.breakInfos.length?this.set({minValue:this.breakInfos[0].minValue,maxValue:this.breakInfos[0].maxValue}):(this.set({minValue:0,maxValue:100,breakInfos:[{minValue:0,maxValue:20},{minValue:20,maxValue:80},{minValue:80,maxValue:100}]}),this.set("values",this._getHandleInfo(this.breakInfos)),this._updateBreakInfoLabels())},_createSVGSurfaces:function(){this._colorRampSurface=u.createSurface(this._rampNode,this.rampWidth,this._sliderHeight),this._surfaceRect=this._colorRampSurface.createRect({width:this.rampWidth,height:this._sliderHeight}),this._histogramSurface=t.generateHistogramSurface(this._rampNode,this.histogramWidth,this._sliderHeight,this.rampWidth),this._fillRamp()},_clearRect:function(){this._colorRampSurface.destroy(),this._histogramSurface.destroy()},_fillRamp:function(){var s,i,t,a=this.breakInfos,h=this._slider,n=this._sliderHeight,l=[];l=r.map(a,function(s){return[n-Math.round((s.minValue-h.minimum)/(h.maximum-h.minimum)*n),n-Math.round((s.maxValue-h.minimum)/(h.maximum-h.minimum)*n)]}),l.reverse(),this._colorRampSurface.clear(),s=this.rampWidth/a.length,i=this.rampWidth,t=this._colorRampSurface.createPath().moveTo(i,0),r.forEach(l,o.hitch(this,function(e,a){t.lineTo(i,e[0]),i=this.rampWidth-s*(a+1),t.lineTo(i,e[0])})),t.lineTo(1,n).lineTo(0,n).lineTo(0,0).closePath().setFill(new e([0,121,193,.8]))},_showHistogram:function(){this.histogram?this._generateHistogram():this._barsGroup&&(this._barsGroup.destroy(),this._barsGroup=null)},_toggleHistogram:function(){this.showHistogram?(l.set(this._barsGroup.rawNode,"display","inline-block"),this._showHistogram()):l.set(this._barsGroup.rawNode,"display","none")},_generateHistogram:function(){this._barsGroup=t.generateHistogram(this._histogramSurface,this.histogram,this.histogramWidth,this.rampWidth,this.isLeftToRight()),this.countTooltips=t.generateCountTooltips(this.histogram,this._barsGroup)},_generateStatistics:function(){if(!(this.statistics.count<2||isNaN(this.statistics.avg))){var s,i,e,h,n=this.statistics,r=this._slider,o=t.getPrecision(this.maxValue);n.min===n.max&&n.min===n.avg?(i=0,e=2*n.avg):(i=n.min,e=n.max),(i!==r.minimum||e!==r.maximum)&&(i=r.minimum,e=r.maximum),h=this._sliderHeight*(e-n.avg)/(e-i),s=a.round([n.avg,e,i])[0],this._avgHandleObjs=t.generateAvgLine(this._histogramSurface,s,h,o,!1,this.isLeftToRight())}}});return d});