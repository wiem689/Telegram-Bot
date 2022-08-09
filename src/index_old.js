const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios');
const conf = require('./config');
const Promise = require('bluebird');
const { TOKEN_STG } = require('./config');
const getLanguage = require('./Dictionarys/Dictionary');
const onMessageHandler = require('./handlers/onHelp');
const onKeyHandler = require('./handlers/onToken');


Promise.config({
  cancellation: true
});

const telegramToken = TOKEN_STG;
const bot = new V2CTelegramBot(telegramToken);








let auth = ``;
let token = ``;
var data = ``;
var names = "";
var CargaId = "";
var languCode = "";
function dateDiff(date1, date2) {
  var diff = {}
  var tmp = date2 - date1;

  tmp = Math.floor(tmp / 1000);
  diff.sec = tmp % 60;

  tmp = Math.floor((tmp - diff.sec) / 60);
  diff.min = tmp % 60;

  tmp = Math.floor((tmp - diff.min) / 60);
  diff.hour = tmp % 24;

  tmp = Math.floor((tmp - diff.hour) / 24);
  diff.day = tmp;

  return diff;
}
//while the bot is running 
bot.on('message', onMessageHandler);


//Add Api token Key Section
bot.onText(/\/key (.+)/, onKeyHandler);
//Add charger-name Section
bot.onText(/\/name (.+)/, async (msg, match) => {

  var languageCode = getLanguage(msg)

  if (auth === "") {
    bot.sendMessage(msg.chat.id, languageCode.startone)
  }
  else {
    const chatId = msg.chat.id;
    const resp = match[1];
    names = resp;
    var idC = "";
    var idC = await api.getDeviceId(resp, auth);
    api.updateUserData(msg.chat.id, token, idC, names);
    CargaId = idC;
    console.log("id", idC);
    console.log("id de carga", CargaId);
    bot.sendMessage(msg.chat.id, languageCode.infoset);
    bot.sendMessage(msg.chat.id, msg.from.first_name + ", " + languageCode.infotwo, {
      "reply_markup": {
        "keyboard": [["/set", "/info"], ["🆘"], [languageCode.paired]],
        "one_time_keyboard": true,
        "resize_keyboard": true
      },

    });


  }

});
//Add charger-name Section
bot.onText(/\/nombre (.+)/, async (msg, match) => {
  var languageCode = getLanguage(msg)

  if (auth === "") {
    bot.sendMessage(msg.chat.id, languageCode.startone)
  }
  else {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, languageCode.sos);
    names = resp;
    var idC = "";
    var idC = await api.getDeviceId(resp, auth);
    api.updateUserData(msg.chat.id, token, idC, names);
    CargaId = idC;
    console.log("id", idC);
    console.log("id de carga", CargaId);


  }

});
//Start Bot Section
bot.onText(/\/start/, async (msg, match) => {
  token = await api.getToken(msg.chat.id);

  var languageCode = getLanguage(msg)

  if (token !== "") {
    bot.sendMessage(msg.chat.id, languageCode.sos);

  }
  else {

    bot.sendMessage(msg.chat.id, languageCode.startone);


  }


})
//Info Section
// no Section
bot.onText(/\/no/, (msg) => {
  var languageCode = getLanguage(msg)


  bot.sendMessage(msg.chat.id, languageCode.no + "https://v2charge.com/es/como-obtener-mi-identificador-token-para-usar-la-api-rest-cloud/", {
    "reply_markup": {
      "inline_keyboard": [
        [
          {
            text: "🆘",
            callback_data: "🆘",
          },
        ],
      ],
    },

  });


})



//end no section 
bot.onText(/\menu/, (msg) => {
  var languageCode = getLanguage(msg)


  bot.sendMessage(msg.chat.id, msg.from.first_name + "," + languageCode.infotwo, {
    "reply_markup": {
      "keyboard": [["/set", "/info"], ["🆘"], [languageCode.paired]],
      "one_time_keyboard": true,
      "resize_keyboard": true
    },

  });


})

