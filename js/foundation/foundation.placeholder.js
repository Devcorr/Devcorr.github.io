!function(e,t,a){function l(e){var t={},l=/^jQuery\d+$/;return a.each(e.attributes,function(e,a){a.specified&&!l.test(a.name)&&(t[a.name]=a.value)}),t}function r(e,l){var r=this,o=a(r);if(r.value==o.attr("placeholder")&&o.hasClass("placeholder"))if(o.data("placeholder-password")){if(o=o.hide().next().show().attr("id",o.removeAttr("id").data("placeholder-id")),!0===e)return o[0].value=l;o.focus()}else r.value="",o.removeClass("placeholder"),r==t.activeElement&&r.select()}function o(){var e,t=this,o=a(t),n=this.id;if(""==t.value){if("password"==t.type){if(!o.data("placeholder-textinput")){try{e=o.clone().attr({type:"text"})}catch(t){e=a("<input>").attr(a.extend(l(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":!0,"placeholder-id":n}).bind("focus.placeholder",r),o.data({"placeholder-textinput":e,"placeholder-id":n}).before(e)}o=o.removeAttr("id").hide().prev().attr("id",n).show()}o.addClass("placeholder"),o[0].value=o.attr("placeholder")}else o.removeClass("placeholder")}var n,i,c="placeholder"in t.createElement("input"),d="placeholder"in t.createElement("textarea"),h=a.fn,u=a.valHooks;c&&d?(i=h.placeholder=function(){return this}).input=i.textarea=!0:((i=h.placeholder=function(){var e=this;return e.filter((c?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":r,"blur.placeholder":o}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e}).input=c,i.textarea=d,n={get:function(e){var t=a(e);return t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,l){var n=a(e);return n.data("placeholder-enabled")?(""==l?(e.value=l,e!=t.activeElement&&o.call(e)):n.hasClass("placeholder")?r.call(e,!0,l)||(e.value=l):e.value=l,n):e.value=l}},c||(u.input=n),d||(u.textarea=n),a(function(){a(t).delegate("form","submit.placeholder",function(){var e=a(".placeholder",this).each(r);setTimeout(function(){e.each(o)},10)})}),a(e).bind("beforeunload.placeholder",function(){a(".placeholder").each(function(){this.value=""})}))}(this,document,Foundation.zj),function(e,t,a,l){"use strict";Foundation.libs.placeholder={name:"placeholder",version:"4.2.2",init:function(a,l,r){this.scope=a||this.scope,"string"!=typeof l&&(t.onload=function(){e("input, textarea").placeholder()})}}}(Foundation.zj,this,this.document);