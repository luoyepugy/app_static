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
		
        /* 
         * 张晗
         * 顶部导航搜索图标显示隐藏
         */
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
        if($location.path() == '/index') {
            $('.j-navSearchIcon').show();
        } else {
            $('.j-navSearchIcon').hide();
        }
        var path_p=$location.path();
        var arr_p=["activity_streaming","activity_detail","activity_charge"];
        $(arr_p).map(function(){
        	 if(path_p.indexOf(this)>0) {
             	$(".mml_bottom").hide();
             }else{
             	$(".mml_bottom").show();
             }
        })
       
        
	 });

    // 获取用户登录状态
    $rootScope.isLogin = function(url){
        httpService.getDatas('GET', '/user/verifyUserLogin').then(function(data) {
            if(data.code!=0&&data.code!=-1){
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
        /*	<div id="test" pulllist='paging()'  class="ulact_p nitialize" ng-click="">
        		<ul>   ul自定定义
        	   		<li></li>
        		</ul>
        	</div>*/
       
        	  var  poiu_po=true,//防止用户多次下拉
        	  myscroll = new iScroll(attr.id,{
        		  vScrollbar: false,
        		  doubleTapZoom: 10, //双触放大几倍  
        		  onScrollStart:function(){
        			  this.refresh();//刷新 
        			  $(".mml_bottom").css({"opacity":"0"});
        			  console.log(this.y);
        			  
        		  },
        		  onScrollEnd: function(){
        			  $(".mml_bottom").css({"opacity":"1"});
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
                 $("#scroll").css({"transform": "translate(0px, 0px) scale(1) translateZ(0px)"})
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
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
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
});
 
 })();