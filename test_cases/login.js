let {By,until} = require('selenium-webdriver');
let login;

exports.Login = (driver,creds) => {
	login = driver.findElement(By.css('div.col-md-3.col-sm-4 > #header-login'));
	login.click();
	driver.wait(until.elementLocated(By.id('popup_login')), 1000);
	driver.findElement(By.id('email')).sendKeys(creds.email);
	driver.findElement(By.id('pass')).sendKeys(creds.pass);

	return driver.findElement(By.id('login_btn')).click()
	.then(() => {	
		return driver.wait(until.elementLocated(By.id('userlink')), 3000)
		.then(()=>{
			let logged_name = driver.findElement(By.id('userlink'));
			driver.wait(until.elementIsVisible(logged_name), 1000);
			return 'true';
		})
		.catch((e)=>{
			console.log('Something bad happen ' + e);
			return 'false';
		});
	});
};

exports.LoginWithEmptyFields = (driver) => {
	console.log ('Login Test With Empty Email/Pass Fields begin:');
	
	login = driver.findElement(By.css('div.col-md-3.col-sm-4 > #header-login'));

	login.click();

	driver.wait(until.elementLocated(By.id('popup_login')), 1000);

	driver.findElement(By.id('email')).sendKeys('');
	driver.findElement(By.id('pass')).sendKeys('');
	driver.findElement(By.id('login_btn')).click()
	.then(() => {
		return driver.wait(until.elementLocated(By.className('required')), 2000)
		.then(() => {
			let empty_error = driver.findElement(By.className('required'));

			driver.wait(until.elementIsVisible(empty_error), 1000);

			return empty_error.getAttribute('innerHTML')
			.then((message) => {
				if(message === 'Δεν έχεις συμπληρώσει όλα τα πεδία') 
					return 'Completed';
				else 
					return 'Failed';
			});
		})
		.catch((e)=>{
			console.log('Something bad happen ' + e.message);
			return 'Failed';
		});
	})
	.then((message)=>{
		console.log('Login Test With Empty Email/Pass Fields -> Status: ' + message);	
	});
};

exports.LoginWithWrongCreds = (driver) => {
	console.log ('Login Test With Wrong Creds begin:');
	
	login = driver.findElement(By.css('div.col-md-3.col-sm-4 > #header-login'));

	login.click();

	driver.wait(until.elementLocated(By.id('popup_login')), 1000);

	driver.findElement(By.id('email')).sendKeys('kostas.efood-@gmail.com');
	driver.findElement(By.id('pass')).sendKeys('kostasefood');
	driver.findElement(By.id('login_btn')).click()
	.then(() => {
		return driver.wait(until.elementLocated(By.className('required')), 2000)
		.then(() => {
			let empty_error = driver.findElement(By.className('required'));

			driver.wait(until.elementIsVisible(empty_error), 1000);

			return empty_error.getAttribute('innerHTML').then((message) => {
				if(message === 'Τα στοιχεία δεν είναι σωστά') 
					return 'Completed';
				else 
					return 'Failed';
			});
		})
		.catch((e)=>{
			console.log('Something bad happen ' + e.message);
			return 'Failed';
		});
	}).then((message)=>{
		console.log('Login Test With Wrong Creds -> Status: ' + message);	
	});
};