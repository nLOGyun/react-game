const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: '../test.sqlite',
})
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
})

module.exports = {User}
