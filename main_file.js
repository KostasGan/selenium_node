const config = require('config');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
//const login = require('./test_cases/logintest.js');
//const register = require('./test_cases/register.js');
//const logout = require('./test_cases/logout.js');
const address = require('./test_cases/address.js')

//configs 
let ngcreds = config.get('Env.ngusrnm') + ':' + config.get('Env.ngpass') + '@' ;
let main_url = config.get('Env.url');
let url = 'https://'+ ngcreds + main_url;
let creds = {'email': config.get('User.email'), 'pass': config.get('User.pass')};

//Mocha TestCases
test.describe('First Test Case',function(){
	let driver;

	test.beforeEach(function() {
		
		driver = new webdriver
		.Builder()
	    .withCapabilities(webdriver.Capabilities.chrome())
	    .build();
	    
	    driver.manage().window().maximize();
	});

	test.afterEach(function() {
		driver.quit();
	});

	test.it('Login Test', function(){

		this.timeout(10000);

		driver.get(url);

		address.AddAddressAnonymous(driver,creds);
	})
});