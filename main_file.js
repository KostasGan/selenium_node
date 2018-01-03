const config = require('config');
const chrome = require('selenium-webdriver/chrome');
// const register = require('./test_cases/register');
//const user_infos = require('./test_cases/User Profile/user_infos');
const login_scenarios = require('./test_scenarios/login_scenario').Login;
const logout_scenarios = require('./test_scenarios/logout_scenario').Logout;
const loggedInFlow_scenarios = require('./test_scenarios/loggedInflow_scenario').LoggedInFlow;

//configs 
let ngcreds = config.get('Env.ngusrnm') + ':' + config.get('Env.ngpass') + '@';
let main_url = config.get('Env.url');
let url = 'https://' + ngcreds + main_url;
<<<<<<< HEAD
let url1 = 'https://' + main_url; 
let driver;
=======
let driver, chromeSettings = new chrome.Options().addArguments(config.get('ChromeSettings'));
>>>>>>> bf8c32df90b199e9cc6bae110102d2a2d2374f5e
let creds = {
	'email': config.get('User.email'),
	'pass': config.get('User.pass'),
	'sms_pass': config.get('User.sms_pass')
};

//Mocha TestCases
test.describe('First Test Case', function () {
	test.before(function () {
		driver = new webdriver
			.Builder()
			.forBrowser('chrome')
			//.setChromeOptions(new chrome.Options().addArguments('--headless'))
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
