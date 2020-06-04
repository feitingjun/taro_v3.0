import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Image, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import idcardFront from '@/images/idcard.png'
import cameraImg from '@/images/camera.png'
import Modal from '@/components/modal/index'
import { getOcr } from '@/service/ocr'

import styles from './index.module.less'

export default props => {
  
  const chooseImage = async type => {
    const res = await Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    })
    if(res.errMsg === 'chooseImage:ok'){
      const file = res.tempFiles[0]
      const path = file.path
      const size = file.size
      const fileType = path.substr(path.lastIndexOf('.') + 1)
      if(size/1024/1024 > 2){
        Modal.alert({
          content: '所选图片大小不能超过2M'
        })
        return false
      }
      const cloudFile = await Taro.cloud.uploadFile({
        cloudPath: `ocrImage/${type}.${fileType}`,
        filePath: path
      })
      if(cloudFile.statusCode == 200){
        const data = await getOcr(cloudFile.fileID, type)
        if(data && data.errCode == 0){
          debugger
        }else{
          Modal.alert({
            content: data&&data.errMsg || '识别失败'
          })
        }
      }
    }
  }

  return (
    <Block>
      <Navbar title='身份证识别' />
      <View className={styles.container}>
        <View className={styles.card} onClick={() => { chooseImage('front') }}>
          <Image src={idcardFront} />
          <View className={styles.camera}>
            <Image src={cameraImg} mode='widthFix' />
            <Text></Text><Text></Text><Text></Text><Text></Text>
          </View>
          <View className={styles.text}>点击上传身份证人像面</View>
        </View>
      </View>
      <Modal id='at-modal' />
    </Block>
  )
}