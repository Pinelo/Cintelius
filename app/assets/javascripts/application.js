// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui/datepicker
//= require turbolinks
//= require_tree .


$(function() {


// {fontpage
	$(".frontpage-square").on({
	    mouseenter: function (e) {
	        //stuff to do on mouse enter
			$(e.target).parent().siblings('img').addClass('hover')
			console.log(e.target)
	    },
	    mouseleave: function (e) {
	        //stuff to do on mouse leave
			$(e.target).parent().siblings('img').removeClass('hover')
			console.log('leave')
	    }
	});
	



// }


// Order Index {
$('.order_box a').on('click', function(e) {
	$('.order_box').removeClass('fade-in').addClass('fade-out');
	$($(e.target).closest('.order_box')).addClass('active').removeClass('fade-out');	
	$('.order_box.active img').css('display', 'none');
	$('.order_box.active .return_arrow').css('display', 'block');
	setTimeout(function() {
		$('.fade-out').css('display', 'none');
		console.log('active')
	}, 500)
	// $('.order_box a').unbind(); //para que no se active esta funcion si ya esta activa
})


$('.return_arrow').on('click', function(e) {
	$('.provider_box').addClass('fade-out');
	$('.order_box.fade-out').addClass('fade-in').removeClass('fade-out').css('display', 'block');
	// $('.fade-out').css('display', 'none');
	$('.order_box.active img').css('display', 'block');
	$('.order_box.active .return_arrow').css('display', 'none');
	$($(e.target).closest('.order_box')).removeClass('active');
	setTimeout(function() {
		$('.provider_box').remove();

	}, 500)	
	console.log('hello')
})





// }


	// @@NEWORDER

	// Arreglar tamaño de la pantalla.
	$('body').height($(window).height());

	// Para que la subcategoria tenga el efecto fade-in
	$('ul.category-list button').on('click', function(e) {
		e.preventDefault();
		className = "." + e.target.textContent + "-list";
		// indexNo = $('.category-list button:contains(\"' + e.target.textContent +'")').parent().index();

		$('.subcategories ul, .category-list button').removeClass('active');
		$('.products ul').removeClass('active');
		$(className).addClass('active');
		// $($(className).children()[indexNo]).css('border-left', 'none')

		$(e.target).addClass('active');		
	})

	$('.subcategories ul li button').on('click', function(e) {
		e.preventDefault();
		className = "." + e.target.textContent + "-list";
		// indexNo = $('.subcategory-list button:contains(\"' + e.target.textContent +'")').parent().index();

		$('.subcategories ul li button').removeClass('active');
		$('.products ul').removeClass('active');

		$(className).addClass('active');
		// $($(className).children()[indexNo]).css('border-left', 'none')

		$(e.target).addClass('active');	
	})

	// Click agrega el nombre al product_box o destruye la caja si ya esta seleccionado el prod
	$('.products button').on('click', function(e) {
		if ($(e.target).hasClass('selected_product')) {
			$('.product_box:contains('+ $(e.target).text() +')').remove();
			$(e.target).removeClass('selected_product')
		} else {
			$('a.add_fields').click()
			productName = $(e.target).text()
			product_fields = $('.product_box').last().children().first()
			product_fields.text(productName)
			$($('.product_box').last().children().get(2)).val($(e.target).attr('data-product-id'))
			orderProductId = $($('.newOrder .product_box').last().children('textarea').siblings().get(2)).attr('name').slice(33, 46)
			commentName = "order[order_products_attributes][" + orderProductId + "][comment_attributes][content]"
			// $($('.product_box').last().children('textarea').siblings().get(2)).attr('id')
			console.log(commentName)
			$($('.product_box').last().children('textarea')).attr('name', commentName)
			$(e.target).addClass('selected_product')

			// para que la tacha borre al producto del formulario
			$('.product_box img.x-button').on('click', function(e) {
				textForTarget = $(e.target).parent().children().first().text()
				$(e.target).parent().remove()
				$('button.selected_product:contains('+textForTarget+')').removeClass('selected_product')

				console.log()
			})

			// Para que aparesca el textarea animado
			$('.letter_image_box').on('click', function(e) {
				$(e.target).parent().addClass('active');
				setTimeout(function() {
					$(e.target).parent().siblings('textarea').addClass('editable').focus()
				}, 1000)
				$(e.target).parent().siblings('textarea').on('blur', function(evnt) {
					$(evnt.target).removeClass('editable')
					$(e.target).parent().removeClass('active');
				})
				// setTimeout(showNewOrderTextArea(), 1000);				
			})


		}

	})



	

	// Agrega caja de producto
	$('form .add_fields').on('click', function(e) {
		time = new Date().getTime()
		regexp = new RegExp($(this).data('id'), 'g')
		$(this).before($(this).data('fields').replace(regexp, time))
		event.preventDefault()
		console.log("ran helper")
	})

	// @NEWOFFER

	// Limpia las listas despues de cada ajax
	$('.order_box a').on('click', function() {
		$('.new_offer .offer_list').empty()
		$('.new_offer .combo_list').empty()
	})

	$('form .add_combo_field').on('click', function(e) {
		time = new Date().getTime()
		regexp = new RegExp($(this).data('id'), 'g')
		$(this).before($(this).data('fields').replace(regexp, time))
		event.preventDefault()
	})

	// $('.order_box a').on()
})



// Para que calendario este en español
 $.datepicker.regional['es'] = {clearText: 'Borrar', clearStatus: '',
    closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
    prevText: '&lt;Préc', prevStatus: 'Ver mes anterior',
    nextText: 'Suiv&gt;', nextStatus: 'Ver siguiente mes',
    currentText: 'Actual', currentStatus: 'Ver mes actual',
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'],
    monthStatus: 'Ver otros meses', yearStatus: 'Ver otros años',
    weekHeader: 'Sm', weekStatus: '',
    dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
    dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
    dayStatus: 'Utilice DD como el primer día de la semana', dateStatus: 'Elija DD , MM d',
    dateFormat: 'dd/mm/yy', firstDay: 0, 
    initStatus: 'Elija la fecha', isRTL: false};

     $.datepicker.setDefaults($.datepicker.regional['es']);
// Seleccion fecha limite en nueva orden
$(function() {
    $('#datepicker').datepicker({dateFormat: 'yy-mm-dd', minDate: 0})
  });





// Los campos requeridos muestren el mensaje indicado
function InvalidMsg(textbox) {
    
    if (textbox.value == '') {
        textbox.setCustomValidity('Obligatorio');
    }
    else if(textbox.validity.typeMismatch){
        textbox.setCustomValidity('please enter a valid email address');
    }
    else {
        textbox.setCustomValidity('');
    }
    return true;
}