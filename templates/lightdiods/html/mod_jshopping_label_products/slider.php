
<div class="owl-carousel"  >


<?


foreach($rows as $product) {




?>

<? if ($product -> product_id == 3) { ?>
    <!-- Слайды карусели -->

        <!-- Слайды создаются с помощью контейнера с классом item, внутри которого помещается содержимое слайда -->
        <div class="item slide1" >
            <div class="row-lg">

                <a href="<?= $product->product_link;  ?>"> <img  src="<?= $product->image;  ?>" alt="<?= htmlspecialchars($product->name);  ?>" ></a>

    <div class="carousel-caption">
                    <a href="<?= $product->product_link;  ?>"><h3><?= htmlspecialchars($product->name);  ?></h3></a>
                    <p><?= $product->short_description;  ?></p>
                    <div class="price"><?= formatprice($product->product_price);  ?> <span class="rouble">g</span></div>
                    <a href="<?= $product->product_link;  ?>" class="btn button&#45;&#45;spec_offer">Спецпредложение</a>

            </div>
            </div>

       </div>
<? } ?>

    <? if ($product -> product_id == 2) { ?>

    <div class="item slide2" >
        <div class="row-lg">

            <a href="<?= $product->product_link;  ?>"> <img  src="<?=  $product->image;    ?>" alt="<?= htmlspecialchars($product->name);  ?>" ></a>

            <div class="carousel-caption">
                <a href="<?= $product->product_link;  ?>"><h3><?= htmlspecialchars($product->name);  ?></h3></a>
                <p><?= $product->short_description;  ?></p>
                <div class="price"><?= formatprice($product->product_price);  ?> <span class="rouble">g</span></div>
                <a href="<?= $product->product_link;  ?>" class="btn button&#45;&#45;spec_offer">Спецпредложение</a>

            </div>
        </div>

    </div>


<? }}?>






    </div>





    <!-- Навигация для карусели -->
    <!-- Кнопка, осуществляющая переход на предыдущий слайд с помощью атрибута data-slide="prev" -->
    <!--<a class="carousel-control left" href="#myCarousel" data-slide="prev">
        <svg class="slider-arrow" width="50" height="50">
            <use xlink:href="#back"/>
        </svg>


    </a>
    <!-- Кнопка, осуществляющая переход на следующий слайд с помощью атрибута data-slide="next" -->
    <!--<a class="carousel-control right" href="#myCarousel" data-slide="next">

        <svg class="slider-arrow" width="50" height="50">
            <use xlink:href="#next"/>
        </svg>
    </a>-->
