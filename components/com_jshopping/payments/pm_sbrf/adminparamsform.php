<div class="col100">
	<fieldset class="adminform">
			<legend> Квитанция СБ РФ (ПД-4) v.1.13 от 28.09.2015г.</legend>
		<table width = "100%">
			<tr>
				<td>
				<p> Считаете модуль полезным для себя? Незабудьте отблагодарить автора !</p>
				<p> Благодарность - отличительная черта ответственного человека . Спасибо Вам !</p>	
				</td>
				<td>
				<iframe frameborder="0" allowtransparency="true" scrolling="no" src="https://money.yandex.ru/embed/donate.xml?account=41001744547750&quickpay=donate&payment-type-choice=on&default-sum=79&targets=%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B4%D0%B0%D1%80%D0%BD%D0%BE%D1%81%D1%82%D1%8C+%D0%B7%D0%B0+%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C&target-visibility=on&project-name=&project-site=&button-text=05" width="507" height="104"></iframe>
				</td>				
			</tr>		
	   </table>	
	</fieldset>
	<fieldset class="adminform">
	  <legend> Реквизиты получателя платежа</legend>
		<table class="admintable" width = "100%">
			<tr>
				<td class="key">
					Получатель платежа:
				</td>
				<td>
				<input class="inputbox" name="pm_params[pay_Cname]" size="45" value = "<?php echo $params['pay_Cname']?>"/> <?php echo JHTML::tooltip("Название организации - получателя платежа")?>
				</td>
				<td class="key">
					Счет получателя платежа:
				</td>
				<td>
				<input  class="inputbox" name="pm_params[pay_BAccN]" size="45" value = "<?php echo $params['pay_BAccN']?>"><?php echo JHTML::tooltip("20 цифр"); ?>
				</td>				
			</tr>
			
			<tr>
				<td class="key">
					ИНН:
				</td>
				<td>
					<input class="inputbox" name="pm_params[pay_inn]" size="45"  value = "<?php echo $params['pay_inn']?>"><?php echo JHTML::tooltip("Для юридических лиц — 10 цифр. Для физических лиц — 12 цифр. Оригинальный бланк формы «№ ПД-4» имеет только 10 ячеек для ИНН получателя, хотя эта форма допускает перечисление платежей в пользу физических лиц. Если персонально для Вас нужно расширить ИНН до 12 цифр обращайтесь к автору."); ?>
				</td>
				<td class="key">
					В банке:
				</td>
				<td>
				<input class="inputbox" name="pm_params[pay_Bname]" size="45" value = "<?php echo $params['pay_Bname']; ?>"><?php echo JHTML::tooltip("Полное наименование банка или филиала банка получателя платежа с обязательным указанием его местонахождения. "); ?>
				</td>				
			</tr>
			
			<tr>
				<td class="key">
					КПП:
				</td>
				<td>
				<input class="inputbox" name="pm_params[pay_KppN]" size="45" value = "<?php echo $params['pay_KppN']?>"><?php echo JHTML::tooltip("Код причины постановки на учет в налоговом органе, 9 цифр. Присваивается только юридическим лицам. Необходимость указания КПП обусловлена тем, что в некоторых случаях одного только ИНН бывает недостаточно для идентификации обособленного подразделения организации или предприятия. Пара ИНН+КПП позволяет однозначно идентифицировать каждое обособленное подразделение. Оригинальный бланк формы «№ПД-4» не имеет специального поля для указания КПП, поэтому он будет напечатан справа в графе «наименование получателя платежа»."); ?>
				</td>
				<td class="key">
					БИК:
				</td>
				<td>
				<input  class="inputbox" name="pm_params[pay_BikN]" size="45" value = "<?php echo $params['pay_BikN']?>"><?php echo JHTML::tooltip("Банковский идентификационный код банка получателя платежа из 9 цифр. "); ?>
				</td>
			</tr>

			<tr>
                  <td class="key">
                  <?php echo "Статус заказа";?>:
                   </td>
                  <td>
                  <?php print JHTML::_('select.genericlist', $orders->getAllOrderStatus(), 'pm_params[transaction_end_status]', 'class = "inputbox" size = "1"', 'status_id', 'name', $params['transaction_end_status'] ); ?>
                  </td>
				<td class="key">
					К/сч.:
				</td>
				<td>
				<input class="inputbox" name="pm_params[pay_Kor]" size="45" value = "<?php echo $params['pay_Kor']; ?>"><?php echo JHTML::tooltip("Номер корреспондентского счета банка получателя платежа, открытого им в учреждении Банка России, 20 цифр. Может отсутствовать, например, если банк получателя сам является учреждением Банка России."); ?>
				</td>			
			</tr>

</table>
</fieldset>




<fieldset class="adminform">
<legend> Реквизиты необходимые для отправки копии квитанции по e-mail </legend>
	<table class="admintable" width = "100%">

 <tr>
   <td class="key">
     Отправлять квитанцию покупателю
   </td>
   <td>
     <?php              
     print JHTML::_('select.booleanlist', 'pm_params[copy_buyer]', 'class = "inputbox" ', $params['copy_buyer']);
     echo " ".JHTML::tooltip("Копия квитанции уйдет на адрес покупателя. Если функция отключена, то копия квитанции администратору тоже отправляться не будет.");
     ?>
   </td>
    <td class="key">
     Отправлять квитанцию администратору
   </td>
   <td>
     <?php              
     print JHTML::_('select.booleanlist', 'pm_params[copy_admin]', 'class = "inputbox" ', $params['copy_admin']);
     echo " ".JHTML::tooltip("Копия квитанции уйдет на адрес указанный ниже. Для любителей держать под рукой копии квитанций. Отправляется только при условии включения отправки подкупателю.");
     ?>
   </td>  
  
 </tr>

			
			<tr>
				<td class="key">
					Тема письма
				</td>
				<td>
				<input class="inputbox" name="pm_params[pay_Subj]" size="45" value = "<?php echo $params['pay_Subj']; ?>"><?php echo JHTML::tooltip("Тема письма"); ?>
				</td>
				
				<td class="key">
				e-mail администратора
				</td>
				<td>
				<input type="email" class="inputbox" name="pm_params[admin_mail]" size="45" value = "<?php echo $params['admin_mail']; ?>"><?php echo JHTML::tooltip("e-mail на который нужно направлять копии квитанции."); ?>
				</td>				
				
			</tr>				
			

    </table>
</fieldset>
<fieldset class="adminform">
<legend> Выделение НДС по ставке 18%</legend>
	<table class="admintable" width = "100%">

 <tr>
   <td class="key">
   Выделять НДС
   </td>
   <td>
     <?php              
     print JHTML::_('select.booleanlist', 'pm_params[nds]', 'class = "inputbox" ', $params['nds']);
     echo " ".JHTML::tooltip("Если выбрать 'Да', то в квитанция будет содержать строку ' В том числе НДС :'");
     ?>
   </td>
 
 </tr>
    </table>
</fieldset>

<br>
</div>
<div class="clr"></div>

   	   