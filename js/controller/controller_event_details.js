/**
 * 活动详情and赞助详情 
 */
angular.module('act_details', [ "directive_mml","activity_servrt","ui.router","pay","sponsor"])
.controller('activity_detail_c',function($scope,activity_data,$location,$stateParams,act_date,$state,httpService) { //活动详情
		if(isPC()) {//判断如果是PC端访问H5端则自动跳转到PC端
		window.location.href = 'http://www.apptown.cn/activity/57809'+$stateParams.id+'57809.httl';
	}
	  $scope.id=$stateParams.id
	  $scope.id_a=$stateParams.id
	  var hjgf=true;//设置取消和收藏关注
	  
	  $(".share_all_num").on("click",function(){
	  	httpService.getDatas('POST', '/share/add_share',{"type":1,"relevance_id":$scope.id}).then(function(data) {
				  
		});  
	  })
	  
	  $scope.detail={
		  "detail_date":{},
		  "detail_f":function(id){//查看活动详情
		    activity_data.activity_detail(id).then(
		    		function success(data){    
		    		    if(data.code!=0){
		    		    	 mui.alert('活动详情数据获取失败', 'E场景活动');
		    		    	 return
		    		    }
		    		    // 是否显示打赏数据
		    		    try{/*有异常*/
		    		    	 $scope.rewardShow = data.info.tip.open;
		    		    }catch(e){}
		    		   

		    		    $scope.detail.detail_date=new activity_detail(data.info);

		    		    if(data.info.is_collect==0){
		    		    	$('.collection_p').attr('data-x','0')
		    		    }else{
		    		    	$('.collection_p').attr('data-x','1')
		    		    }
		    		  
		    		    if($scope.detail.detail_date.status==1){
		    		    	  $scope.pjuyt="show_a"
		    		    }
		    			  $scope.detail.detail_date.act_id=$scope.id
		    		    act_date.set_act_date($scope.detail.detail_date)
		    		    $scope.user_id_a=data.info.sponsor_user_id
		    			$scope.industry=$scope.classify[1].maker_title[$scope.detail.detail_date.industry_id].text;//行业
		    			var reg = new RegExp("\n", 'g'); // 创建正则RegExp对象
				        var hg_p=removeHTMLTag($scope.detail.detail_date.details).replace(reg,"").substring(0,100)
				        var sh_a={},fx_text=""
				        
				        try{
				        	fx_text='【'+$scope.classify[0].maker_title[$scope.detail.detail_date.type].text+'】 '+$scope.detail.detail_date.title;
				        }catch(e){
				        	fx_text=$scope.detail.detail_date.title;
				        }
				        sh_a.title=fx_text
				        sh_a.desc=hg_p;
				        sh_a.link=window.location.href;
				        sh_a.imgUrl="http://m.apptown.cn/img/activity/share/share_activity1.jpg";
				        wx_share(sh_a,function(){ 
			    			$("#qrcode").on("click",function(){
				        	activity_data.getDatas('get', '/shareImage/get_share_image_url?activityId='+id+"&type=1")
				        	.then(function(data) { 
				        		wx.previewImage({
				    			      current: data.msg,
				    			      urls: [
				    			        data.msg
				    			      ]
				    			    });

				        		});
			    			});
				        });  
				     
				       
		    		}, function error() {
						console.log("活动详情获取失败");
		    }); 
	    },"collectionActivity":function(){//收藏或关注活动
	    	httpService.getDatas('GET', '/user/verifyUserLogin').then(function(data) {
			if(data.code!=0&&data.code!=-1){
				
				 $location.path("signin")
				
			}else{
				var date_po={}
	    	date_po.resources_id=$scope.id
	    	date_po.type=1;
	    	
	    	if($('.collection_p').attr('data-x')==0){
	    		hjgf=true;
	    		$('.collection_p').attr('data-x','1')
	    	}else{
	    		hjgf=false;
	    		$('.collection_p').attr('data-x','0')
	    	}
	    	if(hjgf){
	    		
	    		var col_num=parseInt($('.cl_num').text());
	    		if(isNaN(col_num)){
	    			col_num=0
	    		}
	    		$('.cl_num').text(col_num+1);
	    		activity_data.exec_attention(date_po).then(
			    		function success(data){    		
			    		    if(data.code!=0){
			    		    	 $location.path("signin")
			    		    	 mui.alert(data.msg, 'E场景活动');
			    		    	 return
			    		    }
			    		    mui.alert("收藏成功!","E场景活动",function(){
			    		        $(".collection_p").toggleClass("ls")
			    		    });
			    		
			    		    $(".contract_de2").eq(0).addClass("bgdiso")
			    			//$(".collection_p").toggleClass("ls")
			    			$("#user_attention").html("取消关注");
			    			hjgf=false;
			    		}, function error() {
							console.log("请求取消收藏接口失败");
			    }); 
	    	}else{
	    		var col_num=parseInt($('.cl_num').text());
	    		if(isNaN(col_num)){
	    			col_num=0
	    		}
	    		$('.cl_num').text(col_num-1);
	    		 activity_data.cancel_attention(date_po).then(
				    		function success(data){    		
				    		    if(data.code!=0){
				    		         mui.alert(data.msg, 'E场景活动');
				    		    	 return
				    		    }
				    			//$(".collection_p").toggleClass("ls")
				    			$("#user_attention").html("关注TA");
				    			hjgf=true;
				    			mui.alert("取消收藏成功!",function(){ 
				    		        $(".collection_p").toggleClass("ls")
				    			});

				    		    $(".contract_de2").eq(0).removeClass("bgdiso")
				    		}, function error() {
								console.log("请求收藏接口失败");
				    }); 
	    		
	    		}
			}
		});
	    	
	    	
	    
	    },"sign_up_p":function(a,x,y){
	    
	    	if(y==1){
	    	
	    		mui.alert("该活动还未发布，不能报名，请点击右上角发布按钮！","",function(){
	    			 $("html,body").animate({scrollTop:0},200);
	    		})
	    		return
	    	}
	    	if(x==2){//活动已结束
	    		return;
	    	}
	    	if(x==1){//活动已报名
	    		var t_ic=$scope.detail.detail_date.consumption_list[0].order_id
	    		$state.go("activity_success",{t_id:t_ic});
	    		return;
	    	}
	    	if(a==0){//没有登录
	    		$location.path('activity_sign_ree');
	    	}else if(a==1){
	    		if(x==-1){
		    		$location.path("signin");
		    		return;
		    	}
	    		$location.path('activity_charge');
	    	}
	    	
	    },
	    "sp_date":function(x){
	    	if(x==0){
	    		return
	    	}
	    	 $location.path('sp_details/'+x);
	    
	    },"activities_oi":function(){
	    	if(screen.availWidth>1000){
	    		if($scope.detail.detail_date.mnbv==1){
	    			sessionStorage.url_src=$scope.detail.detail_date.back_url
	    		}
	    		window.location.href='/html/big_machine/according_sign.html?id='+$scope.id+"&type="+$scope.detail.detail_date.mnbv
	    		sessionStorage.type_mkj=$scope.detail.detail_date.mnbv
	    	
	    		return;
	    	}
	    	$(".pup_soou_p").css({"left":"0"})
	    },"collectionSponsor":function(){//主办方关注操作
	    	var user_id_a=$scope.user_id_a;
	    	var x=$('.detail_jus').attr("data-x");
	    	if(x==0){
	    		httpService.getDatas('GET', '/activity/exec_attention?resources_id='+user_id_a+'&type=4').then(function(data) {
	    			 if(data.code!=0){
			    		    	 $location.path("signin")
			    		    	 mui.alert(data.msg, 'E场景活动');
			    		    	 return
			    		    }
				    $('.detail_jus').removeClass('contract_de2').addClass("contract_de3");
				    $('.contract_dr3').text("取消关注");
				    $('.detail_jus').attr("data-x",1);
				});  
	    	}else{
	    		 httpService.getDatas('GET', '/activity/cancel_attention?resources_id='+user_id_a+'&type=4').then(function(data) {
	    		 	 if(data.code!=0){
			    		    	 $location.path("signin")
			    		    	 mui.alert(data.msg, 'E场景活动');
			    		    	 return
			    		    }
				    $('.detail_jus').removeClass('contract_de3').addClass("contract_de2");
				    $('.contract_dr3').text("关注TA");
				    $('.detail_jus').attr("data-x",0);
				});
	    	}
	    }
	  }
	 $scope.fabu=function(){
		  var r_dada={}
		  r_dada.activity={"id":$scope.id,"status":0}
		  activity_data.getDatas('post', '/activity/release_activity',r_dada)
		  .then(function(data) {
			  if(data.code==-10){
				  $state.go("signin");
				 } 
			   $scope.date_poi=data.info
			   $state.go("issue_success",{"id":$scope.id,"teile":$scope.detail.detail_date.title,"text":$("#detail_date_o").text().substring(0,50).trim()})
		  }); 
	 }
	
		
	  $scope.streaming_poo=function(broadcast,mki){//broadcast=真为正在直播
		  $(".streaming_poo").removeClass("show_a")
		  if(broadcast){ 
			  $state.go("activity_streaming.activity_reward_detail",{ac_id:$scope.id_a,count:$scope.detail.detail_date.browse_count,id:$scope.id_a});
		  }else{ 
			  if(mki==0){
				  return;
			  }
			  mui.alert("直播断开...","e场景活动",function(){
				  $(".streaming_poo").addClass("show_a");
			  });
		  }
	  }
	  
      $(".pup_soou_p").on("tap",function(){
    	  $(".pup_soou_p").css({"left":"-1100px"})
      })
	  $(".pup_soou_p").on("swipeleft",function(){
    	  $(".pup_soou_p").css({"left":"-1100px"})
      })
       $(".pup_soou_p").on("swiperight",function(){
    	  $(".pup_soou_p").css({"left":"1100px"})
      })
      $scope.fengg_a=function(){
    	  mui('#share_pp').popover('toggle');
    	  $scope.sharep_a=new share_p($scope.id,$scope.detail.detail_date.title,$("#detail_date_o").text().substring(0,50).trim())
   	    
      } 
	 
	   
	  
	   $scope.detail.detail_f($scope.id)
	    $(".nagf_ssd span").removeClass("act").eq(1).addClass("act")

	   /*轮播图*/
	    var mySwiper = new Swiper('.banner_top_b_banner',{
            autoplay : 3000,//自动滑动 滚动速度
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
            pagination : '.swiper-pagination',//分页器的class的名字
            paginationClickable :true,//点击标题跳转到指定的那页
     });
$(".dd_pooo").hide()
	  /*  生产二维码*/
	    var qc_poi={}
	    qc_poi.render="canvas";
	    qc_poi.text='http://www.apptown.cn/scan/scanActivityCode?activityId='+$scope.id;
	    qc_poi.width='200';
	    qc_poi.height='200';	
	    
	    $('.act_qc_im').qrcode(qc_poi); 
	    var height_table=$(".act_tble_a").offset().top; 
		$(window).scroll( function(){ 
			  if(height_table<=$(this).scrollTop()-100){
				  $(".act_tble_a").css({"position":"fixed","top":"-10px","width":"100%"});
			  }else{
				  $(".act_tble_a").removeAttr("style");	
			  }

		  });

	/* 
	 * 张晗
	 * 我要打赏数据
	 */
	httpService.getDatas('GET', '/activityTip/' + $stateParams.id + '/info').then(function(data) {
		$scope.totalPerson = data.info.tip_num;
	});

		  
	  
}).controller('activity_deta_date',function ($scope,activity_data,anchorScroll) {//活动详情 活动详情数据
    $(".act_tble_a .zd").removeClass("act_poi")
    $(".act_tble_a .zd").eq(0).addClass("act_poi")
    $(".progress_of").css({"left":"0%"})
    anchorScroll.toView('#tracing_point', true);
}).controller('activity_registration_number',function ($scope,activity_data,anchorScroll) {//活动详情报名列表
	  var bm_date={} //报名参数
	  anchorScroll.toView('#tracing_point', true);
	   bm_date.activity_id=$scope.id;
	   bm_date.pageIndex=1;
	   bm_date.pageSize=10;
	   bm_date.sort=2;
       $scope.enrollment_list={  
			  "sign_up":[],//报名人数
			  "paging":function(t){//报名人数分页
				  bm_date.pageIndex++;
				  $scope.enrollment_list.list_date(bm_date);
				 
			  },
			  "list_date":function(data){
				  activity_data.consumption_list(data).then(
		    		function success(data){    		
		    		    if(data.code!=0){
		    		    	 mui.alert('获取报名数据失败', 'E场景活动');
		    		    	 return
		    		    }
		    		    $(data.rows).map(function(){
		    		    	var thg=new activity_id_by_consumption_list(this)
		    		    	$scope.enrollment_list.sign_up.push(thg)
		    		    	
		    		    })
		    		   if(data.rows.length<10){
		    			   $(".paging_list").hide()
		    		   }
		    		}, function error() {
						console.log("获取报名数据失败");
		    		}); 
			  }}
       
       $scope.enrollment_list.list_date(bm_date);
       $(".act_tble_a .zd").removeClass("act_poi")
       $(".act_tble_a .zd").eq(1).addClass("act_poi")
       $(".progress_of").css({"left":"33.3%"})
}).controller('activity_message',function ($scope,activity_data,$location,anchorScroll) {//活动详情留言
	var message_i={}//留言参过去的参数
	message_i.pageIndex=1;
	message_i.pageSize=100
	message_i.source_id=$scope.id
	 anchorScroll.toView('#tracing_point', true);
	$scope.leave_message={ 
		  "me_txt_length":"",	
		  "message_date":[],//留言数据查询
		  "message_p":function(data){//活动详情--留言
		  activity_data.comment_list(data).then(
		    		function success(data){    		
		    		    if(data.code!=0){
		    		    	 mui.alert(data.msg, 'E场景活动');
		    		    	 return
		    		    }
		    		    $(data.rows).map(function(){
		    		    	var thg=new comment_list_f(this)
		    		    	$scope.leave_message.message_date.push(thg)
		    		    })
		    		   
		    		}, function error() {
						console.log("获取报名数据失败");
		    }); 
		  
	  },"message":function(id){
		  $scope.me_id=id
	      mui('#message').popover('toggle');
		  $(".me_text_area").focus();
	  },"add_comment_data":function(data){
		  activity_data.add_comment_data(data).then(
		    		function success(data){    		
		    		    if(data.code!=0){
		    		    	mui('#message').popover('toggle');
		    		    	 $location.path("signin")
		    		    	 mui.alert(data.msg, 'E场景活动');
		    		    	 return
		    		    }
		    		    mui('#message').popover('toggle');
		    		    location.reload()
		    		}, function error() {
						console.log("插入留言失败");
		    }); 
	  },"comment":function(type){//提交评论
		
		  var date_po={}
		  if($scope.me_id==0){
			  date_po.source_id=$scope.id
		
		  }else{
			  date_po.superior=$scope.me_id
		  }
		  date_po.comment_type=1
		  date_po.comment_content=$(".me_text_area").val()
		  this.add_comment_data(date_po)
		   
	  }
	
	}
	$scope.leave_message.message_p(message_i)
	$(".me_text_area").val("")
    $(".act_tble_a .zd").removeClass("act_poi")
    $(".act_tble_a .zd").eq(2).addClass("act_poi")
    $(".progress_of").css({"left":"66.6%"})
}).controller('activity_sign_ree_c',["$scope","activity_data","$location","$stateParams","act_date",function($scope,activity_data,$location,$stateParams,act_date) { //免费活动报名
	$scope.act_d=act_date.date;//初始化活动详情数据
	if($scope.act_d==0){
		   window.history.back();
		   return
	}
	$scope.form_p=$scope.act_d.detail_config;//获取传过来的表单
	$scope.form_p[0].val_p=sessionStorage.form_name
	$scope.form_p[1].val_p=sessionStorage.form_phone
		
	$scope.id=$scope.act_d.act_id;//获取活动id
	$scope.img_p=$scope.act_d.images_po[0]
	$scope.title=$scope.act_d.title
	
	$scope.form_te={"submit":function(){
		var date_f={}
		for(var i=0;i<$(".form_po_ipnut").length;i++){
			var isnull=$(".form_po_ipnut").eq(i).attr("data-is");
			if(isnull=='y'&&!form_mm.isnull($(".form_po_ipnut").eq(i).val())){
				 mui.alert('请输入'+$(".form_po_ipnut").eq(i).attr("placeholder"), 'E场景活动');
				 $(".form_po_ipnut").eq(i).focus()
				return;
			}
		}
		
		 if(!form_mm.tel($(".form_po_ipnut").eq(1).val())){
			 mui.alert('电话号码格式输入错误', 'E场景活动');
			 return
		 }  
		 date_f.name=$(".form_po_ipnut").eq(0).val()
		 date_f.tel=$(".form_po_ipnut").eq(1).val()
		 
		 sessionStorage.form_name=date_f.name
	     sessionStorage.form_phone=date_f.tel
	
		 $(".form_po_ipnut").map(function(x){
			 if(x>1){
				 var map_p=$(this).attr("data-yu")
				 date_f[map_p]=$(this).val();
			 }
		 })
		  $(".sys-loading").addClass("show_a")
		activity_data.add_consumption($scope.id,date_f).then(
		    		function success(data){
		    			  $(".sys-loading").removeClass("show_a")
		    			if(data.code==-10){
		    				 var oiuiuyt={}
		    				 oiuiuyt.activity_id=$scope.id;
		    				 oiuiuyt.conDetail=date_f;		
		    				 act_date.set_act_date(oiuiuyt);
		    				 mui.toast('还差最后一步登录哦！');
		    				 $location.path("signin");
		    		    	 return
		    			}
		    		    if(data.code!=0){
		    		    	 mui.alert(data.msg, 'E场景活动');
		    		    	 return
		    		    }
		    		    
		    		    mui.alert("报名成功!  下载APP，可以参与刚报名活动的群聊、主办方互动哦。", 'E场景活动',function(){
		    		    	window.history.back();
		    		    });
		    		}, function error() {
		    			  $(".sys-loading").removeClass("show_a")
						console.log("报名失败");
		    }); 
	}		
}	


}]).controller('activity_charge_p',["$scope","activity_data","$location","$stateParams","act_date","$state",function($scope,activity_data,$location,$stateParams,act_date,$state) { //收费活动报名
   $scope.ticket=1;//票种初始化
   $scope.act_d=act_date.date;//初始化活动详情数据
   $scope.form_p= $scope.act_d.detail_config;
   

   if($scope.act_d.the_price==0||$scope.act_d==0){
	   window.history.back();
	   return
   }
   try{
		$scope.form_p[0].val_p=sessionStorage.form_name
		$scope.form_p[1].val_p=sessionStorage.form_phone
   }catch(e){
	   window.history.back();
	   return
   }

   
   $scope.charge={
	"the_price":0,	
	"selected":0,//获取选中的金额
	"ticket_id":0,//票种id
	"play":1,//支付方式 0.e币支付1.微信支付
	"yupiaoinfo":"0",//余票
	"add_charge":function(type){
	   var max_p=$scope.charge.yupiaoinfo
	   if(max_p>10){
		   max_p=10
	   }
	   if(max_p==0){
		   $scope.ticket=0;
		   return
	   }
	   if(type==1&&$scope.ticket<max_p){
		   $scope.ticket++
	   }else if(type==0&&$scope.ticket>1){
		   $scope.ticket--
	   }
	   this.the_price=this.selected*$scope.ticket
	 
   },"act_list":function(x,num,id,yu){//选中票种点击时间
	   if(yu==0){
		   return;
	   }
	   $(".df_pooiiuu_s").find("h6").addClass("mui-hidden")
	   $(".df_pooiiuu_s .lkmhgf_s").removeClass("fa-check-circle").addClass("fa-circle-thin")
	   $(".df_pooiiuu_s").eq(x).find(".lkmhgf_s").removeClass("fa-circle-thin").addClass("fa-check-circle")
	    $(".df_pooiiuu_s").eq(x).find("h6").removeClass("mui-hidden")
	   this.selected=num
	   this.the_price=this.selected*$scope.ticket
	   this.ticket_id=id
	   $scope.ticket=1
	   $scope.charge.yupiaoinfo=yu
   },"we_pay_oi":function(x){//选择支付
	   this.play=x;//赋值支付方式
	   $(".we_pay_oi .mui-hidden").removeClass("show_a")
	   $(".we_pay_oi").eq(x).find(".mui-hidden").addClass("show_a")
   },"act_pay":function(){
		   var date_f={};
		   var tick={};
		   tick.ticket_id=this.ticket_id;
			 if(tick.ticket_id==0){
				 mui.alert('请选择票种', 'E场景活动');
				 return;
			 }
			 
			for(var i=0;i<$(".form_po_ipnut").length;i++){
				var isnull=$(".form_po_ipnut").eq(i).attr("data-is");
				if(isnull=='y'&&!form_mm.isnull($(".form_po_ipnut").eq(i).val())){
					 mui.alert('请输入'+$(".form_po_ipnut").eq(i).attr("placeholder"), 'E场景活动');
					 $(".form_po_ipnut").eq(i).focus()
					return;
				}
			}
			 if(!form_mm.tel($(".form_po_ipnut").eq(1).val())){
				 mui.alert('电话号码格式输入错误', 'E场景活动');
				 return
			 }  
			 date_f.name=$(".form_po_ipnut").eq(0).val()
			 date_f.tel=$(".form_po_ipnut").eq(1).val()
			 sessionStorage.form_name=date_f.name
		     sessionStorage.form_phone=date_f.tel
			 $(".form_po_ipnut").map(function(x){
				 if(x>1){
					 var map_p=$(this).attr("data-yu")
					 date_f[map_p]=$(this).val();
				 }
			 })			
			 var datePiu={}
			 datePiu.conDetails=date_f
			 datePiu.consumption=tick
			 datePiu.quantity=$scope.ticket;
	
			 var parameter_e={}
			 parameter_e.id=$scope.act_d.act_id;//活动id
			 parameter_e.title=$scope.act_d.title;//活动标题
			 parameter_e.the_price=$scope.charge.the_price;//活动价格
			 parameter_e.date=datePiu;//表单数据
			 parameter_e.play=this.play//支付类型
			 

		     
		     
			 if(this.play==0){//e币支付
				 parameter_e.type="e币支付" 
				 act_date.set_act_date(parameter_e)
				 var btnArray = ['确认', '取消'];
				 mui.confirm('请确认购买信息无误，提交之后无法修改', 'E场景活动', btnArray, function(e) {
					 if (e.index == 0) { 
						 $state.go("e_money_pay");
						 $(".sys-loading").addClass("show_a")
						}
				 })
				 
			 }else if(this.play==1){//微信支付
				 if($scope.charge.selected==0){
					 mui.alert('0元票种请选择e币支付！', 'E场景活动');
					 return
				 }

			/*	 var date_po="conDetails="+JSON.stringify(datePiu.conDetails)+"&consumption="+JSON.stringify(datePiu.consumption)+"&quantity="+datePiu.quantity
				*/
				 var date_po=JSON.stringify(datePiu)
				     var url="https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}?data={2}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";		
	    	         url = url.replace('{0}','wxca4f9653c04f3e8d').replace('{1}','http://m.apptown.cn/wechat/wechat_charge_consumption_h5').replace('{2}',date_po);
	    	         
	    	         window.location.href=encodeURI(encodeURI(url));
		    	 	
				$("input").focus(function(){
					alert(2)   
				})
				 
			     
			 }
   		}
   }
   

   $("html,body").animate({scrollTop:0},200);//滚回顶部 

}]).controller('sp_details',["$scope","activity_data","$location","$stateParams","act_date","anchorScroll",'$sce',function($scope,activity_data,$location,$stateParams,act_date,anchorScroll,$sce) { //赞助单页--赞助详情
	var id=$stateParams.id
	 $scope.id=id   
     var pass_data={}
	 $scope.sp_detail={
			 "sp_data":{},
			 "sp_aj":function(){
				 activity_data.getDatas('get', '/support/support_detail?supportid='+id)
				 .then(function(data) {
					 $scope.sp_detail.sp_data=new sponsorDetail(data.info)
					 $scope.industry=$scope.classify[1].maker_title[$scope.sp_detail.sp_data.industry_id].text;//获取主办方
						var reg = new RegExp("\n", 'g'); // 创建正则RegExp对象
				        var hg_p=removeHTMLTag($scope.sp_detail.sp_data.content_details).replace(reg,"").substring(0,100)
				    
				         var sh_a={}
				        sh_a.title=$scope.sp_detail.sp_data.name;
				        sh_a.desc=hg_p;
				        sh_a.link=window.location.href;
				        sh_a.imgUrl="http://m.apptown.cn/img/activity/share/share_activity1.jpg";
				        wx_share(sh_a,function(){
			    			$("#qrcode").on("click",function(){
				        	activity_data.getDatas('get', '/shareImage/get_share_support_image_url?supportId='+id)
				        	.then(function(data) { 
				        		wx.previewImage({
				    			      current: data.msg,
				    			      urls: [
				    			        data.msg
				    			      ]
				    			    });

				        		});
			    			});
				        });
				 });
	 },"to_sponsor":function(x,id,amount,y,z,aa,re_t,re_time){//去赞助点击事件 x：回报内容 id：回报id  amount：回报金额  y:回报剩余人数  re_t:回报方式 re_time:回报时间
		 if(y<=0&&z!=0){
			mui.alert("赞助份数不足")
			 return;
		 }
		 if($scope.sp_detail.sp_data.login_user==0){
			  $location.path("signin")
			 mui.alert('用户未登录！', 'E场景活动');
			 return
		 }
		 var spr={}
		 spr.name= $scope.sp_detail.sp_data.name;//活动标题
		 spr.cover= $scope.sp_detail.sp_data.poster[0];//封面
		 spr.industry=$scope.industry;//行业
		 spr.sponsor_name=$scope.sp_detail.sp_data.sponsor_name;//发起人
		 spr.sponsor_phone=$scope.sp_detail.sp_data.sponsor_phone;
		 spr.repay_content=x;
		 spr.as_id=$scope.id;//赞助id
		 spr.sr_id=id;//回报id
		 spr.re_t=re_t;//回报标题
		 spr.re_time=re_time;//回报时间
		 spr.amount=amount
		 act_date.set_act_date(spr);
		 $location.path('sponsorship_return');
		 
	 },"select_sponsor":function(x,id,amount,y,z,aa,re_t,re_time){//选择赞助
		 $(".check_spons").removeClass("fa-check-circle").addClass("fa-circle-thin")
		 $(".check_spons").attr("data-f","1")
		 
		 if($(".check_spons").eq(aa).attr("data-f")==1){
			 $(".check_spons").eq(aa).removeClass("fa-circle-thin").addClass("fa-check-circle")
			 $(".check_spons").eq(aa).attr("data-f","2")
			 pass_data.x=x
			 pass_data.id=id
			 pass_data.amount=amount
			 pass_data.y=y
			 pass_data.z=z
			 pass_data.aa=aa  
			 pass_data.re_t=re_t
			 pass_data.re_time=re_time
		 }else if($(".check_spons").eq(aa).attr("data-f")==2){
			 $(".check_spons").eq(aa).removeClass("fa-check-circle").addClass("fa-circle-thin")
			 $(".check_spons").eq(aa).attr("data-f","1")
		 }
		 
	 },"sponsor_poi":function(){//去赞助
		 if($scope.sp_detail.sp_data.login_user==0){
			  $location.path("signin");
			 mui.alert('用户未登录！', 'E场景活动');
			 return
		 }
		 anchorScroll.toView('#sponsor_poi', true);
		 if(pass_data.x==undefined){
			 mui.alert('请选择赞助金额！', 'E场景活动');
			 return
		 }		 
		 this.to_sponsor(pass_data.x,pass_data.id,pass_data.amount,pass_data.y,pass_data.z,pass_data.aa,pass_data.re_t,pass_data.re_time)
		 
		 
	 }
			 
	 }

	 $scope.sharep_a= new share_p($scope.id,$("title").text(),$("#detail_date_o").text())

	 
	    var mySwiper = new Swiper('.banner_top_b_banner',{
            autoplay : 3000,//自动滑动 滚动速度
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
            pagination : '.swiper-pagination',//分页器的class的名字
            paginationClickable :true,//点击标题跳转到指定的那页
     });
	 
	 var height_table=$(".act_tble_a").offset().top; 
	    $(window).scroll( function(){ 
			  if(height_table<=$(this).scrollTop()-100){
				  $(".act_tble_a").css({"position":"fixed","top":"-10px","width":"100%"});
			  }else{
				  $(".act_tble_a").removeAttr("style");	
			  }

		  })
		  
	 $scope.sp_detail.sp_aj()
	  
}]).controller('sponsorship_deta_date',function ($scope,activity_data,anchorScroll) {//赞助单页--详情数据
    $(".act_tble_a .zd").removeClass("act_poi");
    $(".act_tble_a .zd").eq(0).addClass("act_poi");
    $(".progress_of").css({"left":"0%"});
	 anchorScroll.toView('#tracing_point', true);
	
}).controller('sponsorship_participate',function ($scope,activity_data,anchorScroll) {//赞助单页--参与
    $(".act_tble_a .zd").removeClass("act_poi")
    $(".act_tble_a .zd").eq(1).addClass("act_poi")
    $(".progress_of").css({"left":"33%"})
    	 anchorScroll.toView('#tracing_point', true);
    var pa_date={}
    pa_date.pageIndex=1
    pa_date.pageSize=10
    pa_date.activity_support_id= $scope.id
    $scope.sppr={ 
    	"s_date_t":[],
    	"participate":function(date_a){
    	activity_data.takein_detail(date_a).then(
	    		function success(data){    		
	    		    if(data.code!=0){
	    		    	 mui.alert(data.msg, 'E场景活动');
	    		    	 return
	    		    }
	    		    $(data.rows).map(function(){
	    		    	  var tome= new timestamp_p(this)
	    		    	  $scope.sppr.s_date_t.push(tome)
	    		    })
	    		 
	    		   
	    		}, function error() {
	    			 mui.alert("获取参与人数数据失败", 'E场景活动')
	    }); 
    },"paging_a":function(){//参与人数查看更多
    	pa_date.pageIndex++
    	$scope.sppr.participate(pa_date)
    }
    
    }
    
    $scope.sppr.participate(pa_date)
    		
    
	
}).controller('sponsor_message',function ($scope,activity_data,$location,anchorScroll) {//赞助单页--留言
	 anchorScroll.toView('#tracing_point', true);
	var message_i={}//留言参过去的参数
	message_i.pageIndex=1;
	message_i.pageSize=100
	message_i.source_id=$scope.id
	
	$scope.leave_message={ 
		  "me_txt_length":"",	
		  "message_date":[],//留言数据查询
		  "message_p":function(data){//活动详情--留言
		  activity_data.comment_list(data).then(
		    		function success(data){    		
		    		    if(data.code!=0){
		    		    	 mui.alert(data.msg, 'E场景活动');
		    		    	 return
		    		    }
		    		    $(data.rows).map(function(){
		    		    	var thg=new comment_list_f(this)
		    		    	$scope.leave_message.message_date.push(thg)
		    		    })
		    		   
		    		}, function error() {
						console.log("获取报名数据失败");
		    }); 
		  
	  },"message":function(id){
		  $scope.me_id=id
	      mui('#message').popover('toggle');
		  $(".me_text_area").focus()
		
		  
	  },"add_comment_data":function(data){
		  activity_data.add_comment_data(data).then(
		    		function success(data){    		
		    		    if(data.code!=0){
		    		    	mui('#message').popover('toggle');
		    		    	  $location.path("signin")
		    		    	 mui.alert(data.msg, 'E场景活动');
		    		    	 return
		    		    }
		    		    mui('#message').popover('toggle');
		    		    location.reload()
		    		}, function error() {
						console.log("插入留言失败");
		    }); 
	  },"comment":function(type){//提交评论
		  var are_po=$(".me_text_area").val().trim()
		  if(!form_mm.isnull(are_po)){
				mui.alert('留言不能为空', 'E场景活动',function(){
					$(".me_text_area").focus()
				});
				return
			}
		  var date_po={}
		  if($scope.me_id==0){
			  date_po.source_id=$scope.id
		
		  }else{
			  date_po.superior=$scope.me_id
		  }
		  date_po.comment_type=1
		  date_po.comment_content=$(".me_text_area").val()
		  this.add_comment_data(date_po)
		   
	  }
	
	}
	$scope.leave_message.message_p(message_i)
	
    $(".act_tble_a .zd").removeClass("act_poi");
    $(".act_tble_a .zd").eq(2).addClass("act_poi");
    $(".progress_of").css({"left":"66%"});
	
}).controller('sponsorship_return',["$scope","activity_data","$location","$stateParams","act_date",function($scope,activity_data,$location,$stateParams,act_date) { //赞助单页--赞助详情
    $scope.date_p=act_date.date;
    console.log($scope.date_p)
    $(".re_amount").text($scope.date_p.amount)
    $("html,body").animate({scrollTop:0},200);//滚回顶部
    if($scope.date_p==0){
		 window.history.back();
		 return
	}
  
    $scope.ticket_types={
    		"number_of":1,
    		"add_poi":function(type){
    	        if(type==1&&this.number_of<10){
    	        	this.number_of++;    	   
    	        }else if(type==2&&this.number_of>1){
    	        	this.number_of--
    	        }
    	        $(".re_amount").text(this.number_of*$scope.date_p.amount)
    		},"submit":function(){
    			var name=$("#name").val().trim(),
    			tel=$("#tel").val().trim()
    			if(!form_mm.isnull(name)){
    				mui.alert('请输入姓名', 'E场景活动',function(){
    					$("#name").focus()
    				});
    				return
    			}
    			if(!form_mm.isnull(tel)){
    				mui.alert('请输入电话', 'E场景活动',function(){
    					$("#tel").focus()
    				});
    				return
    			}
    			var  data_sp={},//提交到后台数据
    			data_po={},//后台数据加上包体
    			repay_from={}//表单数据
    			repay_from.name=name;
    			repay_from.tel=tel;
    			data_sp.activity_support_id=$scope.date_p.as_id;//赞助id
    			data_sp.repay_id=$scope.date_p.sr_id;//回报id
    			data_sp.num=this.number_of;//张数
    			data_sp.content_detail=repay_from;//表单
    			data_sp.amount=$scope.date_p.amount*data_sp.num;//金额 
    			data_po.data=data_sp
    			data_po=JSON.stringify(data_po)
    			console.log(data_po)
    			var url="https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}?data={2}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";		
    	        url = url.replace('{0}','wxca4f9653c04f3e8d').replace('{1}','http://m.apptown.cn/wechat/support_pay_h5').replace('{2}',data_po);
    			window.location.href=encodeURI(encodeURI(url));
    			 
    		}
    }
     
}]).controller('activity_success',["$scope","activity_data","$location","$stateParams","act_date",function($scope,activity_data,$location,$stateParams,act_date) { 
	var data_po={}
	data_po.order_id=$stateParams.t_id
	$scope.t_id=data_po.order_id
	activity_data.getDatas('GET', '/consumption/get_buy_ticket_info',data_po)
	 .then(function(data) {
		   $scope.date_poi=data.info
	 }); 
	
	
}]).controller('activity_streamingCtrl',function($scope,activity_data,$location,$stateParams,act_date){
	   $scope.id_p=$stateParams.ac_id;
	   $scope.count=$stateParams.count
	   var player=""
	  activity_data.getDatas('GET', '/Live/query_live_info?activity_id='+$scope.id_p)
	  .then(function(data) {
		 if(data.code!=0){
			 return
		 }
		   // 初始化播放器
		      player = new prismplayer({
		        id: "J_prismPlayer", // 容器id
		        source: data.info.live_url_str.liveurl_m3u8,// 视频地址
		        autoplay: false,    //自动播放：否
		        isLive:true,  //是否是直播
		        width: "100%",       // 播放器宽度
		        height: "200px",      // 播放器高度
		        waterMark:"/img/sylogo.png|TL|0.15|0.5" 
		    });
	 }); 

		    $("html,body").animate({scrollTop:0},200);
	
		   $("body").on("click",".nagf_ssd span",function(){
			   $(".nagf_ssd span").removeClass("act")
			   $(this).addClass("act")
		   })
		   $scope.play=function(){
			   player.play();
			   $(".syuytrt_as").hide()
		   }
}).controller('test_listCtrl',function($scope,activity_data,$location,$stateParams,act_date){
	
})






