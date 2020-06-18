import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import idcardFrontImg from '@/images/idcard.png'
import idcardBackImg from '@/images/idcard_back.png'
import Modal from '@/components/modal/index'
import ScanCard from '@/components/scanCard'
import withShare from '@/components/withShare'

import styles from './index.module.less'

export default withShare()(props => {
  const [ idcardFront, setIdcardFront ] = useState({
    name: {}, id: {}, address: {}, gender: {}, nationality: {}
  })
  const [ idcardBack, setIdcardBack ] = useState({ valid_date: {} })
  const chooseImage = async ({ code, message, data }, type) => {
    if(code == 1){
      if(data.idcard_res.type == 0 && type == 'front'){
        setIdcardFront(data.idcard_res)
      }else if(data.idcard_res.type == 1 && type == 'back'){
        setIdcardBack(data.idcard_res)
      }
    }else{
      Modal.alert(message)
    }
  }
  const handleCopy = text => {
    text && Taro.setClipboardData({
      data: text
    })
  }
  const birthday = idcardFront.id.text && idcardFront.id.text.substr(6, 4) + '-' + idcardFront.id.text.substr(10, 2) + '-' + idcardFront.id.text.substr(12, 2)
  return (
    <Block>
      <Navbar title='身份证识别' />
      <View className={styles.container}>
        <ScanCard img={idcardFrontImg} text='点击上传身份证人像面' onChange={e => { chooseImage(e, 'front') }}/>
        <ScanCard img={idcardBackImg} text='点击上传身份证国徽面' onChange={e => { chooseImage(e, 'back') }}/>
        <View className={styles.list}>
          <View className={styles.item}>
            <View>姓名</View>
            <View onClick={handleCopy.bind(null, idcardFront.name.text)}>
              <Text>{idcardFront.name.text}</Text>
            </View>
          </View>
          <View className={styles.item}>
            <View>民族</View>
            <View onClick={handleCopy.bind(null, idcardFront.nationality.text)}>
              <Text>{idcardFront.nationality.text}</Text>
            </View>
          </View>
          <View className={styles.item}>
            <View>性别</View>
            <View onClick={handleCopy.bind(null, idcardFront.gender.text)}>
              <Text>{idcardFront.gender.text}</Text>
            </View>
          </View>
          <View className={styles.item}>
            <View>出生日期</View>
            <View onClick={handleCopy.bind(null, birthday)}>
              <Text>{birthday}</Text>
            </View>
          </View>
          <View className={styles.item}>
            <View>地址</View>
            <View onClick={handleCopy.bind(null, idcardFront.address.text)}>
              <Text>{idcardFront.address.text}</Text>
            </View>
          </View>
          <View className={styles.item}>
            <View>身份证号</View>
            <View onClick={handleCopy.bind(null, idcardFront.id.text)}>
              <Text>{idcardFront.id.text}</Text>
            </View>
          </View>
          <View className={styles.item}>
            <View>有效期限</View>
            <View onClick={handleCopy.bind(null,idcardBack.valid_date.text)}>
              <Text>{idcardBack.valid_date.text}</Text>
            </View>
          </View>
        </View>
      </View>
      <Modal id='at-modal' />
    </Block>
  )
})