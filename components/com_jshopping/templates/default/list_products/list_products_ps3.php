<div class="jshop list_product_ps3">
<?php foreach ($this->rows as $k=>$product){?>
<div class='products_row'>
    <div class="block_product product">
        <?php include(dirname(__FILE__)."/".$product->template_block_product);?>
    </div>
</div>
<?php }?>
</div>