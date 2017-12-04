const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const login = require('../test_cases/login');
const address = require('../test_cases/address');
const shoplist = require('../test_cases/shoplist');
const shopProfile = require('../test_cases/shop_profile');
const checkout = require('../test_cases/checkout.js');
const chrome = require('selenium-webdriver/chrome');

exports.LoggedInFlow = (driver, url, creds) => {
	test.describe('LoggedIn Flow end-to-end Functionality Tests', function() {
		this.timeout(60000);

		test.before(function() {
			driver = new webdriver
				.Builder()
				.forBrowser('chrome')
				.setChromeOptions(new chrome.Options().addArguments())
				.build();

			driver.manage().window().maximize();
		});
		test.beforeEach(function(){
			driver.getWindowHandle();
		})
		test.after(function() {
			driver.quit();
		});
		test.it('Successfully Login', function() {
			driver.get(url);

			login.Login(driver, creds).then((val) => {
				assert.ok(val);
            });
		});
		test.it('Select Address', function() {
            address.SelectAddress(driver).then((val) => {
				assert.equal(val, 'Completed');
            });
		});
		test.it('Select Blue Shark For Shop Listing', function() {
            shoplist.GetShopList(driver).then((val) => {
				assert.equal(val, 'Completed');
            });
		});
		test.it('Shop Profile - Add Items/Offer To Cart', function() {
            shopProfile.MakeOrderInShopProfile(driver,creds).then((val) => {
				assert.equal(val, 'Completed');
            });
		});
		test.it('Checkout and GO', function() {
            checkout.SubmitOrder(driver,creds).then((val) => {
				assert.equal(val, 'Completed');
            });
		});
	});
};
