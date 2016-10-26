/**
 * 指令
 */
  (function(){
 angular.module('directive_mml', ["activity_servrt","ui.router"])
 .run(function($rootScope,messageService,activity_data,$location, $state, httpService){  
	 $rootScope.mode={"the_menu":function(){
		 $(".menu_pup,.filiuyt_o").toggleClass("show_a")
		 
	 }} 
	 $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams){//路由跳转触发
		$(".menu_pup,.filiuyt_o").removeClass("show_a");
		$(".return_top").addClass("mui-hidden");
		$(".bg_loading").remove()
		
        /* 
         * 张晗
         * 顶部导航搜索图标显示隐藏
         */
        $rootScope.previousState = from.name;
        $rootScope.previousParams = fromParams;
        $rootScope.currentState = to.name;
        if($location.path() == '/index') {
            $('.j-navSearchIcon').show();
           
        } else {
          $('.j-navSearchIcon').hide();
      	  $(".ds_poiu_a").removeClass("show_a");
    	  $(".retreat_icon").removeClass("none");
        }
    
        
        
        var path_p=$location.path();
        var arr_p=["activity_streaming","activity_detail","activity_charge","b_map"];
   
        for(var i in arr_p){
        	if(path_p.indexOf(arr_p[i])>0) {
             	$(".mml_bottom").hide();
             	return
             } 
        }
        $(".mml_bottom").show().css({"opacity":"1"}); 
        /*$(arr_p).map(function(){
        	 if(path_p.indexOf(this)>0) {
             	$(".mml_bottom").hide();
             }else{
             	$(".mml_bottom").show();
             }
        })*/
       
        
	 });

    // 获取用户登录状态
    $rootScope.isLogin = function(url,ty){
        httpService.getDatas('GET', '/user/verifyUserLogin').then(function(data) {
            if(data.code!=0&&data.code!=-1){
            	if(ty==1){ 
            		window.location.href="/user/h5_wechat_login_page?key=0"
            		return
            	}
                messageService.show('您还未登录！');
                $state.go("signin");
            } else {
            	
                $state.go(url);
            } 
        });
    } 



 })
