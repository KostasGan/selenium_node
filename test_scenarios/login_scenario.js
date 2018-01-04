const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const login = require('../test_cases/login');


exports.Login = (driver, chromeSettings, url, creds) => {
	test.describe('Login Functionality Tests', function() {
		this.timeout(20000);

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
		test.it('Successfully Login', function() {
			driver.get(url);

			login.Login(driver, creds).then((val) => {
				assert.ok(val);
			});
		});
		test.it('Try To Login With Wrong Creds', function() {
			driver.get(url);

			login.LoginWithWrongCreds(driver, creds).then((val) => {
				assert.equal(val, 'Completed -> Wrong Creds');
			});
		});
	});
};
