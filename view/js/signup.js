$('.signup-form').find('input, textarea').on('keyup blur focus', function (e) {

  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('signup-active signup-highlight');
        } else {
          label.addClass('signup-active signup-highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('signup-active signup-highlight');
			} else {
		    label.removeClass('signup-highlight');
			}
    } else if (e.type === 'focus') {

      if( $this.val() === '' ) {
    		label.removeClass('signup-highlight');
			}
      else if( $this.val() !== '' ) {
		    label.addClass('signup-highlight');
			}
    }

});

$('.signup-tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('signup-active');
  $(this).parent().siblings().removeClass('signup-active');

  target = $(this).attr('href');

  $('.signup-tab-content > div').not(target).hide();

  $(target).fadeIn(600);

});

$('.signup-form form').on('submit', function(e){
    e.preventDefault();

    var values = {};
    $(this).find('input').each(function(i, input){
        var value = $(input).val();
        var name = $(input).attr('name');
        values[name] = value;
    });

    $.post($(this).attr('action'), values).then(function(res){
        if(res && res.success){
            location.href="/";
        }else{
            alert(res.error);
        }
    });
});