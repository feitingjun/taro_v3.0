import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
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
    background: props.background || 'transparent'
  }
  return <View className={styles.navbar} style={style}>
    <AtIcon className={styles.back} onClick={back} size='30px' value='chevron-left' color='#fff' />
    { props.title }
  </View>
}