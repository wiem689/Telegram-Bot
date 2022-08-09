const getLanguage = require('../Dictionarys/Dictionary');


async function onHelpHandler(bot, msg) {
    //var languageCode = getLanguage(msg)
    bot.sendMessage(msg.chat.id, languageCode.Help);
}

module.exports = onHelpHandler