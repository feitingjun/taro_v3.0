const rp = require('request-promise');
const cheerio = require('cheerio');
const { getToday, getAqi, getHourly, getForecast7d } = require('./getToday');

module.exports = async (ctx, next) => {
  let { cid, location, adcode } = ctx._req.event;
  if(!cid && !location && !adcode){
    ctx.body = {
      code: 0,
      message: '缺少必要参数，cid、location、adcode必须存在一项'
    }
  }
  let basic = {};
  if(!cid){
    if(location){
      const data = await rp({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${location.lat},${location.lng}&key=YQCBZ-AVAWS-R2POH-6XY5K-VNOKV-NWFBP`,
        json: true
      })
      if(data.status == 0){
        adcode = data.result.ad_info.adcode;
      }else{
        ctx.body = {
          code: 0,
          message: `调用腾讯地图api错误。message: ${data.message}`
        }
      }
    }
    const item = await ctx.CityList.where({ district_ad_code: adcode }).get();
    if(item.data[0]){
      basic = item.data[0];
      cid = item.data[0].cid;
    }else{
      ctx.body = { code: 0, message: '未查询到城市信息' }
    }
  }else{
    const item = await ctx.CityList.where({ cid }).get();
    if(item.data[0]){
      basic = item.data[0]
    }else{
      ctx.body = { code: 0, message: '未查询到城市信息' }
    }
  }

  const values = await Promise.all([
    getToday(cid), getAqi(cid), getHourly(cid), getForecast7d(cid)
  ]) 
  const data = {
    ...values[0], 
    aqi: values[1],
    ...values[2],
    forecast7d: values[3],
    basic
  }
  ctx.body = {
    code: 1, data
  }
}