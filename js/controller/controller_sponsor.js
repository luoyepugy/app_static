/**
 * 发起活动
 */

angular.module('sponsor', ["directive_mml","activity_servrt","ui.router", "common"])
.controller('promotional_act_controller',function($scope,activity_data,$location,$stateParams,act_date,$state,httpService) { //发起活动
	
	var parameter_p={};
/*	var kmh=$.parseJSON(localStorage.input_f)
	input_val(kmh.activity)*/
	$scope.promotional={"initiate":function(parameter_p){
		 localStorage.input_f=JSON.stringify(da_input(2))
		 var kmh=$.parseJSON(localStorage.input_f)
		var poiy=da_input(1);
		if(poiy==undefined){ 
			return
		}
		activity_data.simple_create_activity(poiy).then(
	    		function success(data){
	    			 $(".sys-loading").removeClass("show_a")
	    			if(data.code==-10){
	    				 $location.path("signin");
	    				 mui.alert(data.msg, 'E场景活动');
						return;
	    			}
	    			if(data.code!=0){
	    				mui.alert(data.msg, 'E场景活动');
						return;
	    			}
	    			 $location.path("/activity_detail/"+data.info)
	    		
	    			mui.alert("活动发布成功", 'E场景活动',function(){
	    				
	    			});
	    		}, function error() {
	    			mui.alert('发起活动请求后台失败', 'E场景活动');
	   });
	}}
	
	$("input,textarea").focus(function(){
        $(".mml_bottom").hide()
	 })
	  $("input,textarea").blur(function(){
        $(".mml_bottom").show()
	 })
	 $("#address").on("click",function(e){
	 	 /*阻止触发时间冒泡*/
                 e.preventDefault();
                 e.stopPropagation();
		 localStorage.input_f=JSON.stringify(da_input(2))
		 var kmh=$.parseJSON(localStorage.input_f)
		 console.log(kmh.activity); 
		 $state.go("b_map",{"city":$("#city").val()});
	 })
	 try{
		 var kmh=$.parseJSON(localStorage.input_f)
		 input_val(kmh.activity)
	 }catch(e){
		 
	 }
	 
	 mui("#mySwitch").switch(); //
	 
     $scope.activityBaseSetting=function(){
     	$(".activity_base_setting,.header_mml").hide();
     	$(".activity_more_setting").show();
     }
     $scope.activityMoreSetting=function(){
     	$(".activity_base_setting,.header_mml").show();
     	$(".activity_more_setting").hide()
     }
	 $scope.labelSwitch=function(){
	 	if($(".ddf_pooxd_a").attr("data-x")==1){
	 		$(".ddf_pooxd_a").show();
	 		$(".ddf_pooxd_a").attr("data-x",2)
	 	}else{
	 		$(".ddf_pooxd_a").hide();
	 		$(".ddf_pooxd_a").attr("data-x",1)
	 	}
	 }
	 $scope.select_lab=function(eve){
	 	alert(1)
	 	$(eve).addClass("active")
	 }
	 httpService.getDatas('GET', '/label/group').then(function(data) {//获取活动标签
		$scope.ge_type=data
	});
	 
}).controller('mapCtrl',function($scope,$stateParams) { //地图
	 $("html,body").animate({scrollTop:0},200);
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398,39.897445); 
	var local = new BMap.LocalSearch(map, {
         renderOptions: {map: map, panel: "haha"}
    });
    local.search($stateParams.city);
	map.centerAndZoom(point,12);
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
	
		function showInfo(e){
		var point = new BMap.Point(e.point.lng,e.point.lat);
        	var gc = new BMap.Geocoder();
        	gc.getLocation(point, function(rs){
        	  var addComp = rs.addressComponents;
        $(".orientation input").val(rs.addressComponents.district+rs.addressComponents.street+rs.addressComponents.streetNumber)
        	  
        	});
	}
	map.addEventListener("click", showInfo);
	
	 $(".orientation input").keyup(function(){
		    local.search($stateParams.city+$(this).val()); 
	 })
	 $(".ssd_ssdfg").on("click",function(){
		  var kmh=$.parseJSON(localStorage.input_f)
		  kmh.activity.address=$(".orientation input").val()
		  localStorage.input_f=JSON.stringify(kmh)
		  window.history.back();
	 })
	 
	
})
// =================== 发布赞助 begin by zh =================
.controller('sponsorship_controller',function($scope,messageService,validateService,httpService,$state) { //发起赞助
	$scope.repayForm = false;
	$scope.repayWaiting = false;
	// 回报列表
	$scope.repayList = [];
	// 选择回报方式
	$scope.repayType = [{'text': '冠名'}, {'text': '广告位'},{'text': '媒体'}, {'text': '现场'},{'text': '实物'}, {'text': '指定物品'},{'text': '其他'}];
	// 删除回报
	$scope.deleteRepay = function(index) {
		$scope.repayList.splice(index, 1);
	}

	// 添加回报
	$scope.addRepay = function () {
		if($scope.repayList.length >= 10) {
			messageService.show('最多添加10个赞助回报');
			return false;
		}
		$scope.repayForm = true;
		$('.j-sponsorshipForm').hide();
		history.pushState(0, null, '');
	}

	// 返回按钮优化
	$(document).on('click', '.j-backBtn', function() {
		if($scope.repayForm) {
			$('.j-sponsorshipForm').show();
			$scope.$apply(function() {
				$scope.repayForm = false;
			});
		}
	});

	// 发布赞助表单
	$scope.submitSponsor = function() {
		$scope.repayWaiting = true;
		$('.j-sponsorshipForm').hide();
	}

	// 提交回报表单
	$scope.saveRepayForm = function(datas) {
		if(datas['person_limit'] == '') {
			datas['person_limit'] = 0;
		}
		// 回报数据列表
		$scope.repayList.push(datas);
		$('.j-sponsorshipForm').show();
		$scope.$apply(function() {
			$scope.repayForm = false;
		});
	}
})
// =================== 发布赞助 end =================



