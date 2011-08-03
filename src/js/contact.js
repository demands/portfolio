(function ($) {
  var form = $('#contact form');
  var message = form.find('[name=message]').val('You can type your message here').focus();

  message.one('keypress', function() {
    message.val('');
  });

  form.live('submit', function() {
    var successResponse = function(data, textStatus, xhr) {
      var response = $('<p>', {
                      id: 'form-response',
                      class: 'response'
                    });
      $.each(data.details, function(index, value) {
        response.addClass('response-' + value);
      });
      response.hide();

      //console.log(data);
      response.text(data.text);

      if(data.details[0] === 'error') {
        form.find('.' + data.details[1]).addClass('error').one('focus', function() {
          $(this).removeClass('error');
        });
      }
      
      if(data.details[0] === 'success') {
        form.children().not(response).slideUp();
      }

      form.find('#form-response').slideUp('medium', function() {
        $(this).remove();
      });

      form.find('h2').after(response);
      response.slideDown();
      form.one('submit', function() {
        $('#form-response').slideUp('medium', function() {
          $(this).remove();
        });
      });

      form.find('.error').select();
    };
    
    $.ajax({
      'type': 'POST',
      'url': form.attr('action'),
      'data': form.serialize() + '&js=true',
      'success': successResponse,
      'dataType': 'json'
    });

    return false;
  });
})(jQuery);
