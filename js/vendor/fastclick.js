!function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(r)return r(a,!0);throw Error("Cannot find module '"+a+"'")}s=n[a]={exports:{}},e[a][0].call(s.exports,function(t){var n=e[a][1][t];return i(n||t)},s,s.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){function o(t,e){var n;if(e=e||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.lastTouchIdentifier=this.touchStartY=this.touchStartX=0,this.touchBoundary=e.touchBoundary||10,this.layer=t,this.tapDelay=e.tapDelay||200,!o.notNeeded(t)){for(var r="onMouse onClick onTouchStart onTouchMove onTouchEnd onTouchCancel".split(" "),a=0,c=r.length;a<c;a++)this[r[a]]=function(t,e){return function(){return t.apply(e,arguments)}}(this[r[a]],this);i&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,o){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,o):i.call(t,e,n,o)},t.addEventListener=function(e,n,o){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(t,e,n,o)}),"function"==typeof t.onclick&&(n=t.onclick,t.addEventListener("click",function(t){n(t)},!1),t.onclick=null)}}var i=0<navigator.userAgent.indexOf("Android"),r=/iP(ad|hone|od)/.test(navigator.userAgent),a=r&&/OS 4_\d(_\d)?/.test(navigator.userAgent),c=r&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);o.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(r&&"file"===t.type||t.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(t.className)},o.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!i;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},o.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],(n=document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},o.prototype.determineEventType=function(t){return i&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},o.prototype.focus=function(t){var e;r&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},o.prototype.updateScrollParent=function(t){var e,n;if(!(e=t.fastClickScrollParent)||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},o.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},o.prototype.onTouchStart=function(t){var e,n,o;if(1<t.targetTouches.length)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],r){if((o=window.getSelection()).rangeCount&&!o.isCollapsed)return!0;if(!a){if(n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},o.prototype.touchHasMoved=function(t){t=t.changedTouches[0];var e=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>e||Math.abs(t.pageY-this.touchStartY)>e},o.prototype.onTouchMove=function(t){return!this.trackingClick||((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0)},o.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},o.prototype.onTouchEnd=function(t){var e,n,o=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,e=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,c&&(n=t.changedTouches[0],o=document.elementFromPoint(n.pageX-window.pageXOffset,n.pageY-window.pageYOffset)||o,o.fastClickScrollParent=this.targetElement.fastClickScrollParent),"label"===(n=o.tagName.toLowerCase())){if(e=this.findControl(o)){if(this.focus(o),i)return!1;o=e}}else if(this.needsFocus(o))return 100<t.timeStamp-e||r&&window.top!==window&&"input"===n?(this.targetElement=null,!1):(this.focus(o),this.sendClick(o,t),r&&"select"===n||(this.targetElement=null,t.preventDefault()),!1);return!(!r||a||!(e=o.fastClickScrollParent)||e.fastClickLastScrollTop===e.scrollTop)||(this.needsClick(o)||(t.preventDefault(),this.sendClick(o,t)),!1)},o.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},o.prototype.onMouse=function(t){return!(this.targetElement&&!t.forwardedTouchEvent&&t.cancelable)||(!(!this.needsClick(this.targetElement)||this.cancelNextClick)||(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1))},o.prototype.onClick=function(t){return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail||((t=this.onMouse(t))||(this.targetElement=null),t)},o.prototype.destroy=function(){var t=this.layer;i&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},o.notNeeded=function(t){var e,n;if(void 0===window.ontouchstart)return!0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!i)return!0;if((e=document.querySelector("meta[name=viewport]"))&&(-1!==e.content.indexOf("user-scalable=no")||31<n&&window.innerWidth<=window.screen.width))return!0}return"none"===t.style.msTouchAction},o.attach=function(t,e){return new o(t,e)},"undefined"!=typeof define&&define.amd?define(function(){return o}):void 0!==e&&e.exports?(e.exports=o.attach,e.exports.FastClick=o):window.FastClick=o},{}],2:[function(t,e,n){t("./bower_components/fastclick/lib/fastclick.js")},{"./bower_components/fastclick/lib/fastclick.js":1}]},{},[2]);