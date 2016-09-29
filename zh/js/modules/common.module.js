(function() {

angular.module('common')
    .factory('messageService', messageService)
    .factory('encryptService', encryptService)
    .factory('transmitService', transmitService)
    .factory('anchorService', anchorService)
    .directive('backButton', backButton)
    .directive('muiSelect', muiSelect)
    .directive('showBackBtn', showBackBtn);



    // ======================== 消息提示 ========================
    /* @ngInject */
    function messageService($timeout) {

        var messages = {
            'show': show
        };
        return messages;
        
        function show(tips, type) {
            var type = type || 'alert';
            if(type == 'alert') {
                mui.alert(tips, 'E场景活动');
            } else if (type == 'toast' && tips) {
                $('body').append('<div class="messageBox">' + tips +'</div>').fadeIn();
                $timeout(function(){
                    $('.messageBox').fadeOut();
                }, 2500);
            }
        };
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


    // =============================== 下拉选项 ==============================
    /* @ngInject */
    function  muiSelect($window) {
        var directive = {
            restrict: 'AE',
            link: link
        };
        return directive;

        function link(scope, ele, attrs) {
            ele.bind('click', function () {
                var deadline = [{'text':'3期','value': 3},{'text':'6期','value': 6},{'text':'9期','value': 9},{'text':'12期','value': 12},{'text':'24期','value': 24},{'text':'36期','value': 36},{'text':'48期','value': 48}],
                    repayType = [{'text': '冠名'}, {'text': '广告位'},{'text': '媒体'}, {'text': '现场'},{'text': '实物'}, {'text': '指定物品'},{'text': '其他'}],
                    industry = [],
                    data;
                if(ele.attr('deadline') == '') {
                    data = deadline;
                } else if(ele.attr('industry') == '') {
                    data = industry;
                } else if(ele.attr('repayType') == '') {
                    data = repayType;
                } else {
                    data = JSON.parse(ele.attr('select-datas'));
                }
                var picker  = new mui.PopPicker();
                picker.setData(data);
                picker.show(function (selectItems) {
                    ele.val(selectItems[0].text);
                    // 判断是否有id值
                    if(selectItems[0].value && ele.next('input[type="hidden"]').length > 0) {
                        ele.next('input[type="hidden"]').val(selectItems[0].value);
                    }
                });
            });
        }
    }

    // ======================== 顶部导航显示返回按钮 ========================
    /* @ngInject */
    function showBackBtn() {
        var directive = {
            restrict: 'AE',
            link: link
        };
        return directive;

        function link(scope, ele, attrs) {
            $(".ds_poiu_a").removeClass("show_a");
            $(".retreat_icon").removeClass("none");
        }
    }

})();