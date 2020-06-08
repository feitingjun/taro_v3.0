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
    const alarm = res.alarmDZ.w;
    if(v.list.indexOf('KPi8hRKfk0LJsADB3aCzJ8LyI0UCaVdcPCG9026di7E')>-1){
      await cloud.openapi.subscribeMessage.send({
        touser: v.openid,
        templateId: 'KPi8hRKfk0LJsADB3aCzJ8LyI0UCaVdcPCG9026di7E',
        page: `pages/weather/index/index?cid=${v.cid}`,
        miniprogramState: 'developer',
        data: {
          date1: { value: info.fctime.substring(0, 4) + '-' + info.fctime.substring(4, 6) + '-' + info.fctime.substring(6, 8) },
          phrase2: { value: v.district },
          phrase3: { value: info.weather },
          thing5: { value: `${info.weather}，${info.tempn}~${info.temp}，${dataZS.ys.hint}` },
          character_string4: { value: info.tempn + '~' + info.temp }
        }
      }).catch(() => {})
    }
    if(v.list.indexOf('jML3TpZAj9NhSZqkBxTp2QS_vTbbsVQ6ZYUs95M49hI')>-1){
      let type=[], grade=[], area=[],time=[],content=[];
      alarm.map(v => {
        type.push(v.w5);
        grade.push(v.w7);
        area.push(v.w2);
        time.push(v.w8);
        content.push(v.w13);
      })
      await cloud.openapi.subscribeMessage.send({
        touser: v.openid,
        templateId: 'jML3TpZAj9NhSZqkBxTp2QS_vTbbsVQ6ZYUs95M49hI',
        page: `pages/weather/index/index?cid=${v.cid}`,
        miniprogramState: 'developer',
        data: {
          phrase3: { value: type.join('，') },
          phrase4: { value: grade.join('，') },
          thing2: { value: area.join('，') },
          date5: { value: time.join('，') },
          thing1: { value: content.join('，') }
        }
      }).catch(() => {})
    }
  })
}