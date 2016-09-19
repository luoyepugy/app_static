(function() {

angular.module('common',[])
    .filter('supportStatus', supportStatus)
    .filter('supportStatusClass', supportStatusClass)
    .filter('formatTime', formatTime);

    // ======================== 赞助状态 ========================
    /* @ngInject */
    function supportStatus() {
        return function(item){
            switch(item) {
                case 0: return '保存';
                case 1: return '通过';
                case 2: return '拒绝';
                case 3: return '待审核';
                case 4: return '预热中';
                case 5: return '赞助中';
                case 6: return '赞助成功';
                default: return '赞助失败';
            }
        }
    }
    // ======================== 赞助状态样式 ========================
    /* @ngInject */
    function supportStatusClass() {
        return function(item){
            switch(item) {
                case 0: return 'bg-green';
                case 1: return 'bg-green';
                case 2: return 'bg-gray';
                case 3: return 'bg-gray';
                case 4: return 'bg-orange';
                case 5: return 'bg-green';
                case 6: return 'bg-green';
                default: return 'bg-gray';
            }
        }
    }

    // ======================== 时间格式化（时间戳转化为字符串） ========================
    /* @ngInject */
    function formatTime() {
        return function(string){
            
        }
    }


})();