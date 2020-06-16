import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Block, Image, Map } from '@tarojs/components'
import { AtSearchBar, AtActionSheet, AtActionSheetItem } from 'taro-ui'

import QQMapWX from '@/utils/qqmap-wx-jssdk.min'
import Navbar from '@/components/navbar/index'
import wzImg from '@/images/wz.png'
import wzImg1 from '@/images/wz1.png'
import dqwzImg from '@/images/dqwz.png'
import styles from './index.module.less'

const QQMap = new QQMapWX({
  key: 'YQCBZ-AVAWS-R2POH-6XY5K-VNOKV-NWFBP'
})

export default class Page extends Component {

  state = {
    keyword: '',
    location: {},
    suggestion: [],
    markers: [],
    isOpened: false,
    currentMarker: null,
    scale: 16
  }

  componentWillMount() {
    Taro.getLocation({
      type: 'gcj02',
      success: async res => {
        this.setState({
          location: { latitude: res.latitude, longitude: res.longitude }
        })
      }
    })
  }
  componentDidMount() {
    this.map = Taro.createMapContext('map')

  }


  // 搜索框值发生改变
  handleChange = keyword => {
    if (keyword) {
      this.setState({
        keyword
      })
      this.getSuggestion(keyword)
    } else {
      this.setState({
        suggestion: [],
        keyword,
        markers: []
      })
    }
  }

  getSuggestion = (keyword) => {
    QQMap.getSuggestion({
      keyword: keyword,
      location: location,
      success: res => {
        this.setState({
          suggestion: res.status == 0 ? res.data : []
        })
      }
    })
  }

  // 点击提示列表
  clickSearchResult = v => {
    this.setState({
      markers: [{
        ...v,
        iconPath: wzImg,
        latitude: v.location.lat,
        longitude: v.location.lng,
        width: 25,
        height: 25,
        callout: {
          content: v.title,
          borderRadius: 5,
          borderWidth: 1,
          color: '#fff',
          borderColor: '#40a6fa',
          bgColor: '#40a6fa',
          padding: 5,
          textAlign: 'center',
          anchorY: 5,
          display: 'ALWAYS'
        }
      }],
      keyword: v.title,
      suggestion: []
    })
    this.map.moveToLocation({
      latitude: v.location.lat,
      longitude: v.location.lng
    })
  }
  // 点击地图
  clickMap = () => {
    if(this.state.suggestion.length > 0){
      this.setState({ suggestion: [] })
    }
  }
  // 点击搜索按钮
  handleSearch = () => {
    QQMap.search({
      keyword: this.state.keyword,
      // location: location,
      success: res => {
        if (res.status == 0) {
          const list = res.data.map(v => ({
            ...v,
            iconPath: wzImg,
            latitude: v.location.lat,
            longitude: v.location.lng,
            width: 25,
            height: 25,
            callout: {
              content: v.title,
              borderRadius: 5,
              borderWidth: 1,
              color: '#fff',
              borderColor: '#40a6fa',
              bgColor: '#40a6fa',
              padding: 5,
              textAlign: 'center',
              anchorY: 5,
              display: 'ALWAYS'
            }
          }))
          this.setState({
            markers: list,
            suggestion: []
          })
          this.map.includePoints({
            points: list
          })
        }
      }
    })
  }
  // 回到当前位置
  toCurrentLocation = () => {
    this.map.moveToLocation(this.state.location)
    this.setState({ scale: 16 })
  }
  // 点击标记
  clickMarker = e => {
    const list = this.state.markers.filter(v => e.markerId == v.id)
    if(list.length > 0){
      this.setState({
        isOpened: true,
        currentMarker: list[0]
      })
    }
  }
  handleCancel = () => {
    this.setState({
      isOpened: false,
      currentMarker: null
    })
  }
  // 点击到这儿去
  openLocation = () => {
    const current = this.state.currentMarker
    console.log(current)
    Taro.openLocation({
      latitude: current.latitude,
      longitude: current.longitude,
      name: current.title,
      address: current.address || current.title
    }).then(() => {
      this.handleCancel()
    })
  }
  // 复制坐标
  copy = () => {
    const current = this.state.currentMarker
    Taro.setClipboardData({
      data: `lat: ${current.latitude}; lng: ${current.longitude}`
    }).then(() => {
      this.handleCancel()
    })
  }
  render() {
    const { scale, currentMarker, isOpened, keyword, suggestion, location, markers } = this.state
    return (
      <Block>
        <Navbar title='地图' />
        <View className={ styles.container }>
          <View className={ styles.searchBox }>
            <AtSearchBar value={ keyword } onChange={ this.handleChange } onActionClick={ this.handleSearch } onConfirm={ this.handleSearch } />
            <View className={ styles.resultList }>{ suggestion.map((v, i) => {
              return <View onClick={ () => { this.clickSearchResult(v) } } key={ i }>{ v.title }</View>
            }) }</View>
          </View>
          <View className={ styles.map }>
            <Map
              id='map'
              onClick={this.clickMap}
              show-location={ true }
              longitude={ location.longitude }
              latitude={ location.latitude }
              setting={{ }}
              onMarkerTap={ this.clickMarker }
              onCalloutTap={ this.clickMarker }
              markers={ [{ ...location, iconPath: wzImg1, width: 25, height: 25 }, ...markers] }
            />
          </View>
        </View>
        <AtActionSheet cancelText='取消' isOpened={isOpened} title={currentMarker&&currentMarker.title} onClose={this.handleCancel}>
          <AtActionSheetItem onClick={this.openLocation}>
            到这儿去
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.copy}>
            复制坐标
          </AtActionSheetItem>
        </AtActionSheet>
        <View onClick={this.toCurrentLocation} className={styles.currentLocation}>
          <Image src={dqwzImg} mode='widthFix' />
        </View>
      </Block>
    )
  }
}