bot.onText(/\/info/, (msg, match) => {
  var languageCode = getLanguage(msg)
  if (names === "") {
    bot.sendMessage(msg.chat.id, languageCode.info)
  } else {
    bot.sendMessage(msg.chat.id, languageCode.getinfo, {

      "reply_markup": {
        "inline_keyboard": [
          [
            {
              text: languageCode.state,
              callback_data: "Ver El estado del Carga",
            },
            {
              text: languageCode.intensity + "\t\t",
              callback_data: "⚡️⚡️",
            },
          ],
          [
            {
              text: languageCode.scheduleTWo + "\t\t",
              callback_data: "programacion",
            },
            {
              text: languageCode.stats,
              callback_data: "📊📊",
            },
          ]
        ],
      },
    });
  }


});
bot.onText(/\/set/, (msg) => {
  var languageCode = getLanguage(msg)
  if (names === "") {
    bot.sendMessage(msg.chat.id, languageCode.info)
  } else {
    bot.sendMessage(msg.chat.id, languageCode.getinfo, {

      "reply_markup": {
        "inline_keyboard": [
          [
            {
              text: languageCode.pauseC,
              callback_data: "Pausar",
            },
            {
              text: languageCode.resumeC,
              callback_data: "Reanudar",
            },
          ],
          [
            {
              text: languageCode.lockC,
              callback_data: "Bloquear",
            },
            {
              text: languageCode.unlockC,
              callback_data: "Desbloquear",
            },
          ]
        ],
      },
    });
  }
});

