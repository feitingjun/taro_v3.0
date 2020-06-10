import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtGrid } from 'taro-ui'

import styels from './index.module.less'
// import tianqiImg from '@/images/tianqi.png'
// import zhinanImg from '@/images/zhinan.png'
// import jiqiImg from '@/images/jiqi.png'
// import translateImg from '@/images/translate.png'
// import ocrImg from '@/images/ocr.png'
// import speakImg from '@/images/speak.png'
// import scanImg from '@/images/scan.png'
// import mapImg from '@/images/map.png'

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
        {/* <AtGrid hasBorder={false} onClick={this.handleGridClick} data={[{
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
        }]} /> */}
      </View>
    )
  }
}

export default Index
