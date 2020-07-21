import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtGrid } from 'taro-ui'

import withShare from '@/components/withShare'
import api from '@/utils/api'

import styels from './index.module.less'
import tianqiImg from '@/images/tianqi.png'
import zhinanImg from '@/images/zhinan.png'
import jiqiImg from '@/images/jiqi.png'
import translateImg from '@/images/translate.png'
import ocrImg from '@/images/ocr.png'
import speakImg from '@/images/speak.png'
import scanImg from '@/images/scan.png'
import mapImg from '@/images/map.png'
import luminanceImg from '@/images/luminance.png'
import electricityImg from '@/images/electricity.png'
import authImg from '@/images/auth.png'

@withShare()
@inject('userStore')
@observer
class Index extends Component {
  handleGridClick = (item) => {
    if(item.url){
      api.navTo({
        url: item.url
      }, item.url === '/pages/weather/index/index')
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
        },{
          image: translateImg,
          value: '英汉互译',
          url: '/pages/translate/index'
        },{
          image: speakImg,
          value: '同声传译',
          url: '/pages/speak/index'
        },{
          image: ocrImg,
          value: 'OCR',
          url: '/pages/ocr/index'
        },{
          image: scanImg,
          value: '扫码识别',
          url: '/pages/scan/index'
        },{
          image: mapImg,
          value: '地图',
          url: '/pages/map/index'
        },{
          image: luminanceImg,
          value: '屏幕亮度',
          url: '/pages/screenLuminance/index'
        },{
          image: electricityImg,
          value: '电量',
          url: '/pages/electricity/index'
        },{
          image: authImg,
          value: '鉴权',
          url: '/pages/auth/index'
        }]} />
      </View>
    )
  }
}

export default Index
