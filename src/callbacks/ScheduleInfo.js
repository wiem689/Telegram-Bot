const api = require("../api");


async function ScheduleInfoCallback(bot, callbackqueryId, msg, token, deviceId) {

    var scheduleInfo = await api.programacion(token, deviceId);

    if (scheduleInfo) {
        onSuccess(bot, callbackqueryId, msg, scheduleInfo);
    } else {
        onError(bot, callbackqueryId, msg);
    }


}

function onError(bot, callbackqueryId, msg) {
    // var languageCode = getLanguage(msg)
    bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, languageCode.ErrorOperation));
}

function onSuccess(bot, callbackqueryId, msg, scheduleInfo) {

    bot.answerCallbackQuery(callbackqueryId).then(() => {

        console.log(scheduleInfo);
        var min_start_1 = scheduleInfo.minutestart_00;
        var hour_start_1 = scheduleInfo.hourstart_00;
        var minuteend_1 = scheduleInfo.minuteend_00;
        var hour_end_1 = scheduleInfo.hourend_00;
        var min_start_2 = scheduleInfo.minutestart_01;
        var hour_start_2 = scheduleInfo.hourstart_01;
        var minuteend_2 = scheduleInfo.minuteend_01;
        var hour_end_2 = scheduleInfo.hourend_01;
        var daysofweek_2 = "7";
        var daysofweek_1 = "1";
        var daysOne = "";
        var daysTwo = "";

        if (min_start_1.length < 2) { min_start_1 = "0" + scheduleInfo.minutestart_00; } else console.log("NOt necessary");
        if (hour_start_1.length < 2) { hour_start_1 = "0" + scheduleInfo.hourstart_00; } else console.log("NOt necessary");
        if (minuteend_1.length < 2) { minuteend_1 = "0" + scheduleInfo.minuteend_00; } else console.log("NOt necessary");
        if (hour_end_1.length < 2) { hour_end_1 = "0" + scheduleInfo.hourend_00; } else console.log("NOt necessary");
        if (min_start_2.length < 2) { min_start_2 = "0" + scheduleInfo.minutestart_01; } else console.log("NOt necessary");
        if (hour_start_2.length < 2) { hour_start_2 = "0" + scheduleInfo.hourstart_01; } else console.log("NOt necessary");
        if (minuteend_2.length < 2) { minuteend_2 = "0" + scheduleInfo.minuteend_01; } else console.log("NOt necessary");
        if (hour_end_2.length < 2) { hour_end_2 = "0" + scheduleInfo.hourend_01; } else console.log("NOt necessary");
        if (daysofweek_1 != "8") {

            for (var i = 0; i < daysofweek_1.length; i++) {
                console.log(daysofweek_1[i]);
                if (daysofweek_1[i].includes('1')) { daysOne = daysOne + languageCode.day1; }
                if (daysofweek_1[i].includes('2')) { daysOne = daysOne + languageCode.day2; }
                if (daysofweek_1[i].includes('3')) { daysOne = daysOne + languageCode.day3; }
                if (daysofweek_1[i].includes('4')) { daysOne = daysOne + languageCode.day4; }
                if (daysofweek_1[i].includes('5')) { daysOne = daysOne + languageCode.day5; }
                if (daysofweek_1[i].includes('6')) { daysOne = daysOne + languageCode.day6; }
                if (daysofweek_1[i].includes('7')) { daysOne = daysOne + languageCode.day7; }
            }
            console.log(daysOne);
            bot.sendMessage(msg.chat.id, languageCode.Timer1 + languageCode.days + daysOne + "\n" + languageCode.schedule + hour_start_1 + ":" + min_start_1 + languageCode.scheduleOne + "\n" + hour_end_1 + ":" + minuteend_1 + "\t\t📅", {

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
        else bot.sendMessage(msg.chat.id, languageCode.sTimer, {

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
                if (daysofweek_2[i].includes('1')) { daysTwo = daysTwo + languageCode.day1; }
                if (daysofweek_2[i].includes('2')) { daysTwo = daysTwo + languageCode.day2; }
                if (daysofweek_2[i].includes('3')) { daysTwo = daysTwo + languageCode.day3; }
                if (daysofweek_2[i].includes('4')) { daysTwo = daysTwo + languageCode.day4; }
                if (daysofweek_2[i].includes('5')) { daysTwo = daysTwo + languageCode.day5; }
                if (daysofweek_2[i].includes('6')) { daysTwo = daysTwo + languageCode.day6; }
                if (daysofweek_2[i].includes('7')) { daysTwo = daysTwo + languageCode.day7; }
            }


            bot.sendMessage(msg.chat.id, languageCode.Timer2 + languageCode.days + daysTwo + "\n" + languageCode.schedule + hour_start_2 + ":" + min_start_2 + languageCode.scheduleOne + "\n" + hour_end_2 + ":" + minuteend_2 + "\t\t📅", {

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
        else bot.sendMessage(msg.chat.id, languageCode.ndTimer, {

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



}

module.exports = ScheduleInfoCallback;