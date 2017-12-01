let { By, until } = require('selenium-webdriver');
    
exports.Logout = (driver) =>{
	return driver.wait(until.elementLocated(By.id('userlink')), 3000).then(()=>{
		let logged_name = driver.findElement(By.id('userlink'));
		driver.wait(until.elementIsVisible(logged_name), 1000);
		return logged_name.click().then(() => {
			let logout = driver.findElement(By.css('#user-options > li.user-options-list-item.user-options-list-item-logout > a.efood-data-layer'));
			return driver.wait(until.elementLocated(By.css('#user-options > li.user-options-list-item.user-options-list-item-logout > a.efood-data-layer')),2000).then((logout)=>{
				driver.wait(until.elementIsVisible(logout),1000);
				logout.click();
				console.log('User Logged out Successfully');
				return 'Complete';
			});
		});
	}).catch((e) => {
		console.log('No logged in user \n' + e);
		return 'Failed';
	});
}