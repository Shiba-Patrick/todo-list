// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Todo model
const Todo = require('../../models/todo')

// 定義首頁路由:把 app.get 改成 router.get
router.get('/', (req, res) => {
  //拿到全部的資料:
  Todo.find() //搜尋資料庫的資料
    .lean() //將資料轉換成js物件
    .sort({ _id: 'asc' }) //{排序依據的參數:asc:正像排序,desc:反向排序}
    .then(todos => res.render('index', { todos }))
    //接下來的指令 {todos:todos} 相同可省略成一個
    .catch(error => {
      console.log(error) //錯誤提示
    })
})

// 匯出路由模組
module.exports = router