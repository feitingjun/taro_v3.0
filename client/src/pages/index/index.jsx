import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtGrid } from 'taro-ui'

import styels from './index.module.less'
import tianqiImg from '@/images/tianqi.png'
import zhinanImg from '@/images/zhinan.png'
import jiqiImg from '@/images/jiqi.png'

@inject('store')
@observer
class Index extends Component {
  handleGridClick = (item) => {
    if(item.url){
      Taro.navigateTo({
        url: item.url
      })
    }
  }
  render() {
    return (
      <View className={styels.container}>
        <View className={styels.header}></View>
        <AtGrid hasBorder={false} onClick={this.handleGridClick} data={[{
          image: tianqiImg,
          value: '天气',
          url: '/pages/weather/index/index'
        },{
          image: zhinanImg,
          value: '指南针',
          url: '/pages/compass/index'
        },{
          image: jiqiImg,
          value: '智能机器人',
          url: '/pages/robot/index'
        }]} />
      </View>
    )
  }
}

export default Index
