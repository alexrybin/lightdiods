<div class="pline_block">
<?php print $product->_tmp_var_start?>
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
</div>

<div class="name">
    <a href="<?php print $product->product_link?>"><?php print $product->name?></a>
</div>

<div class="price">
<?php if ($product->product_old_price > 0){?>
    <div class="old_price"><?php if ($this->config->product_list_show_price_description) print _JSHOP_OLD_PRICE.": ";?><span><?php print formatprice($product->product_old_price)?></span></div>
<?php }?>
	<?php print $product->_tmp_var_bottom_old_price;?>
<?php if ($product->product_price_default > 0 && $this->config->product_list_show_price_default){?>
    <div class="default_price"><?php print _JSHOP_DEFAULT_PRICE.": ";?><span><?php print formatprice($product->product_price_default)?></span></div>
<?php }?>
<?php if ($product->_display_price){?>
    <div class = "jshop_price">
        <?php if ($this->config->product_list_show_price_description) print _JSHOP_PRICE.": ";?>
        <?php if ($product->show_price_from) print _JSHOP_FROM." ";?>
        <span><?php print formatprice($product->product_price);?><?php print $product->_tmp_var_price_ext;?></span>
    </div>
<?php }?>
<?php print $product->_tmp_var_bottom_price;?>
<?php if ($this->config->show_tax_in_product && $product->tax > 0){?>
    <span class="taxinfo"><?php print productTaxInfo($product->tax);?></span>
<?php }?>
<?php if ($this->config->show_plus_shipping_in_product){?>
    <div class="plusshippinginfo"><?php print sprintf(_JSHOP_PLUS_SHIPPING, $this->shippinginfo);?></div>
<?php }?>
</div>

<div class="review">
<?php if ($this->allow_review){?>
<table class="review_mark"><tr><td><?php print showMarkStar($product->average_rating);?></td></tr></table>
<div class="count_commentar">
    <?php print sprintf(_JSHOP_X_COMENTAR, $product->reviews_count);?>
</div>
<?php }?>
</div>

<div class="block_buttons">
<?php print $product->_tmp_var_top_buttons;?>
<div class="buttons">    
    <div class="details">
    <a class="button_detail" href="<?php print $product->product_link?>"><?php print _JSHOP_DETAIL?></a>
    </div>
    <div class="buy">
    <?php if ($product->buy_link){?>
    <a class="button_buy" href="<?php print $product->buy_link?>"><?php print _JSHOP_BUY?></a>
    <?php }?>
    </div>
    <?php print $product->_tmp_var_buttons;?>
</div>
<?php print $product->_tmp_var_bottom_buttons;?>
</div>


<?php print $product->_tmp_var_end?>
</div>
<div style="clear:left"></div>