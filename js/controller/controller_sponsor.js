/**
 * 发起活动
 */
require(["common/bootstrap-wysiwyg"],function(){
	$('#details').wysiwyg();
})

var arrLabel=[];
angular.module('sponsor', ["directive_mml","activity_servrt","ui.router", "common"])
.controller('promotional_act_controller',function($scope,activity_data,$location,$stateParams,act_date,$state,httpService,anchorScroll) { //发起活动
	
	var parameter_p={};
/*	var kmh=$.parseJSON(localStorage.input_f)
	input_val(kmh.activity)*/
	try{
		$('#details').wysiwyg();
	}catch (e) {
	}
	
	$scope.promotional={"initiate":function(ty){
		localStorage.input_f=JSON.stringify(da_input(2))
		var kmh=$.parseJSON(localStorage.input_f)
		var poiy=da_input(1);
		if(poiy==undefined){ 
			return;
		}
		
		var jjhg_url='/activity/create_activity'
		poiy.activity.status=ty
		activity_data.simple_create_activity(poiy,jjhg_url).then(
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
	    			
	    		     if(ty==0){
	    		    	 mui.alert("活动发布成功", 'E场景活动',function(){
	 	    				
	 	    			});
	    		    	 $state.go("issue_success",{"id":data.msg,"teile":$("#name").val(),"text":$("#details").text()});
	 	    			 
	    		     }else{ 
	    		    	 window.location.href="/index.html#/activity_detail/"+data.msg
	    		     }

	    		}, function error() {
	    			mui.alert('发起活动请求后台失败', 'E场景活动');
	   });
	}}
	var kppi_a=""
	$scope.rich_text={"blod_a":function($event,ty){ 
		$($event.target).toggleClass("ls"); 
		$(".po_pooi_s").removeClass("show_a");
		if(ty==2){
			if($($event.target).hasClass("ls")){
				$($event.target).find(".po_pooi_s").addClass("show_a");
			}
			kppi_a=$($event.target)
		}
		
	}}
	$(".po_pooi_s p,.po_pooi_s a").on("tap",function(){ 
		$(kppi_a).removeClass("ls")
	})
	
	$("input,textarea").focus(function(){
        $(".mml_bottom").hide()
	 })
	  $("input,textarea").blur(function(){
        $(".mml_bottom").show()
	 })
	 $(".address").on("click",function(e){
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
	 
	  $(".header_mml,.mml_bottom ").on("click",function(e){//页面跳转缓存页面
	 	 /*阻止触发时间冒泡*/
         e.preventDefault();
         e.stopPropagation();
		 localStorage.input_f=JSON.stringify(da_input(2))
		 var kmh=$.parseJSON(localStorage.input_f)
	});
	window.onunload=function(){//页面刷新缓存页面
		 localStorage.input_f=JSON.stringify(da_input(2))
		 var kmh=$.parseJSON(localStorage.input_f)
	}
	  
	 $("#details").on("focus",function(){
		 anchorScroll.toView('#details', true);
		 $(".mml_bottom ").hide()
	 })
	  $("#details").on("blur",function(){
		  $(".mml_bottom ").show()
	  })
	 mui("#mySwitch").switch(); //
	 
     $scope.activityBaseSetting=function(){
     	$(".activity_base_setting").hide();
     	$(".activity_more_setting").show();
     	history.pushState(0, null, '');
     	
     	
     }
   	$(".retreat_icon").on("tap",function(){
     	        $(".activity_more_setting").hide()	
     	        $(".activity_base_setting").show();
     		})
     $scope.activityMoreSetting=function(){
     	var type=$("#type").val();//活动类型
     	var industry_val=$("#industry").val();//行业内容
     	var contact_way=$("#contact_way").val();//联系方式
	     var sponsor=$("#sponsor").val();//主办方  
     	if(!form_mm.isnull(sponsor)){
		mui.alert('请输入主办方', 'E场景活动',function(){
			$("#sponsor").focus();
		});
		return
	    }
     	if(!form_mm.isnull(contact_way)){
		mui.alert('联系电话不能为空', 'E场景活动',function(){
			$("#contact_way").focus();
		});
		return
	}	
	if(!form_mm.tel(contact_way)){
		mui.alert('联系电话格式错误', 'E场景活动',function(){
			$("#contact_way").focus();
		});
		return
	}	
     	if(!form_mm.isnull(type)){
		mui.alert('请选择类型', 'E场景活动',function(){
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

	 httpService.getDatas('GET', '/label/group').then(function(data) {//获取活动标签
		$scope.ge_type=data
	});
	$scope.select_lab=function($event){
		
		var thi=$event.target
			 arrLabel=[]
		 	 $scope.arrLabel_p="";
		 if($(".activitie_label.active").length<5){
		 	$(thi).toggleClass("active");
		 }else{
		 	if($(thi).hasClass('active')){$(thi).removeClass("active");	}
		 	else{
		 		mui.alert('活动标签最多只能选择5个', 'E场景活动',function(){
						});
		 	}
		 				 	
		 }
		 $(".activitie_label").map(function(){
		 	if($(this).hasClass("active")&&arrLabel.length<5){
		 		arrLabel.push($(this).attr("data-y"))
		 		$scope.arrLabel_p+=($(this).text()+"  ")
		 	}
		 }) 
	     if( $scope.arrLabel_p.length>5){
	     	$('.se_label_tip').hide()
	     }else{
	     	$('.se_label_tip').show()
	     }
	}
/*	$("body").on("click",".activitie_label ",function(){
		 arrLabel=[]
		 $scope.arrLabel_p=""
		 if($(".activitie_label.active").length<5){
		 	$(this).toggleClass("active");
		 }else{
		 	$(this).removeClass("active");
		 }
		 $(".activitie_label").map(function(){
		 	if($(this).hasClass("active")&&arrLabel.length<5){
		 		arrLabel.push($(this).attr("data-y"))
		 	}
		 }) 
		 $(arrLabel).map(function(){
		 	$scope.arrLabel_p+=this+"  "
		 })
		
		console.log($scope.arrLabel_p)*/
		 
		/*
		for(var i=0;i<arrLabel.length;i++){
			if($(this).attr("data-y")==arrLabel[i]){
				removeByValue(arrLabel,$(this).attr("data-y"))
				console.log(arrLabel)
				return;
			}
		}
		if(arrLabel.length<5){
			
			$(this).addClass("active");
		    arrLabel.push($(this).attr("data-y"))
		}
	console.log(arrLabel)
	*/
/*	})*/
	 
}).controller('mapCtrl',function($scope,$stateParams,httpService) { //地图
	 $("html,body").animate({scrollTop:0},200);
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var kkj_q="其他"
	var point = new BMap.Point(116.331398,39.897445); 
	var local = new BMap.LocalSearch(map, {
		renderOptions: {map: map, panel: "r-result"}
	}
	
	);
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
        	  local.search($stateParams.city+$(".orientation input").val()+kkj_q); 
        	});
	}
	map.addEventListener("click", showInfo);
	 if($stateParams.city==""){
		 $stateParams.city="深圳市"
	 }
	 $(".orientation input").keyup(function(){
		
		    local.search($stateParams.city+$(this).val()+kkj_q); 
	 })
	 $(".ssd_poi a").on("click",function(){
		 $(".ssd_poi a").removeClass("ls")
		 $(this).addClass("ls")
		 if($(this).index()==0){
			 $("#r-result").hide()
			 $(".ssdouy_s").show()
			 return;
		 }
		 $("#r-result").show()
		 	 $(".ssdouy_s").hide()

		 local.search($stateParams.city+$(".orientation input").val()+$(this).text()); 
		 kkj_q=$(this).text()
	 })
	 $(".ssd_ssdfg").on("click",function(){
		  var kmh=$.parseJSON(localStorage.input_f)
		  kmh.activity.address=$(".orientation input").val()
		  localStorage.input_f=JSON.stringify(kmh)
		  window.history.back();
	 })

	 $("body").on("click","#r-result li",function(){
		 var kjh_a=$stateParams.city.split("市")[0].split("省")[1]
		 var k_adds=$(this).find("div").eq(0).find("div").eq(1).find("span").text();
		 if(k_adds.indexOf("市")>=0){
			 k_adds=k_adds.split("市")[1]
		 }
		 if(k_adds.indexOf("深圳")>=0){
			 k_adds=k_adds.split(kjh_a)[1]
		 }
		 console.log(k_adds);
		 $(".orientation input").val(k_adds)
	 })
	 
	 $scope.addckjh_s=function(add){
		 $("#r-result").hide();
		  local.search(add); 
	 }

	 httpService.getDatas('GET', '/hotel/list?pageIndex=1&pageSize=100').then(function(data) {//获取合作酒店
			$scope.map_jiudian=data.rows
	  });
	 
	
}).controller('issue_successCtrl',function($scope,messageService,validateService,httpService,$state,$stateParams,activity_data) { //活动发布成功
	$scope.act_id=$stateParams.id
	$scope.circle_friends=function(){
		$(".oiuyt_fmnb_as").toggleClass("show_a")
	}
	$scope.sharep_a=new share_p($stateParams.id,$stateParams.teile,$stateParams.text)

	$scope.yqh_po=function(){

    	activity_data.getDatas('get', '/shareImage/get_share_image_url?activityId='+$stateParams.id+"&type=4")
    	.then(function(data) { 
    		wx.previewImage({
			      current: data.msg,
			      urls: [
			        data.msg
			      ]
			    });

    		});
		
	}
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
	address=$(".address").val(),//详细地址
	type=$("#type").val(),//活动类型
	type_id=$("#type").attr("data-id"),
	details=$("#details").html(),//详情
	industry=$("#industry").attr("data-id"),//行业id
	industry_val=$("#industry").val(),//行业内容
	contact_way=$("#contact_way").val(),//联系方式
	sponsor=$("#sponsor").val(),//主办方
	poster_a=$("#re_img").attr("src"),//活动图片
	activity={};
	activity.label=arrLabel.join(",");//活动标签
	activity.poster=poster_a;//活动图片
	activity.name=name;
	activity.start_date=start_time_gettime;
	activity.end_date=end_time_gettime;
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
		if(!form_mm.isnull(poster_a)){
			mui.alert('请上传活动封面', 'E场景活动',function(){
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
			$(".address").focus();
		});
		return
	}
	if(!form_mm.isnull(details)){
		mui.alert('请输入活动详情', 'E场景活动',function(){
			$("#details").focus();
		});
		return
	}
	if(!form_mm.isnull(sponsor)){
		mui.alert('在高级设置中请输入主办方名称', 'E场景活动',function(){
			
		});
		return
	}
	if(!form_mm.isnull(contact_way)){
		mui.alert('在高级设置中请输入联系电话', 'E场景活动',function(){
			
		});
		return
	}
	if(!form_mm.tel(contact_way)){
		mui.alert('联系电话格式错误', 'E场景活动',function(){
			
		});
		return
	}	
		if(!form_mm.isnull(type)){
		mui.alert('在高级设置中请选择活动的类型', 'E场景活动',function(){
			
		});
		return
	}
		if(!form_mm.isnull(industry)){
		mui.alert('在高级设置中请选择活动的行业', 'E场景活动',function(){
			
		});
		return
	}
	
	
	
	
	
	
	 $(".sys-loading").addClass("show_a");
	}else if(x==2){
		activity.s_time=start_time;
		activity.e_time=end_time;
		activity.city_m=city;
		activity.type_m=type;
		activity.poster_a=poster_a;
		activity.activity_label=activity.label;
		
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
	$(".address").val(data.address);//详细地址
	$("#type").val(data.type_m);//活动类型
	
	$("#industry").val(data.industry);
	$("#industry").attr("data-id",data.industry_id);
	if(form_mm.isnull($("#type").val())){
		$("#type").attr("data-id",data.type);
	}
	$("#contact_way").val(data.contact_way)
	
	$("#details").html(data.details);//详情
	$("#sponsor").val(data.sponsor);
	$("#re_img").attr("src",data.poster_a);//活动图片
	
}

