import React, { useState, useEffect } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Block, Text, Image, RichText } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import NotResult from '@/components/notResult'
import withShare from '@/components/withShare'
import Loadimg from '@/images/loading.gif'
import wdImg from '@/images/wd.png'

import { getMweather15d } from '@/service/weather'
import styles from './index.module.less'

export default withShare()(props => {
  const { cid } = Current.router.params
  const [dataList, setSataList] = useState({})
  const [load, setLoad] = useState('loading')
  useEffect(() => {
    const fetch = async () => {
      setLoad('loading')
      const res = await getMweather15d(cid).catch(err => { setLoad('fail') })
      if (res && res.code == 1) {
        setSataList(res.data)
        setLoad('success')
      }else{
        setLoad('fail')
      }
    }
    fetch()
  }, [])
  let nodes = load == 'success' && dataList.wap15.msg1.replace(/<i>/g, `<i style='color: #fd992a;' >`)
  if(load == 'success' &&dataList.wap15.msg2) nodes += '；' + dataList.wap15.msg2.replace(/<i>/g, `<i style='color: #fd992a;' >`)
  return (
    <Block>
      <Navbar title='15日天气预报' />
      { load == 'success' ? <View className={ styles.container }>
        <View className={styles.richText}>
          <RichText nodes={nodes} />
        </View>
        <View className={ styles.content }>{ dataList.data.map((v, i) => {
          return <View key={ i } className={styles.listItem}>
            <View className={styles.itemTop}>
              <View>{ v.week }</View>
              <View>
                <Image src={ v.code_d && `https://apip.weatherdt.com/h5/static/images/cond-hour-${v.code_d}d.png` } mode='widthFix' />
                <Text>{ v.weather_d }</Text>
              </View>
              <View>{ v.temp_d }°</View>
              <View>
                <Image src={wdImg} style={{ transform: `rotate(${v.wd_d.angle}deg)` }} mode='widthFix' />
                <Text>{ v.ws_d }</Text>
              </View>
            </View>
            <View className={styles.itemBottom}>
              <View>{ v.date }</View>
              <View>
                <Image src={ v.code_n && `https://apip.weatherdt.com/h5/static/images/cond-hour-${v.code_n}d.png` } mode='widthFix' />
                <Text>{ v.weather_n }</Text>
              </View>
              <View>{ v.temp_n }°</View>
              <View>
                <Image src={wdImg} style={{ transform: `rotate(${v.wd_n.angle}deg)` }} mode='widthFix' />
                <Text>{ v.ws_n }</Text>
              </View>
            </View>
          </View>
        }) }</View>
      </View>
      :
      ( load == 'loading' ? 
          <Image className={styles.loadingGif} src={Loadimg} mode='widthFix' />
          :
          <NotResult text='未查询到天气信息' />
        )
      }
    </Block>
  )
})