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
    return {
      angle: 0,
      name: '南风'
    }
  }else if(num == 1){
    return {
      angle: 225,
      name: '东北风'
    }
  }else if(num == 2){
    return {
      angle: 270,
      name: '东风'
    }
  }else if(num == 3){
    return {
      angle: 315,
      name: '东南风'
    }
  }else if(num == 4){
    return {
      angle: 0,
      name: '南风'
    }
  }else if(num == 5){
    return {
      angle: 45,
      name: '西南风'
    }
  }else if(num == 6){
    return {
      angle: 90,
      name: '西风'
    }
  }else if(num == 7){
    return {
      angle: 135,
      name: '西北风'
    }
  }else if(num == 8){
    return {
      angle: 180,
      name: '北风'
    }
  }
}