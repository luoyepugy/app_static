/**
 * controller
 */


angular.module('ticket_volume_list', [ "directive_mml","activity_servrt","ui.router","pay","sponsor","request","form","user","activity", "common","act_details","router"])
.controller('mode_Controller',function($scope, $rootScope,activity_data, $location, $state) {//公共方法

	/*分类*/   
	$scope.classify=classify_p()
  
	/* 赞助分类*/
	$scope.classification={"title":"行业","maker_title":[{"id":"0","name":"全部"},{"id":"1","name":"孵化器"},{"id":"2","name":"房产"},{"id":"3","name":"互联网"},{"id":"4","name":"公益"},{"id":"5","name":"培训"},{"id":"6","name":"汽车"},{"id":"7","name":"旅游"},{"id":"8","name":"酒店"},{"id":"9","name":"家装"},{"id":"10","name":"卖场"},{"id":"11","name":"明星"},{"id":"12","name":"商会"},{"id":"13","name":"社区"},{"id":"14","name":"展会"},{"id":"15","name":"大健康"},{"id":"16","name":"校园"},{"id":"17","name":"媒体"},{"id":"18","name":"趣味"},{"id":"19","name":"金融"},{"id":"20","name":"其他"}]}
	
	  /* 加密*/
	$scope.decrypt_p={"aesKey":"1234367822345608","ivStr":"1166222233334455","newAesKey":null,"aesEncrypt":function(data, keyStr, ivStr) {//加密
		  var sendData = CryptoJS.enc.Utf8.parse(data);
	        var key = CryptoJS.enc.Utf8.parse(keyStr);
	        var iv  = CryptoJS.enc.Utf8.parse(ivStr);
	        var encrypted = CryptoJS.AES.encrypt(sendData, key,{iv:iv,mode:CryptoJS.mode.CBC});
	        return encrypted.toString();
	    }
	  }
	
	 $(".menu_pup li").on("click",function(){
		 $(".menu_pup,.filiuyt_o ").removeClass("show_a")
	 })
	  $scope.open_p=function (path){
		open(path)
	}

	$scope.city_name=localStorage.city_name==undefined?"深圳":localStorage.city_name.split('市')[0];
			
		
	// 登录判断是否从底部菜单栏点击
    $scope.mySignin = function() {
    	$rootScope.mySignin = true;
    	if(window.localStorage.userLogin) {
    		$state.go('personal_center');
    	} else {
    		$state.go('signin');
    	}
    }


})
	// ===============================  首页 ==============================
	.controller('index_controller',["$scope","activity_data", "$state", function($scope,activity_data, $state) {//首页
	$(".mml_bottom a").removeClass("bottom_act");
	$(".mml_bottom a").eq(0).addClass("bottom_act");
	$(".ds_poiu_a").addClass("show_a")
	$(".retreat_icon").addClass("none")
    var city="";//城市id
	switch($scope.city_name) {
		case "深圳":city=450;break;
		case "广州":city=449;break;
		case "上海":city=3;break;
		case "北京":city=1;break;
	}

	$scope.adLoan = function() {
		$state.go('activity_loan');
		$(".ds_poiu_a").removeClass("show_a");
		$(".retreat_icon").removeClass("none");
	}

	$scope.act_index={
			"banner_index":[],
			"activity_hot":[],
			"activity_sum":{}
	}
	
    var mySwiper = new Swiper('.banner_top_b_banner',{
	             autoplay : 3000,//自动滑动 滚动速度
	             observer: true,//修改swiper自己或子元素时，自动初始化swiper
	             observeParents: true,//修改swiper的父元素时，自动初始化swiper
	             pagination : '.swiper-pagination',//分页器的class的名字
	             paginationClickable :true,//点击标题跳转到指定的那页
	      });
		
    
	/*轮播图*/
    activity_data.banner_index().then(
			function success(data) {
				if(data.code!=0){
					return;
				}
				$(data.info).map(function(){
					if(this.activity_banner_url==null){
						return
					}
					var bandata= new indexbanner(this.activity_id,this.activity_banner_url)
					$scope.act_index.banner_index.push(bandata)
				})
			}, function error() {
				console.log("获取轮播图失败")
	});
	
	  /*热门三条数据*/
    activity_data.activityIndex().then(
			function success(data) {
				$scope.act_index.activity_sum=new activity_sum(data.info);
				$('.datanum').each(function(i,e){
					var o = $(this);
		            var t = 10;
		            var changenum = "" ;
		            if(o.attr('data-param')=='sponsor_sum'){
		            	changenum = $scope.act_index.activity_sum.sum+"" ;
		            }
		            if(o.attr('data-param')=='user_sum'){
		            	changenum = $scope.act_index.activity_sum.count+"" ;
		            }
		            if(o.attr('data-param')=='activity_sum'){
		            	changenum = $scope.act_index.activity_sum.activity_sum+"" ;
		            }
		            console.info(changenum);
		            var val = parseInt(changenum.replace(/,/g,""))/t;
		            console.info("val="+val);
		            var setIntervalId = window.setInterval(function(){
		              if(t--){
		                var v = parseInt(val*(10-t)).toString();
		                var varr = v.split("");
		                for (var i = varr.length-4; i >= 0; i -= 3) varr[i] += ",";
		                o.text(varr.join(""));
		              }
		              else{clearInterval(setIntervalId);}
		            },50);
		           });
				
				
		}, function error() {
			console.log("获取热门活动失败")
	});
	


    /*热门活动*/
    var cty_date={}
    cty_date.city=city;
    cty_date.pageIndex=1;
    cty_date.pageSize=12;
    cty_date.sort=2;
    cty_date.status=0;
    cty_date.isend=0;
    $scope.activity_list=[];
	  /*推荐活动*/
    activity_data.getActivityHot().then(
			function success(data) {
				if(data.code!=0){
					console.log(data.msg)
					return;
				}
				$(data.info).map(function(){
					var hoti=new preferential(this)
					 $scope.act_index.activity_hot.push(hoti)
				})
			    $scope.query_activity(cty_date);//添加热门活动
		}, function error() {
			console.log("获取热门活动失败")
	});
    $scope.load_l=true;//判断热门活动是否还有数据
    $scope.query_activity=function(data){
    	 activity_data.myLaunchActivity(data).then(
 	    		function success(data){
 	    			if(data.code!=0){
 	    				alert(data.msg);
 	    				return 
 	    			}
 	    			$(data.rows).map(function(){
 	    				 var hoti=new preferential(this)
 						 $scope.act_index.activity_hot.push(hoti);
 	    			})
 	    			if(data.rows.length<10){
 	    				 $scope.load_l=false;//判断热门活动是否还有数据
 	    			}
 	    			$(".sys-loading").removeClass("show_a")
 	    		}, function error() {
 					console.log("获取活动列表数据失败");
 	    });
    }
    $scope.Hot_load=function(){//热门活动分页
    	  cty_date.pageIndex++;
    	  $scope.query_activity(cty_date);//添加热门活动
    }


    $(".mml_bottom ").show()
    var sh_a={}
    sh_a.title="【首页】e场景活动"
    sh_a.desc='便捷的活动众筹发布平台、"找活动,上e场景活动平台"'
    sh_a.link="http://m.apptown.cn"
    sh_a.imgUrl="http://m.apptown.cn/img/mml_log.jpg"
    wx_share(sh_a)

    

}]).controller('activities_list',["$scope","activity_data","$stateParams",function($scope,activity_data,$stateParams) {//活动列表
	  $(".mml_bottom ").show()
	$(".mml_bottom a").removeClass("bottom_act");
	$(".mml_bottom a").eq(0).addClass("bottom_act");
	$(".ds_poiu_a").removeClass("show_a")
	$(".retreat_icon").removeClass("none")
	var title_po="创客"
	var tio=parseInt($stateParams.activityTypeId)
	switch(tio){
		case 1:title_po="路演场馆";break
		case 2:title_po="置业装修";break
		case 3:title_po="汽车活动";break
		case 5:title_po="商家促销";break
		
		case 6:title_po="精品课程";break
		case 7:title_po="户外运动";break
		case 9:title_po="保险投资";break
	
		case 0:title_po="全部";break
	}
	$(".sys-loading").addClass("show_a")
	$(".list_activities .box_a").eq(0).find("span").text(title_po)
	
    var list_data={},
    	city_name=localStorage.city_name==undefined?"深圳":localStorage.city_name.split("市")[0];//行数
    	list_data.name="";//活动标题
        list_data.type=tio;//活动类型
    	
    	list_data.freeType="";//收费类型  1免费  2收费
    	list_data.industry_id="";//行业ID
    	list_data.pageIndex=1;//页码
        list_data.pageSize=7;//行数  
        list_data.city_name=city_name
        if(screen.width>1000){
        	list_data.pageSize=12 
        }
        list_data.time_status="";//时间
        list_data.status=0; 
        $scope.act_list={  
    		 "activity_list":[],//初始化活动列表数据
    		 "select_data":[],//初始化活动下拉框数据
    		 "title_p":function(type,ev){
    			   	$(".list_active").addClass("show_a");
    			 	switch(type){
    			 		case 1:$scope.act_list.select_data=$scope.classify[0];break;
    			 		case 2:$scope.act_list.select_data=$scope.classify[1];break;
    			 		case 3:$scope.act_list.select_data=$scope.classify[3];break;
    			 		case 4:$scope.act_list.select_data=$scope.classify[4];break;
    			    }
    			   	$(".dfg_poi").addClass("mui-block")
    		 },
    		 "se_function":function(title,id,name){//下拉框点击方法
    				$(".sys-loading").addClass("show_a")
    				$scope.act_list.activity_list=[];
			 		list_data.pageIndex=1;
			 	  	$(".list_active").removeClass("show_a");
			 		$(".dfg_poi").removeClass("mui-block");
			 		id=id==0?'':id;
			 		switch(title){
    			 		case "分类": list_data.type=id;$(".list_activities .box_a").eq(0).find("span").text(name);break;
    			 		case "行业":list_data.industry_id=id;$(".list_activities .box_a").eq(1).find("span").text(name);break;
    			 		case "时间":list_data.time_status=id;$(".list_activities .box_a").eq(2).find("span").text(name);break;
    			 		case "收费类型":list_data.freeType=id;$(".list_activities .box_a").eq(3).find("span").text(name);break;
			 		}
    				$scope.act_list.act_list_data(list_data);
    		 }, "act_list_data":function(act_list_data){//活动列表数据
    	         activity_data.myLaunchActivity(act_list_data).then(
    	    		function success(data){
    	    			if(data.code!=0){
    	    				mui.alert(data.msg);
    	    				$(".sys-loading").removeClass("show_a")
    	    				return 
    	    			}
    	    			$(data.rows).map(function(){
    	    				var da_info=new query_activity_list(this)  
    	    				$scope.act_list.activity_list.push(da_info)
    	    			})
    	    			$(".tikjhg_as").remove()
    	    			if(data.rows.length==0){
    	    				$("#scroll").append('<p class="cen pt10 pm10 bgff tikjhg_as">:-) 没有更多活动了</p>')
    	    			}
    	    			$(".sys-loading").removeClass("show_a")
    	    		}, function error() {
    					console.log("获取活动列表数据失败");
    	    });
     },"hdoe_sdf":function(){
 	  	$(".list_active").removeClass("show_a");
    	$(".dfg_poi").removeClass("mui-block")
     }
    		 
        }
   
     $scope.act_list.act_list_data(list_data);
 
        /*下拉分页*/
        $scope.paging=function(){
        	poiu_po=false 
        	 ++list_data.pageIndex;
       	    $scope.act_list.act_list_data(list_data);
        }
        $scope.pm=10

     
}]).controller('sponsor_listController',["$scope","activity_data","anchorScroll",function($scope,activity_data,anchorScroll) {//票卷列表
	   $(".mml_bottom").show()
	   
	$(".mml_bottom a").removeClass("bottom_act");
	$(".mml_bottom a").eq(1).addClass("bottom_act");
	$(".ds_poiu_a").removeClass("show_a");
	$(".retreat_icon").removeClass("none");
	$(".acr_poui_x span").on("click",function(){
		$(".acr_poui_x span").removeClass("ls")
		$(this).addClass("ls")
	})
	/*行业类别按钮点击事件*/
    $(".asddf_poiu").on("click",function(){
    	$(".menu_pup_p").toggleClass("show_a");
    })
    $("input").focus(function(){
    	$("footer").hide()
    })
    $("input").blur(function(){
    	$("footer").show()
    })

	var parameter_p={}
	parameter_p.pageIndex=1
	parameter_p.pageSize=4
	parameter_p.sort=1;//0最热  1最新
	parameter_p.industry_id="";//行业id
	$scope.sponsor_list={ 
			"activitySupport_list":[],//初始化赞助数据
			"sp_sort":function(tp,stry){
				parameter_p.pageIndex=1;
				$scope.sponsor_list.activitySupport_list=[];
				if(stry==1){
					parameter_p.sort=tp;
				}else if(stry==2){
					$(".menu_pup_p").toggleClass("show_a");
					tp=tp==0?'':tp
					parameter_p.industry_id=tp;
					
				}
			
				 $scope.sponsor_list.sponsorship_re(parameter_p)
			},
			"sponsorship_re":function(parameter_p){ //赞助数据
				 /*票卷数据查看*/
			    activity_data.support_list(parameter_p).then(
			    		function success(data){
			    			if(data.code!=0){
			    				console.log(data.msg);
								return;
			    			}
			    			
			    			$(data.rows).map(function(){
			    				  var ticket_volume_list=new sponsor_list(this);
			    				  $scope.sponsor_list.activitySupport_list.push(ticket_volume_list);
			    			})
			    			$(".tikjhg_as").remove()
	    	    			if(data.rows.length==0){
	    	    				$("#scroll").append('<p class="cen pt10 pm10 bgff tikjhg_as">:-) 没有更多赞助了</p>')
	    	    			}
			    			 
						  $(".sys-loading").removeClass("show_a")
			    		}, function error() {
							console.log("赞助列表数据获取失败");
			    });
			}
	}
    
	
	$scope.paging=function(){
		 ++parameter_p.pageIndex;
         $scope.sponsor_list.sponsorship_re(parameter_p)
	}
   

    
    $scope.sponsor_list.sponsorship_re(parameter_p)
	
}]).controller('add_page_controller',["$scope","activity_data","$state","httpService",function($scope,activity_data,$state,httpService) {//点击加号进来的页面
	$(".ds_poiu_a").removeClass("show_a");
	$(".retreat_icon").removeClass("none");
	$(".mml_bottom a").removeClass("bottom_act");
	$('.mui-active').hide();
	$(".mui-backdrop").remove();
	
	$scope.add_page={"msg":function(){
	       mui.alert('发起活动请到电脑端发起', 'E场景活动');
	  },"go_con":function(url){// 获取用户登录状态
			httpService.getDatas('GET', '/user/verifyUserLogin').then(function(data) {
				if(data.code!=0&&data.code!=-1){
					$state.go("signin");
					return false;
				}
				 $state.go(url)
			});
		 
	  }
	 
	}
}]).controller('loan_co',["$scope","activity_data","$location","$stateParams",function($scope,activity_data,$location,$stateParams) { //白条功能

	$scope.activity_id=$stateParams.activity_id;//获取传过来的活动
	  $scope.answerPup=function(){ //申请成功提示
		  	var loan_name=$(".loan_name").val();//姓名
		  	var loan_tel=$(".loan_tel").val();//手机
		  	var loan_money=parseFloat($(".loan_money").val());//贷款金额
		  	var loan_remark=$(".loan_remark").val();//备注理由
		  	var sex=$("#sex1").is(":checked")?1:2;//性别选择
		  	var periods=parseInt($("#showUserPicker").text());//分期期数
		  	var activity_id=$(".activity_id").val();
		  	var loan_data={
		   "name":loan_name,
		   "sex":sex,
		   "phone":loan_tel,
		   "apply_money":loan_money,
		    "contact_status":1,
		    "user_remark":loan_remark,
		    "periods":periods,
		    "activity_id":$scope.activity_id
					}
		  	if(!form_mm.isnull(loan_name)){
				mui.alert("姓名不能为空")
				$(".loan_name").focus();
				return;
			}
		  	if(!form_mm.tel(loan_tel)){
				mui.alert("手机号码格式错误")
				$(".loan_tel").focus();
				return;
			}
		  	if(isNaN(loan_money)){
				mui.alert("贷款金额不能为空")
				$(".loan_money").focus();
				return;
			}
		  	if(loan_money<=0){
				mui.alert("贷款金额不能小于0")
				$(".loan_money").focus();
				return;
			}
		  	if(isNaN(periods)){
				mui.alert("请选择还款期数")
				$("#showUserPicker").focus();
				return;
			}
		  	activity_data.loan_money(loan_data).then(
		    		function success(data){
		    			if(data.code!=0){
		    				mui.alert(data.msg) 
		    				return
		    			}
		    				mui.alert("申请成功！\n工作人员近期会和您取的联系！")  
		    				$(".now_check").text("待审核").css({"background":"rgba(0,0,0,.2)"}).unbind("click")
		    			
		    		}, function error() {
		    			mui.alert("验证失败");
		    });
			  	
		  }
		  $scope.showAnswer=function(){  //常见问题显示
		  		$(".answer_wrap").css("display","block")
		  }
		  $scope.divideMoney=function(){  //分期期数选择器
		  		(function($, doc) {
				$.init();
				$.ready(function() {
					var picker = new mui.PopPicker();
					
					
				    picker.setData([{value:'1',text:'1期'},{value:'3',text:'3期'},{value:'6',text:'6期'},{value:'12',text:'12期'},{value:'24',text:'24期'},{value:'36',text:'36期'}]);
				    picker.show(function (selectItems) {				    	
				    	document.getElementById("showUserPicker").innerHTML=selectItems[0].text;				    
				    })
					
				});
			})(mui, document);
		  };
		  
		  var sh_a={};
		  sh_a.title="【首页】e场景活动";
		  sh_a.desc='活动白条,让生活更容易';
		  sh_a.link=window.location.href;
		  sh_a.imgUrl="http://m.apptown.cn/img/activity_loan_share.jpg";
		  wx_share(sh_a);

}]).controller('activity_hotr',["$scope","activity_data","$location","$stateParams",function($scope,activity_data,$location,$stateParams) { //推荐活动
	$scope.dte=[]
	/*热门活动*/
    activity_data.getActivityHot().then(
			function success(data) {
				if(data.code!=0){
					mui.alert(data.msg, 'E场景活动');
					return;
				}
				$(data.info).map(function(){
					var hoti=new preferential(this)
					$scope.dte.push(hoti)
				})
		}, function error() {
			console.log("获取热门活动失败") 
	});
	$scope.down_po=function(){
		if(/Android|webOS|BlackBerry|SymbianOS/i.test(navigator.userAgent)){//安卓机
			 window.open("http://resource.apptown.cn/app/app.apk")
		}else{//苹果机
			$("body").remove("app_down_a").append('<section class="app_down_a"></section>')
			   window.location.href="https://itunes.apple.com/cn/app/e-chang-jing-huo-dong/id1110240836?mt=8&uo=4"  
		}
	}
}]).controller('activity_show_ticket',["$scope","activity_data","$location","$stateParams",function($scope,activity_data,$location,$stateParams) { //票卷详情
	  var data_p={"id":3};//投票ID
	  $scope.type_p;//投票单选多选
	   $scope.is_vote;//0未投票 1已投票
	  activity_data.query_vote_p(data_p).then(
	    		function success(data){    		
	    			  if(data.code!=0){
	    				  mui.alert(data.msg); 
	    				  return;
	    			  }	
	    			$scope.vote_detail=new query_vote(data.info)
	    			$scope.type_p=data.info.type;
	    			$scope.is_vote=data.info.is_vote;
	    			
	    		}, function error() {
					console.log("投票详情查询失败");
	    });
      
       $(document).on("click",".about_vote_content label",function(){
    	   var type_po=$("#type_p").val();
    	   if(type_po==1){
    		   $(".about_vote_content label").css("background-position","-26px -1119px").removeAttr("data-i");
        	   $(this).css("background-position","-26px -1160px").attr("data-i",2);
    	   }else if(type_po==2){
    		   if( $(this).attr("data-i")==1){
    			   $(this).css("background-position","-26px -1160px"); 
    			   $(this).attr("data-i",2)
    		   }else {
    			   $(this).css("background-position","-26px -1119px"); 
    			   $(this).attr("data-i",1)
    		   }
    		   
    	   }
    	   
       })

	 
		  
	 $(".vote_comfirm").on('click',function(){
		 var str="";
		 var arr1=[]
		$(".about_vote_content label").map(function(){
			if($(this).attr("data-i")==2){
				str+='_'+$(this).attr("data-id")
				arr1.push($(this).parents(".about_vote_list"))
			}
		})
	
		 var data_t={"ids":str.substring(1)}
		 activity_data.query_vote_do(data_t).then(
		    		function success(data){    		
		    			  if(data.code!=0){
		    				  mui.alert(data.msg);  
		    				  return;
		    			  }else if(data.code==0){
		    				  $(".about_vote_tip").css("display","block")
		    				   setTimeout(function(){$(".about_vote_tip").css("display","none")},1500)
		    			  }	
		    		for(var i=0;i<arr1.length;i++){
		    			var piuy=$(arr1[i]).find(".vote_me").attr("data-tk")
		    			$(arr1[i]).find(".vote_me").text(++piuy+"票")
		    		}	
		    			
		    		}, function error() {
						console.log("执行投票失败");
		    });
		
	 }) 
}])

