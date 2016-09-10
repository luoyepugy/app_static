/**
 * 城市  选择  js    by  cgq 2016 3-4
 */

$(function(){
    	      /* 初始化滚动 */
    		 var scroll=new iScroll("wrapper",{bounce: false,hScrollbar: true,hideScrollbar: true});
    	        /* 定位功能 */
    	       mml.position_o(function(a){
    	    	    $("#current_c").text(a)
    	    	    localStorage.city_name=a//城市名称
    	       })
    	    
    	      /*        省份按钮触发事件 */
    	       $("#province_a h4").on("click",function(){
    	    	     $("#scroll").empty()
    	    	     $("#wrapper").css({"display":"block"});
    	    	     scroll.destroy();//滚动销毁
    	    	     var ct_id=$(this).attr("data-id")
    	    	     if(ct_id>0){
    	    	    	 mml.Ajax("/addr/cityByProvince",{'province_id':ct_id},function(x){
    	    	    		 $(x).map(function(){
    	    	    			 $("#scroll").append("<li><h4 class='pd brte0 ptm_8_14 mb0 city_a' data-id='"+this.id+"'> "+this.city_name+"</h4></li>")
    	    	    		 })
    	    	    		 $("#wrapper div").map(function(){
    	    	    			 $(this).remove()
    	    	    		 }) 	           
    	    	    		 scroll=new iScroll("wrapper",{bounce: false,hScrollbar: true,hideScrollbar: true,doubleTapZoom: 2});
    	    	    	 })
    	    	     }
    	       })
    	      /*  省份区域的下拉事件 */
    	       $("#province_a").on("swipedown",function(){
    	    	      $("#wrapper").css({"display":"none"});
    	       })
    	       /*  省份区域的上拉事件 */
    	      $("#province_a").on("swipeup",function(){
    	    	      $("#wrapper").css({"display":"none"});
    	       })
    	       /*  城市区域的左拉事件 */
    	       $("#wrapper").on("swipeleft",function(){
    	    	    $(this).css({"display":"none"});
    	       })
    	       /*  城市区域的右拉事件 */
    	        $("#wrapper").on("swiperight",function(){
    	    	    $(this).css({"display":"none"});
    	       })
    	       /*当前城市触发事件*/
    	       $("#current_c").on("click",function(){
    	    	   history.go(-1);//返回上一页
    	       })
    	       /* 城市按钮触发事件 */
    	       $("body").on("click",".city_a",function(){
    	    	    localStorage.city_id=$(this).attr("data-id");//城市id
    	    	    localStorage.city_name=$(this).text();//城市名称
    	    	    history.go(-1);//返回上一页
    	       })
       })
      