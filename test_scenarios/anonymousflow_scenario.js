const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const login = require('../test_cases/login');
const address = require('../test_cases/address');
const shoplist = require('../test_cases/shoplist');
const shopProfile = require('../test_cases/shop_profile');
const checkout = require('../test_cases/checkout.js');

exports.AnonymousFlow = (driver, chromeSettings, url, creds) => {
    test.describe('Anonymous Flow end-to-end Functionality Tests', function () {
        this.timeout(60000);

        test.before(function () {
            driver = new webdriver
                .Builder()
                .forBrowser('chrome')
                .setChromeOptions(chromeSettings)
                .build();

            driver.manage().window().maximize();
        });
        test.beforeEach(function () {
            driver.getWindowHandle();
        })
        test.after(function () {
            driver.quit();
        });

        test.it('Add Address', function () {
            driver.get(url);

            address.AddAddressAnonymous(driver).then((val) => {
                assert.ok(val);
            });
        });
        // test.it('Select Blue Shark For Shop Listing', function () {
        //     shoplist.GetShopList(driver).then((val) => {
        //         assert.equal(val, 'Completed');
        //     });
        // });
        // test.it('Shop Profile - Add Items/Offer To Cart', function () {
        //     shopProfile.MakeOrderInShopProfile(driver, creds).then((val) => {
        //         assert.equal(val, 'Completed');
        //     });
        // });
        // test.it('Successfully Login', function () {
        //     login.Login(driver, creds).then((val) => {
        //         assert.ok(val);
        //     });
        // });
        // test.it('Checkout and GO', function () {
        //     checkout.SubmitOrder(driver, creds).then((val) => {
        //         assert.equal(val, 'Completed');
        //     });
        // });
    });
};
