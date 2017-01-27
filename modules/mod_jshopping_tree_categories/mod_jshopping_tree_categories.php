<?php
/**
* @version      3.3.5 10.09.2011
* @author       MAXXmarketing GmbH
* @package      Jshopping
* @copyright    Copyright (C) 2010 webdesigner-profi.de. All rights reserved.
* @license      MAXXmarketing GmbH
*/

defined('_JEXEC') or die('Restricted access');
error_reporting(error_reporting() & ~E_NOTICE);

if (!file_exists(JPATH_SITE.'/components/com_jshopping/jshopping.php')){
    JError::raiseError(500,"Please install component \"joomshopping\"");
} 

JTable::addIncludePath(JPATH_SITE.'/components/com_jshopping/tables'); 
require_once (JPATH_SITE.'/components/com_jshopping/lib/factory.php'); 
require_once (JPATH_SITE.'/components/com_jshopping/lib/functions.php');        
JSFactory::loadCssFiles();
JSFactory::loadJsFiles();
JSFactory::loadLanguageFile();
$jshopConfig = JSFactory::getConfig();

require_once(dirname(__FILE__).'/helper.php');

$field_sort = $params->get('sort', 'id');
$ordering = $params->get('ordering', 'asc');
$showimage = $params->get('show_image', 0);
$display_tree = $params->get('display_tree', 1);
$dropdown = $params->get('dropdown', 0);
$start_cat = (int)$params->get('start_cat', 0);
$display_count_product = (int)$params->get('display_count_product', 0);
$dropping_position = (int)$params->get('dropping_position', 0);
$mconfig = array("image"=>$showimage, "display_tree"=>$display_tree, "dropdown"=>$dropdown,'display_count_product'=>$display_count_product, 'dropping_position' => $dropping_position);
    
$category_id = JRequest::getInt('category_id');
$category = JTable::getInstance('category', 'jshop');        
$category->load($category_id);
$active_category = $category->getTreeParentCategories();    
$cattree = jshoppingTreeCategoriesHelper::getTreeCategory(1, $field_sort, $ordering, $start_cat);
$_countprods = jshoppingTreeCategoriesHelper::getAllCatCountProducts();

$countprods = array();
$allcountprods = jshoppingTreeCategoriesHelper::getTreeAllCatCountProducts($cattree, $_countprods, $countprods);

require(JModuleHelper::getLayoutPath('mod_jshopping_tree_categories'));
?>