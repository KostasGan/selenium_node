let { By, until } = require('selenium-webdriver');

exports.Logout = (driver) => {
	return driver.wait(until.elementLocated(By.css('div.header-user a.header-user-link')), 3000).then((logged_name) => {
		// driver.wait(until.elementIsVisible(logged_name), 1000);
		logged_name.click();
		driver.wait(until.elementLocated(By.css('li.user-options-list-item-logout')), 2000).then((logout) => {
			logout.click();
		});
		return driver.wait(until.elementLocated(By.css('a.user-login')), 1000).then((button) => {
			return 'Completed';
		});
	}).catch((e) => {
		console.log('No logged in user \n' + e);
		return 'Failed';
	});
}