import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import cardImg from '@/images/drivinglicense.png'
import Modal from '@/components/modal/index'
import ScanCard from '@/components/scanCard'

import styles from './index.module.less'

export default props => {
  const [ drivinglicense, setDrivinglicense ] = useState({})
  const chooseImage = async ({ code, message, data }) => {
    if(code == 1){
      const obj = {};
      for(let key in data.driving_license_res){
        obj[key] = data.driving_license_res[key].text
      }
      setDrivinglicense(obj)
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
      <Navbar title='驾驶证识别' />
      <View className={styles.container}>
        <ScanCard img={cardImg} text='点击上传驾驶证' ocrType={4} onChange={chooseImage}/>
        <View className={styles.list}>
          <View className={styles.item}>
            <View>姓名</View>
            <View onClick={handleCopy.bind(null, drivinglicense.name)}>
              <Text>{drivinglicense.name}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>性别</View>
            <View onClick={handleCopy.bind(null, drivinglicense.sex)}>
              <Text>{drivinglicense.sex}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>证号</View>
            <View onClick={handleCopy.bind(null, drivinglicense.id_num)}>
              <Text>{drivinglicense.id_num}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>准驾车型</View>
            <View onClick={handleCopy.bind(null, drivinglicense.car_class)}>
              <Text>{drivinglicense.car_class}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>国籍</View>
            <View onClick={handleCopy.bind(null, drivinglicense.nationality)}>
              <Text>{drivinglicense.nationality}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>住址</View>
            <View onClick={handleCopy.bind(null, drivinglicense.address)}>
              <Text>{drivinglicense.address}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>出生日期</View>
            <View onClick={handleCopy.bind(null, drivinglicense.birth_date)}>
              <Text>{drivinglicense.birth_date}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>初次领证日期</View>
            <View onClick={handleCopy.bind(null, drivinglicense.issue_date)}>
              <Text>{drivinglicense.issue_date}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>有效期限起始日</View>
            <View onClick={handleCopy.bind(null, drivinglicense.valid_from)}>
              <Text>{drivinglicense.valid_from}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>有效期限终止日</View>
            <View onClick={handleCopy.bind(null, drivinglicense.valid_to)}>
              <Text>{drivinglicense.valid_to}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>发证机关</View>
            <View onClick={handleCopy.bind(null, drivinglicense.official_seal)}>
              <Text>{drivinglicense.official_seal}</Text>
            </View>
          </View>

        </View>
      </View>
      <Modal id='at-modal' />
    </Block>
  )
}