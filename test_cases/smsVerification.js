let {By,until} = require('selenium-webdriver');
let message = 'Η επιβεβαίωση θα χρειαστεί μόνο 1 φορά';
let er_mssg = 'Ο κωδικός σου δεν είναι σωστός, δοκίμασε πάλι.';
let resent_msg = 'Ο κωδικός εστάλη.';

exports.phoneValidation = (driver, sms_pass) => {
    driver.wait(until.elementLocated(By.id('popup_sms_prompt'), 2000)).then((sms_prompt) => {
        sms_prompt.findElement(By.id('phoneConfirmationSuccess')).getText().then((text) => {
            if(text === message){
                sms_prompt.findElement(By.id('cellpass')).sendKeys(sms_pass);
                sms_prompt.findElement(By.id('phoneConfirmationBtn')).click();

                sms_prompt.isDisplayed().then((val) => {
                    if(val){
                        sms_prompt.findElement(By.id('phoneConfirmationError')).then((error_msg) => {
                            driver.wait(until.elementIsVisible(error_msg), 1000).then((val) => {
                                if(val){
                                    error_msg.getText().then((msg) => {
                                        if(msg === er_mssg){
                                            console.log('Wrong sms_pass or Empty \n');
                                            return;
                                        }
                                        else{
                                            console.log('Messages arent the same \n ' + msg);
                                        }
                                    });
                                }
                            });
                        }).catch((e) => { console.log('Cannot Find Error Message in Modal \n' + e); });
                    }
                }).catch(() => {}); //Do nothing. Needed for not boom test when modal disappear and element Not Exist in DOM.
            }
        }).catch((e) => { console.log('Cannot Find Success Message in Modal \n' + e); });
    }).catch((e) => { console.log('Cannot Find SMS Verification Modal \n' + e); });
}


exports.SMSResent = (driver) => {
    driver.wait(until.elementLocated(By.id('popup_sms_prompt'), 2000)).then((sms_prompt) => {
        sms_prompt.findElement(By.id('newsms')).click();

        sms_prompt.findElement(By.id('phoneConfirmationResent')).getText().then((text) => {
            if(resent_msg === text){
                return 'resent';
            }
        });
    });
}

exports.ChangePhone = (driver, cellphone) => {
    driver.wait(until.elementLocated(By.id('popup_sms_prompt'), 2000)).then((sms_prompt) => {
        sms_prompt.findElement(By.id('newphone')).click();

        driver.wait(until.elementLocated(By.id('setcellphone')), 2000).then((new_modal) => {
            new_modal.findElement(By.id('newnumber')).sendKeys(cellphone);
            new_modal.findElement(By.id('setNumberBtn')).click();
        });
    });
}