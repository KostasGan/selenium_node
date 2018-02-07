let { By, until } = require('selenium-webdriver');

let result_message = 'Σου στείλαμε ένα e-mail με οδηγίες για την επαναφορά του κωδικού σου. Μπορείς να συνδεθείς κάνοντας κλικ εδώ';

exports.ResetPassword = (driver,creds) => {
	console.log('Test ResetPassword Begin')

	let login = driver.findElement(By.css('a.user-login'));

	driver.wait(until.elementIsVisible(login), 1000).catch((e) => { console.log('Test Failed: You are already logged in')});

	login.click();
	driver.wait(until.elementLocated(By.id('popup_login')), 1000);

	let reset_pass = driver.findElement(By.css('a.forgot'));
	driver.wait(until.elementIsVisible(reset_pass), 2000);

	reset_pass.click().then(() => {
		driver.wait(until.elementLocated(By.css('form.forgot')), 1000);

		let reset_email = driver.findElement(By.id('forgot_email'));
		let submit_btn = driver.findElement(By.id('submit_btn'));
		driver.wait(until.elementIsVisible(reset_email), 1000);

		reset_email.sendKeys(creds.email);
		submit_btn.click().then(() => {
			driver.wait(until.elementLocated(By.css('form.forgot')), 1000);

			let reset_results = driver.findElement(By.id('forgot_results'));
			driver.wait(until.elementIsVisible(reset_results), 5000).then(()=>{
				console.log('ResetPassWord Test Passed');
			});
		});
	}).catch((e)=>{
		console.log('Element Forget doesnt exist! \n' + e);
	});
}