/* First, create a namespace. */
var _ME_ = {};

/* Pubsub for dimensions changes. */
(function(me, $, _undefined) {
	
	/*
	 * Depending on browser width, this page may appear
	 * differently. Here, we publish a notification every
	 * time the width changes to a specific configuration.
	 * Here's an example of how to subscribe to that:
	 * 
	 * _ME_.width.subscribe({
	 *   type: 'widthStop', // or 'height' or 'width'
	 *   callback: function(widthStop, width, height),
	 *   widthStop: _ME_.dim.MOBILE // optional, but if this is
	 *			// set, the callback is only called when width
	 *			// is in this range. This can also be an array of
	 * 			// width stops.
	 * });
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
						(subscriber.type === 'height' && !changedHeight && old == set)) {
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
      };
      
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
  }

  /* Set the minimum height of each section to the height of the browser window */
  Section.prototype.fixHeight = function(widthStop, width, height) {
    $(this.dom).css('min-height', height);
  }

  /* Make the minimum height of each section fluid */
  Section.prototype.resetHeight = function() {
    $(this.dom).css('min-height', '');
  }

  /* Focus on a section */
  Section.prototype.focus = function() {
    $.scrollTo(this.dom, 500);
  }


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
      };

      this.dom = dom;
    },
    initialize: function() {
      // This is just stupid placeholder code for now.
      var a = new me.portfolio.Article($('#portfolio'));
      me.portfolio.dom = $('#portfolio');
    }
  }

  Article = me.portfolio.Article;
  
})(_ME_, jQuery);

