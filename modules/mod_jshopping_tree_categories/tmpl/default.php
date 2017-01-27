<?php

$type = (($mconfig['dropdown']=="h")||($mconfig['dropdown']=="v")||($mconfig['dropdown']=="t")) ? true : false;
if ($type) {
	if ($mconfig['dropdown']!="t") { ?>
		<link rel="stylesheet" href = "<?php echo JURI::base();?>modules/mod_jshopping_tree_categories/css/style-<?php echo $mconfig['dropdown'];?>.css" type="text/css" />
		<?php if ( stristr($_SERVER['HTTP_USER_AGENT'], 'MSIE 6') ) { ?>
			<link rel="stylesheet" href = "<?php echo JURI::base();?>modules/mod_jshopping_tree_categories/css/style-ie6.css" type="text/css" />
		<?php } ?>
	<?php } else { ?>
		<link rel="stylesheet" href = "<?php echo JURI::base();?>modules/mod_jshopping_tree_categories/css/jquery.treeview.css" type="text/css" />
		<script src = "<?php echo JURI::base();?>modules/mod_jshopping_tree_categories/js/jquery.treeview.js" type="text/javascript"></script>
	<?php } ?>
<?php } ?>
<div class="jshop_tree_categories">
	<?php jshoppingTreeCategoriesHelper::displayTreeCat($cattree, $active_category, 0, $mconfig, $countprods); ?>
	<?php if ($type) { 
		if ($mconfig['dropdown']!="t") { ?>
			<script type="text/javascript">
				jQuery('#cattree0-<?php echo $mconfig['dropdown'];?> li').hover(
					function() {
						this.className+=" iehover";
						jQuery(this).find('ul:first').stop(true, true);
						jQuery(this).find('ul:first').slideDown();
					},
					function() {
						this.className=this.className.replace(new RegExp(" iehover\\b"), "");
						jQuery(this).find('ul:first').slideUp('fast'); 
					}
				);
			</script>
		<?php } else { ?>
			<script type="text/javascript">
				jQuery("#cattree0-t").treeview({
					animated: "fast",
					persist: "location",
					collapsed: true,
					unique: false
				});
				<?php if ( stristr($_SERVER['HTTP_USER_AGENT'], 'MSIE 6') ) { ?>
					jQuery("#cattree0-t").find('div+a').css("margin", "0");
				<?php } ?>
			</script>
		<?php }
		} ?>
</div>