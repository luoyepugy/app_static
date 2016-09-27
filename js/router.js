/**
 *路由
 */
 angular.module('router', ["activity_servrt","ui.router"])
 .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	    $urlRouterProvider.otherwise('index',"index") //首页    默认项			 
	    $stateProvider
	     .state('index',{
	    	url: '/index', //首页
	    	templateUrl: '/html/index_view.html'
	    }).state('activities_list',{
	    	url: '/activities_list/:activityTypeId', //活动列表
	    	templateUrl: '/html/activity/activity_list.html'
	    }).state('sponsor_list',{
	    	url: '/sponsor_list', //赞助列表
	    	templateUrl: '/html/sponsorship/sponsorship_list.html'
	    }).state('add_activities',{
	    	url: '/add_activities', //加号进来的页面
	    	templateUrl: '/html/add_activities.html'
	    }).state('activity_reward',{
	    	url: '/activity_reward/:id',  				// 活动打赏表单
	    	templateUrl: '/html/activity/activity_reward.html',
	    	controller: 'activity_rewardCtrl'
	    }).state('activity_reward_detail',{
	    	url: '/activity_reward_detail/:id?type',  	// 活动打赏详情
	    	templateUrl: '/html/activity/activity_reward_detail.html',
	    	controller: 'activity_reward_detailCtrl'
	    }).state('activity_loan',{
	    	url: '/activity_loan/:activity_id',  //活动白条
	    	templateUrl: '/html/activity/activity_loan.html'
	    }).state('activity_detail',{
	    	url: '/activity_detail/:id',  //活动详情
	    	templateUrl: '/html/activity/activity_detail.html'		
	    }).state('activity_detail.activity_deta_date',{
	    	url: '/activity_deta_date',  //活动详情数据显示
	    	templateUrl: '/html/activity/activity_particulars.html'	 
	    }).state('activity_detail_app',{     
	    	url: '/activity_detail_app/:id',  //活动详情数据显示_提供给原生app
	    	templateUrl: '/html/activity/activity_particulars.html',
	    	controller: 'activity_deta_app'	
	    }).state('activity_detail.registration_number',{
	    	url: '/registration_number',  //活动详情报名显示
	    	templateUrl: '/html/activity/activity_registration_number.html'	
	    }).state('activity_detail.activity_message',{
	    	url: '/activity_message',  //活动详情留言
	    	templateUrl: '/html/activity/activity_message.html'
	    }).state('activity_sign_ree',{
	    	url: '/activity_sign_ree',  //免费报名表单 
	    	templateUrl: '/html/activity/activity_sign_ree.html'
	    }).state('activity_charge',{
	    	url: '/activity_charge',  //活动详情报名显示
	    	templateUrl: '/html/activity/activity_charge.html'	
	    }).state('e_money_pay',{
	    	url: '/e_money_pay',  //e币支付
	    	templateUrl: '/html/pay/money_pay.html'	
	    }).state('promotional_act',{
	    	url: '/promotional_act',  //发起活动
	    	templateUrl: '/html/activities_promotional/promotional_act.html'	
	    }).state('custom_form',{
	    	url: '/custom_form',  //发起活动-自定义表单
	    	templateUrl: '/html/activities_promotional/custom_form.html'	
	    }).state('sponsorship',{
	    	url: '/sponsorship',  //发起活动-自定义表单
	    	templateUrl: '/html/activities_promotional/sponsorship.html'	
	    }).state('sp_details',{
	    	url: '/sp_details/:id',  //赞助单页-显示
	    	templateUrl: '/html/sponsorship/sponsorship_details.html'	
	    }).state('sp_details.sponsorship_deta_date',{
	    	url: '/sponsorship_deta_date',  //赞助详情
	    	templateUrl: '/html/sponsorship/sponsorship_particulars.html'	
	    }).state('sp_details.sponsorship_participate',{
	    	url: '/sponsorship_participate',  //赞助单页--参与人数
	    	templateUrl: '/html/sponsorship/sponsorship_participate.html'	
	    }).state('sp_details.sponsor_message',{
	    	url: '/sponsor_message',  //赞助单页--参与人数
	    	templateUrl: '/html/sponsorship/sponsorship_message.html'	
	    }).state('sponsorship_return',{
	    	url: '/sponsorship_return',  //赞助单页--参与人数
	    	templateUrl: '/html/sponsorship/sponsorship_return.html'	
	    }).state('activity_success',{      
	    	url: '/activity_success?t_id', 
	    	templateUrl: '/html/activity/activity_success.html',
	    	controller: 'activity_success'
	    }).state('activity_machine_apply',{      
	    	url: '/activity_machine_apply', 
	    	templateUrl: '/html/activity/activity_machine_apply.html'
	    }).state('activity_streaming',{
	    	url: '/activity_streaming/:ac_id/:count',  //活动直播
	    	templateUrl: '/html/activity/activity_streaming.html',
	    	controller: 'activity_streamingCtrl'
	    }).state('activity_streaming.activity_reward_detail',{
	    	url: '/activity_reward_detail/:id',  		// 活动打赏详情
	    	templateUrl: '/html/activity/activity_reward_detail.html',
	    	controller: 'activity_reward_detailCtrl'
	    }).state('activity_streaming.activity_detail',{
	    	url: '/activity_detail/:id',  //活动详情
	    	templateUrl: '/html/activity/activity_detail.html'		
	    }) 

	    // 搜索
	    .state('search',{
	    	url: '/search',						// 搜索结果
	    	templateUrl: '/html/common/search.html',
	    	controller: 'searchCtrl'
	    }) 
	    
	    .state('test_list',{
	    	url: '/test_list',	
	    	templateUrl: '/html/test_list.html',
	    	controller: 'test_listCtrl'
	    })


	    // 用戶
	    .state('personal_center',{
	    	url: '/personal_center',			// 个人中心
	    	templateUrl: '/html/user/personal_center.html',
	    	controller: 'personal_centerCtrl'
	    }).state('feedback',{
	    	url: '/feedback',  					// 我的反馈
	    	templateUrl: '/html/user/feedback.html',
	    	controller: 'feedbackCtrl'
	    }).state('about_us',{
	    	url: '/about_us',  					// 关于我们
	    	templateUrl: '/html/user/about_us.html'
	    }).state('agreement',{
	    	url: '/agreement', 					// 服务协议
	    	templateUrl: '/html/user/agreement.html' 
	    }).state('message_user',{
	    	url: '/message_user',  				// 用户消息
	    	templateUrl: '/html/user/message_user.html',
	    	controller: 'message_userCtrl'
	    })


	    .state('activity_user',{				// 我的活动
	    	url: '/activity_user/:type/:user_id',  	
	    	templateUrl: '/html/user/activity_user.html',
	    	controller: 'activity_userCtrl'
	    }).state('sponsorship_user',{			// 我的赞助
	    	url: '/sponsorship_user/:type/:user_id',  
	    	templateUrl: '/html/user/sponsorship_user.html',
	    	controller: 'sponsorship_userCtrl'
	    }).state('sponsorship_user_detail',{	// 我的赞助详情
	    	url: '/sponsorship_user_detail/:id/:money/:peo_num',  
	    	templateUrl: '/html/user/sponsorship_user_detail.html',
	    	controller: 'sponsorship_user_detailCtrl'
	    }).state('sponsorship_payment',{
	    	url: '/sponsorship_payment/:id',    // 我的赞助-支付详情
	    	templateUrl: '/html/user/sponsorship_payment.html',
	    	controller: 'sponsorship_paymentCtrl'
	    }).state('lous_user',{
	    	url: '/lous_user/:type/:user_id',   // 我的白条
	    	templateUrl: '/html/user/lous_user.html',
	    	controller: 'lous_userCtrl'
	    }).state('lous_user_detail',{			// 我的白条详情
	    	url: '/lous_user_detail/:id/:activity_id/:name/:sex/:phone/:apply_money/:contact_status/:user_remark/:periods/:create_time',  
	    	templateUrl: '/html/user/lous_user_detail.html',
	    	controller: 'lous_user_detailCtrl'
	    }).state('ticket_user',{
	    	url: '/ticket_user', 				// 我的票券列表
	    	templateUrl: '/html/user/ticket_user.html',
	    	controller: 'ticket_userCtrl'
	    }).state('ticket_user_detail',{
	    	url: '/ticket_user_detail/:id',  	// 我的票券详情
	    	templateUrl: '/html/user/ticket_user_detail.html',
	    	controller: 'ticket_user_detailCtrl'
	    }).state('personal_host',{
	    	url: '/personal_host/:sponsor_user_id',  	// 个人主办方
	    	templateUrl: '/html/user/personal_host.html',
	    	controller: 'personal_host'
	    }).state('personal_host.personal_host_activity',{
	    	url: '/personal_host_activity',  	// 个人主办方发起的活动
	    	templateUrl: '/html/user/personal_host_activity.html',
	    	controller: 'personal_host_activity'
	    }).state('personal_host.personal_host_message',{
	    	url: '/personal_host_message',  	// 个人主办方留言
	    	templateUrl: '/html/user/personal_host_message.html',
	    	controller: 'personal_host_message'
	    }).state('personal_host_list',{
	    	url: '/personal_host_list',  	// 个人主办方留言
	    	templateUrl: '/html/user/personal_host_list.html',
	    	controller: 'personal_host_listCtrl'
	    })


	    // 其他-金融贷款
	    .state('finance_loan',{
	    	url: '/finance_loan',  				// 金融贷款
	    	templateUrl: '/html/others/finance_loan.html',
	    	controller: 'finance_loanCtrl',
	    	controllerAs: 'finance'
	    })
      

	    // 用户—钱包
	    .state('wallet',{
	    	url: '/wallet',  				// 我的钱包
	    	templateUrl: '/html/user_wallet/wallet.html',
	    	controller: 'walletCtrl',
	    	controllerAs: 'wallet'
	    }).state('ecoin',{
	    	url: '/ecoin',  				// 我的e币
	    	templateUrl: '/html/user_wallet/ecoin.html',
	    	controller: 'walletCtrl',
	    	controllerAs: 'wallet'
	    }).state('ecoin_recharge',{
	    	url: '/ecoin_recharge',  		// e币充值
	    	templateUrl: '/html/pay/ecoin_recharge.html',
	    	controller: 'ecoin_rechargeCtrl'
	    }).state('ecoin_detail',{
	    	url: '/ecoin_detail',  			// e币查询明细
	    	templateUrl: '/html/user_wallet/ecoin_detail.html',
	    	controller: 'ecoin_detailCtrl'
	    }).state('bankcard',{
	    	url: '/bankcard',  				// 我的银行卡
	    	templateUrl: '/html/user_wallet/bankcard.html',
	    	controller: 'bankcardCtrl'
	    }).state('bankcard_add',{
	    	url: '/bankcard_add',  			// 添加银行卡
	    	templateUrl: '/html/user_wallet/bankcard_add.html',
	    	controller: 'bankcard_addCtrl'
	    })
	    
        // 用户—账号
        .state('signin',{
            url: '/signin',                 // 登录
            templateUrl: '/html/user_account/signin.html',
            controller: 'signinCtrl'
        }).state('register',{
            url: '/register',               // 注册
            templateUrl: '/html/user_account/register.html',
            controller: 'registerCtrl'
        }).state('userInfo',{
            url: '/userInfo',               // 个人信息
            templateUrl: '/html/user_account/userInfo.html',
            controller: 'userInfoCtrl'
        }).state('userInfo_edit',{
            url: '/userInfo_edit/:type',    // 个人信息修改
            templateUrl: '/html/user_account/userInfo_edit.html',
            controller: 'userInfo_editCtrl'
        }).state('sponsor_auth',{
            url: '/sponsor_auth/:status',   // 主办方认证编辑
            templateUrl: '/html/user_account/sponsor_auth.html',
            controller: 'sponsor_authCtrl'
            	
        })
        
        // 注册活动号， 注册嘉宾号， 注册媒体号
        .state('activity_auth',{
            url: '/activity_auth',   			// 注册活动号
            templateUrl: '/html/authentication/activity_auth.html'
        }).state('guest_auth',{
            url: '/guest_auth',   				// 注册嘉宾号
            templateUrl: '/html/authentication/guest_auth.html'	
        }).state('media_auth',{
            url: '/media_auth',   				// 注册媒体号
            templateUrl: '/html/authentication/media_auth.html'
        }).state('auth_list',{
            url: '/auth_list',   				// 认证列表
            templateUrl: '/html/authentication/auth_list.html',
            controller: 'auth_listCtrl'
        })
      
    }])
