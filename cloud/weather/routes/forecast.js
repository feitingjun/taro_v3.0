const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports =  async (ctx, next) => {
  const { cid } = ctx._req.event;
  const str = await rp({
    url: `http://d1.weather.com.cn/weather_index/${cid}.html?_=${new Date().getTime()}`,
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Connection': 'keep-alive',
      'Host': 'd1.weather.com.cn',
      'Referer': `http://www.weather.com.cn/weather/${cid}.shtml`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36'
    }
  })
  eval(str)
  debugger
  const data = {
    cityDZ, alarmDZ, dataZS, fc, dataSK
  }
}