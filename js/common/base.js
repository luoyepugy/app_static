/**
 * Created by Administrator on 2015/7/17.
 */

    var mml=mml();
    var v_p="4.0";//设置js 的版本号
	/*优化js加载*/
	var asyncAdd=(function(){
	 	       var head=document.head,script;
	 	       return function(src){
	 	           script=document.createElement('script');
	 	           script.src=src+"?v="+v_p;
	 	           script.async=false;
	 	           document.body.appendChild(script)
	 	       }
	})();

function mml(){
    return{
    	/*整数*/
    	/**
    	 * x==数字
    	 */
    	num:function (x){
    		
    		if(x!=""){
    			   var type = /^[0-9]*[1-9][0-9]*$/;
    	            var re = new RegExp(type);
    	            if (x.match(re) == null) {
    	                return false;
    	            }
    		}
         
            return true;
        },
       /* 验证字符串*/
        slength:function(x){       	
        	var reg = /^[\u4E00-\u9FA5]+$/; 
        	var styl;
        	if(reg.test(x.replace(/^(\s|\u00A0)+/,''))){ 
        		styl=x.length
        	}else{
        		styl=0
        	} 
        	return styl;
        },
       /* 验证字符串的长度和空字符*/
        lengnull:function(x){
        	var lnull=true;
        	if(x==""||x==undefined||x==null){
        		lnull=false;
        	}
        	return lnull;
        },
        /*数组是否有空值*/
        arrgynull:function(x){
        	var arrl=true;
        	for(var i=0;i<$(x).length;i++){
        		if($(x).eq(i).val()==""||$(x).eq(i).val()==undefined||$(x).eq(i).val()==null||$(x).eq(i).val().length<1){
        			$(x).eq(i).focus();
        			arrl=false;
            	}
        	}
        	return arrl;
        },
        
     
      /* 验证邮箱*/
        email:function(x){  
        	var bool = true;
        	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        	if(!reg.test(x)){
        		bool = false;
        	}
        	return bool;
        },

        /*身份证验证*/
        isCardNo:function(num){
        	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
        	   if(reg.test(num) === false)  
        	   {  
        	       mml.pup_ti("身份证输入不合法","0");  
        	       return  false;  
        	   }  
             return true;
        },
        
       
        /*提示层*/
        /**
         * x==提示内容
         * y==0，错误警告。1，正确提示
         */
        pup_ti:function(x,y){
        	if(y==0){
        	    $(".pup-ti").remove()
                $("body").append('<p class="pup-ti" style="width: 100%;text-align: center;position: fixed;left: 0;top: 50%;z-index: 500"><span style="padding: 10px 30px;background: red;font-size: 18px;border-radius: 30px;color: #FFFFFF">'+x+'</span></p>')
            	$(".pup-ti").animate({"marginTop":"-100px"},2000)
            	setTimeout(function(){
            		$(".pup-ti").remove()
            	},2600);
        	}else if(y==1){
        		 $(".pup-ti").remove()
                 $("body").append('<p class="pup-ti" style="width: 100%;text-align: center;position: fixed;left: 0;top: 50%;z-index: 500"><span style="padding: 10px 30px;background: #0085cc;font-size: 18px;border-radius: 30px;color: #FFFFFF">'+x+'</span></p>')
             	 $(".pup-ti").animate({"marginTop":"-100px"},2000)
             	setTimeout(function(){
            		$(".pup-ti").remove()
            	},2600);
        	}	
        },
        /*确认取消提示层*/
        /**
         * x==提示内容
         * y==确定自定义方法
         * z==取消自定义方法
         */
   
        pup_su:function(x,y,z){
        	$("body").append('<div id="maskbg" class="maskbg" style="display: block;z-index:99999"></div> <section class="success deletehint" style="height:auto"><h5 style="font-size: 18px;">注意</h5><p style="font-size: 14px;">'+x+'</p><section class="sucButton" style="font-size: 18px;"><ul><li class="deleteNo">取消</li><li class="deleteYes">确定</li></ul></section></section>')
            $(".deleteYes").on("click",function(){
            	 try{
            	  y()
            	}catch(e){}
            	$(".maskbg,.deletehint").remove()
            })
             $(".deleteNo").on("click",function(){
            	 try{
            		 z() 
            	 }catch(e){}
            	
                $(".maskbg,.deletehint").remove()
            })
        },
        
       /* 底部弹出层*/
        /**
         * x==标题  可以为空
         * y==标签
         * z==自定义方法
         */
        pup_buttom:function(x,y,z){
        	$("body").append('<section class="pup-externum "></section><section class="pup-input-text a-fadeinB"><p class="pup_plk"><span>'+x+'</span> <label class="pup_close"></label></p> <section class="pup-input-jhg-p">'+y+'</section></section>');
            $(".pup_close,.pup-externum ").on("click",function(){
            	$(".pup-externum").remove();
            	$(".pup-input-text").addClass("a-fadeoutB");
                 setTimeout(function(){
                     $(".pup-input-text").remove();
                 },500);
            })
            try{
            	z();
            }catch(e){}
        	
        },
      /*  活动右边弹出层*/
        pup_act_right:function(x,y,z){
          $(".fabuBottomButton").hide();
          $(".set-form-config").remove();
          $("body").append('<section class="set-form-config mml_left" id="set-form-config"><nav class="top-sav"><p>'+x+'</p><div class="bgreturn"><a></a></div> </nav>'+y+'</section>')
          z();
          $(".bgreturn").off("click").on("click",function(){
        	  $(".fabuBottomButton").show();
        	  $(".set-form-config").remove();
          })
           $("body,html").animate({scrollTop:0},200);
          
        },
        
        /*图片放大弹出层*/
        pup_icon:function(x){
        	   $(x).off("click").on("click",function(){
        	       var imgsrc=$(this).attr("src");//获取点击图片的路径
        	       $("body").append('<section class="pup_img"><span class="center_po"></span> <img src="'+imgsrc+'" class="pup_img_a"></section>')
        	       setTimeout(function(){
        	           $(".pup_img").addClass("pup_img_gr")
        	       },200)
        	       $(".pup_img").on("click",function(){
        	           $(this).remove()
        	       })
        	   })
        },
        
       
        /* 时间对比*/
        /**
         * x=结束时间
         * y=开始时间
         */
        time_compare:function(x,y,z){
        	 var str =x;
     	    str = str.replace(/-/g,"/");
     	    var stry =y;
     	    stry = stry.replace(/-/g,"/");
     	    var date = new Date(str);//前台传过来的时间
     	    var newdate=new Date(stry);//前台传过来的时间
     	    var timeda=newdate.getTime()-date.getTime();
     	    var timedatrue=true; 
     	    if(timeda>0){
     	    	timedatrue=false
     	    }
     	    return timedatrue;
             
        },
        /* 时间对比  当前时间*/
        
        time_compare_new:function(x){
        	var str =x;
     	    str = str.replace(/-/g,"/");
     	    var date = new Date(str);//前台传过来的时间
     	    var newdate=new Date();//系统时间
     	    var timeda=newdate.getTime()-date.getTime();
     	    var timedatrue=true; 
     	    if(timeda>0){
     	    	timedatrue=false
     	    }
     	    return timedatrue;
        },
        /*时间戳对比当前时间*/
        time_compare_new_kl:function(x){
        	var date = new Date();//前台传过来的时间
        	date.setTime(x)
        	var newdate=new Date();//系统时间
        	var timeda=newdate.getTime()-date.getTime();
        	var timedatrue=true;
        	if(timeda>0){
        		timedatrue=false
        	}
        return timedatrue;
      },
        
        
        
        
        /*时间对比，两个时间对比*/
        time_db_two:function(x,y){
        	    var str =x;
        	    str = str.replace(/-/g,"/");
        	    var stry =y;
        	    stry = stry.replace(/-/g,"/");
        	    var date = new Date(str);//前台传过来的时间
        	    var newdate=new Date(stry);//前台传过来的时间
        	    var timeda=newdate.getTime()-date.getTime();
        	    var timedatrue=true; 
        	    if(timeda>0){
        	    	timedatrue=false
        	    }
        	    return timedatrue;
        },
        
      /*  几分钟前，几小时前*/
        /**
         * dateTimeStamp==发表时间的时间戳
         */
        getDateDiff:function(dateTimeStamp){
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
        },
        getDateDiffxf:function(dateTimeStamp){
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
                result="剩余"+parseInt(monthC) + "个月";
            }
            else if(weekC>=1){
                result="剩余"+parseInt(weekC) + "周";
            }
            else if(dayC>=1){
                result="剩余"+parseInt(dayC) +"天";
            }
            else if(hourC>=1){
                result="剩余"+parseInt(hourC) +"小时";
            }
            else if(minC>=1){
                result="剩余"+parseInt(minC) +"分钟";
            }else
                result="已结束";
            return result;
       },
        substring_m:function(x){
        	x=x.substring(0,x.length-1);
        	return x+"]"
        },
        
        
        /**
         * x==url地址
         * y==data
         * m=success执行的方法
         * n=error执行的方法
         * p=complete执行的方法
         * q=加载前执行的方法
         * 
         * z=contentType类型
         */
        Ajax:function(x,y,m,n,q,p){
            $.ajax({
                type : 'POST',
                url : x,
                data : y,
                contentType :"application/x-www-form-urlencoded; charset=UTF-8",
                dataType : "json",
                success : function(data) {
                    m(data)
                },
                error : function(res) {
                	mml.pup_ti("请求后台失败!")
                    n(res)
                },
                beforeSend:function(res){
                	try{
                		   q(res)
                	}catch(e){}
                 
                },
                complete : function() {
                    /*p()*/
                }
            });
        },
        
        
        
        

        /**
         * x==url地址
         * y==data
         * m=success执行的方法
         * n=error执行的方法
         * p=complete执行的方法
         * q=加载前执行的方法
         * 
         * z=contentType类型
         */
        j_Ajax:function(x,y,m,n,q,p){
            $.ajax({
                type : 'POST',
                url : x,
                data : y,
                contentType :"application/json; charset=UTF-8",
                dataType : "json",
                success : function(data) {
                    m(data)
                },
                error : function(res) {
                	mml.pup_ti("请求后台失败!")
                    n(res)
                },
                beforeSend:function(res){
                	try{
                		   q(res)
                	}catch(e){}
                 
                },
                complete : function() {
                    /*p()*/
                }
            });
        },
        
        
        /*获取本地json文件*/
        ajax:function(x,y){
        	$.ajax({
        		type : 'get',
        		url : x,
        		data : "",
        		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        		dataType : 'json',
        		success : function(data) {
        		   y(data)
        		},
        		error : function(res) {
        		/*	alert(res)*/
        		},
        		complete : function() {

        		}
        	});
        },
        /*时间插件*/
        /**
         * x==时间输入到该控件
         */
        time_mhj:function(x){

        	var systemDate = new Date();
        	var s_Year=systemDate.getYear();
        	var s_Month=systemDate.getMonth();
        	var s_data=systemDate.getDate()-1;
        	var s_Hours=systemDate.getHours();
        	var s_Minutes=systemDate.getMinutes();
        	var yea = "", yas = s_Year-110;//时间取值
            var month = "", mon = s_Month;//月份取值
            var data = "", da = s_data;//天数
            var Hour = "", hr = s_Hours//小时
            var Minute = "", mte = s_Minutes//分钟
            for (var y = 2010; y < 2020; y++) {
                yea += '<section class="swiper-slide" data-time='+y+'>' + y + "年</section>"
            }
            
            for (var m = 1; m <= 12; m++) {
                m < 10 ? m = "0" + m : m
                month += '<section class="swiper-slide" data-time='+m+'>' + m + "月</section>"
            }
            for (var d = 1; d <= 31; d++) {
                d < 10 ? d = "0" + d : d
                data += '<section class="swiper-slide" data-time='+d+'>' + d + "日</section>"
            }
            for (var h = 0; h <= 23; h++) {
                h < 10 ? h = "0" + h : h
                Hour += '<section class="swiper-slide" data-time='+h+'>' + h + "时</section>"
            }
            for (var M = 0; M < 60; M++) {
                M < 10 ? M = "0" + M : M
                Minute += '<section class="swiper-slide" data-time='+M+'>' + M + "分</section>"
            }
            
            
            $(".swiper-wrapper-year").append(yea)
            $(".swiper-wrapper-month").append(month)
            $(".swiper-wrapper-data").append(data)
            $(".swiper-wrapper-Hour").append(Hour)
            $(".swiper-wrapper-Minute").append(Minute)
            var time_year = new Swiper('#time-year', {
                  centeredSlides: true,
                  slidesPerView : 3,//'一页显示4个'
            	  direction: 'vertical',
            	  mousewheelControl : true,
            	  onSlideChangeStart:function(swiper){
            		  yas=time_year.activeIndex
            		 
            		 
            	  }
            })
            var time_month = new Swiper('#time-month', {
                centeredSlides: true,
                slidesPerView : 3,//'一页显示4个'
          	    direction: 'vertical',
          	    mousewheelControl : true,
          	    onSlideChangeStart:function(swiper){
          	    	mon=time_month.activeIndex
          	    	
          	   }
          })  
           var time_data = new Swiper('#time-data', {
                centeredSlides: true,
                slidesPerView : 3,//'一页显示4个'
          	  direction: 'vertical',
          	  mousewheelControl : true,
          	  onSlideChangeStart:function(swiper){
          		 da=time_data.activeIndex
          		
          	  }
          })
            
            var time_Hour = new Swiper('#time-Hour', {
                centeredSlides: true,
                slidesPerView : 3,//'一页显示4个'
          	    direction: 'vertical',
          	    mousewheelControl : true,
          	    onSlideChangeStart:function(swiper){
          	    	hr=time_Hour.activeIndex
          	    	
          	  }
          })
            
            var time_Minute = new Swiper('#time-Minute', {
                centeredSlides: true,
                slidesPerView : 3,//'一页显示4个'
          	    direction: 'vertical',
          	    mousewheelControl : true,
          	    onSlideChangeStart:function(swiper){
          	    	mte=time_Minute.activeIndex
          	    	
          	    }
          })
            
            time_year.slideTo(s_Year-110, 1000, false);//2代笔跳转的页码
            time_month.slideTo(s_Month, 1000, false);//2代笔跳转的页码
            time_data.slideTo(s_data, 1000, false);//2代笔跳转的页码
            time_Hour.slideTo(s_Hours, 1000, false);//2代笔跳转的页码
            time_Minute.slideTo(s_Minutes, 1000, false);//2代笔跳转的页码
            $(".time-submit").on("click",function(){
            	var timeval=$(".swiper-wrapper-year").find(".swiper-slide").eq(yas).attr("data-time")+"/"+$(".swiper-wrapper-month").find(".swiper-slide").eq(mon).attr("data-time")+"/"+$(".swiper-wrapper-data").find(".swiper-slide").eq(da).attr("data-time")+" "+$(".swiper-wrapper-Hour").find(".swiper-slide").eq(hr).attr("data-time")+":"+$(".swiper-wrapper-Minute").find(".swiper-slide").eq(mte).attr("data-time")
            	$(x).val(timeval)
            	$(".time-tm,.time-w").remove()
            })
            $(".time-off").on("click",function(){
            		$(".time-tm,.time-w").remove()
            })
        },
       /* 引用时间*/
        quote_time:function(x){
        	  $(x).attr("readonly","readonly")
              $(x).click(function(){
                  $("body").append('<section class="time-tm"></section><section class="time-w"><p class="time-titke">请选择日期</p><section class="time-li-yu"><p class="time-get"></p><section class="time-year swiper-container swiper-container-year" id="time-year"><section class="swiper-wrapper swiper-wrapper-year"></section></section><section class="time-year swiper-container" id="time-month" ><section class="swiper-wrapper swiper-wrapper-month"></section></section><section class="time-year swiper-container" id="time-data"><section class="swiper-wrapper swiper-wrapper-data"></section></section><section class="time-year swiper-container" id="time-Hour"><section class="swiper-wrapper swiper-wrapper-Hour"></section></section><section class="time-year swiper-container" id="time-Minute"><section class="swiper-wrapper swiper-wrapper-Minute"></section></section><p class="time-buttom"><button class="time-submit">确定</button><button class="time-off">取消</button></p></section></section>')
                  mml.time_mhj(this)
              })
        },
        /*时间戳格式化*/
        initialtime:function(x){
            var time=new Date();
            time.setTime(x);
            var   year=time.getFullYear();
            var   month=time.getMonth()+1;
            month<10?month="0"+month:month
            var   date=time.getDate();
            date<10?date="0"+date:date
            var   hour=time.getHours();
            hour<10?hour="0"+hour:hour
            var   minute=time.getMinutes();
            minute<10?minute="0"+minute:minute
            return   year+"/"+month+"/"+date+" "+hour+":"+minute;
        },
        /** 时间格式 year-month-day **/
        ymdtime:function(x){
            var time=new Date();
            time.setTime(x);
            var   year=time.getFullYear();
            var   month=time.getMonth()+1;
            month<10?month="0"+month:month
            var   date=time.getDate();
            date<10?date="0"+date:date
            return   year+"/"+month+"/"+date ;
        },
        
        
        /*时间戳格式化 加星期   month/day 周几  hh:mm*/
        z_initialtime:function(x){
            var time=new Date();
            time.setTime(x);
            var   year=time.getFullYear();
            var   month=time.getMonth()+1;
            month<10?month="0"+month:month
            var   date=time.getDate();
            date<10?date="0"+date:date
            var   hour=time.getHours();
            hour<10?hour="0"+hour:hour
            var   minute=time.getMinutes();
            minute<10?minute="0"+minute:minute
            var week;
            if(time.getDay()==0)
                week="周日"
            if(time.getDay()==1)
                week="周一"
            if(time.getDay()==2)
                week="周二"
            if(time.getDay()==3)
                week="周三"
            if(time.getDay()==4)
                week="周四"
            if(time.getDay()==5)
                week="周五"
            if(time.getDay()==6)
                week="周六"
            return   +month+"/"+date+""+" "+week+" "+hour+":"+minute;
        },
       
       
       /* 下拉滚动*/
        /**
         * x==标题
         * y==数据...
         * z==触发弹出下拉框插件
         * k==默认名字
         */
        ComboBox:function(x,y,z){
       
        	 $(z).attr("readonly","readonly");//该输入框禁止编辑
        	 $(z).off("click")
        	 $(z).on("click",function(){
        	 $("body").append('<section class="time-tm"></section><section class="time-w"><p class="time-titke">'+x+'</p><section class="time-li-yu"><p class="time-get"></p><section class="catr-y swiper-container" id="catr-y"><section class="swiper-wrapper swiper-catr-y"></section></section><p class="time-buttom"><button class="time-submit">确定</button><button class="time-off">取消</button></p></section></section>');
	         $(y).map(function(){
		       $(".swiper-catr-y").append('<section class="swiper-slide" data-id='+this.id+'>'+this.name+'</section>');
	         })
             var hucu=0;
	         var time_Minute = new Swiper('#catr-y', {		
                   centeredSlides: true,
                   slidesPerView : 3,//'一页显示4个'
                   direction: 'vertical',
                   mousewheelControl : true,
                   onSlideChangeStart:function(swiper){
   	                  hucu=time_Minute.activeIndex
   	               }
             })
	         $(".time-submit").on("click",function(){
	        	 $(z).val($(".swiper-catr-y").find(".swiper-slide").eq(hucu).html())
	        	 $(z).attr("data-sele",hucu-(-1))
	        	 $(".time-tm,.time-w").remove()
	         })
	         $(".time-off").on("click",function(){
	        	 $(".time-tm,.time-w").remove()
	         })
          	})  
        },
        /* 二级城市下拉框 */
        /*x=自定义方法*/
        CityComboBox:function(x){
           $("body").append('	<section class="time-tm"></section>	<section class="time-w">		<p class="time-titke">请选择城市</p>		<section class="time-li-yu">			<p class="time-get"></p>			<section class="catr-y city-left swiper-container" id="catr-y">				<section class="swiper-wrapper swiper-catr-y">					</section>			</section>			<section class="catr-y city-right swiper-container" id="catr-yz">				<section class="swiper-wrapper swiper-catr-yz"> 				</section>			</section>			<p class="time-buttom">				<button class="time-submit">确定</button>				<button class="time-off">取消</button>			</p>		</section>	</section>')	
           var province=1;//省
           var city=1;//市
           /*   省  级遍历*/
       	   mml.Ajax("/province/provinceAll","",function(x){
        		$(x).map(function(){
        		   $(".swiper-catr-y").append('<section class="swiper-slide" data-id='+this.id+'>'+this.province_name+'</section>')
        		})   
        		swiper("#catr-y",function(province_id){
        			mml.Ajax("/province/cityByProvince",{'province_id':province_id},function(x){
        			  $(".swiper-catr-yz").empty()
        				$(x).map(function(){
        				   $(".swiper-catr-yz").append('<section class="swiper-slide" data-id='+this.id+'>'+this.city_name+'</section>')
        				})
        			      swiper("#catr-yz",function(city_id){
        					$(".time-titke").attr("data-city_id",$(".swiper-catr-yz section").eq(city_id-1).attr("data-id"))
        		  			$(".time-titke").attr("data-city",$(".swiper-catr-yz section").eq(city_id-1).text())
        			      },0)
        			})
        			$(".time-titke").attr("data-province_id",province_id)
        			$(".time-titke").attr("data-province",$(".swiper-catr-y section").eq(province_id-1).text())
        		},19)
        	      
        	  })
        	  x()
        	  
       },
       /*自定义 二级--城市*/
       /**
        * x==自定义弹出层
        * y==获取省份分遍历标签
        * z==城市
        */
       CityComboBox_ren:function(x,y,z,a,b){
          x()
          var province=1;//省
          var city=1;//市
          /*   省  级遍历*/
      	   mml.Ajax("/province/provinceAll","",function(x){
       		$(x).map(function(){
               y(this)
       		})   
       		swiper(a,function(province_id){
       			mml.Ajax("/province/cityByProvince",{'province_id':province_id},function(x){
       			  $(".cityRight").empty()
       				$(x).map(function(){
       				  z(this)
       				})
       			      swiper(b,function(city_id){
       					$(".time-titke").attr("data-city_id",$(".swiper-catr-yz section").eq(city_id-1).attr("data-id"))
       		  			$(".time-titke").attr("data-city",$(".swiper-catr-yz section").eq(city_id-1).text())
       			      },0)
       			})
       			$(".time-titke").attr("data-province_id",province_id)
       			$(".time-titke").attr("data-province",$(".swiper-catr-y section").eq(province_id-1).text())
       		},19)
       	      
       	  })

       	  
      },
      
      
        ComboBoxoffclick:function(x,y,z){
       	 $(z).attr("readonly","readonly");//该输入框禁止编辑
       	 $("body").append('<section class="time-tm"></section><section class="time-w"><p class="time-titke">'+x+'</p><section class="time-li-yu"><p class="time-get"></p><section class="catr-y swiper-container" id="catr-y"><section class="swiper-wrapper swiper-catr-y"></section></section><p class="time-buttom"><button class="time-submit">确定</button><button class="time-off">取消</button></p></section></section>');
	         $(y).map(function(){
		       $(".swiper-catr-y").append('<section class="swiper-slide" data-id='+this.id+'>'+this.name+'</section>');
	         })
            var hucu=0;
	         var time_Minute = new Swiper('#catr-y', {		
                  centeredSlides: true,
                  slidesPerView : 3,//'一页显示4个'
                  direction: 'vertical',
                  mousewheelControl : true,
                  onSlideChangeStart:function(swiper){
  	                  hucu=time_Minute.activeIndex
  	               }
            })
	         $(".time-submit").on("click",function(){
	        	 $(z).val($(".swiper-catr-y").find(".swiper-slide").eq(hucu).html())
	        	 $(".time-tm,.time-w").remove()
	         })
	         $(".time-off").on("click",function(){
	        	 $(".time-tm,.time-w").remove()
	         })
       },
        /*  输出json信息*/
        /**
         *
         * @param x  ==json数据
         * @param y ==编辑json区域
         */
        exportation_nav:function(x,y){
            $(y).empty()
            $(x).map(function(){
                $(y).append('<li data-qn='+this.happen_q+' data-qh='+this.happen+'>'+this.name+"</li>")
            })
        },
       /* 一键全选 */
        /**
         * x=元素id
         */
        pitch_up:function(x){
        	  var div=document.getElementById(x);
        	  div.contentEditable="true"
        	  $("#"+x).focus();//定位到该控件
                document.execCommand("selectall",null)//全选
                 document.execCommand("copy",null)
                /*控件不可以编辑*/
                setTimeout(function(){
                	 div.contentEditable="false"
                },2000) 
        },
      /*  登录验证*/
        /**
         * x=方法   如 mml.verifyUserLogin(function(){alert("已登录")})
         */
        verifyUserLogin:function(x){
        	var url = window.location.pathname+window.location.search;
        	// 判断用户是否已经登录
        	$.ajax({
        		type:"post",
        		url:"/user/verifyUserLogin" ,
        		data:{},
        		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        		dataType:"json",
        		success:function(data){
        		     // 用户已登录 
        			 if(data.code==0){
        				 x()
        				 return false; 
        		     }else{ // 用户未登录
        		    	 window.location.href = "user/activitySkip?activity_url="+url;
        		     }	
        		}
        	});
        },
        /*图片上传*/
        /**
         * x=id
         * y=自定义方法
         */
        uploadingImg_p:function (x,y){
        	$.ajaxFileUpload({
        		url : '/activity/imgLogoUpLoad',
        		secureuri : false,
        		fileElementId : x,//input标签的name属性和id
        		dataType : 'json',
        		success : function(data, status) {
        			if(data.code==0){//上传成功
        			    y(data.msg)
        			}
        		},
        		error : function(data, status, e) {
        			
        		}
        	  });
        },
        
       /* 获取地理位置
        * http://api.map.baidu.com/api?v=1.2 百度地图js
        * */
        /**
         * x=显示位置的控件
         * 列 <input class="dage"><script>mml.position_o(".dage")</script>
         */
        position_o:function(x){
        	 var wzlp=""
        		  function getLocation(){
        	          var options={
        	              enableHighAccuracy:true, 
        	              maximumAge:1000
        	          }
        	          if(navigator.geolocation){
        	              //浏览器支持geolocation
        	              navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
        	          }else{
        	              //浏览器不支持geolocation
        	              alert('您的浏览器不支持地理位置定位');
        	          }
        	      }
        	      //成功时
        	      function onSuccess(position){
        	          //返回用户位置
        	          //经度
        	          var longitude =position.coords.longitude;
        	          //纬度
        	          var latitude = position.coords.latitude;
        	          
        	          //根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
        	var map = new BMap.Map("allmap");
        	var point = new BMap.Point(longitude,latitude);
        	var gc = new BMap.Geocoder();
        	gc.getLocation(point, function(rs){
        	  var addComp = rs.addressComponents;
        	 
        	  x(addComp.city)
        	 
        	});
        	      }
        	      //失败时
        	      function onError(error){
        	          switch(error.code){
        	              case 1:
        	              alert("位置服务被拒绝");
        	              break;
        	              case 2:
        	              alert("暂时获取不到位置信息");
        	              break;
        	              case 3:
        	              alert("获取信息超时");
        	              break;
        	              case 4:
        	               alert("未知错误");
        	              break;
        	          }
        	      }
        	      window.onload=getLocation;
        },
       /* 圆环or饼图    要有canvas元素标签*/
        /**引用例子 
         * data=环形的数据
         *   var data=[      
               {bgcolor:'#000',value:16.66},
               {bgcolor:'#000',value:16.66},
               {bgcolor:'#000',value:16.66},
               {bgcolor:'#000',value:16.66},
               {bgcolor:'#000',value:16.66},
               {bgcolor:'#000',value:16.66}
             ];
             var canvas = document.getElementById("myCanvas");
             var ctx = canvas.getContext("2d");
             mml.yuanhuan(ctx,data,{cood:{x:80,y:100},radius:80}) //x,y是环形的位置   radius是环形 的大小
         */
        yuanhuan:function(ctx,data,option){
        	 var cood=option.cood;
             var radius=option.radius;
             var lastpos=pos=5;
             for(var i=0;i<data.length;i++){
                 ctx.beginPath();
                 ctx.moveTo(cood.x,cood.y);
                 ctx.fillStyle = data[i].bgcolor;
                 pos=lastpos+Math.PI*2*data[i].value/100;
                 ctx.arc(cood.x,cood.y,radius,lastpos,pos,false);
                 ctx.fill();
                 lastpos=pos;

             }
             ctx.beginPath();
             ctx.fillStyle ="white";
             radius*=0.4;//环形的厚度
             ctx.arc(cood.x,cood.y,radius,0,Math.PI*2 ,false);
             ctx.fill();
        },
        /*单引号转换双引号*/
        /**
         * x==要转换的字符串
         */
        quotation_marks:function(x){
        	var reg = new RegExp("'", 'g'); // 创建正则RegExp对象
        	x = x.replace(reg, '"');
        	return x;
        },
        /*双引号转换单引号*/
        /**
         * x==要转换的字符串
         */
        duotation_marks:function(x){
        	var reg = new RegExp('"', 'g'); // 创建正则RegExp对象
        	x = x.replace(reg, "'");
        	return x;
        },
       /* 去掉换行符*/
        newline:function(x){
        	 var reg = new RegExp('\n', 'g');
             return x.replace(reg, "/");
        },
        /* 换行符*/ 
        hynewline:function(x){
        	 var reg = new RegExp("/", 'g');
             return x.replace(reg, "<br>");
        },
     
        
        
        /*返回顶部*/
        mml_top:function(x){
        	$(x).css({"display":"block"})
        	$(x).off("click")
		    $(x).on("click",function(){
		    	$(x).css({"background":"url(/img/dc/rocket_button_up.png) -171px -7px","background-size":"450px 126px"})
	            $(x).animate({ bottom: 1000},500,function(){
	            	$(x).css({ "bottom": "40px","background":"url(/img/dc/rocket_button_up.png) -14px -7px","background-size":"450px 126px"})
	            })
		    	$("html,body").animate({scrollTop:0},100,function(){
		    		$(x).css({"display":"block"})
		    	});
		    })
        },
        /* swiper滚动初始化*/
        /**
         *
         * @param id==要滚动的区域
         * @param x==自定义方法
         */
        swiper:function(id,x){
          var mySwiper = new Swiper(id, {
              loop: true,//循环播放
              autoplay : 4000,//自动播放时间为4秒
              pagination : '.swiper-pagination',//显示分页的。。。
              paginationClickable :true,//点击点点跳转到相应的页面
              autoplayDisableOnInteraction : false//操作后继续自动
            })
            try{
                x(mySwiper)
            }catch(e){}


          },
        /*  评论*/
          page_display:function(x,y){
        	  mml.logging_status(function(){
        		  $(x).off("click")
                  $(x).on("click",function(){
                	 
                      $("body").append(' <section class="pup-externum"></section> <section class="pup-input-text a-fadeinB"><section class="pup-input-jhg-p"> <section class="pup-input-s" contenteditable="true"></section><label class="pup-input-icon"></label><button class="pub_submit">发送</button> </section> <section class="pup-pualbx-p"></section></section>')
                     
                      /*评论输入框输入变化触发*/
                    
                      /*评论框点击触发*/
                      $(".pup-input-s").on("click",function(){
                          $(".pup-pualbx-p").removeClass("a-fadeinB").addClass("a-fadeoutB").fadeOut(1200)
                         
                      })
                      /*表情按钮触发事件*/
                      $(".pup-input-icon").on("click",function(){
                          $(".pup-input-icon").css({"background": "url(/img/activity/phone_icon_activity.png) -240px -124px","background-size":"480px"})
                          $(".pup-pualbx-p").removeClass("a-fadeoutB").addClass("a-fadeinB").css({"display":"block"})
                      })

                      for(var i=1;i<61;i++){
                          $(".pup-pualbx-p").append('<img src="/img/paxlbx/'+i+'.gif">')
                      }
                      /* 表情点击事件*/
                      $(".pup-pualbx-p img").map(function(){
                          $(this).on("click",function(){
                              $(".pup-input-s").append('<img src="'+$(this).attr("src")+'">');
                          })
                      })
                     /* 黑色背景点击*/
                      $(".pup-externum").on("click",function(){
                        $(".pup-externum,.pup-input-text").remove()
                      })
                       /*     发送按钮触发事件*/
                      $(".pub_submit").on("click",function(){
                      	  y(x)
                          $(".pup-externum,.pup-input-text").remove()
                          
                      })


                  })
        	  },function(){
        	       $(x).on("click",function(){
        	    	   window.location.href = "/user/activitySkip?activity_url="+window.location.pathname+window.location.search ;
        	       })
        	  })
	         
              
          },
        /*  登录状态*/
        /**
         * x==登录中的自定义方法
         * y==没有登录的自定义方法
         * z==用户id
         */  
        logging_status:function(q,y,z){ 	 
        	 mml.Ajax("/userDetail/get_user_detail",{"user_id":z},function(x){
            	 /*  x.code==1为登录状态  否则没有登录 */
            	  if(x.code==1){
            		  var user_name=x.user.user_name;//获取登录的用户名
            		  var user_icon=x.user.user_icon;//获取用户的头像
                	  var tel=x.userDetail.contact_info;//获取用户的电话号码
                	  var identity_id=x.userDetail.identity_id;//身份证信息
                	  var real_name=x.userDetail.real_name;//真实姓名
                	  var user_status=x.user.user_status;//用户状态 1为审核通过
                	  var user_id=x.user.user_id;//用户id
                	  var user_phone=x.user.user_phone;//用户id
                	  var auth=x.auth;//0已认证  1未认证
                	  q(user_name,user_icon,tel,identity_id,real_name,user_status,auth,user_id,user_phone)
            	  }else{
            		  y()
            	      /*  window.location.href = "/user/activitySkip?activity_url="+window.location.pathname+window.location.search ;
            	  */
            	  }
            })
        },
        /*e币余额*/
        e_money:function(y){
        	  mml.Ajax("/trade/userBalance","",function(x){
    			  y(x)
    		  })		    
        },
        
        
        /*评论数据*/
        /**
         * 
         * @param a ==类型    1为活动 2活动经费  4为股权众筹
         * @param b == id    活动或类型的id
         * @param c == 页码
         * @param d ==行数
         * @param e ==自定义方法
         */
        ajaxinit:function(a,b,c,d,e){
            mml.Ajax("/comment/commentSum",{"type":a,"id":b},function(x){
          	  $(".multipleo span a").html(" "+x) 
          	  $(".comment_num a").text(x)
            })
        	mml.Ajax('/comment/commentData',{"type":a,"id":b,"page":c,"rows":d},function(x){
        		if(x.length<d){
            		 $(".mes-p-bgpackzoom_p").css({"display":"none"})
            	}else{
            		 $(".mes-p-bgpackzoom_p").css({"display":"block"})
            	} 
        		$(x).map(function(){
        	    	var user_name=this.userName;//没有用户昵称
           	    	var recovery_diode="";//二级回复
           	    	var recovery_diode_length="";//二级回复的长度
           	    	if(this.fall.length>0){
           	    		recovery_diode_length="("+this.fall.length+")"//二级回复的长度
           	    		/* 遍历二级回复 */
           	    		$(this.fall).map(function(){
           	    			/* 添加二级回复到评论里 */
           	    			recovery_diode+='<p class="single_page_phone_reply_ly_er" data-id="'+this.user_id+'"><label class="single_page_phone_title_img single_page_phone_title_img_er" style="background:url('+(this.user_icon==""?"/img/userIcon.jpg":this.userIcon)+');background-size:100% 100%"></label><span style="color:#141414">'+this.userName+"</span>:"+this.comment_content+'</p>';
           	    		})
           	    		
           	    	}
           	    	
        			$("#single_page_phone_reply_poiyu").append('<dl data-id="'+this.source_id+'"><span class="single_page_phone-cy_left single_page_phone_reply_left"><label class="single_page_phone_title_img" style="background:url('+this.userIcon+');background-size:100% 100%"></label>'+this.userName+'</span><span class="single_page_phone-cy_right single_page_phone_reply_right">'+mml.getDateDiff(this.create_time.time)+'<a class="single_page_phone_hf" data-id="'+this.id+'">回复<span>'+recovery_diode_length+'</span></a></span><p class="single_page_phone_reply_ly">'+this.comment_content+'</p>'+recovery_diode+'</dl>')
        			
             	 }) 
                 $(".single_page_phone_hf").map(function(){
                	 mml.page_display($(this),function(x){
                		
                		   if(!mml.lengnull($(".pup-input-s").text())){
                          	   mml.pup_ti("评论回复内容不能为空！","0")
                          	   return;
                             }
                		 
                		 mml.Ajax("/comment/addCommentData",{"superior":$(x).attr("data-id"),"comment_content":$(".pup-input-s").html()},function(x){
              				  $(".single_page_phone_reply_poiyu").empty();
              				mml.ajaxinit(a,b,c,d)//默认显示一页

              			  },"",function(){
              				 
              				   $(".single_page_phone_reply_poiyu").append('<p style="text-align:center;"><img src="/img/dc/loading.gif" style="width:30px;height:30px;"></p>')
              			  })
              			  
                	 })
                 })
             	e(x)
           
             	
        	}) 

        },
        json_array:function(obj){
   
      		  // 用来保存所有的属性名称和值 
      		  var arr = [] ; 
      		  // 开始遍历 
      		  for ( var p in obj ){ // 方法 
      		  	if ( typeof ( obj [ p ]) == " function " ){
      		  		obj [ p ]() ; 
      		  	} else { // p 为属性名称，obj[p]为对应属性的值 
      		  		var json = {"key":p,"value":obj [p]};
      		  		arr.push(json);
      		  	}
      		  } // 最后显示所有的属性 
      		  return arr;
        },
        local:function(x){
        	window.location.href=$(x).attr("data-href");
        },
      /*  下拉刷新
       * 要引入dropload.min.js
       * */
        /**
         * a==要滚动区域的clas   或id
         * b==滚动的自定义方法
         */
        pull_refresh:function(a,b){
        	$(a).dropload({
        	    scrollArea : window,
        	    loadDownFn : function(me){
        	    	b(me)
        	    	setTimeout(function(){
        	             me.resetload();
        	        },500);
        	    }
        	});
        },
        /**
         * 截图
         * x==文件上传框的id
         * z==成功回调的图片地址
         */
        pc_jietu:function(y,z,k){
        	$(".pup_jn").remove();
        	$("body").append('<section class="pup_jn"><section class="pup_ju_p" id="clipArea"></section><p class="pup_jn_button"><a id="clipBtn">上传</a><a class="remove_p">取消</a></p></section>');
        	
        	$("#clipBtn").on("click",function(){
        		$(".pup_jn").hide();
        	})
        	$(".remove_p").on("click",function(){
        		$(".pup_jn").remove();
        		$("body").css({"height":"auto"});
        	})
       	    $(y).on("change",function(){
       	      $("body").css({"height":"100px"});
       		  $(".pup_jn").show();
       	    })
       	  
        	
       	    $("#clipArea").photoClip({
        	    width: "320",
        	    height: 180,
        	    file: y,
        	/*     view: "#view",*/
        	    ok: "#clipBtn",
        	    loadStart: function(dataURL) {
        	        console.log("照片读取中");
        	    },
        	    loadComplete: function(dataURL) {
        	        console.log("照片读取完成");
        	    },
        	    clipFinish: function(dataURL) {
            		dataURL=dataURL.split("base64,")[1];
                  	  $.ajax({
              			type : 'POST',
              			url : '/activity/imgShearSave',
              			data : {"imgUrl":dataURL},
              			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
              			dataType : 'text',
              			beforeSend:function(){
               			   try{
               				  
               				 $(".pup_tier").remove();
               				 k();
               			   }catch(e){
               				   
               			   }

               			},
              			success : function(data) {
              			    z(data)
              			
              			    $("body").css({"height":"auto"})
              				$(".pup_jn").remove();
              			}
              		});
        	    }
        	});
        	
        },
        /* 调用实例*/
        /**
         * mml.phone_jc(function(){
         *    if(true){
         *       alert("检测成功")
         *    }else{
         *      mml.phone_jc();
         *    }
         * 
         * })
         */
        phone_jc:function(x){
                setTimeout(function(){
                    try{
                        x()
                    }catch (e){
                       mml.phone_jc();
                    }
                },500)  
        },
        /**
        *
        * @param x  ==元素区域
        * @param y  ==比例
        * banner的显示比列为16 ： 7
        * <div class="banner" data-resize="7"></div>
        * 实例    resize(".banner",$(".banner").data("resize"))
        */
        resize_m:function(x,y){
            var p_m=document.body.scrollWidth
            p_m= p_m/16*y
            $(x).css({"height":p_m+"px"})
            $(window).resize(function(){
                var p_m=document.body.scrollWidth
                p_m= p_m/16*y
                $(x).css({"height":p_m+"px"})
            });
        },
        /**
         * 没有数据时插入显示羽毛图片及提示语
         * x == 父元素
         * y == 提示语
         */
        data_null:function(x,y){
        	$(x).append('<section class="dataNull"><section class="imgt"></section><p>'+y+'</p></section>')
        }

    }
}


