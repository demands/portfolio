/* First, create a namespace. */
if(_ME_ === undefined) var _ME_ = {};

/* Pubsub for dimensions changes. */
(function(me, $, _undefined) {
	
	/*
	 * Depending on browser width, this page may appear
	 * differently. Here, we publish a notification every
	 * time the width changes to a specific configuration.
	 */
	
	me.dim = {
		MOBILE: 0,
		NARROW: 590,
		WIDE: 900,
		subscribed: [],
		currentWidthStop: _undefined,
		lastWidth: _undefined,
		lastHeight: _undefined,
		
		subscribe: function(args) {
			var i;
			
			// If this is a widthStop type subscription, add a multiple array.
			if(args.type === 'widthStop') {
				if(Array.isArray(args.widthStop)) {
					args.multiple = args.widthStop;
				}
				else {
					args.multiple = [ args.widthStop ];
				}
				me.dim.subscribed.push(args);
			}
			
			// If widthStop is an array, we need to set up multiple events.
			else if(Array.isArray(args.widthStop)) {
				for(i = 0; i < args.widthStop.length; i++) {
					me.dim.subscribed.push({
						type: args.type,
						widthStop: args.widthStop[i],
						callback: args.callback,
            context: args.context,
						multiple: args.widthStop
					});
				}
			}
			
			// Otherwise, just set up one event
			else {
				me.dim.subscribed.push(args);
			}
			
			// Call callback right away if it matches
			if(args.widthStop === me.dim.currentWidthStop) {
				args.callback.call(args.context, args.widthStop, $(window).width, $(window).height);
			}
		},
		
		update: function(newWidth, newHeight) {
			var old, set, i, subscriber, changedWidth, changedHeight;
			
			// Check if width has changed.
			if(newWidth !== me.dim.lastWidth) {
				changedWidth = true;
				me.dim.lastWidth = newWidth;
			}
			else {
				changedWidth = false;
			}
			
			// Check if height has changed.
			if(newHeight !== me.dim.lastHeight) {
				changedHeight = true;
				me.dim.lastHeight = newHeight;
			}
			else {
				changedHeight = false;
			}
			
			// If neither dimension has changed, we're done here.
			if(!changedWidth && !changedHeight) {
				return;
			}
			
			// What width stop are we at?
			if(newWidth >= me.dim.MOBILE) {
				set = me.dim.MOBILE;
				if(newWidth >= me.dim.NARROW) {
					set = me.dim.NARROW;
					if(newWidth >= me.dim.WIDE) {
						set = me.dim.WIDE;
					}
				}
			}
			
			old = me.dim.currentWidthStop;
			me.dim.currentWidthStop = set;
			
			for(i = 0; i < me.dim.subscribed.length; i++) {
				subscriber = me.dim.subscribed[i];
				
				// If this is a width or height subscription and the width
				// or height hasn't changed, ignore this subscription.
				// Exception: In a height subscription, don't ignore if we
				// have just entered a new widthstop.
				if((subscriber.type === 'width' && !changedWidth) ||
						(subscriber.type === 'widthStop' && !changedWidth) ||
						(subscriber.type === 'height' && !changedHeight && old === set)) {
					continue;
				}
				
				// Call 'widthStop' events only if we just entered
				// a relevant stop
				if(subscriber.type === 'widthStop') {
					if($.inArray(old, subscriber.multiple) === -1 &&
							$.inArray(set, subscriber.multiple) >= 0) {
						subscriber.callback.call(subscriber.context, set, set, newHeight);
					}
				}
				
				// Call 'width', 'height', and 'dim' events
				if((subscriber.type === 'height' || subscriber.type === 'width' || subscriber.type === 'dim') &&
            (subscriber.widthStop === set || subscriber.widthStop === _undefined)) {
					subscriber.callback.call(subscriber.context, set, newWidth, newHeight);
				}
			}
		},
		
		updateFromBrowser: function() {
			var win = $(window);
			me.dim.update(win.width(), win.height());
		},
		
		initialize: function() {
			$(window).resize(me.dim.updateFromBrowser);
			$(me.dim.updateFromBrowser);
		}
	};
	
})(_ME_, jQuery);

