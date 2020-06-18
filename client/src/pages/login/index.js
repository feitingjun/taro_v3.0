import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Block, Image } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import styles from './index.module.less'

class Page extends React.Component {
  state = {

  }

  render(){
    return (
      <Block>
        <Navbar title='登录' />
        <View className={ styles.container }>
          登录
        </View>
      </Block>
    )
  }
}

export default Page