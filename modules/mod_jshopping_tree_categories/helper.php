<?php
class jshoppingTreeCategoriesHelper{
    
    static function _getCategoryParent($cat, $parent){
        $res = array();
        foreach($cat as $obj){
            if ($obj->category_parent_id == $parent) $res[] = $obj;
        } 
        return $res;
    }

    static function _getResortCategoryTree(&$cats, $allcats){
        foreach($cats as $k=>$v){
            $cats_sub = jshoppingTreeCategoriesHelper::_getCategoryParent($allcats, $v->category_id);
            if (count($cats_sub)){
                jshoppingTreeCategoriesHelper::_getResortCategoryTree($cats_sub, $allcats);            
            }
            $cats[$k]->subcat = $cats_sub;        
        }
    }
    
    static function getTreeCategory($publish = 1, $order, $dir, $start_cat = 0){
        $jshopConfig = JSFactory::getConfig();
        $db = JFactory::getDBO();
        $lang = JSFactory::getLang();
        $user = JFactory::getUser();
        $groups = implode(',', $user->getAuthorisedViewLevels());

        if ($order=="id") $orderby = "category_id";
        if ($order=="name") $orderby = "`".$lang->get('name')."`";
        if ($order=="ordering") $orderby = "ordering";
        if (!$orderby) $orderby = "ordering";
        
        $where_add = ($publish) ? (" and category_publish = '1' ") : ("");
        $query = "SELECT `".$lang->get('name')."` as name, category_id, category_parent_id, category_image FROM `#__jshopping_categories` where access IN (".$groups.") ".$where_add." ORDER BY category_parent_id, ".$orderby." ".$dir;
        $db->setQuery($query);
        $allcats = $db->loadObjectList();
        foreach($allcats as $k=>$cat){
            $allcats[$k]->url = SEFLink('index.php?option=com_jshopping&controller=category&task=view&category_id='.$cat->category_id, 1);
        }
            
        $cats = jshoppingTreeCategoriesHelper::_getCategoryParent($allcats, $start_cat);        
        jshoppingTreeCategoriesHelper::_getResortCategoryTree($cats, $allcats);
        
        return $cats;
    }
    
    static function displayTreeCat($tree, $active_category, $level = 0, $config, $countprods){
        if (count($tree)==0) return 0;
        $jshopConfig = JSFactory::getConfig();
        $show_id = '';

        if ($config['dropping_position'] == 0){
            if ($config['dropdown'] == 'h' && $level == 1){
                $style = ' style = "right: 100%;"';
            } else if ($config['dropdown'] == 'h' || $config['dropdown'] == 'v') {
                $style = ' style = "right: 100%; left: auto;"';
            }
        } else {
            $style = '';
        }
        
        if (!$level) $show_id = ' id="cattree'.$level.'-'.$config['dropdown'].'" ';
        $ulstyle = ' class="cattree'.$level.'-'.$config['dropdown'].'"'.$show_id.$style;    
        print '<ul'.$ulstyle.'>';
        foreach($tree as $cat){
            $listyle = "";$active = 0;
            if (in_array($cat->category_id,$active_category)) {
                $listyle = " class='active open' ";
                $active = 1;
            }
            $name = $cat->name;
            if ($config['display_count_product']){                
                $name = $name." (".(int)$countprods[$cat->category_id].")";                
            }
            print "<li".$listyle.">";
                print '<a href="'.$cat->url.'"'.($cat->category_id==JRequest::getInt('category_id') ? ' class="selected"' : '').'>';
                if ($config['image'] && $cat->category_image) print '<span class="image"><img src="'.$jshopConfig->image_category_live_path."/".$cat->category_image.'" alt="'.htmlspecialchars($cat->name).'"/></span>';
                print '<span>'.$name.'</span>';
                print '</a>';
                if ($active || $config['display_tree']){
                    jshoppingTreeCategoriesHelper::displayTreeCat($cat->subcat, $active_category, $level+1, $config, $countprods);
                }
            print "</li>";
        }    
        print "</ul>";  
    }
    
    static function getAllCatCountProducts(){
        $jshopConfig = JSFactory::getConfig();
        $db = JFactory::getDBO();  
        $user = JFactory::getUser();
        $groups = implode(',', $user->getAuthorisedViewLevels());
        
        if ($jshopConfig->hide_product_not_avaible_stock){
            $adv_query .= " AND prod.product_quantity > 0";
        }
        
        $query = 'SELECT prodToCat.category_id, count(prodToCat.product_id) as count 
                  FROM `#__jshopping_products_to_categories` as prodToCat 
                  RIGHT JOIN `#__jshopping_products` as prod ON prodToCat.product_id = prod.product_id
                  where prod.product_publish = 1 AND prod.access IN ('.$groups.') '.$adv_query.' group by prodToCat.category_id';
        $db->setQuery($query);
        $list = $db->loadObjectList();
        
        $rows = array();
        foreach($list as $row){
            $rows[$row->category_id] = $row->count;
        }        
        return $rows;
    }
    
    static function getTreeAllCatCountProducts($cattree, $countprods, &$trrecount){
        $count = 0;
        foreach($cattree as $cat){
            $countcat = $countprods[$cat->category_id];            
            $countsubcat = jshoppingTreeCategoriesHelper::getTreeAllCatCountProducts($cat->subcat, $countprods, $trrecount);
            $trrecount[$cat->category_id] = $countcat + $countsubcat;
            $count += ($countcat + $countsubcat);
        }
        return $count;
    }
        
}
?>