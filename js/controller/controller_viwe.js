/**
 * controller
 */


angular.module('ticket_volume_list', [ "directive_mml","activity_servrt","ui.router","pay","sponsor","request","form","user","activity", "common","act_details","router"])
.controller('mode_Controller',function($scope, $rootScope,activity_data, $location, $state, httpService, messageService) {//公共方法

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
			
		
	// 判断是否登录
    $scope.mySignin = function(state, params, flag) {
    	params = (params) ? params : {};
    	httpService.getDatas('GET', '/user/verifyUserLogin').then(function(data) {
			if(data.code!=0&&data.code!=-1){
				if(flag) {
					messageService.show('您还未登录');
				}
				$state.go("signin");
				return false;
			}
            $state.go(state, params);
		});
    }


})
// ===============================  首页 ==============================
.controller('index_controller', function($scope,activity_data, $state,httpService) {//首页
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
	
	
   /* var mySwiper = new Swiper('.banner_top_b_banner',{
	             autoplay : 3000,//自动滑动 滚动速度
	             observer: true,//修改swiper自己或子元素时，自动初始化swiper
	             observeParents: true,//修改swiper的父元素时，自动初始化swiper
	             pagination : '.swiper-pagination',//分页器的class的名字
	             paginationClickable :true,//点击标题跳转到指定的那页
	      });*/
		
    
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
						  $scope.qing =$scope.act_index.banner_index
			
				}, function error() {
					console.log("获取轮播图失败")
		});
	$scope.sft=function(x){

		return x 
	}

	
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

    // 热门活动
    $scope.query_activity=function(data){
    	data.channel = 1;
    	httpService.getDatas('GET','/activity/query_activity_list', data).then(function(data) {
    		if(data.code!=0){
				alert(data.msg);
				return;
			}
			$(data.rows).map(function(){
				 var hoti=new preferential(this)
				 $scope.act_index.activity_hot.push(hoti);
			})
			if(data.rows.length<10){
				 $scope.load_l=false;//判断热门活动是否还有数据
			}
			$(".sys-loading").removeClass("show_a")
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

    

}).controller('activities_list',function($scope,activity_data,$stateParams, httpService) {//活动列表
	  $(".mml_bottom ").show()
	$(".mml_bottom a").removeClass("bottom_act");
	$(".mml_bottom a").eq(0).addClass("bottom_act");
	var title_po="创客"
	var tio=parseInt($stateParams.activityTypeId)
	switch(tio){
		case 1:title_po="商会场馆";break
		case 2:title_po="创业投资";break
		case 3:title_po="亲子教育";break
		case 4:title_po="金融财经";break
		case 5:title_po="精品课程";break
		case 6:title_po="休闲户外";break
		case 7:title_po="娱乐艺术";break
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
        list_data.city_name=city_name.trim()
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
	 			$(".dfg_poi").addClass("mui-block")
			 	switch(type){
			 		case 1:$scope.act_list.select_data=$scope.classify[0];break;
			 		case 2:$scope.act_list.select_data=$scope.classify[1];break;
			 		case 3:$scope.act_list.select_data=$scope.classify[3];break;
			 		case 4:$scope.act_list.select_data=$scope.classify[4];break;
			    }
    		 },
    		 "se_function":function(title,id,name, subId){//下拉框点击方法
    				$(".sys-loading").addClass("show_a")
    				$scope.act_list.activity_list=[];
			 		list_data.pageIndex=1;
			 	  	$(".list_active").removeClass("show_a");
			 		$(".dfg_poi").removeClass("mui-block");
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
    	    			 $("img.lazy").lazyload({threshold : 200, effect : "fadeIn"}); 
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

     
}).controller('sponsor_listController',["$scope","activity_data","anchorScroll",function($scope,activity_data,anchorScroll) {//票卷列表
	   $(".mml_bottom").show()
	   
	$(".mml_bottom a").removeClass("bottom_act");
	$(".mml_bottom a").eq(1).addClass("bottom_act");
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
	  var sh_a={};
	  sh_a.title="【首页】e场景活动";
	  sh_a.desc='活动白条,让生活更容易';
	  sh_a.link=window.location.href;
	  sh_a.imgUrl="http://m.apptown.cn/img/activity_loan_share.jpg";
	  wx_share(sh_a);
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
		  

}]).controller('activity_hotr', function($scope,activity_data,$location,$stateParams, httpService, messageService) { //推荐活动
	$scope.dte=[];
	var index = 1;
	/*热门活动*/
	var init = function(more) {
		httpService.getDatas('GET', '/activity/get_activity_hot', {'start': index, 'limit': 5, 'activityId': $stateParams.id}).then(function(data) {
			if(data.code!=0){
				mui.alert(data.msg, 'E场景活动');
				return;
			}
			if(data.info.length == 0) {
				messageService.show('没有更多数据了', 'toast');
			} else {
				$(data.info).map(function(){
					var hoti=new preferential(this)
					$scope.dte.push(hoti)
				});
			}
	    });
	}
    init();
	// 推荐更多活动
    $scope.recommendMore = function() {
    	index++;
		init(index, true);
    }

}).controller('activity_show_ticket',["$scope","activity_data","$location","$stateParams",function($scope,activity_data,$location,$stateParams) { //票卷详情
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

// ======================= 搜索 ============================
/* @ngInject */
.controller('searchCtrl', function($scope,httpService, messageService, $state) {
	var name = '',
		type = 0;	// 搜索类型(活动0、活动号1、嘉宾号2、媒体号3、赞助4),前端判断使用
		typeText = '活动';
	
	// 选择类型
	$scope.selectType = function() {
		$('.j-searchTypeList').slideToggle();
	}
	$('.j-searchTypeList li').click(function() {
		if($(this).text() == '活动' || $(this).text() == '活动号'){
			$('.j-activityLabel').show();
		} else {
			$('.j-activityLabel').hide();
		}
		typeText = $(this).text();
		$(this).text($('.j-searchType').text());	
		$('.j-searchType').text(typeText);
		$('.j-searchTypeList').slideToggle();
	});

	// 搜索结果
	$scope.searchResult = function() {
		name = $('.j-searchForm').find('input[name="searchName"]').val();
		switch(typeText) {
			case '活动': type = 10; break;
			case '活动号': type = 20; break;
			case '嘉宾号': type = 21; break;
			case '媒体号': type = 22; break;
			case '赞助': type = 30; break;
		}
		$state.go('search_result', {'type': type, 'name': name});
	}

	$scope.searchActivity = function(labelId) {
		if(typeText == '活动') {
			$state.go('search_result', {'type': 11, 'name': labelId});
		} else {
			$state.go('demand_list', {'data': labelId});
		}
	}
})
// ======================= 搜索结果 ============================
/* @ngInject */
.controller('search_resultCtrl', function($scope,httpService, messageService, $stateParams) {
	var list = 'hostList';
		// 活动号0、嘉宾号1、媒体号2 (传递给后端参数)
		typeId = 0,	
		// 搜索类型(活动10、活动标签11、活动号20、嘉宾号21、媒体号22、赞助30),前端判断使用
		type = Number($stateParams.type),	
		name = $stateParams.name,	// 搜索的关键字
		labelId = '',				// 活动标签
		params = {'pageIndex': 1, 'pageSize': 10, 'name': name};

	$scope.type = type;	
	$scope.supportList = [];
	$scope.activityList = [];
	$scope.hostList = [];

	var search = {
		request: function(url, datas, array, more) {
			httpService.getDatas('GET', url, datas).then(function(data) {
				if(more) {
					$scope[array] = $scope[array].concat(data.rows);
					if(data.rows.length == 0) {
						messageService.show('没有更多数据了', 'toast');
					}
				} else {
					$scope[array] = data.rows;
					if(data.rows.length == 0) {
						messageService.show('暂无搜索结果', 'toast');
					}
				}
			});
		},
		activity: function(more) {
			var data = params;
				data.status = 0;
				data.label = labelId;
			if(labelId) data.name = name = '';
			search.request('/activity/query_activity_list', data, 'activityList', more);
		},
		host: function(more) {
			var data = params;
				data.type_id = typeId;
			search.request('/sponsor/sponsor_search_page', data, list, more);	
		},
		support: function(more) {
			var data = params;
				data.sort = 1;
			search.request('/support/support_list', data, 'supportList', more);
		}
	};
	switch(type) {
		case 10: typeId = 0; search.activity(); break;
		case 11: typeId = 0; labelId = name; search.activity(); break;
		case 20: typeId = 0; list = 'hostList';  search.host(); break;
		case 21: typeId = 1; list = 'guestList'; search.host(); break;
		case 22: typeId = 2; list = 'mediaList'; search.host(); break;
		case 30: typeId = 0; search.support(); break;
	}

	// 下拉加载
	$scope.sponsorMore = function() {
		params.pageIndex++;
		search.host(true);
	}
	$scope.activityMore = function() {
		params.pageIndex++;
		search.activity(true);
	}
	$scope.supportMore = function() {
		params.pageIndex++;
		search.support(true);
	}
})

// ======================= 认证列表 ============================
/* @ngInject */
.controller('auth_listCtrl', function($scope,httpService, messageService) {
	// 获取数据
	httpService.getDatas('GET', '/sponsor/certificationNum').then(function(data) {
		$scope.auth = data.info;
	});
	 var sh_a={};  //微信分享
 	sh_a.title="E场景活动号、嘉宾号、媒体号入驻开启啦！"
    sh_a.desc='想成为e场景活动签约活动主办方、活动嘉宾、活动媒体吗？入口已开启，赶紧申请入驻吧！'
    sh_a.link=window.location.href;
    sh_a.imgUrl="http://m.apptown.cn/img/vip_loan_share.png"
    wx_share(sh_a)
})

// ======================= 活动号认证 ============================
/* @ngInject */
.controller('activity_authCtrl', function($scope,httpService, messageService,$stateParams) {
	
	var vm = $scope;
	vm.sponsor = {};
	// 获取认证数据
	httpService.getDatas('GET', '/sponsor/get_sponsorapply', {typeId: 0})
    .then(function(data) {
    	if(data.info == null) {
			vm.status = 0;
			return false;
		}
		if(data.code==0 && data.info.status){
			vm.status = data.info.status;
			switch(Number(data.info.status)) {
				case 1:  vm.sponsor = data.info; break;
		    	case 2:  vm.sponsor.failInfo = data.info.remark; break;
			}
		}
    });
	/*为苹果机引入 兼容*/
	if($stateParams.type==1){
		$(".header_mml,.mml_bottom").remove()
	}
    // 表单提交成功后跳转
    $scope.route = function() {
    	vm.status = 3;
    }	
	// 重新认证，显示主办方认证表单
	$scope.reSponsorAuth = function () {
		vm.status = 0;
	}
    var sh_a={};  //微信分享
 	sh_a.title="e场景活动“活动号”来了，欢迎认证！"
    sh_a.desc='认证成为e场景活动号，将获得丰富高级功能服务，赶集来认证吧！'
    sh_a.link=window.location.href;
    sh_a.imgUrl="http://m.apptown.cn/img/Activity-number.png"
    wx_share(sh_a)
})
// ======================= 嘉宾号认证 ============================
/* @ngInject */
.controller('guest_authCtrl', function($scope,httpService, messageService) {//111111
	var vm = $scope;
	vm.sponsor = {};
	// 获取认证数据
	httpService.getDatas('GET', '/sponsor/get_sponsorapply', {typeId: 1})
    .then(function(data) {
    	if(data.info == null) {
			vm.status = 0;
			return false;
		}
		if(data.code==0 && data.info.status){
			vm.status = data.info.status;
			switch(Number(data.info.status)) {
				case 1:  vm.sponsor = data.info; break;
		    	case 2:  vm.sponsor.failInfo = data.info.remark; break;
			}
		}	
    });
    // 表单提交成功后跳转
    $scope.route = function() {
    	vm.status = 3;
    }	
	// 重新认证，显示主办方认证表单
	$scope.reSponsorAuth = function () {
		vm.status = 0;
	}
    var sh_a={};  //微信分享
 	sh_a.title="我要成为e场景活动签约嘉宾！"
    sh_a.desc='我是行业精英、大咖、网络红人，我想分享，我有话说，现在申请成为e场景活动签约嘉宾吧！'
    sh_a.link=window.location.href;
    sh_a.imgUrl="http://m.apptown.cn/img/Guest-number.png"
    wx_share(sh_a)
})
// ======================= 媒体号认证 ============================
/* @ngInject */
.controller('media_authCtrl', function($scope,httpService, messageService) {//111111
	var vm = $scope;
	vm.sponsor = {};
	// 获取认证数据
	httpService.getDatas('GET', '/sponsor/get_sponsorapply', {typeId: 2})
    .then(function(data) {
    	if(data.info == null) {
			vm.status = 0;
			return false;
		}
		if(data.code==0 && data.info.status){
			vm.status = data.info.status;
			switch(Number(data.info.status)) {
				case 1:  vm.sponsor = data.info; break;
		    	case 2:  vm.sponsor.failInfo = data.info.remark; break;
			}
		}
		
		
    });
    // 表单提交成功后跳转
    $scope.route = function() {
    	vm.status = 3;
    }	
	// 重新认证，显示主办方认证表单
	$scope.reSponsorAuth = function () {
		vm.status = 0;
	}
    var sh_a={};  //微信分享
 	sh_a.title="我要成为e场景签约媒体！"
    sh_a.desc='赶紧成为e场景活动合作媒体，百万活动媒体宣传需求等您来袭！'
    sh_a.link=window.location.href;
    sh_a.imgUrl="http://m.apptown.cn/img/Media-number.png"
    wx_share(sh_a)
})

// ======================= 金融贷款 ============================
/* @ngInject */
.controller('finance_loanCtrl', function($scope,httpService, messageService) {//111111
	// 单选框默认选中状态值
	$scope.selectedSex = 1;
	$scope.selectedType = 1;
	// 分享
    var sh_a={};  //微信分享
 	sh_a.title="易居购金融，借款so easy！再也不用担心没钱啦！"
    sh_a.desc='主营红本抵押、工薪消费贷、企业贷等贷款服务，为您量身打造一款合适您的贷款产品。'
    sh_a.link=window.location.href;
    sh_a.imgUrl="http://m.apptown.cn/img/loan_loan_share.png"
    wx_share(sh_a)
})


// ======================= 订阅 ============================
/* @ngInject */
.controller('subscribeCtrl', function($scope,httpService, messageService) {
	$scope.subscribArray = [];
	// 获取订阅数据
	var getSubscribeDatas =	function() {
		httpService.getDatas('GET', '/user_center/get_subscribe').then(function(data) {
			if(data.info && data.info.industryId) {
				var id = data.info.industryId;
				$scope.industry.id = id;
				$scope.industry.oldIndex = id - 1;
				$scope.industry.array['name'] = $scope.industry.list[id - 1]['name'];
				$scope.industry.array[id - 1] = true;
			}
			if(data.info && data.info.labels) {
				$scope.subscribArray = data.info.labels;
				$('.j-selectLabel').each(function() {
					if($scope.subscribArray.indexOf($(this).data('id')) != -1) {
						$(this).addClass('mui-btn-green mainBtn');
					}
				});
			}
		});
	};
	// 获取行业数据
	var industryDatas = function() {
		httpService.getDatas('GET', '/system/queryIndustryAll').then(function(data) {
			$scope.industry.list = data.info;
			getSubscribeDatas();
		});
	}
	// 获取标签数据
	httpService.getDatas('GET', '/label/group').then(function(data) {
		$scope.labelList = data;
		industryDatas();	
	});

	// 行业
	$scope.industry = {
		show: false,
		oldIndex: 0,
		array: [],
		list: [],
		id: 0,
		choice: function(index) {
			if(this.oldIndex != index) {
				this.array[this.oldIndex] = false;
				this.array[index] = true;
				this.array['name'] = this.list[index].name;
				this.id = this.list[index].id;
				this.show = false;
			}
			this.oldIndex = index;
		}
	}
	// 选择订阅标签
	$('body').off('click').on('click', '.j-selectLabel', function(e) {
		// if($scope.subscribArray.length >= 5 && !$(this).hasClass('mainBtn')) {
		// 	messageService.show('最多订阅5个', 'toast');
		// 	return false;
		// }
		$(this).toggleClass('mui-btn-green mainBtn');
		if($(this).hasClass('mainBtn')) {
			$scope.subscribArray.push($(this).data('id'));
		} else {
			var index = $scope.subscribArray.indexOf($(this).data('id'));
			$scope.subscribArray.splice(index, 1);
		}
	});
	
	// 提交订阅数据
	$scope.submit = function() {
		if($scope.subscribArray.length == 0) {
			messageService.show('请至少订阅1个', 'toast');
		} else {
			httpService.getDatas('GET', '/user_center/subscribe', {labels: $scope.subscribArray.toString(), industryId: $scope.industry.id}).then(function(data) {
				messageService.show('订阅成功', 'toast');
			});
		}
	}
})


// ======================= 机器申请 ============================
/* @ngInject */
.controller('activity_machine_apply', function($scope,httpService, messageService) {
	var sh_a={};  //微信分享
 	sh_a.title="想要一台e场景活动免费签到机吗？赶紧来申请吧！"
    sh_a.desc='签到机为活动量身打造的签到和广告等服务，欢迎广大活动主办方和活动场地方前来申请，满足条件可以免费哦！'
    sh_a.link=window.location.href;
    sh_a.imgUrl="http://m.apptown.cn/img/activity_apply_share2.png"
    wx_share(sh_a)
	
	$scope.applyBtn=function(){
		var machine_name=$(".j_machine_name").val().trim();//申请名字
		var machine_phone=$(".j_machine_phone").val().trim();//申请手机号
		var machine_company=$(".j_machine_company").val().trim();//申请公司
		var machine_detail=$(".j_machine_detail").val().trim();//申请备注	
		if(!form_mm.isnull(machine_name)){
					mui.alert("姓名不能为空")
					$(".j_machine_name").focus();
					return;
		}
		if(!form_mm.tel(machine_phone)){
				mui.alert("手机号码格式错误")
				$(".j_machine_phone").focus();
				return;
		}
		if(!form_mm.isnull(machine_company)){
				mui.alert("企业或组织名称不能为空")
				$(".j_machine_company").focus();
				return;
		}
		var datas={
      "remark":machine_detail,
      "team_name":machine_company,
      "user_name":machine_name,
       "user_phone":machine_phone                               
      }
		httpService.getDatas('POST', '/Machine/apply_machine',datas).then(function(data) {
           if(data.code==0){
           	 mui.alert(data.msg)
           }
        });
	}
	

})
/*=====================活动号查询========================*/
.controller('activitie_demand', function($scope,httpService, messageService,$state) {
	httpService.getDatas('GET', '/label/group').then(function(data) {
		$scope.ge_type=data
	});
	httpService.getDatas('GET', '/sponsor/get_sponsorapply').then(function(data) {
		if(data.code==-1||data.code==-10){
			$(".poiuyt_sf").addClass("show_a")
		}else{
			$(".poiuyt_sf_p").addClass("show_a")
			
		}
	});

	$scope.gp_list=function(da){
		da=JSON.stringify(da)
		console.log(da);
		$state.go("demand_list",{'data':da})
	}
	  $scope.$on('ngfinish', function (ngfinishEvent) {
		  var li_length=$(".deh_list").length
		  $scope.contract($(".deh_list").eq(li_length-1))
		  $scope.contract($(".deh_list").eq(li_length-2))
      })
      $scope.contract=function(eve){//展开
		  $(eve).on("click",function(){
			  $(this).removeClass("mt10").find(".tltle_p span").css({"opacity":"0"}) 
			  $(this).find(".pomhhgf_we").css({"display":"block"}) 
		  }).addClass("mt10").find(".tltle_p span").css({"opacity":"1",'font-size': '24px'}).end().find(".pomhhgf_we").css({"display":"none"}) 

	  }
}).controller('demand_list_ctl', function($scope,httpService, messageService,$state,$stateParams) {//活动号列表
	$(".mml_bottom a").removeClass("bottom_act");
	$(".mml_bottom a").eq(1).addClass("bottom_act");
	var apply=new Object();
	apply.pageIndex=1;//页码
	apply.pageSize=10;//行数
	$scope.ge_type=[];//活动号数据
	$scope.getdate_a=function(apply){//活动好
		httpService.getDatas('GET', '/sponsor/getSponsorApply',apply).then(function(data) {
			if(data.code!=0){
				mui.alert(data.msg);
				return;
			}
			console.log('dfa');
			if(data.rows.length == 0) {
				messageService.show('暂时没有搜索结果', 'toast');
			} else{
				$(data.rows).map(function(){
					var date_poi=new getSponsorApply(this);
					$scope.ge_type.push(date_poi);
				})
			}
			
			
		
		});
	}
	  $scope.ilk_as=$stateParams.data
	    if($scope.ilk_as>0){
	      apply.labels=$scope.ilk_as;
	    } 
	$scope.getdate_a(apply);//初始化活动好
    $scope.paging=function(){//分页
		apply.pageIndex++;
		$scope.getdate_a(apply);
    }
    $scope.attention=function(ltype,id,index){//关注和取消关注  ltype=true 已关注否则请求取消关注
    	   var resources=new Object();
    	   resources.resources_id=id;
    	   resources.type=4; 
    	   $(".sys-loading").addClass("show_a")
    	   if(ltype){
    		   httpService.getDatas('GET', '/activity/exec_attention',resources).then(function(data) {
    			   if(data.code!=0){
    				   $state.go("signin");
    					messageService.show('没有登录！', 'toast');
    			   }
    			   $scope.ge_type[index].is_attention="bgdiso";
    	           $scope.ge_type[index].lkoi="已关注";
    	           $scope.ge_type[index].ltype=false;
    	           $(".sys-loading").removeClass("show_a");
    		   });
    	   }else{
    		   httpService.getDatas('GET', '/activity/cancel_attention',resources).then(function(data) {
    			   if(data.code!=0){
    				   $state.go("signin");
    			   }
    			   $scope.ge_type[index].is_attention="";
    	           $scope.ge_type[index].lkoi="关注TA";
    	           $scope.ge_type[index].ltype=true;
    	           $(".sys-loading").removeClass("show_a");
    		   });
    		  
    	   }
    }

  
/*    if($scope.ilk_as==null){
    	return
    }else{
    	$(".pull_down_w ").addClass("show_a")
    	$("#demand_list").css({"top":"88px"})
    } */
    
    $(".pull_down_w ").on("click",function(){
    	$(".xz_po_er ").toggleClass("show_a");
    })
    $scope.sel_name="全部"
    $scope.classify_oiiw=function(type,type_child,name){
    	console.log(type+"  "+type_child);
    	$scope.ge_type=[];
    	apply.pageIndex=1;
    	apply.type=type;
    	$scope.sel_name=name;
		$scope.getdate_a(apply);
    }
}).controller('attention_dynamicsctl', function($scope,httpService, messageService,$state,$stateParams) {//关注动态
	$scope.dyn_info=[]
	function dynamic_list(data_a) {
		httpService.getDatas('GET', '/dynamic/dynamic_list',data_a).then(function(data) {
			if(data.code!=0){
				mui.alert(data.msg);
				return;
			}
			$(data.info).map(function(){
				var dj_row=new dync_list(this);
				$scope.dyn_info.push(dj_row);
			})
		
		})
	}
	var dataiy_d={};
	dataiy_d.pageIndex=1;
	dynamic_list(dataiy_d);
	$scope.viewImage=function(data) {
		wx.previewImage({
		      current: data,
		      urls: data
		    });
	}
	$scope.paging=function(){
		dataiy_d.pageIndex++;
		dynamic_list(dataiy_d);
	}
	
})


//========= h5端 app下载 ==========  
var _guide_DownloadClose = {
   _init:function(){
       $("#guide_Download").remove();
      }
   }

down_app=function(){
	var _agent=navigator.userAgent;
	if(_agent.match(/micromessenger/i)!=null && _agent.match(/android/i)!=null){//安卓机
		var isWeixin = !!/MicroMessenger/i.test(_agent);
		if(isWeixin){
			   $("body").empty();
			   $("body").append('<section class="app_down_a"></section>');
		       document.body.style.backgroundColor = "#FFFFFF" ;
		       window.open("http://resource.apptown.cn/app/manmanlai.apk");
	    }
	}else{//苹果机
		$("body").empty();
	    $("body").append('<section class="app_down_a"></section>');
		document.body.style.backgroundColor = "#FFFFFF" ;
	    window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mml.apptown";
    }
}
function closeDownApp() {
	$('.downApp').fadeOut();
}

//========= h5端 app下载 ==========      

