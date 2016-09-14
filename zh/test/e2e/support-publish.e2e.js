
'use strict';

// var $ = require('jquery');

describe('hello', function() {
	it('test', function() {
		expect(0).toEqual(0);
	});
});	

describe('发布赞助页面', function() {
	var name = element(by.name('activitySupport.name')),
		// errorTip = element(by.css('mui-popup-text')),
		submitBtn = element(by.name('submitBtn'));

	describe('验证是否为空', function() {
		it('输入空的名称', function() {
			browser.get('/#/sponsorship');
			name.sendKeys('');
			submitBtn.click();

			var driver = browser.driver;
			driver.isElementPresent(by.css('mui-popup-text')).then(function(present){
			    expect(present).toBe(true);
			})
			// expect(element(by.css('mui-popup-text')).isPresent()).toBe(true);
			// expect($('.mui-popup-text').getText()).toEqual('请输入项目名称');
		});
	});
});
	

xdescribe('登录页面', function() {

    var phone = element(by.name('phone'));
    var password = element(by.name('password'));
    var submitBtn = element(by.name('submitBtn'));
    var errorTip = element(by.css('.messages'));

    function login(name, psd) {
        phone.sendKeys(name);
        password.sendKeys(psd);
        submitBtn.click();
    }; 
    function clear() {
        phone.clear();
        password.clear();
    };


    describe('输入框验证', function() {
        
        it('输入错误的密码，点击提交按钮，无跳转，错误消息提示', function() { 
            browser.get('/#/login');          
            clear();
            login('13008885781', '123');
            expect(browser.getLocationAbsUrl()).toMatch("/login");
            expect(errorTip.getText()).toEqual('用户名或密码不存在');

        });

        it('输入错误的用户名，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            login('13008885780', '1234');
            expect(browser.getLocationAbsUrl()).toMatch("/login");
            expect(errorTip.getText()).toEqual('用户名或密码不存在');
        });

        it('输入错误的用户名格式，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            login('1300888578', '1234');
            expect(browser.getLocationAbsUrl()).toMatch("/login");
            expect(errorTip.getText()).toEqual('请输入正确的手机号码格式');
        });

        it('输入空的用户名或密码，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            login('13008885781', '');
            expect(browser.getLocationAbsUrl()).toMatch("/login");
            expect(errorTip.getText()).toEqual('请输入密码');
        });

        it('输入空的用户名或密码，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            login('', '1234');
            expect(errorTip.getText()).toEqual('请输入手机号码');
            expect(browser.getLocationAbsUrl()).toMatch("/login");       
        });  

        it('输入正确的用户名与密码，点击提交按钮，跳转到发布页面', function() {  
            clear(); 
            login('13008885781', 'aaaa');
            expect(browser.getLocationAbsUrl()).toMatch("/purchase/publish");
        });
    });


    xdescribe('链接跳转正常', function() {

        beforeEach(function() {
            browser.get('/#/login');
        });

        it('点击注册按钮，跳转注册页面', function() {    
            element(by.linkText('还没有账号，赶紧来注册吧')).click();
            expect(browser.getLocationAbsUrl()).toMatch("/register");
        });

        it('点击找回密码按钮，跳转找回密码页面', function() {
            element(by.linkText('忘记密码？')).click();
            expect(browser.getLocationAbsUrl()).toMatch("/findPwd");
        });
    });
});