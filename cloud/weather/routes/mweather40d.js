const rp = require('request-promise');

module.exports =  async (ctx, next) => {
  const { cid } = ctx._req.event;

  const data = await  rp({
    url: `https://d1.weather.com.cn/wap40/${cid}.html?_=${new Date().getTime()}`,
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Connection': 'keep-alive',
      'Host': 'd1.weather.com.cn',
      'Referer': `https://m.weather.com.cn/mweather40d/index.shtml?${cid}`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36'
    }
  })
  eval(data)
  ctx.body = {
    code: 1,
    data: {
      ...wap40
    }
  }
}