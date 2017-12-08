let { By, until } = require('selenium-webdriver');

exports.AddAddressAnonymous = (driver) => {
	return driver.wait(until.elementLocated(By.css('div.geosuggest > div > input')), 3000)
		.then((address_field) => {
			address_field.sendKeys('Λεωφόρος Ηρακλείου 409 Ηράκλειο');
			return driver.wait(until.elementLocated(By.css('li.geosuggest-item.geosuggest-item')), 2000)
				.then((suggest) => {
					suggest.click()
					return driver.wait(until.elementLocated(By.css('form.address')), 5000)
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
			console.log('No element visible' + e);
			return false;
		});
}

exports.SelectAddress = ((driver) => {
	return driver.wait(until.elementLocated(By.id('search-form-component')), 3000).then((address_box) => {
		return address_box.findElement(By.css('div.Select-value > span')).then((address) => {
			return address.getText().then((text) => {
				if (text === 'Λεωφόρος Ηρακλείου 409, Αθήνα, Ηράκλειο, 14122') {
					address_box.findElement(By.css('button.button-primary')).click();
				}
				else {
					address_box.findElement(By.css('div.Select-input > input')).sendKeys('409');
					driver.sleep(500);
					return driver.wait(until.elementsLocated(By.css('div.Select-menu-outer > div > div')), 3000).then((user_addresses) => {
						if (user_addresses.length > 0) {
							return user_addresses[0].getText().then((address_text) => {
								if (address_text === 'Λεωφόρος Ηρακλείου 409, Αθήνα, Ηράκλειο, 14122') {
									user_addresses[0].click();
									//address_box.findElement(By.css('button.button-primary')).click();
									return 'Completed';
								}
								else {
									console.log('No available User Address \n');
									return 'Failed';
								}
							});
						}
						else {
							console.log('Cannot find address with the search key \n');
							return 'Failed';
						}
					}).catch((e) => {
						console.log('Cannot locate the `Select-menu-outer` \n' + e);
						return 'Failed';
					});
				}
			}).catch((e) => {
				console.log('Function Fail to getText from Address \n' + e);
				return 'Failed';
			});
		}).catch((e) => {
			console.log('Cannot Find User Selected Address \n' + e);
			return 'Failed';
		});
	}).catch((e) => {
		console.log('Cannot Find AddressBox \n' + e);
		return 'Failed';
	});
});