import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { AtButton  } from 'taro-ui'

import { getCurrentCity, getAllCity } from '@/service/getCity'
import styles from './index.module.less'

export default (props) => {
  const [ current, setCurrent ] = useState({})
  const [ allCity, setAllCity ] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const data = await getCurrentCity()
      setCurrent(data)
    }
    fetch()
  }, [])
  useEffect(() => {
    const fetch = async () => {
      const data = await getAllCity()
      setAllCity(data)
    }
    fetch()
  }, [])
  return (
    <Block>
      <Navbar title='城市选择' />
      <View className={styles.container}>
        <View className={styles.content}>
          <View className={styles.title}>当前位置</View>
          <View className={styles.list}>
            <AtButton className={styles.btn} type='secondary' size='small'>{current.district}</AtButton>
          </View>
        </View>
      </View>
    </Block>
  )
}