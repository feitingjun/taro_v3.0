import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import settingStore from '@/store/setting'
import { View, Text, Block, Image } from '@tarojs/components'
import { AtSlider, AtSwitch } from 'taro-ui'
import Navbar from '@/components/navbar/index'
import withShare from '@/components/withShare'
import styles from './index.module.less'

export default withShare()(props => {
  const [ value, setValue ] = useState(50)
  useEffect(() => {
    const foo = async () => {
      const data = await Taro.getScreenBrightness()
      setValue(parseInt(data.value * 100))
    }
    foo()
  }, [])
  useEffect(() => {
    Taro.setScreenBrightness({
      value: value/100
    })
  }, [value])
  const onChanging = value => {
    setValue(value)
  }
  const setKeepScreenOn = value => {
    Taro.setKeepScreenOn({
      keepScreenOn: value
    }).then(() => {
      settingStore.keepScreenOn = value
    })
  }
  return (
    <Block>
      <Navbar title='屏幕亮度' />
      <View className={styles.container}>
        <View className={styles.desc}>仅在当前小程序生效</View>
        <View className={styles.title}>屏幕亮度</View>
        <View className={styles.sliderBox}>
          <Text>0%</Text>
          <AtSlider 
            className={styles.slider}
            value={value}
            activeColor='#40a6fa'
            blockColor='#40a6fa'
            onChanging={onChanging}
          ></AtSlider>
          <Text>{value}%</Text>
        </View>
        <View className={styles.title1}>
          <Text className={styles.title}>是否常亮</Text>
          <AtSwitch checked={settingStore.keepScreenOn} border={false} onChange={setKeepScreenOn} />
        </View>
      </View>
    </Block>
  )
})