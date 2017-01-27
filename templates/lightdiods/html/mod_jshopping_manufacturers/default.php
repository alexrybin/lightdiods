

<? if ($module->id == 106) { ?>
<h2>Ведущие производители</h2>
<?php
foreach($list as $curr){
//var_dump($curr);
    if ($curr->name != 'Прочие'){

    ?>

    <div class="leadind-producers__item">
        <a class="leading-producers__img" href="<?php print $curr->link?>">
        <img  src = "<?php print $jshopConfig->image_manufs_live_path."/".$curr->manufacturer_logo?>" alt = "<?php print $curr->name?>" />
        </a>
    </div>




<?php }}} ?>


<? if ($module->id == 115) { ?>
<nav class="nav">

    <ul>

        <h3>Производители</h3>

        <?php
        foreach($list as $curr){

        ?>

            <li>
                <? if ($manufacturer_id == $curr->manufacturer_id) { ?>
                <a class='current' href="<?php print $curr->link?>">
                    <?php print $curr->name?>
                </a>
                <? } else { ?>
                    <a  href="<?php print $curr->link?>">
                        <?php print $curr->name?>
                    </a>



                <? }  ?>

            </li>


<? } ?>

    </ul>

</nav>

<?php } ?>


