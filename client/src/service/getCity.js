import Taro from '@tarojs/taro'
import QQMapWX from '@/utils/qqmap-wx-jssdk.min'
import { cloud_env } from '@/conf/index'

const Map = new QQMapWX({
  key: 'YQCBZ-AVAWS-R2POH-6XY5K-VNOKV-NWFBP'
})

const db = wx.cloud.database({
  env: cloud_env
})
const _ = db.command;
const $ = db.command.aggregate
const CityList = db.collection('city_list')

export const getCurrentCity = async () => {
  const res = await Taro.getLocation({ type: 'wgs84' })
  const adcode = await getAdcode(res)
  const { data } = await CityList.where({ district_ad_code: adcode }).get()
  if(data.length>0){
    return data[0]
  }else{
    return false
  }
}

export const getAllCity = async () => {
  const { list } = await CityList.aggregate()
  .group({
    _id: $.substrCP(['$city_en', 0, 1]),
    all: $.push({
      city_en: '$city_en',
      city: '$city',
      // city_ad_code: '$city_ad_code',
      district: '$district',
      // district_en: '$district_en',
      // district_ad_code: '$district_ad_code',
      // province_en: '$province_en',
      // province: '$province',
      // province_ad_code: '$province_ad_code',
      // lat: '$lat',
      // lng: '$lng',
      cid: '$cid',
      name: $.concat(['$district', '-', '$city'])
    })
  })
  .replaceRoot({
    newRoot: {
      title: $.toUpper('$_id'),
      key: $.toUpper('$_id'),
      items: $.filter({
        input: '$all',
        cond: $.not($.eq(['$$this.district', '$$this.city']))
      })
    }
  })
  .sort({
    key: 1
  })
  .limit(100)
  .end()
  const data = list.map(v => {
    v.items.sort((a,b) => a.cid - b.cid)
    return v
  })
  return data
}

function getAdcode (res) {
  return new Promise((resolve, reject) => {
    Map.reverseGeocoder({
      location: {
        latitude: res.latitude,
        longitude: res.longitude,
        coord_type: 2
      },
      success: data => {
        resolve(data.result.ad_info.adcode)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}