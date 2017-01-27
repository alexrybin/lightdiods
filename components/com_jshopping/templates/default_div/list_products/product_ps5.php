<div class="pline_block">
<?php print $product->_tmp_var_start?>
<div class="image">
    <?php if ($product->image){?>
    <div class="image_block">  
		<?php print $product->_tmp_var_image_block;?>
        <a href="<?php print $product->product_link?>">
            <img class="jshop_img" src="<?php print $product->image?>" alt="<?php print htmlspecialchars($product->name);?>" title="<?php print htmlspecialchars($product->name);?>" />
        </a>
    </div>
    <?php }?>    
</div>
<?php print $product->_tmp_var_end?>
</div>