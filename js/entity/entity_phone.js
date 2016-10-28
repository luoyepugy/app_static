/**
 * 手机端实体js**/
/*轮播图*/
function indexbanner(id,banner_url,ulr){
	this.id=id;//活动首页轮播图的ID
	this.banner_url=banner_url;//活动首页轮播图的地址
	switch(ulr){
		case "1":this.href_i='/index.html#/activity_detail/'+id;break 
	}
	
}
/*首页3条数据*/
function activity_sum(data){
	this.activity_sum=data.activity_sum;//活动数量
	this.count=data.user_sum ;//会员总数
	this.sum=data.sponsor_sum+5000000;//赞助总金额
}

/*活动列表*/
function query_activity_list(data){
	this.id=data.id;//活动ID
	this.poster=data.activity_first_face;//封面
	this.name=data.activity_title;//活动名称
	this.city_name=data.city_name+" "+data.activity_address;//活动城市
	if(data.type==10){
		this.city_name=data.activity_address;//活动城市 
	}
	this.start_time_str=data.activity_time;//活动开始时间
	this.user_time_str=data.start_time;//活动开始时间
	this.ticket_array=data.ticket_array; 
	var act_way="免费";
	this.activity_way=data.is_free;//活动是否收费
	if(this.activity_way==1){
		act_way="收费";
		this.acc_class="hs";		
	}
	this.act_way=act_way;
	this.schedule=data.schedule==null?"0%":data.schedule;//进度  
	this.target_money=data.target_money==null?0:data.target_money;//目标金额

	if(this.target_money>0||this.now_money>0){
		this.skjhg_s="hs";
	}
	
	if(this.target_money>10000){
		this.target_money=this.target_money/10000+"万";
	}

	this.now_money=data.now_money==null?0:data.now_money;//已筹金额
}
/*首页热门活动*/
function preferential(getActivityHot){
	this.id=getActivityHot.id;//活动ID
	this.activity_title=getActivityHot.activity_title;//活动标题
	this.activity_time=getActivityHot.activity_time;//活动时间开始时间
	this.activity_number=getActivityHot.activity_number;//报名人数
	this.activity_first_face=getActivityHot.activity_first_face;//活动第一张封面
	this.activity_address=(getActivityHot.city_name==null?"":getActivityHot.city_name)+getActivityHot.activity_address;//活动地址
	if(getActivityHot.type==10){
		this.activity_address=getActivityHot.activity_address;//活动地址
	}
	
	this.sponsorImageUrl=getActivityHot.sponsor_image_url;//主办方名头像
	this.sponsorName=getActivityHot.sponsor_name==null?'e场景':getActivityHot.sponsor_name;//主办方名称target_amount
	this.browse_count=getActivityHot.browse_count;
	this.is_free=getActivityHot.is_free;
	
		
	var jkg="免费",cl="ls";
	if(getActivityHot.is_free==1){
		jkg="收费";
		cl="hs";
	}
	this.wyyt=jkg;
	this.cla=cl;
	this.support_id=getActivityHot.support_id==null?0:getActivityHot.support_id;     //关联赞助ID
	this.target_money=getActivityHot.target_money==null?0:getActivityHot.target_money;  //目标金额
	this.now_money=getActivityHot.now_money==null?0:getActivityHot.now_money;     //已筹金额
	this.schedule=getActivityHot.schedule==null?"0%":getActivityHot.schedule;         // 进度
	if(this.target_money>10000){
			this.target_money=this.target_money/10000+"万";
	}	
	if(this.target_money>0||this.now_money>0){
		this.skjhg_s="hs";
	}
	if(this.now_money>10000){
		this.now_money=this.now_money/10000+'万';
	}

	/*随机id*/
	var rand_a= Math.floor(Math.random()*100000);
	 if(rand_a<10000){
	        rand_a+=10000;
	 }
	rand_a=rand_a+""+getActivityHot.id+""+rand_a;
	this.j_id=rand_a; 
}
/*赞助列表*/
function sponsor_list(data){
	this.id=data.id;//赞助id
	this.cover=data.covers[0];//赞助封面
	this.name=data.title;//赞助标题
	this.target_amount=data.target_amount;//赞助金额
	if(data.now_money==null){
		this.all_amount=0;//已筹金额
	}else {
		this.all_amount=data.now_money;//已筹金额
	}	
	this.progress_of=data.schedule;//赞助进度
	this.entime=data.end_time;//剩余时间
	this.status=data.status;//赞助状态
	var st_name="赞助中";
	if(data.end_time<new Date().getTime()){
		data.status=7;
	}	
	var oi_p="",c_colour='';
	switch(data.status){
	  case 0:st_name="保存";oi_p='bg_gray';c_colour="gray";break;
	  case 1:st_name="通过";oi_p='bg_gray';c_colour="gray";break;
	  case 2:st_name="拒绝";oi_p='bg_gray';c_colour="gray";break;
	  case 3:st_name="待审核";oi_p='bg_gray';c_colour="gray";break;
	  case 4:st_name="预热中";oi_p='ack_button';break;
	  case 5:st_name="赞助中";break;
	  case 6:st_name="赞助成功";break;
	  case 7:st_name="赞助失败";oi_p='bg_gray';c_colour="gray";break;
	  case 8:st_name="已结束";oi_p='bg_gray';c_colour="gray";break;
	}
	this.oi_p=oi_p
	this.c_colour=c_colour
	this.st_name=st_name;//赞助名称
}
/*赞助详情*/
function sponsorDetail(data){
	this.poster=data.poster;//赞助封面（数组形式返回）
	this.name=data.name;//赞助标题
	this.browse_count=data.browse_count;//赞助浏览量
	this.join_count=data.join_count;//赞助参加人数
	this.target_amount=data.target_amount.toFixed(2);//赞助目标金额
	this.status=data.status;//赞助状态
	this.schedule=data.schedule;//赞助进度
	this.now_money=data.now_money;//赞助已筹金额
	this.industry_id=data.industry_id;//赞助行业ID
	this.sponsor_head=data.sponsor_head;//赞助主办方头像
	this.sponsor_name=data.sponsor_name;//赞助主办方名称
	this.sponsor_user_id=data.sponsor_user_id;//主办方用户ID
	this.start_time=data.start_time;//赞助开始时间
	this.end_time=data.end_time;//赞助结束时间  
	this.content_details=data.content_details;//赞助内容详情   
	this.support_repay_array=data.support_repay_array;//赞助回报（数组形式返回）
	this.end_time_fm=data.end_time_fm;//赞助开始时间  
	this.start_time_fm=data.start_time_fm;//赞助结束时间
	this.sponsor_phone=data.sponsor_phone;//联系电话
	this.login_user=data.login_user;//登陆状态0没登录 1已登陆
	var st_name="赞助中"
		if(data.end_time<new Date().getTime()){
			data.status=7;
		}	
		var oi_p="",c_colour='';
	
		switch(data.status){
		  case 0:st_name="保存";oi_p='bg_gray';c_colour="gray";break;
		  case 1:st_name="通过";oi_p='bg_gray';c_colour="gray";break;
		  case 2:st_name="拒绝";oi_p='bg_gray';c_colour="gray";break;
		  case 3:st_name="待审核";oi_p='bg_gray';c_colour="gray";break;
		  case 4:st_name="预热中";oi_p='ack_button';break;
		  case 5:st_name="赞助中";break;
		  case 6:st_name="赞助成功";break;
		  case 7:st_name="赞助失败";oi_p='bg_gray';c_colour="gray";break;
		  case 8:st_name="已结束";oi_p='bg_gray';c_colour="gray";break;
		}
		this.oi_p=oi_p
		this.c_colour=c_colour
		this.st_name=st_name;//赞助名称 
}
/*票卷列表*/
function ticket_volume_list(data){
	 this.start_time=data.start_time;//活动开始时间
	 this.end_time=data.end_time;//活动结束时间
	 this.sponsor=data.sponsor;//活动主办方 
	 this.ticket_name=data.ticket_name;//票种名称
	 if(this.ticket_name==""){
		 this.ticket_name="免费" 
	 }
	 this.price=data.price==""?0:data.price;//总金额
	 this.order_id=data.order_id;
	 this.activity_id=data.activity_id;//活动id
	 this.name= data.name;//活动名称
	 this.ticket_id=data.ticket_id;//票种id
	 this.poster=data.poster;//封面 
	 this.count =data.count;//票种张数 
	 var active_state="未开始";//活动状态
	 switch(data.activity_status){
	 	case 1:active_state="未开始";break;
	 	case 2:active_state="进行中";break;
	 	case 3:active_state="结束";break;
	 }
	 this.activity_status=active_state;
}

