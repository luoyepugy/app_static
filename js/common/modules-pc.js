(function() {

    messageService.$inject = ["$timeout"];
    backButton.$inject = ["$window"];
    transmitService.$inject = ["$window"];
    anchorService.$inject = ["$window"];
angular.module('common',[])
    .factory('messageService', messageService)
    .factory('encryptService', encryptService)
    .factory('transmitService', transmitService)
    .factory('anchorService', anchorService)
    .directive('backButton', backButton);



    // ======================== 消息提示 ========================
    /* @ngInject */
    function messageService($timeout) {

        var messages = {
            'show': show
            // 'toast': toast
        };
        return messages;
        
        // function show(tips, type) {
        //     $('body').append('<div class="messageBox alert alert-error">' + tips +'</div>').fadeIn();
        //     $timeout(function(){
        //         $('.messageBox').fadeOut();
        //     }, 2500);
        // };

        function show(tips, type, title) {
            title = title || '';
            type = type || 'error';
            switch(type) {
                case 'info': toastr.info(title,tips); break;
                case 'error': toastr.error(title,tips); break;
                case 'success': toastr.success(title,tips); break;
                case 'warning': toastr.warning(title,tips); break;
            }
        }
    }


    // ======================== 密码加密 ========================
    /* @ngInject */
    function encryptService() {

        var encrypt = {
            'getValue': getValue
        };
        return encrypt;
        
        function getValue(value) {
            var data = {
                "aesKey": "1234367822345608",
                "ivStr": "1166222233334455",
                "newAesKey": null
            };
            var sendData = CryptoJS.enc.Utf8.parse(value);
            var key = CryptoJS.enc.Utf8.parse(data.aesKey);
            var iv  = CryptoJS.enc.Utf8.parse(data.ivStr);
            var encrypted = CryptoJS.AES.encrypt(sendData, key,{iv:iv,mode:CryptoJS.mode.CBC});
            return encrypted.toString();

        }
    }


    // ======================== 返回按钮 ========================
    /* @ngInject */
    function  backButton($window) {
        var directive = {
            restrict: 'AE',
            link: link
        };
        return directive;

        function link(scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
            });
        }
    }


    // ======================== 传递数据 ========================
    /* @ngInject */
    function transmitService($window) {
        var transmit = {
            'data': '',
            'setDatas': setDatas,
            'getDatas': getDatas
        };
        return transmit;
        
        function setDatas(data) {
            if(transmit.data == '') {
                $window.history.back();
            } else {
                transmit.data = data;
            }
        }
        function getDatas() {
            return transmit.data;
        }
    }

    // ======================== 锚点滚动 ========================
    /* @ngInject */
    function anchorService($window) {
        var anchor = {
            toView: toView,
            inView: inView
        };
        return anchor;

        function toView(element, top, height) {
            var winHeight = $(window).height();

            element = $(element);
            height = height > 0 ? height : winHeight / 10;
            $('html, body').animate({
                scrollTop: top ? (element.offset().top - height) : (element.offset().top + element.outerHeight() + height - winHeight)
            }, {
                duration: 200,
                easing: 'linear',
                complete: function () {
                    if (!inView(element)) {
                        element[0].scrollIntoView( !! top);
                    }
                }
            });
        }

        function inView(element) {
            element = $(element);

            var win = $(window),
                winHeight = win.height(),
                eleTop = element.offset().top,
                eleHeight = element.outerHeight(),
                viewTop = win.scrollTop(),
                viewBottom = viewTop + winHeight;

            function isInView(middle) {
                return middle > viewTop && middle < viewBottom;
            }

            if (isInView(eleTop + (eleHeight > winHeight ? winHeight : eleHeight) / 2)) {
                return true;
            } else if (eleHeight > winHeight) {
                return isInView(eleTop + eleHeight - winHeight / 2);
            } else {
                return false;
            }
        }
    }

})();
(function() {

    validateService.$inject = ["messageService", "encryptService"];
    saveButton.$inject = ["httpService", "messageService", "validateService", "$window"];
angular.module('form', ['request', 'common'])
    .factory('validateService', validateService)
    .directive('saveButton', saveButton);


    // ======================== 验证 ========================
    /* @ngInject */
    function validateService(messageService, encryptService) {

        var validate = {
            'isEmpty': isEmpty,
            'isCorrectFormat': isCorrectFormat,
            'submitData': submitData
        };
        return validate;

        // ------------------------ 验证输入框是否为空 -----------------------
        function isEmpty(form) {
            var eles = $(form).find('input[data-empty], textarea[data-empty]'),
                num = 0,
                valid = false;
            eles.each(function() {
                var key = $(this).attr('name');
                var val = $.trim($(this).val());
                if(val == '' || val == null || val == '[]') {
                    $(this).focus();
                    messageService.show($(this).data('empty'));
                    num++;
                    return false;
                }
            });
            if(num == 0) {
                valid = true;
            }
            return valid;
        };

        // ---------------------- 验证格式是否正确 --------------------------
        function isCorrectFormat(form) {
            var valid = true,
                formatEles = {
                    'phone': $(form).find('input[format-phone]'),
                    'bankCard': $(form).find('input[format-bankCard]'),
                    'newPwd': $(form).find('input[new-password]'),
                    'confirmPwd': $(form).find('input[confirm-password]'),
                    'minLength': $(form).find('input[min-length], textarea[min-length]'),
                    'maxLength': $(form).find('input[max-length], textarea[max-length]'),
                    'minNumber': $(form).find('input[min-number]'),
                    'maxNumber': $(form).find('input[max-number]'),
                    'number': $(form).find('input[format-number]'),
                    'money': $(form).find('input[fomat-money]'),
                    'email': $(form).find('input[format-email]'),
                    'idCard': $(form).find('input[format-idCard]')
                },
                formatRegexp = {
                    'phone': /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/,
                    'idCard': /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    'email': /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'number': /^[0-9]*$/,
                    'money': /^[\d,]+(\.\d*)?$/
                };

            // 验证银行卡号码格式
            var _isBankCard = function(value) {
                if(/[^0-9 \-]+/.test(value)){
                    return false;
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false;
                value = value.replace(/\D/g, "");
                for(var n =value.length -1;n >=0;n--){
                    var cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit,10);
                    if(bEven){
                        if((nDigit *=2) >9){
                            nDigit -=9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }
                return (nCheck % 10) ===0;
            }

            var _format = function(type) {
                var errorNum = 0, 
                    typeNum = 0;
                if(formatEles[type].length > 0) {
                    formatEles[type].each(function() {
                        var tips = ($(this).data('empty')) ? $(this).data('empty').slice(3) : '';
                            val = $(this).val();
                        var formatTip = function () {
                            typeNum++;
                            if(tips) {
                                messageService.show(tips + '格式不正确');
                            } else {
                                messageService.show('请输入正确的格式');
                            } 
                        }
                        // 格式
                        if(type == 'phone' || type == 'number' || type == 'idCard' || type == 'email' || type == 'money') {
                            if(!formatRegexp[type].test(val)) {
                                formatTip();
                            }
                        }
                        if(type == 'bankCard') {
                            if(!_isBankCard(val)) {
                                formatTip();
                            }
                        }
                        // 金额不能为0 
                        if(type == 'money' || type == 'number') {
                            if(val == 0) {
                                typeNum++;
                                messageService.show(tips + '必须大于0');
                            }
                        }
                        // 确认密码
                        if(type == 'confirmPwd') {
                            if(formatEles['newPwd'].val() != val) {
                                typeNum++;
                                messageService.show('两次密码输入不一致');
                            }
                        }
                        // 最小长度和最大长度字符
                        if(type == 'minLength') {
                            var minlen = $(this).attr('min-length');
                            if(val.length < minlen) {
                                typeNum++;
                                messageService.show($(this).data('empty').slice(3) + '最小长度为' + minlen);
                            }
                        }
                        if(type == 'maxLength') {
                            var maxlen = $(this).attr('max-length');
                            if(val.length > maxlen) {
                                typeNum++;
                                messageService.show($(this).data('empty').slice(3) + '最大长度为' + maxlen);
                            }
                        }
                        // 最小数值和最大数值
                        if(type == 'minNumber') {
                            var minnum = $(this).attr('min-number');
                            if(Number(val) < Number(minnum)) {
                                typeNum++;
                                messageService.show($(this).data('empty').slice(3) + '最小值为' + minnum);
                            }
                        }
                        if(type == 'maxNumber') {
                            var maxnum = $(this).attr('max-number');
                            if(Number(val) > Number(maxnum)) {
                                typeNum++;
                                messageService.show($(this).data('empty').slice(3) + '最大值为' + maxnum);
                            }
                        }

                        // 类型
                        if(typeNum != 0) {
                            $(this).focus();
                            errorNum++;
                            valid = false;
                            return false;
                        }
                    });
                    if(errorNum != 0) {
                        valid = false;
                        return false;
                    }
                }
                return true;
            }

            // ---------手机号码-------------最小字符长度------------最大字符长度-----------银行卡号码----------------数字---------------电子邮箱------------身份证号码---------------确认密码---------金额-----------------最小数值---------------最大数值--------
            if(_format('phone') && _format('minLength') && _format('maxLength') && _format('bankCard') && _format('number') && _format('email') && _format('idCard') && _format('confirmPwd') && _format('money') && _format('minNumber') && _format('maxNumber')) {
                return true;
            }
            return valid;
        }

        // --------------------------- 提交表单数据 --------------------------
        function submitData(form) {
            var datas = {};
            $(form).find('input[name],textarea[name],select[name]').each(function() {
                var key = $(this).attr('name'),
                    val = $(this).val(),
                    type = $(this).attr('type');
                if((type == 'radio'|| type == 'checkbox') && $(this).prop('checked') == false){
                    return;
                } else if(key == '') {
                    return;
                } else if(type == 'checkbox' && key.substr(key.length-2,2) == '[]'){
                    key = key.substr(0,key.length-2);                     
                    if(!datas[key]) {
                        datas[key] = [];
                    } else {
                        datas[key].push(val);
                    }
                } else if(key.indexOf('.') != -1) {
                    var arr = key.split('.');
                    if(!datas[arr[0]]) {
                        datas[arr[0]] = {};
                    }
                    datas[arr[0]][arr[1]] = val;                 
                } else if (key.indexOf('[]') != -1) {
                    var arr = key.split('[]');
                    datas[arr[0]] = JSON.parse(val);
                } else {
                    datas[key] = val;
                }
                
            });

            var _dealDatas = function(attrs, callback) {
                var eles = $(form).find('input['+ attrs +']');
                if(eles.length > 0) {
                    eles.each(function() {
                        callback($(this).attr('name'), $(this).val());
                    });
                }
            };
            // 处理值为数字类型
            _dealDatas('number', function(key, val) {
                datas[key] = Number(val);
            });
            // 处理值为布尔类型
            _dealDatas('boolean', function(key, val) {
                datas[key] = (val === 'true') ? true : false;
            });
            // 处理加密数据
            _dealDatas('encrypt', function(key, val) {
                datas[key] = encryptService.getValue(val);
            });
            // 处理时间戳
            _dealDatas('timestamp', function(key, val) {
                datas[key] = new Date(val).getTime();
            });

            return datas;
        }
    }


    // ======================== 保存按钮 ========================
    /* @ngInject */
    function saveButton(httpService, messageService, validateService, $window) {
        var directive = {
            restrict: 'E',
            template: '<button name="saveBtn" class="btn btn-primary" ng-class="btnClass">{{text}}</button>',
            replace: true,
            scope: {
                callback: '&'
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            scope.text = attrs.text || '确定';
            scope.btnClass = attrs.btnClass || '';

            element.bind('click', function() {
                
                // 验证是否为空与格式
                if(!validateService.isEmpty(attrs.form) || !validateService.isCorrectFormat(attrs.form)) {
                    return false;
                }

                // 提交表单数据
                var resultsDatas = validateService.submitData(attrs.form);

                // 回调
                if(attrs.callback) {
                    scope.callback({arg1: resultsDatas});
                }
            });
        }
    }


})();
(function() {

    httpService.$inject = ["$q", "$http", "messageService"];
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
                need = need || 'data';
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