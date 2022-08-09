const api = require('../api');
const onToken = require("./onToken");
const getLanguage = require("../Dictionarys/Dictionary");


async function onListHandler(bot, msg) {
  try {
    //var languageCode = getLanguage(msg)
    var token = await api.getToken(msg.chat.id);
    if (token.length == 0) {
      onToken.onTokenHandler(bot, msg, [""]);
      return;
    }
    bot.sendMessage(msg.chat.id, languageCode.PairedList);
    pairings = await api.getPairings(token)
    if (pairings != null) {
      for (var i in pairings) {
        bot.sendMessage(msg.chat.id, 'DeviceID: ' + pairings[i].deviceId + "\nTAG: " + pairings[i].tag);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = onListHandler