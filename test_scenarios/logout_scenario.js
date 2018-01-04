const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const login = require('../test_cases/login');
const logout = require('../test_cases/logout');


exports.Logout = (driver, chromeSettings, url, creds) => {
	test.describe('Logout Functionality Tests', function() {
		this.timeout(15000);

		test.beforeEach(function() {
			driver = new webdriver
				.Builder()
				.forBrowser('chrome')
				.setChromeOptions(chromeSettings)
				.build();

			driver.manage().window().maximize();
		});
		test.afterEach(function() {
			driver.quit();
		});
		test.it('Successfully Login - Successfully Logout', function() {
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
