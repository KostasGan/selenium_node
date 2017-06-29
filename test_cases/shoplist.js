let {By,until} = require('selenium-webdriver');
let shops, count, shops_count;

exports.GetShopList = (driver) => { 
	return driver.getCurrentUrl().then((current_url) => {
		if((current_url.indexOf('/shops?user_address=') !== -1) || (current_url.indexOf('/shops?address=') !== -1)){
			shops = driver.findElement(By.className('shop-items'));
			ShopCount = driver.findElement(By.css('span.number'));

			ShopCount.getText().then((count)=> {
				if((parseInt(count)) > 0){
					shops.findElement(By.css('a[href*="/blue-shark"')).click();
				}
				else{
					console.log('No Restaurant at this time');
					return false;
				}
			});
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


