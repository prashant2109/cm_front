app.factory('tasAlert', function() {
        var obj = {};
        /*text = 'Sample text'
 	  status = success, error, info or warning
          time = 1000 (in millseconds)*/
        obj.show = function(text, status, time){
                var dom_text = document.querySelector('#alert_section #alert_box .alert_text');
                dom_text.innerHTML = text;
                var dom_box = document.querySelector('#alert_section #alert_box');
                dom_box.setAttribute('class', status);
                var dom = document.querySelector('#alert_section');
                dom.style.display =  'block';
                if(time != '' && time != undefined && !isNaN(Number(time))){
                        time = Number(time);
                        setTimeout(function(){dom.style.display = 'none'}, time);
                }
        }
	obj.hide = function(){
		var dom = document.querySelector('#alert_section');
        	dom.style.display =  'none';
	}
        return obj;
});

