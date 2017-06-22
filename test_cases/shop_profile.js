let {By,until} = require('selenium-webdriver');


function AddToCart(driver) {
	driver.getCurrentUrl().then((current_url) => {
		if(current_url.indexOf('/delivery/neo-irakleio/blue-shark') !== -1 ){
			let menu = driver.findElement(By.css('section.menu-container'));

			let item = menu.findElement(By.id('IT_000000000402')).click();

			driver.wait(until.elementLocated(By.id('popup_menu_item'))).then(() => {
				driver.findElement(By.id('menu-item-submit')).click();
			});
		}

	}) 
}



exports.MakeOrderInShopProfile = (driver) => {
	AddToCart(driver);
}