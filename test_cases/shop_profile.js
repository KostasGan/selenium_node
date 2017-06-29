let {By,until} = require('selenium-webdriver');


function AddToCartSimpleItem(driver) {
	driver.getCurrentUrl().then((current_url) => {
		if(current_url.indexOf('/delivery/neo-irakleio/blue-shark') !== -1 ){
			let menu = driver.findElement(By.css('section.menu-container'));

			let item = menu.findElement(By.id('IT_000000000402')).click();

			driver.wait(until.elementLocated(By.id('popup_menu_item'), 5000)).then(() => {
				driver.findElements(By.css('div.options.menu-item-options > div')).then((item_options) => {
					if(item_options.length === 0){
						driver.findElement(By.id('menu-item-submit')).click();
					}
					else {
						return false;
					}
				}).catch((e) => { console.error('No Items Option Found \n' + e); });

			}).catch((e) => { console.error('Item Modal hasn`t found \n' + e ); });
		}

	}).catch((e) => { console.error('Shop isnt Blue Shark \n' + e); });
}

function AddToCartItemWithOptions(driver) {
	return driver.getCurrentUrl().then((current_url) => {
		if(current_url.indexOf('/delivery/neo-irakleio/blue-shark') !== -1 ){
			let menu = driver.findElement(By.css('section.menu-container'));

			let item = menu.findElement(By.id('IT_000000000416')).click();

			driver.wait(until.elementLocated(By.id('popup_menu_item'), 5000)).then(() => {
				driver.findElements(By.css('div.options.menu-item-options > div')).then((item_options) => {

					if(item_options.length > 0){
						item_options.forEach((option) => {
							option.getAttribute('class').then((Cclass) => {
								if(Cclass.indexOf('required-option') > -1 ){
									let input = option.findElement(By.css(' div.choice.menu-item-choice > input'));
									driver.wait(until.elementIsSelected(input), 3000).then(() => {});
								}
							});
						});

						driver.findElement(By.id('menu-item-submit')).click();
						/*if(checked === 'checked'){
							//driver.findElement(By.id('menu-item-submit')).click();
						}
						else {
							console.log('Required Options aren`t checked');
						}*/

					}
					else{
						return null;
					}

				}).catch((e) => { console.error('No Items Option Found \n' + e); });

			}).catch((e) => { console.error('Item Modal hasn`t found \n' + e ); });
		}
		else{ return false; }
	}).catch((e) => console.error(e)) 
}



exports.MakeOrderInShopProfile = (driver) => {
	return AddToCartItemWithOptions(driver);
}