!function(t,a,n,e){"use strict";Foundation.libs.accordion={name:"accordion",version:"5.2.2",settings:{active_class:"active",multi_expand:!1,toggleable:!0,callback:function(){}},init:function(t,a,n){this.bindings(a,n)},events:function(){var a=this,n=this.S;n(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion","["+this.attr_name()+"] > dd > a",function(e){var s=n(this).closest("["+a.attr_name()+"]"),i=n("#"+this.href.split("#")[1]),c=n("dd > .content",s),d=t("dd",s),o=a.attr_name()+"="+s.attr(a.attr_name()),l=s.data(a.attr_name(!0)+"-init"),r=n("dd > .content."+l.active_class,s);if(e.preventDefault(),s.attr(a.attr_name())&&(c=c.add("["+o+"] dd > .content"),d=d.add("["+o+"] dd")),l.toggleable&&i.is(r))return i.parent("dd").toggleClass(l.active_class,!1),i.toggleClass(l.active_class,!1);l.multi_expand||(c.removeClass(l.active_class),d.removeClass(l.active_class)),i.addClass(l.active_class).parent().addClass(l.active_class),l.callback(i)})},off:function(){},reflow:function(){}}}(jQuery,window,window.document);