let { By, until } = require('selenium-webdriver');
const smsVerification = require('./smsVerification.js');
let opt = null;

function ValidateOrderInfo(driver) {
    return driver.findElement(By.css('div.order-content-wrapper')).then((OrderInfo) => {
        driver.wait(until.elementLocated(By.id('customername')), 1000).then((customername) => {
            customername.isDisplayed().then((val) => {
                if (val) {
                    customername.getAttribute('value').then((attr) => {
                        if (attr === '') {
                            customername.sendKeys('Κώστας');
                        }
                    });
                }
            });
        }).catch((e) => { /*console.log('Can`t find customername input field \n' + e );*/ });

        driver.wait(until.elementLocated(By.css('input#customersurname')), 1000).then((customersurname) => {
            customersurname.isDisplayed().then((val) => {
                if (val) {
                    customersurname.getAttribute('value').then((attr) => {
                        if (attr === '') {
                            customersurname.sendKeys('Γανώσης');
                        }
                    });
                }
            });
        }).catch((e) => { /*console.log('Can`t find customersurname input field \n' + e );*/ });

        OrderInfo.findElement(By.css('input#doorbellname')).then((doorbell) => {
            doorbell.getAttribute('value').then((val) => {
                if (val === '') {
                    doorbell.sendKeys('Δοκιμαστική111');
                }
            });
        }).catch((e) => { /*console.log('Can`t find doorbell input field \n' + e );*/ });

        OrderInfo.findElement(By.css('input#floor')).then((floor) => {
            floor.getAttribute('value').then((val) => {
                if (val === '') {
                    floor.sendKeys('Δοκιμαστική');
                }
            });
        }).catch((e) => { console.log('Can`t find floor input field \n' + e); });

        return OrderInfo.findElement(By.css('input#cellphone')).then((cellphone) => {
            return cellphone.isDisplayed('value').then((val) => {
                if (val) {
                    cellphone.getAttribute('value').then((attr) => {
                        if (attr === '') {
                            cellphone.sendKeys('6981000000');
                        }
                    });
                    return 'need_validation';
                }
            });
        }).catch((e) => { console.log('Can`t find cellphone input field \n' + e); });
    }).catch((e) => { console.log('Can`t find Order Info form \n' + e); });
}


function SelectPaymentMethod(driver, option) {
    if (option === 'cash') {
        driver.findElement(By.css('input#cash')).then((cash) => {
            cash.isSelected().then((val) => {
                if (!val) {
                    cash.click();
                }
            });
        }).catch((e) => { console.log('Can`t find Cash Option \n' + e); });
    }
    else if (option === 'credit') {
        driver.findElement(By.css('input#creditcard')).then((credit) => {
            credit.isSelected().then((val) => {
                if (!val) {
                    credit.click();
                }
            });
        }).catch((e) => { console.log('Can`t find Credit Option \n' + e); });
    }
    else if (option === 'paypal') {
        driver.findElement(By.css('input#paypal')).then((paypal) => {
            paypal.isSelected().then((val) => {
                if (!val) {
                    paypal.click();
                }
            });
        });
    }
}

exports.AddCoupon = function(driver) {
    driver.wait(until.elementLocated(By.css('div.order-content-wrapper')), 300).then((info) => {
        info.findElement(By.id('coupon_code')).then((coupon) => {
            coupon.sendKeys('kgan');

            driver.wait(until.elementLocated(By.id('coupon_error')), 3000).then((coupon_message) => {
                driver.wait(until.elementIsVisible(coupon_message), 3000).then((coupon_message) => {
                    coupon_message.getAttribute('innerHTML').then((msg) => {
                        console.log(msg);
                        if (msg === 'Το κουπόνι είναι έγκυρο') {
                            console.log('Valid Coupon\n');

                            driver.findElement(By.id('coupon_discount')).isDisplayed().then((val) => {
                                if (val)
                                    console.log('Right Message Appear in Cart \n');
                            }).catch((e) => { console.log('Coupon Message in Cart didnt appear \n' + e); });
                        }
                        else
                            console.log('Invalid Coupon or something went wrong \n');
                    });
                });
            }).catch((e) => { console.log('Coupon Message didnt appear \n' + e); });
        }).catch((e) => { console.log('Can`t find Coupon Field \n' + e); });
    });
}

exports.SubmitOrder = (driver, sms_pass) => {
    return driver.wait(until.urlContains('/orders/form?shop_id=968814'), 5000).then(() => {
        opt = ValidateOrderInfo(driver);
        SelectPaymentMethod(driver, 'cash');
        return driver.findElements(By.css('div.cart-items')).then((cart_items) => {
            if (cart_items.length > 0) {
                driver.wait(until.elementLocated(By.css('fieldset.submit-set')), 1500).then((submit) => {
                    driver.executeAsyncScript("var callback = arguments[arguments.length - 1]; arguments[0].scrollIntoView(top); callback();", submit).then(() => {
                        submit.findElement(By.id('sendorder')).click();
                        
                        opt.then((opt) => {
                            if (opt === 'need_validation') {
                                smsVerification.phoneValidation(driver, sms_pass);
                            }
                        });
                    });
                    
                }).catch((e) => { console.log('Driver Cant Find SendOrder Button \n' + e); });

                return driver.wait(until.elementLocated(By.id('confirmationpopup')), 3000).then((confirm_popup) => {
                    driver.wait(until.elementIsVisible(confirm_popup), 3000);
                    driver.wait(until.elementIsVisible(confirm_popup.findElement(By.css('section.modal-text'))), 15000);
                    return 'Completed';
                });
            }
        }).catch((e) => { console.log('Driver Cant find Cart Items \n' + e); });
    }).catch((e) => { console.log('Current Page isnt Checkout. Something went wrong! \n' + e); });
}