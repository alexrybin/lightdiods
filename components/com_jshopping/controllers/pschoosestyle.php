<?php
/**
* @author       MAXXmarketing GmbH
* @package      Jshopping
* @copyright    Copyright (C) 2010 webdesigner-profi.de. All rights reserved.
* @license      GNU/GPL
*/

defined( '_JEXEC' ) or die( 'Restricted access' );
jimport('joomla.application.component.controller');

class JshoppingControllerPschoosestyle extends JControllerLegacy{

    function display($cachable = false, $urlparams = false){
        $style = JRequest::getVar("style");
        $back = JRequest::getVar("back");
        $back = base64_decode($back);        
        
        $session = JFactory::getSession();
        $session->set("jhsop_product_list_style", $style);
        $this->setRedirect($back);
    }
    
}
?>