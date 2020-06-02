const rp = require('request-promise');
const cheerio = require('cheerio');
const { getToday } = require('./getToday');

module.exports = async (ctx, next) => {
  const { cid } = ctx._req.event;
  let basic;
  const item = await ctx.CityList.where({ cid }).get();
  if(item.data[0]){
    basic = item.data[0]
  }else{
    ctx.body = { code: 0, message: '未查询到城市信息' }
  }
  const data = await getToday(cid);
  ctx.body = {
    code: 1,
    data: {
      weatherinfo: data.cityDZ.weatherinfo, 
      dataZS: data.dataZS,
      basic
    }
  }
}