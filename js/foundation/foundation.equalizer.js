!function(e,t,i,n){"use strict";Foundation.libs.equalizer={name:"equalizer",version:"5.2.2",settings:{use_tallest:!0,before_height_change:e.noop,after_height_change:e.noop,equalize_on_stack:!1},init:function(e,t,i){Foundation.inherit(this,"image_loaded"),this.bindings(t,i),this.reflow()},events:function(){this.S(t).off(".equalizer").on("resize.fndtn.equalizer",function(e){this.reflow()}.bind(this))},equalize:function(t){var i=!1,n=t.find("["+this.attr_name()+"-watch]:visible"),a=t.data(this.attr_name(!0)+"-init");if(0!==n.length){var h=n.first().offset().top;if(a.before_height_change(),t.trigger("before-height-change"),n.height("inherit"),n.each(function(){e(this).offset().top!==h&&(i=!0)}),!1!==a.equalize_on_stack||!i){var s=n.map(function(){return e(this).outerHeight(!1)}).get();if(a.use_tallest){var o=Math.max.apply(null,s);n.css("height",o)}else{var r=Math.min.apply(null,s);n.css("height",r)}a.after_height_change(),t.trigger("after-height-change")}}},reflow:function(){var t=this;this.S("["+this.attr_name()+"]",this.scope).each(function(){var i=e(this);t.image_loaded(t.S("img",this),function(){t.equalize(i)})})}}}(jQuery,window,window.document);