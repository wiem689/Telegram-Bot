const api = require("../api");
const getLanguage = require("../Dictionarys/Dictionary");

function onSuccess(bot, callbackqueryId, msg) {
  bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, "👌"))
}

function onError(bot, callbackqueryId, msg) {
  //var languageCode = getLanguage(msg)
  bot.answerCallbackQuery(callbackqueryId).then(() => bot(msg.chat.id, languageCode.ErrorOperation));
}


async function lockCallback(bot, callbackqueryId, msg, token, deviceId) {
  var result = await api.lockCharger(token, deviceId)
  if (!result) {
    onError(bot, callbackqueryId, msg)
    return;
  }
  onSuccess(bot, callbackqueryId, msg);
}

module.exports = lockCallback