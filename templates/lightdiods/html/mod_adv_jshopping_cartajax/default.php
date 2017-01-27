



<div style="background-color: #453737;  " class = "cartajax_adv_module" id = "cartajax-advanced-module<?php echo $module->id; ?>">
    <div class="cartajax-module">
        <a class="shopping-cart__link"  href="<?php print $cart->cartAjaxHrefLink->link; ?>">

        <svg class="shopping-cart" width="18" height="18">
            <use xlink:href="#shopping-cart"/>
        </svg>
            <div  >
                <div  class = "cartajax-module-total shopping-cart__content"><div style="padding-left: 25px;" ><span style=""><?php print formatprice($cart->price_product)?></span><div style="display: inline-block; color: #fff;" class="rouble rouble-mobile">a</div></div></div>


            </div>

</a>


    </div>
</div>