const mongoose = require('mongoose') //載入mongoose model

//env環境變數設定
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//資料庫聯結及設定
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

//連線成功:一次性
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db