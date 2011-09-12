/* First, create a namespace. */
if(_ME_ === undefined) var _ME_ = {};

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

