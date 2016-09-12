(function() {
/* 
 * 张晗
 * 我的账号
 * 用户模块
 */

angular.module('user', ['activity_servrt','directive_mml', 'common', 'request', 'ui.router'])
		// ======================= 登录 ==============================
		/* @ngInject */
		.controller('signinCtrl', function($scope,httpService,$rootScope, messageService, $stateParams, $state, $location,act_date, $window) {
			// 底部栏样式
			$('.mml_bottom').show();
			$('.mml_bottom a').removeClass('bottom_act').eq(4).addClass('bottom_act');
			// 头部城市
			$(".ds_poiu_a").removeClass("show_a");
			$(".retreat_icon").removeClass("none");  
			// 登录方式
			$scope.signinType = 'weixin';
			$scope.changeSigninType = function() {
				$scope.signinType = 'phone';
			}

			// 获取用户登录状态
			httpService.getDatas('GET', '/user/verifyUserLogin', {}, 'data').then(function(data) {
				if(data.code!=0&&data.code!=-1){
    				$state.go("signin");
    				return false;
    			}
    			if($stateParams.url!=null){
                    $location.path($scope.url);
	            } else {
	                $state.go("personal_center");
	            }
			});

			// 忘记密码
			$scope.forgetPwd = function() {
				messageService.show('忘记密码请到PC端修改');
			}  
			
			// 活动报名数据
			if(act_date.date.activity_id==undefined){
				act_date.date=0
			} 
			$scope.form_login = JSON.stringify(act_date.date);	
			$scope.activityData = act_date.date;

			// 跳转
			$scope.route = function(data) {
				if(data.code == 0) {
					if($rootScope.mySignin) {
						$state.go('personal_center');

					} else {
						$window.history.back();
					}
                } else if(data.code == 1){
                    $state.go('activity_success', {'t_id': data.msg});
                } else if(data.code == 2) {
                    $state.go('activity_detail', {'id': data.msg});
                } else {
                    messageService.show(data.msg);
                }
			}
		})
		// ======================= 注册 ============================
		/* @ngInject */
		.controller('registerCtrl', function($scope,activity_data,$location) {
			$(".mml_bottom a").removeClass("bottom_act");
			$(".mml_bottom a").eq(4).addClass("bottom_act");
			$(".ds_poiu_a").removeClass("show_a");
			$(".retreat_icon").removeClass("none");  
			 var countdown=true,countdown_time=90,reret=true;//倒计时
			 
			$scope.register={
					"verification_code":function(){
						 var rit_phone=$("#rit_phone").val(),//手机号码
						 	 valueCode=$("#valueCode").val(),//图形验证码
						 	 kmnb_p={}
						 kmnb_p.user_phone=rit_phone
						 kmnb_p.code=valueCode
						 	
					     if(!form_mm.isnull(rit_phone)){
						     mui.alert('请输入手机号码', 'E场景活动', function() {
						    	 $("#rit_phone").focus()
						     });
						     return;
					 	 }
					 	  if(!form_mm.tel(rit_phone)){
							  mui.alert('手机号码格式错误', 'E场景活动', function() {
								  $("#rit_phone").focus()
							  });
							  return;
						  }
					 	 if(!form_mm.isnull(valueCode)){
						     mui.alert('请输入图形验证码', 'E场景活动', function() {
						    	 $("#valueCode").focus()
						     });
						     return;
					 	 }
					 	 if(!countdown){
					 		 return
					 	 }
					 	 if(countdown){
					 		activity_data.registerCode(kmnb_p).then(
						    		function success(data){
						                 if(data!=0){
						                	 alert(data.msg)
						                	  $("#valueCode").focus();
						      			    	 $scope.register.replace()
						                	   return;
						                 }
						                 countdown=false;
						             	var down_time=setInterval(function(){
								 			if(--countdown_time>0){
								 				$(".df_poiu_a").text(countdown_time).css({"background":"#e0e0e0","width":"70px"})
								 			}else{
								 				 countdown=true;
								 				clearTimeout(countdown_time)
								 				$(".df_poiu_a").css({"background":"#4FA45D"}).text("获取验证码")
								 			}
								 			
								 		}, 1000);
						    		}, function error() {
						    			 mui.alert('短信验证发送失败', 'E场景活动', function() {
					      			    	 $("#valueCode").focus()
					      			     });
						   });
					 	
					 		
					 	 }
					},"replace":function(){//更换图形验证码
						$(".verification_code").attr("src","/validateImageServlet?v="+new Date().getTime())
					},"register_event":function(){//注册按钮点击方法
						var rit_phone=$("#rit_phone").val(),//手机号码
				    		valueCode=$("#valueCode").val(),//图形验证码
				    		rit_code=$("#rit_code").val(),//短息验证码
				    		rit_pwd=$("#rit_pwd").val(),//密码
				    		rit_pwdT=$("#rit_pwdT").val(),//确认密码
				    		data_ur={}
							data_ur.user_phone=rit_phone
							data_ur.user_password=$scope.decrypt_p.aesEncrypt(rit_pwd,$scope.decrypt_p.aesKey,$scope.decrypt_p.ivStr)
							data_ur.sms_code=rit_code 
						
						
						 if(!form_mm.isnull(rit_phone)){
						     mui.alert('请输入手机号码', 'E场景活动', function() {
						    	 $("#rit_phone").focus()
						     });
						     return;
					 	 }
					 	  if(!form_mm.tel(rit_phone)){
							  mui.alert('手机号码格式错误', 'E场景活动', function() {
								  $("#rit_phone").focus()
							  });
							  return;
						  }
					 	 if(!form_mm.isnull(valueCode)){
						     mui.alert('请输入图形验证码', 'E场景活动', function() {
						    	 $("#valueCode").focus()
						     });
						     return;
					 	 }
					 	 if(!form_mm.isnull(rit_code)){
						     mui.alert('请输入短息验证码', 'E场景活动', function() {
						    	 $("#rit_code").focus()
						     });
						     return;
					 	 }
					 	 
					 	 if(!form_mm.isnull(rit_pwd)){
						     mui.alert('请输入密码', 'E场景活动', function() {
						    	 $("#rit_pwd").focus()
						     });
						     return;
					 	 }
					 	 if(rit_pwd.length<6){
						     mui.alert('密码不能小余6位', 'E场景活动', function() {
						    	 $("#rit_pwd").focus()
						     });
						     return;
					 	 }
					 	 if(!form_mm.isnull(rit_pwdT)){
						     mui.alert('请输入确认密码', 'E场景活动', function() {
						    	 $("#rit_pwdT").focus()
						     });
						     return;
					 	 }
					 	 if(rit_pwd!=rit_pwdT){
						     mui.alert('两次密码输入不一致', 'E场景活动', function() {
						    	 $("#rit_pwdT").focus()
						     });
						     return;
					 	 }
					 	$(".sys-loading").addClass("show_a")
					 	if(!reret){
					 		return
					 	}
					 
					 	activity_data.doRegister(data_ur).then(
					    		function success(data){
					    			reret=true;
					    			$(".sys-loading").removeClass("show_a")
					    			if(data.code!=0){
					    			
					    				mui.alert(data.msg, 'E场景活动');
					    				return
					    			}
					    		
					    			$location.path("personal_center")
					    		}, function error() {
					    			 mui.alert('注册失败', 'E场景活动', function() {
					    				 reret=true
					    		});
					   });
						reret=false  
			}}
			
			
		}) 
		// =============================== 个人信息 =========================
		/* @ngInject */
		.controller('userInfoCtrl',function($scope,activity_data,httpService,$location,act_date, $rootScope) {
			$(".mml_bottom a").removeClass("bottom_act");
			$(".mml_bottom a").eq(4).addClass("bottom_act");
			$(".ds_poiu_a").removeClass("show_a");
			$(".retreat_icon").removeClass("none"); 
			$(".mml_bottom").show()
		    mui.previewImage();
		    var kmnb_p=true;
		     $scope.deteail_a=function(x){  
		    	 act_date.set_act_date(x);
		    }
			$scope.pe_er={   
					"user_icon_o":{},
					"logged_out":function(){//退出登录
						activity_data.clear_cookie().then(
					    		function success(data){
					    			 $location.path("/index");
					    			 // 重置登录状态
					    			 $rootScope.mySignin = false;
					    		}, function error() {
									console.log("退出登录失败");
					    });
						
					},
					"modify_data":function(){//修改资料
						var nickname=$("#nickname").val(),//昵称
						sex_may=$("#sex_may").val(),//性别
						industry_id=$("#industry_id").val(),//行业
						signature=$("#signature").val(),//签名
						user_id=$scope.pe_er.user_icon_o.user_id
						if(!kmnb_p){
							return
						}
						activity_data.updateUserInfo_to(user_id,nickname,sex_may,industry_id,signature).then(
					    		function success(data){
					    			kmnb_p=true
					    			if(data.code!=1){
					    				return
					    			}
					    			$location.path("personal_center")
					    			
					    			$(".sys-loading").removeClass("show_a")
					    		}, function error() {
									console.log("修改密码失败");
					    });
						kmnb_p=false
						
					}
			}
		 	activity_data.selectOne().then(
		    		function success(data){
		    			if(data.code!=0&&data.code!=-1){
		    				  $location.path('/signin')
		    				  return
		    			}
		    			$scope.pe_er.user_icon_o=new user_info(data.info)
		    		}, function error() {
						console.log("获取用户信息失败");
		    });

		    /*
		     * 张晗
		     * 主办方认证
		     * 获取主办方当前状态（0表示编辑表单，1表示成功，2表示失败，3表示等待审核）
		     */
		    httpService.getDatas('GET', '/sponsor/get_sponsorapply').then(function(data) {
		    	if(data.code == 0 && data.info.status == 1) {
					$scope.sponsorStatus = true;
					$scope.status = 1;
				} else {
					$scope.sponsorStatus = false;
					$scope.status = data.info.status;
				}
		    });
			
		})

		// ============================= 个人信息修改 ==============================
		/* @ngInject */
		.controller('userInfo_editCtrl', function($scope,$location,activity_data,$state,$stateParams,act_date) {
			 $scope.type = 1;
			 $scope.type=$stateParams.type;//1为昵称，2为性别，3为修改密码，4为个性签名，5为行业
			 $scope.pass_m=act_date.date;
			 $scope.industry_a=classify_p()[1].maker_title;
			$scope.save_personsal=function(){
		     	if($stateParams.type==1){
		     	act_date.date.user_name=$("#nichen").val();
		     }else if($stateParams.type==2){
		     	if($("#modify_sex").attr("data-id")){
		     		act_date.date.user_sex=parseInt($("#modify_sex").attr("data-id"))+1;
		     	}    	
		     }else if($stateParams.type==4){
		     	act_date.date.user_sign=$("#modify_signinature").val().trim();
		     }else if($stateParams.type==5){
		     	if($("#modify_industry").attr("data-id")){
		     		act_date.date.industryId=parseInt($("#modify_industry").attr("data-id"))-1;
		     	} 
		     }
				   activity_data.modifyPerson(act_date.date).then(
				    		function success(data){    		
				    			  if(data.code!=0){
				    				  mui.alert(data.msg);  
				    				  return;
				    			  }
				    		$state.go('userInfo');
				    			
				    		}, function error() {
								console.log("修改基本信息失败");
				    });
			  }
			 
			 
		     $scope.modify_passord=function(){
		     	var old_pass=$("#old_pass").val().trim();//旧密码
		     	var new_pass=$("#new_pass").val();//新密码
		     	var confirm_pass=$("#confirm_pass").val();//认证密码
		     	if(!form_mm.isnull(old_pass)){
					  mui.alert('请输入原密码', 'E场景活动', function() {
						  $("#old_pass").focus()
					  });
					  return;
				  }
		     	if(!form_mm.isnull(new_pass)){
					  mui.alert('请输入新密码', 'E场景活动', function() {
						  $("#new_pass").focus()
					  });
					  return;
				  }
		     	if(!form_mm.isnull(confirm_pass)){
					  mui.alert('请输入确认密码', 'E场景活动', function() {
						  $("#confirm_pass").focus()
					  });
					  return;
				  }
		     	if(new_pass!=confirm_pass){
					  mui.alert('两次输入的密码不同', 'E场景活动', function() {
						  $("#account").focus()
					  });
					  return;
				 }
		     	if(old_pass==confirm_pass){
					  mui.alert('新密码不能与原密码相同', 'E场景活动', function() {
						  $("#account").focus()
					  });
					  return;
				 }
		     	if(new_pass.length<6){
					  mui.alert('输入的密码不能小于6位', 'E场景活动', function() {
						  $("#account").focus()
					  });
					  return;
				 }
		     	 
		     	
		     	
		     	 var u_old_pass=$scope.decrypt_p.aesEncrypt(old_pass,$scope.decrypt_p.aesKey,$scope.decrypt_p.ivStr)
		     	 var u_new_pass=$scope.decrypt_p.aesEncrypt(new_pass,$scope.decrypt_p.aesKey,$scope.decrypt_p.ivStr)
				  var datytt={}
				  datytt.old_pwd=u_old_pass   
				  datytt.new_pwd=u_new_pass
		     	activity_data.modifyPassord(datytt).then(
				    		function success(data){    		
				    			  if(data.code!=0){
				    				  mui.alert(data.msg);  
				    				  return;
				    			  }
				    			  mui.alert("密码修改成功")
				    			  $location.path("/userInfo");
				    			
				    		}, function error() {
								console.log("修改基本信息失败");
				    });
		     	
		     	
		     }
		     
		     $("body").off("focus").on("focus","input",function(){
		    	 $(".mml_bottom").hide()
		   	 })
			 $("body").off("blur").on("blur","input",function(){
			     $(".mml_bottom").show()
			 })
			  
			 var classify=classify_p()
			               

			 /*个人中心修改性别*/
				var picker_l = new mui.PopPicker();
					 picker_l.setData(classify[5].maker_title)
				$("body").off("tap").on("tap",".j-sexInput",function(){
					var hjhg=$(this).find('input');
					 	 picker_l.show(function (rl) {
				         $(hjhg).val(rl[0].text) 
				         $(hjhg).attr("data-id",rl[0].id)
					})
					
				}) 
				/*个人中心修改行业*/
				var picker_t = new mui.PopPicker();
					 picker_t.setData(classify[1].maker_title)
				$("body").on("tap",".j-industryInput",function(){
					var hjhg=$(this).find('input');
					 	 picker_t.show(function (rl) {
				         $(hjhg).val(rl[0].text) 
				         $(hjhg).attr("data-id",rl[0].id)
					})
				}) 
		})

		// ============================== 主办方认证 ===========================
		/* @ngInject */
		.controller('sponsor_authCtrl', function ($scope,httpService,$stateParams) {
			var vm = $scope;
			vm.sponsor = {};
			// 认证状态
			vm.status = $stateParams.status;
			// 获取认证数据
			httpService.getDatas('GET', '/sponsor/get_sponsorapply')
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
			// 重新认证，显示主办方认证表单
			$scope.reSponsorAuth = function () {
				vm.status = 0;
			}
		})


		/* 
		 * 我的钱包
		 * 用户模块
		 */

		// ==================== 我的钱包 ==========================
		/* @ngInject */
		.controller('walletCtrl', function($scope, httpService) {
			var wallet = this;
			httpService.getDatas('POST', '/eCoin/get_user_ecoin').then(function(data) {
				wallet.account = data.info;
			});
			httpService.getDatas('GET', '/bankAccount/query').then(function(data) {
				wallet.cardNum = data.info.length;
			});
		})
		// ===================== e币充值 ============================
		/* @ngInject */
		.controller('ecoin_rechargeCtrl', function($scope, activity_data) {
			$scope.e_coin_num=1;
            $scope.e_coin_btn=function(){
            	var e_coin=parseFloat($("#jq_e_coin").val());
            	if(e_coin<1){
            		mui.alert("请您输入大于1元的金额")
            		return
            	}
            var money=parseFloat($("#jq_e_coin").val())
            var url="https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}?money={2}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";		
    	    url = url.replace('{0}','wxca4f9653c04f3e8d').replace('{1}','http://m.apptown.cn/wechat/e_money_top_up_h5').replace('{2}',money);
    	    window.location.href=encodeURI(encodeURI(url));
         	
         	
            	
            }
			
		})
		// ================== 银行卡列表，删除银行卡 ====================
		/* @ngInject */
		.controller('bankcardCtrl', function($scope, httpService) {
			httpService.getDatas('POST', '/bankAccount/query').then(function(data) {
				$scope.bankCheck=data.info;
			});
			// 删除银行卡
			$scope.deleteCard=function(index,id){
				httpService.getDatas('POST','/bankAccount/delete',{"account_id":id}).then(function(data) {
					$scope.bankCheck.splice(index,1);
				});	
		    }
		})
		// ========================= 添加银行卡 =======================
		/* @ngInject */
		.controller('bankcard_addCtrl', function($scope, httpService, $state, $http) {
			var card = $scope.card = {};
			// 获取开户银行名称
			$scope.getBankName = function() {
				var name = card.bank_account;
				if(name && name.length > 6) {
					name = name.slice(0, 6);
				}
				$http.get('/json/bank.ownership.json').then(function(data) {
					card.bank_name = '';
					$(data.data).each(function(i, v) {
						if(name == v.bankid) {
							card.bank_name = v.bankname;
						}
					});
				});
			}
		})

		// ========================= e币详情 =======================
		/* @ngInject */
		.controller('ecoin_detailCtrl', function($scope, activity_data, $state, $http) {
			var datytt={"pageIndex":1};
			var data_arr=[];
			activity_data.eCoinDetail(datytt).then(
		    		function success(data){    		
		    			  if(data.code!=0){
		    				  mui.alert(data.msg);  
		    				  return;
		    			  }	
		    			  $(data.rows).map(function(){
		    				  var arr_t=new e_coin_De(this);
		    				  data_arr.push(arr_t);
		    			  })
		    			 
		    			 $scope.data_e=data_arr;
		    		}, function error() {
						console.log("e币查询失败");
		    });
		})


		/* 
		 * 个人中心、我的反馈、关于我们、服务协议
		 * 用户模块
		 */

		// ========================= 个人中心 =======================
		/* @ngInject */
		.controller('personal_centerCtrl', function($scope,activity_data,$location,act_date) { 
			$(".mml_bottom a").removeClass("bottom_act");
			$(".mml_bottom a").eq(4).addClass("bottom_act");
			$(".ds_poiu_a").removeClass("show_a");
			$(".retreat_icon").removeClass("none"); 
			$(".mml_bottom").show()
			// 用户头像放大
		    mui.previewImage();
		    var kmnb_p=true;
		    $scope.pe_er = {};
		 	activity_data.selectOne().then(
		    		function success(data){
		    			if(data.code!=0&&data.code!=-1){
		    				  $location.path('/signin')
		    				  return
		    			}
		    			$scope.pe_er.user_icon_o=new user_info(data.info)
		    		}, function error() {
						console.log("获取用户信息失败");
		    });
			
		})

		// ========================= 我的反馈 =======================
		/* @ngInject */
		.controller('feedbackCtrl', function($scope,activity_data,$location,act_date) { 
			$scope.pe_er = {};
			$scope.pe_er.feedback = function(){
				var suggestion_feedback=$(".suggestion_feedback").val().trim();//获取意见反馈信息
				
				if(!form_mm.isnull(suggestion_feedback)){
					mui.alert("意见反馈信息不能为空")
					$(".suggestion_feedback").focus();
					return;
				}
				activity_data.add_feedback({"content":suggestion_feedback}).then(
			    		function success(data){
			    			if(data.code!=0){
			    				mui.alert('意见反馈提交失败', 'E场景活动');
			    				  return;
			    			}
			    			mui.alert('意见反馈提交成功', 'E场景活动',function(){
			    				  $location.path('/signin')
			    			});
			    			 $location.path('/signin')
			    			
			    		}, function error() {
							console.log("意见反馈提交失败");
			    });
				
			}
		})



		/* 
		 * 我的活动、我的赞助、我的白条、我的票券
		 * 用户模块
		 */

		// ========================= 我的活动 =======================
		/* @ngInject */
		.controller('activity_userCtrl', function($scope,activity_data,$location,$stateParams) { 
			$(".mml_bottom a").removeClass("bottom_act");
			$(".mml_bottom a").eq(4).addClass("bottom_act");
			$(".ds_poiu_a").removeClass("show_a");
			$(".retreat_icon").removeClass("none"); 
			var data_act={"pageIndex":1,"pageSize":10,"user_id":$stateParams.user_id,"time_status":"","flag":"1","type":"0"}  // 1:未开始    3：已结束
			var poiu_po=true;

			var type=$stateParams.type
			$scope.type_p=$stateParams.type //1为参与的活动，2为发起的活动
			$(".sys-loading").addClass("show_a");
			$("body").on("click",".act_use_p a",function(){
				$(".act_use_p a").removeClass("cat_poo")
				$(this).addClass("cat_poo")
			})
			$scope.my_activities={ "activity_list":[],//初始化活动列表数据
				"participant":function(data_act){//参与的活动
			 	 activity_data.myTakePartInActivity(data_act).then(
			
				    		function success(data){
				     			$(".sys-loading").removeClass("show_a")
				    			if(data.code!=0){
				    				 $location.path('/signin')
				    				  mui.alert(data.msg, 'E场景活动');
				    				return;
				    			}
				    			
				    			poiu_po=true
				    			
				    			 $(data.rows).map(function(){
				    				 var khg=new query_activity_list(this)
				    				 khg.order_id=this.order_id
				    				 $scope.my_activities.activity_list.push(khg) 
				    			
				    			 })
				    		
				    		}, function error() {
								console.log("活动我的活动失败");
				    });
			},"category":function(ty){//参与活动类别查询
				$(".sys-loading").addClass("show_a");
				data_act.pageIndex=1
				data_act.time_status=ty
				$scope.my_activities.activity_list=[]
				type=parseInt(type)
				switch(type){
					case 1:$scope.my_activities.participant(data_act);break;
					case 2:$scope.my_activities.collection(data_act);break;
					case 3:$scope.my_activities.enshrine(data_act);break;
				}

			},"promotional_activities":function(){
				setTimeout(function(){
					++data_act.pageIndex;
					type=parseInt(type)
					switch(type){
						case 1:$scope.my_activities.participant(data_act);break;
						case 2:$scope.my_activities.collection(data_act);break;
						case 3:$scope.my_activities.enshrine(data_act);break;
					}
				
				},1000)
				
			},
			"collection":function(data_act){
				 activity_data.myLaunchActivity(data_act).then(
				    		function success(data){ 
				    			$(".sys-loading").removeClass("show_a")
				    		
				    			if(data.code!=0){
				    				 $location.path('/signin')
				    				  mui.alert(data.msg, 'E场景活动');		    				 
				    				return;
				    			}
				    		
				    			poiu_po=true;
				    			$(data.rows).map(function(){
				    				 var khg=new query_activity_list(this);
				    				 $scope.my_activities.activity_list.push(khg); 
				    			})
				    		
				    		}, function error() {
								console.log("活动我的活动失败");
				    });
				
			},
			"enshrine":function(data_act){//收藏活动
				 activity_data.myAtteActivityData(data_act).then(
				    		function success(data){    		
				    			if(data.code!=0){
				    				 $location.path('/signin')
				    				  mui.alert(data.msg, 'E场景活动');
				    				return
				    			}
				    			$(".sys-loading").removeClass("show_a")
				    			poiu_po=true
				    			
				    			 $(data.rows).map(function(){
				    				 var khg=new query_activity_list(this)
				    				 $scope.my_activities.activity_list.push(khg) 
				    				
				    			 })
				    		
				    		}, function error() {
								console.log("活动我的活动失败");
				    });
				
			}}
			
		 
		    var myscroll = new iScroll('wrapper',{
		   	 vScrollbar: false,
		   	 doubleTapZoom: 10, //双触放大几倍  
		        onScrollEnd: function(){
		              if(this.y == this.maxScrollY&&poiu_po){
		            	  	poiu_po=false
		            	  	$(".sys-loading").addClass("show_a")
		            		$scope.my_activities.promotional_activities();
		              }
		        }
		    })
		    /*列表遍历完执行*/
				$scope.$on('ngfinish', function(ngfinishEvent) {
				     myscroll.refresh();//刷新
				})
				
				switch(type){
				case "1":
					$(".user_ad_top a").removeClass("act_a");
					$(".user_ad_top a").eq(0).addClass("act_a");
					data_act.pageIndex=1
					data_act.time_status=0
					type=1
					$scope.my_activities.activity_list=[]
					$scope.my_activities.participant(data_act)
					$(".user_act_pii").removeClass("user_act_pii_p")
					break;
				case "2":
					$(".user_ad_top a").removeClass("act_a");
					$(".user_ad_top a").eq(1).addClass("act_a");
					data_act.pageIndex=1
					data_act.time_status=0
					type=2
					$scope.my_activities.activity_list=[]
					$scope.my_activities.collection(data_act)
				    $(".user_act_pii").addClass("user_act_pii_p")
					;break;
				case "3":
					$(".user_ad_top a").removeClass("act_a");
					$(".user_ad_top a").eq(2).addClass("act_a");
					data_act.pageIndex=1
					data_act.time_status=0
					type=3
					$scope.my_activities.activity_list=[]
					$scope.my_activities.enshrine(data_act)
					$(".user_act_pii").addClass("user_act_pii_p")
					;break;
			}
			

		})


		// ========================= 我的赞助 =======================
		/* @ngInject */
		.controller('sponsorship_userCtrl', function($scope,activity_data,$location,$stateParams,act_date) {
			$scope.type=$stateParams.type;//获取传过来的参数    1.发起在赞助  2，赞助的
			$scope.user_id=$stateParams.user_id;//获取传过来的user_id
			//filter赞助状态（6已成功，7已失败）timeStatus时间状态（预热中(1) , 赞助中(2)）
			var sp_data={"pageIndex":1,"pageSize":10,"status":"","user_id":$scope.user_id,"filter":"","timeStatus":"","sort":"1"} 

			var poiu_po=true;
			$(".act_use_p a").on("click",function(){
				$(".act_use_p a").removeClass("cat_poo")
				$(this).addClass("cat_poo")
			})
			$(".user_ad_top  a").on("click",function(){
				$(".user_ad_top  a").removeClass("act_a");
				$(this).addClass("act_a");
			})
			$scope.sponsorship={
		    		"sp_list":[],//发起的赞助列表信息
		    		"project_sponsor":function(sp_data){//发起的赞助
		    			$(".user_ad_top  a").removeClass("act_a").eq(0).addClass("act_a");
				     activity_data.my_launch_support(sp_data).then(
				    		function success(data){    		
				    			  if(data.code!=0){
				    				  return;
				    			  }
				    			  $(data.rows).map(function(){
				    				  var sp_date=new sponsorship_details(this);
				    				  $scope.sponsorship.sp_list.push(sp_date);
				    			  })	  
				    			  poiu_po=true
				    			    	$(".sys-loading").removeClass("show_a")
				    		}, function error() {
								console.log("获取赞助失败");
				    });
		    },"friendly":function(sp_data){//赞助的活动
		    	$(".user_ad_top  a").removeClass("act_a").eq(1).addClass("act_a");
		    	  activity_data.my_takein_support(sp_data).then(
				    		function success(data){    		
				    			  if(data.code!=0){
				    				  return;
				    			  }
				    			  $(data.rows).map(function(){
				    				  var sp_date=new sponsorship_details(this);
				    				  $scope.sponsorship.sp_list.push(sp_date);
				    			  })	  
				    			  poiu_po=true
				    			    	$(".sys-loading").removeClass("show_a")
				    		}, function error() {
								console.log("获取赞助失败");
				    });
		    },"sponsored_title":function(ty){//赞助标题点击
		    	$scope.type=ty
		    	$scope.sponsorship.status("",ty)
		    },"status":function(ty){//赞助分类
		    	$scope.sponsorship.sp_list=[]
		        sp_data.pageIndex=1;
		    	sp_data.status=ty;
		    	if($scope.type==1){
		    		$scope.sponsorship.project_sponsor(sp_data);
		    	}else if($scope.type==2){
		    		if(ty==6||ty==7){  
		    			sp_data.timeStatus=""; 
		    			sp_data.filter=ty;
		    		}else if(ty==5){
		    			sp_data.filter="";
		    			sp_data.timeStatus=2;    			
		    		}
		    		$scope.sponsorship.friendly(sp_data);
		    	}else if($scope.type==3){
		    	
		    		$scope.sponsorship.sp_list=[]
		            sp_data.pageIndex==1;
		    	}
		    	
		    },"refresh":function(){
		    	++sp_data.pageIndex;
		       if($scope.type==1){
		    	   $scope.sponsorship.project_sponsor(sp_data);  
		       }else{
		    	   $scope.sponsorship.friendly(sp_data); 
		       }
		    	
		    },"deteail_a":function(x){
		    	
		    	 act_date.set_act_date(x)
		    	 $location.path("sponsorship_payment/");
		    }
			
			}

		    switch($scope.type){
		    		case  "1":$scope.sponsorship.project_sponsor(sp_data);break;
		    		case  "2":$scope.sponsorship.friendly(sp_data);break;
		    		case  "3":$scope.sponsorship.sp_list=[];
		    				  sp_data.pageIndex==1;
		    				  $(".user_ad_top  a").removeClass("act_a").eq(2).addClass("act_a");
		    				  ;break;
		    }
			
			/*下拉刷新*/
			var myscroll = new iScroll('wrapper',{
			   	 vScrollbar: false,
			   	 doubleTapZoom: 10, //双触放大几倍  
			        onScrollEnd: function(){
			              if(this.y == this.maxScrollY&&poiu_po){
			            	  	poiu_po=false
			            	  	$scope.sponsorship.refresh();
			            	  	$(".sys-loading").addClass("show_a")
			              }
			        }
			    })
			    /*轮播图遍历完之后执行*/
					$scope.$on('ngfinish', function(ngfinishEvent) {
					     myscroll.refresh();//刷新
				  })
			

		})

		// ========================= 我的赞助详情 =======================
		/* @ngInject */
		.controller('sponsorship_user_detailCtrl', function($scope,activity_data,$location,$stateParams) { 
			var sp_id=$stateParams.id;	
			var  data_p={"activity_support_id":sp_id,"peo_num":"","pageSize":25,"pageIndex":1};
	        $scope.my_sponsorship={
	        		"money":$stateParams.money,//获取传过来的已筹金额
	        		"peo_num":$stateParams.peo_num,//获取传过来的人数
	        		"data_array":[],
	        		"particulars":function(data_p){
	        			activity_data.takein_detail(data_p).then(
	        		    		function success(data){    		
	        		    			  if(data.code!=0){
	        		    				  return;
	        		    			  }
	        		    			  $(data.rows).map(function(){
	        		    				  var data_o=new takein_detail(this)
	            		    			  $scope.my_sponsorship.data_array.push(data_o)
	        		    			  })
	        		    			  console.log($scope.my_sponsorship.data_array)
	        		    		
	        		    		}, function error() {
	        						console.log("获取赞助详情失败");
	        		    });
	        		}
	        }
			$scope.my_sponsorship.particulars(data_p);
		
		})


		// ========================= 我的赞助支付 =======================
		/* @ngInject */
		.controller('sponsorship_paymentCtrl', function($scope,activity_data,$location,$stateParams,act_date) { 
			$scope.act_d=act_date.date;//初始化活动详情数据
			if($scope.act_d==0){
				   window.history.back();
				   return
			}
			console.log($scope.act_d)
		})


		// ========================= 我的白条 =======================
		/* @ngInject */
		.controller('lous_userCtrl', function($scope,activity_data,$location,$stateParams) { 
			var type_i=$stateParams.type,poiu_po=true;
			var date_p={"user_id":$stateParams.user_id,"pageIndex":1,"pageSize":"10","contact_status":"1"}
			$scope.ious_p={  
					"date_arr":[],
					"date_pio":function(date_p){
						activity_data.query_page_p(date_p).then(
				    		function success(data){    		
				    			  if(data.code!=0){
				    				  mui.alert(data.msg, 'E场景活动');
				    				  return;
				    			  }
				    			  poiu_po=true;
				    				$(".sys-loading").removeClass("show_a")
				    			  $(data.rows).map(function(){
				    				  var dkhg_this=new query_page(this);
				    				  $scope.ious_p.date_arr.push(dkhg_this);
				    			  })
				    			  
				    		}, function error() {
								console.log("获取白条信息失败");
				    });  
			},"iou_state":function(ty){//改变状态
				date_p.pageIndex=1;//初始化页码
				$scope.ious_p.date_arr=[];//初始化列表数据
				date_p.contact_status=ty;
				
				$scope.ious_p.date_pio(date_p)
			}
			
			}
			date_p.contact_status=type_i;
			$(".user_poi p").removeClass("act_p_o")
			$(".user_poi p").eq((type_i-1)).addClass("act_p_o"); 
			$scope.ious_p.date_pio(date_p);//页面打开执行
			var myscroll = new iScroll('wrapper',{
		   	 vScrollbar: false,
		   	 doubleTapZoom: 10, //双触放大几倍  
		        onScrollEnd: function(){
		              if(this.y == this.maxScrollY&&poiu_po){
		            	  	poiu_po=false
		            	  	$(".sys-loading").addClass("show_a")
		            	  	++date_p.pageIndex
		            		$scope.ious_p.date_pio(date_p);
		              }
		        }
		    })
		    /*列表遍历完执行*/
				$scope.$on('ngfinish', function(ngfinishEvent) {
				     myscroll.refresh();//刷新
				}) 
			$(".user_poi p").on("click",function(){
				$(".user_poi p").removeClass("act_p_o")
				$(this).addClass("act_p_o")
			})
		})

		// ========================= 我的白条详情 =======================
		/* @ngInject */
		.controller('lous_user_detailCtrl', function($scope,activity_data,$location,$stateParams) {  
		   $scope.review=$stateParams
		   var img_src=["","/img/examine_a.png","/img/examine_b.png","/img/examine_c.png","/img/examine_d.png"]
		   $scope.review.img_src=img_src[$scope.review.contact_status]
		})

		// ========================= 我的票券 =======================
		/* @ngInject */
		.controller('ticket_userCtrl', function($scope,activity_data) {//票卷列表
			$(".mml_bottom a").removeClass("bottom_act");
			$(".mml_bottom a").eq(3).addClass("bottom_act");
			$(".ds_poiu_a").removeClass("show_a")
			$(".retreat_icon").removeClass("none")
			 $(".mml_bottom").show()
			$scope.pload_p=false;
				  /*验证是否登陆*/
				 activity_data.verifyUserLogin().then(
				    		function success(data){
				    			if(data.code==0){
				    				$scope.pload_p=true
				    			}
				    		}, function error() {
								console.log("验证失败");
				    });
			
			
			var parameter_a= {
					 "pageIndex":1,//页数
					"pageSize":100,//行数
					"filter":0,// (活动状态1未开始2进行中3结束)  可选
				 }
			
			$scope.volume_list={
					"v_data":[],//没有过期票卷列表数据
					"over_data":[],//过期票卷列表数据
					"TicketList":function(parameter,filter){
				 /*票卷数据查看*/
			    activity_data.queryTicketList(parameter).then(
			    		function success(data){
			    			if(data.code!=0){
			    				console.log(data.msg);
								return;
			    			}
			    			$(data.info).map(function(){
			    				var tick_info=new ticket_volume_list(this);
			    				if(parameter.filter!=3){
			    					$scope.volume_list.v_data.push(tick_info);
			    					
			    					
			    				}else if(parameter.filter==3){//过期票卷
			    					
			    					$scope.volume_list.over_data.push(tick_info);
			    				}
			    			
			    			})
			    			
						
			    		}, function error() {
							console.log("查看票卷数据失败");
			    });
			},"ticket_volume":function(evt){//查看过期票卷
				 $(".volume_button").hide();
		         $(".expired_ticket_volume").show();
		         parameter_a.filter=3
		          $scope.volume_list.TicketList(parameter_a);
			}
			
			}
			 console.log(parameter_a)
			$scope.volume_list.TicketList(parameter_a);
			

		})


		// ========================= 我的票券详情 =======================
		/* @ngInject */
		.controller('ticket_user_detailCtrl', function($scope,activity_data,$location,$stateParams) { 
		     $scope.volume_details={
		    		   "data_p":[],
		    		  "dat_po":{}, 
		    		    "details_a":function(data_p){
		            	 activity_data.query_consumption_user_list(data_p).then(
		     		    		function success(data){    		
		     		    			  if(data.code!=0){
		     		    				  mui.alert(data.msg, 'E场景活动');
		     		    				  return;
		     		    			  }
		     		    			 $scope.volume_details.dat_po.results=data.results//已报名
		     		    			 $scope.volume_details.dat_po.already_sign=data.otherinfo.already_sign//已签到
		     		    			 $scope.volume_details.dat_po.not_sign=data.otherinfo.not_sign//未签到
		     		    			
		     		    			  $(data.rows).map(function(){
		     		    				  var da_th=new query_consumption_user_list(this);
		     		    				 $scope.volume_details.data_p.push(da_th)
		     		    			  })
		         		    		
		     		    		}, function error() {
		     						console.log("获取活动详情失败");
		     		    });  
		             }		 
		     }

		     $scope.volume_details.details_a({"pageIndex":1,"activity_id":$stateParams.id,"pageSize":"500"})
		})
		
		// ========================= 主办方 =======================
		/* @ngInject */
		.controller('personal_host', function($scope,$rootScope,activity_data,messageService,$state,$location,$stateParams,httpService,anchorScroll) { 			
			$scope.sponsor_user_id=$stateParams.sponsor_user_id;//用户ID
			$(".mml_bottom ").show()
			$(".person_host_tab").removeClass("act_poi")
		    $(".person_host_tab").eq(0).addClass("act_poi") 
			$scope.sponsor_user_id=$stateParams.sponsor_user_id;//用户ID
			
			activity_data.person_detail_info({"user_id":$scope.sponsor_user_id}).then(//主办方详情
					function success(data) {
	                         $scope.perDeta= new secrchH(data.info);	                         
	                         if($scope.perDeta.attention_sponsor==0||$scope.perDeta.attention_sponsor==null){
	                        	 $(".attent_change").css("background","#4FA45D").attr("data-x",1);
	                        	 $(".attent_text").text("关注TA")
	                         }else {	                        	 
	                        	 $(".attent_change").css("background","#a9a9a9").attr("data-x",2).text("取消关注");
	                        	 $(".attent_text").text("取消关注")
	                         }
	                         $scope.shareName=$scope.perDeta.name;
	                         $scope.shareImg=$scope.perDeta.sponsor_icon;
	                         $scope.shareInduction=$scope.perDeta.introduction;	
	                         var sh_a={}
		                 	 sh_a.title=$scope.perDeta.name;
		                 	 sh_a.desc=$scope.perDeta.introduction;
		                 	 sh_a.link=window.location.href;
		                 	 sh_a.imgUrl=$scope.perDeta.sponsor_icon
	                 	     wx_share(sh_a)
					}, function error() {
						console.log("获取主办方详情失败")
			});
		    var message_i={}//留言参过去的参数
			message_i.pageIndex=1;
			message_i.pageSize=100;
			message_i.source_id=$scope.sponsor_user_id;
			$scope.id=$scope.sponsor_user_id;//获取活动id
			$scope.p_resu;
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
				    		   $scope.p_resu=data.results;				    		 
				    		}, function error() {
								console.log("获取报名数据失败");
				    }); 
				  
			  }
		}
		$scope.leave_message.message_p(message_i)
		
        //主办方发起的活动开始
		
		var data_per={};
		data_per.sponsor_id=$scope.sponsor_user_id;	
		data_per.time_status=1;//1：未结束 2:已结束
		data_per.pageIndex=1;//页码
		data_per.pageSize=20;//行数
		$scope.perList=[];//获得数据的数组
		activity_data.person_li(data_per).then(
	    		function success(data){    		
	    		    if(data.code!=0){
	    		    	 mui.alert(data.msg, 'E场景活动');
	    		    	 return
	    		    }
	    		    $(data.rows).map(function(){
	    		    	var arr_pel=new person_list(this)
	    		    	$scope.perList.push(arr_pel)
	    		    })			    		 
	    		}, function error() {
					console.log("获取报名数据失败");
	    }); 
		
		//主办方发起的过期活动
		var data_overActivity={};
		data_overActivity.sponsor_id=$scope.sponsor_user_id;	
		data_overActivity.time_status=2;//1：未结束 2:已结束
		data_overActivity.pageIndex=1;//页码
		data_overActivity.pageSize=4;//行数
		$scope.overDateList=[];//获得数据的数组
		$scope.checkoverdue=function(){	
			data_overActivity.pageIndex++;
	
			activity_data.person_li(data_overActivity).then(
		    		function success(data){    		
		    		    if(data.code!=0){
		    		    	 mui.alert(data.msg, 'E场景活动');
		    		    	 return
		    		    }
		    		    $(data.rows).map(function(){
		    		    	var arr_over=new person_list(this)
		    		    	$scope.overDateList.push(arr_over)
		    		    })			    		 
		    		}, function error() {
						console.log("获取报名数据失败");
		    }); 
			
		}
		
        //关注主办方操作
		$scope.attentHost=function(){	
			httpService.getDatas('GET', '/user/verifyUserLogin').then(function(data) {
	            if(data.code!=0&&data.code!=-1){
	                messageService.show('您还未登录！');
	                $state.go("signin");
	            }
	        });
		    if($(".attent_change").attr("data-x")==1){
		    	httpService.getDatas('GET', '/activity/exec_attention?resources_id='+$scope.sponsor_user_id+'&type=4').then(function(data) {
					if(data.code==0){
						$(".attent_change").css("background","#a9a9a9").attr("data-x",2);
						$(".attent_text").text("取消关注")
					}
				})
		    }else if($(".attent_change").attr("data-x")==2){
		    	httpService.getDatas('GET', '/activity/cancel_attention?resources_id='+$scope.sponsor_user_id+'&type=4').then(function(data) {
					if(data.code==0){
						$(".attent_change").css("background","#4FA45D").attr("data-x",1);
						$(".attent_text").text("关注TA")
					}
				})
		    }
				
		}
		
		
		}).controller('personal_host_activity', function($scope,activity_data,$location,$stateParams,anchorScroll) { //主办方发起的活动
			$scope.sponsor_user_id=$stateParams.sponsor_user_id;//用户ID
			$(".person_host_tab").removeClass("act_poi")
			$(".person_host_tab").eq(0).addClass("act_poi")
		    $(".person_progress_of").css({"left":'0'});//进度条点击过度效果
		}).controller('personal_host_message', function($scope,activity_data,$location,$stateParams,anchorScroll) { //主办方留言
			
			
			$scope.leave_message.comment=function(type){//提交评论				
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
			$scope.leave_message.add_comment_data=function(data){
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
			  }
			$scope.leave_message.message=function(id){
				  $scope.me_id=id
			      mui('#message').popover('toggle');
				  $(".me_text_area").focus()
				
				  
			  }
			
			$(".person_host_tab").removeClass("act_poi")
			$(".person_host_tab").eq(1).addClass("act_poi")
		    $(".person_progress_of").css({"left":'50%'})//进度条点击过度效果
			
		
		    
		    
		})


})();