/*用户信息*/
	function user_info(data){
		this.contact_info=data.user_phone//手机号码
		
	/*	this.creator=data[0].creator//邮箱
*/		/*this.create_date=data[0].create_date;
		this.identity_id=data[0].identity_id//身份证号码
		this.real_name=data[0].real_name//姓名
		this.user_detail_id=data[0].user_detail_id*/
		this.user_id=data.user_id//用户ID
		this.Individuality_signaturedata=data.user_sign;//个性签名
		this.user_icon=data.user_icon;//用户头像
		this.set_a=data.user_sex;//性别
		var ehg_a="男"
		if(data.user_sex==2){
			ehg_a="女"
		}   
		this.ehg_a=ehg_a
		this.industry=data.industryId//行业ID
		this.user_name=data.user_name;//用户昵称
	
	}
	
	/*我的赞助*/
	
	function sponsorship_details(data){
	  this.id=data.id  //赞助ID
	  this.start_time=data.start_time;//开始时间
	  this.covers=data.covers[0];//赞助封面
	  this.name=data.name;//赞助标题   
	  this.status=data.status;// 0:保存、1:通过、2:拒绝、3:待审核、4:预热中、5:赞助中、6:赞助成功、7:赞助失败
	  var suyt=['保存','通过','拒绝','待审核','预热中','赞助中','赞助成功','赞助失败'];
	  this.st=suyt[data.status];//获取赞助状态
	  if(data.now_money==null){
		  this.now_money=0  
	  }else {
		  this.now_money=data.now_money
	  }//已筹金额
	  this.join_num=data.join_num;//参与人数
	  this.com_num=data.com_num;//留言
	  this.pay_id=data.pay_id;//订单ID
	  this.start_time_fm=data.start_time_fm;//开始时间
	  this.end_time_fm=data.end_time_fm;//结束时间
	  this.title=data.title;//赞助标题
	  this.target_amount=data.target_amount;//目标金额
	  this.content_detail=data.content_detail; //支付人信息
	  this.create_support_phone=data.create_support_phone;//主办方电话
	  this.create_support_user_name=data.create_support_user_name;//主办方名字
	  this.my_pay_money=data.my_pay_money;//支付金额
	  this.num=data.num;//支付数量
	  this.order_id=data.order_id;//订单ID
	  this.pay_id=data.pay_id;//支付ID
	  this.pay_time=data.pay_time;//回报时间
	  this.repay_content=data.repay_content;//回报内容
	  this.repay_time=data.repay_time;//回报时间
	  this.repay_title=data.repay_title;//回报标题
	  this.total_money=data.total_money; //赞助总金额	
	}
	/*赞助详情--参与人数*/
	function timestamp_p(data){
		 this.nick_name=data.nick_name;//用户名称
		 this.user_icon=data.user_icon;//用户头像
		 this.timestamp= data.timestamp;//回报时间
		 this.repay_title= data.repay_title;//回报备注
		 this.phone= data.phone;//手机号码
		 this.num= data.num;//数量
		 this.from_info= data.from_info;//表单
		 this.unit_price=data.unit_price;//赞助金额
	} 
	
	/*我的赞助  --赞助详情*/
	function takein_detail(data){
		  var t_detail=data;
		  this.pay_user_name=t_detail.pay_user_name;//用户名称
		  this.amount=t_detail.amount;//赞助金额
		  this.repay_title=t_detail.repay_title;//回报标题 
		  this.unit_price=t_detail.unit_price;//单价金额
		  this.num=t_detail.num;//支持数量
		  this.order_id=t_detail.order_id;//订单号
		  this.from_info=t_detail.from_info;
		  this.nick_name=t_detail.nick_name;
	}
	/*我的赞助  --支付详情*/
	function income_details(data){
		this.name_p=data.name;//赞助名称
		this.amount=data.amount;//支付金额
		this.num=data.num;//数量
		this.order_id=data.order_id;//订单号
		this.time=data.create_time.time;//创建时间
		var  content_detail=$.parseJSON(data.content_detail)
		this.name=content_detail.name==undefined?"/":content_detail.name;//姓
		this.tel=content_detail.tel==undefined?"/":content_detail.tel;//电话
		this.address=content_detail.address==undefined?"/":content_detail.address;//地址
		this.repay_title=data.repay_title;//标题
		this.repay_content=data.repay_content;//回报介绍
		this.time_p=data.repay_time.time;//支付时间
		this.user_name=data.user_name;//发起人姓名
		this.user_phone=data.user_phone;//联系电话
		this.telephone=data.telephone
	}
