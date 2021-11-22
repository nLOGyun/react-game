const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router')
const router = new Router()
const {userRegister, userLogin} = require("./serve/method/method")

router.get('/', ctx => {
  ctx.body = '哈哈哈'
})

router.get('/user/register', ctx => userRegister(ctx))
router.get('/user/login', ctx => userLogin(ctx))

router.post('/post', ctx => {
  ctx.body = '哈哈哈post'
})

router.all('/all', ctx => {
  ctx.body = '哈哈哈all'
})

app.use(router.routes())

app.listen(3001, () => {
  console.log('服务器已启动，http://localhost:3001')
});
