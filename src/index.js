const Promise = require('bluebird');
const { TOKEN_STG } = require('./config');
const V2CTelegramBot = require('./V2CTelegramBot');



Promise.config({
  cancellation: true
});

const telegramToken = TOKEN_STG;
const bot = new V2CTelegramBot(telegramToken);
bot.init()


