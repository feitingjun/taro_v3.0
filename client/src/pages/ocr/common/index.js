import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import cardImg from '@/images/photo.png'
import Modal from '@/components/modal/index'
import ScanCard from '@/components/scanCard'

import styles from './index.module.less'

export default props => {
  const [ common, setCommon ] = useState([])
  const chooseImage = async ({ code, message, data }) => {
    if(code == 1){
      const list = data.ocr_comm_res.items.map(v => {
        return v.text
      })
      setCommon(list)
    }else{
      Modal.alert(message)
    }
  }
  const handleCopy = text => {
    text && Taro.setClipboardData({
      data: text
    })
  }
  console.log(common)
  return (
    <Block>
      <Navbar title='通用印刷体识别' />
      <View className={styles.container}>
        <View className={styles.card}>
          <ScanCard img={cardImg} text='点击上传图片' ocrType={8} onChange={chooseImage}/>
        </View>
        <View className={styles.list}>{
          common.map((v, i) => {
            return <View onClick={handleCopy.bind(null, v)}>
            <Text>{v}</Text>
          </View>
          })
        }
        </View>
      </View>
      <Modal id='at-modal' />
    </Block>
  )
}