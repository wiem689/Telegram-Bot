const DictionaryEn = require('./DictionaryEn')
const DictionaryFr = require('./DictionaryFr');
const DictionaryEs = require('./DictionaryEsOLD');
const ES = require('./ES');
const FR = require('./FR');
const EN = require('./EN');



function getLanguage(msg) {
  //languageCode = EN;



  let lang_code = msg.from.language_code;
  if (lang_code) {
    console.log("Message : " + msg.from.language_code);
    if (lang_code === "es") {
      languageCode = ES;
    }
    if (lang_code === "fr") {
      languageCode = FR;
    }
    if (lang_code === "en") {
      languageCode = EN;
    }
    console.log(languageCode, 'dic')
    return languageCode;
  } else {
    languageCode = EN;
  }




}


module.exports = getLanguage