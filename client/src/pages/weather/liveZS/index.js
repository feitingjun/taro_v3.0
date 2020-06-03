import React, { useState, useEffect } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'

import styles from './index.module.less'

export default props => {
  const [list, setList] = useState([])
  useEffect(() => {
    const eventChannel = Current.page.getOpenerEventChannel()
    eventChannel.on('sendLiveZS', ({ data }) => {
      const list = [];
      for (let key in data) {
        list.push(data[key])
      }
      setList(list)
    })
  }, [])
  return (
    <Block>
      <Navbar title='生活指数' />
      <View className={ styles.container }>{ list.map((v, i) => {
        return <View className={styles.listItem} key={ i }>
          <View>
            <Text>{ v.name }</Text>
            <Text>（{ v.hint }）</Text>
          </View>
          <View>{ v.desc }</View>
        </View>
      }) }</View>
    </Block>
  )
}