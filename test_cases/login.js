let {By,until} = require('selenium-webdriver');
//
//
// Functionality for Login.
function LoginModalFuncs(driver,creds) {
	driver.findElement(By.id('email')).sendKeys(creds.email);
	driver.findElement(By.id('pass')).sendKeys(creds.pass);

	return driver.findElement(By.id('login_btn')).click().then(() => {	
		return driver.wait(until.elementLocated(By.id('userlink')), 3000).then((logged_name)=>{
			driver.wait(until.elementIsVisible(logged_name), 1000);
			return 'true';
		}).catch((e)=>{
			console.log('Something bad happen \n' + e);
			return 'false';
		});
	});
}

// Functionality for Login-Fail Scenario
function WrongCredsFuncs(driver,email,pass) {
	driver.findElement(By.id('email')).sendKeys(email);
	driver.findElement(By.id('pass')).sendKeys(pass);

	driver.findElement(By.id('login_btn')).click().then(() => {
		return driver.wait(until.elementLocated(By.className('required')), 2000)
		.then((empty_error) => {
			driver.wait(until.elementIsVisible(empty_error), 1000);

			return empty_error.getAttribute('innerHTML')
			.then((message) => {
				if(message === 'Δεν έχεις συμπληρώσει όλα τα πεδία') 
					return 'Completed -> Empty Creds';
				else if(message === '(1) Τα στοιχεία δεν είναι σωστά')
					return 'Completed -> Wrong Creds';
				else
					return 'Failed';
			});
		})
		.catch((e)=>{
			console.log('Something bad happen \n' + e.message);
			return 'Failed';
		});
	}).then((message)=>{
		console.log('Login Test for Fail Scenario -> Status: ' + message);	
	});
}

//Exported Function for Login
exports.Login = (driver,creds) => {

	driver.wait(until.elementLocated(By.id('popup_login')), 1000).then((modal) => {
		LoginModalFuncs(driver,creds);
	}).catch(() => {
		console.log('Login Modal isn`t open. Continue by pressing Login Button. \n');
		driver.findElement(By.css('div.col-md-3.col-sm-4 > #header-login')).click();
		driver.wait(until.elementLocated(By.id('popup_login')), 3000);
		LoginModalFuncs(driver,creds);
	});
};

//Exported Function for Login with Empty Fields
exports.LoginWithEmptyFields = (driver) => {
	console.log ('Login Test With Empty Email/Pass Fields begin:');
	
	driver.wait(until.elementLocated(By.id('popup_login')), 1000).then((modal) => {
		WrongCredsFuncs(driver,'','');
	}).catch(() => {
		console.log('Login Modal isn`t open. Continue by pressing Login Button. \n');
		driver.findElement(By.css('div.col-md-3.col-sm-4 > #header-login')).click();
		driver.wait(until.elementLocated(By.id('popup_login')), 3000);
		WrongCredsFuncs(driver,'','');
	});
};

//Exported Function for Login with Wrong Creds
exports.LoginWithWrongCreds = (driver) => {
	console.log ('Login Test With Wrong Creds begin:');

	driver.wait(until.elementLocated(By.id('popup_login')), 1000).then((modal) => {
		WrongCredsFuncs(driver,'kostas.efood-5@gmail.com','add');
	}).catch(() => {
		console.log('Login Modal isn`t open. Continue by pressing Login Button. \n');
		driver.findElement(By.css('div.col-md-3.col-sm-4 > #header-login')).click();
		driver.wait(until.elementLocated(By.id('popup_login')), 3000);
		WrongCredsFuncs(driver,'kostas.efood-5@gmail.com','add');
	});
};