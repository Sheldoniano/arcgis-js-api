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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Accessor","../../../core/Handles","../../../core/watchUtils","../../../core/accessorSupport/decorators","./handlers/DoubleClickZoom","./handlers/DragRotate","./handlers/DragZoom","./handlers/GamepadNavigation","./handlers/KeyboardNavigation","./handlers/MouseWheelZoom","./handlers/PinchAndPanNavigation","./handlers/PointerDownCancelAnimation","./handlers/SingleKeyResetHeading","./handlers/SingleKeyResetTilt","./handlers/TwoFingerTilt","../../input/BrowserEventSource","../../input/InputManager","../../input/handlers/PreventContextMenu","../../input/recognizers/Drag","../../input/recognizers/ImmediateDoubleClick","../../input/recognizers/PointerClickHoldAndDrag","../../input/recognizers/SingleAndDoubleClick","../../input/recognizers/VerticalTwoFingerDrag"],(function(e,t,n,r,o,a,i,s,p,d,c,l,g,u,h,m,y,w,D,v,_,f,P,A,b,M,R){var T=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new a,t}return n(t,e),t.prototype.destroy=function(){this._handles&&(this._handles.removeAll(),this._handles=null),this.disconnect()},Object.defineProperty(t.prototype,"primaryDragAction",{get:function(){return this._get("primaryDragAction")},set:function(e){"pan"!==e&&"rotate"!==e||e===this._get("primaryDragAction")||(this._set("primaryDragAction",e),this._updateMode())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mode",{get:function(){return this._get("mode")},set:function(e){"default"!==e&&"pro"!==e||e===this._get("mode")||(this._set("mode",e),this._updateMode())},enumerable:!0,configurable:!0}),t.prototype.disconnect=function(){this.view.viewEvents.disconnect(),this._inputManager&&(this._inputManager.destroy(),this._inputManager=null),this._source&&(this._source.destroy(),this._source=null)},t.prototype.connect=function(){var e=this,t=this.view;this._source=new v.BrowserEventSource(this.view.surface,t.input);var n=[new A.ImmediateDoubleClick,new b.PointerClickHoldAndDrag,new M.SingleAndDoubleClick,new P.Drag(this.view.navigation),new R.VerticalTwoFingerDrag],r=new _.InputManager({eventSource:this._source,recognizers:n});this._inputManager=r,r.installHandlers("prevent-context-menu",[new f.PreventContextMenu],_.ViewEventPriorities.INTERNAL),this._modeDragPan=new h.PinchAndPanNavigation(t,"primary"),this._modeDragRotate=new d.DragRotate(t,"secondary","center"),this._modeDragZoom=new c.DragZoom(t,"tertiary");var o="b",a={left:"ArrowLeft",right:"ArrowRight",forward:"ArrowUp",backward:"ArrowDown",up:"u",down:"j",headingLeft:"a",headingRight:"d",tiltUp:"w",tiltDown:"s",zoomIn:"+",zoomOut:"-"},s="n",T="p";r.installHandlers("navigation",[new m.PointerDownCancelAnimation(t),new p.DoubleClickZoom(t),new l.GamepadNavigation(t),new g.KeyboardNavigation(t,a),new u.MouseWheelZoom(t),new w.SingleKeyResetTilt(t,T),new y.SingleKeyResetHeading(t,s),new d.DragRotate(t,"primary","eye",[o]),new d.DragRotate(t,"secondary","center",[o]),new h.PinchAndPanNavigation(t,"tertiary",[o]),this._modeDragRotate,this._modeDragZoom,this._modeDragPan,new D.TwoFingerTilt(t)],_.ViewEventPriorities.INTERNAL),this.view.viewEvents.connect(r),this._updateMode(),i.init(this.view.navigation,"browserTouchPanEnabled",(function(t){e._source.browserTouchPanningEnabled=!t}))},t.prototype._updateMode=function(){var e=this.mode,t=this.primaryDragAction,n=z.get(e).get(t);this._modeDragPan&&(this._modeDragPan.pointerAction=n.pan),this._modeDragRotate&&(this._modeDragRotate.pointerAction=n.rotate),this._modeDragZoom&&(this._modeDragZoom.pointerAction=n.zoom)},Object.defineProperty(t.prototype,"test",{get:function(){return{inputManager:this._inputManager,modeDragPan:this._modeDragPan,modeDragRotate:this._modeDragRotate,modeDragZoom:this._modeDragZoom}},enumerable:!0,configurable:!0}),r([s.property()],t.prototype,"view",void 0),r([s.property({value:"pan"})],t.prototype,"primaryDragAction",null),r([s.property({value:"default"})],t.prototype,"mode",null),r([s.property({readOnly:!0,aliasOf:"_inputManager.hasPendingInputs"})],t.prototype,"hasPendingInputs",void 0),r([s.property({readOnly:!0,aliasOf:"_inputManager.latestPointerType"})],t.prototype,"latestPointerType",void 0),r([s.property()],t.prototype,"_inputManager",void 0),t=r([s.subclass("esri.views.3d.input.SceneInputManager")],t)}(s.declared(o)),z=new Map,S=new Map,C=new Map;return S.set("pan",{pan:"primary",rotate:"secondary",zoom:"tertiary"}),S.set("rotate",{pan:"secondary",rotate:"primary",zoom:"tertiary"}),C.set("pan",{pan:"primary",rotate:"tertiary",zoom:"secondary"}),C.set("rotate",{pan:"tertiary",rotate:"primary",zoom:"secondary"}),z.set("default",S),z.set("pro",C),T}));