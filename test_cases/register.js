let {By,until} = require('selenium-webdriver'),

exports.Register = (driver) => {
	let login = driver.findElement(By.css('div.col-md-3.col-sm-4 > #header-login'));

	driver.wait(until.elementIsVisible(login), 1000).catch((e) => { console.log('Test Failed: You are already logged in')});
	login.click();
	driver.wait(until.elementLocated(By.id('popup_login')), 1000);

	let register = driver.findElement(By.linkText('Δημιουργία Λογαριασμού')).click();

	driver.wait(until.elementLocated(By.id('popup_register')), 1000);
	driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 1000);

	driver.findElement(By.id('email')).sendKeys(''); //Need to add valid email
	driver.findElement(By.id('pass')).sendKeys(''); //Need to add valid pass
	driver.findElement(By.id('pass-repeat')).sendKeys(''); //Need to add repass.

	driver.findElement(By.id('create_btn')).click()
	.then(() => {
		return driver.wait(until.elementLocated(By.id('userlink')), 2000)
		.then(()=>{
			let logged_name = driver.findElement(By.id('userlink'));
			driver.wait(until.elementIsVisible(logged_name), 1000);
			return 'Completed';
		})
		.catch((e)=>{
			console.log('Something bad happen ' + e);
			return 'Failed';
		});
	})
	.then((message)=>{
		console.log('Register Test Status: ' + message);	
	});
}

