(function(e,t,n,r){"use strict";var i=function(){},s=function(i,s){if(i.hasClass(s.slides_container_class))return this;var f=this,l,c=i,h,p,d,v=0,m,g,y=!1,b=!1;c.children().first().addClass(s.active_slide_class);f.update_slide_number=function(t){if(s.slide_number){h.find("span:first").text(parseInt(t)+1);h.find("span:last").text(c.children().length)}if(s.bullets){p.children().removeClass(s.bullets_active_class);e(p.children().get(t)).addClass(s.bullets_active_class)}};f.build_markup=function(){c.wrap('<div class="'+s.container_class+'"></div>');l=c.parent();c.addClass(s.slides_container_class);if(s.navigation_arrows){l.append(e("<a>").addClass(s.prev_class).append("<span>"));l.append(e("<a>").addClass(s.next_class).append("<span>"))}if(s.timer){d=e("<div>").addClass(s.timer_container_class);d.append("<span>");d.append(e("<div>").addClass(s.timer_progress_class));d.addClass(s.timer_paused_class);l.append(d)}if(s.slide_number){h=e("<div>").addClass(s.slide_number_class);h.append("<span></span> of <span></span>");l.append(h)}if(s.bullets){p=e("<ol>").addClass(s.bullets_container_class);l.append(p);c.children().each(function(t,n){var r=e("<li>").attr("data-orbit-slide",t);p.append(r)})}s.stack_on_small&&l.addClass(s.stack_on_small_class);f.update_slide_number(0)};f._goto=function(t,n){if(t===v)return!1;typeof g=="object"&&g.restart();var r=c.children(),i="next";y=!0;t<v&&(i="prev");t>=r.length?t=0:t<0&&(t=r.length-1);var o=e(r.get(v)),u=e(r.get(t));o.css("zIndex",2);u.css("zIndex",4).addClass("active");c.trigger("orbit:before-slide-change");s.before_slide_change();var a=function(){var e=function(){v=t;y=!1;if(n===!0){g=f.create_timer();g.start()}f.update_slide_number(v);c.trigger("orbit:after-slide-change",[{slide_number:v,total_slides:r.length}]);s.after_slide_change(v,r.length)};c.height()!=u.height()?c.animate({height:u.height()},250,"linear",e):e()};if(r.length===1){a();return!1}var l=function(){i==="next"&&m.next(o,u,a);i==="prev"&&m.prev(o,u,a)};u.height()>c.height()?c.animate({height:u.height()},250,"linear",l):l()};f.next=function(e){e.stopImmediatePropagation();e.preventDefault();f._goto(v+1)};f.prev=function(e){e.stopImmediatePropagation();e.preventDefault();f._goto(v-1)};f.link_custom=function(t){t.preventDefault();var n=e(this).attr("data-orbit-link");if(typeof n=="string"&&(n=e.trim(n))!=""){var r=l.find("[data-orbit-slide="+n+"]");r.index()!=-1&&f._goto(r.index())}};f.link_bullet=function(t){var n=e(this).attr("data-orbit-slide");typeof n=="string"&&(n=e.trim(n))!=""&&f._goto(n)};f.timer_callback=function(){f._goto(v+1,!0)};f.compute_dimensions=function(){var t=e(c.children().get(v)),n=t.height();s.variable_height||c.children().each(function(){e(this).height()>n&&(n=e(this).height())});c.height(n)};f.create_timer=function(){var e=new o(l.find("."+s.timer_container_class),s,f.timer_callback);return e};f.stop_timer=function(){typeof g=="object"&&g.stop()};f.toggle_timer=function(){var e=l.find("."+s.timer_container_class);if(e.hasClass(s.timer_paused_class)){typeof g=="undefined"&&(g=f.create_timer());g.start()}else typeof g=="object"&&g.stop()};f.init=function(){f.build_markup();if(s.timer){g=f.create_timer();g.start()}m=new a(c);s.animation==="slide"&&(m=new u(c));l.on("click","."+s.next_class,f.next);l.on("click","."+s.prev_class,f.prev);l.on("click","[data-orbit-slide]",f.link_bullet);l.on("click",f.toggle_timer);l.on("touchstart.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);var t={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};l.data("swipe-transition",t);e.stopPropagation()}).on("touchmove.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);if(e.touches.length>1||e.scale&&e.scale!==1)return;var t=l.data("swipe-transition");typeof t=="undefined"&&(t={});t.delta_x=e.touches[0].pageX-t.start_page_x;typeof t.is_scrolling=="undefined"&&(t.is_scrolling=!!(t.is_scrolling||Math.abs(t.delta_x)<Math.abs(e.touches[0].pageY-t.start_page_y)));if(!t.is_scrolling&&!t.active){e.preventDefault();var n=t.delta_x<0?v+1:v-1;t.active=!0;f._goto(n)}}).on("touchend.fndtn.orbit",function(e){l.data("swipe-transition",{});e.stopPropagation()}).on("mouseenter.fndtn.orbit",function(e){s.timer&&s.pause_on_hover&&f.stop_timer()}).on("mouseleave.fndtn.orbit",function(e){s.timer&&s.resume_on_mouseout&&g.start()});e(n).on("click","[data-orbit-link]",f.link_custom);e(t).on("resize",f.compute_dimensions);e(t).on("load",f.compute_dimensions);c.trigger("orbit:ready")};f.init()},o=function(e,t,n){var r=this,i=t.timer_speed,s=e.find("."+t.timer_progress_class),o,u,a=-1;this.update_progress=function(e){var t=s.clone();t.attr("style","");t.css("width",e+"%");s.replaceWith(t);s=t};this.restart=function(){clearTimeout(u);e.addClass(t.timer_paused_class);a=-1;r.update_progress(0)};this.start=function(){if(!e.hasClass(t.timer_paused_class))return!0;a=a===-1?i:a;e.removeClass(t.timer_paused_class);o=(new Date).getTime();s.animate({width:"100%"},a,"linear");u=setTimeout(function(){r.restart();n()},a);e.trigger("orbit:timer-started")};this.stop=function(){if(e.hasClass(t.timer_paused_class))return!0;clearTimeout(u);e.addClass(t.timer_paused_class);var n=(new Date).getTime();a-=n-o;var s=100-a/i*100;r.update_progress(s);e.trigger("orbit:timer-stopped")}},u=function(t){var n=400,r=e("html[dir=rtl]").length===1,i=r?"marginRight":"marginLeft";this.next=function(e,t,r){t.animate({margin:"0%"},n,"linear",function(){e.css(i,"100%");r()})};this.prev=function(e,t,r){t.css(i,"-100%");t.animate({margin:"0%"},n,"linear",function(){e.css(i,"100%");r()})}},a=function(e){var t=250;this.next=function(e,n,r){n.css({marginLeft:"0%",opacity:"0.01"});n.animate({opacity:"1"},t,"linear",function(){e.css("marginLeft","100%");r()})};this.prev=function(e,n,r){n.css({marginLeft:"0%",opacity:"0.01"});n.animate({opacity:"1"},t,"linear",function(){e.css("marginLeft","100%");r()})}};Foundation.libs=Foundation.libs||{};Foundation.libs.orbit={name:"orbit",version:"4.3.1",settings:{animation:"slide",timer_speed:1e4,pause_on_hover:!0,resume_on_mouseout:!1,animation_speed:500,stack_on_small:!1,navigation_arrows:!0,slide_number:!0,container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning",bullets:!0,timer:!0,variable_height:!1,before_slide_change:i,after_slide_change:i},init:function(t,n,r){var i=this;Foundation.inherit(i,"data_options");typeof n=="object"&&e.extend(!0,i.settings,n);if(e(t).is("[data-orbit]")){var o=e(t),u=i.data_options(o);new s(o,e.extend({},i.settings,u))}e("[data-orbit]",t).each(function(t,n){var r=e(n),o=i.data_options(r);new s(r,e.extend({},i.settings,o))})}}})(Foundation.zj,this,this.document);