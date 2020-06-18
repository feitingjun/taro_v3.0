import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import cardImg from '@/images/biz.png'
import Modal from '@/components/modal/index'
import ScanCard from '@/components/scanCard'
import withShare from '@/components/withShare'

import styles from './index.module.less'

export default withShare()(props => {
  const [ bizLicense, setBizLicense ] = useState({})
  const chooseImage = async ({ code, message, data }) => {
    if(code == 1){
      const obj = {};
      for(let key in data.biz_license_res){
        obj[key] = data.biz_license_res[key].text
      }
      setBizLicense(obj)
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
      <Navbar title='营业执照识别' />
      <View className={styles.container}>
        <ScanCard img={cardImg} text='点击上传营业执照' ocrType={7} onChange={chooseImage}/>
        <View className={styles.list}>
          <View className={styles.item}>
            <View>注册号</View>
            <View onClick={handleCopy.bind(null, bizLicense.reg_num)}>
              <Text>{bizLicense.reg_num}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>编号</View>
            <View onClick={handleCopy.bind(null, bizLicense.serial)}>
              <Text>{bizLicense.serial}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>法定代表人</View>
            <View onClick={handleCopy.bind(null, bizLicense.legal_representative)}>
              <Text>{bizLicense.legal_representative}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>企业名称</View>
            <View onClick={handleCopy.bind(null, bizLicense.enterprise_name)}>
              <Text>{bizLicense.enterprise_name}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>组成形式</View>
            <View onClick={handleCopy.bind(null, bizLicense.type_of_organization)}>
              <Text>{bizLicense.type_of_organization}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>经营场所/企业住所</View>
            <View onClick={handleCopy.bind(null, bizLicense.address)}>
              <Text>{bizLicense.address}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>公司类型</View>
            <View onClick={handleCopy.bind(null, bizLicense.type_of_enterprise)}>
              <Text>{bizLicense.type_of_enterprise}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>经营范围</View>
            <View onClick={handleCopy.bind(null, bizLicense.business_scope)}>
              <Text>{bizLicense.business_scope}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>注册资本</View>
            <View onClick={handleCopy.bind(null, bizLicense.registered_capital)}>
              <Text>{bizLicense.registered_capital}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>实收资本</View>
            <View onClick={handleCopy.bind(null, bizLicense.paid_in_capital)}>
              <Text>{bizLicense.paid_in_capital}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>营业期限</View>
            <View onClick={handleCopy.bind(null, bizLicense.valid_period)}>
              <Text>{bizLicense.valid_period}</Text>
            </View>
          </View>
          
          <View className={styles.item}>
            <View>注册日期/成立日期</View>
            <View onClick={handleCopy.bind(null, bizLicense.registered_date)}>
              <Text>{bizLicense.registered_date}</Text>
            </View>
          </View>

        </View>
      </View>
      <Modal id='at-modal' />
    </Block>
  )
})