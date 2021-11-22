const uuid2 = require('./uuid')
const {User} = require('../config/sequelize')
const userRegister = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  let username = ctx.query.username
  let password = ctx.query.password
  let res = await User.findAll({
    'where': {
      username: username
    }
  })
  if (res.length > 0) {
    ctx.body=JSON.stringify({
      code: 500,
      data: '用户名已被注册！'
    })
  } else {
    User.create({
      id: uuid2,
      username: username,
      password: password
    })
    ctx.body=JSON.stringify({
      code: 200,
      data: '您已成功注册！'
    })
  }
}
const userLogin = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  let username = ctx.query.username
  let password = ctx.query.password
  let res = await User.findAll({
    'where': {
      username: username,
      password: password
    }
  })
  if (res.length === 1) {
    ctx.body=JSON.stringify({
      code: 200,
      data: '您已成功登录'
    })
  } else if (res.length === 0) {
    ctx.body=JSON.stringify({
      code: 500,
      data: '用户名或密码错误'
    })
  } else if (res.length > 1) {
    ctx.body=JSON.stringify({
      code: 500,
      data: '您的账户可能存在问题，请联系管理员(dashuaibi)'
    })
  }
}

module.exports = {userRegister, userLogin}
