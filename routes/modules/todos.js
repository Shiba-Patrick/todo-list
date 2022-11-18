// 引用 Express 與 Express 路由器 及 Todo model
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

//Read(查詢全部) GET/todos/new 
router.get('/new', (req, res) => {
  return res.render('new')
})

//Create  新增一筆資料的/POST/todos
router.post('/', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//Read(查詢單筆) 瀏覽特定資料的路由,於detail頁面  /todos/:id
router.get('/:id', (req, res) => {
  const id = req.params.id  //運用params
  return Todo.findById(id) // 找出資料庫資料
    .lean() //將資料轉換成js物件
    .then(todo => res.render('detail', { todo })) //將資料送給前端模板
    .catch(error => console.log(error))
})

//Read 瀏覽特定資料的路由,於edit頁面  /todos/:id/edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id  //運用params
  return Todo.findById(id) // 找出資料庫資料
    .lean() //將資料轉換成js物件
    .then(todo => res.render('edit', { todo })) //將資料送給前端模板
    .catch(error => console.log(error))
})

//update  接收edit頁面的POST
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body //結構賦值

  return Todo.findById(id) // 找出資料庫資料
    .then(todo => { //如果查詢成功,修改後重新儲存資料
      todo.name = name
      todo.isDone = isDone === 'on' //只是true or false 故縮寫
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`)) //如果儲存成功,導向回單筆資料頁面
    .catch(error => console.log(error))
})

//delete 新增刪除的路由
router.delete('/:id', (req, res) => {
  const id = req.params.id   //取得網址上的識別碼，用來查詢使用者想刪除的 To-do。
  return Todo.findById(id)   //查詢資料，資料庫查詢成功以後，會把資料放進 todo
    .then(todo => todo.remove())  //刪除這筆資料
    .then(() => res.redirect('/'))  //redirect重新呼叫首頁
    .catch(error => console.log(error))
})

// 準備引入路由模組
module.exports = router