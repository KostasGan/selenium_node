const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const config = require('config');
const login = require('../test_cases/login.js');

exports.Kati = (driver, url, creds) => {
	test.describe('First Test Case', function () {
		test.before(function () {
			driver = new webdriver
				.Builder()
				.forBrowser('chrome')
				.setChromeOptions(new chrome.Options().addArguments('--headless'))
				.build();

			driver.manage().window().maximize();
		});

		test.beforeEach(function () {
			driver.getWindowHandle();
		});

		test.after(function () {
			//driver.quit();
		});

		test.it('User Profile', function () {
			this.timeout(50000);

			driver.get(url);
			//driver.get(url1);

			login.Login(driver, creds).then((val) => {
				assert.ok(val);
			});

			// driver.get('https://staging.e-food.gr/account');

			// user_infos.UpdateUserEmail(driver, creds).then((val)=>{
			// 	assert.equal(val, "Completed");
			// });
		});
	});
};
