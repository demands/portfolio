/* First, create a namespace. */
if(_ME_ === undefined) var _ME_ = {};

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

