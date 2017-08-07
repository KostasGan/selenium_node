let {By,until} = require('selenium-webdriver');

function ValidateOrderInfo(driver) {
    driver.findElement(By.css('div.order-content-wrapper')).then((OrderInfo) => {
        OrderInfo.findElement(By.css('input#customername')).then((customername) => {
            customername.isDisplayed('value').then((val) => {
                if(val){
                    customername.getAttribute('value').then((attr) => {
                        if(attr === ''){
                            customername.sendKeys('Κώστας');
                        }
                    });
                }
            });
        }).catch((e) => { console.log('Can`t find customername input field \n' + e ); });

        OrderInfo.findElement(By.css('input#customersurname')).then((customersurname) => {
            customersurname.isDisplayed('value').then((val) => {
                if(val){
                    customersurname.getAttribute('value').then((attr) => {
                        if(attr === ''){
                            customersurname.sendKeys('Γανώσης');
                        }
                    });
                }
            });
        }).catch((e) => { console.log('Can`t find customersurname input field \n' + e ); });

        OrderInfo.findElement(By.css('input#doorbellname')).then((doorbell) => {
            doorbell.getAttribute('value').then((val) => {
                console.log(val);
                if(val === ''){
                    doorbell.sendKeys('Δοκιμαστική111');
                }
            });
        }).catch((e) => { console.log('Can`t find doorbell input field \n' + e ); });

        OrderInfo.findElement(By.css('input#floor')).then((floor) => {
            floor.getAttribute('value').then((val) => {
                if(val === ''){
                    floor.sendKeys('Δοκιμαστική');
                }
            });
        }).catch((e) => { console.log('Can`t find floor input field \n' + e ); });

        OrderInfo.findElement(By.css('input#cellphone')).then((cellphone) => {
            cellphone.isDisplayed('value').then((val) => {
                if(val){
                    cellphone.getAttribute('value').then((attr) => {
                        if(attr === ''){
                            cellphone.sendKeys('6981000000');
                        }
                    });
                }
            });
        }).catch((e) => { console.log('Can`t find cellphone input field \n' + e ); });
    }).catch((e) => { console.log('Can`t find Order Info form \n' + e ); });
}


function SelectPaymentMethod(driver, option){
    if(option === 'cash'){
        driver.findElement(By.css('input#cash')).then((cash) => {
            cash.isSelected().then((val)=>{
                if(!val){
                    cash.click();
                }
            });
        }).catch((e) => { console.log('Can`t find Cash Option \n' + e); });
    }
    else if(option === 'credit'){
        driver.findElement(By.css('input#creditcard')).then((credit) => {
            credit.isSelected().then((val)=>{
                if(!val){
                    credit.click();
                }
            });
        }).catch((e) => { console.log('Can`t find Credit Option \n' + e); });
    }
    else if(option === 'paypal'){
        driver.findElement(By.css('input#paypal')).then((paypal) => {
            paypal.isSelected().then((val)=>{
                if(!val){
                    paypal.click();
                }
            });
        });
    }
}

function AddCoupon(driver) {
    driver.wait(until.elementLocated(By.css('div.order-content-wrapper')),300).then((info) => {
        info.findElement(By.id('coupon_code')).then((coupon) => {
            coupon.sendKeys('kgan');

            driver.wait(until.elementLocated(By.id('coupon_error')), 3000).then((coupon_message) => {
                driver.wait(until.elementIsVisible(coupon_message), 3000).then((coupon_message) => {
                    coupon_message.getAttribute('innerHTML').then((msg) => {
                        console.log(msg);
                        if(msg === 'Το κουπόνι είναι έγκυρο'){
                            console.log('Valid Coupon\n');

                            driver.findElement(By.id('coupon_discount')).isDisplayed().then((val) => {
                                if(val)
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

exports.SubmitOrder = (driver) => {
    driver.wait(until.urlContains('/orders/form?shop_id=968814'), 3000).then(() => {
        ValidateOrderInfo(driver);
        AddCoupon(driver);
        SelectPaymentMethod(driver,'cash');
        driver.findElement(By.css('input#sendorder')).click();
    }).catch((e) => { console.log('Current Page isnt Checkout. Something went wrong! \n' + e); });
}