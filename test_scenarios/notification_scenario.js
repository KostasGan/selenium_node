const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const notification = require('../test_cases/notification');
const address = require('../test_cases/address');

var eligible;
exports.NotificationCheck = (driver, chromeSettings, url) =>{
    test.describe('Notification Functionality Tests', function() {
		this.timeout(10000);
		this.slow(5000);
		
		test.before(function() {
			driver = new webdriver
				.Builder()
				.forBrowser('chrome')
				.setChromeOptions(chromeSettings)
                .build();

            driver.get(url);
		});
		test.after(function() {
			driver.quit();
        });
        
        test.describe('Homepage', function() {
            test.it('Find Notification', function() {
                notification.NotificationExistance(driver).then((val) => {
                    assert.equal(val, 'Completed');
                });
            });
            test.it('Click Notification - Go to Shop', function() {
                notification.ClickNotificationToShop(driver).then((val) => {
                    assert.equal(val, 'Completed');
                });
                driver.navigate().back();
            });
            test.it('Close Notification', function() {
                notification.CloseNotification(driver).then((val) => {
                    assert.equal(val, 'Completed');
                });
            });
        });
        test.describe('ByArea[Eligible]', function() {
            test.before(function() {
                driver.get(url+ '/delivery/kifisia');
            });
            test.it('Notification Eligible', function() {
                notification.NotificationEligible(driver).then((val) => {
                    eligible = val;
                    assert.equal(val, 'Eligible');
                });
            });
            if(eligible === 'Eligible'){
                test.it('Find Notification', function() {
                    notification.NotificationExistance(driver).then((val) => {
                        assert.equal(val, 'Completed');
                    });
                });
                test.it('Click Notification - Go to Shop', function() {
                    notification.ClickNotificationToShop(driver).then((val) => {
                        assert.equal(val, 'Completed');
                    });
                    driver.navigate().back();
                });
                test.it('Close Notification', function() {
                    notification.CloseNotification(driver).then((val) => {
                        assert.equal(val, 'Completed');
                    });
                });
            }
        });
        test.describe('ShopListing', function() {
            test.before(function() {
                driver.get(url);
            });

            test.it('Add Address', function() {
                address.AddAddressAnonymous(driver).then((val) => {
                    assert.ok(val);
                });
            });

            test.it('Notification Eligible', function() {
                notification.NotificationEligible(driver).then((val) => {
                    eligible = val;
                    assert.equal(val, 'Eligible');
                });
            });

            if(eligible === 'Eligible'){
                test.it('Find Notification', function() {
                    notification.NotificationExistance(driver).then((val) => {
                        assert.equal(val, 'Completed');
                    });
                });
                test.it('Click Notification - Go to Shop', function() {
                    notification.ClickNotificationToShop(driver).then((val) => {
                        assert.equal(val, 'Completed');
                    });
                    driver.navigate().back();
                });
                test.it('Close Notification', function() {
                    notification.CloseNotification(driver).then((val) => {
                        assert.equal(val, 'Completed');
                    });
                });
            }
        });
    });
}