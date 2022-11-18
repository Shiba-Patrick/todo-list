const db = require('../../config/mongoose')
const Todo = require('../todo') // 載入 todo model

require('dotenv').config() //載入dotenv環境變數做使用:不然連結不上資料庫

//在執行成功時,做create建立資料
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})