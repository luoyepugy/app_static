/**
 * 大机器签到墙展示
 */
	
(function(){
	angular.module('big_machine', ["directive_mml","activity_servrt","ui.router","common", "request"])
	.controller('big_machine_controller',function($scope,activity_data,messageService) { //签到机	
	
		var act_id=window.location.search.split("=")[1],
	     act_consumption_list={};//签到人数传过去的数据	
		 act_consumption_list.activity_id=act_id;
		 act_consumption_list.code_use=2;// 1:未使用 2:已使用
		 act_consumption_list.pageIndex=1;//页码
		 act_consumption_list.pageSize=500;//1页显示多少数据
		 act_consumption_list.sort=1;// 1:根据签到时间倒序排 2，根据报名时间倒序排
		 $scope.big_sign={};//签到机数据
	
		 activity_data.getDatas('GET', '/activity/get_activity_ad_urls/'+act_id)
		 .then(function(data) {
			
			 $scope.big_sign.banner=data.info.ad_urls;//获取广告图片
			 $scope.big_sign.act_title=data.info.activity_info.name;//获取活动名称
			 $scope.big_sign.sponsor=data.info.activity_info.sponsor;//获取主办名称
			 $scope.big_sign.sponsor_image_url=data.info.activity_info.sponsor_image_url;//获取主办方二维码
		 })
		 
		var date_leng=0;//当前签到人数
		function consm(data){
			 activity_data.getDatas('GET', '/consumption/activity_id_by_consumption_list',data)
			 .then(function(data) {
				if(date_leng==data.rows.length){
					return
				}
				if(date_leng!=0&&date_leng<data.rows.length){//当当前数据小余数据库里的数据弹出签到成功
					var device_rooted=document.getElementById("player_p");//播放签到成功音效
			     		device_rooted.play()//播放
			     			mui('#share_pp').popover('toggle'); 
			     		 setTimeout(function(){
			     			 mui('#share_pp').popover('toggle'); 
			     		 },3000)
			 
				}
				 $scope.big_sign.cons_p=[];//初始化签到人数
				 $(data.rows).map(function(){ 
					 var big_user_p=new consumption_list(this);
					 $scope.big_sign.cons_p.push(big_user_p);
				 })
				 date_leng= $scope.big_sign.cons_p.length;//获取当前签到人数
				
			 })
		 }
		 
		/* 点击喇叭播放音效和改变喇叭状态*/
		var lkj=0
		 $scope.v_pay=function(){
			  var hint=document.getElementById("player_q");
			  lkj++
			  if(lkj>1){
				  return;
			  }
			  hint.play()//播放
			  var uiiy=setInterval(function(){
				  hint.play()//播放
				  if(lkj++>1){ 
					  clearTimeout(uiiy)
					  lkj=0
				  }
			  },8000)
		      $(".fa-volume-off").addClass("fa-volume-up");
		      setTimeout(function(){//初始化播放喇叭状态
		          $(".fa-volume-off").removeClass("fa-volume-up"); 
		       },240000)
			 
		 }
		 consm(act_consumption_list)
		  setInterval(function(){//4秒请求后台
			  consm(act_consumption_list)
		  },4000)
		 
	      /*广告轮播图初始化*/
		   var mySwiper = new Swiper('.big_switch',{
			   observer: true,//修改swiper自己或子元素时，自动初始化swiper
               observeParents: true,//修改swiper的父元素时，自动初始化swiper
		       loop: true
		    })
	})

})()

  