const config = require('config');
// const register = require('./test_cases/register');
//const user_infos = require('./test_cases/User Profile/user_infos');
const login_scenarios = require('./test_scenarios/login_scenario').Login;
const logout_scenarios = require('./test_scenarios/logout_scenario').Logout;
const loggedInFlow_scenarios = require('./test_scenarios/loggedInflow_scenario').LoggedInFlow;

//configs 
let ngcreds = config.get('Env.ngusrnm') + ':' + config.get('Env.ngpass') + '@';
let main_url = config.get('Env.url');
let url = 'https://' + ngcreds + main_url;
let driver;
let creds = {
	'email': config.get('User.email'),
	'pass': config.get('User.pass'),
	'sms_pass': config.get('User.sms_pass')
};

login_scenarios(driver, url, creds);
logout_scenarios(driver, url, creds);
loggedInFlow_scenarios(driver, url, creds);