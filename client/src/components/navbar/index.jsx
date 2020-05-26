import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import { navHeight } from '@/conf/index'

import styles from './index.module.less'

const { statusBarHeight } = Taro.getSystemInfoSync()

export default (props) => {

  const back = () => {
    Taro.navigateBack({
      delta: props.delta || 1
    }).catch(err => {
      Taro.reLaunch({
        url: '/pages/index/index'
      })
    })
  }
  const style = {
    height: navHeight + 'px', 
    paddingTop: statusBarHeight + 'px',
    position: props.fixed ? 'fixed' : 'relative'
    // background: props.background || 'linear-gradient(180deg,#40a9ff 0%,#40a9ff80 100%)'
  }
  return <View className='nav-bar' style={style}>
    <View className={styles.back} style={{ paddingTop: statusBarHeight + 'px' }} onClick={back}>
      <AtIcon value='chevron-left' color='#fff' />
      <Text>返回</Text>
    </View>
    <View className={styles.title}>
      { props.title }
    </View>
  </View>
}