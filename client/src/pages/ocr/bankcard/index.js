import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import cardImg from '@/images/bank.png'
import Modal from '@/components/modal/index'
import ScanCard from '@/components/scanCard'
import withShare from '@/components/withShare'

import styles from './index.module.less'

export default withShare()(props => {
  const [ bank, setBank ] = useState({ number: {} })
  const chooseImage = async ({ code, message, data }) => {
    if(code == 1){
      setBank(data.bankcard_res)
    }else{
      Modal.alert(message)
    }
  }
  const handleCopy = text => {
    text && Taro.setClipboardData({
      data: text
    })
  }
  return (
    <Block>
      <Navbar title='银行卡识别' />
      <View className={styles.container}>
        <ScanCard img={cardImg} text='点击上传银行卡' ocrType={2} onChange={chooseImage}/>
        <View className={styles.list}>
          <View className={styles.item}>
            <View>银行卡号</View>
            <View onClick={handleCopy.bind(null, bank.number.text)}>
              <Text>{bank.number.text}</Text>
            </View>
          </View>
        </View>
      </View>
      <Modal id='at-modal' />
    </Block>
  )
})