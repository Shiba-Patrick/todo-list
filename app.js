const express = require('express')
const express_hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes') // 將 request 導入路由器
require('./config/mongoose') //引用mongoose設定檔
const port = process.env.port || 3000 //建立heroku環境變數
const app = express()

//setting handlebars 
app.engine('hbs', express_hbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
//setting method-override
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

//監聽app進行
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})