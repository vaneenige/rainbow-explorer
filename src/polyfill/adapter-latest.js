!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.adapter=e()}}(function(){return function e(t,n,r){function i(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var d=Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return i(n?n:e)},u,u.exports,e,t,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(){},{}],2:[function(e,t){"use strict";!function(){var n=e("./utils"),r=n.log,i=n.browserDetails;t.exports.browserDetails=i,t.exports.extractVersion=n.extractVersion,t.exports.disableLog=n.disableLog;var o=e("./chrome/chrome_shim")||null,a=e("./edge/edge_shim")||null,s=e("./firefox/firefox_shim")||null,c=e("./safari/safari_shim")||null;switch(i.browser){case"chrome":if(!o||!o.shimPeerConnection)return void r("Chrome shim is not included in this adapter release.");r("adapter.js shimming chrome."),t.exports.browserShim=o,o.shimGetUserMedia(),o.shimMediaStream(),n.shimCreateObjectURL(),o.shimSourceObject(),o.shimPeerConnection(),o.shimOnTrack(),o.shimGetSendersWithDtmf();break;case"firefox":if(!s||!s.shimPeerConnection)return void r("Firefox shim is not included in this adapter release.");r("adapter.js shimming firefox."),t.exports.browserShim=s,s.shimGetUserMedia(),n.shimCreateObjectURL(),s.shimSourceObject(),s.shimPeerConnection(),s.shimOnTrack();break;case"edge":if(!a||!a.shimPeerConnection)return void r("MS edge shim is not included in this adapter release.");r("adapter.js shimming edge."),t.exports.browserShim=a,a.shimGetUserMedia(),n.shimCreateObjectURL(),a.shimPeerConnection();break;case"safari":if(!c)return void r("Safari shim is not included in this adapter release.");r("adapter.js shimming safari."),t.exports.browserShim=c,c.shimGetUserMedia();break;default:r("Unsupported browser!")}}()},{"./chrome/chrome_shim":3,"./edge/edge_shim":1,"./firefox/firefox_shim":5,"./safari/safari_shim":7,"./utils":8}],3:[function(e,t){"use strict";var n=e("../utils.js").log,r=e("../utils.js").browserDetails,i={shimMediaStream:function(){window.MediaStream=window.MediaStream||window.webkitMediaStream},shimOnTrack:function(){"object"!=typeof window||!window.RTCPeerConnection||"ontrack"in window.RTCPeerConnection.prototype||Object.defineProperty(window.RTCPeerConnection.prototype,"ontrack",{get:function(){return this._ontrack},set:function(e){var t=this;this._ontrack&&(this.removeEventListener("track",this._ontrack),this.removeEventListener("addstream",this._ontrackpoly)),this.addEventListener("track",this._ontrack=e),this.addEventListener("addstream",this._ontrackpoly=function(e){e.stream.addEventListener("addtrack",function(n){var r=new Event("track");r.track=n.track,r.receiver={track:n.track},r.streams=[e.stream],t.dispatchEvent(r)}),e.stream.getTracks().forEach(function(t){var n=new Event("track");n.track=t,n.receiver={track:t},n.streams=[e.stream],this.dispatchEvent(n)}.bind(this))}.bind(this))}})},shimGetSendersWithDtmf:function(){if("object"==typeof window&&window.RTCPeerConnection&&!("getSenders"in RTCPeerConnection.prototype)&&"createDTMFSender"in RTCPeerConnection.prototype){RTCPeerConnection.prototype.getSenders=function(){return this._senders};var e=RTCPeerConnection.prototype.addStream,t=RTCPeerConnection.prototype.removeStream;RTCPeerConnection.prototype.addStream=function(t){var n=this;n._senders=n._senders||[],e.apply(n,[t]),t.getTracks().forEach(function(e){n._senders.push({track:e,get dtmf(){return void 0===this._dtmf&&(this._dtmf="audio"===e.kind?n.createDTMFSender(e):null),this._dtmf}})})},RTCPeerConnection.prototype.removeStream=function(e){var n=this;n._senders=n._senders||[],t.apply(n,[e]),e.getTracks().forEach(function(e){var t=n._senders.find(function(t){return t.track===e});t&&n._senders.splice(n._senders.indexOf(t),1)})}}},shimSourceObject:function(){"object"==typeof window&&(!window.HTMLMediaElement||"srcObject"in window.HTMLMediaElement.prototype||Object.defineProperty(window.HTMLMediaElement.prototype,"srcObject",{get:function(){return this._srcObject},set:function(e){var t=this;return this._srcObject=e,this.src&&URL.revokeObjectURL(this.src),e?(this.src=URL.createObjectURL(e),e.addEventListener("addtrack",function(){t.src&&URL.revokeObjectURL(t.src),t.src=URL.createObjectURL(e)}),void e.addEventListener("removetrack",function(){t.src&&URL.revokeObjectURL(t.src),t.src=URL.createObjectURL(e)})):void(this.src="")}}))},shimPeerConnection:function(){window.RTCPeerConnection||(window.RTCPeerConnection=function(e,t){return n("PeerConnection"),e&&e.iceTransportPolicy&&(e.iceTransports=e.iceTransportPolicy),new webkitRTCPeerConnection(e,t)},window.RTCPeerConnection.prototype=webkitRTCPeerConnection.prototype,webkitRTCPeerConnection.generateCertificate&&Object.defineProperty(window.RTCPeerConnection,"generateCertificate",{get:function(){return webkitRTCPeerConnection.generateCertificate}}));var e=RTCPeerConnection.prototype.getStats;RTCPeerConnection.prototype.getStats=function(t,n,r){var i=this,o=arguments;if(arguments.length>0&&"function"==typeof t)return e.apply(this,arguments);if(0===e.length&&(0===arguments.length||"function"!=typeof arguments[0]))return e.apply(this,[]);var a=function(e){var t={},n=e.result();return n.forEach(function(e){var n={id:e.id,timestamp:e.timestamp,type:{localcandidate:"local-candidate",remotecandidate:"remote-candidate"}[e.type]||e.type};e.names().forEach(function(t){n[t]=e.stat(t)}),t[n.id]=n}),t},s=function(e){return new Map(Object.keys(e).map(function(t){return[t,e[t]]}))};if(arguments.length>=2){var c=function(e){o[1](s(a(e)))};return e.apply(this,[c,arguments[0]])}return new Promise(function(t,n){e.apply(i,[function(e){t(s(a(e)))},n])}).then(n,r)},r.version<51&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){var t=RTCPeerConnection.prototype[e];RTCPeerConnection.prototype[e]=function(){var e=arguments,n=this,r=new Promise(function(r,i){t.apply(n,[e[0],r,i])});return e.length<2?r:r.then(function(){e[1].apply(null,[])},function(t){e.length<3||e[2].apply(null,[t])})}}),r.version<52&&["createOffer","createAnswer"].forEach(function(e){var t=RTCPeerConnection.prototype[e];RTCPeerConnection.prototype[e]=function(){var e=this;if(arguments.length<1||1===arguments.length&&"object"==typeof arguments[0]){var n=1===arguments.length?arguments[0]:void 0;return new Promise(function(r,i){t.apply(e,[r,i,n])})}return t.apply(this,arguments)}}),["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){var t=RTCPeerConnection.prototype[e];RTCPeerConnection.prototype[e]=function(){return arguments[0]=new("addIceCandidate"===e?RTCIceCandidate:RTCSessionDescription)(arguments[0]),t.apply(this,arguments)}});var t=RTCPeerConnection.prototype.addIceCandidate;RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())}}};t.exports={shimMediaStream:i.shimMediaStream,shimOnTrack:i.shimOnTrack,shimGetSendersWithDtmf:i.shimGetSendersWithDtmf,shimSourceObject:i.shimSourceObject,shimPeerConnection:i.shimPeerConnection,shimGetUserMedia:e("./getusermedia")}},{"../utils.js":8,"./getusermedia":4}],4:[function(e,t){"use strict";var n=e("../utils.js").log,r=e("../utils.js").browserDetails;t.exports=function(){var e=function(e){if("object"!=typeof e||e.mandatory||e.optional)return e;var t={};return Object.keys(e).forEach(function(n){if("require"!==n&&"advanced"!==n&&"mediaSource"!==n){var r="object"==typeof e[n]?e[n]:{ideal:e[n]};void 0!==r.exact&&"number"==typeof r.exact&&(r.min=r.max=r.exact);var i=function(e,t){return e?e+t.charAt(0).toUpperCase()+t.slice(1):"deviceId"===t?"sourceId":t};if(void 0!==r.ideal){t.optional=t.optional||[];var o={};"number"==typeof r.ideal?(o[i("min",n)]=r.ideal,t.optional.push(o),o={},o[i("max",n)]=r.ideal,t.optional.push(o)):(o[i("",n)]=r.ideal,t.optional.push(o))}void 0!==r.exact&&"number"!=typeof r.exact?(t.mandatory=t.mandatory||{},t.mandatory[i("",n)]=r.exact):["min","max"].forEach(function(e){void 0!==r[e]&&(t.mandatory=t.mandatory||{},t.mandatory[i(e,n)]=r[e])})}}),e.advanced&&(t.optional=(t.optional||[]).concat(e.advanced)),t},t=function(t,i){if(t=JSON.parse(JSON.stringify(t)),t&&t.audio&&(t.audio=e(t.audio)),t&&"object"==typeof t.video){var o=t.video.facingMode;o=o&&("object"==typeof o?o:{ideal:o});var a=r.version<59;if(!(!o||"user"!==o.exact&&"environment"!==o.exact&&"user"!==o.ideal&&"environment"!==o.ideal||navigator.mediaDevices.getSupportedConstraints&&navigator.mediaDevices.getSupportedConstraints().facingMode&&!a)&&(delete t.video.facingMode,"environment"===o.exact||"environment"===o.ideal))return navigator.mediaDevices.enumerateDevices().then(function(r){r=r.filter(function(e){return"videoinput"===e.kind});var a=r.find(function(e){return-1!==e.label.toLowerCase().indexOf("back")})||r.length&&r[r.length-1];return a&&(t.video.deviceId=o.exact?{exact:a.deviceId}:{ideal:a.deviceId}),t.video=e(t.video),n("chrome: "+JSON.stringify(t)),i(t)});t.video=e(t.video)}return n("chrome: "+JSON.stringify(t)),i(t)},i=function(e){return{name:{PermissionDeniedError:"NotAllowedError",ConstraintNotSatisfiedError:"OverconstrainedError"}[e.name]||e.name,message:e.message,constraint:e.constraintName,toString:function(){return this.name+(this.message&&": ")+this.message}}},o=function(e,n,r){t(e,function(e){navigator.webkitGetUserMedia(e,n,function(e){r(i(e))})})};navigator.getUserMedia=o;var a=function(e){return new Promise(function(t,n){navigator.getUserMedia(e,t,n)})};if(navigator.mediaDevices||(navigator.mediaDevices={getUserMedia:a,enumerateDevices:function(){return new Promise(function(e){var t={audio:"audioinput",video:"videoinput"};return MediaStreamTrack.getSources(function(n){e(n.map(function(e){return{label:e.label,kind:t[e.kind],deviceId:e.id,groupId:""}}))})})},getSupportedConstraints:function(){return{deviceId:!0,echoCancellation:!0,facingMode:!0,frameRate:!0,height:!0,width:!0}}}),navigator.mediaDevices.getUserMedia){var s=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=function(e){return t(e,function(e){return s(e).then(function(t){if(e.audio&&!t.getAudioTracks().length||e.video&&!t.getVideoTracks().length)throw t.getTracks().forEach(function(e){e.stop()}),new DOMException("","NotFoundError");return t},function(e){return Promise.reject(i(e))})})}}else navigator.mediaDevices.getUserMedia=function(e){return a(e)};void 0===navigator.mediaDevices.addEventListener&&(navigator.mediaDevices.addEventListener=function(){n("Dummy mediaDevices.addEventListener called.")}),void 0===navigator.mediaDevices.removeEventListener&&(navigator.mediaDevices.removeEventListener=function(){n("Dummy mediaDevices.removeEventListener called.")})}},{"../utils.js":8}],5:[function(e,t){"use strict";var n=e("../utils").browserDetails,r={shimOnTrack:function(){"object"!=typeof window||!window.RTCPeerConnection||"ontrack"in window.RTCPeerConnection.prototype||Object.defineProperty(window.RTCPeerConnection.prototype,"ontrack",{get:function(){return this._ontrack},set:function(e){this._ontrack&&(this.removeEventListener("track",this._ontrack),this.removeEventListener("addstream",this._ontrackpoly)),this.addEventListener("track",this._ontrack=e),this.addEventListener("addstream",this._ontrackpoly=function(e){e.stream.getTracks().forEach(function(t){var n=new Event("track");n.track=t,n.receiver={track:t},n.streams=[e.stream],this.dispatchEvent(n)}.bind(this))}.bind(this))}})},shimSourceObject:function(){"object"==typeof window&&(!window.HTMLMediaElement||"srcObject"in window.HTMLMediaElement.prototype||Object.defineProperty(window.HTMLMediaElement.prototype,"srcObject",{get:function(){return this.mozSrcObject},set:function(e){this.mozSrcObject=e}}))},shimPeerConnection:function(){if("object"==typeof window&&(window.RTCPeerConnection||window.mozRTCPeerConnection)){window.RTCPeerConnection||(window.RTCPeerConnection=function(e,t){if(n.version<38&&e&&e.iceServers){for(var r=[],i=0;i<e.iceServers.length;i++){var o=e.iceServers[i];if(o.hasOwnProperty("urls"))for(var a=0;a<o.urls.length;a++){var s={url:o.urls[a]};0===o.urls[a].indexOf("turn")&&(s.username=o.username,s.credential=o.credential),r.push(s)}else r.push(e.iceServers[i])}e.iceServers=r}return new mozRTCPeerConnection(e,t)},window.RTCPeerConnection.prototype=mozRTCPeerConnection.prototype,mozRTCPeerConnection.generateCertificate&&Object.defineProperty(window.RTCPeerConnection,"generateCertificate",{get:function(){return mozRTCPeerConnection.generateCertificate}}),window.RTCSessionDescription=mozRTCSessionDescription,window.RTCIceCandidate=mozRTCIceCandidate),["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){var t=RTCPeerConnection.prototype[e];RTCPeerConnection.prototype[e]=function(){return arguments[0]=new("addIceCandidate"===e?RTCIceCandidate:RTCSessionDescription)(arguments[0]),t.apply(this,arguments)}});var e=RTCPeerConnection.prototype.addIceCandidate;RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?e.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())};var t=function(e){var t=new Map;return Object.keys(e).forEach(function(n){t.set(n,e[n]),t[n]=e[n]}),t},r={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=RTCPeerConnection.prototype.getStats;RTCPeerConnection.prototype.getStats=function(e,o,a){return i.apply(this,[e||null]).then(function(e){if(n.version<48&&(e=t(e)),n.version<53&&!o)try{e.forEach(function(e){e.type=r[e.type]||e.type})}catch(i){if("TypeError"!==i.name)throw i;e.forEach(function(t,n){e.set(n,Object.assign({},t,{type:r[t.type]||t.type}))})}return e}).then(o,a)}}}};t.exports={shimOnTrack:r.shimOnTrack,shimSourceObject:r.shimSourceObject,shimPeerConnection:r.shimPeerConnection,shimGetUserMedia:e("./getusermedia")}},{"../utils":8,"./getusermedia":6}],6:[function(e,t){"use strict";var n=e("../utils").log,r=e("../utils").browserDetails;t.exports=function(){var e=function(e){return{name:{SecurityError:"NotAllowedError",PermissionDeniedError:"NotAllowedError"}[e.name]||e.name,message:{"The operation is insecure.":"The request is not allowed by the user agent or the platform in the current context."}[e.message]||e.message,constraint:e.constraint,toString:function(){return this.name+(this.message&&": ")+this.message}}},t=function(t,i,o){var a=function(e){if("object"!=typeof e||e.require)return e;var t=[];return Object.keys(e).forEach(function(n){if("require"!==n&&"advanced"!==n&&"mediaSource"!==n){var r=e[n]="object"==typeof e[n]?e[n]:{ideal:e[n]};if((void 0!==r.min||void 0!==r.max||void 0!==r.exact)&&t.push(n),void 0!==r.exact&&("number"==typeof r.exact?r.min=r.max=r.exact:e[n]=r.exact,delete r.exact),void 0!==r.ideal){e.advanced=e.advanced||[];var i={};i[n]="number"==typeof r.ideal?{min:r.ideal,max:r.ideal}:r.ideal,e.advanced.push(i),delete r.ideal,Object.keys(r).length||delete e[n]}}}),t.length&&(e.require=t),e};return t=JSON.parse(JSON.stringify(t)),r.version<38&&(n("spec: "+JSON.stringify(t)),t.audio&&(t.audio=a(t.audio)),t.video&&(t.video=a(t.video)),n("ff37: "+JSON.stringify(t))),navigator.mozGetUserMedia(t,i,function(t){o(e(t))})},i=function(e){return new Promise(function(n,r){t(e,n,r)})};if(navigator.mediaDevices||(navigator.mediaDevices={getUserMedia:i,addEventListener:function(){},removeEventListener:function(){}}),navigator.mediaDevices.enumerateDevices=navigator.mediaDevices.enumerateDevices||function(){return new Promise(function(e){var t=[{kind:"audioinput",deviceId:"default",label:"",groupId:""},{kind:"videoinput",deviceId:"default",label:"",groupId:""}];e(t)})},r.version<41){var o=navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);navigator.mediaDevices.enumerateDevices=function(){return o().then(void 0,function(e){if("NotFoundError"===e.name)return[];throw e})}}if(r.version<49){var a=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=function(t){return a(t).then(function(e){if(t.audio&&!e.getAudioTracks().length||t.video&&!e.getVideoTracks().length)throw e.getTracks().forEach(function(e){e.stop()}),new DOMException("The object can not be found here.","NotFoundError");return e},function(t){return Promise.reject(e(t))})}}navigator.getUserMedia=function(e,n,i){return r.version<44?t(e,n,i):(console.warn("navigator.getUserMedia has been replaced by navigator.mediaDevices.getUserMedia"),void navigator.mediaDevices.getUserMedia(e).then(n,i))}}},{"../utils":8}],7:[function(e,t){"use strict";var n={shimGetUserMedia:function(){navigator.getUserMedia||(navigator.webkitGetUserMedia?navigator.getUserMedia=navigator.webkitGetUserMedia.bind(navigator):navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&(navigator.getUserMedia=function(e,t,n){navigator.mediaDevices.getUserMedia(e).then(t,n)}.bind(navigator)))}};t.exports={shimGetUserMedia:n.shimGetUserMedia}},{}],8:[function(e,t){"use strict";var n=!0,r={disableLog:function(e){return"boolean"!=typeof e?Error("Argument type: "+typeof e+". Please use a boolean."):(n=e,e?"adapter.js logging disabled":"adapter.js logging enabled")},log:function(){if("object"==typeof window){if(n)return;"undefined"!=typeof console&&"function"==typeof console.log&&console.log.apply(console,arguments)}},extractVersion:function(e,t,n){var r=e.match(t);return r&&r.length>=n&&parseInt(r[n],10)},detectBrowser:function(){var e={};if(e.browser=null,e.version=null,"undefined"==typeof window||!window.navigator)return e.browser="Not a browser.",e;if(navigator.mozGetUserMedia)e.browser="firefox",e.version=this.extractVersion(navigator.userAgent,/Firefox\/(\d+)\./,1);else if(navigator.webkitGetUserMedia)if(window.webkitRTCPeerConnection)e.browser="chrome",e.version=this.extractVersion(navigator.userAgent,/Chrom(e|ium)\/(\d+)\./,2);else{if(!navigator.userAgent.match(/Version\/(\d+).(\d+)/))return e.browser="Unsupported webkit-based browser with GUM support but no WebRTC support.",e;e.browser="safari",e.version=this.extractVersion(navigator.userAgent,/AppleWebKit\/(\d+)\./,1)}else if(navigator.mediaDevices&&navigator.userAgent.match(/Edge\/(\d+).(\d+)$/))e.browser="edge",e.version=this.extractVersion(navigator.userAgent,/Edge\/(\d+).(\d+)$/,2);else{if(!navigator.mediaDevices||!navigator.userAgent.match(/AppleWebKit\/(\d+)\./))return e.browser="Not a supported browser.",e;e.browser="safari",e.version=this.extractVersion(navigator.userAgent,/AppleWebKit\/(\d+)\./,1)}return e},shimCreateObjectURL:function(){if(!("object"==typeof window&&window.HTMLMediaElement&&"srcObject"in window.HTMLMediaElement.prototype))return void 0;var e=URL.createObjectURL.bind(URL),t=URL.revokeObjectURL.bind(URL),n=new Map,r=0;URL.createObjectURL=function(t){if("getTracks"in t){var i="polyblob:"+ ++r;return n.set(i,t),console.log("URL.createObjectURL(stream) is deprecated! Use elem.srcObject = stream instead!"),i}return e(t)},URL.revokeObjectURL=function(e){t(e),n.delete(e)};var i=Object.getOwnPropertyDescriptor(window.HTMLMediaElement.prototype,"src");Object.defineProperty(window.HTMLMediaElement.prototype,"src",{get:function(){return i.get.apply(this)},set:function(e){return this.srcObject=n.get(e)||null,i.set.apply(this,[e])}});var o=HTMLMediaElement.prototype.setAttribute;HTMLMediaElement.prototype.setAttribute=function(){return 2===arguments.length&&"src"===(""+arguments[0]).toLowerCase()&&(this.srcObject=n.get(arguments[1])||null),o.apply(this,arguments)}}};t.exports={log:r.log,disableLog:r.disableLog,browserDetails:r.detectBrowser(),extractVersion:r.extractVersion,shimCreateObjectURL:r.shimCreateObjectURL,detectBrowser:r.detectBrowser.bind(r)}},{}]},{},[2])(2)});
