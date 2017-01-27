<?php defined('_JEXEC') or die(); ?>
<?php echo $product->_tmp_var_start;



?>




<article class="product-block__item product productitem_<?php  echo $product->product_id?>" >




    <div class="product-block__top">
        <div class="product-block__label"><? if ($product->label_id==1 ) { ?> Новинка<? } if ($product->label_id==2 ) { ?> Хит продаж <? }  ?> </div>
        <div class="product-block__triangle"></div>
        <a href="<?php echo $product->product_link?>" class="product-block__image">
            <img src="<?php echo $product->image?>" alt="<?php echo htmlspecialchars($product->name);?>" title="<?php print htmlspecialchars($product->name);?>">
        </a>
        <div class="product-block__price">
            <?php echo formatprice($product->product_price);?>
            <span class="rouble">g</span>
        </div>
    </div>
    <div class="product-block__bottom">
        <h3 class="product-block__name">
            <a href="<?php echo $product->product_link?>">
                <?php echo htmlspecialchars($product->name);?>
            </a>
        </h3>
        <div class="product-block__description">
            <?php echo $product->short_description?>
        </div>
        <input class="input-mini" size="2" value="1" name="quantity" type="hidden">
        <input value="<?php echo $product->product_id?>" name="product_id" type="hidden">


        <div class="buttons">


            <a href="<?php echo $product->buy_link?>" class="button_buy btn button--add_to_cart">
                <svg class="button-busket" width="18" height="18">
                    <use xlink:href="#button-busket"/>
                </svg>
                Добавить в корзину
            </a>


        </div>
    </div>
</article>