let { By, until } = require('selenium-webdriver');

let result_message = 'Σου στείλαμε ένα e-mail με οδηγίες για την επαναφορά του κωδικού σου.';
let info;

function _resetPassword(driver, creds) {
	driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
		driver.wait(until.elementIsVisible(modal), 1000);

		driver.wait(until.elementIsNotVisible(modal.findElement(By.css('div.is-loading'))), 1000);

		driver.wait(until.elementLocated(By.css('a.forgot-password-btn')), 1000).then((link) => {
			link.click();
		});	
	});

	return driver.wait(until.elementLocated(By.css('div.modal-content')), 1500).then((forgot_modal) => { 
		driver.wait(until.elementIsVisible(forgot_modal), 1500);

		info = forgot_modal.findElement(By.css('div.forgot-password-info'));

		forgot_modal.findElement(By.id('forgot_email')).sendKeys(creds.email);

		forgot_modal.findElement(By.css('button.button')).click();

		return driver.wait(until.elementIsVisible(info), 5000).then(() => {
			return info.getText().then((text) => {
				if(text.indexOf(result_message) > -1 ){
					return true;
				}
			});
		});
	});
}

exports.ResetPassword = (driver, creds) => {
	return driver.wait(until.elementLocated(By.css('a.user-login')), 1000).then((button) => {
		button.click();
		return _resetPassword(driver, creds)
	});
}