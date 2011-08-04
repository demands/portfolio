/* First, create a namespace. */
var _ME_ = {};

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

/* Header. */
(function(me, $) {
	me.header = {
		initialize: function() {
			$('#home-link').click(function() {
				$.scrollTo($('#about_me'), 500);
				return false;
			});
		}
	};
})(_ME_, jQuery);

/* Sections. */
(function(me, $, _undefined) {
  var Section = _undefined;

	me.sections = {
		dom: $('#container > section'),
		currentSection: _undefined,
    sections: [],

    Section: function(dom) {
      if(!(this instanceof me.sections.Section)) {
        return new me.sections.Section(dom);
      }
      
      this.dom = dom;
      this.setLink();

			me.dim.subscribe({
				type: 'height',
				widthStop: [me.dim.WIDE, me.dim.NARROW],
				callback: this.fixHeight,
        context: this
			});
			me.dim.subscribe({
				type: 'widthStop',
				widthStop: me.dim.MOBILE,
				callback: this.resetHeight,
        context: this
			});
    },

    /* Figure out the current section, and focus on it. */
    focusOnCurrent: function() {
      if(me.sections.currentSection !== _undefined) {
        me.sections.focusOn(me.sections.currentSection);
      }
    },

    /* Update current section based on scroll position */
    positionUpdateCurrent: function() {
      //console.log($(window).scrollTop());
    },

    /* Update current section based on click */
    clickUpdateCurrent: function(event) {
      console.log(event);
    },

    /* Make everything work */
		initialize: function() {
      var sections = me.sections;

      // Initialize all the individual sections.
      sections.dom.each(function() {
        sections.sections.push(new Section(this));
      });

      me.dim.subscribe({
        type: 'widthStop',
        widthStop: [me.dim.WIDE, me.dim.NARROW],
        callback: sections.focusOnCurrent
      });
      $(window).scroll(sections.positionUpdateCurrent);
      sections.dom.live('click', sections.clickUpdateCurrent);
		}
	};

  Section = me.sections.Section;

  /* Make it so that when a link is clicked, we scroll to the right section */
  Section.prototype.setLink = function() {
    var section = this;
    this.link = $('a.' + $(this.dom).attr('id') + '-link');
    this.link.live('click', function(event) {
      event.preventDefault();
      section.focus();
    });
  };

  /* Set the minimum height of each section to the height of the browser window */
  Section.prototype.fixHeight = function(widthStop, width, height) {
    $(this.dom).css('min-height', height);
  };

  /* Make the minimum height of each section fluid */
  Section.prototype.resetHeight = function() {
    $(this.dom).css('min-height', '');
  };

  /* Focus on a section */
  Section.prototype.focus = function() {
    $.scrollTo(this.dom, 500);
  };


})(_ME_, jQuery);

/* Article shuffling in the portfolio section */
(function(me, $, _undefined) {
  var Article = _undefined;

  me.portfolio = {
    dom: _undefined,
    highlightedArticle: _undefined,
    articleContainer: _undefined,
    articles: _undefined,
    Article: function(dom) {
      if(!(this instanceof me.portfolio.Article)) {
        return new me.portfolio.Article(dom);
      }

      this.dom = dom;
    },
    initialize: function() {
      // This is just stupid placeholder code for now.
      var a = new me.portfolio.Article($('#portfolio'));
      me.portfolio.dom = $('#portfolio');
    }
  };

  Article = me.portfolio.Article;
  
})(_ME_, jQuery);

/* This function kicks everything off. */
(function(me, $) {
	me.initialize = function() {
		for(var i in me) {
			if($.isFunction(me[i].initialize)) {
				me[i].initialize();
			}
		}
	}
	
	me.initialize();
})(_ME_, jQuery);

