<?php
defined('_JEXEC') or die;

// Note. It is important to remove spaces between elements.
?>
<?php // The menu class is deprecated. Use nav instead. ?>
<nav class="nav">

    <ul>

        <h3>О магазине</h3>



    <?php
    foreach ($list as $i => &$item)
    {

        $current = FALSE;

        if ($item->id == $active_id)
        {
            $current = TRUE;
        }


        echo '<li>';

        if($current) {
            echo "<a class='current' href='".$item->flink."'>".$item->title."</a>";
        }
        else {
            echo "<a href='".$item->flink."'>".$item->title."</a>";
        }

        echo '</li>';
    }
    ?>

</ul>
    </nav>
