const rp = require('request-promise');
const cheerio = require('cheerio');

// 获取当日天气情况
const getToday = async (cid) => {
  const data = await rp({
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
  eval(data);
  var zs = {};
  for(var key in dataZS.zs){
    var index = key.indexOf('_');
    var str = key.substr(0, index);
    if(!zs[str] && str){
      zs[str] = {
        name: dataZS.zs[`${str}_name`],
        desc: dataZS.zs[`${str}_des_s`],
        hint: dataZS.zs[`${str}_hint`]
      }
    }
  }
  return {
    cityDZ, alarmDZ, dataZS: zs, fc, dataSK
  }
}

// 获取当日aqi
const getAqi = async (cid) => {
  const data = await rp({
    url: `https://apip.weatherdt.com/plugin/data?key=ZrI68ruCOx&location=${cid}`,
    json: true
  })
  return data.aqi;
}

// 获取当日及未来7天24小时天气信息和过去24小时空气质量，温度，降水量，风力风向
const getHourly = async (cid) => {
  const data = await rp({
    url: `http://www.weather.com.cn/weather1d/${cid}.shtml`
  })
  const $ = cheerio.load(data);
  eval($('#curve').next()[0].children[0].data);
  const d1 = hour3data['1d'].map(item => {
    item = item.split(',');
    return {
      time: item[0],
      weathercode: item[1],
      weather: item[2],
      temp: item[3],
      wd: item[4],
      sc: item[5],
      ws: item[6] + '级'
    }
  });
  const d7 = hour3data['7d'].map((vv => {
    return vv.map((item=item.split(',')) => {
      item = item.split(',');
      return {
        time: item[0],
        weathercode: item[1],
        weather: item[2],
        temp: item[3],
        wd: item[4],
        ws: item[5],
        // sc: item[6] + '级'
      }
    })
  }))
  hour3data = { '1d': d1, '7d': d7};

  // 获取过去24时空气质量，温度，降水量，风力风向
  eval($('#weatherChart').prev()[0].children[0].data);
  const od = observe24h_data.od.od2.map(v => ({
    hour: v.od21,
    temp: v.od22,
    ws: v.od25 + '级',
    wd: v.od24,
    jsl: v.od26 + 'mm',
    sd: v.od27 + '%',
    aqi: v.od28,
    m: v.od23
  }))

  return {
    hour3data, 
    observe24h: {
      data: od,
      updateTime: observe24h_data.od.od0
    },
  }
}

// 获取7天预告
const getForecast7d = async (cid) => {
  const data = await rp({
    url: `http://www.weather.com.cn/weather/${cid}.shtml`
  })
  const $ = cheerio.load(data);
  const ul = $('#7d>ul.clearfix li')
  let forecast7d = [];
  ul.map((i, v) => {
    var T = $(v).find('h1').text();
    var index = T.indexOf('（');
    var code_d = $(v).find('big').first().attr('class').split(' ');
    var code_n = $(v).find('big').last().attr('class').split(' ');
    forecast7d.push({
      time: T.substring(0, index),
      time_txt: T.substring(index + 1, T.length-1),
      code_d: code_d[1] && code_d[1].substr(1),
      code_n: code_n[1] && code_n[1].substr(1),
      weather: $(v).find('.wea').text(),
      tem_max: parseInt($(v).find('.tem span').text()),
      tem_min: parseInt($(v).find('.tem i').text()),
      wd_d: $(v).find('.win em span').first().attr('title'),
      wd_n: $(v).find('.win em span').last().attr('title'),
      ws: $(v).find('.win i').text()
    })
  })
  return forecast7d;
}

module.exports = {
  getToday: getToday, 
  getAqi: getAqi, 
  getHourly: getHourly, 
  getForecast7d: getForecast7d
}