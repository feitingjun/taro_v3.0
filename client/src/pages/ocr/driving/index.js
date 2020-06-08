import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import cardImg from '@/images/driving.png'
import Modal from '@/components/modal/index'
import ScanCard from '@/components/scanCard'

import styles from './index.module.less'

export default props => {
  const [ driving, setDriving ] = useState({})
  const [ drivingBack, setDrivingBack ] = useState({})
  const chooseImage = async ({ code, message, data }, type) => {
    if(code == 1){
      const obj = {};
      for(let key in data.driving_res){
        obj[key] = data.driving_res[key].text
      }
      if(type === 'front'){
        setDriving(obj)
      }else{
        setDrivingBack(obj)
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
  return (
    <Block>
      <Navbar title='行驶证识别' />
      <View className={styles.container}>
        <ScanCard img={cardImg} text='点击上传行驶证' ocrType={3} onChange={e => { chooseImage(e, 'front') }}/>
        <ScanCard img={cardImg} text='点击上传行驶证副页' ocrType={3} onChange={e => { chooseImage(e, 'back') }}/>
        <View className={styles.list}>
          <View className={styles.item}>
            <View>车牌号</View>
            <View onClick={handleCopy.bind(null, driving.plate_num)}>
              <Text>{driving.plate_num}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>车辆类型</View>
            <View onClick={handleCopy.bind(null, driving.vehicle_type)}>
              <Text>{driving.vehicle_type}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>所有人</View>
            <View onClick={handleCopy.bind(null, driving.owner)}>
              <Text>{driving.owner}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>住址</View>
            <View onClick={handleCopy.bind(null, driving.addr)}>
              <Text>{driving.addr}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>使用性质</View>
            <View onClick={handleCopy.bind(null, driving.use_character)}>
              <Text>{driving.use_character}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>品牌型号</View>
            <View onClick={handleCopy.bind(null, driving.model)}>
              <Text>{driving.model}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>车辆识别代号</View>
            <View onClick={handleCopy.bind(null, driving.vin)}>
              <Text>{driving.vin}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>发动机号码</View>
            <View onClick={handleCopy.bind(null, driving.engine_num)}>
              <Text>{driving.engine_num}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>注册日期</View>
            <View onClick={handleCopy.bind(null, driving.register_date)}>
              <Text>{driving.register_date}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>发证日期</View>
            <View onClick={handleCopy.bind(null, driving.issue_date)}>
              <Text>{driving.issue_date}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>车牌号码</View>
            <View onClick={handleCopy.bind(null, drivingBack.plate_num_b)}>
              <Text>{drivingBack.plate_num_b}</Text>
            </View>
          </View>
          
          {/* <View className={styles.item}>
            <View>号牌</View>
            <View onClick={handleCopy.bind(null, driving.record)}>
              <Text>{driving.record}</Text>
            </View>
          </View> */}
          
          <View className={styles.item}>
            <View>核定载人数</View>
            <View onClick={handleCopy.bind(null, drivingBack.passengers_num)}>
              <Text>{drivingBack.passengers_num}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>总质量</View>
            <View onClick={handleCopy.bind(null, drivingBack.total_quality)}>
              <Text>{drivingBack.total_quality}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>整备质量</View>
            <View onClick={handleCopy.bind(null, drivingBack.prepare_quality)}>
              <Text>{drivingBack.prepare_quality}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>外廓尺寸</View>
            <View onClick={handleCopy.bind(null, drivingBack.overall_size)}>
              <Text>{drivingBack.overall_size}</Text>
            </View>
          </View>

        </View>
      </View>
      <Modal id='at-modal' />
    </Block>
  )
}