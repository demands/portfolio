/* First, create a namespace. */
if(_ME_ === undefined) var _ME_ = {};

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