$(".discover_iu_er li,.discover_iu_san li,.swiper-slide,.prefecture_li").map(function(){
	$(this).on("click",function(){
		if(mml.lengnull($(this).attr("data-href"))){
			window.location.href=$(this).attr("data-href")
		}
		
	})
})


function isnull(x){
    var lnull=true;
    if(x==""||x==undefined||x==null){
        lnull=false;
    }
    return lnull;
}

/*  防止表单多次提交*/
function ycdo(y,x){
	var hn=$(y);//获取当前按钮的下标
  	$("body").append('<div class="loadding_a"><img src="/img/loadding.gif" ></div>');
    if($(hn).attr("data-lx")!="1"){
    	setTimeout(function(){
    		x()
    		$(hn).attr("data-lx",0);
    		$(".loadding_a").remove()
    	},2000)
    }
    $(hn).attr("data-lx",1);
}

/*图片上传*/
function uploadingImg(obj){
	$.ajaxFileUpload({
		url : '/activity/imgLogoUpLoad',
		secureuri : false,
		fileElementId : 'imgLogo',//input标签的name属性和id
		dataType : 'json',
		success : function(data, status) {
			if(data.code==0){//上传成功
				//data.msg为图片路径
				$(".item-logo-bg").attr("data-bg",data.msg)//方便取值
			/*	设置背景为该图片地址*/
				$(".item-logo-bg").css({"background":"url("+data.msg+")","background-size":"100% 100%"})
			}
		},
		error : function(data, status, e) {
			
		}
	  });
}



