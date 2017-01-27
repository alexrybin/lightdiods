
<svg class="shopping-cart" width="18" height="18">
    <use xlink:href="#shopping-cart"/>
</svg>



    <a href = "<?php print SEFLink('index.php?option=com_jshopping&controller=cart&task=view', 1)?>"><?php print JText::_('Корзина')?></a>

<? if ($cart->count_product == 0)
    $cart->count_product = '';
?>

<a href = "<?php print SEFLink('index.php?option=com_jshopping&controller=cart&task=view', 1)?>"><?php print $cart->count_product?></a>


