import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { screenWidth } from '@/conf'

import styles from './index.module.less'

let n = []
for(let i=0; i<180;i++){
  n.push(i)
}

export default props => {
  const [ direction, setDirection ] = useState(0)
  useEffect(() => {
    Taro.startCompass()
    Taro.onCompassChange(res => {
      setDirection(res.direction)
    })
    return () => {
      Taro.offCompassChange()
      Taro.stopCompass()
    }
  }, [])
  return (
    <Block>
      <Navbar title='指南针' />
      <View className={styles.container}>
        <View className={styles.content}>{n.map(v => {
          return <Text style={{ transform: `rotateZ(${v * 2}deg)` }} className={`${styles.calibration} ${v%15 === 0 ? styles.n15 : ''}`} key={v}>
            {v == 0 && <Text>北</Text>}
            {v == 45 && <Text>东</Text>}
            {v == 90 && <Text>南</Text>}
            {v == 135 && <Text>西</Text>}
            {( v%15 === 0 && v%45 !== 0 ) && <Text>{v * 2}°</Text>}
          </Text>
        })}</View>
      </View>
    </Block>
  )
}