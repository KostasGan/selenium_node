const config = require('config');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const login = require('./test_cases/login.js');
const register = require('./test_cases/register.js');
//const logout = require('./test_cases/logout.js');
const address = require('./test_cases/address.js');
const shoplist = require('./test_cases/shoplist.js');
const shopProfile = require('./test_cases/shop_profile.js');
//const checkout = require('./test_cases/checkout.js');


//configs 
let ngcreds = config.get('Env.ngusrnm') + ':' + config.get('Env.ngpass') + '@';
let main_url = config.get('Env.url');
let url = 'https://' + ngcreds + main_url;
let url1 = 'https://' + main_url; 
let driver;
let creds = {
	'email': config.get('User.email'),
	'pass': config.get('User.pass'),
	'sms_pass': config.get('User.sms_pass')
};

//Mocha TestCases
test.describe('First Test Case', function () {
	test.beforeEach(function () {
		driver = new webdriver
			.Builder()
			.withCapabilities(webdriver.Capabilities.chrome())
			.build();

		driver.manage().window().maximize();
	});

	test.afterEach(function () {
		driver.quit();
	});
	for(i=0; i< 15; i++){
	test.it('Anonymous Flow From Homepage', function () {

		this.timeout(50000);

		driver.get(url + '/delivery/menu/simply-burgers');
		//driver.get(url1);

		//login.Login(driver,creds);
		//shopProfile.MakeOrderInShopProfile(driver,creds);
		//register.Register(driver,creds);
		//address.AddAddressAnonymous(driver).then((val) => { assert.ok(val); });
		//shoplist.GetShopList(driver).then((bool) => { assert.ok(bool) });
		shopProfile.MakeOrderInShopProfile(driver, creds);
		driver.sleep(600);
	});
	
}
	// test.it('Anonymous Flow From ShopProfile', function(){

	// 	this.timeout(50000);

	// 	driver.get(url + '/menu?shop_id=968814');
	// 	shopProfile.MakeOrderInShopProfile(driver,creds);
	// 	//register.Register(driver,creds);
	// 	// address.AddAddressAnonymous(driver).then((val)=>{

	// 	// 	//assert.ok(val);
	// 	//  	//shoplist.GetShopList(driver);
	// 	// 	shopProfile.MakeOrderInShopProfile(driver,creds);
	// 	// });
	// });
});