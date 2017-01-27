<?php
    defined('_JEXEC') or die;
    class CartAjaxHelper
    {
    	static $common_included = false;
        static function includeCommonCode()
        {
            if(!self::$common_included)
            {
                $jshopConfig = JSFactory::getConfig();
                $document = JFactory::getDocument();
                $document->addCustomTag('<link type="text/css" rel="stylesheet" href="'.JURI::base().'components/com_jshopping/css/cartajax.css" />');
                $document->addCustomTag('<script type="text/javascript">
                                            var currency_code = "'.$jshopConfig->currency_code.'";
                                            var format_currency = "'.$jshopConfig->format_currency[$jshopConfig->currency_format].'";
                                            var decimal_count = "'.$jshopConfig->decimal_count.'";
                                            var decimal_symbol = "'.$jshopConfig->decimal_symbol.'";
                                            var thousand_separator = "'.$jshopConfig->thousand_separator.'";
                                         </script>');
                $document->addCustomTag('<script type="text/javascript">
                                            var cartajax = cartajax || {};
                                            cartajax.base = "'.JURI::base().'";
                                            cartajax.add_base = "'.SEFLink('index.php?option=com_jshopping&controller=cart&task=add&ajax=1',1).'";
                                            cartajax.remove_base = "'.SEFLink('index.php?option=com_jshopping&controller=cart&task=delete&ajax=1',1).'";
                                            cartajax.reload_base = "'.SEFLink('index.php?option=com_jshopping&controller=cart&ajax=1&format=json',1).'";
                                            cartajax.form_base = "'.SEFLink('index.php?option=com_jshopping&controller=cartajaxattributes&ajax=1',1).'";
                                            cartajax.buy_base = "'.SEFLink('index.php?option=com_jshopping&controller=cart&task=add',1).'";
                                            cartajax.compare_base = "'.SEFLink('index.php?option=com_jshopping&controller=addon_compare&task=add',1).'";
                                            cartajax.images_base = "'.$jshopConfig->image_product_live_path.'";
                                            cartajax.decimal_count = '.(int)$jshopConfig->decimal_count.';
                                            cartajax.decimal_symbol = "'.$jshopConfig->decimal_symbol.'";
                                            cartajax.thousand_separator = "'.$jshopConfig->thousand_separator.'";
                                            cartajax.freeattributes = '.json_encode(self::_getFreeAttributes()).';
                                         </script>');
                $document->addCustomTag('<script type="text/javascript" src="'.JURI::base().'components/com_jshopping/js/cartajax.js"> </script>');
                self::$common_included = true;
            }
        }
        
        static function _getFreeAttributes()
        {
            $result = array();
            JModelLegacy::addIncludePath(JPATH_BASE.'/components/com_jshopping/models');
            $model_attributes = JModelLegacy::getInstance('cartajaxattributes', 'jshop');
            $free_attributes = $model_attributes->getAllFreeAttributes();
            if(count($free_attributes) > 0)
            {
                foreach($free_attributes as $attribute)
                {
                    $result[$attribute->id] = $attribute->name;
                }
            }
            return $result;
        }
    }
?>