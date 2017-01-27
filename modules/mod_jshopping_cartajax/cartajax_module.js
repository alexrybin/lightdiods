jQuery(document).ready(function(){
	jQuery('.cartajax-module').find('.cartajax-module-list').delegate('.cartajax-module-item-remove', 'click', function(){
		var cart_item = jQuery(this).closest('.cartajax-module-item');
		var number_in_cart = parseInt(cart_item.find('[name=number_in_cart]').val());
		cartajax.remove(number_in_cart);
	});
});