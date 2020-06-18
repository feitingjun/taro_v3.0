import React from 'react'
import Taro from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import Navbar from '@/components/navbar/index'
import withShare from '@/components/withShare'

import styles from './index.module.less'

export default withShare()(props => {
  
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
          <AtListItem className={styles.item} title='身份证识别' onClick={() => { navigateTo('/pages/ocr/idcard/index') }} arrow='right' />
          <AtListItem className={styles.item} title='银行卡识别' onClick={() => { navigateTo('/pages/ocr/bankcard/index') }} arrow='right' />
          <AtListItem className={styles.item} title='驾驶证识别' onClick={() => { navigateTo('/pages/ocr/drivinglicense/index') }} arrow='right' />
          <AtListItem className={styles.item} title='行驶证识别' onClick={() => { navigateTo('/pages/ocr/driving/index') }} arrow='right' />
          <AtListItem className={styles.item} title='营业执照识别' onClick={() => { navigateTo('/pages/ocr/biz/index') }} arrow='right' />
          <AtListItem className={styles.item} title='通用印刷体识别' onClick={() => { navigateTo('/pages/ocr/common/index') }} arrow='right' />
        </AtList>
      </View>
    </Block>
  )
})