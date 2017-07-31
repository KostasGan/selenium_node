let {By,until} = require('selenium-webdriver');

exports.AddAddressAnonymous = (driver) => {
	return driver.wait(until.elementLocated(By.css('div.geosuggest > div > input')), 3000)
	.then((address_field) => {
		address_field.sendKeys('Αριστείδου 1 Μαρούσι');
		return driver.wait(until.elementLocated(By.css('li.geosuggest-item.geosuggest-item')),2000)
		.then((suggest) => { 
			suggest.click()
			return driver.wait(until.elementLocated(By.css('form.address')),3000)
			.then((formAddress) => {
				formAddress.findElement(By.id('submit_btn')).click();
				return true;
			}).catch((e) => {
				console.log('No Map Confirmation Popup' + e);
				return false;
			});
		}).catch((e) => {
			return false;
		});
	}).catch((e) => {
		console.log('No element visible' + e)
		return false;
	});
}

