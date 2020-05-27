// 云函数入口文件
const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router');

const now = require('./routes/now');
const forecast = require('./routes/forecast');
const getAllCity = require('./routes/getAllCity');
const getMweather15d = require('./routes/mweather15d');

const ENV = 'development-y2j06' || cloud.DYNAMIC_CURRENT_ENV

cloud.init({
  env: ENV
})
cloud.init()
const db = cloud.database();
const CityList = db.collection('city_list');
const _ = db.command;
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })
  const wxContext = cloud.getWXContext()
  app.use(async (ctx, next) => {
    // ctx.cloud = cloud;
    // ctx.db = db;
    ctx.CityList = CityList;
    ctx._ = _;
    ctx.$ = $;
    await next();
  })
  app.router('now', now)

  app.router('forecast', forecast)
  app.router('getAllCity', getAllCity)
  app.router('mweather15d', getMweather15d)

  return app.serve()
}