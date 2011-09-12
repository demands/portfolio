/* First, create a namespace. */
if(_ME_ === undefined) var _ME_ = {};

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

