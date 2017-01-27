<div class="jshop list_product_ps1">
<?php foreach ($this->rows as $k=>$product){?>
<?php if ($k%$this->count_product_to_row==0) print "<div class='products_row'>";?>
    <div style="width:<?php print 100/$this->count_product_to_row?>%" class="block_product <?php if ($k%$this->count_product_to_row==$this->count_product_to_row-1){?>last_block<?php }?>">
        <?php include(dirname(__FILE__)."/".$product->template_block_product);?>
    </div>
    <?php if ($k%$this->count_product_to_row==$this->count_product_to_row-1){?>
    <div style="clear:left;"></div></div>
    <?php }?>
<?php }?>
    <?php if ($k%$this->count_product_to_row!=$this->count_product_to_row-1){?>
    <div style="clear:left;"></div></div>
    <?php }?>
</div>
<div style="clear:left;"></div>