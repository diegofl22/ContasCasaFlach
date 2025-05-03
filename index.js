// Importações
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { google } = require('googleapis');
const fs = require('fs');

// Carregar credenciais do Google
const credentials = require('./credentials.json');

// Configurar Telegram Bot
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Função para autenticar no Google Sheets
function authenticateGoogle() {
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return auth;
}

// Função para acessar a planilha
async function getSheet() {
    const auth = authenticateGoogle();
    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
}

// Comando /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Olá! Eu sou o Bot ContasCasa! Use /menu para começar.");
});

// Comando /menu
bot.onText(/\/menu/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            keyboard: [
                [{ text: "/lancar" }, { text: "/saldo" }],
                [{ text: "/relatorio" }, { text: "/editar" }, { text: "/excluir" }]
            ],
            resize_keyboard: true,
            one_time_keyboard: false,
        },
    };
    bot.sendMessage(chatId, "Escolha uma opção:", options);
});

// Fallback para mensagens não reconhecidas
bot.on('message', (msg) => {
    if (!msg.text.startsWith('/')) {
        bot.sendMessage(msg.chat.id, "Por favor, use o menu ou comandos disponíveis. 🚀");
    }
});

// Placeholder para os próximos comandos
bot.onText(/\/lancar/, (msg) => {
    bot.sendMessage(msg.chat.id, "📝 Em breve: função de lançar despesas!");
});

bot.onText(/\/saldo/, (msg) => {
    bot.sendMessage(msg.chat.id, "💵 Em breve: função de ver saldo!");
});

bot.onText(/\/relatorio/, (msg) => {
    bot.sendMessage(msg.chat.id, "📄 Em breve: função de gerar relatório!");
});

bot.onText(/\/editar/, (msg) => {
    bot.sendMessage(msg.chat.id, "✏️ Em breve: função de editar lançamentos!");
});

bot.onText(/\/excluir/, (msg) => {
    bot.sendMessage(msg.chat.id, "❌ Em breve: função de excluir lançamentos!");
});
