let { By, until } = require('selenium-webdriver');
let message = 'Παράγγειλε τώρα τον καφέ σου από τα Coffee Lab και θα σε κεράσουν άλλον έναν, μαζί με μια σοκολάτα γαλάκτος Milk Noir από τη Lacta!';


function UrlCheck(driver) {
	return driver.getCurrentUrl().then((current_url) => {
		if ((current_url.indexOf('/delivery') !== -1) || (current_url.indexOf('/shops?address') !== -1)) {
			return true;
		}
	}).catch((e) => { return false; });
}

exports.NotificationExistance = (driver) => {
    return driver.wait(until.elementLocated(By.css('li.promo-message')), 1500).then((notification) => {
        driver.wait(until.elementIsVisible(notification), 1000);

        let img = notification.findElement(By.css('div.promo-message-image > img'));
        let text = notification.findElement(By.css('div.promo-message-text'));

        driver.wait(until.elementIsVisible(img), 1000);
        return driver.wait(until.elementIsVisible(text), 1000).then(() => {
            return text.getText().then((msg) => {
                if(message === msg){
                    return 'Completed';
                }
                else{
                    console.log(message);
                    console.log(msg);
                    return 'Failed';
                }
            });
        });
    }).catch((e) => {
        return 'Failed';
    });
}

exports.NotificationEligible = (driver) => {
    return driver.wait(UrlCheck).then((val) => {
        if(val){
            return driver.wait(until.elementLocated(By.id('shops')), 1000).then((shopList) => {
                return shopList.findElements(By.css('a.button[href*="/coffee-lab"]')).then((shops) => {
                    if(shops.length > 0){
                        return 'Eligible';
                    }
                    else{
                        return 'NotEligible';
                    }
                });
            });
        }
        else{
            return 'NotEligible';
        }
    });
}

exports.CloseNotification = (driver) => {
    return driver.wait(until.elementLocated(By.css('li.promo-message')), 2000).then((notification) => {
        driver.wait(until.elementIsVisible(notification), 1500);

        return notification.findElement(By.css('button.promo-message-close')).click().then(() => {
            driver.wait(until.stalenessOf(notification), 1000);
            return 'Completed';
        });
    }).catch((e) => {
        console.log('Cannot Find the notification\n' + e);
        return 'Failed';
    });
}

exports.ClickNotificationToShop = (driver) => {
    return driver.wait(until.elementLocated(By.css('li.promo-message')), 1500).then((notification) => {
        driver.wait(until.elementIsVisible(notification), 1000);

        notification.click();

        return driver.wait(until.urlContains('/'), 1500).then(() => { return 'Completed'});
    }).catch((e) => {
        console.log('Cannot Find the notification\n' + e);
        return 'Failed';
    });
}