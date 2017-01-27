<?php 
/**
* @version      3.5.5 14.09.2016
* @author       Brooksus
* @package      JoomShopping
* @copyright    Copyright (C) 2016 Brooksite.ru. All rights reserved.
* @license      2016. Brooksite.ru (http://brooksite.ru/litsenzionnoe-soglashenie.html).
*/
defined('_JEXEC') or die('Restricted access');
if ($layout=="_:externbootstrapdop-min"){
	$layot_mark="min_view";
}
?>
<div class="<?php print $layot_mark;?> type_view  <?php if ($type_view=="1") {print "cart_view";} else {print "wishlist_view";}?>" data-cart-view="<?php if ($type_view=="1") {print "cart_view ";} else {print "wishlist_view ";} ?>">