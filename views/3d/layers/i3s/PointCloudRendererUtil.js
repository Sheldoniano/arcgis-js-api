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

define(["require","exports","../../../../core/maybe","../../../../renderers/PointCloudClassBreaksRenderer","../../../../renderers/PointCloudStretchRenderer","../../../../renderers/PointCloudUniqueValueRenderer","./I3SBinaryReader","./LEPCC"],(function(e,r,t,n,o,l,i,a){function u(e){for(var r=0,t=0,n=e||[];t<n.length;t++){r|=1<<n[t]}return r}function f(e,r){for(var t=0,n=e;t<n.length;t++){var o=n[t];if(o.name===r&&null!=o.attributeValues&&"UInt8"===o.attributeValues.valueType&&3===o.attributeValues.valuesPerElement)return{name:r,storageInfo:o,useElevation:!1}}return null}function s(e,r){for(var t=0,n=e;t<n.length;t++){var o=n[t];if(o.name===r){var l="embedded-elevation"===o.encoding;return{name:r,storageInfo:l?null:o,useElevation:l}}}return"elevation"===r.toLowerCase()?{name:r,storageInfo:null,useElevation:!0}:null}function d(e,r){for(var t=new Float64Array(r),n=0;n<r;n++)t[n]=e[3*n+2];return t}function c(e){return null==e||"none"===e?null:"low-four-bit"===e?function(e){return 15&e}:"high-four-bit"===e?function(e){return(240&e)>>4}:"absolute-value"===e?function(e){return Math.abs(e)}:"modulo-ten"===e?function(e){return e%10}:null}Object.defineProperty(r,"__esModule",{value:!0}),r.getRendererInfo=function(e){var r=e.renderer,t=r&&r.type,n=r&&e.renderer.toJSON()||null,o=null,l=!1;"point-cloud-unique-value"===t?o=s(e.attributeStorageInfo,r.field):"point-cloud-stretch"===t?o=s(e.attributeStorageInfo,r.field):"point-cloud-class-breaks"===t?o=s(e.attributeStorageInfo,r.field):l="point-cloud-rgb"===t?null!=(o=f(e.attributeStorageInfo,r.field)):null!=(o=f(e.attributeStorageInfo,"RGB"));var i=null;return r&&r.colorModulation&&(i=s(e.attributeStorageInfo,r.colorModulation.field)),{rendererJSON:n,isRGBRenderer:l,primaryAttribute:o,modulationAttribute:i}},r.getFilterInfo=function(e){var r=e.filters;return r?r.map((function(r){return{filterJSON:r.toJSON(),attributeInfo:s(e.attributeStorageInfo,r.field)}})):[]},r.evaluateRenderer=function(e,r,t,i){var a=e.rendererJSON,u=e.isRGBRenderer,f=null,s=null;if(r&&u)f=r;else if(r&&"pointCloudUniqueValueRenderer"===a.type){var d=(s=l.fromJSON(a)).colorUniqueValueInfos;f=new Uint8Array(3*i);for(var v=c(s.fieldTransformType),g=0;g<i;g++)for(var b=(y=v?v(r[g]):r[g])+"",p=0;p<d.length;p++)if(d[p].values.indexOf(b)>=0){f[3*g]=d[p].color.r,f[3*g+1]=d[p].color.g,f[3*g+2]=d[p].color.b;break}}else if(r&&"pointCloudStretchRenderer"===a.type){var m=(s=o.fromJSON(a)).stops;f=new Uint8Array(3*i);for(v=c(s.fieldTransformType),g=0;g<i;g++){var y=v?v(r[g]):r[g],S=m.length-1;if(y<m[0].value)f[3*g]=m[0].color.r,f[3*g+1]=m[0].color.g,f[3*g+2]=m[0].color.b;else if(y>=m[S].value)f[3*g]=m[S].color.r,f[3*g+1]=m[S].color.g,f[3*g+2]=m[S].color.b;else for(p=1;p<m.length;p++)if(y<m[p].value){var h=(y-m[p-1].value)/(m[p].value-m[p-1].value);f[3*g]=m[p].color.r*h+m[p-1].color.r*(1-h),f[3*g+1]=m[p].color.g*h+m[p-1].color.g*(1-h),f[3*g+2]=m[p].color.b*h+m[p-1].color.b*(1-h);break}}}else if(r&&"pointCloudClassBreaksRenderer"===a.type){var I=(s=n.fromJSON(a)).colorClassBreakInfos;f=new Uint8Array(3*i);for(v=c(s.fieldTransformType),g=0;g<i;g++)for(y=v?v(r[g]):r[g],p=0;p<I.length;p++)if(y>=I[p].minValue&&y<=I[p].maxValue){f[3*g]=I[p].color.r,f[3*g+1]=I[p].color.g,f[3*g+2]=I[p].color.b;break}}else{f=new Uint8Array(3*i);for(g=0;g<f.length;g++)f[g]=255}if(t&&s&&s.colorModulation){var A=s.colorModulation.minValue,C=s.colorModulation.maxValue;for(g=0;g<i;g++){var R=(y=t[g])>=C?1:y<=A?.3:.3+.7*(y-A)/(C-A);f[3*g]=R*f[3*g],f[3*g+1]=R*f[3*g+1],f[3*g+2]=R*f[3*g+2]}}return f},r.filterInPlace=function(e,r,t,n,o){for(var l=e.length/3,i=0,a=0;a<l;a++){for(var f=!0,s=0;s<n.length&&f;s++){var d=n[s].filterJSON,c=o[s].values[a];switch(d.type){case"pointCloudValueFilter":var v="exclude"===d.mode;-1!==d.values.indexOf(c)===v&&(f=!1);break;case"pointCloudBitfieldFilter":var g=u(d.requiredSetBits),b=u(d.requiredClearBits);(c&g)===g&&0==(c&b)||(f=!1);break;case"pointCloudReturnFilter":for(var p=15&c,m=c>>>4&15,y=m>1,S=1===p,h=p===m,I=!1,A=0,C=d.includedReturns;A<C.length;A++){var R=C[A];if("last"===R&&h||"firstOfMany"===R&&S&&y||"lastOfMany"===R&&h&&y||"single"===R&&!y){I=!0;break}}I||(f=!1)}}f&&(t[i]=a,e[3*i]=e[3*a],e[3*i+1]=e[3*a+1],e[3*i+2]=e[3*a+2],r[3*i]=r[3*a],r[3*i+1]=r[3*a+1],r[3*i+2]=r[3*a+2],i++)}return i},r.getSplatSizeAlgorithm=function(e){var r=e&&e.pointSizeAlgorithm;return r&&"splat"===r.type?r:null},r.getFixedSizeAlgorithm=function(e){var r=e&&e.pointSizeAlgorithm;return r&&"fixed-size"===r.type?r:null},r.rendererUsesFixedSizes=function(e){var r=e&&e.pointSizeAlgorithm;return!(!r||!r.type)&&"fixed-size"===r.type},r.getAttributeInfo=s,r.elevationFromPositions=d,r.getAttributeValues=function(e,r,n){return t.isSome(e)&&e.attributeInfo.useElevation?d(r,n):t.isSome(e)?i.readBinaryAttribute(e.attributeInfo.storageInfo,e.buffer,n):null},r.readGeometry=function(e,r){if(null==e.encoding||""===e.encoding){for(var t=i.createGeometryIndexFromSchema(r,e),n=i.createTypedView(r,t.vertexAttributes.position),o=t.header.fields,l=[o.offsetX,o.offsetY,o.offsetZ],u=[o.scaleX,o.scaleY,o.scaleZ],f=n.length/3,s=new Float64Array(3*f),d=0;d<f;d++)s[3*d]=n[3*d]*u[0]+l[0],s[3*d+1]=n[3*d+1]*u[1]+l[1],s[3*d+2]=n[3*d+2]*u[2]+l[2];return s}if("lepcc-xyz"===e.encoding)return a.decodeXYZ(r).result}}));