<?php
    error_reporting(error_reporting() & ~E_NOTICE);
	if(!file_exists(JPATH_SITE.'/components/com_jshopping/jshopping.php'))JError::raiseError(500, "CartAjax module requires component \"joomshopping\"");
    if(!file_exists(JPATH_SITE.'/components/com_jshopping/helpers/cartajax.php'))JError::raiseError(500, "CartAjax module requires JoomShopping addon 'cartajax'");
    require_once JPATH_SITE.'/components/com_jshopping/helpers/cartajax.php';
    require_once JPATH_SITE.'/components/com_jshopping/lib/factory.php';
    require_once JPATH_SITE.'/components/com_jshopping/lib/functions.php';
    JSFactory::loadExtLanguageFile('addon_cart_ajax');
    
    JModelLegacy::addIncludePath(JPATH_BASE.'/components/com_jshopping/models');
    $jshopConfig = JSFactory::getConfig();
    $cart = JModelLegacy::getInstance('cart', 'jshop');
    $cart->load('cart');
    $document = JFactory::getDocument();
    
    global $cartajax_module_scrips_loaded;
    if(!isset($cartajax_module_scrips_loaded))
    {
        JSFactory::loadJsFiles();
		JSFactory::loadLanguageFile();
        CartAjaxHelper::includeCommonCode();
        
        
        $document->addCustomTag('<script type="text/javascript" src="'.JURI::base().'modules/mod_adv_jshopping_cartajax/cartajax_adv_module.js"> </script>');
        $document->addCustomTag('<script type="text/javascript">
                                    cartajax.empty_cart_text = '.json_encode(_JSHOP_NO_PRODUCTS_CART).';
                                    cartajax.showImage = '.$params->get("showImage", 1).';
                                    cartajax.delay = '.$params->get("delay", 3000).';
                                    cartajax.showEan = '.$params->get("showEan", 1).';
                                    cartajax.open_info = '.$params->get("open_info", 0).';
                                    cartajax.const_product_quantity = "'._JSHOP_QUANTITY.': ";
                                    cartajax.const_product_ean = "'._JSHOP_EAN.': ";
                                    cartajax.const_product_price = "'._JSHOP_PRICE.': ";
                                    cartajax.const_show_products = "'._JSHOP_CART_AJAX_SHOW_PRODUCTS.'";
                                    cartajax.const_hide_products = "'._JSHOP_CART_AJAX_HIDE_PRODUCTS.'";
                                    cartajax.count_products = ' . $cart->count_product . ';
                                 </script>');
        $cartajax_module_scrips_loaded = true;
    }
    $document->addCustomTag('<script type="text/javascript">
                                if (jQuery.isArray(cartajax.advModules)){
                                    cartajax.advModules.push("'.$module->id.'");
                                } else {
                                    cartajax.advModules = new Array("'.$module->id.'");
                                }
                            </script>');
    
    $cart->setDisplayFreeAttributes();
    $cart->cartAjaxHrefLink = new stdClass();
    if ($params->get('showLinkToCart', 1)){
        $cart->cartAjaxHrefLink->link = SEFLink('index.php?option=com_jshopping&controller=checkout&task=step2&'.($jshopConfig->shop_user_guest == 1 ? 'check_login=1' : ''), 1, 0, $jshopConfig->use_ssl);
        $cart->cartAjaxHrefLink->label = _JSHOP_CHECKOUT;
    } else {
        $cart->cartAjaxHrefLink->link = SEFLink('index.php?option=com_jshopping&controller=cart&task=view', 1, 0, $jshopConfig->use_ssl);
        $cart->cartAjaxHrefLink->label = _JSHOP_CART;
    }
    
    require JModuleHelper::getLayoutPath('mod_adv_jshopping_cartajax');