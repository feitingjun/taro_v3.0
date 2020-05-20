import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { AtIcon } from 'taro-ui'

import { getWeather } from '@/service/weather'
import QQMapWX from '@/utils/qqmap-wx-jssdk.min';
import { cloud_img } from '@/conf/index'
import location from '@/images/location.png'
import Loadimg from '@/images/loading.gif'
import styles from './index.module.less'
import { navHeight } from '@/conf/index'

const { statusBarHeight } = Taro.getSystemInfoSync()
const Map = new QQMapWX({
  key: 'YQCBZ-AVAWS-R2POH-6XY5K-VNOKV-NWFBP'
});

class Index extends Component {

  state = {
    weather: {},
    opacity: 0
  }

  componentDidMount(){
    this.getLocation()
  }
  getLocation(){
    const _this = this;
    Taro.getLocation({
      type: 'wgs84',
      success: async res => {
        const data = await getWeather(res.latitude, res.longitude);
        debugger
        Map.reverseGeocoder({
          location: { latitude: res.latitude, longitude: res.longitude },
          coord_type: 1,
          success: (r, d) => {
            _this.setState({
              weather: data,
              city: d.reverseGeocoderSimplify.city,
              province: d.reverseGeocoderSimplify.province,
              district: d.reverseGeocoderSimplify.district
            })
          }
        })
      }
    })
  }
  back = () => {
    Taro.navigateBack({
      delta: 1
    }).catch(err => {
      Taro.reLaunch({
        url: '/pages/index/index'
      })
    })
  }
  onScroll = (e) => {
    this.setState({
      opacity: (e.detail.scrollTop/100).toFixed(2)
    })
  }
  render() {
    const { weather: { now, alarm, aqi, forecast, hourly, lifestyleForecast,  }, district, opacity } = this.state;
    console.log(hourly)
    return (
      now ? <ScrollView scrollY className={styles.container} onScroll={this.onScroll}>
        <View className={styles.navbar} style={{
          height: navHeight + 'px', 
          paddingTop: statusBarHeight + 'px'
        }}>
          <Image style={{ opacity: opacity || '0' }} className={styles.navBg} src={`https://apip.weatherdt.com/h5/static/images/bg${now.code}d.png`} mode='widthFix' />
          <View className={styles.navCon}>
            <AtIcon className={styles.back} onClick={this.back} size='30px' value='chevron-left' color='#fff' />
            <View className={styles.locationBox}>
              <Image className={[styles.location, !district && styles.loading]} src={location} mode='widthFix' />
              <Text>{ district }</Text>
            </View>
          </View>
        </View>
        <Image className={styles.bg} src={`https://apip.weatherdt.com/h5/static/images/bg${now.code}d.png`} mode='widthFix' />}
        <View className={styles.content} >
          <View className={styles.weaBox}>
            <View className={styles.tmp}>{now.tmp}°</View>
            <View className={styles.wea}>
              <Image className={styles.weaIcon} src={`https://apip.weatherdt.com/h5/static/images/cond-${now.code}d.png`} mode='widthFix' />
              <Text className={styles.weaTxt}>{now.txt}</Text>
            </View>
            <View className={styles.aqiBox}>
              <Text>{aqi.txt}</Text>
              <Text className={styles.aqi}>{aqi.aqi}</Text>
            </View>
          </View>
          <View className={styles.nowBase}>
            <View>
              <Text>降水</Text>
              <Text>{now.pcpn}mm</Text>
            </View>
            <View>
              <Text>湿度</Text>
              <Text>{now.hum}%</Text>
            </View>
            <View>
              <Text>{now.wind_dir_txt}</Text>
              <Text>{now.wind_sc}级</Text>
            </View>
            <View>
              <Text>气压</Text>
              <Text>{now.pres}hpa</Text>
            </View>
          </View>
          <View className={styles.hourlyBox}>
            <View className={styles.title}>24小时预报</View>
            <View className={styles.hourlyList}>{hourly.slice(0, 7).map((v, i) => {
              return <View key={i}>
                <Text>{v.time.substr(8, 2)}时</Text>
                <Image src={`https://apip.weatherdt.com/h5/static/images/cond-hour-${v.tqw_code}d.png`} mode='widthFix' />
                <Text>{v.tmp}°</Text>
              </View>
            })}</View>
          </View>
          <View className={styles.forecast}>
            <View className={styles.title}>7天预报</View>
            <View className={styles.forecastList}>
              
            </View>
          </View>
        </View>
      </ScrollView>
      :
      <Image className={styles.loadingGif} src={Loadimg} mode='widthFix' />
    )
  }
}

export default Index
