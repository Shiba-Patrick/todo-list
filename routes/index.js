// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 home & todos 模組程式碼
const home = require('./modules/home')
const todos = require('./modules/todos')

// 將網址結構符合 / 字串的 request 導向 home&todos 模組 
router.use('/', home)
router.use('/todos',todos)

// 準備引入路由模組
module.exports = router