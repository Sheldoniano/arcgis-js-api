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

define(["require","exports","dojo/_base/lang","./support/colors","../../../Color"],function(e,r,g,i,t){function l(e,r){return e.map(function(e){var g=new t(e);return null!=r&&(g.a=r),g})}function a(e,r){return e.r===r.r&&e.g===r.g&&e.b===r.b}function h(e,r){var g=0;if(e.length===r.length){var i=e.every(function(e,g){return a(e,r[g])});if(i)g=1;else{var t=e.slice(0).reverse();i=t.every(function(e,g){return a(e,r[g])}),i&&(g=-1)}}return g}function n(e,r){var g,i;if(i=h(e.colors,r))g=i>0?e:w.flipColors(e);else{var t;e.colorsForClassBreaks.some(function(e){return e.numClasses===r.length&&(t=e.colors),!!t}),t&&(i=h(t,r),i&&(g=i>0?e:w.flipColors(e)))}return g}function o(e,r){return e&&r?e.schemes[r]:null}function b(e){var r=e.basemaps,g=[];return r&&(g=g.concat(r)),g}function s(e,r,g,a,h){var n,o=i[e];if(o){var b=r.fillOpacity;null==b&&-1!==m.indexOf(e)&&(b=.8);var s=l(o.stops),d=[];for(var y in o)if("stops"!==y){var v=+y;d.push({numClasses:v,colors:l(o[v])})}var q=new t(-1!==m.indexOf(e)?p:u);switch(n={id:a+"/"+h+"/"+e,theme:a,opacity:b||1,colors:s,colorsForClassBreaks:d,noDataColor:q},g){case"point":n.outline={color:new t(r.outline.color),width:r.outline.width},n.size=r.size;break;case"polyline":n.width=r.width;break;case"polygon":n.outline={color:new t(r.outline.color),width:r.outline.width}}}return n}var d={light:{color:[128,128,128,1],width:.5},lighter:{color:[153,153,153,1],width:.5},lightest:{color:[153,153,153,.5],width:.5}},y={lightBasemaps:{outline:d.lighter,fillOpacity:.8,width:2,size:8},darkBasemaps:{outline:d.light,fillOpacity:.6,width:2,size:8},grayBasemaps:{outline:d.lightest,fillOpacity:.8,width:2,size:8}},u="#aaaaaa",p="#ffffff",m=["highlight-orange-gray","highlight-bluegreen-gray","highlight-purple-gray","highlight-pink-gray","highlight-blue-gray","highlight-red-gray","highlight-orange-gray-dark","highlight-blue-gray-dark","highlight-orange-gray-bright","highlight-blue-gray-bright","extremes-orange-gray","extremes-bluegreen-gray","extremes-purple-gray","extremes-pink-gray","extremes-blue-gray","extremes-red-gray","extremes-orange-gray-dark","extremes-blue-gray-dark","extremes-orange-gray-bright","extremes-blue-gray-bright"],v=["seq-single-blues","seq-single-greens","seq-single-grays","seq-single-oranges","seq-single-purples","seq-single-reds","seq-multi-bugn","seq-multi-bupu","seq-multi-gnbu","seq-multi-orrd","seq-multi-pubu","seq-multi-pubugn","seq-multi-purd","seq-multi-rdpu","seq-multi-ylgn","seq-multi-ylgnbu","seq-multi-ylorbr","seq-multi-ylorrd"],q=["div-brbg","div-piyg","div-prgn","div-puor","div-rdbu","div-rdgy","div-rdylbu","div-rdylgn","div-spectral"],c={"high-to-low":{name:"high-to-low",label:"TODO",description:"TODO",basemaps:["streets","gray","topo","terrain","national-geographic","oceans","osm","satellite","hybrid","dark-gray"],schemes:{streets:{common:y.lightBasemaps,primary:"seq-yellow-red-purple",secondary:["seq-yellow-orange-red","seq-yellow-pink-purple","seq-yellow-purple-blue","seq-yellow-green-blue","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(v)},gray:{common:y.grayBasemaps,primary:"seq-yellow-red-purple",secondary:["seq-orange-red-light","seq-yellow-orange-red","seq-yellow-pink-purple","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-red-lightgray-bright","seq-blue-lightgray-bright","seq-orange-lightgray-bright","seq-blue-red-yellow-bright","seq-blue-tan-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(v)},topo:{common:y.lightBasemaps,primary:"seq-yellow-green-blue",secondary:["seq-yellow-pink-purple","seq-yellow-purple-blue","seq-yellow-red-purple","seq-yellow-orange-red","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-blue-lightgray-bright","seq-orange-lightgray-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(v)},terrain:{common:y.lightBasemaps,primary:"seq-pink-red",secondary:["seq-yellow-pink-purple","seq-yellow-red-purple","seq-yellow-orange-red","seq-orange-red-light","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-red-lightgray-bright","seq-blue-lightgray-bright","seq-orange-lightgray-bright","seq-blue-red-yellow-bright","seq-blue-tan-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(v)},"national-geographic":{common:y.lightBasemaps,primary:"seq-yellow-orange-red",secondary:["seq-yellow-red-purple","seq-yellow-pink-purple","seq-yellow-purple-blue","seq-yellow-green-blue","seq-teal-lightgreen-bright","seq-blue-lightgray-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(v)},oceans:{common:y.lightBasemaps,primary:"seq-yellow-green-blue",secondary:["seq-yellow-red-purple","seq-yellow-orange-red","seq-yellow-pink-purple","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-red-lightgray-bright","seq-blue-lightgray-bright","seq-blue-red-yellow-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(v)},osm:{common:y.lightBasemaps,primary:"seq-red-blue-green",secondary:["seq-yellow-pink-purple","seq-yellow-red-purple","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-blue-lightgray-bright","seq-blue-red-yellow-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(v)},satellite:{common:y.darkBasemaps,primary:"seq-orange-red-dark",secondary:["seq-yellow-green-blue","seq-red-blue-green","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-blue-lightgray-bright","seq-gray-lightgreen-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright","seq-lightmagenta-darkgray-bright","seq-lightblue-darkgray-bright"].concat(v)},hybrid:{common:y.darkBasemaps,primary:"seq-orange-red-dark",secondary:["seq-yellow-green-blue","seq-red-blue-green","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-blue-lightgray-bright","seq-gray-lightgreen-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright","seq-lightmagenta-darkgray-bright","seq-lightblue-darkgray-bright"].concat(v)},"dark-gray":{common:y.grayBasemaps,primary:"seq-dark-to-light-blue-bright",secondary:["seq-blue-lightgray-bright","seq-gray-lightgreen-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-teal-lightgreen-bright","seq-lightred-darkgray-bright","seq-lightmagenta-darkgray-bright","seq-lightblue-darkgray-bright"].concat(v)}}},"above-and-below":{name:"above-and-below",label:"TODO",description:"TODO",basemaps:["streets","gray","topo","terrain","national-geographic","oceans","osm","satellite","hybrid","dark-gray"],schemes:{streets:{common:y.lightBasemaps,primary:"div-bluegreen-yellow-orange",secondary:["div-orange-yellow-blue-light","div-green-yellow-redpurple","div-green-yellow-orange","div-green-gray-bright","div-red-blue-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightred-gray-bright"].concat(q)},gray:{common:y.grayBasemaps,primary:"div-bluegreen-orange",secondary:["div-orange-purple","div-bluegreen-purple","div-orange-pink","div-blue-yellow-red-bright","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(q)},topo:{common:y.lightBasemaps,primary:"div-orange-pink",secondary:["div-redpurple-blue","div-orange-blue","div-green-pink","div-blue-yellow-red-bright","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(q)},terrain:{common:y.lightBasemaps,primary:"div-bluegreen-orange",secondary:["div-bluegreen-redpurple","div-green-redpurple","div-green-orange","div-blue-yellow-red-bright","div-green-gray-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(q)},"national-geographic":{common:y.lightBasemaps,primary:"div-orange-yellow-blue-light",secondary:["div-bluegreen-yellow-orange","div-green-yellow-redpurple","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(q)},oceans:{common:y.lightBasemaps,primary:"div-red-yellow-pink",secondary:["div-blue-green","div-bluegreen-yellow-redpurple","div-bluegreen-yellow-orange","div-blue-yellow-red-bright","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(q)},osm:{common:y.lightBasemaps,primary:"div-bluegreen-pink",secondary:["div-bluegreen-redpurple","div-bluegreen-orange","div-orange-pink","div-green-gray-bright","div-red-blue-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(q)},satellite:{common:y.darkBasemaps,primary:"div-blue-green-bright",secondary:["div-red-yellow-purple","div-orange-yellow-pink","div-orange-yellow-blue-light","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-orange-yellow-blue-dark","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-lightmagenta-gray-bright","div-yellow-green-bright","div-lightblue-yellow-bright","div-green-darkgray-bright"].concat(q)},hybrid:{common:y.darkBasemaps,primary:"div-blue-green-bright",secondary:["div-red-yellow-purple","div-orange-yellow-pink","div-orange-yellow-blue-light","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-orange-yellow-blue-dark","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-lightmagenta-gray-bright","div-yellow-green-bright","div-lightblue-yellow-bright","div-green-darkgray-bright"].concat(q)},"dark-gray":{common:y.grayBasemaps,primary:"div-blue-green-bright",secondary:["div-yellow-gray-purple","div-lightblue-yellow-bright","div-red-gray-blue","div-green-gray-purple","div-orange-gray-blue","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-green-teal-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-lightmagenta-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(q)}}},"centered-on":{name:"centered-on",label:"TODO",description:"TODO",basemaps:["streets","gray","topo","terrain","national-geographic","oceans","osm","satellite","hybrid","dark-gray"],schemes:{streets:{common:{outline:d.lighter,width:2,size:8},primary:"highlight-orange",secondary:["highlight-bluegreen","highlight-orange-gray","highlight-bluegreen-gray"]},gray:{common:{outline:d.lighter,width:2,size:8},primary:"highlight-orange",secondary:["highlight-purple","highlight-orange-gray","highlight-purple-gray"]},topo:{common:{outline:d.lighter,width:2,size:8},primary:"highlight-orange",secondary:["highlight-pink","highlight-orange-gray","highlight-pink-gray"]},terrain:{common:{outline:d.lighter,width:2,size:8},primary:"highlight-orange",secondary:["highlight-bluegreen","highlight-orange-gray","highlight-bluegreen-gray"]},"national-geographic":{common:{outline:d.lighter,width:2,size:8},primary:"highlight-orange",secondary:["highlight-blue","highlight-orange-gray","highlight-blue-gray"]},oceans:{common:{outline:d.lighter,width:2,size:8},primary:"highlight-red",secondary:["highlight-pink","highlight-red-gray","highlight-pink-gray"]},osm:{common:{outline:d.lighter,width:2,size:8},primary:"highlight-pink",secondary:["highlight-bluegreen","highlight-pink-gray","highlight-bluegreen-gray"]},satellite:{common:{outline:d.light,width:2,size:8},primary:"highlight-orange-dark",secondary:["highlight-blue-dark","highlight-orange-gray-dark","highlight-blue-gray-dark"]},hybrid:{common:{outline:d.light,width:2,size:8},primary:"highlight-orange-dark",secondary:["highlight-blue-dark","highlight-orange-gray-dark","highlight-blue-gray-dark"]},"dark-gray":{common:{outline:d.light,width:2,size:8},primary:"highlight-orange-bright",secondary:["highlight-blue-bright","highlight-orange-gray-bright","highlight-blue-gray-bright"]}}},extremes:{name:"extremes",label:"TODO",description:"TODO",basemaps:["streets","gray","topo","terrain","national-geographic","oceans","osm","satellite","hybrid","dark-gray"],schemes:{streets:{common:{outline:d.lighter,width:2,size:8},primary:"extremesdiv-bluegreen-yellow-orange",secondary:["extremesdiv-orange-yellow-blue-light","extremesdiv-green-yellow-redpurple","extremesdiv-green-yellow-orange","extremes-orange","extremes-bluegreen","extremes-orange-gray","extremes-bluegreen-gray"]},gray:{common:{outline:d.lighter,width:2,size:8},primary:"extremesdiv-orange-purple",secondary:["extremesdiv-bluegreen-purple","extremesdiv-bluegreen-orange","extremesdiv-orange-pink","extremes-orange","extremes-purple","extremes-orange-gray","extremes-purple-gray"]},topo:{common:{outline:d.lighter,width:2,size:8},primary:"extremesdiv-orange-pink",secondary:["extremesdiv-redpurple-blue","extremesdiv-orange-blue","extremesdiv-green-pink","extremes-orange","extremes-pink","extremes-orange-gray","extremes-pink-gray"]},terrain:{common:{outline:d.lighter,width:2,size:8},primary:"extremesdiv-bluegreen-orange",secondary:["extremesdiv-bluegreen-redpurple","extremesdiv-green-redpurple","extremesdiv-green-orange","extremes-orange","extremes-bluegreen","extremes-orange-gray","extremes-bluegreen-gray"]},"national-geographic":{common:{outline:d.lighter,width:2,size:8},primary:"extremesdiv-orange-yellow-blue-light",secondary:["extremesdiv-bluegreen-yellow-orange","extremesdiv-green-yellow-redpurple","extremes-orange","extremes-blue","extremes-orange-gray","extremes-blue-gray"]},oceans:{common:{outline:d.lighter,width:2,size:8},primary:"extremesdiv-red-yellow-pink",secondary:["extremesdiv-blue-green","extremesdiv-bluegreen-yellow-redpurple","extremesdiv-bluegreen-yellow-orange","extremes-red","extremes-pink","extremes-red-gray","extremes-pink-gray"]},osm:{common:{outline:d.lighter,width:2,size:8},primary:"extremesdiv-bluegreen-pink",secondary:["extremesdiv-bluegreen-redpurple","extremesdiv-bluegreen-orange","extremesdiv-orange-pink","extremes-pink","extremes-bluegreen","extremes-pink-gray","extremes-bluegreen-gray"]},satellite:{common:{outline:d.light,width:2,size:8},primary:"extremesdiv-orange-yellow-blue-dark",secondary:["extremesdiv-red-yellow-purple","extremesdiv-orange-yellow-pink","extremesdiv-orange-yellow-blue-light","extremes-orange-dark","extremes-blue-dark","extremes-orange-gray-dark","extremes-blue-gray-dark"]},hybrid:{common:{outline:d.light,width:2,size:8},primary:"extremesdiv-orange-yellow-blue-dark",secondary:["extremesdiv-red-yellow-purple","extremesdiv-orange-yellow-pink","extremesdiv-orange-yellow-blue-light","extremes-orange-dark","extremes-blue-dark","extremes-orange-gray-dark","extremes-blue-gray-dark"]},"dark-gray":{common:{outline:d.light,width:2,size:8},primary:"extremesdiv-orange-gray-blue",secondary:["extremesdiv-yellow-gray-purple","extremesdiv-red-gray-blue","extremesdiv-green-gray-purple","extremes-orange-bright","extremes-blue-bright","extremes-orange-gray-bright","extremes-blue-gray-bright"]}}}},w={getThemes:function(e){var r=[];for(var g in c){var i=c[g],t=b(i);e&&-1===t.indexOf(e)||r.push({name:i.name,label:i.label,description:i.description,basemaps:t})}return r},getSchemes:function(e){var r,g=e.themeName,i=e.basemap,t=e.geometryType,l=c[g],a=o(l,i);return a&&(r={primaryScheme:s(a.primary,a.common,t,g,i),secondarySchemes:a.secondary.map(function(e){return s(e,a.common,t,g,i)})}),r},getSchemeById:function(e){var r,g,i,t,l=e.id,a=e.geometryType;if(l){var h=l.split("/");h&&(g=h[0],i=h[1],t=h[2])}var n=o(c[g],i);return n&&(r=s(t,n.common,a,g,i)),r},cloneScheme:function(e){var r;return e&&(r=g.mixin({},e),r.colors=l(r.colors),r.colorsForClassBreaks=r.colorsForClassBreaks.map(function(e){return{numClasses:e.numClasses,colors:l(e.colors)}}),r.noDataColor&&(r.noDataColor=new t(r.noDataColor)),r.outline&&(r.outline={color:r.outline.color&&new t(r.outline.color),width:r.outline.width})),r},flipColors:function(e){var r=e;return r.colors.reverse(),r.colorsForClassBreaks.forEach(function(e){e.colors.reverse()}),r},getMatchingSchemes:function(e){var r=e.themeName,g=e.geometryType,i=e.colors,t=c[r],l=b(t),a=[];return l.forEach(function(e){var l=o(t,e);if(l){var h=n(s(l.primary,l.common,g,r,e),i);h&&a.push(h),l.secondary.forEach(function(t){var h=n(s(t,l.common,g,r,e),i);h&&a.push(h)})}}),a}};return w});