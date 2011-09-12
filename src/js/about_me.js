/* First, create a namespace. */
if(_ME_ === undefined) var _ME_ = {};

/* The about me section. */
(function(me, $, _undefined) {

  /* Constants */
  var MIN_CUTOFF = 200; /* the amount of pixels that it is
                         * permissible to remove from the
                         * bottom of this section.
                         */
  var DATE_I_BECAME_A_DEV = new Date(1996, 7, 1);

  /* create inner namespace */
  if(me.section === undefined) me.section = {};

  me.section.about_me = function(domSection) {
    var section = new me.sections.Section(domSection);

    /*
     * Override the fixHeight method.
     * We want to make sure that the height never gets bigger
     * than the content --- otherwise I will be floating in
     * midair! D: We also want to be sure that at least my
     * face is showing, because otherwise that speech bubble
     * will be coming from nowhere.
     */
    section.fixHeight = function(height) {
      var maxHeight = parseInt($(this.dom).css('padding-top'));
      var minHeight = 0;


      $(this.dom).children().each(function() {
        maxHeight += $(this).outerHeight();
      });

      if(height > maxHeight) {
        height = maxHeight;
      }

      minHeight = maxHeight - MIN_CUTOFF;
      if(height < minHeight) {
        height = minHeight;
      }

      $(this.dom).css('height', height);
    };

    /*
     * Keep track of the number of seconds that I have been
     * in the business of web development. Extra credit because
     * it formats the number nicely :)
     */
    section.updateSeconds = function() {
      var REGEX = /(\d+)(\d{3})/;
      var milliseconds = new Date().getTime() - DATE_I_BECAME_A_DEV.getTime();
      var minutes = ((milliseconds / 1000) / 60).toString();
      var split = minutes.split('.');

      while(REGEX.test(split[0])) {
        split[0] = split[0].replace(REGEX, '$1,$2');
      }

      minutes = split[0];
      if(split[1].length > 1) {
        minutes += '.' + split[1][0] + split[1][1];
      }

      $(section.dom).find('.minutes-in-business').text(minutes);
    };
    section.updateSecondsTimer = setInterval(section.updateSeconds, 1000);

    return section;
  };

})(_ME_, jQuery);

