let { By, until } = require('selenium-webdriver');
const assert = require('assert');


exports.UpdateUserInfo = (driver) => {
    return driver.wait(until.elementLocated(By.css('section.user-content.user-box')), 1000).then((user_box) => {
        user_box.findElement(By.id('firstname')).then((name) => {
            name.clear();
            name.sendKeys('Κώστας');
        });

        user_box.findElement(By.id('lastname')).then((name) => {
            name.clear();
            name.sendKeys('Γανώσης');
        });

        return user_box.findElement(By.css('input.button')).click().then(() => {
            return driver.wait(until.elementLocated(By.css('aside.col-md-5 > div.alert')), 1000).then((message) => {
                return message.getText().then((text) => {
                    if (text === 'Τα στοιχεία σου άλλαξαν επιτυχώς.') {
                        console.log('Completed');
                        return 'Completed';
                    }
                    else if (text === 'Το Όνομα είναι υποχρεωτικό.') {
                        console.log('Complete... But Name is Empty');
                        return 'Completed';
                    }
                    else if (text === 'Το Επίθετο είναι υποχρεωτικό.') {
                        console.log('Complete... But LastName is Empty');
                        return 'Completed';
                    }
                    else {
                        console.log('Failed');
                        return 'Failed';
                    }
                }).catch((e) => { console.log('Cannot Get The Alert Text \n' + e); });
            }).catch((e) => { console.log('Cannot Locate The Alert \n' + e); });
        }).catch((e) => { console.log('Cannot Click the Submit button \n' + e); });
    }).catch((e) => { console.log('Cannot Find UserBox \n' + e); });
}

exports.UpdateUserEmail = (driver, creds) => {
    return driver.wait(until.elementLocated(By.css('section.user-content.user-box')), 1000).then((user_box) => {
        user_box.findElement(By.id('email_change')).click().then(() => {
            driver.wait(until.elementIsVisible(user_box.findElement(By.css('div.alert.alert-error'))),1000).then(() => {
                user_box.findElement(By.css('div#customeremail > input')).then((email_input) => {
                    email_input.clear();
                    email_input.sendKeys('kostasgan@gmail.com');
                }).catch((e) => { console.log('Cannot Find Email Input \n' + e); });
            }).catch((e) => { console.log('Cannot Find Alert After click to change email \n' + e); });
        }).catch((e) => { console.log('Cannot Find Change_Email Button \n' + e); });

        user_box.findElement(By.id('current_password')).sendKeys(creds.pass);

        return user_box.findElement(By.css('input.button')).click().then(() => {
            return driver.wait(until.elementLocated(By.css('aside.col-md-5 > div.alert')), 2000).then((message) => {
                return message.getText().then((text) => {
                    if (text === 'Τα στοιχεία σου άλλαξαν επιτυχώς.') {
                        console.log('Completed');
                        return 'Completed';
                    }
                    else if (text === 'To Email που βάλατε υπάρχει ήδη.') {
                        console.log('Complete... But Email Exists');
                        return 'Completed';
                    }
                    else if (text === 'Πρέπει να συμπληρώσετε τον τρέχοντα κωδικό.') {
                        console.log('Complete... But Current Pass is Empty');
                        return 'Completed';
                    }
                    else {
                        console.log('Failed');
                        return 'Failed';
                    }
                }).catch((e) => { console.log('Cannot Get The Alert Text \n' + e); });
            }).catch((e) => {
                return driver.wait(until.elementLocated(By.css('div.content-403 > h1')), 2000).then((message) => {
                    return message.getText().then((text) => {
                        if (text === 'Δεν έχεις πρόσβαση στη σελίδα') {
                            console.log('Completed');
                            return 'Completed';
                        }
                        else {
                            console.log('Failed');
                            return 'Failed';
                        }
                    });
                }).catch((e) => { console.log('Cannot Get The 403 Error \n' + e); });;
            });
        }).catch((e) => { console.log('Cannot Click the Submit button \n' + e); });;
    }).catch((e) => { console.log('Cannot Find UserBox \n' + e); });
}