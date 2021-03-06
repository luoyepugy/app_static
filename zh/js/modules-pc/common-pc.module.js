(function() {

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
        };
        return messages;
    
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