import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Block, Image } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import withShare from '@/components/withShare'
import styles from './index.module.less'

export default withShare()(props => {
  const [ value, setVlaue ] = useState(50)
  const [ isCharging, setIsCharging ] = useState(false)

  useEffect(() => {
    const getBatteryInfo = () => {
      wx.getBatteryInfo({
        success: res => {
          setVlaue(res.level)
          setIsCharging(res.isCharging)
        }
      })
    }
    getBatteryInfo()
    const timer = setInterval(() => {
      getBatteryInfo()
    }, 500);
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <Block>
      <Navbar background="#000" title='电量' />
      <View className={styles.container}>
        <View className={styles.header}></View>
        <View className={styles.box}>
          <View className={`${styles.content} ${isCharging ? styles.isCharging : ''}`}>
            {isCharging ? 
            <View></View>
            :
            <Block>
              <Text style={{ bottom: `${value}%` }}></Text>
              <Text style={{ bottom: `${value}%` }}></Text>
            </Block>}
          </View>
        </View>
        <View className={styles.number}><Text>{value}</Text>%</View>
      </View>
    </Block>
  )
})