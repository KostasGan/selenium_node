let {By,until} = require('selenium-webdriver');

function RegisterModalFunc(driver,creds) {
	driver.wait(until.elementLocated(By.id('register-form')), 1000).then((form) => {
		form.findElement(By.id('register_email')).sendKeys('ad' + creds.email); 
		form.findElement(By.id('register_pass')).sendKeys(creds.pass); 
		form.findElement(By.id('register_pass_repeat')).sendKeys(creds.pass);
		return driver.findElement(By.css('button.button.button-primary.register-form-submit')).click().then(() => {	
			return driver.wait(until.elementLocated(By.id('userlink')), 4000).then((logged_name) => {
				driver.wait(until.elementIsVisible(logged_name), 2000);
				return 'true';
			}).catch((e)=>{
				console.log('Something bad happen \n' + e);
				return 'false';
			});
		});
	});
}

exports.Register = (driver,creds) => {
	driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
		driver.wait(until.elementIsVisible(modal),2000).then(() => {
			driver.sleep(350);
			driver.findElement(By.css('a[href*="#register-form')).click().then(() => {
				RegisterModalFunc(driver,creds);
			});
		});
	}).catch(() => {
		console.log('Login/Register Modal didn`t open. Continue by pressing Register Button. \n');
		driver.findElement(By.css('div.col-md-3.col-sm-4 > a')).click();
		driver.wait(until.elementLocated(By.css('div.modal-content')), 1000).then((modal) => {
			driver.wait(until.elementIsVisible(modal),2000).then(() => {
				driver.sleep(350);
				driver.findElement(By.css('a[href*="#register-form')).click().then(() => {
					RegisterModalFunc(driver,creds);
				});
			});
		});
	});
}

