<div class="pline_block">
<?php print $product->_tmp_var_start?>
<div class="name">
    <a href="<?php print $product->product_link?>"><?php print $product->name?></a>
</div>
<div class="image">
    <?php if ($product->image){?>
    <div class="image_block">
		<?php print $product->_tmp_var_image_block;?>
        <?php if ($product->label_id){?>
            <div class="product_label">
                <?php if ($product->_label_image){?>
                    <img src="<?php print $product->_label_image?>" alt="<?php print htmlspecialchars($product->_label_name)?>" />
                <?php }else{?>
                    <span class="label_name"><?php print $product->_label_name;?></span>
                <?php }?>
            </div>
        <?php }?>
        <a href="<?php print $product->product_link?>">
            <img class="jshop_img" src="<?php print $product->image?>" alt="<?php print htmlspecialchars($product->name);?>" title="<?php print htmlspecialchars($product->name);?>" />
        </a>
    </div>
    <?php }?>
    <?php print $product->_tmp_var_bottom_foto;?>
    <?php if ($product->_display_price){?>
        <div class = "jshop_price">
            <?php if ($this->config->product_list_show_price_description) print _JSHOP_PRICE.": ";?>
            <?php if ($product->show_price_from) print _JSHOP_FROM." ";?>
            <span><?php print formatprice($product->product_price);?><?php print $product->_tmp_var_price_ext;?></span>
        </div>
    <?php }?>
</div>
<?php print $product->_tmp_var_end?>
</div>