/* Old sections code. */
(function(undefined) {
	var oldHighlight,
			articleContainer = $('article').parent(),
			body = $('body');
	
	$('article:not(.highlight)').live('click', function(event) {
		
		var i, // iterator
		
				// the current location of the clicked article in relation to the other articles
				currentIndex,
				
				// dimensions of a normal article and of the clicked article, when it is done
				smallArticleDimensions, clickedArticleDimensions, articleMargins, numCols, overallOffset,
				
				// where the clicked article needs to go and what it needs to replace
				destinationReferenceIndex, destinationReference,
		
				// caching results of the following calls to save time
				articles = $('article'),
				size = articles.size(),
				target = $(event.currentTarget);
		
    // Quit if we are mobile-sized, because then everything will be showing.
    if($(window).width() < 590) {
      return;
    }

		// Add higlighting class to body
		body.addClass('highlighting');
		
		// get dimensions
		(function() {
			var smallArticles = articles.not('.highlight'),
					size = smallArticles.size(),
					clone = target.clone();

			smallArticleDimensions = {
				height: smallArticles.css('height'),
				width: smallArticles.css('width')
			};
			
			overallOffset = $(articles.get(0)).position();
			
			// get number of columns and distance between blocks
			(function() {
				var previousPosition = $(smallArticles.get(0)).position(),
						comparePosition = function(position) {
							if(position.top !== previousPosition.top) {
								articleMargins.y = position.top - (previousPosition.top + parseInt(smallArticleDimensions.height));
								return false;
							}
							else {
								++numCols;
								if(articleMargins.x === undefined) {
									articleMargins.x = position.left - (previousPosition.left + parseInt(smallArticleDimensions.width));
								}
								return true;
							}
						};
				
				articleMargins = new Object();
				numCols = 1;
				// loop rather than each() because this way order is guaranteed
				for(i = 1; i < size; i++) {
					if(!comparePosition($(smallArticles.get(i)).position())) {
						break;
					}
				}
			})();

			// Emulate completed clicked article
			clone.css('visibility', 'hidden').addClass('highlight').appendTo(target.parent());
			clickedArticleDimensions = {
				height: clone.height(),
				width: clone.width()
			};
			clone.remove();
		})();
		
		// Get current index and prepare all elements for absolute positioning.
		// Loop rather than each() because this way order is guaranteed
		for(i = 0; i < size; i++) {
			(function(article) {
				var jqArticle = $(article),
						offset = jqArticle.offset();
				
				// Figure out what index this article is at
				if(article === event.currentTarget) {
					currentIndex = i;
				}
				
				// Set position absolutely
				jqArticle.css('top', offset.top);
				jqArticle.css('left', offset.left);
				jqArticle.css('width', jqArticle.css('width'));
			})(articles.get(i));
		}
		
		// Absolutely position all elements and keep the scrollbar where it is
		articleContainer.css('height', articleContainer.height()).addClass('animating');
		
		// Figure out where this article needs to end up
		// (element number must be divisible by 2 and 3 since layout can be between 1 - 3 columns)
		destinationReferenceIndex = Math.round(currentIndex / 6) * 6;
		if(destinationReferenceIndex >= articles.size()) {
			destinationReferenceIndex -= 6;
		}
				
		// Move clicked element to correct place in DOM
		if(destinationReferenceIndex !== currentIndex) {
			if(destinationReferenceIndex < currentIndex) {
				$(articles.get(destinationReferenceIndex)).before(target);
			}
			else {
				$(articles.get(destinationReferenceIndex)).after(target);
			}
		}
		
		// Start animating all elements
		(function() {
			var animationCount = 0;
			
			for(i = 0; i < size; i++) {
				(function(article) {
					var destinationCss = {
																	'height': smallArticleDimensions.height,
																	'width': smallArticleDimensions.width
																},
							placeX = function(column) {
													return (column * (parseInt(smallArticleDimensions.width) + articleMargins.x)) + overallOffset.left;
												},
							placeY = function(row, belowHighlight) {
													if(belowHighlight) {
														return ((row-1) * (parseInt(smallArticleDimensions.height) + articleMargins.y) + overallOffset.top + parseInt(clickedArticleDimensions.height) + articleMargins.y);
													}
													else {
														return (row * (parseInt(smallArticleDimensions.height) + articleMargins.y) + overallOffset.top);
													}
												};

					if (i === currentIndex) {
						// this article has to move to the location of the destination index
						destinationCss.top = placeY(Math.floor(destinationReferenceIndex / numCols), false);
						destinationCss.left = overallOffset.left;
						destinationCss.height = clickedArticleDimensions.height;
						destinationCss.width = clickedArticleDimensions.width;
						
						// Scroll to element
						if(($(window).scrollTop() + $(window).height()) < (destinationCss.top + destinationCss.height)
								|| $(window).scrollTop() > destinationCss.top) {
							
							$.scrollTo(Math.max(0, destinationCss.top - (($(window).height() - destinationCss.height)/2)), 500);		
						}
					}
					else if (i < currentIndex && i < destinationReferenceIndex) {
						// keep this article where it is.
						destinationCss.top = placeY(Math.floor(i / numCols), false);
						destinationCss.left = placeX(i % numCols);
					}
					else if (i < currentIndex && i >= destinationReferenceIndex) {
						destinationCss.top = placeY(Math.floor(i / numCols)+1, true);
						destinationCss.left = placeX(i % numCols);
					}
					else if(i > currentIndex && i <= destinationReferenceIndex) {
						destinationCss.top = placeY(Math.floor((i-1) / numCols), false);
						destinationCss.left = placeX((i-1) % numCols);
					}
					else { // i > currentIndex && i > destinationReferenceIndex
						destinationCss.top = placeY(Math.floor((i-1) / numCols)+1, true);
						destinationCss.left = placeX((i-1) % numCols);
					}
					
					++animationCount;
					article.animate(destinationCss, {
						'complete': function() {
							--animationCount;
							if(animationCount === 0) {
								// Relatively position all elements
								articles.css({
									'top': '',
									'left': '',
									'height': '',
									'width': ''
								});
								
								// Remove animating class & reset height
								articleContainer.removeClass('animating').css('height', '');
								
								// Remove highlight class
								$(oldHighlight).removeClass('highlight');
								oldHighlight = target;
							}
						}
					});
				})($(articles.get(i)));
			}
		})();
		
		// Add highlight class
		target.addClass('highlight');
		
	});
})();

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

