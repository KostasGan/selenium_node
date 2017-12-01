const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const login = require('../test_cases/login');
const chrome = require('selenium-webdriver/chrome');

exports.Login = (driver, url, creds) => {
	test.describe('Login Functionality Tests', function() {
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
		test.it('Successfully Login', function() {
			this.timeout(15000);

			driver.get(url);

			login.Login(driver, creds).then((val) => {
				assert.ok(val);
			});
		});
		test.it('Try To Login With Wrong Creds', function() {
			this.timeout(15000);

			driver.get(url);

			login.LoginWithWrongCreds(driver, creds).then((val) => {
				assert.equal(val, 'Completed -> Wrong Creds');
			});
		});
	});
};
