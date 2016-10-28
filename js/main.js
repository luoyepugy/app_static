require.config({
    	'baseUrl': '/js',
    	'urlArgs': new Date().getTime(),//版本号 
    	 shim: { 
    	        'common/jquery.qrcode.min': ['common/jquery-1.11.3.min'],
    	        "common/jquery.lazyload.min": ['common/jquery-1.11.3.min'],
    	        "common/angular.min": ['common/jquery-1.11.3.min'],
    	        "common/pad-iso10126-min": ['common/jquery-1.11.3.min'],
				"mode/methods_jq": ['common/jquery-1.11.3.min'],
				"common/webuploader.min": ['common/jquery-1.11.3.min'],
    	        "controller/controller_viwe":["common/angular.min"],
    	        "mode/directive":["common/angular.min"],
    	        "common/angular-ui-router.min":["common/angular.min"],
    	        "common/angular-animate":["common/angular.min"],
    	        "service/service_activity":["common/angular.min"],
                "router":["common/angular.min"],
                "controller/controller_pay":["common/angular.min"],
                "controller/controller_sponsor":["common/angular.min"],
                "controller/controller_event_details":["common/angular.min"],
				"common/modules":["common/angular.min"],
				"controller/controller_user":["common/angular.min"],
				'controller/controller_activity':["common/angular.min"]
    	    }, 
    	    "waitSeconds": 15 
   
})
var ruuy_ar=["common/jquery-1.11.3.min",
             "common/jquery.qrcode.min",
             "common/angular.min", 
             "common/angular-ui-router.min",
             "common/angular-animate",
             "common/swiper3.07.min",
             "common/aes-min",
             "common/pad-iso10126-min",
             "common/city.data",
             "common/iscroll",
             "common/is_from",
             "common/prism-min",
             "common/jquery.lazyload.min",
             "mode/directive",
             "service/service_activity",
             "entity/entity_phone",
             "router",
             "mode/methods_jq",
             "controller/controller_viwe",
             "controller/controller_pay",
             "controller/controller_sponsor",
             "controller/controller_event_details",
             "common/modules",
             "controller/controller_user",
             "controller/controller_activity"]    	    
require(ruuy_ar,function(){
	angular.bootstrap(document,['ticket_volume_list']); 
});	    
    	    

    	    