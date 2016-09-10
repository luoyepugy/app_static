/**
 * 微信_支付/e币支付
 */
angular.module('pay', ["directive_mml","activity_servrt","ui.router"])
.controller('e_money_pay',["$scope","activity_data","$location","$stateParams","act_date",function($scope,activity_data,$location,$stateParams,act_date) { //收费活动报名
	$scope.act_d=act_date.date;//初始化活动详情数据
	 $(".sys-loading").removeClass("show_a")
	if($scope.act_d==0){
		   window.history.back();   
		   return
	} 
	$scope.pay={"sum":function(type){
		if(type==0){
			 $(".sys-loading").addClass("show_a")
				activity_data.pay_consumption($scope.act_d.date).then(
			    		function success(data){    	
			    			   $(".sys-loading").removeClass("show_a")
			    		    if(data.code!=0){
			    		    	 mui.alert(data.msg, 'E场景活动');
			    		    	 return
			    		    }
			    		 
			    		    var id_p={}
			    		    id_p.id=$scope.act_d.id
			    		    mui.alert("支付成功", 'E场景活动',function(){
			    		    	window.location.href='/index.html#/activity_user/1/'
			    		    });  
			    		}, function error() {
			    			mui.alert('e币支付请求后台失败', 'E场景活动');
			    }); 
		}else if(type==1){
			  onBridgeReady($scope.act_d.date_wx,function(){
	    		   mui.alert('支付成功！', 'E场景活动');
	    	   }) 
		}
			
		
		
	}}
	  
	
}])
