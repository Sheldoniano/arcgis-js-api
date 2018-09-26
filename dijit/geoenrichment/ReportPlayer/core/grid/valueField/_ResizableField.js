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
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/string","dojo/dom-class","dojo/dom-construct","dojo/dom-style","./utils/ResizeColumnRowTooltipVisualizer","esri/dijit/geoenrichment/utils/PageUnitsConverter","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/MouseUtil","esri/dijit/geoenrichment/utils/TooltipUtil","dojo/i18n!esri/nls/jsapi"],function(e,i,t,s,n,l,o,d,a,h,r,g,u){u=u.geoenrichment.dijit.ReportPlayer.ValueField;var S={_grid:null,_timeoutHandle:null,setIsBeingResized:function(e,i){this._cleanUp(),i&&e.parentGrid&&e.parentGrid.domNode&&(this._grid=e.parentGrid,n.add(this._grid.domNode,"isBeingResized"),this._timeoutHandle=setTimeout(this._cleanUp.bind(this),1e4))},_cleanUp:function(){clearTimeout(this._timeoutHandle),this._grid&&this._grid.domNode&&n.remove(this._grid.domNode,"isBeingResized"),this._grid=null}};return e(null,{resizable:!0,hasAllSidesSizers:!1,showSizeLabel:!1,showSizeLabelsInAllRelatedCells:!1,showColumnRowSizeTooltip:!1,showSizersOnFocus:!1,createSizersOnDemand:!0,resizeRestrictNode:null,allowHorizontalResizing:!0,allowVerticalResizing:!0,sizeLabel:null,_tooltipHandles:null,postCreate:function(){this._tooltipHandles=[],this.inherited(arguments),this.resizable&&this._addCreateSizersTrigger()},_isBeingResized:!1,_isBeingResizedDelayed:!1,_sizers:null,isBeingResized:function(){return!(!this.resizable||!this._sizers)&&(this._isBeingResized||this._sizers.some(function(e){return r.isMouseOver(e)})||!this.hasAllSidesSizers&&this._sizers.some(function(e){return o.get(e,"opacity")>0}))},wasResizedRecently:function(){return this.isBeingResized()||this._isBeingResizedDelayed},_addCreateSizersTrigger:function(){var e=this;this.createSizersOnDemand||this._updateSizers(),t(this.domNode,"mouseover",function(){e._updateSizers()})},_createSizers:function(){var e=this;if(this.resizable&&!this._sizers){var i;i=this.hasAllSidesSizers?["e","se","s","sw","w","nw","n","ne"]:[this.allowHorizontalResizing?"e":null,this.allowVerticalResizing?"s":null].filter(function(e){return!!e}),this._sizers=i.map(function(i){var t=l.create("div",null,e.domNode);if(e.hasAllSidesSizers){var s=e.showSizersOnFocus?"valueField_allSidesSizer_showOnFocus":"valueField_allSidesSizer";n.add(t,s+" "+i+"_fieldSizer"),e.fieldCellClass&&n.add(t,"fieldSizer_"+e.fieldCellClass)}else"e"===i?(n.add(t,"valueField_widthSizer"),e._tooltipHandles.push(g.setTooltipToNode(t,u.dragToChangeWidth)),e.fieldCellClass&&n.add(t,"widthSizer_"+e.fieldCellClass)):(n.add(t,"valueField_heightSizer"),e._tooltipHandles.push(g.setTooltipToNode(t,u.dragToChangeHeight)),e.fieldCellClass&&n.add(t,"heightSizer_"+e.fieldCellClass));return t._sizerInfo={dir:i,canChangeW:-1!==i.indexOf("w")||-1!==i.indexOf("e"),canChangeH:-1!==i.indexOf("n")||-1!==i.indexOf("s"),canChangeX:-1!==i.indexOf("w"),canChangeY:-1!==i.indexOf("n"),dxDir:-1!==i.indexOf("w")?-1:1,dyDir:-1!==i.indexOf("n")?-1:1},t}),this._addResizeHandlers()}},unitTesting_getSizerByDirection:function(e){return this._updateSizers(),this._sizers.filter(function(i){return i._sizerInfo.dir===e})[0]},_addResizeHandlers:function(){var e=this;this._sizers.forEach(function(i){var s=i._sizerInfo;t(i,"mousedown",function(i){i.stopPropagation();var n;e._setIsBeingResized(!0),e.stopEdit&&e.stopEdit();var l=r.getCursorPosition().clientX,o=r.getCursorPosition().clientY,d=e.getWidth(),a=e.getHeight(),h=l,g=o,u=e._getResisableNodePos(),S={x:u.x,y:u.y,dxShiftSingle:0,dyShiftSingle:0,w:d,h:a,dwSingle:0,dhSingle:0},z=t(document.body,"mousemove",function(i){var t=r.getCursorPosition().clientX,u=r.getCursorPosition().clientY,z=t-l,c=u-o;z*=s.dxDir,c*=s.dyDir,!n&&(s.canChangeW&&z||s.canChangeH&&c)&&(e._onManualSizePreChange(),n=!0);var f=!1;if(S.dwSingle=0,S.dhSingle=0,s.canChangeW&&z&&(S.w=d+z,S.dwSingle=z,f=!0),s.canChangeH&&c&&(S.h=a+c,S.dhSingle=c,f=!0),S.dxShiftSingle=0,S.dyShiftSingle=0,s.canChangeX||s.canChangeY){var _=s.canChangeX?t-h:0,C=s.canChangeY?u-g:0;S.dxShiftSingle=_,S.dyShiftSingle=C,S.x+=_,S.y+=C,h=t,g=u}e._applyResizedCellBox(S,s),f&&(e._onManualSizeChange(s),e.onManualSizeChange()),s.canChangeW&&z&&e.onManualWidthChange(i),s.canChangeH&&c&&e.onManualHeightChange(i),e._updateSizers()}),c=t.once(document.body,"mouseup, click",function(){c.remove(),z.remove(),e._setIsBeingResized(!1)})})})},_setIsBeingResized:function(e){e?(this._isBeingResized=!0,this._isBeingResizedDelayed=!0,n.add(this.domNode,"isBeingResized")):(this._isBeingResized&&this._onManualSizeChangeEnd(),this._isBeingResized=!1,n.remove(this.domNode,"isBeingResized"),h.stealFocus(),setTimeout(function(){this._isBeingResizedDelayed=!1}.bind(this),100)),this._tooltipHandles.forEach(function(i){e?i.suspend():i.resume()}),S.setIsBeingResized(this,e)},_getResisableNodePos:function(){return h.position(this.domNode)},_applyResizedCellBox:function(e,t){var s=i.mixin({},e),n=this.resizeRestrictNode&&h.position(this.resizeRestrictNode),l=!1,o=!1;if(s.dxShiftSingle||s.dyShiftSingle){if(n){var d=this._getResisableNodePos();s.dxShiftSingle<0?n.x>=d.x?(s.dxShiftSingle=0,l=!0):(s.dxShiftSingle=Math.max(s.dxShiftSingle,n.x-d.x),s.w-=s.dxShiftSingle-e.dxShiftSingle):s.x<=n.x?(s.dxShiftSingle=0,l=!0):(s.dxShiftSingle=Math.min(s.dxShiftSingle,s.x-n.x),s.w-=e.dxShiftSingle-s.dxShiftSingle),s.dyShiftSingle<0?n.y>=d.y?(s.dyShiftSingle=0,o=!0):(s.dyShiftSingle=Math.max(s.dyShiftSingle,n.y-d.y),s.h-=s.dyShiftSingle-e.dyShiftSingle):s.y<=n.y?(s.dyShiftSingle=0,o=!0):(s.dyShiftSingle=Math.min(s.dyShiftSingle,s.y-n.y),s.h-=e.dyShiftSingle-s.dyShiftSingle)}this.onNeedShiftPositionFromResizing(s.dxShiftSingle,s.dyShiftSingle)}if(t.canChangeX&&0===s.dxShiftSingle&&(l=!0),t.canChangeY&&0===s.dyShiftSingle&&(o=!0),s.dwSingle||s.dhSingle){if(n){var d=this._getResisableNodePos(),a=n.x+n.w-d.x,r=n.y+n.h-d.y;s.w=Math.max(3,Math.min(s.w,a)),s.h=Math.max(3,Math.min(s.h,r))}l||this.setWidth(s.w),o||this.setHeight(s.h)}},updateSizers:function(){this._updateSizers()},_updateSizers:function(){function e(){i._sizers.forEach(function(e){var t,s,n=e._sizerInfo,l=i.getWidth(),d=i.getHeight(),a=o.get(e,"width"),r=o.get(e,"height");switch(n.dir){case"e":t=l,s=(d-r)/2;break;case"se":t=l,s=d;break;case"s":t=(l-a)/2,s=d;break;case"sw":t=0,s=d;break;case"w":t=0,s=(d-r)/2;break;case"nw":t=0,s=0;break;case"n":t=(l-a)/2,s=0;break;case"ne":t=l,s=0}o.set(e,{left:t+"px",top:s+"px",cursor:n.dir+"-resize",marginLeft:n.canChangeW?-a/2+"px":"",marginTop:n.canChangeH?-r/2+"px":""}),"w"!==n.dir&&"e"!==n.dir||h[d<30?"hide":"show"](e),"s"!==n.dir&&"n"!==n.dir||h[l<30?"hide":"show"](e)})}if(this._createSizers(),this._sizers&&this.hasAllSidesSizers){var i=this;o.get(this.domNode,"height")>5?e():setTimeout(e,100)}},_onManualSizePreChange:function(){this.setToolbarSuspended&&this.setToolbarSuspended(!0),this.onManualSizePreChange()},_onManualSizeChange:function(e){this.inherited(arguments),this.showSizeLabel&&this._showAndUpdateSizeLabel(),this.showSizeLabelsInAllRelatedCells&&this._showAndUpdateRelatedCellsSizeLabels(),this.showColumnRowSizeTooltip&&("e"===e.dir?d.showColumnTooltip(this):"s"===e.dir&&d.showRowTooltip(this))},_onManualSizeChangeEnd:function(){h.hide(this.sizeLabel),this.setToolbarSuspended&&this.setToolbarSuspended(!1),this.showSizeLabelsInAllRelatedCells&&this._hideRelatedCellsSizeLabels(),this.showColumnRowSizeTooltip&&d.removeTooltip(),this.onManualSizeChangeEnd()},_showAndUpdateSizeLabel:function(){this.sizeLabel=this.sizeLabel||l.create("div",{class:"elementSizeLabel"},this.domNode),h.show(this.sizeLabel),setTimeout(function(){if(this.domNode&&!h.isHidden(this.sizeLabel)){var e=this.domNode.clientWidth,i=this.domNode.clientHeight,t=a.pxToPt(e),n=a.pxToPt(i);this.sizeLabel.innerHTML=s.substitute(u.elementSizeFormatPt,{width:Math.round(t),height:Math.round(n)});var l=this.sizeLabel.clientWidth,o=this.sizeLabel.clientHeight;this.sizeLabel.style.left=(e-l)/2+"px",this.sizeLabel.style.top=(i>20?(i-o)/2:-o-5)+"px"}}.bind(this))},_showAndUpdateRelatedCellsSizeLabels:function(){this._getRelatedCells().forEach(function(e){e._showAndUpdateSizeLabel()})},_hideRelatedCellsSizeLabels:function(){this._getRelatedCells().forEach(function(e){h.hide(e.sizeLabel)})},_getRelatedCells:function(){return this.parentGrid?this.parentGrid.getFieldCells().filter(function(e){return e!==this},this):[]},onManualSizePreChange:function(){},onManualSizeChangeEnd:function(){},onManualSizeChange:function(){},onManualWidthChange:function(e){},onManualHeightChange:function(e){},onNeedShiftPositionFromResizing:function(e,i){}})});