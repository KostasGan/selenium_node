let { By, until } = require('selenium-webdriver');
const login = require('./login.js');
const checkout = require('./checkout.js');
const address = require('./address.js');
let cart_button;

function selectItemsOptions(driver) {
	return driver.wait(until.elementLocated(By.css('div#popup_menu_item'), 3000)).then((popup_menu) => {
		driver.findElements(By.css('div.options.menu-item-options > div')).then((item_options) => {
			if (item_options.length > 0) {
				driver.findElements(By.css('div.option.menu-item-option.clearfix.required-option')).then((required) => {
					required.forEach((element) => {
						input = driver.findElement(By.css('div.choice.menu-item-choice > input'));
						driver.wait(until.elementIsSelected(input), 3000);
					});
				}).catch((e) => { console.log('Couldn`t find required options \n' + e); });

				driver.findElements(By.css('div.option.menu-item-option.clearfix:not(.required-option)')).then((NonRequired) => {
					NonRequired.forEach((element1) => {
						driver.wait(until.elementIsVisible(element1), 3000).then((options) => {
							options.findElement(By.css('div.ingredient-list > div:nth-child(2)')).then((option) => {
								option.isEnabled().then((val) => {
									if (val) {
										option.click();
									}
								});
							});
						});
					});
				}).catch((e) => { console.log('Couldn`t find non-required options \n' + e); });
			}
			else {
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
	}).catch((e) => { console.error('Item Modal hasn`t found \n' + e); });
}

function AddItemToCart(driver) {
	driver.sleep(500);
	driver.findElement(By.id('IT_000000000402')).then((item) => {
		item.getAttribute('class').then((val) => {
			if (val.indexOf('disabled') === -1) {
				item.click();
				driver.sleep(300);
				selectItemsOptions(driver);
			}
			else {
				console.log('Item is Disable \n');
				return;
			}
		});
	});
}


exports.CheckForNoAddress = (driver) => {
	return driver.wait(until.elementLocated(By.css('div.order-steps div.hidden-xs button')), 1000).then((button) => {
		button.click();
		return true;
	});
}

exports.AddOffer = function (driver) {
	driver.sleep(500);
	driver.wait(until.elementLocated(By.css('ul.offers-list > li:nth-child(3)')), 1000).then((offer) => {
		offer.click();
		driver.wait(until.elementLocated(By.id('popup_offer_wizard')), 1000).then((offer_modal) => {
			driver.sleep(150);
			driver.wait(until.elementsLocated(By.css('div.items > div')), 1000).then((items) => {
				for (let i = 0; i < items.length; i++) {
					driver.wait(until.elementLocated(By.css('div.items > div:nth-child(' + (i + 1) + ')')), 1000).then((item) => {
						item.click();
						item.findElement(By.css('option:nth-child(2)')).click().then(() => {
							selectItemsOptions(driver);
						}).catch((e) => { console.error('Kurwa 2 \n' + e); });
					}).catch((e) => { console.error('Kurwa 1 \n' + e); });
				}
			}).catch((e) => { console.error('Kurwa \n' + e); });
			driver.sleep(100);
			driver.wait(until.elementLocated(By.css('div.submit.save > a.button')), 1000).then((button) => {
				button.click().then(() => {
					driver.findElement(By.css('div.spinner')).then((modal) => {
						driver.wait(until.elementIsNotVisible(modal), 2000);
					}).catch((e) => { console.log('Loader doesnt exist \n' + e); });
				}).catch((e) => { console.log('Cannot find "Προσθηκη στο καλαθι" in Offer \n' + e); });
			});
		}).catch((e) => { console.log('Cannot find Offer Modal to continue \n' + e); });
	}).catch((e) => { console.log('Cannot find Offers \n' + e); });
}

exports.MakeOrderInShopProfile = (driver, creds) => {
	return driver.wait(until.urlContains('/delivery/neo-irakleio/blue-shark'), 3000).then(() => {

		AddItemToCart(driver);
		//exports.AddOffer(driver);

		return driver.findElements(By.css('div.cart-items > div')).then((cart_items) => {
			cart_button = driver.findElement(By.id('continue-btn'));

			if (cart_items.length > 0) {
				return driver.wait(until.elementIsEnabled(cart_button), 1500).then(() => {
					cart_button.click();
					return 'Completed';
				}).catch((e) => { console.log("Cannot find Button in Cart \n" + e); });
			}
		}).catch((e) => { console.log("Cannot continue to checkout \n" + e); });
	}).catch((e) => { console.error('Shop isnt Blue Shark \n' + e); });
}