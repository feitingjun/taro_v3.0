import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Button } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import Navbar from '@/components/navbar/index'

import styles from './index.module.less'

export default props => {
  
  
  const navigateTo = (url) => {
    Taro.navigateTo({
      url
    })
  }
  return (
    <Block>
      <Navbar title='OCR' />
      <View className={styles.container}>
        <AtList>
          <AtListItem title='身份证识别' onClick={() => { navigateTo('/pages/ocr/idcard/index') }} arrow='right' />
          <AtListItem title='银行卡识别' arrow='right' />
          <AtListItem title='驾驶证识别' arrow='right' />
          <AtListItem title='行驶证识别' arrow='right' />
          <AtListItem title='营业执照识别' arrow='right' />
          <AtListItem title='通用印刷体识别' arrow='right' />
        </AtList>
      </View>
    </Block>
  )
}