// Listener (handler) for callback data from /datac command

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  // console.log(callbackQuery.from.language_code);
  var category = callbackQuery.data;
  var langue = callbackQuery.from.language_code;
  var langCode = "";
  if (langue === "en") {
    langCode = DictionaryEn;
  }
  else if (langue === "es") {

    langCode = DictionaryEs;
  }
  else if (langue === "fr") {
    langCode = DictionaryFr;
  }



  switch (category) {

    case "Bloquear":
      console.log("Bloquear");
      axios.request({
        method: 'post',
        url: 'https://v2c.cloud/kong/v2c_service/device/locked?',
        params: {
          deviceId: CargaId,
          value: '1'
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': auth
        }
      }).then(resp => {
        bot.sendMessage(message.chat.id, "👌", {

          "reply_markup": {
            "inline_keyboard": [
              [
                {
                  text: "🆘",
                  callback_data: "🆘",
                },
              ],
            ],
          },
        });
      });
      break;
    case "Desbloquear":
      console.log("Desbloquear");
      axios.request({
        method: 'post',
        url: 'https://v2c.cloud/kong/v2c_service/device/locked?',
        params: {
          deviceId: CargaId,
          value: '0'
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': auth
        }
      }).then(resp => {
        console.log(resp.data);
        bot.sendMessage(message.chat.id, "👌", {

          "reply_markup": {
            "inline_keyboard": [
              [
                {
                  text: "🆘",
                  callback_data: "🆘",
                },
              ],
            ],
          },
        });
      })

      break;
    case "Pausar":
      console.log("Pausar");
      axios.request({
        method: 'post',
        url: 'https://v2c.cloud/kong/v2c_service/device/pausecharge?',
        params: {
          deviceId: CargaId
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': auth
        }
      }).then(resp => {
        console.log(resp.data);
        bot.sendMessage(message.chat.id, "👌", {

          "reply_markup": {
            "inline_keyboard": [
              [
                {
                  text: "🆘",
                  callback_data: "🆘",
                },
              ],
            ],
          },
        });
      });

      break;
    case "Reanudar":
      console.log("Reanudar");
      axios.request({
        method: 'post',
        url: 'https://v2c.cloud/kong/v2c_service/device/startcharge?',
        params: {
          deviceId: CargaId
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': auth
        }
      }).then(resp => {
        bot.sendMessage(message.chat.id, "👌", {

          "reply_markup": {
            "inline_keyboard": [
              [
                {
                  text: "🆘",
                  callback_data: "🆘",
                },
              ],
            ],
          },
        });
        console.log(resp.data);
      });
      break;
    case "⚡️⚡️":
      console.log("Intensity");
      axios.get('https://v2c.cloud/kong/v2c_service/device/reported??', {
        params: {
          "deviceId": CargaId

        },

        headers: {
          'Content-type': 'application/json',
          'apikey': token
        }

      }).then((response) => {
        console.log(response.data);
        bot.sendMessage(message.chat.id, langCode.intensidadVal + response.data.intensity + " A", {

          "reply_markup": {
            "inline_keyboard": [
              [
                {
                  text: "🆘",
                  callback_data: "🆘",
                },
              ],
            ],
          },
        });
      }, (error) => {
        console.log(error);
      });
      break;

    case "Ver El estado del Carga":
      console.log("the language here is ", langue);
      axios.get('https://v2c.cloud/kong/v2c_service/device/reported??', {
        params: {
          "deviceId": CargaId

        },

        headers: {

          'Content-type': 'application/json',
          'apikey': auth
        }

      }).then((response) => {

        console.log(response.data.charge_state);
        if (response.data.connected == "1") {
          if (response.data.locked == "1") {
            bot.sendMessage(message.chat.id, langCode.Chargemode1, {

              "reply_markup": {
                "inline_keyboard": [
                  [
                    {
                      text: "🆘",
                      callback_data: "🆘",
                    },
                  ],
                ],
              },
            });
          } else {
            if (response.data.pause == "1") {
              bot.sendMessage(message.chat.id, langCode.Chargemode2, {

                "reply_markup": {
                  "inline_keyboard": [
                    [
                      {
                        text: "🆘",
                        callback_data: "🆘",
                      },
                    ],
                  ],
                },
              });
            } else {
              if (response.data.charge_state == "0") {
                bot.sendMessage(message.chat.id, langCode.Chargemode3, {

                  "reply_markup": {
                    "inline_keyboard": [
                      [
                        {
                          text: "🆘",
                          callback_data: "🆘",
                        },
                      ],
                    ],
                  },
                });
              } else if (response.data.charge_state == "1") {
                bot.sendMessage(message.chat.id, langCode.Chargemode4, {

                  "reply_markup": {
                    "inline_keyboard": [
                      [
                        {
                          text: "🆘",
                          callback_data: "🆘",
                        },
                      ],
                    ],
                  },
                });
              } else if (response.data.charge_state == "2") {
                bot.sendMessage(message.chat.id, langCode.your + "'" + names + "'" + "\t" + langCode.charger + "\t🚘 ♻️", {

                  "reply_markup": {
                    "inline_keyboard": [
                      [
                        {
                          text: "🆘",
                          callback_data: "🆘",
                        },
                      ],
                    ],
                  },
                });

              }
            }
          }
        } else {
          bot.sendMessage(message.chat.id, langCode.Chargemode4, {

            "reply_markup": {
              "inline_keyboard": [
                [
                  {
                    text: "🆘",
                    callback_data: "🆘",
                  },
                ],
              ],
            },
          });
        }
        console.log(JSON.stringify(response.data));
      }, (error) => {
        bot.sendMessage(message.chat.id, langCode);

        console.log(error);
      });

      break;
    case "📊📊":
      axios.get('https://v2c.cloud/kong/v2c_service/stadistic/device?', {
        params: {
          "deviceId": CargaId

        },

        headers: {

          'Content-type': 'application/json',
          'apikey': auth
        }

      }).then((response) => {
        var last = response.data;
        for (var i = 0; i < 10; i++) {
          var obj = last[i];

          console.log(obj.energyByHour);

          var energy = obj.energy;
          var energyBH = obj.energyByHour;
          var startTime = obj.startChargeDate;
          var endTime = obj.endChargeDate;
          var Hora = startTime.slice(11, 16);
          var Inicio = startTime.slice(0, 10);
          var TerminarHora = endTime.slice(11, 16);
          var cargad = obj.deviceId;
          date1 = new Date(startTime);
          date2 = new Date(endTime);
          diff = dateDiff(date1, date2);
          Time = diff.hour + "\th\t" + diff.min + "\tm\t" + diff.sec + "\ts"
          console.log(Time);



          if (energy === null && energyBH === null) {
            bot.sendMessage(message.chat.id, "\n" + langCode.cost + obj.cost + "€" + "\n\n" + langCode.energyy + "0", {

              "reply_markup": {
                "inline_keyboard": [
                  [
                    {
                      text: "🆘",
                      callback_data: "🆘",
                    },
                  ],
                ],
              },
            })

          }
          else {

            bot.sendMessage(message.chat.id, "\n" + langCode.Inicio + "\t\t" + Inicio + "\n\n" + langCode.Hora + "\t\t" + Hora + "\n\n" + langCode.Terminar + "\t\t" + Time + "\n\n" + langCode.cost + obj.cost + "\t€" + "\n\n" + langCode.energyy + obj.energy + "\tkWh" + "\n\n" + langCode.Cargador + cargad, {

              "reply_markup": {
                "inline_keyboard": [
                  [
                    {
                      text: "🆘",
                      callback_data: "🆘",
                    },
                  ],
                ],
              },
            })
          }

        }

      }, (error) => {

        console.log(error);
      });
      break;
    case "programacion":
      console.log("Intensity");
      axios.get('https://v2c.cloud/kong/v2c_service/device/reported??', {
        params: {
          "deviceId": CargaId

        },

        headers: {
          'Content-type': 'application/json',
          'apikey': auth
        }

      }).then((response) => {
        var min_start_1 = response.data.minutestart_00;
        var hour_start_1 = response.data.hourstart_00;
        var minuteend_1 = response.data.minuteend_00;
        var hour_end_1 = response.data.hourend_00;
        var min_start_2 = response.data.minutestart_01;
        var hour_start_2 = response.data.hourstart_01;
        var minuteend_2 = response.data.minuteend_01;
        var hour_end_2 = response.data.hourend_01;
        var daysofweek_2 = response.data.daysofweek_01;
        var daysofweek_1 = response.data.daysofweek_00;
        var daysOne = "";
        var daysTwo = "";

        if (min_start_1.length < 2) { min_start_1 = "0" + response.data.minutestart_00; } else console.log("NOt necessary");
        if (hour_start_1.length < 2) { hour_start_1 = "0" + response.data.hourstart_00; } else console.log("NOt necessary");
        if (minuteend_1.length < 2) { minuteend_1 = "0" + response.data.minuteend_00; } else console.log("NOt necessary");
        if (hour_end_1.length < 2) { hour_end_1 = "0" + response.data.hourend_00; } else console.log("NOt necessary");
        if (min_start_2.length < 2) { min_start_2 = "0" + response.data.minutestart_01; } else console.log("NOt necessary");
        if (hour_start_2.length < 2) { hour_start_2 = "0" + response.data.hourstart_01; } else console.log("NOt necessary");
        if (minuteend_2.length < 2) { minuteend_2 = "0" + response.data.minuteend_01; } else console.log("NOt necessary");
        if (hour_end_2.length < 2) { hour_end_2 = "0" + response.data.hourend_01; } else console.log("NOt necessary");
        if (daysofweek_1 != "8") {

          for (var i = 0; i < daysofweek_1.length; i++) {
            console.log(daysofweek_1[i]);
            if (daysofweek_1[i].includes('1')) { daysOne = daysOne + langCode.day1; }
            if (daysofweek_1[i].includes('2')) { daysOne = daysOne + langCode.day2; }
            if (daysofweek_1[i].includes('3')) { daysOne = daysOne + langCode.day3; }
            if (daysofweek_1[i].includes('4')) { daysOne = daysOne + langCode.day4; }
            if (daysofweek_1[i].includes('5')) { daysOne = daysOne + langCode.day5; }
            if (daysofweek_1[i].includes('6')) { daysOne = daysOne + langCode.day6; }
            if (daysofweek_1[i].includes('7')) { daysOne = daysOne + langCode.day7; }
          }
          console.log(daysOne);
          bot.sendMessage(message.chat.id, langCode.Timer1 + langCode.days + daysOne + "\n" + langCode.schedule + hour_start_1 + ":" + min_start_1 + langCode.scheduleOne + "\n" + hour_end_1 + ":" + minuteend_1 + "\t\t📅", {

            "reply_markup": {
              "inline_keyboard": [
                [
                  {
                    text: "🆘",
                    callback_data: "🆘",
                  },
                ],
              ],
            },
          });
        }
        else bot.sendMessage(message.chat.id, langCode.sTimer, {

          "reply_markup": {
            "inline_keyboard": [
              [
                {
                  text: "🆘",
                  callback_data: "🆘",
                },
              ],
            ],
          },
        });
        if (daysofweek_2 != "8") {


          for (var i = 0; i < daysofweek_2.length; i++) {
            console.log(daysofweek_2[i]);
            if (daysofweek_2[i].includes('1')) { daysTwo = daysTwo + langCode.day1; }
            if (daysofweek_2[i].includes('2')) { daysTwo = daysTwo + langCode.day2; }
            if (daysofweek_2[i].includes('3')) { daysTwo = daysTwo + langCode.day3; }
            if (daysofweek_2[i].includes('4')) { daysTwo = daysTwo + langCode.day4; }
            if (daysofweek_2[i].includes('5')) { daysTwo = daysTwo + langCode.day5; }
            if (daysofweek_2[i].includes('6')) { daysTwo = daysTwo + langCode.day6; }
            if (daysofweek_2[i].includes('7')) { daysTwo = daysTwo + langCode.day7; }
          }


          bot.sendMessage(message.chat.id, langCode.Timer2 + langCode.days + daysTwo + "\n" + langCode.schedule + hour_start_2 + ":" + min_start_2 + langCode.scheduleOne + "\n" + hour_end_2 + ":" + minuteend_2 + "\t\t📅", {

            "reply_markup": {
              "inline_keyboard": [
                [
                  {
                    text: "🆘",
                    callback_data: "🆘",
                  },
                ],
              ],
            },
          });
        } else bot.sendMessage(message.chat.id, langCode.ndTimer, {

          "reply_markup": {
            "inline_keyboard": [
              [
                {
                  text: "🆘",
                  callback_data: "🆘",
                },
              ],
            ],
          },
        });

      }, (error) => {
        console.log(error);
      });

      break;
    case "🆘":
      bot.sendMessage(message.chat.id, langCode.sos);
      break;

    default:
      console.log("no one");
  }

});


