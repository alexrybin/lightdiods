var cartajax = cartajax || {};
cartajax.show_overlay = function(){if(jQuery("#cartajax-overlay").size()>0)return;var a=jQuery("<div>").attr("id","cartajax-overlay");a.width(jQuery(window).width()+"px");a.height(jQuery(window).height()+"px");jQuery(document.body).append(a)}
cartajax.hide_overlay = function(){jQuery("#cartajax-overlay").remove();};
cartajax.unserialize = function(l){var j=this,h=function(f,g,a){for(var c=[],d=f.slice(g,g+1),e=2;d!=a;){if(e+g>f.length)throw new j.window.Error("Invalid",void 0,void 0);c.push(d);d=f.slice(g+(e-1),g+e);e+=1}return[c.length,c.join("")]},n=function(f,g,a){var c;c=[];for(var d=0;d<a;d++){var e=f.slice(g+(d-1),g+d);c.push(e);e=e.charCodeAt(0);e=128>e?0:2048>e?1:2;a-=e}return[c.length,c.join("")]},m=function(f,g){var a,c=0,d;g||(g=0);var e=f.slice(g,g+1).toLowerCase(),b=g+2,k=function(a){return a};switch(e){case "i":k= function(a){return parseInt(a,10)};a=h(f,b,";");c=a[0];a=a[1];b+=c+1;break;case "b":k=function(a){return 0!==parseInt(a,10)};a=h(f,b,";");c=a[0];a=a[1];b+=c+1;break;case "d":k=function(a){return parseFloat(a)};a=h(f,b,";");c=a[0];a=a[1];b+=c+1;break;case "n":a=null;break;case "s":a=h(f,b,":");c=a[0];d=a[1];b+=c+2;a=n(f,b+1,parseInt(d,10));c=a[0];a=a[1];b+=c+2;if(c!=parseInt(d,10)&&c!=a.length)throw new j.window.SyntaxError("String length mismatch",void 0,void 0);break;case "a":a= {};d=h(f,b,":");c=d[0];d=d[1];b+=c+2;for(c=0;c<parseInt(d,10);c++){var i=m(f,b),l=i[2],b=b+i[1],i=m(f,b),o=i[2],b=b+i[1];a[l]=o}b+=1;break;default:throw new j.window.SyntaxError("Unknown / Unhandled data type(s): "+e,void 0,void 0);}return[e,b-g,k(a)]};return m(l+"",0)[2]};
cartajax.number_format = function(c,b,d,e){var c=(c+"").replace(/[^0-9+\-Ee.]/g,""),c=!isFinite(+c)?0:+c,b=!isFinite(+b)?0:Math.abs(b),e="undefined"===typeof e?",":e,d="undefined"===typeof d?".":d,a="",a=(b?function(a,c){var b=Math.pow(10,c);return""+Math.round(a*b)/b}(c,b):""+Math.round(c)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));if((a[1]||"").length<b)a[1]=a[1]||"",a[1]+=Array(b-a[1].length+1).join("0");return a.join(d)};
cartajax.temp_ajax_handler = false;
cartajax.json = function(url, data, callback){
    /*if(cartajax.temp_ajax_handler)cartajax.temp_ajax_handler.abort();*/
    cartajax.temp_ajax_handler = jQuery.ajax({url:url, dataType:'json', data : data, success:callback, cache:false});
};
cartajax.extend_link = function(url, parameters){
    var result = url;
    var first = !/\?/.test(url);
    jQuery.each(parameters, function(name, value){
        result += (first ? '?' : '&') + name + '=' + value;
        first = false;
    });
    return result;
};
cartajax.add = function(product){
    var data = 'quantity=' + parseInt(product.find('[name=quantity]').val());
	cartajax_added_product_id = parseInt(product.find('[name=product_id]').val());
	data += '&product_id=' + cartajax_added_product_id;
    
    var attributes = product.find('[name^=jshop_attr_id],[name^=freeattribut]');

    if(attributes.size() > 0)data += '&' + cartajax.serialize_attributes(attributes);
	if(cartajax.show_popup_message==0){
		cartajax.show_overlay();
	}
    
	cartajax.json(cartajax.add_base, data, cartajax.refresh_cart);
};
cartajax.remove = function(number_in_cart){
    cartajax.show_overlay();
    cartajax.json(cartajax.remove_base, 'number_id=' + number_in_cart, cartajax.refresh_cart);
};
cartajax.reload = function(){
    cartajax.show_overlay();
    cartajax.json(cartajax.reload_base, '', cartajax.refresh_cart);
};
cartajax.serialize_attributes = function(attribute_inputs){
    var result = new Array();
    if(attribute_inputs.size() > 0)
    {
        attribute_inputs.each(function(key, input){
            input = jQuery(input);
			form = input.closest('form');
            var value = input.val().substring(0, 255);
            if(input.is('[type=radio]') && !input.is(':checked'))return true;
            
            if(input.is('[type=checkbox]')){
                if (input.is(':checked')){
                    result.push(input.attr('name') + '=' + value);
                } else {
                    hidden_element = jQuery('input[name="'+input.attr('name')+'"][type="hidden"]', form);
                    if (hidden_element.size() == 1 && hidden_element.val()){
                        result.push(input.attr('name') + '=' + hidden_element.val());
                    } else {
                        return true
                    }
                }
            } else if ((input.is('[type=hidden]') && jQuery('input[name="'+input.attr('name')+'"][type="checkbox"]').size() == 0) || !input.is('[type=hidden]')) {
                result.push(input.attr('name') + '=' + value);
            }
        });
    }
    
    return result.join('&');
};
cartajax.attributes_html = function(attributes){
    var result = '';
    jQuery.each(attributes, function(key, attribute){
        result += '<p class="jshop_cart_attribute"><span class="name">' + attribute.attr + '</span>: <span class="value">' + attribute.value + '</span></p>';
    });
    return result;
}
cartajax.free_attributes_html = function(attributes){
    var result = '';
    jQuery.each(attributes, function(free_attribute_id, free_attribute_value){
        result += '<p class="jshop_cart_attribute"><span class="name">' + cartajax.freeattributes[free_attribute_id] + '</span>: <span class="value">' + free_attribute_value + '</span></p>';
    });
    return result;
}
cartajax.refresh_cart = function(cart){
    if(typeof cart[0] != 'undefined' && typeof cart[0].message != 'undefined')
    {
        var messages = new Array();
        jQuery.each(cart, function(key, cart_item){
            if(typeof cart_item.message != 'undefined' && cart_item.message.length > 0)
            {
                messages.push(cart_item.message);
            }
        });
        if(messages.length > 0)
		{
			cartajax_added_product_id = null;
			alert(messages.join(String.fromCharCode(10) + String.fromCharCode(13)));
		}
    }
    else
    {
        var cart_html = '';
        var cart_empty = true;
		if(cartajax.show_product_in_cart_message==1){jQuery("span.product_in_cart").hide();};
        if(cart.products)
        {
            jQuery.each(cart.products, function(number_in_cart, product){
                var freeattributes = cartajax.unserialize(product.freeattributes);
                cart_html += '<li class="cartajax-module-item">';
                if (typeof cartajax.advModules !== 'undefined'){
                    if (cartajax.showImage) {
                        cart_html += '    <div class="cartajax-module-item-image"><a href = "' + product.product_link + '"><img src="' + cartajax.images_base + '/' + product.thumb_image + '" alt="' + product.product_name + '" /></a></div>';
                    }
                    cart_html += '    <div class = "cartajax-module-product-info">';
                    cart_html += '    <div class="cartajax-module-item-label"><a href = "' + product.product_link + '">' + product.product_name + '</a></div>';
                    cart_html += '    <div class="cartajax-module-item-count">' + cartajax.const_product_quantity + product.quantity + '</div>';
                } else {
                    cart_html += '    <div class="cartajax-module-item-count">' + product.quantity + '&nbsp;x&nbsp;</div>';
                    if (cartajax.showImage) {
                        cart_html += '<div class="cartajax-module-item-image"><img src="' + cartajax.images_base + '/' + product.thumb_image + '" alt="' + product.product_name + '" /></div>';
                    }

                    cart_html += '    <div class="cartajax-module-item-label">' + product.product_name + '</div>';
                }
                
                if (cartajax.showEan) {
                    cart_html += '    <div class="cartajax-module-item-id">' + cartajax.const_product_ean + product.ean + '</div>';
                }
                
                cart_html += '    <div class="cartajax-module-item-price">' + cartajax.const_product_price + formatprice(parseFloat(product.price)) + '</div>' +
                             '    <a class="cartajax-module-item-remove"> </a>' + 
                             '    <input type="hidden" name="product_id" value="' + product.product_id + '" />' +
                             '    <input type="hidden" name="number_in_cart" value="' + number_in_cart + '" />' + 
                                  cartajax.attributes_html(product.attributes_value) + 
                                  cartajax.free_attributes_html(freeattributes);
                          
                if (typeof cartajax.advModules !== 'undefined'){
                    cart_html += '</div><div class = "clr"></div>';
                }
                cart_html += '</li>';
                cart_empty = false;
				if(cartajax.show_product_in_cart_message==1){jQuery("#product_in_cart_"+product.product_id).show();}
            });
        }
        if(cart_empty) {
            cart_html += cartajax.empty_cart_text;
            jQuery('.cartajax-module-bottom').hide();
        } else {
            jQuery('.cartajax-module-bottom').show();
        }
        
        jQuery('.cartajax-module').find('.cartajax-module-list').html(cart_html);
        jQuery('.cartajax-module').find('.cartajax-module-total span').html(formatprice(parseFloat(cart.price_product)))
        
        if (typeof cartajax.advModules !== 'undefined'){
            jQuery.each(cartajax.advModules, function(index, value) {
                if (jQuery('#cartajax-advanced-module'+value).length){
                    cartajax_show_hide_products(cart.count_product, 2, value);
                    jQuery('#cartajax-advanced-module'+value).find(jQuery('.cartajax-module')).find('.cartajax-module-count span').html(cart.count_product);
                }
            });
        }
    }
	cartajax.hide_overlay();
	if((cartajax.show_popup_message==1) && (cartajax_added_product_id)){
		init();
		cartajax_popup_request(cartajax_html, cartajax_added_product_id);
		cartajax_added_product_id = null;
	}
};

jQuery(document).ready(function(){
    var temp_image = jQuery('<img>').attr('src', cartajax.base + 'components/com_jshopping/images/cartajax-loading.gif');
});