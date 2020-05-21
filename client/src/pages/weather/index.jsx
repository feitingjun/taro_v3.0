import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { AtIcon } from 'taro-ui'

import { getWeather } from '@/service/weather'
import QQMapWX from '@/utils/qqmap-wx-jssdk.min'
import { cloud_img } from '@/conf/index'
import location from '@/images/location.png'
import Loadimg from '@/images/loading.gif'
import styles from './index.module.less'
import { navHeight } from '@/conf/index'
import adCodeList from '@/utils/adcode.json'
import LineChart from './lineChart'

const { statusBarHeight } = Taro.getSystemInfoSync()
const Map = new QQMapWX({
  key: 'YQCBZ-AVAWS-R2POH-6XY5K-VNOKV-NWFBP'
})

class Index extends Component {

  state = {
    weather: {},
    opacity: 0
  }

  componentDidMount() {
    this.getLocation()
  }
  getLocation() {
    const _this = this
    Taro.getLocation({
      type: 'wgs84',
      success: res => {
        console.log(res)
        Map.reverseGeocoder({
          location: { latitude: res.latitude, longitude: res.longitude },
          coord_type: 1,
          success: async (r, d) => {
            const cityData = adCodeList[r.result.ad_info.adcode]
            // getForecast(cityData.cid)
            const data = await getWeather(cityData.cid)
            _this.setState({
              weather: data,
              city: cityData.city,
              province: cityData.province,
              district: cityData.district
            })
          }
        })
        // const data = await getWeather(res.latitude, res.longitude)
        // debugger
        // Map.reverseGeocoder({
        //   location: { latitude: res.latitude, longitude: res.longitude },
        //   coord_type: 1,
        //   success: (r, d) => {
        //     _this.setState({
        //       weather: data,
        //       city: d.reverseGeocoderSimplify.city,
        //       province: d.reverseGeocoderSimplify.province,
        //       district: d.reverseGeocoderSimplify.district
        //     })
        //   }
        // })
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
      opacity: (e.detail.scrollTop / 100).toFixed(2)
    })
  }
  handleCode = code => {
    return code.substr(1) + code.substr(0, 1)
  }
  render() {
    const { weather: { alarmDZ, aqi, dataSK, dataZS, forecast7d, hour3data }, district, opacity } = this.state
    return (
      dataSK ? <ScrollView scrollY className={styles.container} onScroll={this.onScroll}>
        <View className={styles.navbar} style={{
          height: navHeight + 'px',
          paddingTop: statusBarHeight + 'px'
        }}>
          <Image style={{ opacity: opacity || '0' }} className={styles.navBg} src={`https://apip.weatherdt.com/h5/static/images/bg${this.handleCode(dataSK.weathercode)}.png`} mode='widthFix' />
          <View className={styles.navCon}>
            <AtIcon className={styles.back} onClick={this.back} size='30px' value='chevron-left' color='#fff' />
            <View className={styles.locationBox}>
              <Image className={[styles.location, !district && styles.loading]} src={location} mode='widthFix' />
              <Text>{district}</Text>
            </View>
          </View>
        </View>
        <Image className={styles.bg} src={`https://apip.weatherdt.com/h5/static/images/bg${this.handleCode(dataSK.weathercode)}.png`} mode='widthFix' />}
        <View className={styles.content} >
          <View className={styles.weaBox}>
            <View className={styles.tmp}>{dataSK.temp}°</View>
            <View className={styles.wea}>
              <Image className={styles.weaIcon} src={`https://apip.weatherdt.com/h5/static/images/cond-${this.handleCode(dataSK.weathercode)}.png`} mode='widthFix' />
              <Text className={styles.weaTxt}>{dataSK.weather}</Text>
            </View>
            <View className={styles.aqiBox}>
              <Text>{aqi.txt}</Text>
              <Text className={styles.aqi}>{aqi.aqi}</Text>
            </View>
          </View>
          <View className={styles.nowBase}>
            <View>
              <Text>降雨量</Text>
              <Text>{dataSK.rain}mm</Text>
            </View>
            <View>
              <Text>湿度</Text>
              <Text>{dataSK.SD}</Text>
            </View>
            <View>
              <Text>{dataSK.WD}</Text>
              <Text>{dataSK.WS}</Text>
            </View>
            <View>
              <Text>气压</Text>
              <Text>{dataSK.qy}hpa</Text>
            </View>
          </View>
          <View className={styles.hourlyBox}>
            <View className={styles.title}>24小时预报</View>
            <View className={styles.hourlyList}>{hour3data['1d'].map((v, i) => {
              return <View key={i}>
                <Text>{v.time.substr(3)}</Text>
                <Text className={styles.hourlyWeather}>{v.weather}</Text>
                <Image src={`https://apip.weatherdt.com/h5/static/images/cond-hour-${this.handleCode(v.weathercode)}.png`} mode='widthFix' />
                <Text>{parseInt(v.temp)}°</Text>
              </View>
            })}</View>
          </View>
          <View className={styles.forecast}>
            <View className={styles.title}>7天预报</View>
            <View className={styles.forecastList}>

              <View>{forecast7d.map((v, i) =>
                <View key={i} className={styles.time}>
                  <Text>{v.time}</Text>
                  <Text>（{v.time_txt}）</Text>
                </View>)}
              </View>

              <View>{forecast7d.map((v, i) =>
                <View className={styles.imgBox} key={i}><Image src={v.code_d&&`https://apip.weatherdt.com/h5/static/images/cond-hour-${v.code_d}d.png`} mode='widthFix' /></View>
              )}</View>

              <LineChart data={forecast7d} />

              <View>{forecast7d.map((v, i) =>
                <View className={styles.imgBox} key={i}><Image src={v.code_n&&`https://apip.weatherdt.com/h5/static/images/cond-hour-${v.code_n}d.png`} mode='widthFix' /></View>
              )}</View>

              <View>{forecast7d.map((v, i) =>
                <View key={i} className={styles.weather}><Text>{v.weather}</Text></View>
              )}</View>
            </View>
          </View>


          {/* <View className={styles.forecastList}>{forecast7d.map((v, i) => {
              return <View key={i}>
                <View className={styles.top}>
                  <View className={styles.time}>
                    <Text>{v.time}</Text>
                    <Text>（{v.time_txt}）</Text>
                  </View>
                  <Image src={`https://apip.weatherdt.com/h5/static/images/cond-hour-${v.code_d}d.png`} mode='widthFix' />
                </View>
                <View className={styles.bottom}>
                  <Image src={`https://apip.weatherdt.com/h5/static/images/cond-hour-${v.code_n}d.png`} mode='widthFix' />
                  <Text className={styles.weather}>{v.weather}</Text>
                  <Text>{`${v.tem_max}/${v.tem_min}℃`}</Text>
                </View>
              </View>
            })}</View>
            <LineChart data={forecast7d} /> */}
        </View>
      </ScrollView>
        :
        <Image className={styles.loadingGif} src={Loadimg} mode='widthFix' />
    )
  }
}

export default Index
