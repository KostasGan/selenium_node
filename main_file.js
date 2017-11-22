const config = require('config');
// const register = require('./test_cases/register');
// //const logout = require('./test_cases/logout');
// const address = require('./test_cases/address');
// const shoplist = require('./test_cases/shoplist');
// const shopProfile = require('./test_cases/shop_profile');
//const checkout = require('./test_cases/checkout');
//const user_infos = require('./test_cases/User Profile/user_infos');
const login_scenarios = require('./test_scenarios/login_scenario').LoginScenarios;

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

login_scenarios(driver, url, creds);