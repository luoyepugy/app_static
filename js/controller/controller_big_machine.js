/**
 * 大机器签到墙展示
 */
	
(function(){
	angular.module('big_machine', ["directive_mml","activity_servrt","ui.router","common", "request","ngWebSocket"])
	 .run(function($rootScope,$location, $state,activity_data){  
			/* 点击喇叭播放音效和改变喇叭状态*/
			var lkj=0
			$rootScope.v_pay=function(){
				  var hint=document.getElementById("player_q");
				  lkj++
				  if(lkj>1){
					  return;
				  }
				  hint.play()//播放
				  var uiiy=setInterval(function(){
					  hint.play()//播放
					  if(lkj++>2){ 
						  clearTimeout(uiiy)
						  lkj=0
					  }
				  },8000)
			      $(".fa-volume-off").addClass("fa-volume-up");
			      setTimeout(function(){//初始化播放喇叭状态
			          $(".fa-volume-off").removeClass("fa-volume-up"); 
			       },240000)
				 
			 }
			var act_id=window.location.search.split("=")[1].split("&")[0];
			$rootScope.type_poo=sessionStorage.type_mkj
		
			$rootScope.acid=act_id
			$rootScope.big_sign={};//签到机数据
			$rootScope.actid=act_id
			 activity_data.getDatas('GET', '/activity/get_activity_ad_urls/'+act_id)
			 .then(function(data) {
				 $rootScope.big_sign.banner=data.info.ad_urls;//获取广告图片
				 if(data.info.ad_urls.length==2){
					 var hhg=$rootScope.big_sign.banner[0]+"?2"
					 $rootScope.big_sign.banner.push(hhg)
				 }  
				 $rootScope.big_sign.act_title=data.info.activity_info.name;//获取活动名称
				 $rootScope.big_sign.sponsor=data.info.activity_info.sponsor;//获取主办名称
				 $rootScope.big_sign.sponsor_image_url=data.info.activity_info.sponsor_image_url;//获取主办方二维码
			 })
	 })
	.controller('big_machine_controller',function($scope,activity_data,messageService,MyData) { //签到机	
		var act_id=window.location.search.split("=")[1].split("&")[0]
		var date_leng=0;//当前签到人数
		function consm(){
			MyData.act_id=act_id
			$scope.MyData = MyData;  
		    MyData.get(); 
		}
		consm()
	      /*广告轮播图初始化*/
		   var mySwiper = new Swiper('.big_switch',{
			   autoplay : 2000,
			   observer: true,//修改swiper自己或子元素时，自动初始化swiper
               observeParents: true,//修改swiper的父元素时，自动初始化swiper
		       loop: true
		    })
	}).controller('big_streaming',function($scope,activity_data,messageService,$http) { //直播	
		var act_id=window.location.search.split("=")[1].split("&")[0]
		var url_src=sessionStorage.url_src
		// 初始化播放器   
	      player = new prismplayer({
	        id: "J_prismPlayer", // 容器id
	        source: data.info.live_url_str.liveurl_m3u8,// 视频地址
	        autoplay: false,    //自动播放：否
	        isLive:true,  //是否是直播
	        width: "100%",       // 播放器宽度
	        height: "600px",      // 播放器高度
	        waterMark:"/img/sylogo.png|TL|0.15|0.5" 
	    });
		
		
		
	 	$http.get('/activityTip/'+act_id+"?pageIndex=1&pageSize="+100).then(function(data) {
	 		 $scope.play_tour=data.data.rows
	 	});
	     $scope.play=function(){
			   player.play(); 
			   $(".syuytrt_as").hide();
		 }
		
	}).controller('draw_lottery_ctr',function($scope,activity_data,messageService,$http) { //抽奖	
		var act_id=window.location.search.split("=")[1].split("&")[0]
		
		
		 activity_data.getDatas('GET', '/draw/get_win_prize?activity_id='+  act_id)
		  .then(function(data) {
			 if(data.code!=0){
				 alert(data.msg)
				 return
			 }
			 $scope.win_prize_data=data.info
		 }); 
	})
	
	
})()

  