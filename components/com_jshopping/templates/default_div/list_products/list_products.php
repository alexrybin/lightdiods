<?php defined('_JEXEC') or die(); ?>
<?php

if  ($this->category->name=='Главная'){

    ?>

    <div class="product-block__wrapper">
        <div class="product-block__row">


            <h2>Новинки</h2>
            <?php foreach ($this->rows as $k=>$product){
                if ($product->label_id==1 ){

                    ?>

                    <?php  include(dirname(__FILE__)."/".$product->template_block_product);?>

                <?php }?>
            <?php } ?>

        </div>
    </div>
    <div class="product-block__wrapper">
        <div class="product-block__row">
            <h2>Хиты продаж</h2>

            <?php foreach ($this->rows as $k=>$product){
                if ($product->label_id==2 ){

                    ?>

                    <?php  include(dirname(__FILE__)."/".$product->template_block_product);?>

                <?php }?>
            <?php } ?>

        </div>
    </div>
<?php } ?>


<?php

if  ($this->category->name != 'Главная'){

    ?>




    <div class="product-block__wrapper">
        <div class="product-block__row">

            <?php foreach ($this->rows as $k=>$product){

                ?>

                <?php  include(dirname(__FILE__)."/".$product->template_block_product);?>

            <?php }?>





        </div>
    </div>

<?php } ?>