/**
 * 验证表单数据和缓存
 * x=1 发起  x=2缓存返回数据
 */
function da_input(x){
	
	var name=$("#name").val(),//活动标题
	start_time=$("#start_time").val(),//开始时间
	end_time=$("#end_time").val(),//结束时间
	start_time_gettime=new Date($("#start_time").val().replace(/-/g,'/')).getTime(),//开始时间
	end_time_gettime=new Date($("#end_time").val().replace(/-/g,'/')).getTime(),//结束时间
	city=$("#city").val(),//城市
	city_id="",//城市id
	address=$("#address").val(),//详细地址
	type=$("#type").val(),//活动类型
	type_id=$("#type").attr("data-id"),
	details=$("#details").val(),//详情
	industry=$("#industry").attr("data-id"),//行业id
	industry_val=$("#industry").val(),//行业内容
	contact_way=$("#contact_way").val(),//联系方式
	sponsor=$("#sponsor").val(),//主办方  
	activity={};
	
	activity.name=name;
	activity.start_time=start_time_gettime;
	activity.end_time=end_time_gettime;
	activity.city=$("#city").attr("data-id");
	activity.address=address;
	activity.type=type_id;
	activity.details=details;
	activity.industry=industry_val
	activity.industry_id=industry;
	activity.contact_way=contact_way;
	activity.sponsor=sponsor;
	
	var poiy={};
	if(x==1){
		if(!form_mm.isnull(name)){
			mui.alert('请输入活动标题', 'E场景活动',function(){
				$("#name").focus();
			});
			return
	}
	if(!form_mm.isnull(start_time)){
		mui.alert('请选择活动开始时间', 'E场景活动',function(){
			$("#start_time").click();
		});
		return
	}
	if(!form_mm.isnull(end_time)){
		mui.alert('请选择活动结束时间', 'E场景活动',function(){
			$("#end_time").click();
		});
		return
	}
	
	if(start_time_gettime>end_time_gettime){
		mui.alert('活动结束时 间不能小于开始时间', 'E场景活动',function(){
			$("#end_time").focus();
		});
		return
	}
	if(end_time_gettime<new Date().getTime()){
		mui.alert('活动结束时间不能小余当前时间', 'E场景活动',function(){
			$("#end_time").focus();
		});
		return
	}
	if(!form_mm.isnull(city)){
		mui.alert('请选择活动城市', 'E场景活动',function(){
			$("#city").click();
		});
		return
	}
	if(!form_mm.isnull(address)){
		mui.alert('请输入详细地址', 'E场景活动',function(){
			$("#address").focus();
		});
		return
	}
	
	if(!form_mm.isnull(type)){
		mui.alert('请选择行业', 'E场景活动',function(){
			$("#industry").focus();
		});
		return
	}
	
	
	if(!form_mm.isnull(industry_val)){
		mui.alert('请选择行业', 'E场景活动',function(){
			$("#industry").focus();
		});
		return
	}	
	if(!form_mm.isnull(details)){
		mui.alert('请输入活动详情', 'E场景活动',function(){
			$("#details").focus();
		});
		return
	}	
	if(!form_mm.isnull(contact_way)){
		mui.alert('请输入联系方式', 'E场景活动',function(){
			$("#contact_way").focus();
		});
		return
	}	
	if(!form_mm.isnull(sponsor)){
		mui.alert('请输入主办方', 'E场景活动',function(){
			$("#sponsor").focus();
		});
		return
	}
	 $(".sys-loading").addClass("show_a");
	}else if(x==2){
		activity.s_time=start_time;
		activity.e_time=end_time;
		activity.city_m=city;
		activity.type_m=type;
		
	}
	poiy.activity=activity;
	return poiy
}
function input_val(data){
	$("#name").val(data.name);//活动标题
	$("#start_time").val(data.s_time);//开始时间
	$("#end_time").val(data.e_time);//结束时间
	if(form_mm.isnull($("#start_time").val())){
		$("#start_time").attr("data-id",new Date($("#start_time").val().replace(/-/g,'/')).getTime());//开始时间
	}
	if(form_mm.isnull($("#end_time").val())){
		$("#end_time").attr("data-id",new Date($("#end_time").val().replace(/-/g,'/')).getTime());//结束时间
	}

	$("#city").val(data.city_m);//城市
	if(form_mm.isnull($("#end_time").val())){
		$("#city").attr("data-id",data.city);
	}
	$("#address").val(data.address);//详细地址
	$("#type").val(data.type_m);//活动类型
	
	$("#industry").val(data.industry);
	$("#industry").attr("data-id",data.industry_id);
	if(form_mm.isnull($("#type").val())){
		$("#type").attr("data-id",data.type);
	}
	$("#contact_way").val(data.contact_way)
	
	$("#details").val(data.details);//详情
	$("#sponsor").val(data.sponsor)
}

