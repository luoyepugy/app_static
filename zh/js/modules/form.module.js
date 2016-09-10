(function() {

angular.module('form', ['request', 'common', 'ui.router'])
    .factory('validateService', validateService)
    .directive('submitButton', submitButton);


    // ======================== 验证 ========================
    /* @ngInject */
    function validateService(messageService, encryptService) {

        var validate = {
            'isEmpty': isEmpty,
            'isCorrectFormat': isCorrectFormat,
            'emptyAndFormat': emptyAndFormat,
            'submitData': submitData
        };
        return validate;

        // 验证输入框是否为空
        function isEmpty(form) {
            var eles = $(form).find('input[data-empty], textarea[data-empty]'),
                num = 0,
                valid = false;
            eles.each(function() {
                var key = $(this).attr('name');
                var val = $.trim($(this).val());
                if(val == '' || val == null) {
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

        // 验证格式是否正确
        function isCorrectFormat(form) {
            var valid = true,
                formatEles = {
                    'phone': $(form).find('input[format-phone]'),
                    'bankCard': $(form).find('input[format-bankCard]'),
                    'password': $(form).find('input[format-password]'),
                    'confirmPwd': $(form).find('input[format-confirmPwd]'),
                    'minLength': $(form).find('input[min-length]'),
                    'maxLength': $(form).find('input[max-length]'),
                    'number': $(form).find('input[format-number]')
                },
                formatRegexp = {
                    'phone': /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/,
                    'number': /^[0-9]*$/
                };


            var _format = function(eles, type) {
                var errorNum = 0, 
                    typeNum = 0;
                if(eles.length > 0) {
                    eles.each(function() {

                        if(type == 'phone') {
                            if(!formatRegexp.phone.test($(this).val())) {
                                typeNum++;
                                messageService.show($(this).data('empty').slice(3) + '格式不正确');
                            }
                        }
                        if(type == 'number') {
                            if(!formatRegexp.number.test($(this).val())) {
                                typeNum++;
                                messageService.show('请输入数字格式');
                            }
                        }
                        if(type == 'minLength') {
                            var minlen = $(this).attr('min-length');
                            if($(this).val().length < minlen) {
                                typeNum++;
                                messageService.show($(this).data('empty').slice(3) + '最小长度为' + minlen);
                            }
                        }
                        if(type == 'maxLength') {
                            var maxlen = $(this).attr('max-length');
                            if($(this).val().length > maxlen) {
                                typeNum++;
                                messageService.show($(this).data('empty').slice(3) + '最大长度为' + maxlen);
                            }
                        }
                        if(type == 'bankCard') {
                            if(!isBankCard($(this).val())) {
                                typeNum++;
                                messageService.show($(this).data('empty').slice(3) + '格式不正确');
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
                    if(errorNum == 0) {
                        valid = true; 
                    } else {
                        return false;
                    }
                }
                return true;
            }

            // 验证手机号码格式
            if(!_format(formatEles.phone, 'phone')) {
                return false;
            };

            // 验证字符最小长度
            if(!_format(formatEles.minLength, 'minLength')) {
                return false;
            };

            // 验证字符最大长度
            if(!_format(formatEles.maxLength, 'maxLength')) {
                return false;
            };

            // 验证银行卡号格式
            if(!_format(formatEles.bankCard, 'bankCard')) {
                return false;
            };

            // 验证数字格式
            if(!_format(formatEles.number, 'number')) {
                return false;
            };



            function isBankCard(value) {
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

            // 验证银行卡号格式
            // if(formatEles.bankCard.length > 0) {
            //     var errorNum = 0;
            //     formatEles.bankCard.each(function() {
            //         var val = $(this).val();
            //         if(!isBankCard(val)) {
            //             $(this).focus();
            //             messageService.show($(this).data('empty').slice(3) + '格式不正确');
            //             errorNum++;
            //             valid = false;
            //             return false;
            //         }
            //     });
            //     if(errorNum == 0) {
            //         valid = true;
            //     } else {
            //         return false;
            //     }
            // }

            // 验证手机号码格式
            // if(formatEles.phone.length > 0) {
            //     var errorNum = 0;
            //     formatEles.phone.each(function() {
            //         if(!formatRegexp.phone.test($(this).val())) {
            //             $(this).focus();
            //             messageService.show($(this).data('empty').slice(3) + '格式不正确');
            //             errorNum++;
            //             valid = false;
            //             return false;
            //         }
            //     });
            //     if(errorNum == 0) {
            //         valid = true;
            //     } else {
            //         return false;
            //     }
            // }

            // 验证两次密码是否输入一致
            if(formatEles.confirmPwd.length > 0 && formatEles.confirmPwd.length > 0) {
                if(formatEles.confirmPwd.val() !== formatEles.password.val()) {
                    formatEles.confirmPwd.focus();
                    messageService.show('两次密码输入不一致');
                    valid = false;
                    return false;
                } else {
                    valid = true;
                }
            }

            // 验证输入最小长度
            // if(formatEles.minLength.length > 0) {
            //     var errorNum = 0;
            //     formatEles.minLength.each(function() {
            //         var len = $(this).attr('min-length');
            //         if($(this).val().length < len) {
            //             $(this).focus();
            //             messageService.show($(this).data('empty').slice(3) + '最小长度为' + len);
            //             errorNum++;
            //             valid = false;
            //             return false;
            //         }
            //     });
            //     if(errorNum == 0) {
            //         valid = true;
            //     } else {
            //         return false;
            //     }
            // }

            // 验证输入最大长度
            // if(formatEles.maxLength.length > 0) {
            //     var errorNum = 0;
            //     formatEles.maxLength.each(function() {
            //         var len = $(this).attr('max-length');
            //         if($(this).val().length > len) {
            //             $(this).focus();
            //             messageService.show($(this).data('empty').slice(3) + '最大长度为' + len);
            //             errorNum++;
            //             valid = false;
            //             return false;
            //         }
            //     });
            //     if(errorNum == 0) {
            //         valid = true;
            //     } else {
            //         return false;
            //     }
            // }

            // 验证数字
            // if(formatEles.number.length > 0) {
            //     var errorNum = 0;
            //     formatEles.number.each(function() {
            //         if(!formatRegexp.number.test($(this).val())) {
            //             $(this).focus();
            //             messageService.show($(this).data('empty').slice(3) + '格式不正确');
            //             errorNum++;
            //             valid = false;
            //             return false;
            //         }
            //     });
            //     if(errorNum == 0) {
            //         valid = true;
            //     } else {
            //         return false;
            //     }
            // }

            return valid;
        }

        // 验证是否为空与格式是否正确
        function emptyAndFormat(form) {
            if(!validate.isEmpty(form) || !validate.isCorrectFormat(form)) {
                return false;
            }
            return true;
        }

        // 提交表单数据
        function submitData(form) {
            var datas = {};
            $(form).find('input[name],textarea[name],select[name]').each(function() {
                var key = $(this).attr('name');
                var val = $.trim($(this).val());
                if(key.indexOf('.') == -1) {
                    datas[key] = val;
                } else {
                    var arr = key.split('.');
                    if(!datas[arr[0]]) {
                        datas[arr[0]] = {};
                    }
                    datas[arr[0]][arr[1]] = val;
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
            var resultsIsEmpty,
                resultsDatas,
                resultIsCorrectFormat;

            element.bind('click', function() {

                // 验证是否为空与格式
                if(!validateService.emptyAndFormat(attrs.form)) {
                    return false;
                }

                // 提交表单数据
                resultsDatas = validateService.submitData(attrs.form);
                if(resultsDatas) {
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


})();