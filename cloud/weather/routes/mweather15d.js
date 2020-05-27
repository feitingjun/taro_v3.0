const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports =  async (ctx, next) => {

  const { cid } = ctx._req.event;
  const html = await rp({
    url: `https://m.weather.com.cn/mweather15d/${cid}.shtml`
  })
  const $ = cheerio.load(html);
  const li = $('#listBox .list-ul li');
  const data = li.map((i, v) => {
    const item = $(v);
    const code_d = item.find('.list-right>p').eq(1).find('i').attr('class').split(' ');
    const code_n = item.find('.list-right>p').eq(2).find('i').attr('class').split(' ');
    debugger
    const aqi_lave = item.find('.list-right-aqi .aqi span').first().attr('class').split(' ');
    debugger
    return {
      week: item.find('.week').text(),
      date: item.find('.date').text(),
      weather_d: item.find('.list-right>p').eq(1).find('.weatherWord').text(),
      weather_n: item.find('.list-right>p').eq(2).find('.weatherWord').text(),
      code_d: code_d[2] && code_d[2].substr(1),
      code_n: code_n[2] && code_n[2].substr(1),
      temp_d: parseInt(item.find('.list-right>p').eq(1).find('.d-temp').text()),
      temp_n: parseInt(item.find('.list-right>p').eq(2).find('.n-temp').text()),
      wd_d: item.find('.list-right-wind .windD img').first().attr('class').substr(1),
      wd_n: item.find('.list-right-wind .windD img').last().attr('class').substr(1),
      ws_d: item.find('.list-right-wind .windS span').first().text(),
      ws_d: item.find('.list-right-wind .windS span').last().text(),
      aqi_lave: aqi_lave[1] && aqi_lave[1].substr(3),
      aqi_txt: item.find('.list-right-aqi .aqi span').last().text()
    }
  })
  debugger
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