jQuery(document).ready(function(){
    jQuery.each(cartajax.advModules, function(index, value) {
        if (cartajax.open_info){
            cartajax_show_hide_products(cartajax.count_products, 2, value);
        } else {
            cartajax_show_hide_products(cartajax.count_products, 0, value);
        }
    });
    
    
	jQuery('.cartajax-module').find('.cartajax-module-list').delegate('.cartajax-module-item-remove', 'click', function(){
		var cart_item = jQuery(this).closest('.cartajax-module-item');
		var number_in_cart = parseInt(cart_item.find('[name=number_in_cart]').val());
		cartajax.remove(number_in_cart);
	});
});

cartajax_show_hide_products = function(count_products, show, moduleId){
    if (typeof cartajax_timeout === 'undefined'){
        cartajax_timeout = new Array();
    }
            
    if (typeof cartajax_timeout[moduleId] !== 'undefined'){
        clearTimeout(cartajax_timeout[moduleId]);
    }

    if (typeof count_products === 'undefined'){
        count_products = 0;
    }

    if (count_products == 0){
        jQuery('div#cartajax-module-products-block'+moduleId).hide();
        jQuery('#cartajax-advanced-module'+moduleId).find('.cartajax-module-show-products div').html(cartajax.const_show_products);
    } else {
        if (show == 2){
            jQuery('div#cartajax-module-products-block'+moduleId).hide().slideDown('slow');
            jQuery('#cartajax-advanced-module'+moduleId).find('.cartajax-module-show-products div').html('<a href = "javascript:void(0)" onclick = "cartajax_show_hide_products('+count_products+', 0, '+moduleId+')" id = "cartajax-show-hide-products" class = "cartajax-link">' + cartajax.const_hide_products + '</a>');
            
            cartajax_timeout[moduleId] = setTimeout(function(){
                jQuery('div#cartajax-module-products-block'+moduleId).slideUp('slow');
                jQuery('#cartajax-advanced-module'+moduleId).find('.cartajax-module-show-products div').html('<a href = "javascript:void(0)" onclick = "cartajax_show_hide_products('+count_products+', 1, '+moduleId+')" id = "cartajax-show-hide-products" class = "cartajax-link">' + cartajax.const_show_products + '</a>');
            }, cartajax.delay);
        } else if (show == 1){
            jQuery('div#cartajax-module-products-block'+moduleId).slideDown('slow');
            jQuery('#cartajax-advanced-module'+moduleId).find('.cartajax-module-show-products div').html('<a href = "javascript:void(0)" onclick = "cartajax_show_hide_products('+count_products+', 0, '+moduleId+')" id = "cartajax-show-hide-products" class = "cartajax-link">' + cartajax.const_hide_products + '</a>');
        } else {
            jQuery('div#cartajax-module-products-block'+moduleId).slideUp('slow');
            jQuery('#cartajax-advanced-module'+moduleId).find('.cartajax-module-show-products div').html('<a href = "javascript:void(0)" onclick = "cartajax_show_hide_products('+count_products+', 1, '+moduleId+')" id = "cartajax-show-hide-products" class = "cartajax-link">' + cartajax.const_show_products + '</a>');
        } 
    }
}