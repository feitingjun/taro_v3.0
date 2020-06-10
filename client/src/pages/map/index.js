import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Block, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Navbar from '@/components/navbar/index'
import Modal from '@/components/modal'
import styles from './index.module.less'
import scan1Img from '@/images/scan1.png'

export default props => {
  
  return (
    <Block>
      <Navbar title='地图' />
      <View className={styles.container}>
        
      </View>
    </Block>
  )
}