let {By,until} = require('selenium-webdriver');
let checkBox, button, input;
const login = require('./login.js');

function AddItemToCart(driver) {
	driver.findElement(By.id('IT_000000000416')).click(); 
	driver.sleep(400);
	return driver.wait(until.elementLocated(By.css('div#popup_menu_item'), 5000)).then((popup_menu) => {
		driver.findElements(By.css('div.options.menu-item-options > div')).then((item_options) => {
			if(item_options.length > 0) {
				driver.findElements(By.css('div.option.menu-item-option.clearfix.required-option')).then((required)=>{
					required.forEach((element) =>{
						input = driver.findElement(By.css('div.choice.menu-item-choice > input'));
						driver.wait(until.elementIsSelected(input), 3000);
					});
				}).catch((e) => { console.log('Couldn`t find required options \n' + e ); });

				driver.findElements(By.css('div.option.menu-item-option.clearfix:not(.required-option)')).then((NonRequired)=>{
					NonRequired.forEach((element1) =>{
						driver.wait(until.elementIsVisible(element1),3000).then((options)=>{
							options.findElement(By.css('div.ingredient-list > div:nth-child(2)')).then((option)=>{
								option.isEnabled().then((val)=>{
									if(val){
										option.click();
									}
								});
							});
						}).catch((e) => { console.log('kati xazo \n' + e ); });
					});
				}).catch((e) => { console.log('Couldn`t find non-required options \n' + e ); });
			}
			else{
				return false;
			}	
		}).catch((e) => { console.error('No Items Option Found \n' + e); });

		driver.wait(until.elementLocated(By.css('span.button.button-primary')), 3000).then((button) => {
			button.click().then(() => {
				driver.findElement(By.css('div.spinner')).then((modal) => {
					driver.wait(until.elementIsNotVisible(modal), 3000);
				}).catch((e) => { console.log('Loader doesnt exist \n' + e); });
			}).catch((e) => { console.log('Cannot find "Προσθηκη στο καλαθι" \n' + e); });		
		});
	}).catch((e) => { console.error('Item Modal hasn`t found \n' + e ); });
}

exports.MakeOrderInShopProfile = (driver,creds) => {
	return driver.getCurrentUrl().then((current_url) => {
		if(current_url.indexOf('/delivery/neo-irakleio/blue-shark') !== -1 ){
			//let menu = driver.findElement(By.css('section.menu-container'));

			AddItemToCart(driver).then(() => {
				AddItemToCart(driver);
			});
			
			driver.findElements(By.css('div.cart-items > div')).then((cart_items) => {
				if(cart_items.length == 2){
					//login.Login(driver, creds);
					driver.findElement(By.id('continue-btn')).click().then(()=>{
						login.Login(driver, creds);
					});
				}
			}).catch((e) => { console.log("Cannot continue to checkout \n" + e); });
		}
	}).catch((e) => { console.error('Shop isnt Blue Shark \n' + e); });
}