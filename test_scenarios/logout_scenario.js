const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const login = require('../test_cases/login');
const logout = require('../test_cases/logout');
const chrome = require('selenium-webdriver/chrome');

exports.Logout = (driver, url, creds) => {
	test.describe('Logout Functionality Tests', function() {
		test.beforeEach(function() {
			driver = new webdriver
				.Builder()
				.forBrowser('chrome')
				.setChromeOptions(new chrome.Options().addArguments('--headless'))
				.build();

			driver.manage().window().maximize();
		});
		test.after(function() {
			driver.quit();
		});
		test.it('Successfully Login - Successfully Logout', function() {
			this.timeout(15000);

			driver.get(url);

			login.Login(driver, creds).then((val) => {
				assert.ok(val);
            });
            
            logout.Logout(driver).then((val) => {
                assert.equal(val, 'Complete');
            });
		});
	});
};
