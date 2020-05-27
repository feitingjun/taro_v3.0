import Taro from '@tarojs/taro'
import QQMapWX from '@/utils/qqmap-wx-jssdk.min'
import { cloud_env } from '@/conf/index'

const QQMap = new QQMapWX({
  key: 'YQCBZ-AVAWS-R2POH-6XY5K-VNOKV-NWFBP'
})

const db = wx.cloud.database({
  env: cloud_env
})
const _ = db.command
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

export const getCity = async (keyword) => {
  const { data } = await CityList.where(_.or([{
    city: db.RegExp({
      regexp: '.*' + keyword,
      options: 'i',
    })
  },{
    city_en: db.RegExp({
      regexp: '.*' + keyword,
      options: 'i',
    })
  },{
    district: db.RegExp({
      regexp: '.*' + keyword,
      options: 'i',
    })
  },{
    district_en: db.RegExp({
      regexp: '.*' + keyword,
      options: 'i',
    })
  },{
    cid: db.RegExp({
      regexp: '.*' + keyword,
      options: 'i',
    })
  }])).get()
  const list = []
  const map = new Map()
  data.map(v => {
    if(v.city == v.district){
      v.city = ''
    }
    if(!map.has(v.district)){
      map.set(v.district, true)
      list.push(v)
    }
  })
  return list
}

function getAdcode (res) {
  return new Promise((resolve, reject) => {
    QQMap.reverseGeocoder({
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