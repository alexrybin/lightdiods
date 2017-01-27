<script type = "text/javascript">
function isEmptyValue(value){
    var pattern = /\S/;
    return ret = (pattern.test(value)) ? (true) : (false);
}
</script>
<form class="search-form" name = "searchForm" method = "post" action="<?php print SEFLink("index.php?option=com_jshopping&controller=search&task=result", 1);?>" onsubmit = "return isEmptyValue(jQuery('#jshop_search').val())">
<input type="hidden" name="setsearchdata" value="1">
<input type = "hidden" name = "category_id" value = "<?php print $category_id?>" />
<input type = "hidden" name = "search_type" value = "<?php print $search_type;?>" />
<input type = "text" class = "inputbox" placeholder="ПОИСК" name = "search" id = "jshop_search" value = "<?php print $search?>" />
    <svg class="search-trigger" width="30" height="30">
        <use xlink:href="#search"/>
    </svg>
    <script type="text/javascript">
        jQuery('.search-trigger').on('click',function () {
            jQuery('.search-enter').trigger( "click" );
        })
    </script>

<input class = "button search-enter" type = "submit" style="display: none"  value = "<?php // print _JSHOP_GO?>" />
<?php if ($adv_search) {?>
<br /><a href = "<?php print $adv_search_link?>"><?php print _JSHOP_ADVANCED_SEARCH?></a>
<?php } ?>
</form>