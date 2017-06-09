let {By,until} = require('selenium-webdriver');


exports.GetShopList = (driver) =>{
	driver.getCurrentUrl().then((current_url) => {
		if((current_url.indexOf('/shops?user_address=') !== -1) || (current_url.indexOf('/shops?address=') !== -1)){
			console.log('Contains');
		}
		else{
		console.log('Doesn`t contains');
		}

	});

	
};