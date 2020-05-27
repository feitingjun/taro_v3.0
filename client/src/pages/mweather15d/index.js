import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { AtButton, AtSearchBar } from 'taro-ui'
import NotResult from '@/components/notResult'

import { getMweather15d } from '@/service/mweather15d'
import styles from './index.module.less'

export default (props) => {
  const [ dataList, setSataList ] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const data = await getMweather15d(101270101)
      setSataList(data)
    }
    fetch()
  }, [])
  return (
    <Block>
      <Navbar title='15日天气预报' />
      <View className={styles.container}>
        
      </View>
    </Block>
  )
}