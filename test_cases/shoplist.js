let {By,until} = require('selenium-webdriver');
let shops, count, shops_count;

exports.GetShopList = (driver) => { 
	return driver.getCurrentUrl().then((current_url) => {
		if((current_url.indexOf('/shops?user_address=') !== -1) || (current_url.indexOf('/shops?address=') !== -1)){
			shops = driver.findElement(By.className('shop-items'));
			count = driver.findElement(By.css('span.number')).getText();
			
			let countToInt = Promise.resolve(count).then((count) => {return parseInt(count);});

			if(countToInt !== 0){
				shops.findElement(By.css('a[href*="/blue-shark"')).click();
			}
		}
		else{
			console.log('Wrong URL');
			return false;
		}
	}).catch((e) => {
		console.log(e);
		return false;
	});
};


