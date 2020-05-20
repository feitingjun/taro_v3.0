// 云函数入口文件
const cloud = require('wx-server-sdk');
const rp = require('request-promise');
const cheerio = require('cheerio');
const TcbRouter = require('tcb-router');

const ENV = 'development-y2j06' || cloud.DYNAMIC_CURRENT_ENV

cloud.init({
  env: ENV
})
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })
  const wxContext = cloud.getWXContext()

  app.use('now', async (ctx, next) => {
    
    const { lat, lng } = ctx._req.event;

    const data = await rp({ //实况天气
      url: 'https://free-api.heweather.net/s6/weather/now',
      qs: {
        location: `${lng},${lat}`,
        key: '1ab3fefc15a74cf8a5897b77b41ffb28'
      },
      json: true
    })
    const cid = data.HeWeather6[0].basic.cid.replace(/[^0-9]/ig,"");
    const html = await rp({
      url: `http://www.weather.com.cn/weather1d/${cid}.shtml`
    })
    const aa = await rp({
      url: `http://d1.weather.com.cn/sk_2d/${cid}.html?_=${new Date().getTime()}`,
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Connection': 'keep-alive',
        'Host': 'd1.weather.com.cn',
        'Referer': `http://www.weather.com.cn/weather1d/${cid}.shtml`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36'
      }
    })
    let values = await rp({
      url: `https://apip.weatherdt.com/plugin/data?key=ZrI68ruCOx&location=${cid}`,
      json: true
    })
    ctx.body = values
  })

  return app.serve()
}