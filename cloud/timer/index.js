// 云函数入口文件
const cloud = require('wx-server-sdk')
const ENV = 'development-y2j06' || cloud.DYNAMIC_CURRENT_ENV
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
  for(let i=0; i<total; i+=1000){
    SubscriptionList.skip(i).limit(1000).get().then(({ data }) => {
      data.map(v => {
        if(v['KPi8hRKfk0LJsADB3aCzJ8LyI0UCaVdcPCG9026di7E']){
          cloud.openapi.templateMessage.send({
            touser: v.openid,
            templateId: 'KPi8hRKfk0LJsADB3aCzJ8LyI0UCaVdcPCG9026di7E',
            page: 'pages/weather',
            miniprogramState: 'developer',
            data: {
              
            }
          })
        }
      })
    })
  }
}