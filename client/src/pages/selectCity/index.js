import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Text } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { AtButton, AtSearchBar } from 'taro-ui'
import NotResult from '@/components/notResult'

import { getCurrentCity, getCity } from '@/service/getCity'
import styles from './index.module.less'

const hotCity = [{
  city: '北京',
  cid: '101010100'
},{
  city: '上海',
  cid: '101020100'
},{
  city: '深圳',
  cid: '101280601'
},{
  city: '广州',
  cid: '101280101'
},{
  city: '武汉',
  cid: '101200101'
},{
  city: '长沙',
  cid: '101250101'
},{
  city: '南京',
  cid: '101190101'
},{
  city: '苏州',
  cid: '101190401'
},{
  city: '西安',
  cid: '101110101'
},{
  city: '济南',
  cid: '101120101'
},{
  city: '青岛',
  cid: '101120201'
},{
  city: '沈阳',
  cid: '101070101'
},{
  city: '重庆',
  cid: '101040100'
},{
  city: '郑州',
  cid: '101180101'
},{
  city: '成都',
  cid: '101270101'
},{
  city: '杭州',
  cid: '101210101'
},{
  city: '厦门',
  cid: '101230201'
},{
  city: '香港',
  cid: '101320101'
},{
  city: '澳门',
  cid: '101330101'
},{
  city: '达州',
  cid: '101270601'
}]

export default (props) => {
  const [current, setCurrent] = useState({})
  const [cityList, setCityList] = useState([])
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    const fetch = async () => {
      const data = await getCurrentCity()
      setCurrent(data)
    }
    fetch()
  }, [])
  useEffect(() => {
    const fetch = async () => {
      const data = await getCity(keyword)
      setCityList(data)
    }
    if (keyword) fetch()
  }, [keyword])
  const handleColor = (str) => {
    const index = str.indexOf(keyword)
    if (index > -1) {
      return <Text>{str.substr(0, index)}<Text className={styles.keyword}>{keyword}</Text>{str.substr(index + keyword.length)}</Text>
    }else{
      return str
    }
  }
  const selectedCity = (item) => {
    if(item.cid){
      Taro.eventCenter.trigger('selectdeCity', item)
      Taro.navigateBack()
    }
  }
  return (
    <Block>
      <Navbar title='城市选择' />
      <View className={styles.container}>
        <View className={styles.searchBox}>
          <AtSearchBar 
            value={keyword} 
            actionName='取消' 
            onActionClick={() => { setKeyword('') }} 
            onChange={value => { setKeyword(value) }} 
            placeholder='请输入关键字' 
          />
        </View>
        {!!keyword ?
          <View className={styles.searchList}>
            {cityList.length > 0 ?
              cityList.map((v, i) => (
                <View 
                  key={i} 
                  className={styles.listItem}
                  onClick={() => { selectedCity(v) }}
                >
                  {handleColor(`${v.district}，${v.city ? v.city + '，' : ''}${v.province}`)}
                </View>
              ))
              :
              <NotResult text='未查询到城市信息' />
            }
          </View>
          :
          <View className={styles.content}>
            <View className={styles.title}>当前位置</View>
            <View className={styles.list}>
              <AtButton className={styles.btn} onClick={ () => { selectedCity(current) }} size='small'>{current.district || '定位中'}</AtButton>
            </View>
            <View className={`${styles.title} ${styles.title1}`}>热门城市</View>
            <View className={styles.list}>{hotCity.map((v, i) => {
              return <AtButton key={i} className={styles.btn} onClick={ () => { selectedCity(v) }} size='small'>{v.city}</AtButton>
            })}
            </View>
          </View>
        }
      </View>
    </Block>
  )
}