/*	活动报名详情*/
	function query_consumption_user_list(data){
		this.name=data.from_info.姓名==undefined?data.from_info.name:data.from_info.姓名;//姓名
		this.tel=data.from_info.手机号码==undefined?data.from_info.tel:data.from_info.手机号码;//手机号码
		this.user_icon=data.user_icon;//头像
		this.ticket_name=data.ticket_name;//票卷名称
		this.price=data.price;//票卷价格
		this.sign_status=data.sign_status;//签到状态
 
	}
	/*个人中心我的白条*/
	function query_page(data){
		this.id=data.id;//白条id
		this.activity_id=data.activity_id;//活动id
		this.name=data.name;//白条名称
		this.sex=data.sex;//性别
		this.phone=data.phone;//手机号码
		this.apply_money=data.apply_money;//申请资金
		this.contact_status=data.contact_status;//1审核中, 2审核成功,3审核失败,4已放款'
		var tyiy_a=["","审核中","审核成功","审核失败","已放款"]
		var bg_se=["","bgls","bgred","bghs","bgyellwo"]
		this.con_text=tyiy_a[this.contact_status]
		this.user_remark=data.user_remark;//用户备注
		this.remark=data.remark;//备注
		this.create_time=data.create_time;//创建时间
		this.periods=data.periods+"期";//期数
		this.bg=bg_se[this.contact_status]
	}

	
	
	/*活动详情*/
	  function activity_detail(info){
		  this.images_po=info.cover_url;//活动详情轮播图
		  this.title=info.name;//活动详情轮标题
		  this.activity_min_money=info.activity_min_money;//票劵价格最低多少元起
		  this.activity_time=info.activity_time;//活动详情开始和结束时间
		  this.browse_count=info.scan;//活动详情浏览次数
		  this.join_count=info.join_count;//活动详情参与人数
		  this.industry_id=info.industry_id;//活动详情行情ID
		  this.address=info.city_name+" "+info.address;//活动详情地址
		  if(info.type==10){
			  this.address=info.address;//活动详情地址
		  }
		  this.startDate=info.start_time_fm;//活动开始时间
		  this.endDate=info.end_time_fm;//活动结束时间 
		  this.sDate_time=info.start_time;//活动开始时间
		  this.eDate=info.end_time;//活动结束时间
		  this.person_limit=info.person_limit;//活动活动席位（人数上限）
          var clkj_show="",
          broadcast=true;//为真的时候直播正在进行中  否则直播结束
		  if(info.live_status==1){//1有直播  0没有直播
			  clkj_show="/img/seeding_p.png";
		  }else{
			  clkj_show="/img/live.png";
		  }
		  if(info.play_status=="disconnected"){//disconnected断开直播    connected：直播中
			  broadcast=false
		  }
		  this.broadcast=broadcast;
          this.mnbv=info.live_status;
		  this.live_status=clkj_show;
		  this.sponsor_head=info.sponsor_head;//活动主办方头像  
		  this.sponsor_name=info.sponsor_name;//主办方姓名
		  this.sponsor_user_id=info.sponsor_user_id;//主办方id
		  this.honored_guest=info.honored_guest;//活动嘉宾数据
		  this.details=info.details;//活动详情
		  this.consumption_count=info.consumption_count;//活动报名人数
		  this.con_iu=info.consumption_count==0?'':'('+info.consumption_count+'人)';//活动报名人数
		  this.comment_count=info.comment_count;//活动评论总数量
		  this.ticket_list=info.ticket_list;//活动票种数据
		  this.detail_config=info.form_config;//活动表单
		  this.detail_config_a=JSON.stringify(info.form_config);//活动表单
		  this.status=info.status;//活动发布状态  0=发布 1保存
		  this.province_name=info.province_name;//省份
		  this.city_name=info.city_name;//城市
		  this.city=info.city;//城市id
		  this.type=info.type;//活动类型
		  this.contact_way=info.contact_way;//联系方式
		  this.sponsor_auth=info.sponsor_auth;//是否认证主办方 ：0为未认证，1为已认证
		  this.is_applay=info.is_applay;//活动是否报名  是否报名
		  this.reg_clas=""
		  var registration={"code":0,"msg":"我要报名"}
		  if(this.is_applay==null){
			  registration.code=-1;
			  registration.msg="我要报名";
		  }
	
		  if(this.is_applay==true){
			  registration.code=1;
			  registration.msg="已报名";
			  this.reg_clas="bgyellow"
		  }
		  
		  if(this.eDate<new Date().getTime()){
			  registration.code=2;
			  registration.msg="活动已结束";
			  this.reg_clas="bghs"
		  }
		  this.registration=registration;
		  this.sign_count = info.sign_count ; // 签到总人数
		  this.unsign_count = info.unsign_count ; // 未签到总人数
		  this.live_url=info.live_url; // 视频直播地址
		  this.sponsor_url=info.sponsor_url; // 二维码
		  this.vote=info.vote;//投票
		  var consumption_list=[];//自己购买的票卷
		  this.is_collect=info.is_collect==null||info.is_collect==undefined?-1:info.is_collect
		  this.act_cl=""
          if(this.is_collect>0){
        	  this.act_cl="ls"
          }		
		  var collect="",bgclass="";
		  if(info.is_collect==1){
			  collect="取消关注"
			   bgclass="bgdiso"	   
		  }else{
			  collect="关注TA"
				  bgclass="" 
		  }
		  this.collect=collect
		  this.bgclass=bgclass
		  $(info.consumption_list).map(function(){
			  var consump_info_name={}
			  consump_info_name.order_id=this.order_id //订单号 
			  this.code_use==1?consump_info_name.code_use="未使用":consump_info_name.code_use="已使用"
			 /* consump_info_name.code_use=this.code_use //是否使用
	*/		  consump_info_name.entry_code=this.entry_code //票号
			  consump_info_name.ticket_id=this.ticket_id  //票ID
			  consump_info_name.ticket_name=this.ticket_name //票名称
			  consump_info_name.ticket_price=this.ticket_price //票价格
			  consump_info_name.consump_info_name=this.consump_info_name //报名人姓名
			  consump_info_name.consump_info_tel=this.consump_info_tel//报名人手机
			  consump_info_name.consump_info_time=this.consump_info_time;//购买时间
			  consumption_list.push(consump_info_name);
		  })
		   this.sp_cl="";
		   this.sp_bg="";
	       this.consumption_list=consumption_list
	       this.support_id=info.support_id==null?0:info.support_id;//赞助id
		   this.target_amount=info.target_amount==null?0:info.target_amount;//目标金额
		   this.now_money=info.now_money==null?0:info.now_money;//已筹金额
		   this.ratio=info.ratio==null?'0%':info.ratio;//赞助进度
		   if( this.support_id!=0){
			   this.sp_cl="hs"
			   this.sp_bg="bgred"   
		   }
		   this.is_free=info.is_free;//0.免费  1收费
		   this.sponsor_intro=info.sponsor_intro;//主办方认证后获得主办方简介
		   this.attention_sponsor=info.attention_sponsor;//是否关注主办方
		   if(this.attention_sponsor==0){
		   	this.attent_text="关注TA";
		   	this.attent_class="contract_de2";	
		   	this.dataX=0;
		   }else{
		    this.attent_text="取消关注";
		    this.attent_class="contract_de3";
		    this.dataX=1;
		   }	
		   
		   if(info.share_count<0){//分享次数
		   	this.share_count="";
		   }else if(info.share_count>0&&info.share_count<100){
		   	this.share_count=info.share_count;
		   }else if(info.share_count>=99){
		   	this.share_count=99+"+";
		   }
		   
		   if(info.collect_count<0){//收藏次数
		   	this.collect_count="";
		   }else if(info.collect_count>0&&info.collect_count<100){
		   	this.collect_count=info.collect_count;
		   }else if(info.collect_count>=99){
		   	this.collect_count=99+"+";
		   }
		   
		  
	  }
	  
	   /*签到墙*/
	    function consumption_list(data){
	    	 this.user_icon=data.user_icon;//用户头像
	    	 this.name=data.from_info.姓名;
	      	 this.tel=data.from_info.手机号码;
	    }
	  /*  
	  参与人数*/
	  function activity_id_by_consumption_list(rows){
		  this.consumptionId=rows.consumptionId;// consumptionId
		  this.user_icon=rows.user_icon ;//用户头像
		  this.nick_name=rows.nick_name ; //昵称
		  this.phone=rows.phone ;//电话
		  this.timestamp=rows.timestamp ;//报名时间戳
		  this.entry_code=rows.entry_code ; //票券号
		  this.price = rows.price ; // 票价
		  this.order_num = rows.order_num; //订单号
		  this.ticket_name = rows.ticket_name ; // 票券名	
		  this.sign_status = rows.sign_status ; // 票券状态
		  this.from_array=[];  // 报名具体数据  
		  for (var key in  rows.from_info )
		  {  
			  var _from={};
			  _from.key=key;
			  _from.val=rows.from_info[key];
			  this.from_array.push(_from);
		  }
		  this.is_remind = rows.is_remind ; // 是否发送短信 0--已发短信 1--未发短信
	  }
	  
	  
	  /*活动详情留言*/
	  function comment_list_f(rows){
		 this.id= rows.id;  //评论编号
		 this.source_id= rows.source_id;  //来源编号
		 this.childsComment= rows.childsComment;  //二级留言
		 this.comment_type= rows.comment_type;  //【0:案例,1:活动,2:众筹,3:设计师】
		 this.user_id= rows.user_id;  //评论者
		 this.comment_content= rows.comment_content; //评论内容
		 this.create_time= rows.create_time; // 创建时间 
		 this.status= rows.status;   //【0:审核中,1:审核通过,2:审核未通过】
		 this.superior=rows.superior;  //上级
		 this.user_name=rows.user_name;  //用户名
		 this.user_icon=rows.user_icon;  //用户头像
	  }
	
	/*投票详情*/
	function query_vote(data){
		this.id=data.id;//投票id
		this.activity_id=data.activity_id;//活动id
		this.user_id=data.user_id;//用户ID
		this.title=data.title;//投票标题
		this.detail=data.detail;//投票简介
		this.type=data.type;//1为单选，2为多选
		this.end_time=data.end_time;//投票结束时间
		this.create_time=data.create_time;//投票创建事件
		this.voteItemList=data.voteItemList;//投票详情数组	
		this.is_vote=data.is_vote;//0未投票 1已投票

	}
	

     
     
