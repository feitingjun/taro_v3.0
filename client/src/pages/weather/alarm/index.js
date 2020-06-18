import React, { useState, useEffect } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import withShare from '@/components/withShare'

import styles from './index.module.less'

export default withShare()(props => {
  const [alarm, setAlarm] = useState([])
  useEffect(() => {
    const eventChannel = Current.page.getOpenerEventChannel()
    eventChannel.on('sendAlarm', ({ data }) => {
      setAlarm(data)
    })
  }, [])
  return (
    <Block>
      <Navbar title='气象预警' />
      <View className={ styles.container }>{alarm.map((v, i) => {
        return <View key={i}>
          <View className={styles.title}>{v.w13}</View>
          <View className={styles.content}>{v.w9}</View>
        </View>
      })}</View>
    </Block>
  )
})