/*页面跳转*/
$(".moduletwo").map(function(){
	$(this).click(function(){
		if($(this).attr("data-src")!=""&&$(this).attr("data-src")!=undefined){
			window.location.href=$(this).attr("data-src")
		}
	})	
})

$("#contact_way").attr("placeholder","请填写手机/电话")

/*发起方限制文本长度和改变输入的宽度*/
$(".item-text-input").map(function(){
	$(this).css({"width":"91%"})
})


/*单页-创建*/
$(".mu-pou").click(function(){
	var url = window.location.pathname+window.location.search ;
	// 判断用户是否已经登录
	$.ajax({
		type:"post",
		url:"user/verifyUserLogin" ,
		data:{},
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		dataType:"json",
		success:function(data){
	     // 用户已登录 
		 if(data.code==0){
			    window.location.href="/toMenu";
		 }else{ // 用户未登录
	    	 window.location.href = "user/activitySkip?activity_url="+url;
	     }	
	  }
   });
});	


/*if(navigator.userAgent.indexOf("iPhone")>0){
	$(".top-sav").remove()
}else{*/
$(".maincont").css({"marginTop":"44px"})
/*}*/

/*返回上一页*/
function returnPrepage(){
	if (window.document.referrer == "" || window.document.referrer == window.location.href) {
		window.location.href = "{dede:type}[field:typelink /]{/dede:type}";
	} else {
		window.location.href = window.document.referrer;
	}
}



