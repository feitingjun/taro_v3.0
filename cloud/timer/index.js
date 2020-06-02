// 云函数入口文件
const cloud = require('wx-server-sdk')
const ENV = 'development-y2j06' || cloud.DYNAMIC_CURRENT_ENV
const getToday = require('./getToday')

cloud.init({
  env: ENV
})
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const SubscriptionList = db.collection('subscription_list');
  const res = await SubscriptionList.count();
  const total = res.total;
  let allData = [];
  for(let i=0; i<total; i+=100){
    const { data } = await SubscriptionList.skip(i).limit(100).get();
    allData = [...allData, ...data]
  }
  allData.map(async v => {
    const res = await getToday(v.cid)
    const info = res.cityDZ.weatherinfo;
    const dataZS = res.dataZS;
    if(v.list.indexOf('KPi8hRKfk0LJsADB3aCzJ8LyI0UCaVdcPCG9026di7E')>-1){
      const result = await cloud.openapi.subscribeMessage.send({
        touser: v.openid,
        templateId: 'KPi8hRKfk0LJsADB3aCzJ8LyI0UCaVdcPCG9026di7E',
        page: `pages/weather/index?cid=${v.cid}`,
        miniprogramState: 'developer',
        data: {
          date1: { value: info.fctime.substring(0, 4) + '-' + info.fctime.substring(4, 6) + '-' + info.fctime.substring(6, 8) },
          phrase2: { value: v.district },
          phrase3: { value: info.weather },
          thing5: { value: `今日天气${info.weather}，温度${info.tempn}~${info.temp}，${dataZS.ys.hint}` },
          character_string4: { value: info.tempn + '~' + info.temp }
        }
      })
    }
  })
}