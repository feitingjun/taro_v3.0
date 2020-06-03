import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import Navbar from '@/components/navbar/index'

import styles from './index.module.less'

export default props => {
  useEffect(() => {
    Taro.startCompass()
    Taro.onCompassChange(res => {
      debugger
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
        11
      </View>
    </Block>
  )
}