function swiper(id,x,y,z){
   	   var mySwiper = new Swiper(id, {
   		  slidesPerView:3,
   	    	  direction: 'vertical',
   	    	  centeredSlides: true,
   	    	 mousewheelControl : true,
   	    	  onSlideChangeEnd:function(){
   	    		  x(mySwiper.activeIndex-(-1))
   	    	  }
   	     })
	     x(y-(-1))//默认跳转
   	   try{
   		  mySwiper.slideTo(y, 2000, false)//滚动 
   	   }catch(e){}
    }
/*活动发起上传图片事件邦定触发*/
$('.thetJst').on('click',function(){
	$('#imgLogo').click();
})


/* 几列几列点击事件 */
 $(".head_f li,.head_T li,.head_w li").map(function(){
     $(this).on("mousedown",function(){
         $(this).parent().find("li").map(function(){
             $(this).attr("data-lx","0")
         })
         $(this).attr("data-lx","1")
     })
 })

 /* 活动详情/众筹详情 - 举报事件*/
 $('.clickReport').on('click',function(){
	 /*if($(this).attr('data-sn') ==1){
		 $('.mmlye-ce-mk').remove();
		 $('.mmlye-Report-option').removeClass('a-fsadein').css({"display":"none"});
		 $(this).attr('data-sn',0);
		 return false;
	 }else{
		 
	 }*/
	 $('.mmlye-Report-option').addClass('a-fadein').css({"display":"block"});
	 $('body').append('<section class="mmlye-ce-mk" style="height:100%;width:100%;z-index:98;top:0px;position:fixed;"></section>');
	 
	 //点击举报
	 $('.mmlye-Report-option li').map(function(){
		 $(this).on('click',function(){
			 var cor_id = $(this).parent().attr('data-id');//id
			 var type = $(this).parent().attr('data-type'); // 1：众筹  2：活动
			 var re_text = $(this).text();//举报内容
			 //提交举报
			// mml.Ajax("/",{"re_text":re_text},function(x){
				 
				 $('.mmlye-ce-mk').remove();
				 $('.mmlye-Report-option').removeClass('a-fsadein').css({"display":"none"});
				 
				 $('body').append('<section id="Report-succeed-hint" class="Report-succeed-hint-big"><section class="Report-succeed-hint"><p style="font-size:16px;"><label></label>举报成功</p><p style="font-size:14px;">感谢您构建和谐社区</p></section></section>');
				 setTimeout(function(){
					 $('#Report-succeed-hint').remove();
				 },2000);
   		  	 //})
		 })
	 })
	 //取消举报
	 $('.mmlye-ce-mk').on('click',function(){
		 $('.mmlye-ce-mk').remove();
		 $('.mmlye-Report-option').removeClass('a-fsadein').css({"display":"none"});
	 })
 })
 
 
 
 /*此方法仅为页面加载若有未读消息，底部菜消息处有红点*/
 function unreadMSM(){
	// 判断用户是否已经登录
	$.ajax({
		type:"post",
		url:"/user/verifyUserLogin" ,
		data:{},
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		dataType:"json",
		success:function(data){
		     // 用户已登录 
			 if(data.code==0){
				 selectMSM();//查询未读消息
		     }	
		}
	});
}
/*查询未读消息*/
function selectMSM(){
	mml.Ajax("/letter/myLetterByFlag","",function(x){
		if(x > 0){  //x 为未读短信条数
			var sse = $('.bottom-t-n li:eq(3)');
			 $(sse).find('label').css({"background":"url(/img/menu_index.png) -236px -445px","background-size":"360px 567px"});
		}
	});
}

