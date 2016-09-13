(function() {

angular.module('form', ['request', 'common', 'ui.router'])
    .factory('validateService', validateService)
    .directive('submitButton', submitButton)
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
                    'number': $(form).find('input[format-number]'),
                    'email': $(form).find('input[format-email]'),
                    'idCard': $(form).find('input[format-idCard]')
                },
                formatRegexp = {
                    'phone': /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/,
                    'idCard': /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    'email': /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'number': /^[0-9]*$/
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
                        if(type == 'phone' || type == 'number' || type == 'idCard' || type == 'email') {
                            if(!formatRegexp[type].test(val)) {
                                formatTip();
                            }
                        }
                        if(type == 'bankCard') {
                            if(!_isBankCard(val)) {
                                formatTip();
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

            // ---------手机号码-------------最小字符长度------------最大字符长度-----------银行卡号码----------------数字---------------电子邮箱------------身份证号码---------------确认密码---------
            if(_format('phone') && _format('minLength') && _format('maxLength') && _format('bankCard') && _format('number') && _format('email') && _format('idCard') && _format('confirmPwd')) {
                return true;
            }
            return valid;
        }


        // --------------------------- 提交表单数据 --------------------------
        function submitData(form) {
            var datas = {};
            $(form).find('input[name],textarea[name],select[name]').each(function() {
                var key = $(this).attr('name');
                var val = $.trim($(this).val());
                if(key.indexOf('.') != -1) {
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


    // ======================== 提交按钮 ========================
    /* @ngInject */
    function submitButton(httpService, messageService, validateService, $state, $window) {
        var directive = {
            restrict: 'E',
            template: '<button name="submitBtn" class="mui-btn mui-btn-block mui-btn-green" ng-class="btnClass">{{text}}</button>',
            replace: true,
            scope: {
                callback: '&'
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            scope.text = attrs.text || '提交保存';
            scope.btnClass = attrs.btnClass || '';

            element.bind('click', function() {

                // 验证是否为空与格式
                if(!validateService.isEmpty(attrs.form) || !validateService.isCorrectFormat(attrs.form)) {
                    return false;
                }

                // 提交表单数据
                var resultsDatas = validateService.submitData(attrs.form);

                if(!jQuery.isEmptyObject(resultsDatas)) {
                    var method = attrs.method || 'POST';

                    // console.log(resultsDatas);

                    httpService.getDatas(method, attrs.action, resultsDatas)
                    // httpService.get(method, action, resultsDatas);
                    .then(function(data) {
                        // 回调
                        if(attrs.callback) {
                            scope.callback({arg1: data});
                            return false;
                        }

                        // 其他情况
                        if(data.code == 0) {
                            // 路由
                            if(attrs.state == 'back'){
                                $window.history.back();
                            } else if(attrs.state){
                                $state.go(attrs.state);
                            }
                            // 消息提示
                            if(attrs.msg) {
                                messageService.show(attrs.msg);
                            }
                        } else {
                            if(data.msg) {
                                messageService.show(data.msg);
                            }
                            if(attrs.msg) {
                               messageService.show(attrs.msg); 
                            }
                        }
                    });
                }
            });
        }
    }


    // ======================== 保存按钮 ========================
    /* @ngInject */
    function saveButton(httpService, messageService, validateService, $state, $window) {
        var directive = {
            restrict: 'E',
            template: '<button name="saveBtn" class="mui-btn mui-btn-green" ng-class="btnClass">{{text}}</button>',
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