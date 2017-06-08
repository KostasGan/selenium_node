const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
    
exports.Logout = (driver) =>{
	driver.wait(until.elementLocated(By.id('userlink')), 3000).then(()=>{
		let logged_name = driver.findElement(By.id('userlink'));
		driver.wait(until.elementIsVisible(logged_name), 1000);
		logged_name.click().then(() => {
			let logout = driver.findElement(By.css('#user-options > li.user-options-list-item.user-options-list-item-logout > a.efood-data-layer'));
			driver.wait(until.elementLocated(By.css('#user-options > li.user-options-list-item.user-options-list-item-logout > a.efood-data-layer')),2000).then((logout)=>{
				driver.wait(until.elementIsVisible(logout),1000);
				logout.click();
				console.log('User Logged out Successfully');
			});
		});
	}).catch((e) => {
		console.log('No logged in user \n' + e);
	});
}