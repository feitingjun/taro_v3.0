const rp = require('request-promise');

// 获取当日天气情况
module.exports = async (cid) => {
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