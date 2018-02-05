let { By, until } = require('selenium-webdriver');
let shops, count, shops_count;

function UrlCheck(driver) {
	return driver.getCurrentUrl().then((current_url) => {
		if ((current_url.indexOf('/shops?user_address=') !== -1) || (current_url.indexOf('/shops?address=') !== -1)) {
			return true;
		}
	}).catch((e) => { return false; });
}


exports.GetShopList = (driver) => {
	return driver.wait(UrlCheck(driver), 5000).then((urlCheckVal) => {
		if (urlCheckVal) {
			shops = driver.findElement(By.className('shop-items'));
			ShopCount = driver.findElement(By.css('span.number'));

			return ShopCount.getText().then((count) => {
				if ((parseInt(count)) > 0) {
					return driver.wait(until.elementIsVisible(shops.findElement(By.css('a[href*="/blue-shark"'))), 5000).then((blue_shark) => {
						blue_shark.click();
						return 'Completed';
					});
				}
				else {
					console.log('No Restaurant at this time');
					return 'Failed';
				}
			});
		}
		else {
			console.log('Wrong URL');
			return 'Failed';
		}
	}).catch((e) => {
		console.log(e);
		return 'Failed';
	});
};


