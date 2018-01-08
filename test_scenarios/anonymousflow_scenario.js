const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const login = require('../test_cases/login');
const address = require('../test_cases/address');
const shoplist = require('../test_cases/shoplist');
const shopProfile = require('../test_cases/shop_profile');
const checkout = require('../test_cases/checkout.js');


exports.AnonymousFlow = (driver, chromeSettings, url, creds) => {
    // test.describe('Anonymous Flows', function () {
    //     this.timeout(35000);
    //     this.slow(10000);

    //     test.before(function () {
    //         driver = new webdriver
    //             .Builder()
    //             .forBrowser('chrome')
    //             .setChromeOptions(chromeSettings)
    //             .build();
    
    //         driver.get(url);
    //     });
    //     test.after(function () {
    //         driver.quit();
    //     });

    //     test.describe("Homepage to Checkout(Login)", function () {

    //         test.it('Add Address', function () {
                
    //             address.AddAddressAnonymous(driver).then((val) => {
    //                 assert.ok(val);
    //             });
    //         });
    //         test.it('Select Blue Shark For Shop Listing', function () {
    //             shoplist.GetShopList(driver).then((val) => {
    //                 assert.equal(val, 'Completed');
    //             });
    //         });
           
    //         test.it('Shop Profile - Add Items/Offer To Cart', function () {
    //             shopProfile.MakeOrderInShopProfile(driver, creds).then((val) => {
    //                 assert.equal(val, 'Completed');
    //             });
    //         });
            
            
    //         test.it('Successfully Login', function () {
    //             login.Login(driver, creds).then((val) => {
    //                 assert.ok(val);
    //             });
    //         });
    //         test.it('Checkout and GO', function () {
    //             checkout.SubmitOrder(driver, creds).then((val) => {
    //                 assert.equal(val, 'Completed');
    //             });
    //         });
    //     });
    // });
    
    test.describe('Anonymous Flows 3', function () {
        this.timeout(35000);
        this.slow(10000);
        
        test.before(function () {
            driver = new webdriver
                .Builder()
                .forBrowser('chrome')
                .setChromeOptions(chromeSettings)
                .build();

            driver.get(url + "/delivery/neo-irakleio/blue-shark");
        });
        test.after(function () {
            driver.quit();
        });

        test.describe("Shop Profile to Checkout(Login)", function () {
            test.it('Check for no Address Popup', function () {
                shopProfile.CheckForNoAddress(driver).then((val) => {
                    assert.ok(val);
                });
            });

            test.it('Add Address', function () {
                address.AddAddressAnonymous(driver).then((val) => {
                    assert.ok(val);
                });
            });
           
            test.it('Shop Profile - Add Items/Offer To Cart', function () {
                shopProfile.MakeOrderInShopProfile(driver, creds).then((val) => {
                    assert.equal(val, 'Completed');
                });
            });

            test.it('Successfully Login', function () {
                login.Login(driver, creds).then((val) => {
                    assert.ok(val);
                });
            });
            test.it('Checkout and GO', function () {
                checkout.SubmitOrder(driver, creds).then((val) => {
                    assert.equal(val, 'Completed');
                });
            });
        });
    });
};
