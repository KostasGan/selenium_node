let {By,until} = require('selenium-webdriver');


exports.AddAddressAnonymous = (driver) => {
	let address_field = driver.findElement(By.css('input.geosuggest__input'));

	return driver.wait(until.elementIsVisible(address_field), 5000)
	.then(() => {
		address_field.sendKeys('Λεωφόρος ηρακλείου 409 Ηράκλειο');
		return driver.wait(until.elementLocated(By.css('li.geosuggest-item.geosuggest-item')),5000)
		.then(() => { 
			let suggest = driver.findElement(By.css('li.geosuggest-item.geosuggest-item'));
			suggest.click()
			return driver.wait(until.elementLocated(By.css('form.address')),5000)
			.then(() => {
				let confirm_btn = driver.findElement(By.id('submit_btn'));
				confirm_btn.click();
				return true;
			})
			.catch((e) => {
				console.log('No Map Confirmation Popup' + e);
				return false;
			});
		})
		.catch((e) => {
			return false;
		});
	})
	.catch((e) => {
		console.log('No element visible' + e)
		return false;
	});
};

