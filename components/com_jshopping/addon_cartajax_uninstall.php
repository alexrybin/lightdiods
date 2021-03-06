<?php
	defined('_JEXEC') or die('Restricted access');
	$db = JFactory::getDbo();
	$db->setQuery("DELETE FROM `#__extensions` WHERE element IN ('cartajax','cartajaxattributes','mod_jshopping_cartajax','mod_adv_jshopping_cartajax')");
	$db->query();
	$db->setQuery("DELETE FROM `#__modules` WHERE module='mod_jshopping_cartajax'");
	$db->query();
	$db->setQuery("DELETE FROM `#__modules` WHERE module='mod_adv_jshopping_cartajax'");
	$db->query();
	
	jimport('joomla.filesystem.folder');
	foreach(array(
		'components/com_jshopping/templates/addons/cartajax/',
		'components/com_jshopping/views/cartajax/',
		'modules/mod_jshopping_cartajax/',
		'modules/mod_adv_jshopping_cartajax/',
		'plugins/jshoppingproducts/cartajax/',
		'plugins/jshoppingcheckout/cartajax/',
		'plugins/jshoppingproducts/cartajaxattributes/'
	) as $folder){JFolder::delete(JPATH_ROOT."/".$folder);}
	
	jimport('joomla.filesystem.file');
	foreach(array(
		'components/com_jshopping/controllers/cartajax.php',
		'components/com_jshopping/controllers/cartajaxattributes.php',
		'components/com_jshopping/css/cartajax.css',
		'components/com_jshopping/helpers/cartajax.php',
		'components/com_jshopping/images/cartajax-loading.gif',
		'components/com_jshopping/js/cartajax.js',
		'components/com_jshopping/models/cartajaxattributes.php',
		'components/com_jshopping/addon_cartajax_uninstall.php'
	) as $file){JFile::delete(JPATH_ROOT."/".$file);}