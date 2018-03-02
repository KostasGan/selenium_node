const config = require('config');
const chrome = require('selenium-webdriver/chrome');
// const register = require('./test_cases/register');
//const user_infos = require('./test_cases/User Profile/user_infos');
const login_scenarios = require('./test_scenarios/login_scenario').Login;
const logout_scenarios = require('./test_scenarios/logout_scenario').Logout;
const loggedInFlow_scenarios = require('./test_scenarios/loggedInflow_scenario').LoggedInFlow;
const register_scenarios = require('./test_scenarios/register_scenario').Register;
const anonymousflow_scenarios = require('./test_scenarios/anonymousflow_scenario').AnonymousFlow;
const notification_scenarios = require('./test_scenarios/notification_scenario').NotificationCheck;

//configs 
let ngcreds = config.get('Env.ngusrnm') + ':' + config.get('Env.ngpass') + '@';
let main_url = config.get('Env.url');
let url = 'https://' + ngcreds + main_url;
let driver, chromeSettings = new chrome.Options().addArguments();
let creds = {
	'email': config.get('User.email'),
	'pass': config.get('User.pass'),
	'sms_pass': config.get('User.sms_pass')
};

register_scenarios(driver, chromeSettings, url, creds);
login_scenarios(driver, chromeSettings, url, creds);
logout_scenarios(driver, chromeSettings, url, creds);
loggedInFlow_scenarios(driver, chromeSettings, url, creds);
anonymousflow_scenarios(driver, chromeSettings, url, creds);
notification_scenarios(driver,chromeSettings, url, creds);