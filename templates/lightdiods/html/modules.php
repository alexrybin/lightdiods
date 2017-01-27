<?php
/**
 * @package     Joomla.Site
 * @subpackage  Template.system
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;



function modChrome_empty($module, &$params, $attribs){
    if($module->content){


        echo $module->content;
    }


}

function modChrome_header_categories($module, &$params, $attribs){
    echo <<<kod
<nav class="nav">

                            <ul>

                                <div class="cur">Каталог</div>
kod;





    if($module->content){


        echo $module->content;
    }
    echo <<<kod
    </ul>
    
    </nav>

                            

                                
kod;




}

function modChrome_footer_categories($module, &$params, $attribs){
    echo <<<kod
<nav class="nav">

                    <ul>

                        <h3>Каталог</h3>

kod;





    if($module->content){


        echo $module->content;
    }
    echo <<<kod
    </ul>
    
    </nav>

                            

                                
kod;




}

function modChrome_katalog($module, &$params, $attribs){
    echo <<<kod
<div class="catalog-goods">
                <h3>Каталог товаров</h3>
                <div class="j-catalog-goods-wrapper">
                    <ul>
kod;

    if($module->content){


        echo $module->content;
    }

    echo <<<kod
</ul>
                </div>

            </div>
kod;





}
