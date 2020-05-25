module.exports =  async (ctx, next) => {
  const start = new Date().getTime();
  const data = await ctx.CityList.aggregate()
    .group({
      _id: {
        province: '$province',
        province_ad_code: '$province_ad_code'
      },
      all: ctx.$.push({
        city_en: '$city_en',
        city: '$city',
        district: '$district',
        district_en: '$district_en',
        province_en: '$province_en',
        province: '$province',
        lat: '$lat',
        lng: '$lng',
        cid: '$cid',
        city_ad_code: '$city_ad_code',
        district_ad_code: '$district_ad_code',
        province_ad_code: '$province_ad_code'
      })
    })
    .replaceRoot({
      newRoot: {
        province: '$_id.province',
        province_ad_code: '$_id.province_ad_code',
        city_list: '$all'
      }
    })
    .limit(1000)
    .end()
    const a = data.list.map(v => {
      let obj = {};
      let list = [];
      v.city_list.map((item, index) => {
        if(obj[item.city_ad_code]){
          list[obj[item.city_ad_code] - 1].district_list.push(item)
        }else{
          obj[item.city_ad_code] = index + 1;
          list[index] = {
            district_list: [item],
            city: item.city,
            city_ad_code: item.city_ad_code
          };
        }
      })
      return {
        province: v.province,
        province_ad_code: v.province_ad_code,
        city_list: list
      }
    })
    const time = new Date().getTime() - start;
    debugger
}