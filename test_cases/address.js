let {By,until} = require('selenium-webdriver');
let address_field;

exports.AddAddressAnonymous = (driver) => {
<<<<<<< HEAD
	address_field = driver.findElement(By.css('div.geosuggest > div > input'));

	return driver.wait(until.elementIsVisible(address_field), 5000).then(() => {
		address_field.sendKeys('Λεωφόρος ηρακλείου 409 Ηράκλειο');
		return driver.wait(until.elementLocated(By.css('li.geosuggest-item.geosuggest-item')),5000).then(() => { 
			driver.findElement(By.css('li.geosuggest-item.geosuggest-item')).click();

			return driver.wait(until.elementLocated(By.css('form.address')),5000).then(() => {
				let confirm_btn = driver.findElement(By.id('submit_btn'));
				confirm_btn.click();
=======
	return driver.wait(until.elementLocated(By.css('div.geosuggest > div > input')), 3000)
	.then((address_field) => {
		address_field.sendKeys('Αριστείδου 1 Μαρούσι');
		return driver.wait(until.elementLocated(By.css('li.geosuggest-item.geosuggest-item')),2000)
		.then((suggest) => { 
			suggest.click()
			return driver.wait(until.elementLocated(By.css('form.address')),3000)
			.then((formAddress) => {
				formAddress.findElement(By.id('submit_btn')).click();
>>>>>>> master
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

