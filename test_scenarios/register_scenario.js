const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const register = require('../test_cases/register');


exports.Register = (driver, chromeSettings, url, creds) => {
	test.describe('Register Functionality Tests', function() {
		this.timeout(15000);
		this.slow(7500);

		test.beforeEach(function() {
			driver = new webdriver
				.Builder()
				.forBrowser('chrome')
				.setChromeOptions(chromeSettings)
				.build();
		});
		test.afterEach(function() {
			driver.quit();
		});
		test.it('Successfully Login', function() {
			driver.get(url);

			register.Register(driver, creds).then((val) => {
				assert.equal(val, 'Completed');
			});
		});
	});
};
