const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports =  async (ctx, next) => {

  const { cid } = ctx._req.event;
  const values = await  Promise.all([
    rp({
      url: `https://m.weather.com.cn/mweather15d/${cid}.shtml`
    }),
    rp({
      url: `https://d1.weather.com.cn/wap15/${cid}.html?_=${new Date().getTime()}`,
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Connection': 'keep-alive',
        'Host': 'd1.weather.com.cn',
        'Referer': `https://m.weather.com.cn/mweather15d/${cid}.shtml`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36'
      }
    })
  ])
  const $ = cheerio.load(values[0]);
  const li = $('#listBox .list-ul li');
  const data = [];
  li.map((i, v) => {
    const item = $(v);
    const code_d = item.find('.list-right>p').eq(0).find('i').attr('class').split(' ');
    const code_n = item.find('.list-right>p').eq(1).find('i').attr('class').split(' ');
    data.push({
      week: item.find('.week').text(),
      date: item.find('.date').text(),
      weather_d: item.find('.list-right>p').eq(0).find('.weatherWord').text(),
      weather_n: item.find('.list-right>p').eq(1).find('.weatherWord').text(),
      code_d: code_d[2] && code_d[2].substr(1),
      code_n: code_n[2] && code_n[2].substr(1),
      temp_d: parseInt(item.find('.list-right>p').eq(0).find('.d-temp').text()),
      temp_n: parseInt(item.find('.list-right>p').eq(1).find('.n-temp').text()),
      wd_d: handleAngle(item.find('.list-right-wind .windD img').first().attr('class').substr(1)),
      wd_n: handleAngle(item.find('.list-right-wind .windD img').last().attr('class').substr(1)),
      ws_d: item.find('.list-right-wind .windS span').first().text(),
      ws_n: item.find('.list-right-wind .windS span').last().text()
    })
  })
  eval(values[1])
  ctx.body = {
    code: 1,
    data: {
      data, wap15
    }
  }
}

function handleAngle(num){
  if(num == 0){
    // return 0
    return '南风'
  }else if(num == 1){
    // return 225
    return '东北风'
  }else if(num == 2){
    // return 270
    return '东风'
  }else if(num == 3){
    // return 315
    return '东南风'
  }else if(num == 4){
    // return 315
    return '南风'
  }else if(num == 5){
    // return 45
    return '西南风'
  }else if(num == 6){
    // return 90
    return '西风'
  }else if(num == 7){
    // return 135
    return '西北风'
  }else if(num == 8){
    // return 180
    return '北风'
  }
}