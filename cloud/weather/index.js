// 云函数入口文件
const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router');

const now = require('./routes/now');
const forecast = require('./routes/forecast');

const ENV = 'development-y2j06' || cloud.DYNAMIC_CURRENT_ENV

cloud.init({
  env: ENV
})
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })
  const wxContext = cloud.getWXContext()

  app.router('now', now)

  app.router('forecast', forecast)

  return app.serve()
}