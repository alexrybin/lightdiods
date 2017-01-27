<div class="cartajax-module">
    <ul class="cartajax-module-list">
        <?php if(count($cart->products) > 0){?>
            <?php foreach($cart->products as $number_in_cart => $product){?>
                <li class="cartajax-module-item">
                    <div class="cartajax-module-item-count"><?php print $product['quantity']?>&nbsp;x&nbsp;</div>
                    <?php if ($params->get("showImage", 1)) : ?>
                        <div class="cartajax-module-item-image">
                            <img src="<?php print $jshopConfig->image_product_live_path?>/<?php print $product['thumb_image']?>" alt="<?php print $product['product_name']?>" />
                        </div>
                    <?php endif; ?>
                    <div class="cartajax-module-item-label"><?php print $product['product_name']?></div>
                    <?php if ($params->get("showEan", 1)) : ?>
                        <div class="cartajax-module-item-id"><?php print $product['ean']?></div>
                    <?php endif; ?>
                    <div class="cartajax-module-item-price"><?php print formatprice($product['price'])?></div>
                    <a class="cartajax-module-item-remove"> </a>
                    <input type="hidden" name="product_id" value="<?php print $product['product_id']?>" />
                    <input type="hidden" name="number_in_cart" value="<?php print $number_in_cart?>" />
                    <?php print sprintAtributeInCart($product['attributes_value'])?>
                    <?php print sprintFreeAtributeInCart($product['free_attributes_value'])?>
                </li>
            <?php }?>
        <?php }else{?>
            <?php print _JSHOP_NO_PRODUCTS_CART?>
        <?php }?>
    </ul>
    <div class="cartajax-module-bottom" <?php if(count($cart->products) == 0){?>style="display:none"<?php }?>>
        <div class="cartajax-module-total"><?php print _JSHOP_TOTAL?>: <span><?php print formatprice($cart->price_product)?></span></div>
        <div class="cartajax-module-checkout">
            <a class="cartajax-module-checkout" href="<?php print $cart->cartAjaxHrefLink->link; ?>"><?php print $cart->cartAjaxHrefLink->label; ?></a>
        </div>
    </div>
</div>