// ======================= 搜索结果 ============================
/* @ngInject */
.controller('searchCtrl', function($scope,httpService, messageService) {
	// 头部城市
	$(".ds_poiu_a").removeClass("show_a");
	$(".retreat_icon").removeClass("none");

	$scope.suportList = [];
	$scope.activityList = [];

	var activityIndex = 1,
		suportIndex = 1,
		sponsorIndex = 1;
	
	// 选择类型
	$scope.selectType = function() {
		$('.j-searchTypeList').slideToggle();
	}
	$('.j-searchTypeList li').click(function() {
		var text = $('.j-searchType').text();
		$('.j-searchType').text($(this).text());
		$(this).text(text).parent().slideToggle();

	});
	
	// 下拉加载
	$scope.sponsorMore = function() {
		sponsorIndex++;
		searchSponsor(true);
	}
	$scope.activityMore = function() {
		activityIndex++;
		searchActivity(true);
	}
	$scope.supportMore = function() {
		suportIndex++;
		searchSupport(true);
	}

	// 搜索结果
	$scope.searchResult = function() {
		name = $('.j-searchForm').find('input[name="searchName"]').val();
		var type = $('.j-searchType').text();
		
		if(type == '主办方') {
			$('#sponsorList').show().siblings().hide();
			searchSponsor();
		} else if(type == '活动') {
			$('#activityList').show().siblings().hide();
			searchActivity();
		} else if(type == '赞助') {
			$('#suportList').show().siblings().hide();
			searchSupport(); 
		}
	}
	var request = function(url, datas, array, more) {
		httpService.getDatas('GET', url, datas).then(function(data) {
			if(more) {
				$scope[array] = $scope[array].concat(data.rows);
				if(data.rows.length == 0) {
					messageService.show('没有更多数据了');
				}
			} else {
				$scope[array] = data.rows;
				if(data.rows.length == 0) {
					messageService.show('暂无搜索结果');
				}
			}
		});
	}
	// 主办方
	var searchSponsor = function(push) {
		var sponsorDatas = {
			'pageIndex': sponsorIndex,
			'name': name,
			'pageSize': 7
		};
		request('/sponsor/sponsor_search_page', sponsorDatas, 'sponsorList', push);
	};
	// 赞助
	var searchSupport = function(push) {
		var supportDatas = {
			'pageIndex': suportIndex,
			'sort': 1,
			'name': name,
			'pageSize': 6
		};
		request('/support/support_list', supportDatas, 'suportList', push);
	};
	// 活动
	var searchActivity = function(push) {
		var activityDatas = {
			'pageIndex': activityIndex,
			'status': 0,
			'name': name,
			'pageSize': 6
		};
		request('/activity/query_activity_list', activityDatas, 'activityList', push);
	};

})