/*	微信返回来的参数*/
	function wx_coi(data){
		this.appId=data.appid;//公众号名称，由商户传入     
		this.timeStamp=data.timestamp; //时间戳，自1970年以来的秒数     
		this.nonceStr=data.noncestr;//随机串     
		this.package="prepay_id="+ data.prepayid;
		this.signType="MD5"
		this.paySign=data.sign; //微信签名方式     
	}
	
	/*	个人中心e币查询余额*/
	function e_coin_De(data){
		this.order_id=data.order_id;//订单id   
		this.re_way=data.re_way; //充值日志id     
		this.trade_amount=data.trade_amount;//总余额  
		this.trade_id=data.trade_id;//交易ID
		this.trade_balance=data.trade_balance;//交易金额
		 var o_trade_source={"0":"充值","1":"红包","2":"积分","3":"提现","4":"活动经费众筹失败","5":"活动经费众筹成功","6":"招商推广","7":"众筹支付","8":"邀请用户","9":"发布报名活动","10":"发起者认证","11":"兑换流量","12":"管理员充值E币","13":"完善手机资料","14":"分享提成","15":"兑换积分"}    		
		 this.trade_source=o_trade_source[data.trade_source]; //0:充值,1:红包,2:积分,3:提现,4:活动经费众筹失败,5:活动经费众筹成功,6:招商推广,7:众筹支付,8:邀请用户,9:发布报名活动,10:发起者认证,11:兑换流量,12:管理员充值E币,13:完善手机资料,14:分享提成,15:兑换积分    
		 this.trade_time=data.trade_time; //交易时间    
		this.trade_type=data.trade_type; //交易类型（0为充值，1为支出） 
		this.user_id=data.user_id; //用户id
		this.re_remark=data.re_remark; //用户备注
	}
	/*	主办方发起的活动列表*/
	function person_list(data){
		this.id=data.id;//活动id
		this.activity_first_face=data.activity_first_face;// 活动封面
		this.activity_title=data.activity_title;//活动标题
		this.activity_address=data.activity_address;//活动地址
		this.activity_time=data.activity_time;//活动时间
		this.person_limit=data.person_limit;//活动人数限制，0位不限额 
		this.target_money=data.target_money==null?0:data.target_money;//目标金额
		this.now_money=data.now_money==null?0:data.now_money;//已筹金额
		this.schedule=data.schedule==null?'0%':data.schedule;//赞助进度
		if(this.target_money>0||this.now_money>0){
			this.skjhg_s="hs";
		}
		this.is_free=data.is_free;//是否免费：0为免费，1为收费
	}
	
	/*主办方详情*/
	function secrchH(data){
		this.name=data.name;//主办方名字
		this.introduction=data.introduction;//主办方简介
		this.sponsor_icon=data.sponsor_icon;//主办头像
		this.act_sum=data.act_sum;//发布活动总数
		this.fans_sum=data.fans_sum;//主办方关注人数
		this.id=data.id;//主办方ID
		this.sign_sum=data.sign_sum;//主办方总参与人数
		this.signSize=data.sponsoractivitycountAndjoincount.signSize==null?0:data.sponsoractivitycountAndjoincount.signSize;
		this.activitySize=data.sponsoractivitycountAndjoincount.activitySize==null?0:data.sponsoractivitycountAndjoincount.activitySize;
		this.attention_sponsor=data.attention_sponsor//主办方是否关注，0位未关注，1为已关注	
		this.comment_count=data.comment_count//评论总人数
		this.contacter_phone=data.contacter_phone//联系电话
	}
	
	/*活动号列表*/
	function  getSponsorApply(data) {
		this.id=data.user_id;//用户id
		this.name=data.name;//活动号名称
		this.introduction=data.introduction;//活动号简介
		this.sponsor_icon=data.sponsor_icon;// 
		var jkmnb="bgdiso",lkoi="已关注",ltype=false
		this.atntion=data.is_attention
		if(this.atntion==0){//0没关注  1已关注
			jkmnb=""
			lkoi="关注TA"
			ltype=true
		}
		this.ltype=ltype
		this.is_attention=jkmnb;
		this.lkoi=lkoi
	}
