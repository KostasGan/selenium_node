let { By, until } = require('selenium-webdriver');
//
//
// Functionality for Login.
function LoginModalFuncs(driver, creds) {
	driver.sleep(550);

	driver.findElement(By.id('login_email')).sendKeys(creds.email);
	driver.findElement(By.id('pass')).sendKeys(creds.pass);

	return driver.findElement(By.css('button.button.button-primary.login-form-submit')).click().then(() => {
		driver.sleep(300);
		return driver.wait(until.elementLocated(By.id('userlink')), 5000).then((logged_name) => {
			return logged_name.getText().then((text) => {
				if (text === 'Κώστας')
					return true;
			});
		}).catch((e) => {
			console.log('Something bad happen \n' + e);
			return false;
		});
	});
}

// Functionality for Login-Fail Scenario
function WrongCredsFuncs(driver, email, pass) {
	driver.sleep(600);

	driver.findElement(By.id('login_email')).sendKeys(email);
	driver.findElement(By.id('pass')).sendKeys(pass);

	return driver.findElement(By.css('button.button.button-primary.login-form-submit')).click().then(() => {
		return driver.wait(until.elementLocated(By.css('span.help-block.form-error')), 2000).then((empty_error) => {
			driver.wait(until.elementIsVisible(empty_error), 1000);

			return empty_error.getAttribute('innerHTML').then((message) => {
				if (message === '(1) Τα στοιχεία δεν είναι σωστά') {
					return 'Completed -> Wrong Creds';
				}
				else {
					return 'Failed';
				}
			});
		}).catch((e) => {
			console.log('Something bad happen \n' + e.message);
			return 'Failed';
		});
	}).then((message) => {
		console.log('Login Test for Fail Scenario -> Status: ' + message);
		return message;
	});
}

//Exported Function for Login
exports.Login = (driver, creds) => {
	return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
		return driver.wait(until.elementLocated(By.css('form.login-form > div.form-group')), 1000).then(() => {
			return LoginModalFuncs(driver, creds);
		});
	}).catch(() => {
		console.log('Login Modal isn`t open. Continue by pressing Login Button. \n');
		driver.findElement(By.css('a.user-login')).click();
		return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
			return driver.wait(until.elementLocated(By.css('form.login-form > div.form-group')), 1000).then(() => {
				return LoginModalFuncs(driver, creds);
			});
		});
	});
};

/**
 * 
 * Exported Function for Login with Empty Fields
 * 
 */
// exports.LoginWithEmptyFields = (driver) => {
// 	console.log ('Login Test With Empty Email/Pass Fields begin:');

// 	driver.wait(until.elementLocated(By.id('popup_login')), 1000).then((modal) => {
// 		WrongCredsFuncs(driver,'','');
// 	}).catch(() => {
// 		console.log('Login Modal isn`t open. Continue by pressing Login Button. \n');
// 		driver.findElement(By.css('div.col-md-3.col-sm-4 > a')).click();
// 		driver.wait(until.elementLocated(By.css('div.modal-content')), 3000).then((modal) => {
// 			driver.wait(until.elementIsVisible(modal),4000).then(() => {
// 				WrongCredsFuncs(driver,'','');
// 			});
// 		});
// 	});
// };

//Exported Function for Login with Wrong Creds
exports.LoginWithWrongCreds = (driver) => {
	console.log('Login Test With Wrong Creds begin:');

	return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
		return driver.wait(until.elementLocated(By.css('form.login-form > div.form-group')), 2000).then(() => {
			return WrongCredsFuncs(driver, 'kostas.efood-5@gmail.com', 'add');
		});
	}).catch(() => {
		console.log('Login Modal isn`t open. Continue by pressing Login Button. \n');
		driver.findElement(By.css('a.user-login')).click();
		return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
			return driver.wait(until.elementLocated(By.css('form.login-form > div.form-group')), 2000).then(() => {
				return WrongCredsFuncs(driver, 'kostas.efood-5@gmail.com', 'add');
			});
		});
	});
};