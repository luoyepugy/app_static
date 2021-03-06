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
		// 登录方式
		$scope.signinType = 'weixin';
		$scope.changeSigninType = function() {
			$scope.signinType = 'phone';
		}

		// 获取用户登录状态
		if($stateParams.url!=null){
            $location.path($scope.url);
        }
        
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
				$window.history.back();
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
			} else {
				$scope.sponsorStatus = false;
			}
	    });
	     /*
	     * 罗志明
	     * 该账号是否绑定手机
	     */
	    httpService.getDatas('GET', '/userBind/is_bindPhone').then(function(data) {
	    	if(data.code==0){
	    		$scope.phoneIsBind=0  //0为已绑定
	    	}else if(data.code!=0){
	    		$scope.phoneIsBind=1  //1为未绑定
	    	}
	    });
		
	})

	// ============================= 个人信息修改 ==============================
	/* @ngInject */
	.controller('userInfo_editCtrl', function($scope,$location,activity_data,$state,$stateParams,act_date,httpService) {
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
			
		/*个人中心手机绑定(已绑定的情况)*/
		var onOFF=true;//定时器开关
		$scope.getMess=function(){
			var moby_old=$(".moby_old").val().trim(),//原手机号码
		        moby_new=$(".moby_new").val().trim(),//新手机号码
			    moby_mes=$(".moby_mes").val().trim();//短信认证码
			
			
			if(!form_mm.isnull(moby_old)){
				mui.alert("原手机号码不能为空")
				$(".moby_old").focus();
				return;
		     }
			if(!form_mm.tel(moby_old)){
				mui.alert("原手机号码格式错误")
				$(".moby_old").focus();
				return;
		     }
			
			if(!form_mm.isnull(moby_new)){
				mui.alert("新手机号码不能为空")
				$(".moby_new").focus();
				return;
		     }
			
			if(!form_mm.tel(moby_new)){
				mui.alert("新手机号码格式错误")
				$(".moby_new").focus();
				return;
		     }
			if(moby_old==moby_new){
				mui.alert("原手机号码不能跟新手机号码一样")
				$(".moby_old").focus();
				return;
		     }
			 
             var countDown=60;
			 if(onOFF){
			 	onOFF=false;
			 	$(".moby_message").css({"backgruound":"#dbdbdb","color":"#999999"})
           	    	timer=setInterval(function(){	
                         countDown--;

           	    		
           	    		$(".moby_message").text(countDown+'后再获取')
           	    	},1000);
           	    	setTimeout(function(){
           	    		clearInterval(timer);
           	    		onOFF=true;
           	    		$(".moby_message").text("获取认证码");
           	    		$(".moby_message").css({"backgruound":"#fff","color":"#4ea45d"})
           	    		},60000)
           	    	httpService.getDatas('GET', '/userBind/send_update_phone_code?phone='+moby_new).then(function(data) {
                });
           	    	
             }
			 
		}
		$scope.bindSave=function(){
			var moby_mes_b=$(".moby_mes").val().trim();//短信认证码
			var moby_new_b=$(".moby_new").val().trim();//新手机号码
			var moby_old_b=$(".moby_old").val().trim();//原手机号码
			if(!form_mm.isnull(moby_old_b)){
				mui.alert("原手机号码不能为空")
				$(".moby_old").focus();
				return;
		     }
			if(!form_mm.tel(moby_old_b)){
				mui.alert("原手机号码格式错误")
				$(".moby_old").focus();
				return;
		     }
			
			if(!form_mm.isnull(moby_new_b)){
				mui.alert("新手机号码不能为空")
				$(".moby_new").focus();
				return;
		     }
			
			if(!form_mm.tel(moby_new_b)){
				mui.alert("新手机号码格式错误")
				$(".moby_new").focus();
				return;
		     }
			if(moby_new_b==moby_old_b){
				mui.alert("原手机号码不能跟新手机号码一样")
				$(".moby_new").focus();
				return;
		     }
			if(!form_mm.isnull(moby_mes_b)){
				mui.alert("短信认证码不能为空")
				$(".moby_mes").focus();
				return;
		    }		
			 httpService.getDatas('GET', '/userBind/update_phone?phone='+moby_new_b+'&code='+moby_mes_b).then(function(data) {
                   if(data.code==0){
                   	   mui.alert("手机绑定修改成功");
                   	   $location.path('/userInfo')
                   }else if(data.code!=0){
                   	   mui.alert(data.msg)
                   }
	         });
		}
		
		
		/*个人中心手机绑定(未绑定的情况)*/
		var onBTn=true;//定时器开关
		$scope.unBindSave=function(){
			var unBind_new=$(".moby_new").val().trim();//原手机号码
			var unBind_message=$(".moby_mes").val().trim();//验证码
			if(!form_mm.isnull(unBind_new)){
				mui.alert("原手机号码不能为空")
				$(".moby_new").focus();
				return;
		     }
			if(!form_mm.tel(unBind_new)){
				mui.alert("原手机号码格式错误")
				$(".moby_new").focus();
				return;
		     }
			if(!form_mm.isnull(unBind_message)){
				mui.alert("认证码不能为空")
				$(".moby_mes").focus();
				return;
		     }
			 httpService.getDatas('GET', '/userBind/bindPhone?phone='+unBind_new+'&code='+unBind_message).then(function(data) {
		                   if(data.code==0){
		                   	    mui.alert("手机绑定成功");
		                   	    $location.path("/userInfo");
		                   }else if(data.code!=0){
		                   	   mui.alert(data.msg)
		                   }
	         });
			
			
		}
		$scope.getUnbindMess=function(){
			var unBind_new_a=$(".moby_new").val().trim();//手机号码
			if(!form_mm.isnull(unBind_new_a)){
				mui.alert("手机号码不能为空")
				$(".moby_new").focus();
				return;
		     }
			if(!form_mm.tel(unBind_new_a)){
				mui.alert("手机号码格式错误")
				$(".moby_new").focus();
				return;
		    }	
		    
		     var countDown=60;
			 if(onBTn){
			 	onBTn=false;
			 	
           	    	timer=setInterval(function(){	
                         countDown--;
                         $(".moby_message").css({"backgruound":"#dbdbdb","color":"#999999"})
                 		$(".moby_message").text(countDown+'后再获取')
           	    	},1000);
           	    	setTimeout(function(){
           	    		clearInterval(timer);
           	    		onBTn=true;
           	    		$(".moby_message").text("获取认证码");
           	    		$(".moby_message").css({"backgruound":"#fff","color":"#4ea45d"})
           	    		},60000)
           	    	 httpService.getDatas('GET', '/userBind/sendCodeMsg?phone='+unBind_new_a).then(function(data) {
		                   if(data.code==0){
		                   	 
		                   }else if(data.code!=0){
		                   	   mui.alert(data.msg)
		                   }
	              	});
		    }
			
			
		}
		
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
	    // 表单提交成功后跳转
	    $scope.route = function() {
	    	vm.status = 3;
	    }	
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
		$scope.wallet = {};
		httpService.getDatas('POST', '/eCoin/get_user_ecoin').then(function(data) {
			$scope.wallet.account = data.info;
		});
		httpService.getDatas('GET', '/bankAccount/query').then(function(data) {
			$scope.wallet.cardNum = data.info.length;
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
	.controller('personal_centerCtrl', function($scope,activity_data,$location,act_date, $rootScope, httpService) { 
		$(".mml_bottom a").removeClass("bottom_act");
		$(".mml_bottom a").eq(4).addClass("bottom_act");
		$(".mml_bottom").show()
		// 用户头像放大
	    mui.previewImage();
	    var kmnb_p=true;
	    $scope.pe_er = {};
	 	activity_data.selectOne().then(
	    		function success(data){
	    			if(data.code!=0&&data.code!=-1){
	    				  $scope.pe_er.user_icon_o = {
	    				  	'user_name': '未登录',
	    				  	'user_icon': '/img/userIcon.jpg'
	    				  }
	    				  return
	    			}
	    			$scope.pe_er.user_icon_o=new user_info(data.info);
	    			$scope.pe_er.user_icon_o.user_phone = data.info.user_phone;
	    		}, function error() {
					console.log("获取用户信息失败");
	    });

	 	// 获取是否有新消息
	    httpService.getDatas('GET', '/inform/unRead').then(function(data) {
	    	$scope.messageItems = data.info;
	    });
	    // 获取我的活动数据
	    httpService.getDatas('GET', '/user/myactivity').then(function(data) {
	    	$scope.userActivity = data.info;
	    	if(data.code == -10) {
	    		$scope.userActivity = {
	    			'activity_count': 0,   
			        'attention_count': 0,   
			        'join_count': 0   
	    		}
	    	}
	    });

	})

	// ========================= 我的反馈 =======================
	/* @ngInject */
	.controller('feedbackCtrl', function($scope,activity_data,$location,act_date, messageService) { 
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
		    				$location.path('/signin')
		    				  return;
		    			}
		    			$location.path('/personal_center')
		    			messageService.show('意见反馈提交成功', 'toast');
		    			 
		    			
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
	.controller('activity_userCtrl', function($scope,activity_data,$location,$stateParams, transmitService, $state) { 
		$(".mml_bottom a").removeClass("bottom_act");
		$(".mml_bottom a").eq(4).addClass("bottom_act");
		var data_act={"pageIndex":1,"pageSize":10,"user_id":$stateParams.user_id,"time_status":"","flag":"1","type":"0"}  // 1:未开始    3：已结束
		var poiu_po=true;

		var type=$stateParams.type
		$scope.type_p=$stateParams.type //1为参与的活动，2为发起的活动
		$(".sys-loading").addClass("show_a");
		$("body").on("click",".act_use_p a",function(){
			$(".act_use_p a").removeClass("cat_poo")
			$(this).addClass("cat_poo")
		});
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
			    			poiu_po=true;
			    			
			    			 $(data.rows).map(function(){
			    				 var khg=new query_activity_list(this);
			    				 khg.order_id=this.order_id;
			    				 khg.tip = this.tip;
			    				 khg.apply_switch = this.apply_switch;
			    				 $scope.my_activities.activity_list.push(khg);
			    			
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
			    				 khg.tip = this.tip;
			    				 khg.apply_switch = this.apply_switch;
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
			    			console.log('ef12');
			    			 $(data.rows).map(function(){
			    				 var khg=new query_activity_list(this);
			    				 khg.tip = this.tip;
			    				 khg.apply_switch = this.apply_switch;
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

		
		// 传送数据
		$scope.transmit = function(data) {
			transmitService.setDatas(data);
			$state.go('activity_more_manage', {id: data.id});
		}
		

	})


	// ========================= 我的赞助 =======================
	/* @ngInject */
	.controller('sponsorship_userCtrl', function($scope,activity_data,$location,$stateParams,act_date,$state) {
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
	    	 $state.go("sponsorship_payment");
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
	.controller('sponsorship_paymentCtrl', function($scope,activity_data,$location,$stateParams,act_date,$http) { 
		if($stateParams.id>0){
			$http.get('/support/shot_message_repay_detail?pay_support_id='+$stateParams.id).then(function(data) {
				$scope.act_d=data.data.info
				data.data.info.total_money
				$scope.act_d.create_support_phone=data.data.info.content_detail.tel
			});
			return
		}
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
		 $(".mml_bottom").show()
		 $(".sys-loading").addClass("show_a")
			  /*验证是否登陆*/
			 activity_data.verifyUserLogin().then(
			    		function success(data){
			    			if(data.code!=0){
			    				$(".ssd_poio").eq(0).show();
			    				 $(".sys-loading").removeClass("show_a")
			    				return
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
		    			 $(".sys-loading").removeClass("show_a")
		    			if(data.info.length==0){
		    				$(".ssd_poio").eq(1).show()
		    			}else{
		    				$(".ssd_poio").eq(2).show()
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
		},"ticket_volume":function(evt){//查.看过期票卷
			 $(".volume_button").hide();
	         $(".expired_ticket_volume").show();
	         parameter_a.filter=3
	         $scope.volume_list.TicketList(parameter_a);
	         $(".ssd_poio_eert ").remove()
		}
		
		}
		 console.log(parameter_a)
		$scope.volume_list.TicketList(parameter_a);
		

	})


	// ========================= 我的票券详情 =======================
	/* @ngInject */
	.controller('ticket_user_detailCtrl', function($scope,activity_data,$location,$stateParams) {
		var onOFF=true;
	     $scope.volume_details={
	    		   "data_p":[],
	    		  "dat_po":{"pageIndex":1,"activity_id":$stateParams.id,"pageSize":"500","code_use":""}, 
	    		    "details_a":function(dat_po){
	    		    	$scope.volume_details.data_p=[];
	            	 activity_data.query_consumption_user_list(dat_po).then(
	     		    		function success(data){    		
	     		    			  if(data.code!=0){
	     		    				  mui.alert(data.msg, 'E场景活动');
	     		    				  return;
	     		    			  }
	     		    			 if(onOFF){
	     		    			 	$scope.results=data.results//已报名
	     		    			 	$scope.already_sign=data.otherinfo.already_sign//已签到
	     		    			 	$scope.not_sign=data.otherinfo.not_sign//未签到
	     		    			  	onOFF=false;
	     		    			 }
	     		    			 
	     		    			
	     		    			  $(data.rows).map(function(){
	     		    				  var da_th=new query_consumption_user_list(this);
	     		    				 $scope.volume_details.data_p.push(da_th)
	     		    			  })
	         		    		
	     		    		}, function error() {
	     						console.log("获取活动详情失败");
	     		    });  
	             },"selectSign":function(type){
	             	 $(".menu_pup,.filiuyt_o").toggleClass("show_a")
	             	$scope.volume_details.dat_po.code_use=type;
	             	$scope.volume_details.details_a($scope.volume_details.dat_po)
	             }
	     }

	     $scope.volume_details.details_a($scope.volume_details.dat_po)
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
                        	 $(".attent_change").css("background","#a9a9a9").attr("data-x",2);
                        	 $(".attent_text").text("取消关注")
                         }
                         $scope.shareName=$scope.perDeta.name;
                         $scope.shareImg=$scope.perDeta.sponsor_icon;
                         $scope.shareInduction=$scope.perDeta.introduction;
                         $scope.overDate_num=data.info.stale_activity_count
                         var sh_a={}
	                 	 sh_a.title=$scope.perDeta.name;
	                 	 sh_a.desc=$scope.perDeta.introduction;
	                 	 sh_a.link=window.location.href;
	                 	 sh_a.imgUrl=$scope.perDeta.sponsor_icon
                 	     wx_share(sh_a)
				}, function error() {
					console.log("获取主办方详情失败")
		});
		
		
		$scope.data_inistale={};
		$scope.data_inistale.sponsor_id=$scope.sponsor_user_id;	
		$scope.data_inistale.time_status=2;//1：未结束 2:已结束
		$scope.data_inistale.pageIndex=1;//页码
		$scope.data_inistale.pageSize=20;//行数
		activity_data.person_li($scope.data_inistale).then(
	    		function success(data){  	    			
	    		   $scope.overResult=data.results;
	    		}, function error() {
					console.log("获取报名数据失败");
	    }); 
		
		
		
		
		
		
		
	    $scope.message_i={}//留言参过去的参数
		$scope.message_i.pageIndex=1;
		$scope.message_i.pageSize=100;
		$scope.message_i.source_id=$scope.sponsor_user_id;
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
	$scope.leave_message.message_p($scope.message_i)
	
    //主办方发起的活动开始
	
	$scope.data_per={};
	$scope.data_per.sponsor_id=$scope.sponsor_user_id;	
	$scope.data_per.time_status=1;//1：未结束 2:已结束
	$scope.data_per.pageIndex=1;//页码
	$scope.data_per.pageSize=20;//行数
	$scope.perList=[];//获得数据的数组
	activity_data.person_li($scope.data_per).then(
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
	$scope.data_overActivity={};
	$scope.data_overActivity.sponsor_id=$scope.sponsor_user_id;	
	$scope.data_overActivity.time_status=2;//1：未结束 2:已结束
	$scope.data_overActivity.pageIndex=0;//页码
	$scope.data_overActivity.pageSize=4;//行数
	$scope.overDateList=[];//获得数据的数组
	$scope.checkoverdue=function(){	
		$scope.data_overActivity.pageIndex++;

		activity_data.person_li($scope.data_overActivity).then(
	    		function success(data){    		
	    		    if(data.code!=0){
	    		    	 mui.alert(data.msg, 'E场景活动');
	    		    	 return
	    		    }
	    		    $(data.rows).map(function(){
	    		    	var arr_over=new person_list(this)
	    		    	$scope.overDateList.push(arr_over)
	    		    })		
	    		    if(data.results<=($scope.data_overActivity.pageSize-1)){
	    		    	$('.check_acti').hide()
	    		    }
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
	    activity_data.person_detail_info({"user_id":$scope.sponsor_user_id}).then(//主办方详情
				function success(data) {
                         $scope.perDeta= new secrchH(data.info);                       
                         $scope.overDate_num=data.info.stale_activity_count                   
				}, function error() {
					console.log("获取主办方详情失败")
		});
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
	// ========================= 嘉宾详情 =======================
	/* @ngInject */
	.controller('guest_detailCtrl', function($scope,$stateParams, $state, httpService, $rootScope, messageService) { 
		var id = $stateParams.id;
		httpService.getDatas('GET', '/sponsor/sponsorapply_info', {user_id: id, typeId: 1}).then(function(data) {
			$scope.guest = data.info;
		});
		var sendInvite = function(tip) {
			mui.confirm(tip,'','',function(e){
			   if(e.index == 1){
			   	  $scope.guest.is_invitation++;
			   	  httpService.getDatas('GET', '/sponsor/invitation', {id: id}).then(function(data) {
					if(data.code == -10) {
						messageService.show('您还未登录！', 'toast');
						$state.go('signin');
					} else {
						messageService.show(data.msg, 'toast');
					}
				});
			   }
			});
		}
		$scope.event = {
			attention: function() {
				httpService.getDatas('GET', '/activity/exec_attention', {resources_id: id, type: 7}).then(function(data) {
					if(data.code == -10) {
						messageService.show('您还未登录！', 'toast');
						$state.go('signin');
					} else {
						$scope.guest.attention_sponsor = 1;
					}
				});
			},
			cancelAttention: function() {
				httpService.getDatas('GET', '/activity/cancel_attention', {resources_id: id, type: 7}).then(function(data) {
					if(data.code == -10) {
						messageService.show('您还未登录！', 'toast');
						$state.go('signin');
					} else {
						$scope.guest.attention_sponsor = 0;
					}
				});
			},
			invite: function() {
				switch($scope.guest.is_invitation) {
					case 0: sendInvite('您确定向这位嘉宾发送邀请吗？'); break;
					case 1: sendInvite('您已经发出过1次邀请，确定再次发送邀请吗？'); break;
					case 2: sendInvite('您已经发出过2次邀请，确定再次发送邀请吗？'); break;
					default: messageService.show('您已邀请3次，请耐心等待！', 'toast');
				}
			}
		}
	})
	// ========================= 用户消息 =======================
	/* @ngInject */
	.controller('message_userCtrl', function($scope,$stateParams, httpService, $rootScope, messageService) { 
		$scope.messageList = [];
		$scope.showUser = true;

		$scope.messageUser = function() {
			$scope.showUser = true;
		}
		$scope.messageSystem = function() {
			$scope.showUser = false;
			init(1, 1);
		}
		
		var index = 1;
		var init = function(index, type, more) {
			httpService.getDatas('GET', '/inform/messageCenter', {pageIndex: index, pageSize: 10, manyConditions: type}).then(function(data) {
				// 获取系统消息和用户消息未读数量
				$scope.message = data.otherinfo;
				if(more && data.rows.length == 0) {
					messageService.show('没有更多数据了', 'toast');
					return false;
				}
				if(type == 0) {
					if(more) {
						$scope.userList = $scope.userList.concat(data.rows);
					} else {
						$scope.userList = data.rows;
					}
				} else {
					if(more) {
						$scope.systemList = $scope.systemList.concat(data.rows);
					} else {
						$scope.systemList = data.rows;
					}
				}
			});
		}
		init(1, 0);

		// 加载用户消息更多
		$scope.userMore = function(page) {
			index++;
			init(index, 0, true);
		}
		// 加载系统消息更多
		$scope.systemMore = function(page) {
			index++;
			init(index, 1, true);
		}
	})

	// ========================= 主办方列表 =======================
	/* @ngInject */
	.controller('personal_host_listCtrl', function($scope, httpService, messageService) { 
		// 底部栏样式
		$('.mml_bottom').show();
		$('.mml_bottom a').removeClass('bottom_act').eq(1).addClass('bottom_act');
	
		var index = 1;
		var sponsorDatas = {
			'pageIndex': index,
			'name': '',
			'pageSize': 10
		};
		var request = function(more) {
			httpService.getDatas('GET', '/sponsor/sponsor_search_page', sponsorDatas).then(function(data) {
				if(more) {
					$scope.sponsorList = $scope.sponsorList.concat(data.rows);
					if(data.rows.length == 0) {
						messageService.show('没有更多数据了');
					}
				} else {
					$scope.sponsorList = data.rows;
				}
			});
		}
		request();
		// 加载更多
		$scope.sponsorMore = function() {
			index++;
			request(true);
		}
	}).controller('awardCtrl', function($scope, httpService, messageService) { 
		
		httpService.getDatas('GET', '/draw/get_currentuser_prize').then(function(data) {
			if(data.code!=0){
				mui.alert(data.msg)
				return
			}
			if(data.info.length == 0) {
				messageService.show('暂时没有奖品包', 'toast');
			} else {
				$scope.info_prize=data.info
			}
		});
	}).controller('awardListCtrl', function($scope, httpService, messageService,$stateParams) { //获奖名单列表
		$scope.awardArray=[];//获奖名单数据
		$scope.activity_id=$stateParams.activity_id;//活动ID
		$scope.prize_name="";//奖项筛选
		var getUrl='/draw/get_win_prize?activity_id='+$scope.activity_id;//请求地址
	    $scope.awardAll={
	    	"awardSelect":function(name){//按奖项筛选
				 $(".menu_pup,.filiuyt_o").toggleClass("show_a")
			 $scope.prize_name=name;	 
		     getUrl='/draw/get_win_prize?activity_id='+$scope.activity_id+'&prize_name='+$scope.prize_name;
		     $scope.awardAll.awardBase(getUrl);
			 },
			 "awardBase":function(getUrl){
			 	$scope.awardArray=[];
			 	httpService.getDatas('GET', getUrl).then(function(data) {
					if(data.code!=0){
						mui.alert(data.msg)
						return
					}
					$scope.awardArray=data.info;
					if(data.code==0&&data.msg!=null){
						$scope.awardArray_length=data.info.length;//已获奖人数
					    $scope.awardSum=data.msg;//总参加人数
					}
					else{
						$('.side_menu_award ').off('click')
						$scope.awardArray_length=0;
						$scope.awardSum=0;
					}
					
					
			
				});
			 }
	    }
	    $scope.awardAll.awardBase(getUrl);
		httpService.getDatas('GET', 'draw/get_draw_level?activity_id='+$scope.activity_id).then(function(data) {//获取奖项名称
			if(data.code!=0){
				mui.alert(data.msg)
				return
			}			
			$scope.awardNameArray=data.info;
		});


	}).controller('activityMoreManageCtrl', function($scope, httpService, messageService, $stateParams) { //个人中心更多管理
		// 0关闭， 1开启
		var status = $stateParams.switchEnroll;
		// 活动id
		$scope.id = $stateParams.activity_id;
		// 关闭开启报名
		$scope.closeEnroll = (status == 0) ? false : true;
		$scope.switchEnroll = function() {
			$scope.closeEnroll = !$scope.closeEnroll;
			var status = ($scope.closeEnroll==true) ? 1 : 0;
			httpService.getDatas('POST',  '/activity/apply_switch?activityid=' + $scope.id + '&apply_switch=' + status).then(function(data) {
				var tip = (status == 0) ? '报名已关闭': '报名已开启';
				messageService.show(tip, 'toast');
		  	});
		}
	    
	    $scope.dismiss_pup=function(){
	    	$('.downApp_pup').css('display','none')
	    }
	    $('.onOffApp').on('click',function(){
	    	$('.downApp_pup').css('display','block')
	    })
	    $('.republish_pup').on('click',function(){
	    	 mui.alert('请在PC端重新发布活动，www.apptown.cn', 'E场景活动', function() {
					    	
					     });
	    })
			$scope.down_app=function(){
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
	    
	    httpService.getDatas('GET',  '/activity/my_activity_manage?activity_id='+$scope.id).then(function(data) {
				$scope.moreStatus=data.info;
				
		});
	}).controller('ticket_detailCtrl', function($scope, httpService, messageService, $stateParams) { 
			$scope.order_id=$stateParams.order_id;//票劵ID
			$scope.activity_id=$stateParams.activity_id;//活动ID
			  httpService.getDatas('GET',  '/consumption/get_buy_ticket_info?order_id='+$scope.order_id).then(function(data) {
				$scope.moreStatus=data.info;	
			});
			$('.ticket_d_con').on('click',function(event){
				  event.stopPropagation();
			})
	}).controller('photo_albumCtrl', function($scope, httpService, messageService, $stateParams,$state) { //个人中心活动相册
		$scope.act_id=$stateParams.act_id
		$scope.albums_submit=function(){
	  
	    	 var data_po={},photo_list=[]
	    	 data_po.remark=$scope.bask_sun;//分享内容
	    	 data_po.activity_id=$scope.act_id;//活动绑定id
	    	 $(".df_poiu_xer").map(function(){
	    		 photo_list.push($(this).find("img").attr("src"))
	    	 })
	    	data_po.photo_list=photo_list;//相片
	    	httpService.getDatas('POST', '/dynamic/my_activity_dynamic',data_po).then(function(data) {
	    	     if(data.code!=0){
	    	    	 mui.alert(data.msg)
	    	     }
	    	     $state.go("attention_dynamics")
	    	  });
         }
	     $scope.binding=function(){
	        $(".act_bangding").addClass("show_a")
	     }
	     $("body").on("click",".cadee_pioiis .mui-col-xs-4 i",function(){
	    	 $(this).parents(".mui-col-xs-4 ").remove()
	     })
	     
	     
	     
	    /* 活动列表*/
	     var data_yiu={}
			data_yiu.flag=1
			data_yiu.pageIndex=1
			data_yiu.pageSize=50
			data_yiu.time_status=0
			data_yiu.type=0;
			httpService.getDatas('GET', '/activity/query_activity_list',data_yiu).then(function(data) {
		    	$scope.rows=data.rows;
		    	$scope.show_poi="show_a";
		    });
			$("body").on("click",".act_poiuuy_e li",function(){
				$(".act_poiuuy_e li i").removeClass("fa-check-circle").addClass("fa-circle-thin")
				$(this).find("i").addClass("fa-check-circle").removeClass("fa-circle-thin")
				$scope.act_id=$(this).attr("data-id")
				$(".act_bangding").removeClass("show_a")
			})
		
		
	})
		
	
	
	

})();