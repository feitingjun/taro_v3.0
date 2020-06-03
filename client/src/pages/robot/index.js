import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { navHeight } from '@/conf/index'

import styles from './index.module.less'
const plugin = requirePlugin('chatbot');

export default props => {
  useEffect(() => {
    plugin.send({
      query: "今天成都天气怎么样",
      success: res => {
        debugger
      },
      fail: error => {}
    });
  }, [])
  return (
    <Block>
      <Navbar title='智能机器人' />
      <View className={styles.container} style={{ height: `calc(100vh - ${navHeight}px)` }}>
        {/* <chat style={{ height: '100%' }} /> */}
      </View>
    </Block>
  )
}