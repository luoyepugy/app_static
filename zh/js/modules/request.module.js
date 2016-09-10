(function() {

angular.module('request', ['common'])
    .factory('httpService', httpService);


    // ======================== 请求数据 ========================
    /* @ngInject */
    function httpService($q, $http, messageService) {

        return {
            'getDatas': getDatas
        };
        
        function getDatas (method, url, datas, need) {
            var deferred = $q.defer();
            // 请求体
            var req = {
                method: 'POST',
                url: url,
                data: datas
            }
            if(method == 'GET') {
                req = {
                    method: 'GET',
                    url: url,
                    params: datas
                };
            }

            $http(req)
            .success(function(response,status) {
                var need = need || 'data';
                if(response.code == 0 || need == 'data') {
                    deferred.resolve(response);
                } else if(need == 'msg') {
                    messageService.show(response.msg);
                }
            })
            .error(function(error, status){
                messageService.show('服务器请求失败');
            });
            return deferred.promise;     
        }
    }

})();