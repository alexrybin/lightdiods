<?php
/**
* @version      1.4.1 22.08.2012
* @author       MAXXmarketing GmbH
* @package      Jshopping
* @copyright    Copyright (C) 2010 webdesigner-profi.de. All rights reserved.
*/

defined( '_JEXEC' ) or die( 'Restricted access' );
jimport('joomla.application.component.controller');

class JshoppingControllerCartajax extends JControllerLegacy {
    
    private $_template = 'addons';
     
    function __construct( $config = array() ){
        parent::__construct( $config );
    }
    
    function display($cachable = false, $urlparams = false){
		$jshopConfig = JSFactory::getConfig();
		$session = JFactory::getSession();
		JSFactory::loadExtLanguageFile("addon_cart_ajax");
		$product_id = JFactory::getApplication()->input->get('product_id');
		$product = JTable::getInstance('product', 'jshop');
		$product->load($product_id);
		$product->name = $product->getName();

		$shopurl = SEFLink('index.php?option=com_jshopping&controller=category',1);
		if ($jshopConfig->cart_back_to_shop=="product"){
			$endpagebuyproduct = $session->get('jshop_end_page_buy_product');
		}elseif ($jshopConfig->cart_back_to_shop=="list"){
			$endpagebuyproduct = $session->get('jshop_end_page_list_product');
		}
		if ($endpagebuyproduct){
			$shopurl = $endpagebuyproduct;
		}

		$view_name = "cartajax";
		$view_config = array("template_path" => JPATH_COMPONENT."/templates/addons/".$view_name);
		$view = $this->getView($view_name, getDocumentType(), '', $view_config);
		$view->setLayout('cartajax');
		$view->assign('href_shop', $shopurl);
		$view->assign('href_cart', SEFLink('index.php?option=com_jshopping&controller=cart&task=view',1,1));
		$view->assign('product', $product->name);
		echo $view->display();
		die();
    }
}
?>