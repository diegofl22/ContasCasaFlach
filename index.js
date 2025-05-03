// index.js

// 1. Carregar variáveis do .env logo no início
require('dotenv').config();

// 2. Importar bibliotecas
const TelegramBot = require('node-telegram-bot-api');
const { google } = require('googleapis');
const fs = require('fs');

// 3. Inicializar o bot do Telegram
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// 4. Conectar ao Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(fs.readFileSync('credentials.json')),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

// 5. Comando básico: Start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '🤖 Olá! Eu sou o seu Bot Financeiro! Use /menu para começar.');
});

// 6. Comando básico: Menu
bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      keyboard: [
        ['/lancar', '/editar'],
        ['/excluir', '/saldo'],
        ['/relatorio']
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  };
  bot.sendMessage(chatId, '📋 Escolha uma opção:', opts);
});

// Observação:
// Abaixo desse ponto, a gente ainda vai adicionar os fluxos completos de /lancar, /editar, /excluir, /saldo e /relatorio.