/*禁止body滚动*/
function bodyNotScroll(){
	var widH = $(window).height(); 
	$('body').css({"height":""+(widH-65)+"px","overflow-y":"hidden"});
}
/*开启body滚动*/
function bodyScroll(){
	$('body').css({"height":"100%","overflow-y":"scroll"});
}
$(document).ready(function() {
	var navicur = $(".case-bottom");	
	var jinzhi=0;

	for(var i=0;i<navicur.length;i++){
		navicur[i].addEventListener("touchmove",function(e){
			if(jinzhi==0){
				e.preventDefault();
				e.stopPropagation();
			}
		},false);
	}		
	 
	 
});

/**
 * 手机号码验证
 * @param mobile 手机号
 * @returns {Boolean}
 */
function homeVerification(mobile)
{
    if(mobile.length==0)
    {
       return false;
    }    
    if(mobile.length!=11)
    {
        return false;
    }
    
    var myreg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if(!myreg.test(mobile))
    {
        return false;
    }
    return true;
}


/**
 * 文件上传格式验证
 * @param obj	文件DOW对象
 * @param array	验证格式数组(样式:['gif','png','jpg'])
 * @returns {Boolean}
 */
function checkFileType(obj,array){
	var filepath = $(obj).val();
	var extStart = filepath.lastIndexOf(".")+1;
	var ext=filepath.substring(extStart,filepath.length).toLowerCase();
	var bl = false;
	for(var i = 0 ; i < array.length ; i++){
		if(array[i] == ext){
			bl = true;
			break;
		}
	}
	return bl;
}

window.onload=function(){
	$(".loading").remove()
	$(".bottom-p").css({"display":"block"})
	$(".popup_a").remove();
	$("#details_a *").removeAttr("size").css({"text-indent":"0"}) 
    $("#details_a img").map(function(){
  	  if($(this).width()>$("#details_a").width()){
  		  $(this).css({"width":$("#details_a").width(),"height":"auto"}).attr("width",$("#details_a").width()).attr("height","auto")
  	  }
  })
      $("iframe").removeAttr("width").removeAttr("height");
      $("#details_a *").css({"max-width":"1080px"})
    
    
}


/**
 * 文件上传大小验证
 * @param obj	文件DOW对象
 * @param size	文件大小（单位MB）
 */
function checkFileSize(obj,size){
	var bl = true;
	if(!$.support.leadingWhitespace){
		var img=new Image();
		img.src=filepath;
		if(img.fileSize > 0){
			if(img.fileSize > (size*1024)){
				bl = false;
			}
		}
	}else{
		var file_size = obj.files[0].size;
		var fileSize = file_size / 1024 / 1024;
		if(fileSize > size){
			bl = false;
		}
	}
	return bl;
}


 