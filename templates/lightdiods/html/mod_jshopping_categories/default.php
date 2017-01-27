

<?php


foreach($categories_arr as $curr){

    switch ($curr->name){
        case 'Светодиодные прожекторы':
            $curr->name = 'Светодиодные <br>  прожекторы'; break;
        case 'Бытовые и ЖКХ светильники':
            $curr->name = 'Бытовые и ЖКХ  <br> светильники'; break;

        case 'Взрывозащищенные светильники':
            $curr->name = 'Взрывозащищенные  <br> светильники'; break;
        case 'Промышленное освещение':
            $curr->name = 'Промышленное  <br> освещение'; break;
        case 'Системы управления освещением':
            $curr->name = 'Системы управления  <br> освещением'; break;
        case 'Уличные светильники':
            $curr->name = 'Уличные  <br>  светильники'; break;
        case 'Освещение витрин':
            $curr->name = 'Освещение<br> витрин'; break;

        case 'Офисные светильники':
            $curr->name = 'Офисные<br> светильники'; break;




    }

    ?>

      <li <?  if ($category->category_id == $curr->category_id){ ?> class='currentli'  <? } ?>  <? if ($curr->name=='Главная') echo 'style="display:none"'   ?>">
            <?  if ($category->category_id == $curr->category_id){ ?>
            <a class='current' href = "<?php print $curr->category_link?>"><?php print $curr->name?>
                <? } else { ?>
             <a  href = "<?php print $curr->category_link?>"><?php print $curr->name?>
               <? }  ?>

            </a>
      </li>
  <?php
  }
?>


