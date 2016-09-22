(function() {
/* 
 * 张晗
 * 活动模块
 */

angular.module('activity', ['common', 'request', 'ui.router'])

	// ======================= 活动打赏表单 ==============================
	/* @ngInject */
	.controller('activity_rewardCtrl', function($scope, $stateParams, httpService) {
		$scope.reward = {};
		var activityId = $stateParams.id;
		httpService.getDatas('GET', '/activityTip/' + activityId + '/sponsorApply').then(function(data) {
			$scope.reward = data.info;
		});

		$scope.submitReward = function(data) {
			data.channel = 1;
			data.activity_id = activityId;
			// 微信支付
			var url="https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}?data={2}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";		
	        url = url.replace('{0}','wxca4f9653c04f3e8d').replace('{1}','http://m.apptown.cn/wechat/activityTip').replace('{2}',JSON.stringify(data));
	        window.location.href=encodeURI(encodeURI(url));
		}
	})
	// ======================= 活动打赏详情 ==============================
	/* @ngInject */
	.controller('activity_reward_detailCtrl', function($scope, $stateParams, httpService, messageService) {
		var activityId = $stateParams.id,
			index = 1;

		$scope.type = $stateParams.type;
		$scope.rewardMore = function() {
			index++;
			init(true);
		}
		// 获取总人数和总金额
		httpService.getDatas('GET', '/activityTip/' + $stateParams.id + '/info').then(function(data) {
			$scope.reward = data.info;
		});
		
		var init = function(more) {
			// 获取打赏列表数据
			httpService.getDatas('GET', '/activityTip/' + activityId, {pageIndex: index, pageSize: 8}).then(function(data) {
				if(more) {
					$scope.rewardList = $scope.rewardList.concat(data.rows);
					if(data.rows.length == 0) {
						messageService.show('没有更多数据了');
					}
				} else {
					$scope.rewardList = data.rows;
					if(data.rows.length == 0) {
						messageService.show('还没有人打赏哦！');
					}
				}
			});
		}
		init();
	})


})();
