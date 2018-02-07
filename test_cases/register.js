let {By,until} = require('selenium-webdriver');

let submit, emailField, passField, repet_pass;

function RegisterModalFunc(driver,creds) {
	return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
		driver.wait(until.elementIsVisible(modal), 1500);

		driver.wait(until.elementIsNotVisible(driver.findElement(By.css('div.is-loading'))), 1500);

		return driver.wait(until.elementLocated(By.css('a[href*="register-form')), 1500).then((button) => {
			button.click();
			
			submit = modal.findElement(By.css('button.register-form-submit'));
			emailField = modal.findElement(By.id('register_email'));
			passField = modal.findElement(By.id('register_pass'));
			repet_pass = modal.findElement(By.id('register_pass_repeat'));


			driver.wait(until.elementIsVisible(emailField), 2000).then(() => {
				emailField.sendKeys('blyeatt+12@blyat.com');
			});
			driver.wait(until.elementIsVisible(passField), 2000).then(() => {
				passField.sendKeys(123456);
			});
			driver.wait(until.elementIsVisible(repet_pass), 2000).then(() => {
				repet_pass.sendKeys(123456);
			});

			driver.wait(until.elementIsVisible(submit), 2000).then(() => {
				submit.click();
			});

			return driver.wait(until.elementLocated(By.css('div.header-user a.header-user-link')), 4000).then((logged_name) => {
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

	return driver.wait(until.elementLocated(By.css('a.user-login')), 1000).then((button) => {
		button.click();
		return RegisterModalFunc(driver,creds);
	}).catch(() => {
		return RegisterModalFunc(driver,creds);
	});



	// return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
	// 	return driver.wait(until.elementIsVisible(modal),2000).then(() => {
	// 		//driver.wait(until.elementIsNotVisible(driver.findElement(By.css('div.is-loading'))), 1500);
	// 		return driver.findElement(By.css('a[href*="#register-form')).click().then(() => {
	// 			//return RegisterModalFunc(driver,creds);
	// 		});
	// 	});
	// }).catch(() => {
	// 	console.log('Login/Register Modal didn`t open. Continue by pressing Register Button. \n');
	// 	driver.findElement(By.css('a.user-login')).click();
	// 	return driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
	// 		return driver.wait(until.elementIsVisible(modal),2000).then(() => {
	// 			driver.wait(until.elementIsNotVisible(driver.findElement(By.css('div.is-loading'))), 1500);
	// 			return driver.wait(until.elementLocated(By.css('a[href*="register-form')), 1500).then((button) => {
	// 				button.click();
	// 				//return RegisterModalFunc(driver,creds);
	// 			});
	// 		});
	// 	});
	// });
}

