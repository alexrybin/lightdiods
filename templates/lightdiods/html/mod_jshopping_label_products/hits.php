
<h2>Хиты продаж</h2>

<?php foreach($rows as $product){
    //var_dump($product->_tmp_var_image_block)

    ?>
    <article class="product-block__item">
        <div class="product-block__top">
            <div class="product-block__label">Хит продаж</div>
            <div class="product-block__triangle"></div>
            <a href="<?php print $product->product_link?>" class="product-block__image">
                <img src="<?php print $product->image ? $product->image : $noimage;?>" alt="<?php print htmlspecialchars($product->name);?>">
            </a>
            <div class="product-block__price">
                <?php print formatprice($product->product_price);?>
                <span class="rouble">g</span>
            </div>
        </div>
        <div class="product-block__bottom">
            <h3 class="product-block__name">
                <a href="<?php print $product->product_link?>">
                    <?php print htmlspecialchars($product->name);?>
                </a>
            </h3>
            <?php print $product->short_description?>

            <a href="<?php print $product->buy_link?>" class="btn button--add_to_cart">

                <svg class="button-busket" width="18" height="18">
                    <use xlink:href="#button-busket"/>
                </svg>
                Добавить в корзину
            </a>

            <!--<a href="#" class="product-block__one-click">
                Купить в один клик
            </a>-->
        </div>
    </article>

<?php } ?>



