let {By,until} = require('selenium-webdriver');

function RegisterModalFunc(driver,creds) {
	return driver.wait(until.elementLocated(By.id('register-form')), 1000).then((form) => {
		driver.wait(until.elementIsVisible(form), 1500);
		
		driver.wait(until.elementIsVisible(form.findElement(By.id('register_email'))), 2000).then((emailField) => {
			emailField.sendKeys(creds.email);
		});
		driver.wait(until.elementIsVisible(form.findElement(By.id('register_pass'))), 2000).then((emailField) => {
			emailField.sendKeys(creds.pass);
		});
		driver.wait(until.elementIsVisible(form.findElement(By.id('register_pass_repeat'))), 2000).then((emailField) => {
			emailField.sendKeys(creds.pass);
		});

		return driver.findElement(By.css('button.register-form-submit')).then((button) => {
			button.click();
			
			return driver.wait(until.elementLocated(By.id('userlink')), 4000).then((logged_name) => {
				driver.wait(until.elementIsVisible(logged_name), 2000);
				return 'Completed';
			}).catch((e)=>{
				console.log('Something bad happen \n' + e);
				return 'Failed';
			});
		});
	}).catch((e) => {
		console.log('Cannot Find the registration-form \n' + e);
		return 'Failed';
	});
}

exports.Register = (driver,creds) => {
	return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
		return driver.wait(until.elementIsVisible(modal),2000).then(() => {
			driver.wait(until.elementIsNotVisible(driver.findElement(By.css('div.is-loading'))), 1500);
			return driver.findElement(By.css('a[href*="#register-form')).click().then(() => {
				return RegisterModalFunc(driver,creds);
			});
		});
	}).catch(() => {
		console.log('Login/Register Modal didn`t open. Continue by pressing Register Button. \n');
		driver.findElement(By.css('a.user-login')).click();
		return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
			return driver.wait(until.elementIsVisible(modal),2000).then(() => {
				driver.wait(until.elementIsNotVisible(driver.findElement(By.css('div.is-loading'))), 1500);
				return driver.findElement(By.css('a[href*="#register-form')).click().then(() => {
					return RegisterModalFunc(driver,creds);
				});
			});
		});
	});
}

