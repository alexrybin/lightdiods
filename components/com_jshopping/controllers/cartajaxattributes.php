<?php
defined( '_JEXEC' ) or die( 'Restricted access' );
jimport('joomla.application.component.controller');
require_once JPATH_SITE.'/components/com_jshopping/helpers/cartajax.php';

class JshoppingControllerCartAjaxAttributes extends JControllerLegacy
{
    function display($cachable = false, $urlparams = false)
    {
        while(ob_get_level())ob_end_clean();
        $result = new stdClass();
        $jshopConfig = JSFactory::getConfig();
        $product_id = JRequest::getInt('product_id');
        $quantity = JRequest::getInt('quantity');
        if (!$quantity) $quantity = 1;
        $product = JTable::getInstance('product', 'jshop'); 
        $product->load($product_id);
        $selected_attributes = (array)JRequest::getVar('jshop_attr_id');
        $product_attributes = $product->getAttributesDatas($selected_attributes);
        $selected_free_attributes = (array)JRequest::getVar('freeattribut');
        $product->setAttributeActive($product_attributes['attributeActive']);
        
        $model_attributes = JModelLegacy::getInstance('cartajaxattributes', 'jshop', array($product));
        $result->form = $model_attributes->getProductAttributesForm($product->product_id, $product->getCategory(), $selected_attributes, $selected_free_attributes);
        $pricefloat = $product->getPrice($quantity, 1, 1, 1);
        $result->price = formatprice($pricefloat);
        $result->pricefloat = $pricefloat;
        $result->available = $product->getQty() > 0;
        $result->ean = $product->getEan();
        if ($jshopConfig->admin_show_product_basic_price){
            $result->basicprice = formatprice($product->getBasicPrice());;
            $result->product_basic_price_unit_name = $product->product_basic_price_unit_name;
        }
        if($jshopConfig->product_show_weight)$result->weight = formatweight($product->getWeight());
        if($jshopConfig->product_list_show_price_default && $product->product_price_default > 0)$result->pricedefault = formatprice($product->product_price_default);
        if($jshopConfig->product_show_qty_stock)$result->qty = sprintQtyInStock(getDataProductQtyInStock($product));
        $product->updateOtherPricesIncludeAllFactors();
        if($product->product_old_price)$result->oldprice = formatprice($product->product_old_price);
        if($jshopConfig->use_extend_attribute_data)
        {
            $images = $product->getImages();
            if(count($images) > 0)$result->image = $jshopConfig->image_product_live_path.'/'.$images[0]->image_thumb;
        }           
        $dispatcher = JDispatcher::getInstance();       
        $dispatcher->trigger('onBeforeDisplayAjaxAttribCart', array(&$result, &$product) );
        echo json_encode($result);
        exit;
    }        
}
?>