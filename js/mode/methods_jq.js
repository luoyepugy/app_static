/**
 * 发起活动jq方法
 */

  function stopScrolling( touchEvent ) {   
        touchEvent.preventDefault();   
    }  /*
    document.getElementById("mml_bottom").addEventListener( 'touchstart' , stopScrolling , false );  */
  $(".mml_bottom,.sys-loading").off("touchmove").on("touchmove",stopScrolling)
  /*  document.getElementById("mml_bottom").addEventListener( 'touchmove' , stopScrolling);  */
     
function classify_p(){
	var acdf=[
              {"title":"分类","maker_title":[{"id":"0","text":"全部"},{"id":"1","text":"路演场馆"},{"id":"2","text":"置业装修"},{"id":"3","text":"汽车活动"},{"id":"5","text":"商家促销"},{"id":"6","text":"精品课程"},{"id":"7","text":"户外运动"},{"id":"9","text":"保险投资"}]},
              {"title":"行业","maker_title":[{"id":"0","text":"全部"},{"id":"1","text":"孵化器"},{"id":"2","text":"房产"},{"id":"3","text":"互联网"},{"id":"4","text":"公益"},{"id":"5","text":"培训"},{"id":"6","text":"汽车"},{"id":"7","text":"旅游"},{"id":"8","text":"酒店"},{"id":"9","text":"家装"},{"id":"10","text":"卖场"},{"id":"11","text":"明星"},{"id":"12","text":"商会"},{"id":"13","text":"社区"},{"id":"14","text":"展会"},{"id":"15","text":"大健康"},{"id":"16","text":"校园"},{"id":"17","text":"媒体"},{"id":"18","text":"趣味"},{"id":"19","text":"金融"},{"id":"20","text":"其他"}]},
              {"title":"城市","maker_title":[{"id":"1","text":"北京 "},{"id":"2","text":"天津 "},{"id":"3","text":"上海 "},{"id":"4","text":"重庆 "},{"id":"51","text":"大连 "},{"id":"86","text":"南京 "},{"id":"99","text":"杭州 "},{"id":"128","text":"厦门 "},{"id":"418","text":"武汉 "},{"id":"435","text":"长沙 "},{"id":"449","text":"广州 "},{"id":"450","text":"深圳 "},{"id":"556","text":"西安 "},{"id":"627","text":"香港特别行政区"}]},
              {"title":"时间","maker_title":[{"id":"1","text":"未开始"},{"id":"2","text":"进行中"},{"id":"3","text":"已结束"}] },
              {"title":"收费类型","maker_title":[{"id":"","text":"不限"},{"id":"1","text":"免费"},{"id":"2","text":"收费"}] },
              {"title":"性别","maker_title":[{"id":"0","text":"男"},{"id":"1","text":"女"}]}
          ];
	 return  acdf
}


/* 微信支付*/
 function onBridgeReady(parameter,custom){
   WeixinJSBridge.invoke(
       'getBrandWCPayRequest', parameter,
       function(res){    
    	   if(res.err_msg == "get_brand_wcpay_request：ok" ) {
    		   custom();//自定义方法
    	   }  
    	 
       }
   ); 

}
/* 微信分享*/
 /**
  *
  * sh=分享标题设置
  * img_a=图片分享自定义方法
  */
 function wx_share(sh,img_a){
	 var shareUrl = window.location.href;
	 $.ajax({
         type : 'get',
         url : '/WxShare/wxshareParam',
         data : {'shareUrl' : shareUrl},
         contentType : 'application/json;charset=UTF-8',
         dataType : 'json',
         success : function(data) {
        	 var kk=data
             jssdkconfig = {
	    			"appId" : "wxca4f9653c04f3e8d",
	    			"nonceStr" : kk.info[0].nonceStr,
	    			"timestamp" : kk.info[0].timestamp,
	    			"signature" : kk.info[0].signature
	    		} || {
	    			jsApiList : []
	    		};
	    		console.log(kk+"  "+kk.info[0].nonceStr+"  "+kk.info[0].timestamp+"  "+kk.info[0].signature)

	    		// 已经注册了 jssdk 文档中所有的接口
	    		jssdkconfig.jsApiList = [ 'checkJsApi', 'onMenuShareTimeline',
	    				'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
	    				'showOptionMenu', ]; 

	    		wx.config(jssdkconfig);

	    		sharedata = sh

	    		wx.ready(function() {
	    			wx.showOptionMenu();
	    			wx.onMenuShareAppMessage(sharedata);
	    			wx.onMenuShareTimeline(sharedata);
	    			wx.onMenuShareQQ(sharedata);
	    			wx.onMenuShareWeibo(sharedata);
	    			try{
	    				img_a();
	    			}catch(e){
	    				
	    			}
	    		});
	    		
	    		
	    		
         },
         error : function(res) {
        	 console.log("请求失败")
         }
     });

 }
/* 分享*//*:$("#details_a").text().replace(reg,"").substring(0,30)*/
 function share_p(id){

	  var reg = new RegExp("\n", 'g');
	var khg={"url":"http://m.apptown.cn/activity/activityShowSkip?activity_id="+id//分享链接
    	,"title":$("title").text()//分享标题
    	,"pics":"http://m.apptown.cn/img/activity/share/share_activity1.jpg"//分享图片地址
        ,"details_a":"e场景活动"//分享摘要		
    	,"Qzone":function(){//QQ空间分享
    	      var p = {
    	            url:this.url,
    	            showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
    	            desc:'这活动我太喜欢了',/*默认分享理由(可选)*/
    	            summary:this.details_a,/*分享摘要(可选)*/
    	            title:this.title,/*分享标题(可选)*/
    	            site:'e场景活动吧',/*分享来源 如：腾讯网(可选)*/
    	            pics:this.pics, /*分享图片的路径(可选)*/
    	            style:'101',
    	            width:199,
    	            height:30
    	        };
    	        var s = [];
    	        for(var i in p){
    	            s.push(i + '=' + encodeURIComponent(p[i]||''));
    	        }
    	        window.location.href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"+s.join('&')
    },"qq":function(){//分享QQ
    	 var p = {
                 url:this.url, /*获取URL，可加上来自分享到QQ标识，方便统计*/
                 desc:'这活动我太喜欢了', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
                 title:this.title, /*分享标题(可选)*/
                 summary:this.details_a, /*分享摘要(可选)*/
                 pics:this.pics, /*分享图片(可选)*/
                 flash: '', /*视频地址(可选)*/
                 site:'e场景活动吧', /*分享来源(可选) 如：QQ分享*/
                 style:'201',
                 width:32,
                 height:32
             };
             var s = [];
             for(var i in p){
                 s.push(i + '=' + encodeURIComponent(p[i]||''));
             }
             window.location.href="http://connect.qq.com/widget/shareqq/index.html?"+s.join('&')
    },"qqweibo":function(){//微博
    	window.location.href="http://share.v.t.qq.com/index.php?c=share&a=index&url="+this.url+"&title="+this.title+"&site=&pic="+this.pics+"&appkey=1103378751'"
    }}
	return khg
}
/* 过滤标签*/
 function removeHTMLTag(str) {
     str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
     str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
     //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
     str=str.replace(/ /ig,'');//去掉 
     return str;
}