let { By, until } = require('selenium-webdriver');

let message = 'Σε ευχαριστούμε πολύ για την αξιολόγησή σου!';
let numOfQuality, numOfDT, numOfService, mean;
let ordersLength;

function SelectStars(driver, numOfQuality, numOfDT, numOfService) {
    driver.sleep(300);
    return driver.wait(until.elementLocated(By.id('popup_rate_restaurant')), 1000).then((modal) => {
        if (numOfQuality >= 1 && numOfDT >= 1 && numOfService >= 1) {
            modal.findElements(By.css('div#quality > span')).then((qualityStars) => {
                qualityStars[5 - numOfQuality].click();
            }).catch((e) => { console.log('Cannot Find Quality Stars Section ' + e); });

            modal.findElements(By.css('div#deliveryTime > span')).then((deliveryTimeStars) => {
                deliveryTimeStars[5 - numOfDT].click();
            }).catch((e) => { console.log('Cannot Find DeliveryTime Stars Section ' + e); });

            modal.findElements(By.css('div#service > span')).then((serviceStars) => {
                serviceStars[5 - numOfService].click();
            }).catch((e) => { console.log('Cannot Find Service Stars Section ' + e); });
        }
        else {
            console.log('Number of start should be 1-5. Try again');
            return "Failed";
        }
    }).catch((e) => { 
        console.log('Cannot Find Review Modal ' + e);
        return 'Failed';
    });
}

function TextAreaChecks(driver, mean) {
    return driver.wait(until.elementIsVisible(driver.findElement(By.css('textarea'))), 1000).then((textfield) => {
        if (mean <= 2.33) {
            driver.findElement(By.id('rate-order')).click();

            driver.findElement(By.css('textarea')).getAttribute('class').then((attribute) => {
                if (attribute === 'error') {
                    textfield.sendKeys('skata');
                    driver.findElement(By.id('rate-order')).click();
                }
                else {
                    console.log('TextArea`s Error doesn`t Appear \n');
                    return 'Failed';
                }
            }).catch((e) => { console.log('Cannot Get Textfield Class ' + e); });
        }
        else if (mean > 2.33) {
            driver.wait(until.elementIsVisible(driver.findElement(By.css('ul.preped-comment-list > li'))), 1000).then((prefinedComments) => {
                driver.sleep(200);
                prefinedComments.click();

                driver.sleep(200);
                driver.findElement(By.css('textarea')).then((textArea) => {
                    textArea.getAttribute('value').then((text) => {
                        if (text !== '') {
                            driver.findElement(By.id('rate-order')).click();
                        }
                        else {
                            console.log('Text is Empty. Something went wrong\n');
                            return 'Failed';
                        }
                    });
                }).catch((e) => { console.log('Cannot Get Textfield Text ' + e); });
            }).catch((e) => { console.log('Cannot Find Predefined Answer ' + e); });
        }
        else {
            console.log('Mean isnt right number. \n');
            return 'Failed';
        }
    }).catch((e) => { 
        console.log('Cannot Find Rating`s TextField ' + e); 
        return 'Failed';
    });
}


exports.AddTwoStarsRating = (driver) => {
    numOfQuality = 2, numOfDT = 2, numOfService = 3;
    mean = (numOfQuality + numOfDT + numOfService) / 3 >= 0 ? Number(((numOfQuality + numOfDT + numOfService) / 3).toFixed(2)) : null;

    driver.findElement(By.css('a.rate-restaurant')).click();

    SelectStars(driver, numOfQuality, numOfDT, numOfService);
    TextAreaChecks(driver, mean);

    return driver.wait(until.elementLocated(By.id('popup_rate_restaurant')), 1000).then((thankYouModal) => {
        return thankYouModal.findElement(By.css('div.order-review-thank-you-copy > h2')).getText().then((msg) => {
            if (msg === message) {
                thankYouModal.findElement(By.id('order-review-thank-you-close')).click();
                return "Completed";
            }
        }).catch((e) => { 
            console.log('Cannot Get the Text From Modal ' + e);
            return 'Failed';
        });
    }).catch((e) => {
         console.log('Cannot Find ThankYou Modal For Ratings ' + e);
         return 'Failed';
    });
};


exports.AddFiveStarsRating = (driver) => {
    numOfQuality = 5, numOfDT = 5, numOfService = 5;
    mean = (numOfQuality + numOfDT + numOfService) / 3 >= 0 ? Number(((numOfQuality + numOfDT + numOfService) / 3).toFixed(2)) : null;

    driver.findElement(By.css('a.rate-restaurant')).click();

    SelectStars(driver, numOfQuality, numOfDT, numOfService);
    TextAreaChecks(driver, mean);

    return driver.wait(until.elementLocated(By.id('popup_rate_restaurant')), 1000).then((thankYouModal) => {
        return thankYouModal.findElement(By.css('div.order-review-thank-you-copy > h2')).getText().then((msg) => {
            if (msg === message) {
                thankYouModal.findElement(By.id('order-review-thank-you-close')).click();
                return "Completed";
            }
        }).catch((e) => {
            console.log('Cannot Get the Text From Modal ' + e);
            return 'Failed';
        });
    }).catch((e) => {
        console.log('Cannot Find ThankYou Modal For Ratings ' + e);
        return 'Failed';
    });
};


exports.ViewMoreOrders = (driver) => {
    return driver.wait(until.elementLocated(By.css('table.table.user-orders')), 1000).then((ordersTable) => {
        return ordersTable.findElements(By.css('tbody > tr')).then((orders) => {
            ordersLength = orders.length;
            driver.wait(until.elementIsVisible(driver.findElement(By.css('div.button-fetch-orders-container > button'))), 1000).then((button) => {
                button.click();
            })
            driver.sleep(1200);
            return driver.findElements(By.css('tbody > tr.user-order')).then((newOrders) => {
                ordersLength = ordersLength + 50;
                if (ordersLength === newOrders.length) {
                    console.log('Completed');
                    return 'Completed';
                }
                else {
                    console.log(ordersLength + '!==' + newOrders.length);
                    return 'Failed';
                }
            }).catch((e) => { 
                console.log('Cannot Find New UserOrders ' + e);
                return 'Failed';
            });
        }).catch((e) => { 
            console.log('Cannot Find First Appeared Orders ' + e); 
            return 'Failed';
        });
    }).catch((e) => { 
        console.log('Cannot Find Order`s Table ' + e); 
        return 'Failed';
    });
}