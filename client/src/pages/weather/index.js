import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, ScrollView, Block } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { AtIcon, AtGrid } from 'taro-ui'

import { getWeather } from '@/service/weather'
import { cloud_img } from '@/conf/index'
import location from '@/images/location.png'
import noticeImg from '@/images/notice.png'
import Loadimg from '@/images/loading.gif'
import styles from './index.module.less'
import { navHeight } from '@/conf/index'
import LineChart from './lineChart'
import NotResult from '@/components/notResult'

const zs = ['ys', 'ac', 'co', 'ct', 'fs', 'gm', 'uv', 'zs', 'yd']

const { statusBarHeight } = Taro.getSystemInfoSync()

class Index extends Component {

  state = {
    opacity: 0,
    load: 'loading'
  }

  componentDidMount() {
    this.getLocation()
    Taro.eventCenter.on('selectdeCity', arg => {
      this.getData({ cid: arg.cid })
    })
  }
  componentWillUnmount() {
    Taro.eventCenter.off('selectdeCity')
  }
  getLocation() {
    Taro.getLocation({
      type: 'wgs84',
      success: async res => {
        this.getData({ location: { lat: res.latitude, lng: res.longitude } })
      }
    })
  }
  getData = (value) => {
    this.setState({ load: 'loading' }, async () => {
      const res = await getWeather(value).catch(err => { this.setState({ load: 'fail' }) })
      if(res && res.code == 1){
        this.setState({
          ...res.data, load: 'success', opacity: 0
        })
      }else{
        this.setState({ load: 'fail' })
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
  toSelectCity = () => {
    Taro.navigateTo({
      url: '/pages/selectCity/index'
    })
  }
  toMweather15d = () => {
    Taro.navigateTo({
      url: `/pages/mweather15d/index?cid=${this.state.basic.cid}`
    })
  }
  toMweather40d = () => {
    Taro.navigateTo({
      url: `/pages/mweather40d/index?cid=${this.state.basic.cid}`
    })
  }
  toLiveZS = () => {
    Taro.navigateTo({
      url: '/pages/liveZS/index',
    }).then(res => {
      res.eventChannel.emit('sendLiveZS', { data: this.state.dataZS })
    })
  }
  toSubscription = () => {
    Taro.navigateTo({
      url: `/pages/subscription/index?cid=${this.state.basic.cid}&district=${this.state.basic.district}`
    })
  }
  render() {
    const { alarmDZ, aqi, dataSK, dataZS, forecast7d, hour3data, basic,  opacity, load } = this.state
    return (
      load == 'success' ? <ScrollView scrollY className={styles.container} onScroll={this.onScroll}>
        <View className={styles.navbar} style={{
          height: navHeight + 'px',
          paddingTop: statusBarHeight + 'px'
        }}>
          <Image style={{ opacity: opacity || '0' }} className={styles.navBg} src={`https://apip.weatherdt.com/h5/static/images/bg${this.handleCode(dataSK.weathercode)}.png`} mode='widthFix' />
          <View className={styles.navCon}>
            <View className={styles.back} onClick={this.back}>
              <AtIcon value='chevron-left' color='#fff' />
              <Text>返回</Text>
            </View>
            <View className={styles.locationBox} onClick={this.toSelectCity}>
              <Image className={[styles.location, !basic.district && styles.loading]} src={location} mode='widthFix' />
              <Text>{basic.district}</Text>
            </View>
          </View>
        </View>
        {/* <Image className={styles.bg} src={`https://apip.weatherdt.com/h5/static/images/bg${this.handleCode(dataSK.weathercode)}.png`} mode='scaleToFill' />} */}
        <View className={styles.content} style={{
          backgroundImage: `url(https://apip.weatherdt.com/h5/static/images/bg${this.handleCode(dataSK.weathercode)}.png)`
        }}>
          <View className={styles.subscription} onClick={this.toSubscription}>
            <Image src={noticeImg} mode='widthFix' />
            <Text>消息订阅</Text>
          </View>
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
          {alarmDZ.w.length>0 && <View className={styles.alarm}>{alarmDZ.w[0].alarm_type} {alarmDZ.w[0].alarm_level}</View>}
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

              <View>{forecast7d.map((v, i) =>
                <View key={i} className={styles.ws}><Text>{v.ws || '-'}</Text></View>
              )}</View>
            </View>
          </View>
          <View className={styles.more}>
            <View onClick={this.toMweather15d}>
              <Text>15日天气预报</Text>
              <AtIcon value='chevron-right' color='rgba(255, 255, 255, 0.5)' size={16} />
            </View>
            <View onClick={this.toMweather40d}>
              <Text>40日天气预报</Text>
              <AtIcon value='chevron-right' color='rgba(255, 255, 255, 0.5)' size={16} />
            </View>
          </View>
          <View>
            <View className={styles.title}>生活指数</View>
            <View className={styles.zs}>{zs.map((v, i) => {
                return <View key={i} className={styles.zsItem} onClick={this.toLiveZS}>
                  <Text>{dataZS[v].name}</Text>
                  <View>
                    <Text>{dataZS[v].hint}</Text>
                    <AtIcon value='chevron-right' color='rgba(255, 255, 255, 0.5)' size={16} />
                  </View>
                </View>
              })}</View>
          </View>
          <View className={styles.source}>数据来源：中国天气网</View>
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
      <Block>
        <Navbar title='天气' />
        <View>
          {
            load == 'loading' ? <Image className={styles.loadingGif} src={Loadimg} mode='widthFix' /> : <NotResult text='未查询到天气信息' />
          }
        </View>
      </Block>
    )
  }
}

export default Index
