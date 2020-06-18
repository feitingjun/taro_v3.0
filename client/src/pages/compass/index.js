import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import withShare from '@/components/withShare'

import styles from './index.module.less'

let n = []
for(let i=0; i<180;i++){
  n.push(i)
}

export default withShare()(props => {
  const [ direction, setDirection ] = useState(0)
  const [ location, setLocation ] = useState({})
  useEffect(() => {
    Taro.getLocation({
      type: 'wgs84',
      success: async res => {
        setLocation({ lat: res.latitude, lng: res.longitude })
      }
    })
    Taro.startCompass()
    Taro.onCompassChange(res => {
      setDirection(parseInt(res.direction))
    })
    return () => {
      Taro.offCompassChange()
      Taro.stopCompass()
    }
  }, [])

  // 复制
  const copy = data => {
    Taro.setClipboardData({
      data: data
    })
  }
  return (
    <Block>
      <Navbar title='指南针' background='#000' />
      <View className={styles.container}>
        <View className={styles.content}>
          <Text className={styles.datum}></Text>
          <Text className={styles.direction}>{direction}°</Text>
          <View className={styles.dish} style={{ transform: `rotate(${-direction}deg)` }}>{n.map(v => {
            return <Text style={{ transform: `rotateZ(${v * 2}deg)`, borderTopColor: v * 2 < direction ? 'rgb(216, 10, 10)' : ''}} className={`${styles.calibration} ${v%15 === 0 ? styles.n15 : ''}`} key={v}>
              {v == 0 && <Text>北</Text>}
              {v == 0 && <Text className={styles.arrows}></Text>}
              {v == 45 && <Text>东</Text>}
              {v == 90 && <Text>南</Text>}
              {v == 135 && <Text>西</Text>}
              {( v%15 === 0 && v%45 !== 0 ) && <Text className={styles.angle}>{v * 2}°</Text>}
            </Text>
          })}</View>
        </View>
        <View className={styles.location}>
          <View>
            <Text>经度</Text>
            <Text onClick={() => { copy(location.lng) }}>{location.lng}°</Text>
          </View>
          <View>
            <Text>纬度</Text>
            <Text onClick={() => { copy(location.lat) }}>{location.lat}°</Text>
          </View>
        </View>
      </View>
    </Block>
  )
})