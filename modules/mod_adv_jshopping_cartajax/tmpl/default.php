<div class = "cartajax_adv_module" id = "cartajax-advanced-module<?php echo $module->id; ?>">
    <div class="cartajax-module">
        <div class = "block" style = "height: 60px;">
            <div class = "cartajax-module-count"><div><span><?php echo ((isset($cart->count_product)) ? $cart->count_product : 0) ?></span> <?php echo _JSHOP_PRODUCTS; ?></div></div>
            <div class = "cartajax-module-total"><div><span><?php print formatprice($cart->price_product)?></span></div></div>
            <div class = "clear"></div>
            <div class = "cartajax-module-checkout"><div><a href="<?php print $cart->cartAjaxHrefLink->link; ?>"><?php print $cart->cartAjaxHrefLink->label; ?></a></div></div>
            <div class = "cartajax-module-show-products"><div></div></div>
        </div>
        
        <div class = "block" id = "cartajax-module-products-block<?php echo $module->id; ?>" style = "display: none;">
            <ul class="cartajax-module-list">
                <?php if (count($cart->products)) : ?>
                    <?php foreach($cart->products as $number_in_cart => $product) : ?>
                        <li class="cartajax-module-item">
                            <?php if ($params->get("showImage", 1)) : ?>
                                <div class="cartajax-module-item-image">
                                    <a href = "<?php echo $product['product_link'];?>"><img src="<?php print $jshopConfig->image_product_live_path?>/<?php print $product['thumb_image']?>" alt="<?php print $product['product_name']?>" /></a>
                                </div>
                            <?php endif; ?>
                            <div class = "cartajax-module-product-info">
                                <div class="cartajax-module-item-label"><a href = "<?php echo $product['product_link'];?>"><?php print $product['product_name']?></a></div>
                                <div class="cartajax-module-item-count"><?php echo _JSHOP_QUANTITY; ?>: <?php print $product['quantity']?></div>
                                
                                <?php if ($params->get("showEan", 1)) : ?>
                                    <div class="cartajax-module-item-id"><?php echo _JSHOP_EAN; ?>: <?php print $product['ean']?></div>
                                <?php endif; ?>
                                    
                                <div class="cartajax-module-item-price"><?php echo _JSHOP_PRICE; ?>: <?php print formatprice($product['price'])?></div>
                                <a class="cartajax-module-item-remove"> </a>
                                <input type="hidden" name="product_id" value="<?php print $product['product_id']?>" />
                                <input type="hidden" name="number_in_cart" value="<?php print $number_in_cart?>" />
                                <?php print sprintAtributeInCart($product['attributes_value'])?>
                                <?php print sprintFreeAtributeInCart($product['free_attributes_value'])?>
                            </div>
                            <div class = "clr"></div>
                        </li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
            <div class = "cartajax-module-close"><a href="javascript:void(0)" onclick = "cartajax_show_hide_products(1, 0, <?php echo $module->id; ?>)" class = "cartajax-link"><?php print _JSHOP_CART_AJAX_CLOSE; ?></a></div>
            <div class = "clr"></div>
        </div>
    </div>
</div>