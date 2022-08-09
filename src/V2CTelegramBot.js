const onToken = require("./handlers/onToken");
const onHelpHandler = require("./handlers/onHelp");
const onInfoHandler = require("./handlers/onInfo");
const onSetHandler = require("./handlers/onSet");
const onListHandler = require("./handlers/onList");
const onDevice = require("./handlers/onDevice");
const onCallBackQueryHandler = require("./callbacks/callbackQueryHandler");
const TelegramBot = require('node-telegram-bot-api');
const ES = require('./Dictionarys/ES');
const FR = require('./Dictionarys/FR');
const EN = require('./Dictionarys/EN');
global.languageCode = EN;

class V2CTelegramBot {


    constructor(telegramToken) {
        this.bot = new TelegramBot(telegramToken, { polling: true });
        this.setMenuCommands();
    }

    async onTokenHandler(msg, match) {

        let lang_code = msg.from.language_code;
        if (lang_code) {

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
        }

        var result = await onToken.onTokenHandler(this.bot, msg, match)
        if (result) {
            this.onListHandler(msg)
        }
    }

    async onDeviceHandler(msg, match) {
        let lang_code = msg.from.language_code;
        if (lang_code) {

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
        }
        return await onDevice.onDeviceHandler(this.bot, msg, match)
    }

    async onListHandler(msg) {
        let lang_code = msg.from.language_code;
        if (lang_code) {

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
        }
        return await onListHandler(this.bot, msg)
    }

    async onHelpHandler(msg) {
        let lang_code = msg.from.language_code;
        if (lang_code) {

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
        }
        return await onHelpHandler(this.bot, msg)
    }

    async onInfoHandler(msg) {
        let lang_code = msg.from.language_code;
        if (lang_code) {
            console.log(lang_code);
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
        }
        return await onInfoHandler(this.bot, msg)
    }

    async onSetHandler(msg) {
        let lang_code = msg.from.language_code;
        if (lang_code) {

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
        }
        return await onSetHandler(this.bot, msg)
    }

    async onCallBackQueryHandler(callbackQuery) {

        return onCallBackQueryHandler(this.bot, callbackQuery)
    }

    setMenuCommands() {
        this.bot.setMyCommands([
            { command: "/token", description: "Introduce el token" },
            { command: "/list", description: "Listame dispositivos" },
            { command: "/device", description: "Asigna un dispositivo para realizar operaciones" },
            { command: "/set", description: "Para modificar el estado o parametros" },
            { command: "/info", description: "Para obtener información" },
            { command: "/help", description: "Obtine Ayuda" }]);
    }

    async init() {
        this.setMenuCommands();
        this.bot.onText(/\/token ?(.+)?/, async (msg, match) => { this.onTokenHandler(msg, match) });
        this.bot.onText(/\/list/, async (msg) => { this.onListHandler(msg) });
        this.bot.onText(/\/help/, async (msg) => { this.onHelpHandler(msg) });
        this.bot.onText(/\/device ?(.+)?/, async (msg, match) => { this.onDeviceHandler(msg, match) });
        this.bot.onText(/\/info/, async (msg) => { this.onInfoHandler(msg) });
        this.bot.onText(/\/set/, async (msg) => { this.onSetHandler(msg) });
        this.bot.on('callback_query', (callbackQuery) => { this.onCallBackQueryHandler(callbackQuery) });
    }
}

module.exports = V2CTelegramBot