<?php // no direct access
defined('_JEXEC') or die('Restricted access'); ?>
<a rel="leanModal" name="login_modal" href="#login_modal" >Вход</a>
</div>
<?php if($type == 'logout') : ?>
<form action="<?php echo JRoute::_('index.php', true, $params->get('usesecure')); ?>" method="post" name="login" id="form-login">
<?php if ($params->get('greeting')) : ?>
    <br/>
	<div>
	<?php if ($params->get('name')) : {
		echo sprintf( _JSHOP_HINAME, $user->get('name') );
	} else : {
		echo sprintf( _JSHOP_HINAME, $user->get('username') );
	} endif; ?>
	</div>
<?php endif; ?>
    <div>
        <a class="my-account" href="<?php echo SEFLink('index.php?option=com_jshopping&controller=user&task=myaccount', 1); ?>"><?php print JText::_('MY_ACCOUNT')?></a>
		<script type="text/javascript">
		jQuery('.page-header__registration').css('display','none');


		</script>

		<a class="logreg" href="#">Выйти</a>



    </div>


	<script type="text/javascript">
	jQuery('.logreg').on('click',function () {
	jQuery('.logout').trigger( "click" );
	})
	</script>

		<input id="logout_reg" type="submit" name="Submit" class="logout" value="<?php /*print JText::_('LOGOUT') */?>" />


	<input type="hidden" name="option" value="com_users" />
	<input type="hidden" name="task" value="user.logout" />
	<input type="hidden" name="return" value="<?php echo $return; ?>" />
    <?php echo JHTML::_( 'form.token' ); ?>
</form>
<?php else : ?>
<?php if(JPluginHelper::isEnabled('authentication', 'openid')) :
		$lang->load( 'plg_authentication_openid', JPATH_ADMINISTRATOR );
		$langScript = 	'var JLanguage = {};'.
						' JLanguage.WHAT_IS_OPENID = \''.JText::_( 'WHAT_IS_OPENID' ).'\';'.
						' JLanguage.LOGIN_WITH_OPENID = \''.JText::_( 'LOGIN_WITH_OPENID' ).'\';'.
						' JLanguage.NORMAL_LOGIN = \''.JText::_( 'NORMAL_LOGIN' ).'\';'.
						' var modlogin = 1;';
		$document = JFactory::getDocument();
		$document->addScriptDeclaration( $langScript );
		JHTML::_('script', 'openid.js');
endif; ?>
	<div id="login_modal">
        <h4>Вход</h4>
<form action="<?php echo JRoute::_( 'index.php', true, $params->get('usesecure')); ?>" method="post" name="login" id="form-login" class="form-inline login-form_wrapper">
	<?php echo $params->get('pretext'); ?>

	<p id="form-login-username" class="login-form_item">
		<label for="modlgn_username"><?php //echo JText::_('USERNAME') ?></label>
		<input id="modlgn_username" type="text" name="username" class="inputbox login-form_inputbox" alt="username" placeholder="  Логин" size="18" />
	</p>
	<p id="form-login-password" class="login-form_item">
		<label for="modlgn_passwd"><?php //echo JText::_('PASSWORD') ?></label>
		<input id="modlgn_passwd" type="password" name="passwd" class="inputbox login-form_inputbox" size="18" placeholder="  Пароль" alt="password" />
	</p>
	<?php if(JPluginHelper::isEnabled('system', 'remember')) : ?>
	<div id="form-login-remember" class="control-group checkbox">
        <label class="control-label remember_me" for="modlgn-remember"><?php echo JText::_('REMEMBER_ME') ?></label>
        <input id="modlgn-remember" class="inputbox" type="checkbox" value="yes" name="remember">
	</div>
	<?php endif; ?>
	<input type="submit" name="Submit" class="button--login button" value="<?php echo 'Вход' /*JText::_('LOGIN')*/ ?>" />

	<div class="login-form_forgot-password">
	    <a  href="<?php echo JRoute::_( 'index.php?option=com_users&view=reset'); ?>"><?php print JText::_('LOST_PASSWORD') ?></a>
    </div>
    <?php /*<div>
	    <a href="<?php echo JRoute::_( 'index.php?option=com_user&view=remind' ); ?>"><?php echo JText::_('FORGOT_YOUR_USERNAME'); ?></a>
    </div> */ ?>
	<?php
	$usersConfig = JComponentHelper::getParams( 'com_users' );
	if ($usersConfig->get('allowUserRegistration')) : ?>
	<div class="login-form_registration">
		<a href="<?php echo SEFLink('index.php?option=com_jshopping&controller=user&task=register', 1); ?>"><?php print JText::_('REGISTRATION') ?></a>
	</div>
	<?php endif; ?>
	<?php echo $params->get('posttext'); ?>

	<input type="hidden" name="option" value="com_jshopping" />
    <input type="hidden" name="controller" value="user" />
	<input type="hidden" name="task" value="loginsave" />
	<input type="hidden" name="return" value="<?php echo $return; ?>" />
	<?php echo JHTML::_( 'form.token' ); ?>
</form>
		<svg class="login-close" width="18" height="18">
			<use  xlink:href="#login_close" />
		</svg>


	</div>
<?php endif; ?>

