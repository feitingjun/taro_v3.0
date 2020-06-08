import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Block } from '@tarojs/components'
import { getOcr } from '@/service/ocr'
import styles from './index.module.less'
import Modal from '@/components/modal/index'
import cameraImg from '@/images/camera.png'

export default (props={
  img: '',
  text: '',
  ocrType: 1,
  onChange: () => {}
}) => {
  const [ tempFilePath, setTempFilePath ] = useState(null)
  const chooseImage = async () => {
    const res = await Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    })
    let data;
    if(res.errMsg === 'chooseImage:ok'){
      const file = res.tempFiles[0]
      const path = file.path
      const size = file.size
      if(size/1024/1024 > 2){
        Modal.alert('所选图片大小不能超过2M')
        return false
      }
      setTempFilePath(path)
      Taro.showLoading({ title: '识别中...', mask: true })
      data = await getOcr(path, props.ocrType);
      Taro.hideLoading()
    }else{
      data = { code: 0, message: '选择图片失败' }
    }
    props.onChange(data)
  }
  return <View className={styles.card} onClick={chooseImage}>{
    !tempFilePath ? 
    <Block>
      <Image src={props.img} />
      <View className={styles.camera}>
        <Image src={cameraImg} mode='widthFix' />
        <Text></Text><Text></Text><Text></Text><Text></Text>
      </View>
      <View className={styles.text}>{props.text}</View>
    </Block>
    :
    <Image className={styles.tempFile} src={tempFilePath} mode='aspectFit' />
  }
  </View>
}