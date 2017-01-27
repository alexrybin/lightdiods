//*http://brooksite.ru 14.09.2016 version 3.5.5 a*//
(function(jQuery) {
  "use strict";
  var prod_controller = "index.php?option=com_jshopping&controller=product&task=view";
  var wv_length = jQuery(".type_view.wishlist_view").length;
  var cw_lehgth = jQuery(".type_view.cart_view").length;
  var main_url = mod_ajax_data.data_uri;
  var highlight_wl, sci_length, scip_length, highlight_c, show_qtty, show_qttylist, show_rabatt, clone_mw, csci_length, cscip_length, clone_selector, icok, showef, scb;
  if (wv_length) {
  	highlight_wl = mod_params_wishlist_view.highlight_attr;
	sci_length = mod_params_wishlist_view.show_added_to_cart_icon;
	scip_length = mod_params_wishlist_view.show_added_to_cart_icon_prod;
	icok = mod_params_wishlist_view.iclass_ok;
	showef = mod_params_wishlist_view.show_ef;
	scb = mod_params_wishlist_view.show_quantity_buttons;
  }
  if (cw_lehgth) {
  	highlight_c = mod_params_cart_view.highlight_attr;
  	show_qtty = mod_params_cart_view.show_qtty;
  	show_qttylist = mod_params_cart_view.show_qttylist;
  	show_rabatt = mod_params_cart_view.show_rabatt;
  	clone_mw = mod_params_cart_view.clone_mw;
	csci_length = mod_params_cart_view.show_added_to_cart_icon;
  	cscip_length = mod_params_cart_view.show_added_to_cart_icon_prod;
  	clone_selector = mod_params_cart_view.clone_selector;
	icok = mod_params_cart_view.iclass_ok;
	showef = mod_params_cart_view.show_ef;
	scb = mod_params_cart_view.show_quantity_buttons;
  }
  var controller = mod_ajax_data.data_controller;
  var empty_anim_img = main_url + "/modules/mod_jshopping_cart_wl_ajax/img/cart_ok.png";
  var alc_html = "<div class=\"ajaxloaddingcart_mini\"></div>";
  var smc = jQuery("#system-message-container, #system-message");
  var pf_length = jQuery(".jshop.productfull").length;
  var jpa = jQuery(".jshop_list_product .product .jshop_prod_attributes").length;
  var ajax_target_list, ajax_target_prod;
  if (wv_length && cw_lehgth) {
	  ajax_target_list = ".buttons a.button_buy:not('.modal.large .buttons a.button_buy, .not_ajax .buttons a.button_buy'), a.button_buy:not('.modal.large a.button_buy, .not_ajax a.button_buy'), a.product-button-wishlist, .compare_table a.button_buy";
	  ajax_target_prod = "*[onclick=\"jQuery('#to').val('cart');\"], *[onclick=\"jQuery('#quick-view #to').val('cart');\"], *[onclick=\"jQuery('#to').val('wishlist');\"], *[onclick=\"jQuery('#quick-view #to').val('wishlist');\"]";
  } else if (!wv_length && cw_lehgth) {
	  ajax_target_list = ".buttons a.button_buy:not('.modal.large .buttons a.button_buy, .not_ajax .buttons a.button_buy'), a.button_buy:not('.modal.large a.button_buy, .not_ajax a.button_buy'), .compare_table a.button_buy";
	  ajax_target_prod = "*[onclick=\"jQuery('#to').val('cart');\"], *[onclick=\"jQuery('#quick-view #to').val('cart');\"]";
  } else {
	  ajax_target_list = "a.product-button-wishlist";
	  ajax_target_prod = "*[onclick=\"jQuery('#to').val('wishlist');\"], *[onclick=\"jQuery('#quick-view #to').val('wishlist');\"]";
  }
  var obj_mp, obj_mad, prodid_str_d, str_da, str_def, str_qtty, str_d, str_dd, str_dp, str_dpr, str_dn, str_dq, catid_str_d, lp, lpc, lpe, lpm,  et, ect, text_category, text_delete,
  	  pp = mod_ajax_data.data_pp,
	  pef = mod_ajax_data.data_pef,
	  lps = mod_ajax_data.data_lps,
	  dt = mod_ajax_data.data_dt,
	  dtf = mod_ajax_data.data_dtf,
	  lpcq = mod_ajax_data_cart_view.data_lpc,
	  lpcv = mod_ajax_data_cart_view.data_lpcv,
	  lpwlv = mod_ajax_data_cart_view.data_lpwlv,
	  rel = mod_ajax_data.data_rel,
	  rv = mod_ajax_data.data_rabattv,
	  rtt = mod_ajax_data.data_rabatt,
	  ra = mod_ajax_data.data_rabatta,
	  img_live_path = mod_ajax_data.data_ilp,
	  currcode = mod_ajax_data.data_cc,  
	  bsv = mod_ajax_data.data_bsv,
	  tn = mod_ajax_data.data_dcount,
	  t = mod_ajax_data.data_tseparator,
	  sp=mod_ajax_data.data_sp,
	  dtw = jQuery(".product-button-wishlist").attr("title"),
	  noimage = "noimage.gif";
	  if (mod_ajax_data.data_sp.indexOf("?")!==-1) {
	  	text_category="&category_id=";
	  } else {
		text_category="?category_id="; 
	  }  
	  
  if (bsv === "bs3") {
	  jQuery(".type_view .modal.fade").removeClass("collapse");
  }
  
  function detectTypeView(tv){
	if (jQuery.trim(tv)==="cart_view"){
	obj_mp = mod_params_cart_view;
	obj_mad = mod_ajax_data_cart_view;
	} else if (jQuery.trim(tv)==="wishlist_view") {
	obj_mp = mod_params_wishlist_view;
	obj_mad = mod_ajax_data_wishlist_view;
	}
	if (obj_mad.data_sd.indexOf("?")!==-1) {
		text_delete="&number_id=";
	} else {
		text_delete="?number_id=";
	}
	
  }
  
	function addLang(tv) {
		detectTypeView(tv);
		lp = obj_mad.data_lp;
		lpc = obj_mad.data_lpc;
		lpe = obj_mad.data_lpe;
		lpm = obj_mad.data_lpm;
		et = obj_mad.data_et;
		ect = obj_mad.data_ect;
	}


  function addCloneMW() {
	  jQuery(".clone_mw").remove();
	  jQuery(".cart_view .mycart_wrapp:not('.emptycart')").clone().appendTo(clone_selector).addClass("clone_mw").removeAttr("id");
	  jQuery(".clone_mw .extern_wrap").remove();
  }
  if (clone_mw === "1") {
	  addCloneMW();
  }


  //INPUT CART IMG FOR PRODUCTS AT CART ,window.parent.document
  /*MIDI AND DEFAULT FOR ICONS*/
  function addDataid(jsondata, tv) {
		  //addLang(tv);
		  str_d = "";
		  prodid_str_d = "";
		  if (sci_length === "1" || scip_length === "1" || csci_length === "1" || cscip_length === "1" && !jQuery(".mycart_mini_txt.extern").length) {
			  for (var key in jsondata) {
				  if (key === 'products' && jsondata.hasOwnProperty(key)) {
					  for (var key2 in jsondata[key]) {
						  if (jsondata[key].hasOwnProperty(key2)) {
							  for (var key3 in jsondata[key][key2]) {
								  if (jsondata[key][key2].hasOwnProperty(key3)) {
									  if (key3 === 'product_id') {
										  prodid_str_d = jsondata[key][key2][key3];
									  }
									  if (key3 === 'product_name') {
										  str_d += "<span data-id='" + prodid_str_d + "' class='name'></span>";
									  }
								  }
							  }
						  }
					  }
				  }
			  }
			  jQuery(".prod_data_id").html(str_d);
		  }
	  }
	  /*END MIDI AND DEFAULT FOR ICONS*/

  /*SHOW CART ICONS*/
  function showCartIcons() {
		  jQuery(".atcart").remove();
		  jQuery(".atwl").remove();
		  if (pf_length) {
			  var idProd = parseInt(jQuery("input#product_id").val());
		  }
		  var idObjCv = jQuery(".cart_view [id^='jshop_module_cart_mini_'] span.name").map(function() {
			  return jQuery(this).data("id");
		  });
		  var idObjWlv = jQuery(".wishlist_view [id^='jshop_module_cart_mini_'] span.name").map(function() {
			  return jQuery(this).data("id");
		  });
		  jQuery.each(jQuery.unique(idObjCv), function(k, val) {
			  jQuery(".productitem_" + val + " .button_buy").addClass("fullcart");
			  if (csci_length==="1") {
				  jQuery(".productitem_" + val + " .button_buy").after(" <a rel='tooltip' data-placement='top' class='atcart btn list-btn satci' href='" + jQuery(".cart_view .gotocart a:first").attr('href') + "' title='" + lpcv + ". " + jQuery(".cart_view .gotocart a:first").text() + "'><i class='" + icok + "'></i></a> ");
			  }
			  if (pf_length && cscip_length === "1" && idProd === val) {
				  jQuery("*[onclick=\"jQuery('#to').val('cart');\"]").after(" <a rel='tooltip' data-placement='top' class='atcart btn list-btn satcip' href='" + jQuery(".cart_view .gotocart a:first").attr('href') + "' title='" + lpcv + ". " + jQuery(".cart_view .gotocart a:first").text() + "'><i class='" + icok + "'></i></a> ");
			  }
		  });
		  jQuery.each(jQuery.unique(idObjWlv), function(i, val) {
			  jQuery(".productitem_" + val + " .product-button-wishlist").addClass("fullcart");
			  if (sci_length==="1") {
				  jQuery(".productitem_" + val + " .product-button-wishlist").after(" <a rel='tooltip' data-placement='top' class='atwl btn list-btn' href='" + jQuery(".wishlist_view .gotocart a:first").attr('href') + "' title='" + lpwlv + ". " + jQuery(".wishlist_view .gotocart a:first").text() + "'><i class='" + icok + "'></i></a> ");
			  }
			  if (pf_length && scip_length==="1" && idProd === val) {
				  jQuery("*[onclick=\"jQuery('#to').val('wishlist');\"]").after(" <a rel='tooltip' data-placement='top' class='atwl btn list-btn' href='" + jQuery(".wishlist_view .gotocart a:first").attr('href') + "' title='" + lpwlv + ". " + jQuery(".wishlist_view .gotocart a:first").text() + "'><i class='" + icok + "'></i></a> ");
			  }
		  });
	  }
	  //END INPUT CART IMG FOR PRODUCTS AT CART ,window.parent.document

  /*SHOW CART QTTY*/
  function showCartQtty() {
		  var qttysel;
		  jQuery(".qttyobj").remove();
		  if (pf_length) {
			  var idProd = parseInt(jQuery("input#product_id").val());
		  }
		  var idObjCv = jQuery(".cart_view [id^='jshop_module_cart_mini_'] span.name").map(function() {
			  return jQuery(this).data("id");
		  });
		  jQuery.each(jQuery.unique(idObjCv), function(k, val) {
			  var sum = 0;
			  var qttyObjCv = jQuery(".cart_view [id^='jshop_module_cart_mini_'] span.name").map(function() {
				  return jQuery(this).data("qtty-" + val);
			  });
			  jQuery.each(qttyObjCv, function(k, val) {
				  sum += parseInt(this) || 0;
			  });
			  if (show_qttylist === "1") {
				  if (csci_length === "1") {
					  qttysel = ".satci";
				  } else {
					  qttysel = ".button_buy";
				  }
				  jQuery(".productitem_" + val + " " + qttysel).after(" <a rel='tooltip' data-placement='top' class='atcart btn list-btn qttyobj' href='" + jQuery(".cart_view .gotocart a:first").attr('href') + "' title='" + lpcq + ". " + jQuery(".cart_view .gotocart a:first").text() + "'>" + sum + "</a> ");
			  }
			  if (pf_length && show_qtty === "1" && idProd === val) {
				  if (cscip_length==="1") {
					  qttysel = ".satcip";
				  } else {
					  qttysel = "*[onclick=\"jQuery('#to').val('cart');\"]";
				  }
				  jQuery(qttysel).after(" <a rel='tooltip' data-placement='top' class='atcart btn list-btn qttyobj' href='" + jQuery(".cart_view .gotocart a:first").attr('href') + "' title='" + lpcq + ". " + jQuery(".cart_view .gotocart a:first").text() + "'>" + sum + "</a> ");
			  }
		  });
	  }
	  //END SHOW QTTY

  /***SHOW MODAL WINDOW OR TEXT (SUCCESS)***/
  function modalText(tv) {
	  jQuery("." + tv + ".modal_header").text(jQuery("." + tv + ".modal_header").data("header"));
	  jQuery("." + tv + ".modal_pretext").text(jQuery("." + tv + ".modal_pretext").data("modal-text"));
	  jQuery("." + tv + ".modal_summ_text").text(jQuery("." + tv + ".modal_summ_text").data("modal-summ-text"));
	  jQuery("." + tv + ".closeDOMWindow").text(jQuery("." + tv + ".closeDOMWindow").data("modal-close-btn"));
	  jQuery("." + tv + ".modal_delete").text(jQuery("." + tv + ".modal_delete").data("delete"));
  }

  function showModalDomWindow(tv, defaultDOMWindow, inlineContent_minicart_, height, width) {
	  jQuery.openDOMWindow({
		  anchoredClassName: defaultDOMWindow,
		  windowSourceID: inlineContent_minicart_ + tv,
		  height: height,
		  width: width,
		  overlayOpacity: 5,
		  windowBGColor: "#fff",
		  borderColor: "#555555"
	  });
  }

  function showModalText(jsondata, tv, et) {
		  modalText(tv);
		  if (obj_mp.show_added_to_cart==="1") {
			  if (jQuery(".prod_buttons").length) {
				  et.parents(".prod_buttons").prepend("<span class='was_added_to_cart'>" + lp + "</span>");
			  } else {
				  et.parent("div").prepend("<span class='was_added_to_cart'>" + lp + "</span>");
			  }
			  setTimeout(function() {
				  jQuery('.was_added_to_cart').fadeOut(3000);
			  }, 1000);
		  } else if (obj_mp.show_added_to_cart==="2") {
			  jQuery(".modal_quantity").html(jsondata.count_product);
			  jQuery(".modal_summ").html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);

			  if (obj_mp.modal_type==="2") {
				  jQuery("#inlineContent_minicart_" + tv).modal();
			  } else {
				  showModalDomWindow(tv, "defaultDOMWindow", "#inlineContent_minicart_", 160, 350);
				  jQuery(".modal.dop .modal_to_cart, .modal.dop .modal_checkout, .modal.dop .modal_text").removeClass("dnone");
			  }
		  }
		  setTimeout(function() {
			  jQuery('a').removeClass('was_clicked');
		  }, 3500);
		  if (sci_length === "1" || scip_length === "1" || csci_length === "1" || cscip_length === "1") {
			  showCartIcons();
		  }
		  if (show_qtty === "1" || show_qttylist === "1") {
			  showCartQtty();
		  }
	  }
	  /***END SHOW MODAL WINDOW OR TEXT (SUCCESS)***/

  /***SHOW MODAL WINDOW DOP(SUCCESS)***/
  function showModalDop(jsondata, tv, et) {
		  str_d = "";
		  addExternArray(jsondata, tv);
		  if (obj_mp.modal_dop==="1") {
			  defLayout(jsondata, tv);
			  midrLayout(jsondata, tv);
			  midlLayout(jsondata, tv);
			  extLayout(jsondata, tv);
		  }
		  jQuery("." + tv + ".modal-bottom").html(str_d);
		  jQuery(".modal.dop").css({
			  'max-height': function() {
				  return (jQuery(window).height() * 0.80) + 'px';
			  },
			  'overflow-y': 'auto'
		  });
		  jQuery(".modal_to_cart, .modal_checkout, .modal_text").removeClass("dnone");
	  }
	  /***END SHOW MODAL WINDOW DOP (SUCCESS)***/

  /***SHOW MODAL WINDOW OR TEXT (ERROR)***/
  function showModalTextErr(jsondata, tv, et) {
	  		//addLang(tv);
		  modalText(tv);
		  jQuery(".ajaxloaddingcart_mini").remove();
		  jQuery.each(jsondata, function(i, item) {
			  jQuery(".modal_err").html(item.message);
		  });
		  if (obj_mp.modal_type==="2") {
			  jQuery("#error_inlineContent_minicart_" + tv).modal();
		  } else {
			  showModalDomWindow(tv, "errorDOMWindow", "#error_inlineContent_minicart_", 160, 350);
		  }
	  }
	  /***END SHOW MODAL WINDOW OR TEXT (ERROR)***/

  /***SHOW MODAL WINDOW OR TEXT (ERROR) FOR LIST***/
  function showModalTextErrList(jsondata, tv, et, href, pid) {
	  		//addLang(tv);
		  var ermsg = "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b", ercode_101=101, ercode_102=102;
		  if (obj_mp.modal_type==="2") { //Bootstrap
			  jQuery.each(jsondata, function(i, item) {

				  if ((item.message === ermsg || item.code === ercode_101 || item.code === ercode_102) && jpa) {
					  et.popover({
						  placement: 'top',
						  html: true,
						  selector: et.parents(".attrib"),
						  content: item.message + "<span style='cursor:pointer; padding-left:10px;'>X</span>"
					  }).popover('show');
					  if (jQuery(".productitem_" + pid + " .attrib").is(":hidden")) {
						  jQuery(".productitem_" + pid + " .attrib").show();
					  }
					  jQuery('.popover-content span').css('color', '#ff0000');
					  jQuery('.popover-content span, .attrib').click(function() {
						  et.popover('destroy');
					  });
				  }
				  if (((item.message === ermsg || item.code === ercode_101 || item.code === ercode_102) && !jpa) || ((item.message === ermsg || item.code === ercode_101 || item.code === ercode_102) && jpa && et.is(".dop_products a.button_buy"))) {
					  window.location.assign(href);
				  }
				  if (item.message !== ermsg && item.code !== ercode_101 && item.code !== ercode_102) {
					  jQuery(".modal_err").html(item.message);
					  jQuery("#error_inlineContent_minicart_" + tv).modal();
				  }
			  });
		  } //DOM 
		  else {
			  jQuery.each(jsondata, function(i, item) {
				  if ((item.message === ermsg || item.code === ercode_101 || item.code === ercode_102) && jpa) {
					  jQuery(".modal_err").html(item.message);
					  if (jQuery(".productitem_" + pid + " .attrib").is(":hidden")) {
						  jQuery(".productitem_" + pid + " .attrib").show();
					  }
					  showModalDomWindow(tv, "errorDOMWindow", "#error_inlineContent_minicart_", 100+"%", 350);
				  }
				  if (((item.message === ermsg || item.code === ercode_101 || item.code === ercode_102) && !jpa) || ((item.message === ermsg || item.code === ercode_101 || item.code === ercode_102) && jpa && et.is(".dop_products a.button_buy"))) {
					  window.location.assign(href);
				  }
				  if (item.message !== ermsg && item.code !== ercode_101 && item.code !== ercode_102) {
					  jQuery(".modal_err").html(item.message);
					  showModalDomWindow(tv, "errorDOMWindow", "#error_inlineContent_minicart_", 100+"%", 350);
				  }
			  });
		  }
	  }
	  /***END SHOW MODAL WINDOW OR TEXT (ERROR) FOR LIST***/

  //**//Reload if Cart page**//
  function reloadIfCart(jsondata) {
		  var ermsg = "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b", ercode_101=101, ercode_102=102;
		  jQuery.each(jsondata, function(i, item) {
			  if ((controller === "cart" || controller === "wishlist") && (item.message !== ermsg && item.code !== ercode_101 && item.code !== ercode_102)) {
				  setTimeout(function() {
					  location.reload();
				  }, 1500);
			  }
		  });
	  }
	  //**END Reload if Cart page**//

  //***ADD EXTERN ARRAY***//
  function addExternArray(jsondata, tv) {
		  //addLang(tv);
		  str_d = "";
		  str_da = "";
		  var key, key2, key3, key4, key5;
		  for (key in jsondata) {
			  if (key === 'products' && jsondata.hasOwnProperty(key)) {
				  for (key2 in jsondata[key]) {
					  if (jsondata[key].hasOwnProperty(key2)) {
						  str_d += "<div class='extern_row'>";
						  str_dd = "<span class='delete'><a href='" + obj_mad.data_sd + text_delete + key2 + "&ajax=1'>X" + "</a></span>";
						  for (key3 in jsondata[key][key2]) {

							  if (jsondata[key][key2].hasOwnProperty(key3)) {

								  if (key3 === 'quantity') {
									  if (scb==="1" && tv !== "wishlist_view ") {
										  str_dq = "<span class='qtty'><span class='plus_quantity' data-plus-key='quantity[" + key2 + "]' data-plus-val='" + jsondata[key][key2][key3] + "'>+</span><span class='minus_quantity' data-minus-key='quantity[" + key2 + "]' data-minus-val='" + jsondata[key][key2][key3] + "'>-</span><input type='text' value='" + jsondata[key][key2][key3] + "' class='input_quantity' data-input-key='quantity[" + key2 + "]' data-input-val='" + jsondata[key][key2][key3] + "' /> x </span>";
										  str_qtty = jsondata[key][key2][key3];
									  } else {
										  str_dq = "<span class='qtty'>" + jsondata[key][key2][key3] + " x </span>";
										  str_qtty = jsondata[key][key2][key3];
									  }

								  }
								  if (key3 === 'thumb_image') {
									  if (jsondata[key][key2][key3]) {
										  str_dp = "<span class='pict'><img src='" + img_live_path + "/" + jsondata[key][key2][key3] + "' />" + "</span>";
									  } else {
										  str_dp = "<span class='pict'><img src='" + img_live_path + "/" + noimage + "' />" + "</span>";
									  }
								  }
								  if (key3 === 'category_id') {
									  catid_str_d = jsondata[key][key2][key3];
								  }
								  if (key3 === 'product_id') {
									  prodid_str_d = jsondata[key][key2][key3];
								  }
								  if (key3 === 'product_name') {
									  str_dn = "<span data-id='" + prodid_str_d + "' data-qtty-" + prodid_str_d + "='" + str_qtty + "' class='name'><a href='" + sp + text_category + catid_str_d + "&product_id=" + prodid_str_d + "'>" + jsondata[key][key2][key3] + "</a></span>";
								  }
								  //attr
								  if (key3 === 'attributes_value') {
									  str_da = "";
									  str_da += "<span class='minicart_attr_wrap attr_length_" + jsondata[key][key2][key3].length + "'>" + pp + "<span class='minicart_attr_list'>";
									  for (key4 in jsondata[key][key2][key3]) {
										  if (jsondata[key][key2][key3].hasOwnProperty(key4)) {
											  for (key5 in jsondata[key][key2][key3][key4]) {
												  if (jsondata[key][key2][key3][key4].hasOwnProperty(key5)) {
													  if (key5 === "attr") {
														  str_da += "<span class='minicart_attr_name'>" + jsondata[key][key2][key3][key4][key5] + ":</span>";
													  }
													  if (key5 === "value") {
														  str_da += "<span class='minicart_attr_value'>" + jsondata[key][key2][key3][key4][key5] + "</span>";
													  }
												  }
											  }
											  str_da += "<br/>";
										  }
									  }
									  str_da += "</span></span>";
								  }
								  //end attr
								  //extra_fields
								  if (key3 === 'extra_fields') {
									  str_def = "";
									  if (showef === "1") {
										  if (jsondata[key][key2][key3] != "") {
											  str_def += "<span class='minicart_ef_wrap ef_length_1'>" + pef + "<span class='minicart_ef_list'>";
											  for (key4 in jsondata[key][key2][key3]) {
												  if (jsondata[key][key2][key3].hasOwnProperty(key4)) {
													  for (key5 in jsondata[key][key2][key3][key4]) {
														  if (jsondata[key][key2][key3][key4].hasOwnProperty(key5)) {
															  if (key5 === "name") {
																  str_def += "<span class='minicart_ef_name'>" + jsondata[key][key2][key3][key4][key5] + ":</span>";
															  }
															  if (key5 === "value") {
																  str_def += "<span class='minicart_ef_value'>" + jsondata[key][key2][key3][key4][key5] + "</span>";
															  }
														  }
													  }
													  str_def += "<br/>";
												  }
											  }
											  str_def += "</span></span>";
										  }
									  }
								  }
								  //end extra_fields
								  if (key3 === 'price') {
									  str_dpr = "<span class='summ'>" + accounting.formatNumber(jsondata[key][key2][key3].toFixed(2), tn, t) + " " + currcode + "</span>";
								  }
							  }
						  }
						  str_d += "<div class='desription-top'><div class='pict'>" + str_dp + "</div><div class='desription-top-middle'><div class='name'>" + str_dn + "</div><div class='quantity block'>" + str_dq + "<div class='price'>" + str_dpr + "</div></div></div><div class='delete'>" + str_dd + "</div></div><div class='desription-bottom block'>" + str_da + str_def + "</div></div><div class='clear'></div>";
					  }
				  }
			  }
		  }
	  }
	  //***END ADD EXTERN ARRAY***//

  //***ADD EXTERN TEXT FUNCTION***//
  function addExternText(jsondata, tv) {
		  //addLang(tv);
		  if (jQuery("." + tv + ".mycart_mini_txt.extern.externtwo," + "." + tv + ".mycart_mini_txt.extern.externbootstrap").length) {
			  jQuery("." + tv + "span.externtwo_text").not(jQuery(".min_view." + tv + "span.externbootstrap_text")).html(lpm + " " + jsondata.count_product + " " + lps + " " + accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
			  jQuery("." + tv + "span.externbootstrap_text").not(jQuery(".min_view." + tv + "span.externbootstrap_text")).html(lpm + " " + jsondata.count_product + "<br/> " + lps + " " + accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
			  jQuery(".min_view." + tv + "span.externbootstrap_text").html(jsondata.count_product);
			  jQuery("." + tv + ".mycart_mini_txt.extern.externtwo," + "." + tv + ".mycart_mini_txt.extern.externbootstrap").attr("title", et); 
			  if (show_rabatt === "1" && jsondata.type_cart === "cart") {
				  if (!jQuery(".rabatt-block").length && controller !== "cart") {
					  jQuery(".extern_bottom .total").append("<span class='dblock rabatt-block'><span class='text_summ_rabatt'>" + rv + " - </span><span class='summ_rabatt'>" + (jsondata.rabatt_summ).toFixed(2) + ' ' + currcode + "</span><span class='row-fluid jshop'><span class = 'span12 col-md-12'><input type = 'text' class = 'inputbox rabatt-code' name = 'rabatt-form' value = '' placeholder='" + rtt + "' /><input type = 'button' class = 'button btn list-btn rabatt-submit' value = '" + ra + "' /></span></span></span>");
				  } else {
					  jQuery("span.summ_rabatt").html((jsondata.rabatt_summ).toFixed(2) + " " + currcode);
				  }
			  }
			  jQuery("." + tv + ".mycart_mini_txt.extern.externtwo").attr("title", et);
			  jQuery("." + tv + ".mycart_mini_txt.extern.externbootstrap").attr("title", et);
		  }
	  }
	  //***END ADD EXTERN TEXT FUNCTION***//

  //***DEFAULT LAYOUT FUNCTION**//
  function defLayout(jsondata, tv) {
		  //addLang(tv);
		  if (jQuery("." + tv + ".mycart_mini_txt.default").length) {
			  jQuery("." + tv + ".mycart_mini_txt").attr("title", lpc + " " + jsondata.count_product + " " + lps + " " + accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
		  }
		  if (obj_mp.modal_dop) {
			  jQuery(".modal-body .modal_quantity").html(jsondata.count_product + " ");
			  jQuery(".modal-body .modal_summ").html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
		  }
	  }
	  //***END DEFAULT LAYOUT FUNCTION***//

  //***MIDILEFT LAYOUT FUNCTION***//
  function midlLayout(jsondata, tv) {
		  //addLang(tv);
		  if (jQuery("." + tv + ".mycart_mini_txt.midileft").length) {
			  jQuery("." + tv + "span.midileft_text").html(lpc + " " + jsondata.count_product + " " + lps + "<br/>" + accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
			  jQuery("." + tv + "span.midileft_text," + "." + tv + "span.gotocart").removeClass("empty_cart");

			  jQuery("." + tv + "span.midileft_text", window.parent.document).html(lpc + " " + jsondata.count_product + " " + lps + " " + accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
			  jQuery("." + tv + "span.midileft_text," + "." + tv + "span.gotocart", window.parent.document).removeClass("empty_cart");
		  }
		  if (obj_mp.modal_dop) {
			  jQuery(".modal-body .modal_quantity").html(jsondata.count_product + " ");
			  jQuery(".modal-body .modal_summ").html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
		  }
	  }
	  //***END MIDILEFT LAYOUT FUNCTION***//

  //***MIDIRIGHT LAYOUT FUNCTION***//
  function midrLayout(jsondata, tv) {
		  //addLang(tv);
		  if (jQuery("." + tv + ".mycart_mini_txt.midiright").length) {
			  jQuery("." + tv + "span.midiright_text").html(lpc + " " + jsondata.count_product + " " + lps + "<br/>" + accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
			  jQuery("." + tv + "span.midiright_text," + "." + tv + "span.gotocart").removeClass("empty_cart");
		  }
		  if (obj_mp.modal_dop) {
			  jQuery(".modal-body .modal_quantity").html(jsondata.count_product + " ");
			  jQuery(".modal-body .modal_summ").html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
		  }
	  }
	  //***END MIDIRIGHT LAYOUT FUNCTION***//

  //***EXTERN LAYOUT FUNCTION***//
  function extLayout(jsondata, tv) {
	  //addLang(tv);
	  if (jQuery("." + tv + ".mycart_mini_txt.extern").length) {
		  jQuery(tv + ".extern_row").remove();
		  addExternArray(jsondata, tv);
		  jQuery("." + tv + ".extern_content").html(str_d);
		  jQuery("." + tv + ".extern_wrap .total_qtty," + " ." + tv + " .modal_quantity").html(jsondata.count_product + " ");
		  jQuery("." + tv + ".extern_wrap .summ_total," + " ." + tv + " .modal_summ").html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);

		  jQuery("." + tv + ".extern_wrap .extern_bottom").removeClass("empty_cart");
		  jQuery("." + tv + ".extern_content").removeClass("extern_empty_jq");
	  }
	  if (obj_mp.modal_dop) {
		  jQuery(".modal-body .modal_quantity").html(jsondata.count_product + " ");
		  jQuery(".modal-body .modal_summ").html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
	  }
	  jQuery("." + tv + "span.delete a").attr("title", dt);
  }

  function showAttrValuesBuy(pid) {
	  var ssb = jQuery('.productitem_' + pid + ' .jshop_prod_attributes select, .productitem_' + pid + ' .jshop_prod_attributes input:radio').serializeArray();
	  jQuery(".attr_link_buy").empty();
	  jQuery.each(ssb, function(i, field) {
		  var bb = field.name.split("-")[1],
			  cn;
		  if (bb === null || bb === undefined) {
			  cn = field.name;
		  } else {
			  cn = bb;
		  }
		  jQuery(".attr_link_buy").append("&" + cn + "=" + field.value);
	  });
  }

  function animateBuy(pid, et, tv) {
	  var imgProduct, et_new = et;
	  if (jQuery(".jshop_list_product").length && jQuery(".image_block img").length) {
		  imgProduct = jQuery(".productitem_" + pid + " .image_block img").not(".product_label img").attr("src");
	  }
	  if (jQuery(".productfull").length) {
		  imgProduct = jQuery("img[id^='main_image_']").eq(0).attr("src");
		  if (jQuery(".productfull.rp-brooksite").length) {
			  et_new = et.parent();
		  }
	  }
	  if (et_new.parents(".dop_products").length) {
		  et_new = et;
		  imgProduct = et_new.parents(".dop_products .modopprod_item, .dop_products .item").not(".dop_products.vertical .modopprod_item").find("a img").attr("src");
	  }
	  var ine = jQuery("." + tv),
		  outepos = et_new.offset(),
		  oute_top = outepos.top,
		  oute_left = outepos.left,
		  inepos = ine.offset(),
		  ine_left = inepos.left,
		  ine_top = inepos.top;
	  if (imgProduct !== undefined) {
		  jQuery("body").append("<img class='new-clone-img' src='" + imgProduct + "'/>");
	  } else {
		  jQuery("body").append("<img class='new-clone-img' src='" + empty_anim_img + "'/>");
	  }
	  jQuery(".new-clone-img").css({
		  "position": "absolute",
		  "z-index": "9999",
		  "max-width": 75,
		  "max-height": 75,
		  "top": oute_top - 20 + "px",
		  "left": oute_left + "px"
	  }).stop(true, true).animate({
		  opacity: 0.6,
		  top: ine_top,
		  left: ine_left,
		  width: 0,
		  height: 0
	  }, 1000, function() {
		  jQuery(".new-clone-img").remove();
	  });
  }

  //*****LIST PRODUCTS***********************************************************************************************************//
  jQuery("body").on("click", ajax_target_list, function(e) {
	  e.preventDefault();
	  var et, pid, tv, product_link;
	  var jQthis=jQuery(this);
	  if (jQuery(e.target).is("[class*='icon-']") || jQuery(e.target).is("span")) {
		  et = jQuery(e.target).parents("a");
	  } else {
		  et = jQuery(e.target);
	  }
	  var href = jQthis.attr('href');
	  if (et.is(".buttons a.button_buy, a.button_buy, a.button_buy i")) {
		  tv = "cart_view ";
		  if (jQuery(".list_product input.product_plus, .list_product input.product_minus, .list_product input[name^='quantity']").length) {
			  pid = jQthis.attr("id").split("productlink")[1];
		  } else {
			  pid = parseInt(href.split('product_id=')[1]);
		  }
		  if (jQuery(".productitem_" + pid + " .attrib").is(":hidden")) {
			  jQuery(document).ajaxStop(function() {
				  jQuery(".productitem_" + pid + " .attrib").show();
			  });
		  }

	  }
	  if (et.is("a.product-button-wishlist, a.product-button-wishlist i")) {
		  tv = "wishlist_view ";
		  pid = parseInt(href.split('product_id=')[1]);
	  }
	  if (jQuery(".productitem_" + pid + " " + ".name a").length) {
		  product_link = jQuery(".productitem_" + pid + " " + ".name a").attr("href");
	  } else {
		  product_link = sp + "?" + href.split("?")[1];
	  }
	  var attrdiv = jQuery(".productitem_" + pid + " " + "div.attrib");
	  jQthis.addClass('was_clicked');
	  smc.remove();

	  ///GET ATTRIBUTES FOR PRODUCT LIST
	  if (jpa) {
		  et.append("<div class='attr_link_buy' style='display:none'></div>");

		  jQuery('.productitem_' + pid + ' .jshop_prod_attributes select, .productitem_' + pid + ' .jshop_prod_attributes input:radio').change(showAttrValuesBuy(pid));
		  showAttrValuesBuy(pid);
	  }
	  ///END GET ATTRIBUTES
	  jQuery("." + tv + ".mycart_mini_txt").append(alc_html);
	  jQuery(this).css("position", "relative").append(alc_html);
	  addLang(tv);
	  jQuery.ajax({
		  cache: false,
		  url: href + jQuery(".attr_link_buy").text() + "&ajax=1",
		  dataType: 'json',
		  success: function(jsondata) {
			  jQuery(".ajaxloaddingcart_mini").remove();
			  jQuery(".mycart_wrapp").removeClass("emptycart");
			  if (jsondata.type_cart === "cart" || jsondata.type_cart === "wishlist") {
				  jQuery("." + tv + ".mycart_mini_txt a").html(jsondata.count_product);

				  /*DEFAULT LAYOUT*/
				  defLayout(jsondata, tv);
				  /*END DEFAULT LAYOUT*/

				  /*MIDILEFT LAYOUT and EXTERN TWO*/
				  midlLayout(jsondata, tv);
				  /*END MIDILEFT LAYOUT*/

				  /*MIDIRIGHT LAYOUT*/
				  midrLayout(jsondata, tv);
				  /*END MIDIRIGHT LAYOUT*/

				  /*EXTERN*/

				  /*EXTERNTWO EXTERNBOOTSTRAP*/
				  addExternText(jsondata, tv);
				  /*EXTERNTWO END*/

				  /*MIDI AND DEFAULT FOR ICONS*/
				  addDataid(jsondata, tv);
				  /*END MIDI AND DEFAULT FOR ICONS*/

				  //***EXTERN LAYOUT***//
				  extLayout(jsondata, tv);
				  //***END EXTERN LAYOUT***//

				  //**ADD_CLONE**//
				  if (clone_mw === "1") {
					  jQuery(".mycart_wrapp").removeClass("emptycart");
					  addCloneMW();
				  }

				  /*END EXTERN*/
				  //*SUCCESS MODAL OR TEXT OR ANIM*//
				  showModalText(jsondata, tv, et);
				  showModalDop(jsondata, tv, et);
				  if (obj_mp.show_added_to_cart==="3") {
					  animateBuy(pid, et, tv);
				  }
				  //*END SUCCESS MODAL OR TEXT OR ANIM*//
			  } else {
				  showModalTextErrList(jsondata, tv, et, href, pid);
			  }
			  //Reload if Cart page
			  reloadIfCart(jsondata, href);
		  },
		  error: function(jsondata) {
			  //*ERROR MODAL OR TEXT*//
			  showModalTextErr(jsondata, tv, et);
			  //*END ERROR MODAL OR TEXT*//
		  }
	  });
	  return false;
  });
  //*****END LIST PRODUCTS*****//


  //*****PRODUCT*******************************************************************************************************//
  jQuery("body").on("click", ajax_target_prod, function(e) { //"."+tv+
	  e.preventDefault();
	  var tv, pid;
	  var et = jQuery(e.target);
	  if (et.is("*[onclick=\"jQuery('#to').val('cart');\"]") || et.parent().is("*[onclick=\"jQuery('#to').val('cart');\"]") || et.is("*[onclick=\"jQuery('#quick-view #to').val('cart');\"]") || et.parent().is("*[onclick=\"jQuery('#quick-view #to').val('cart');\"]")) {
		  tv = "cart_view ";
	  }
	  if (et.is("*[onclick=\"jQuery('#to').val('wishlist');\"]") || et.parent().is("*[onclick=\"jQuery('#to').val('wishlist');\"]") || et.is("*[onclick=\"jQuery('#quick-view #to').val('wishlist');\"]") || et.parent().is("*[onclick=\"jQuery('#quick-view #to').val('wishlist');\"]")) {
		  tv = "wishlist_view ";
	  }
	  pid = jQuery("input#product_id").val();

	  if (jQuery('#to').val() === "cart" || jQuery('#to').val() === "wishlist") {
		  var allValue = jQuery('form[name="product"]').serialize();
		  jQuery("." + tv + ".mycart_mini_txt").append(alc_html);
		  jQuery(".productfull .buttons").css("position", "relative").append(alc_html);
		  smc.remove();
		  addLang(tv);
		  jQuery.ajax({
			  cache: false,
			  url: main_url + "index.php?option=com_jshopping&controller=cart&task=add" + "&" + allValue + "&ajax=1",
			  dataType: "json",
			  ifModified: true,
			  success: function(jsondata) {
				  jQuery(".ajaxloaddingcart_mini").remove();
				  jQuery(".mycart_wrapp").removeClass("emptycart");
				  if (jsondata.type_cart === "cart" || jsondata.type_cart === "wishlist") {
					  jQuery("." + tv + ".mycart_mini_txt a").html(jsondata.count_product);
					  jQuery("." + tv + ".mycart_mini_txt a", window.parent.document).html(jsondata.count_product);

					  /*DEFAULT LAYOIT*/
					  defLayout(jsondata, tv);
					  /**END DEFAULT LAYOUT*/

					  /*MIDILEFT LAYOUT*/
					  midlLayout(jsondata, tv);
					  /*END MIDILEFT LAYOUT*/

					  /*MIDIRIGHT LAYOUT*/
					  midrLayout(jsondata, tv);
					  /*END MIDIRIGHT LAYOUT*/

					  /*EXTERNTWO*/

					  addExternText(jsondata, tv);
					  /*EXTERNTWO END*/

					  /*MIDI AND DEFAULT FOR ICONS*/
					  addDataid(jsondata, tv);
					  /*END MIDI AND DEFAULT FOR ICONS*/

					  /*EXTERN LAYOUT*/
					  extLayout(jsondata, tv);
					  /*END EXTERN LAYOUT*/

					  //**ADD_CLONE**//
					  if (clone_mw === "1") {
						  jQuery(".mycart_wrapp").removeClass("emptycart");
						  addCloneMW();
					  }

					  //*SUCCESS MODAL OR TEXT OR ANIM*//
					  showModalText(jsondata, tv, et);
					  showModalDop(jsondata, tv, et);
					  if (obj_mp.show_added_to_cart==="3") {
						  animateBuy(pid, et, tv);
					  }
					  //*END SUCCESS MODAL OR TEXT OR ANIM*//

				  } else {
					  //*ERROR MODAL OR TEXT*//
					  showModalTextErr(jsondata, tv, et);
					  //*END ERROR MODAL OR TEXT*//
				  }

			  },
			  error: function() {
				  jQuery(".ajaxloaddingcart_mini").remove();
				  location.reload();
			  }
		  });
		  return false;
	  }
  });
  //*****END PRODUCT*****//

  //*****EXTERN DELETE****** http://jshopping/index.php?option=com_jshopping&controller=cart&task=delete&number_id=//
  jQuery("body").on("click", ".extern_row .delete a", function(e) { //"."+tv+
	  e.preventDefault();
	  var jQthis=jQuery(this);
	  var tv = jQthis.parents(".type_view").data("cart-view");
	  var hrefdel = jQthis.attr("href");
	  jQthis.append('<div class="ajaxloaddingcart_mini" style="left:-20px; top:0px;"></div>');
	  //ajax
	  addLang(tv);
	  jQuery.ajax({
		  cache: false,
		  url: hrefdel + "&ajax=1",
		  dataType: 'json',
		  success: function(jsondata) {
			  jQuery(".ajaxloaddingcart_mini").remove();
			  if (jsondata.type_cart === "cart" || jsondata.type_cart === "wishlist") {
				  jQuery(".modal.dop .modal_header").text(dtf);
				  jQuery("." + tv + ".mycart_mini_txt a").html(jsondata.count_product);
				  jQuery("." + tv + ".mycart_mini_txt a", window.parent.document).html(jsondata.count_product);
				  jQuery(".list-btn.button_buy").removeClass("fullcart");

				  /*EXTERNTWO*/
				  addExternText(jsondata, tv);
				  showModalDop(jsondata, tv, et);
				  /*EXTERNTWO END*/
				  addExternArray(jsondata, tv);

				  jQuery("." + tv + ".extern_content").html(str_d);
				  jQuery("." + tv + ".extern_wrap .total_qtty").html(jsondata.count_product + " ");
				  jQuery("." + tv + "span.delete a").attr("title", dt);
				  if (jsondata.count_product === 0) {
					  jQuery(".modal.dop .modal_header").text(ect);
					  jQuery(".modal.dop .modal_to_cart, .modal.dop .modal_checkout, .modal.dop .modal_text").addClass("dnone");
					  jQuery(".mycart_wrapp").addClass("emptycart");
					  jQuery("." + tv + "span.externtwo_text," + "." + tv + "span.externbootstrap_text").not(jQuery(".min_view." + tv + "span.externbootstrap_text")).html(lpe);
					  jQuery("." + tv + ".mycart_mini_txt.extern.externtwo," + "." + tv + ".mycart_mini_txt.extern.externbootstrap").attr("title", "");
					  jQuery("." + tv + ".extern_wrap .extern_bottom").addClass("empty_cart");
					  jQuery("." + tv + ".extern_content").html("<span class='extern_empty_jq'>" + ect + "</span>");
				  }
				  //modal
				  jQuery(".modal_quantity").html(jsondata.count_product);
				  jQuery(".modal_summ").html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
				  jQuery("." + tv + ".extern_wrap .summ_total").html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
				  if (sci_length === "1" || scip_length === "1" || csci_length === "1" || cscip_length === "1") {
					  showCartIcons();
				  }
				  /*SHOW QTTY at CART*/
				  if (show_qtty === "1" || show_qttylist === "1") {
					  showCartQtty();
				  }
				  /*END SHOW QTTY at CART*/

				  //**ADD_CLONE**//
				  if (clone_mw === "1") {
					  addCloneMW();
				  }

			  } else {
				  //*ERROR MODAL OR TEXT*//
				  showModalTextErr(jsondata, tv);
				  //*END ERROR MODAL OR TEXT*//
			  }
			  //Reload if Cart page
			  if (controller === "cart" || controller === "wishlist") {
				  setTimeout(function() {
					  location.reload();
				  }, 1500);
			  }
		  },
		  error: function() {
			  jQuery(".ajaxloaddingcart_mini").remove();
			  location.reload();
		  }
	  });
	  return false;
  });
  //*****END EXTERN DELETE****//

  //QUANTITY
  jQuery("body").on("click", ".extern_row .minus_quantity", function(e) { //"."+tv+
	  e.preventDefault();
	  var jQthis=jQuery(this);
	  var dpost;
	  var tv = jQthis.parents(".type_view").data("cart-view"),
		  dmk = jQthis.attr("data-minus-key"),
		  dmv = jQthis.attr("data-minus-val"),
		  dmr = parseFloat(dmv) - 1;
	  if (dmr !== 0) {
		  dpost = dmk + "=" + dmr;
	  } else {
		  dpost = dmk + "=" + dmv;
	  }
	  jQthis.append('<div class="ajaxloaddingcart_mini" style="left:-20px; top:5px;"></div>');
	  addLang(tv);
	  //START AJAX QUANTITY
	  jQuery.ajax({
		  cache: false,
		  url: main_url + "index.php?option=com_jshopping&controller=cart&task=refresh" + "&" + dpost + "&ajax=1",
		  dataType: "json",
		  ifModified: true,
		  success: function(jsondata) {
			  jQuery(".ajaxloaddingcart_mini").remove();
			  if (jsondata.type_cart === "cart") {
				  jQuery("." + tv + ".mycart_mini_txt a").html(jsondata.count_product);
				  jQuery("." + tv + ".mycart_mini_txt a", window.parent.document).html(jsondata.count_product);

				  /*EXTERNTWO*/
				  addExternText(jsondata, tv);
				  showModalDop(jsondata, tv, et);
				  /*EXTERNTWO END*/

				  /*EXTERN LAYOUT*/
				  extLayout(jsondata, tv);
				  /*END EXTERN LAYOUT*/

				  /*SHOW QTTY at CART*/
				  if (show_qtty === "1" || show_qttylist === "1") {
					  showCartQtty();
				  }
				  /*END SHOW QTTY at CART*/

				  //**ADD_CLONE**//
				  if (clone_mw === "1") {
					  jQuery(".mycart_wrapp").removeClass("emptycart");
					  addCloneMW();
				  }

			  } else {
				  //*ERROR MODAL OR TEXT*//
				  showModalTextErr(jsondata, tv);
				  //*END ERROR MODAL OR TEXT*//
			  }
			  //Reload if Cart page
			  if (controller === "cart" || controller === "wishlist") {
				  setTimeout(function() {
					  location.reload();
				  }, 1500);
			  }
		  },
		  error: function() {
			  jQuery(".ajaxloaddingcart_mini").remove();
			  location.reload();
		  }
	  });
	  return false;
  });

  jQuery("body").on("click", ".extern_row .plus_quantity", function(e) {
	  e.preventDefault();
	  var jQthis=jQuery(this);
	  var tv = "cart_view ",
		  dpk = jQthis.attr("data-plus-key"),
		  dpv = jQthis.attr("data-plus-val"),
		  dpr = parseFloat(dpv) + 1,
		  dpost = dpk + "=" + dpr;
	  jQthis.append('<div class="ajaxloaddingcart_mini" style="left:-20px; top:0px;"></div>');
	  addLang(tv);
	  //START AJAX QUANTITY
	  jQuery.ajax({
		  cache: false,
		  url: main_url + "index.php?option=com_jshopping&controller=cart&task=refresh" + "&" + dpost + "&ajax=1",
		  dataType: "json",
		  ifModified: true,
		  success: function(jsondata) {
			  jQuery(".ajaxloaddingcart_mini").remove();
			  if (jsondata.type_cart === "cart" || jsondata.type_cart === "wishlist") {
				  jQuery("." + tv + ".mycart_mini_txt a").html(jsondata.count_product);
				  jQuery("." + tv + ".mycart_mini_txt a", window.parent.document).html(jsondata.count_product);

				  /*EXTERNTWO*/
				  addExternText(jsondata, tv);
				  showModalDop(jsondata, tv, et);
				  /*EXTERNTWO END*/

				  /*EXTERN LAYOUT*/
				  extLayout(jsondata, tv);
				  /*END EXTERN LAYOUT*/

				  /*SHOW QTTY at CART*/
				  if (show_qtty === "1" || show_qttylist === "1") {
					  showCartQtty();
				  }
				  /*END SHOW QTTY at CART*/

				  //**ADD_CLONE**//
				  if (clone_mw === "1") {
					  jQuery(".mycart_wrapp").removeClass("emptycart");
					  addCloneMW();
				  }

			  } else {
				  //*ERROR MODAL OR TEXT*//
				  showModalTextErr(jsondata, tv);
				  //*END ERROR MODAL OR TEXT*//
			  }
			  //Reload if Cart page
			  if (controller === "cart" || controller === "wishlist") {
				  setTimeout(function() {
					  location.reload();
				  }, 1500);
			  }
		  },
		  error: function() {
			  jQuery(".ajaxloaddingcart_mini").remove();
			  location.reload();
		  }
	  });
	  return false;
  });

  //START INPUT QUANTITY
  jQuery("body").on("keyup", ".extern_row .input_quantity", function(e) { //"."+tv+
	  e.preventDefault();
	  var jQthis=jQuery(this);
	  var tv = jQthis.parents(".type_view").data("cart-view"),
		  dpk = jQthis.attr("data-input-key"),
		  dpv_0 = jQthis.attr("data-input-val"),
		  dpv = jQthis.val();
	  //var dpr=parseInt(dpv);

	  if (dpv!=0) {
		  var dpost = dpk + "=" + dpv;
		  jQthis.parent().append('<div class="ajaxloaddingcart_mini" style="left:0px; top:0px;"></div>');
		  //START AJAX QUANTITY
		  addLang(tv);
		  jQuery.ajax({
			  cache: false,
			  url: main_url + "index.php?option=com_jshopping&controller=cart&task=refresh" + "&" + dpost + "&ajax=1",
			  dataType: "json",
			  ifModified: true,
			  success: function(jsondata) {
				  jQuery(".ajaxloaddingcart_mini").remove();
				  if (jsondata.type_cart === "cart" || jsondata.type_cart === "wishlist") {
					  jQuery("." + tv + ".mycart_mini_txt a").html(jsondata.count_product);
					  jQuery("." + tv + ".mycart_mini_txt a", window.parent.document).html(jsondata.count_product);

					  /*EXTERNTWO*/
					  addExternText(jsondata, tv);
					  showModalDop(jsondata, tv, et);
					  /*EXTERNTWO END*/

					  /*EXTERN LAYOUT*/
					  extLayout(jsondata, tv);
					  /*END EXTERN LAYOUT*/

					  /*SHOW QTTY at CART*/
					  if (show_qtty === "1" || show_qttylist === "1") {
						  showCartQtty();
					  }
					  /*END SHOW QTTY at CART*/

					  //**ADD_CLONE**//
					  if (clone_mw === "1") {
						  jQuery(".mycart_wrapp").removeClass("emptycart");
						  addCloneMW();
					  }

				  } else {
					  //*ERROR MODAL OR TEXT*//
					  showModalTextErr(jsondata, tv);
					  //*END ERROR MODAL OR TEXT*//
				  }
				  //Reload if Cart page
				  if (controller === "cart" || controller === "wishlist") {
					  setTimeout(function() {
						  location.reload();
					  }, 1500);
				  }
			  },
			  error: function() {
				  jQuery(".ajaxloaddingcart_mini").remove();
				  location.reload();
			  }
		  });
		  //return false;
	  } else {
		  return false;
	  }
  });
  //END QUANTITY

  //RABATT FORM (DISCOUNT)
  jQuery("body").on("click", ".rabatt-submit", function(event) {
	  var url_rabatt = main_url + "index.php?option=com_jshopping&controller=cart&task=discountsave&rabatt=" + jQuery("input.rabatt-code").val() + "&ajax=1";
	  var tv = "cart_view ";
	  jQuery("span.total").css("position", "relative").append('<div class="ajaxloaddingcart_mini" style="left:50%;margin-left:-25px !important"></div>');
	  addLang(tv);
	  jQuery.ajax({
		  cache: false,
		  url: url_rabatt,
		  dataType: 'json',
		  success: function(jsondata) {
			  jQuery(".ajaxloaddingcart_mini").remove();
			  if (jsondata.type_cart === "cart") {
				  jQuery("." + tv + ".extern_wrap .summ_total").html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
				  jQuery("." + tv + ".extern_wrap .summ_total", window.parent.document).html(accounting.formatNumber((jsondata.price_product - jsondata.rabatt_summ).toFixed(2), tn, t) + " " + currcode);
				  jQuery("span.summ_rabatt").html(jsondata.rabatt_summ + " " + currcode);
				  addExternText(jsondata, tv);
			  } else {
				  alert(jsondata[0].message);
			  }
		  },
		  error: function() {
			  jQuery(".ajaxloaddingcart_mini").remove();
		  }
	  });
	  event.preventDefault();
  });


  //*CLICK OPEN*//
  jQuery(".cart_view .mycart_mini_txt.extern, .cart_view .down-click").click(function(e) {
	  e.preventDefault();
	  jQuery(".cart_view .extern_wrap").slideToggle("slow");
  });
  jQuery(".wishlist_view .mycart_mini_txt.extern, .wishlist_view .down-click").click(function(e) {
	  e.preventDefault();
	  jQuery(".wishlist_view .extern_wrap").slideToggle("slow");
  });
  jQuery(".mycart_wrapp").on("click", ".minicart_attr_wrap", function(e) {
	  e.preventDefault();
	  jQuery(".minicart_attr_list", this).slideToggle("slow");
  });
  jQuery(".mycart_wrapp").on("click", ".minicart_ef_wrap", function(e) {
	  e.preventDefault();
	  jQuery(".minicart_ef_list", this).slideToggle("slow");
  });

  //****BOOTSTRAP MODAL****//
  if (sci_length === "1" || scip_length === "1" || csci_length === "1" || cscip_length === "1") {
	  showCartIcons();
  }
  if (show_qtty === "1" || show_qttylist === "1") {
	  showCartQtty();
  }

  if ((highlight_wl === "1" || highlight_c === "1") && jQuery('#system-message, .system-message').is(":contains('Пожалуйста выберите параметры')")) {
	  jQuery("div.jshop_prod_attributes").addClass("highlight");
	  jQuery("html,body").scrollTop(jQuery('#system-message, .system-message').offset().top);
  }


  jQuery("body").on("click", ".clone_mw", function(e) {
	  jQuery("html, body").animate({
		  scrollTop: jQuery(".type_view.cart_view:not('.clone_mw')").offset().top
	  }, {
		  complete: function() {
			  jQuery(".cart_view .extern_wrap:not('.clone_mw')").show();
		  }
	  }, 2000);
  });
  
  //jQuery.fn.modal.Constructor.prototype.enforceFocus = function() {};

  if (jQuery(".min_view.cart_view .mycart_wrapp").length) {
	  var c = jQuery(".min_view.cart_view .mycart_wrapp"),
		  ce = jQuery(".min_view.cart_view .extern_wrap"),
		  ceow = ce.outerWidth(),
		  co = c.offset(),
		  cl = co.left,
		  cr = jQuery(window).outerWidth() - cl,
		  cw = c.outerWidth();
	  ce.css({
		  "left": -(ceow / 2 - cw / 2)
	  });
	  if (cl < (ceow / 2 - cw) || cr < (ceow / 2 - cw)) {
		  ce.css({
			  "left": -cl
		  });
	  }
  }

  if (jQuery(".min_view.wishlist_view .mycart_wrapp").length) {
	  var w = jQuery(".min_view.wishlist_view .mycart_wrapp"),
		  we = jQuery(".min_view.wishlist_view .extern_wrap"),
		  weow = we.outerWidth(),
		  wo = w.offset(),
		  wl = wo.left,
		  wr = jQuery(window).outerWidth() - wl,
		  ww = w.outerWidth();
	  we.css({
		  "left": -(weow / 2 - ww / 2)
	  });
	  if (wl < (weow / 2 - ww) || wr < (weow / 2 - ww)) {
		  we.css({
			  "left": -wl
		  });
	  }
  }
})(jQuery);

//******************************************************************************JQ MODAL*************************************//
(function(b){b.fn.closeDOMWindow=function(e){e||(e={});var c=function(a){if(e.anchoredClassName)b("."+e.anchoredClassName).fadeOut("fast",function(){});else{var c=b("#DOMWindowOverlay"),h=b("#DOMWindow");c.fadeOut("fast",function(){c.trigger("unload").unbind().remove()});h.fadeOut("fast",function(){b.fn.draggable&&e.draggable?h.draggable("destroy").trigger("unload").remove():h.trigger("unload").remove()});b(window).unbind("scroll.DOMWindow");b(window).unbind("resize.DOMWindow");b.fn.openDOMWindow.isIE6&&
b("#DOMWindowIE6FixIframe").remove()}e.functionCallOnClose&&e.functionCallAfterClose()};if(e.eventType)return this.each(function(a){b(this).bind(e.eventType,function(){c(this);return!1})});c()};b.closeDOMWindow=function(e){b.fn.closeDOMWindow(e)};b.fn.openDOMWindow=function(e){var c=b.fn.openDOMWindow;c.defaultsSettings={anchoredClassName:"",anchoredSelector:"",borderColor:"#ccc",borderSize:"4",draggable:0,eventType:null,fixedWindowY:100,functionCallOnOpen:null,functionCallOnClose:null,height:500,
loader:0,loaderHeight:0,loaderImagePath:"",loaderWidth:0,modal:0,overlay:1,overlayColor:"#000",overlayOpacity:"85",positionLeft:0,positionTop:0,positionType:"centered",width:500,windowBGColor:"#fff",windowBGImage:null,windowHTTPType:"get",windowPadding:10,windowSource:"inline",windowSourceID:"",windowSourceURL:"",windowSourceAttrURL:"href"};var a=b.extend({},b.fn.openDOMWindow.defaultsSettings,e||{});c.viewPortHeight=function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight};
c.viewPortWidth=function(){return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth};c.scrollOffsetHeight=function(){return self.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop};c.scrollOffsetWidth=function(){return self.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft};c.isIE6="undefined"===typeof document.body.style.maxHeight;var k=function(){var a=b("#DOMWindowOverlay");c.isIE6?a.css({height:document.documentElement.offsetHeight+
document.documentElement.scrollTop-4+"px",width:document.documentElement.offsetWidth-21+"px"}):a.css({height:"100%",width:"100%",position:"fixed"})},h=function(){var a=document.documentElement.offsetHeight+document.documentElement.scrollTop-4,c=document.documentElement.offsetWidth-21;b("#DOMWindowIE6FixIframe").css({height:a+"px",width:c+"px"})},l=function(){var d=b("#DOMWindow");a.height+50>c.viewPortHeight()?d.css("left",Math.round(c.viewPortWidth()/2)+c.scrollOffsetWidth()-Math.round(d.outerWidth()/
2)):(d.css("left",Math.round(c.viewPortWidth()/2)+c.scrollOffsetWidth()-Math.round(d.outerWidth()/2)),d.css("top",Math.round(c.viewPortHeight()/2)+c.scrollOffsetHeight()-Math.round(d.outerHeight()/2)))},q=function(){var a=b("#DOMWindowLoader");c.isIE6?(a.css({left:Math.round(c.viewPortWidth()/2)+c.scrollOffsetWidth()-Math.round(a.innerWidth()/2),position:"absolute"}),a.css({top:Math.round(c.viewPortHeight()/2)+c.scrollOffsetHeight()-Math.round(a.innerHeight()/2),position:"absolute"})):a.css({left:"50%",
top:"50%",position:"fixed"})},m=function(){var d=b("#DOMWindow");d.css("left",a.positionLeft+c.scrollOffsetWidth());d.css("top",+a.positionTop+c.scrollOffsetHeight())},g=function(c){c?(b("."+c+" #DOMWindowLoader").remove(),b("."+c+" #DOMWindowContent").fadeIn("fast",function(){a.functionCallOnOpen&&a.functionCallOnOpen()}),b("."+c+".closeDOMWindow").click(function(){b.closeDOMWindow();return!1})):(b("#DOMWindowLoader").remove(),b("#DOMWindow").fadeIn("fast",function(){a.functionCallOnOpen&&a.functionCallOnOpen()}),
b("#DOMWindow .closeDOMWindow").click(function(){b.closeDOMWindow();return!1}))},n=function(a){var b={};a.replace(/b([^&=]*)=([^&=]*)b/g,function(a,c,d){b[c]="undefined"!=typeof b[c]?b[c]+(","+d):d});return b},p=function(d){a.windowSourceID=b(d).attr("href")||a.windowSourceID;a.windowSourceURL=b(d).attr(a.windowSourceAttrURL)||a.windowSourceURL;a.windowBGImage=a.windowBGImage?"background-image:url("+a.windowBGImage+")":"";var f;if("anchored"==a.positionType)switch(f=b(a.anchoredSelector).position(),
d=f.left+a.positionLeft,f=f.top+a.positionTop,b("body").append('<div class="'+a.anchoredClassName+'" style="'+a.windowBGImage+";background-repeat:no-repeat;padding:"+a.windowPadding+"px;overflow:auto;position:absolute;top:"+f+"px;left:"+d+"px;height:"+a.height+"px;width:"+a.width+"px;background-color:"+a.windowBGColor+";border:"+a.borderSize+"px solid "+a.borderColor+';z-index:10001"><div id="DOMWindowContent" style="display:none"></div></div>'),a.loader&&""!==a.loaderImagePath&&b("."+a.anchoredClassName).append('<div id="DOMWindowLoader" style="width:'+
a.loaderWidth+"px;height:"+a.loaderHeight+'px;"><img src="'+a.loaderImagePath+'" /></div>'),b.fn.draggable&&a.draggable&&b("."+a.anchoredClassName).draggable({cursor:"move"}),a.windowSource){case "inline":b("."+a.anchoredClassName+" #DOMWindowContent").append(b(a.windowSourceID).children());b("."+a.anchoredClassName).unload(function(){b("."+a.windowSourceID).append(b("."+a.anchoredClassName+" #DOMWindowContent").children())});g(a.anchoredClassName);break;case "iframe":b("."+a.anchoredClassName+" #DOMWindowContent").append('<iframe frameborder="0" hspace="0" wspace="0" src="'+
a.windowSourceURL+'" name="DOMWindowIframe'+Math.round(1E3*Math.random())+'" style="width:100%;height:100%;border:none;background-color:#fff;" class="'+a.anchoredClassName+'Iframe" ></iframe>');b("."+a.anchoredClassName+"Iframe").load(g(a.anchoredClassName));break;case "ajax":"post"==a.windowHTTPType?(-1!==a.windowSourceURL.indexOf("?")?(d=a.windowSourceURL.substr(0,a.windowSourceURL.indexOf("?")),f=n(a.windowSourceURL)):(d=a.windowSourceURL,f={}),b("."+a.anchoredClassName+" #DOMWindowContent").load(d,
f,function(){g(a.anchoredClassName)})):(-1==a.windowSourceURL.indexOf("?")&&(a.windowSourceURL+="?"),b("."+a.anchoredClassName+" #DOMWindowContent").load(a.windowSourceURL+"&random="+(new Date).getTime(),function(){g(a.anchoredClassName)}))}else{a.overlay&&(b("body").append('<div id="DOMWindowOverlay" style="z-index:10000;display:none;position:absolute;top:0;left:0;background-color:'+a.overlayColor+";filter:alpha(opacity="+a.overlayOpacity+");-moz-opacity: 0."+a.overlayOpacity+";opacity: 0."+a.overlayOpacity+
';"></div>'),c.isIE6&&(b("body").append('<iframe id="DOMWindowIE6FixIframe"  src="blank.html"  style="width:100%;height:100%;z-index:9999;position:absolute;top:0;left:0;filter:alpha(opacity=0);"></iframe>'),h()),k(),d=b("#DOMWindowOverlay"),d.fadeIn("fast"),a.modal||d.click(function(){b.closeDOMWindow()}));a.loader&&""!==a.loaderImagePath&&(b("body").append('<div id="DOMWindowLoader" style="z-index:10002;width:'+a.loaderWidth+"px;height:"+a.loaderHeight+'px;"><img src="'+a.loaderImagePath+'" /></div>'),
q());b("body").append('<div id="DOMWindow" style="background-repeat:no-repeat;'+a.windowBGImage+";overflow:auto;padding:"+a.windowPadding+"px;display:none;height:"+a.height+"px;width:"+a.width+"px;background-color:"+a.windowBGColor+";border:"+a.borderSize+"px solid "+a.borderColor+'; position:absolute;z-index:10001"></div>');var e=b("#DOMWindow");switch(a.positionType){case "centered":l();a.height+50>c.viewPortHeight()&&e.css("top",a.fixedWindowY+c.scrollOffsetHeight()+"px");break;case "absolute":e.css({top:a.positionTop+
c.scrollOffsetHeight()+"px",left:a.positionLeft+c.scrollOffsetWidth()+"px"});b.fn.draggable&&a.draggable&&e.draggable({cursor:"move"});break;case "fixed":m();break;case "anchoredSingleWindow":f=b(a.anchoredSelector).position(),d=f.left+a.positionLeft,f=f.top+a.positionTop,e.css({top:f+"px",left:d+"px"})}b(window).bind("scroll.DOMWindow",function(){a.overlay&&k();c.isIE6&&h();"centered"==a.positionType&&l();"fixed"==a.positionType&&m()});b(window).bind("resize.DOMWindow",function(){c.isIE6&&h();a.overlay&&
k();"centered"==a.positionType&&l()});switch(a.windowSource){case "inline":e.append(b(a.windowSourceID).children());e.unload(function(){b(a.windowSourceID).append(e.children())});g();break;case "iframe":e.append('<iframe frameborder="0" hspace="0" wspace="0" src="'+a.windowSourceURL+'" name="DOMWindowIframe'+Math.round(1E3*Math.random())+'" style="width:100%;height:100%;border:none;background-color:#fff;" id="DOMWindowIframe" ></iframe>');b("#DOMWindowIframe").load(g());break;case "ajax":"post"==
a.windowHTTPType?(-1!==a.windowSourceURL.indexOf("?")?(d=a.windowSourceURL.substr(0,a.windowSourceURL.indexOf("?")),f=n(a.windowSourceURL)):(d=a.windowSourceURL,f={}),e.load(d,f,function(){g()})):(-1==a.windowSourceURL.indexOf("?")&&(a.windowSourceURL+="?"),e.load(a.windowSourceURL+"&random="+(new Date).getTime(),function(){g()}))}}};if(a.eventType)return this.each(function(c){b(this).bind(a.eventType,function(){p(this);return!1})});p()};b.openDOMWindow=function(e){b.fn.openDOMWindow(e)}})(jQuery);

//*********************ACCOUNTING****************************************//
/*!
 * accounting.js v0.4.2, copyright 2014 Open Exchange Rates, MIT license, http://openexchangerates.github.io/accounting.js
 */
(function(p,z){function q(a){return!!(""===a||a&&a.charCodeAt&&a.substr)}function m(a){return u?u(a):"[object Array]"===v.call(a)}function r(a){return"[object Object]"===v.call(a)}function s(a,b){var d,a=a||{},b=b||{};for(d in b)b.hasOwnProperty(d)&&null==a[d]&&(a[d]=b[d]);return a}function j(a,b,d){var c=[],e,h;if(!a)return c;if(w&&a.map===w)return a.map(b,d);for(e=0,h=a.length;e<h;e++)c[e]=b.call(d,a[e],e,a);return c}function n(a,b){a=Math.round(Math.abs(a));return isNaN(a)?b:a}function x(a){var b=c.settings.currency.format;"function"===typeof a&&(a=a());return q(a)&&a.match("%v")?{pos:a,neg:a.replace("-","").replace("%v","-%v"),zero:a}:!a||!a.pos||!a.pos.match("%v")?!q(b)?b:c.settings.currency.format={pos:b,neg:b.replace("%v","-%v"),zero:b}:a}var c={version:"0.4.1",settings:{currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}}},w=Array.prototype.map,u=Array.isArray,v=Object.prototype.toString,o=c.unformat=c.parse=function(a,b){if(m(a))return j(a,function(a){return o(a,b)});a=a||0;if("number"===typeof a)return a;var b=b||".",c=RegExp("[^0-9-"+b+"]",["g"]),c=parseFloat((""+a).replace(/\((.*)\)/,"-$1").replace(c,"").replace(b,"."));return!isNaN(c)?c:0},y=c.toFixed=function(a,b){var b=n(b,c.settings.number.precision),d=Math.pow(10,b);return(Math.round(c.unformat(a)*d)/d).toFixed(b)},t=c.formatNumber=c.format=function(a,b,d,i){if(m(a))return j(a,function(a){return t(a,b,d,i)});var a=o(a),e=s(r(b)?b:{precision:b,thousand:d,decimal:i},c.settings.number),h=n(e.precision),f=0>a?"-":"",g=parseInt(y(Math.abs(a||0),h),10)+"",l=3<g.length?g.length%3:0;return f+(l?g.substr(0,l)+e.thousand:"")+g.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+e.thousand)+(h?e.decimal+y(Math.abs(a),h).split(".")[1]:"")},A=c.formatMoney=function(a,b,d,i,e,h){if(m(a))return j(a,function(a){return A(a,b,d,i,e,h)});var a=o(a),f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format);return(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal))};c.formatColumn=function(a,b,d,i,e,h){if(!a)return[];var f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format),l=g.pos.indexOf("%s")<g.pos.indexOf("%v")?!0:!1,k=0,a=j(a,function(a){if(m(a))return c.formatColumn(a,f);a=o(a);a=(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal));if(a.length>k)k=a.length;return a});return j(a,function(a){return q(a)&&a.length<k?l?a.replace(f.symbol,f.symbol+Array(k-a.length+1).join(" ")):Array(k-a.length+1).join(" ")+a:a})};if("undefined"!==typeof exports){if("undefined"!==typeof module&&module.exports)exports=module.exports=c;exports.accounting=c}else"function"===typeof define&&define.amd?define([],function(){return c}):(c.noConflict=function(a){return function(){p.accounting=a;c.noConflict=z;return c}}(p.accounting),p.accounting=c)})(this);
