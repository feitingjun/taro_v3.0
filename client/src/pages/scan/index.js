import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Block, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Navbar from '@/components/navbar/index'
import Modal from '@/components/modal'
import styles from './index.module.less'
import scan1Img from '@/images/scan1.png'

export default props => {
  const [ result, setResult ] = useState()
  const scanHandle = () => {
    Taro.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417']
    }).then(res => {
      if(res.errMsg === 'scanCode:ok'){
        setResult(res.result)
      }else{
        Modal.alert(res.errMsg)
      }
    }).catch(err => {
      
    })
  }
  const handleCopy = () => {
    result && Taro.setClipboardData({
      data: result
    })
  }
  return (
    <Block>
      <Modal id='at-modal' />
      <Navbar title='扫码识别' />
      <View className={styles.container}>
        <View className={styles.scan} onClick={scanHandle}>
          <Image src={scan1Img} mode='widthFix' />
          <Text>点击扫码</Text>
        </View>
        {result && <View className={styles.result}>
          <View>识别结果：</View>
          <View onClick={handleCopy}>{result}</View>
        </View>}
      </View>
    </Block>
  )
}