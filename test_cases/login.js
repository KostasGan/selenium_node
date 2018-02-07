let { By, until } = require('selenium-webdriver');

let button, emailField, passField;

// Functionality for Login.
function LoginModalFuncs(driver, creds) {
	return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
		driver.wait(until.elementIsVisible(modal), 1000);

		button = modal.findElement(By.css('button.login-form-submit'));
		emailField = modal.findElement(By.id('login_email'));
		passField = modal.findElement(By.id('pass'));

		driver.wait(until.elementIsNotVisible(modal.findElement(By.css('div.is-loading'))), 1000);

		driver.wait(until.elementIsVisible(emailField), 2000).then(() => {
			emailField.sendKeys(creds.email);
		});
		driver.wait(until.elementIsVisible(passField), 2000).then(() => {
			passField.sendKeys(creds.pass);
		});

		driver.wait(until.elementIsVisible(button), 2000).then(() => {
			button.click();
		});

		return driver.wait(until.elementLocated(By.css('div.header-user a.header-user-link')), 3000).then((userlink) => {
			return driver.wait(until.elementIsVisible(userlink), 2000).then((logged_name) => {
				return logged_name.getText().then((text) => {
					if (text === 'Κώστας')
						return true;
				});
			});
		}).catch((e) => {
			console.log('Something bad happen \n' + e);
			return false;
		});
	}).catch((e) => {
		console.log('Cannot find Open Modal \n' + e);
		return false;
	});
}

// Functionality for Login-Fail Scenario
function WrongCredsFuncs(driver, email, pass) {
	return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
		driver.wait(until.elementIsVisible(modal), 1000);

		button = modal.findElement(By.css('button.login-form-submit'));
		emailField = modal.findElement(By.id('login_email'));
		passField = modal.findElement(By.id('pass'));
		
		driver.wait(until.elementIsNotVisible(modal.findElement(By.css('div.is-loading'))), 1000);

		driver.wait(until.elementIsVisible(emailField), 2000).then(() => {
			emailField.sendKeys(email);
		});
		driver.wait(until.elementIsVisible(passField), 2000).then(() => {
			passField.sendKeys(pass);
		});

		driver.wait(until.elementIsVisible(button), 1500).then(() => {
			button.click();
		});

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
	}).catch((message) => {
		console.log('Login Test for Fail Scenario -> Status: ' + message);
		return message;
	});
}

//Exported Function for Login
exports.Login = (driver, creds) => {
		return driver.wait(until.elementLocated(By.css('a.user-login')), 1000).then((button) => {
			button.click();
			return LoginModalFuncs(driver, creds);
		}).catch(() => {
			return LoginModalFuncs(driver, creds);
		});	
};

//Exported Function for Login with Wrong Creds
exports.LoginWithWrongCreds = (driver) => {
	return driver.wait(until.elementLocated(By.css('a.user-login')), 1000).then((button) => {
		button.click();
		return WrongCredsFuncs(driver, 'kostas.efood-5@gmail.com', 'add');
	}).catch(() => {
		return WrongCredsFuncs(driver, 'kostas.efood-5@gmail.com', 'add');
	});
};