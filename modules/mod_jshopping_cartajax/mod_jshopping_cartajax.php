<?php
    error_reporting(error_reporting() & ~E_NOTICE);
	if(!file_exists(JPATH_SITE.'/components/com_jshopping/jshopping.php'))JError::raiseError(500, "CartAjax module requires component \"joomshopping\"");
    if(!file_exists(JPATH_SITE.'/components/com_jshopping/helpers/cartajax.php'))JError::raiseError(500, "CartAjax module requires JoomShopping addon 'cartajax'");
    require_once JPATH_SITE.'/components/com_jshopping/helpers/cartajax.php';
    require_once JPATH_SITE.'/components/com_jshopping/lib/factory.php';
    require_once JPATH_SITE.'/components/com_jshopping/lib/functions.php';
    global $cartajax_module_scrips_loaded;
    if(!isset($cartajax_module_scrips_loaded))
    {
        JSFactory::loadJsFiles();
        JSFactory::loadLanguageFile();
        CartAjaxHelper::includeCommonCode();
        $document = JFactory::getDocument();
        $document->addCustomTag('<link rel="stylesheet" type="text/css" href="'.JURI::base().'modules/mod_jshopping_cartajax/cartajax_module.css" />');
        $document->addCustomTag('<script type="text/javascript" src="'.JURI::base().'modules/mod_jshopping_cartajax/cartajax_module.js"> </script>');
        $document->addCustomTag('<script type="text/javascript">
                                    cartajax.empty_cart_text = '.json_encode(_JSHOP_NO_PRODUCTS_CART).';
                                    cartajax.showImage = '.$params->get("showImage", 1).';
                                    cartajax.showEan = '.$params->get("showEan", 1).';
									cartajax.const_product_quantity = "";
                                    cartajax.const_product_ean = "";
                                    cartajax.const_product_price = "";
                                 </script>');
        $cartajax_module_scrips_loaded = true;
    }
    JModelLegacy::addIncludePath(JPATH_BASE.'/components/com_jshopping/models');
    $jshopConfig = JSFactory::getConfig();
    $cart = JModelLegacy::getInstance('cart', 'jshop');
    $cart->load('cart');
    $cart->setDisplayFreeAttributes();
    
    $cart->cartAjaxHrefLink = new stdClass();
    if ($params->get('showLinkToCart', 1)){
        $cart->cartAjaxHrefLink->link = SEFLink('index.php?option=com_jshopping&controller=checkout&task=step2&'.($jshopConfig->shop_user_guest == 1 ? 'check_login=1' : ''), 1, 0, $jshopConfig->use_ssl);
        $cart->cartAjaxHrefLink->label = _JSHOP_CHECKOUT;
    } else {
        $cart->cartAjaxHrefLink->link = SEFLink('index.php?option=com_jshopping&controller=cart&task=view', 1, 0, $jshopConfig->use_ssl);
        $cart->cartAjaxHrefLink->label = _JSHOP_CART;
    }
    
    require JModuleHelper::getLayoutPath('mod_jshopping_cartajax');
?>