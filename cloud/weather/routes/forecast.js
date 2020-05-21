const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports =  async (ctx, next) => {
  const { cid } = ctx._req.event;
  // const cid = '101270101'
  const values = await Promise.all([
    rp({
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
    }),
    rp({
      url: `https://apip.weatherdt.com/plugin/data?key=ZrI68ruCOx&location=${cid}`,
      json: true
    }),
    rp({
      url: `http://www.weather.com.cn/weather1d/${cid}.shtml`
    }),
    rp({
      url: `http://www.weather.com.cn/weather/${cid}.shtml`
    })
  ]) 
  eval(values[0]);
  const aqi = values[1].aqi;
  const $ = cheerio.load(values[2]);

  // 获取当日及未来7天二十四时预报
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

  // 获取七天预报
  const $1 = cheerio.load(values[3]);
  const ul = $1('#7d>ul.clearfix li')
  let forecast7d = [];
  ul.map((i, v) => {
    var T = $1(v).find('h1').text();
    var index = T.indexOf('（');
    var code_d = $1(v).find('big').first().attr('class').split(' ');
    var code_n = $1(v).find('big').last().attr('class').split(' ');
    forecast7d.push({
      time: T.substring(0, index),
      time_txt: T.substring(index + 1, T.length-1),
      code_d: code_d[1] && code_d[1].substr(1),
      code_n: code_n[1] && code_n[1].substr(1),
      weather: $1(v).find('.wea').text(),
      tem_max: parseInt($1(v).find('.tem span').text()),
      tem_min: parseInt($1(v).find('.tem i').text()),
      wd_d: $1(v).find('.win em span').first().attr('title'),
      wd_n: $1(v).find('.win em span').last().attr('title'),
      ws: $1(v).find('.win i').text()
    })
  })
  const data = {
    cityDZ, alarmDZ, dataZS, fc, dataSK, aqi, hour3data, 
    observe24h: {
      data: od,
      updateTime: observe24h_data.od.od0
    },
    forecast7d
  }
  ctx.body = data
}

function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}

function handleAqiTxt(aqi) {
  if(aqi <= 50){
    return '优'
  }else if(aqi > 50 && aqi <= 100){
    return '良'
  }else if(aqi > 100 && aqi <= 150){
    return '轻度污染'
  }else if(aqi > 151 && aqi <= 200){
    return '中度污染'
  }else if(aqi > 201 && aqi <= 300){
    return '重度污染'
  }else if(aqi > 300){
    return '严重污染'
  }
}