.directive('finish', function ($timeout) {//轮播图遍历完之后执行
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngfinish');
               	 $("img.lazy").lazyload({threshold : 200, effect : "fadeIn"}); 
                });
            }
        }
    };
}).directive('pulllist', function () { //下拉列表
    return {
        restrict: 'AE',
        scope: {
            callback: '&'
        },
        link: function(scope,ele,attr,ctrl){
        	/*html渲染 最外层div要高度*/
        /*	<div id="test" pulllist callback="paging()"  class="ulact_p nitialize" ng-click="">
        		<ul>   ul自定定义
        	   		<li></li>
        		</ul>
        	</div>*/
              $(ele).addClass("scoller_p")
        	  var  poiu_po=true,//防止用户多次下拉
        	  myscroll = new iScroll(attr.id,{
        		  vScrollbar: false,
        		  doubleTapZoom: 10, //双触放大几倍  
        		  onScrollStart:function(){
        			  this.refresh();//刷新 
        			  $(".mml_bottom,.list_activities,.guide_K").css({"opacity":"0"});
        			  // console.log(this.y);
        			  
        		  },
        		  onScrollEnd: function(){
        			  $(".mml_bottom,.list_activities,.guide_K").css({"opacity":"1"});
        			  if(this.y<0){
        				  $(".return_top").removeClass("mui-hidden");
        				
        			  }else{ 
        				  $(".return_top").addClass("mui-hidden");
        			  }
        		  if(this.y == this.maxScrollY&&poiu_po){
        			  poiu_po=false;
        			  $(".sys-loading").addClass("show_a");
        			  	poiu_po=true;
        			  	scope.callback();
        			  	$("#"+attr.id).click();
        			  	$(".sys-loading").removeClass("show_a")
        		
        		  	}
        		  }
        	  });       
        }
    };
}).directive('swift', function () { //轮播图图  
	/*html调用
	 *  <section swift banner='/activity/banner_activity'></section>  
	 *  
	 *  /activity/banner_activity==banner接口地址
	 * */
    return {
        restrict: 'AE',
        scope: {
        	br: '@banner',
        	hf:"@ulr"
        }, 
        template: '<section class="banner_top_a"><section class="swiper-container banner_top_b banner_top_b_banner"><section class="swiper-wrapper"><section class="swiper-slide" ng-repeat="banner in banner_index"><a ng-href={{banner.href_i}}><img ng-src="{{banner.banner_url[0]}}"  class="lazy"></a></section></section><section class="swiper-pagination"></section></section></section>', 
        controller:function($scope,httpService){ 
        
        	$scope.banner_index=[]
        	httpService.getDatas('get', $scope.br).then(function(data) {
        		if(data.code!=0){
					return;
				}
				$(data.info).map(function(){
					if(this.activity_banner_url==null){
						return
					}
					var bandata= new indexbanner(this.activity_id,this.activity_banner_url,$scope.hf)
					$scope.banner_index.push(bandata)
				
				})
				 
             });
        }, 
        link: function(scope,ele,attr,ctrl){ 
        	var mySwiper = new Swiper('.banner_top_b_banner',{
	             autoplay : 3000,//自动滑动 滚动速度
	             observer: true,//修改swiper自己或子元素时，自动初始化swiper
	             observeParents: true,//修改swiper的父元素时，自动初始化swiper
	             pagination : '.swiper-pagination',//分页器的class的名字
	             paginationClickable :true,//点击标题跳转到指定的那页
	      });
        }
    };
}).directive('upimg', function () { //上传图片
    return {
        restrict: 'AECM',
        scope: {
        	br: '@banner'
        }, 
        transclude:true,
        template: ' <div id="iconFile" class="f_q"><p class="schedule_p"></p></div>',
        replace: true,
        controller:function($scope,httpService){
        	var uploader = WebUploader.create({
        	    // 选完文件后，是否自动上传。
        	    auto: true,
 
        	    // swf文件路径
        	    swf: '/Uploader.swf',

        	    // 文件接收服务端。 
        	    server: '/sponsor/sponsor_icon_upload_byuser',
        	    fileVal:"iconFile",
        	    // 选择文件的按钮。可选。
        	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        	    pick: '#iconFile',

        	    // 只允许选择图片文件。
        	    accept: {
        	        title: 'Images',
        	        extensions: 'gif,jpg,jpeg,bmp,png',
        	        mimeTypes: 'image/*'
        	    }
        	});
        	// 文件上传过程中创建进度条实时显示。
        	uploader.on( 'uploadProgress', function( file, percentage ) {
        		if($(".image_ad").attr("data-type")==1){
        			return
        		}
        	    $(".schedule_p").css({"width":percentage*100})
        	});

        	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
        	uploader.on( 'uploadSuccess', function( file,data ) {  //data后台返回的数据
        	      if($(".image_ad").attr("data-type")==1){
                  	alert(data.msg)
                  	return 
                  }
                  
        	    $(".schedule_p").css({"width":0}) 
        	    $("#iconFile .webuploader-pick").css({"background":"url("+data.msg+")","background-size":"100% 100%"})
        	    $("#iconFile").attr("data-url",data.msg);
                var el = $('#iconFile').next('input[type="hidden"]');
                if(el.length > 0) { 
                    el.val(data.msg);
                }
              
          
                
        	});
        }, 
        link: function(scope,ele,attr,ctrl){
        
        }
    };
}).directive('eliminate', function () {//点击叉叉清空  
    return {
        restrict: 'AE',
        link: function(scope,ele,attr){
        	$(ele).parent().css({"position":"relative"})
           $(ele).after('<span class="mui-icon mui-icon-clear victory zc fz20 mui-hidden"></span>');
           $(".victory").on("tap",function(){
        	   $(this).prev().focus().val('')
        	   $(this).addClass("mui-hidden")
           })
           $(ele).on("focus",function(){
        	   if($(this).val().length>0){
        		   $(this).next().removeClass("mui-hidden")
        	   }
           })
             $(ele).on("keyup",function(){
            	 if($(this).val().length>0){
          		   $(this).next().removeClass("mui-hidden")
          	   }else{
          		 $(this).next().addClass("mui-hidden")
          	   }
             })
           $(ele).on("blur",function(){
        	   $(ele).next().addClass("mui-hidden")
           })
        }
    };
}).directive('href', function () { //跳转制定的页面
     return {
         restrict: 'AE',
         link: function(scope,ele,attr){
             ele.on('click',function(e){
            	 /*阻止触发时间冒泡*/
                 e.preventDefault();
                 e.stopPropagation();
                 var this_href=$(this).attr("data-href")
                 window.location.href=this_href;
             });
         }
     };
 }).directive('retup', function () { //跳转制定的页面
     return {
         restrict: 'AE',
         link: function(scope,ele,attr){
             ele.on('click',function(e){
            	 /*阻止触发时间冒泡*/
                 e.preventDefault();
                 e.stopPropagation(); 
                 $(".scoller_p ul").css({"transform": "translate(0px, 0px) scale(1) translateZ(0px)"})
                 $(this).addClass("mui-hidden")
                 $("html,body").animate({scrollTop:0},200);
             });
         }
     };
 }).directive('isloadp', function () { //判断是否登录
     return {
         restrict: 'AE',
         link: function(scope,ele,attr){
             ele.on('click',function(e){
            	 /*阻止触发时间冒泡*/
                 e.preventDefault();
                 e.stopPropagation();
                 var this_href=$(this).attr("data-href")
                 window.location.href=this_href;
             });
         }
     };
 }).directive('time', function () { //时间初始化
     return {
         restrict: 'AE',
         link: function(scope,ele,attr){
             ele.on('tap',function(e){
            	 /*阻止触发时间冒泡*/
                 e.preventDefault();
                 e.stopPropagation();
                 $(".mui-dtpicker").remove()
                 var dtPicker = new mui.DtPicker();
                 dtPicker.show(function (rs) {
                	 $(ele).find("input").val(rs.text)
                 })
                 
             });
         }
     };
 }).directive('industry', function () { //行业下拉框
     return {
         restrict: 'AE',
         link: function(scope,ele,attr){
             ele.on('tap',function(e){
            	
            	 /*阻止触发时间冒泡*/
                 e.preventDefault(); 
                 e.stopPropagation();
                 $(".mui-poppicker").remove()
                 var picker_c = new mui.PopPicker(),
                 classify=classify_p();
                 mjgh=classify[1].maker_title.splice(1,classify[1].maker_title.length); 
            	 picker_c.setData(mjgh);
             	 picker_c.show(function (rl) {
                    $(ele).find("input").val(rl[0].text);
                    $(ele).find("input").attr("data-id",rl[0].id);
                    // 判断是否有id值
                    if(rl[0].id && ($(ele).find('input[type="hidden"]').length > 0)) {
                        $(ele).find('input[type="hidden"]').val(rl[0].id);
                    }
             	})
             });
         }
     };
 }).directive('acttpe', function () { //活动类型下拉框
     return {
         restrict: 'AE',
         link: function(scope,ele,attr){
             ele.on('tap',function(e){
            	
            /*	 阻止触发时间冒泡*/
                 e.preventDefault(); 
                 e.stopPropagation();
                 $(".mui-poppicker").remove()
                 var a_type = new mui.PopPicker(),
                 classify=classify_p();
                 mjgh=classify[0].maker_title.splice(1,classify[0].maker_title.length); 
                 a_type.setData(mjgh);
                 a_type.show(function (rl) { 
                     $(ele).find("input").val(rl[0].text) 
                     $(ele).find("input").attr("data-id",rl[0].id)
             	})
             });
         }
     };
 }).directive('select', function () { //自定义下拉框   
     return {
         restrict: 'AE',
         link: function(scope,ele,attr){
             ele.on('tap',function(e){
            	 /*自定义格式 [{"id":"1","text":"4454"}]*/
            	 /*阻止触发时间冒泡*/
                 e.preventDefault();
                 e.stopPropagation();
                 $(".mui-poppicker").remove()
                 var picker_c = new mui.PopPicker(),
                 classify=classify_p();
                 mjgh=$.parseJSON(attr.ar); 
            	 picker_c.setData(mjgh);
             	 picker_c.show(function (rl) {
                     $(ele).find("input").val(rl[0].text) 
                     $(ele).find("input").attr("data-id",rl[0].id)
             	})
             });
         }
     };
 }).directive('city', function () { //城市下拉框
     return {
         restrict: 'AE',
         link: function(scope,ele,attr){
             ele.on('tap',function(e){
            	 /*阻止触发时间冒泡*/
                 e.preventDefault();
                 e.stopPropagation();
                 $(".mui-poppicker").remove()
                 var picker= new mui.PopPicker({"layer":[2]});
                 picker.setData(cityData);
                 picker.show(function (rl) {
        	 		 $(ele).find("input").val(rl[0].text+rl[1].text)
        	 		 $(ele).find("input").attr("data-id",rl[1].id)
                 })
                 
             });
         }
     };
 }).directive('citySelect', function () { //城市下拉框(发起活动)
     return {
         restrict: 'AE',
         link: function(scope,ele,attr){
             ele.on('tap',function(e){
            	 /*阻止触发时间冒泡*/
                 e.preventDefault();
                 e.stopPropagation();
                 $(".mui-poppicker").remove()
                 var picker= new mui.PopPicker({"layer":[2]});
                 picker.setData(cityData);
                 picker.show(function (rl) {
        	 		 $("#city").val(rl[0].text+rl[1].text)
        	 		 $("#city").attr("data-id",rl[1].id)
                 })
                 
             });
         }
     };
 })
 .directive("back", function() {
     return {
         restrict: "AE",
         link: function(t, e) {
             e.on("click",
                 function(t) {
                     t.preventDefault(),
                         window.history.back();
                 })
         }
     }
 }).filter("win_hao",function(){//自定义过滤器  去掉双号
     return function(x){
    	  var reg = new RegExp('"', 'g'); // 创建正则RegExp对象
    	  x = x.replace(reg, "");
         return x
     }
 }).filter('to_trusted', ['$sce', function ($sce) {  
	   return function (text) {  //输入HTml 
	       return $sce.trustAsHtml(text); 
	   }
}]).filter("getDateDiff",function(){//多长时间前
    return function(dateTimeStamp){
   	    var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var year = month * 12;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){
            //若日期不符则弹出窗口告之
            //alert("结束日期不能小于开始日期！");
        }
        var yearC = diffValue/year;
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;

        if(yearC>=1) {
            result=parseInt(yearC) + "年前";
        } else if(monthC>=1){
            result=parseInt(monthC) + "个月前";
        }
        else if(weekC>=1){
            result=parseInt(weekC) + "周前";
        }
        else if(dayC>=1){
            result=parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            result=parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
            result=parseInt(minC) +"分钟前";
        }else
            result="刚刚发表";
        return result;
   }
}).filter("reduce_time",function(){//剩余天数
    return function(dateTimeStamp){
    	 var minute = 1000 * 60;
         var hour = minute * 60;
         var day = hour * 24;
         var halfamonth = day * 15;
         var month = day * 30;
         var now = new Date().getTime();
         var diffValue =dateTimeStamp-now;
         if(diffValue < 0){
             //若日期不符则弹出窗口告之
             //alert("结束日期不能小于开始日期！");
         }
         var monthC =diffValue/month;
         var weekC =diffValue/(7*day);
         var dayC =diffValue/day;
         var hourC =diffValue/hour;
         var minC =diffValue/minute;
         if(monthC>=1){
             result=parseInt(monthC) + "个月";
         }
         else if(weekC>=1){
             result=parseInt(weekC) + "周";
         }
         else if(dayC>=1){
             result=parseInt(dayC) +"天";
         }
         else if(hourC>=1){
             result=parseInt(hourC) +"小时";
         }
         else if(minC>=1){
             result=parseInt(minC) +"分钟";
         }else
             result="已结束";
         return result;
   }
}).factory('anchorScroll', function () {//锚点 跳转到指定的id
    function toView(element, top, height) {
        var winHeight = $(window).height();

        element = $(element);
        height = height > 0 ? height : winHeight / 10;
        $('html, body').animate({
            scrollTop: top ? (element.offset().top - height) : (element.offset().top + element.outerHeight() + height - winHeight)
        }, {
            duration: 200,
            easing: 'linear',
            complete: function () {
                if (!inView(element)) {
                    element[0].scrollIntoView( !! top);
                }
            }
        });
    }

    function inView(element) {
        element = $(element);

        var win = $(window),
            winHeight = win.height(),
            eleTop = element.offset().top,
            eleHeight = element.outerHeight(),
            viewTop = win.scrollTop(),
            viewBottom = viewTop + winHeight;

        function isInView(middle) {
            return middle > viewTop && middle < viewBottom;
        }

        if (isInView(eleTop + (eleHeight > winHeight ? winHeight : eleHeight) / 2)) {
            return true;
        } else if (eleHeight > winHeight) {
            return isInView(eleTop + eleHeight - winHeight / 2);
        } else {
            return false;
        }
    }

    return {
        toView: toView,
        inView: inView
    };
}).factory('act_date',function(){
    return {
    	date:0,
        set_act_date:function(msg){
            this.date=msg
        }
    }
}).factory('MyData', function($websocket) {
    // Open a WebSocket connection
    var dataStream = $websocket('ws://'+window.location.hostname+'/webSocketServer');
    var collection = [],q_random=Math.floor(Math.random()*99999+1) ;
    var hjkh=false;
    dataStream.onMessage(function(message) {
    	/*collection.push(JSON.parse(message.data));*/
    	console.info(message.data);
    	var iiuyh_p=JSON.parse(message.data)
    	if(iiuyh_p!=""&&hjkh){
    		mui('#share_pp').popover('toggle'); 
    		setTimeout(function(){
    			mui('#share_pp').popover('toggle'); 
    		},6000)	
    		var device_rooted=document.getElementById("player_p");//播放签到成功音效
			device_rooted.play()//播放
    	}
    	hjkh=true
    					
    	$(iiuyh_p).map(function(){
    		collection.unshift(this)
    	}) 
    	$(".yuyt_poiu").text(collection.length)
    });
    var methods = {
      act_id:0,		
      collection: collection,
      get: function() {
        dataStream.send(this.act_id+"#"+q_random);
      }
    };
    
     return methods;
  }).filter("e_nam",function(){//姓名为空的时候返回默认值
	    return function(x){
	       if(x==""){
	    	   x="匿名"
	       }
	       return x
	    }
  })
	    
 
 })();