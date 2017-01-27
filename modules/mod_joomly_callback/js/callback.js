var callback_ids = callback_ids || [];
callback_ids.push(callback_module_id);
function callback_validate(element)
{
	var inputs = element.getElementsByClassName("joomly-callback-field"),
		errorMessages = element.getElementsByClassName("callback-error-message");
	for ( var i = errorMessages.length; i > 0; i-- ) {
			errorMessages[ i - 1].parentNode.removeChild( errorMessages[ i - 1] );
			console.log(i);
		}
	
	for (var i = 0; i < inputs.length; i++) {
		if ((inputs[i].hasAttribute("required")) &&(inputs[i].value.length == 0)) { 
			event.preventDefault();	
			parent = inputs[i].parentNode;
			parent.insertAdjacentHTML( "beforeend", "<div class='callback-error-message'>" + 
			   type_field +
				"</div>" );
				console.log("ad" + i)
		}
	}	
}
function joomly_callback_analytics(mod_id){
	if (callback_params[mod_id].yandex_metrika_id)
	{
		var yaCounter= new Ya.Metrika(callback_params[mod_id].yandex_metrika_id);
		yaCounter.reachGoal(callback_params[mod_id].yandex_metrika_goal);
	}
	if (callback_params[mod_id].google_analytics_category)
	{
		ga('send', 'event', callback_params[mod_id].google_analytics_category, callback_params[mod_id].google_analytics_action, callback_params[mod_id].google_analytics_label, callback_params[mod_id].google_analytics_value);
	}
}
function callback_recaptcha(){
	var captchas = document.getElementsByClassName("g-callback-recaptcha");
	for (var i=0; i < captchas.length; i++) {
		var sitekey = captchas[i].getAttribute("data-sitekey");
		if ((captchas[i].innerHTML === "") && (sitekey.length !== 0))
		{
			grecaptcha.render(captchas[i], {
	          'sitekey' : sitekey,
	          'theme' : 'light'
	        });		
		}
	};
}
window.addEventListener('load', function() { callback_recaptcha(); joomly_callback(callback_ids); } , false); 
function joomly_callback(m){	
	m.forEach(function(mod_id, i, arr) {			
		var opener = Array.prototype.slice.call((document.getElementsByClassName("joomly-callback")));
		var slider = document.getElementById('button-joomly-callback-form' + mod_id);
		for (var i=0; i < opener.length; i++) {

			opener[i].onclick = function(){
				
				var lightbox = document.getElementById("joomly-callback"),
					dimmer = document.createElement("div"),
					close = document.getElementById("joomly-callback-close" + mod_id);
				
				dimmer.className = 'dimmer';
				
					dimmer.onclick = function(){
						if (slider)
						{
							slider.classList.toggle('closed');	
						}
						lightbox.parentNode.removeChild(dimmer);			
						lightbox.style.display= 'none';
					}
					
					close.onclick = function(){
						if (slider)
						{
							slider.classList.toggle('closed');	
						}	
						lightbox.parentNode.removeChild(dimmer);			
						lightbox.style.display= 'none';
					}
				
				if (slider)
				{
					slider.classList.toggle('closed');	
				}				
					
				document.body.appendChild(dimmer);
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				lightbox.style.display= 'block';
				if (window.innerHeight > lightbox.offsetHeight )
				{
					lightbox.style.top = scrollTop + (window.innerHeight- lightbox.offsetHeight)/2 + 'px';
				} else
				{
					lightbox.style.top = scrollTop + 10 + 'px';
				}
				if (window.innerWidth>400){
					lightbox.style.width = '400px';
					lightbox.style.left = (window.innerWidth - lightbox.offsetWidth)/2 + 'px';
				} else {
					lightbox.style.width = (window.innerWidth - 70) + 'px';
					lightbox.style.left = (window.innerWidth - lightbox.offsetWidth)/2 + 'px';
				}	
				
				return false;
			}
		}	

		var box_time_today=document.getElementById("time-today" + mod_id);
		if (box_time_today !== null)
		{
			var box_day=document.getElementById("day" + mod_id);
			var box_time_any=document.getElementById("time-any" + mod_id);
			var cur_time=document.getElementById("cur-time" + mod_id);
			box_day.onchange=function (){
				if (box_day.selectedIndex == 0){
					box_time_today.style.display = "inline-block";
					box_time_any.style.display = "none";
					cur_time.value = 0;
				} else{

					box_time_today.style.display = "none";
					box_time_any.style.display = "inline-block";
					cur_time.value = 1;
					console.log(cur_time.value);
				}	
			}
		}
		
		if (callback_sending_flag[mod_id] >= 1){
			var lightbox = document.getElementById("special-alert" + mod_id),
			dimmer = document.createElement("div"),
			close = document.getElementById("callback-alert-close" + mod_id);
			
				dimmer.className = 'dimmer';
			
			dimmer.onclick = function(){
				lightbox.parentNode.removeChild(dimmer);			
				lightbox.style.display= 'none';
			}
			
			close.onclick = function(){
				lightbox.parentNode.removeChild(dimmer);			
				lightbox.style.display= 'none';
			}
				
			document.body.appendChild(dimmer);
			document.body.appendChild(lightbox);
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			lightbox.style.display= 'block';
			if (window.innerHeight > lightbox.offsetHeight )
			{
				lightbox.style.top = scrollTop + (window.innerHeight- lightbox.offsetHeight)/2 + 'px';
			} else
			{
				lightbox.style.top = scrollTop + 10 + 'px';
			}
			if (window.innerWidth>400){
				lightbox.style.width = '400px';
				lightbox.style.left = (window.innerWidth - lightbox.offsetWidth)/2 + 'px';
			} else {
				lightbox.style.width = (window.innerWidth - 70) + 'px';
				lightbox.style.left = (window.innerWidth - lightbox.offsetWidth)/2 + 'px';
			}	
			
			setTimeout(remove_alert, 3000);
			
			function remove_alert()
			{
				if (lightbox.style.display  != "none")
				{
					lightbox.parentNode.removeChild(dimmer);			
					lightbox.style.display = 'none';
				}
			}
		}	
		callback_sending_flag[mod_id] = 0;	
	});	
	callback_ids = [];
}