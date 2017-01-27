<?php

/**
 * @package     Joomla.Site
 * @subpackage  mod_custom
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
$doc = JFactory::getDocument();
?>
<a href="<?php echo JUri::base();?>" class="logo">
    <img src="<?= JUri::base().'templates/'.$doc->template?>/img/logo.png"  alt="Интернет магазин светодиодного освещения «Делайт»">
</a>



	<?php echo $module->content;?>
