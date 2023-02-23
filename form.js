	
	function after_form_submitted(data) 
    {
        if(data.result == 'success')
        {
            $('.deletethis').addClass('check');
			ym(90290323,'reachGoal','Form_Submit');
			fbq('track', 'SubmitApplication');
			location.href = 'thank-you.html';
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else
    }
	
		$('#paid_form').submit(function(e){
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
			$btn.addClass('deletethis');
            $('#paid_form .btn-title').text('Sending...');
        });
        

                    $.ajax({
                type: "POST",
                url: 'handler.php',
                data: $form.serialize(),
				success: after_form_submitted,
                dataType: 'json' 
            });        
        
      });	