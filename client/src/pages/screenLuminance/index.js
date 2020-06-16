import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Block, Image } from '@tarojs/components'
import { AtSlider } from 'taro-ui'
import Navbar from '@/components/navbar/index'
import styles from './index.module.less'

export default props => {
  
  const [ value, setValue ] = useState(50)
  
  useEffect(() => {
    const foo = async () => {
      const data = await Taro.getScreenBrightness()
      setValue(data.value * 100)
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
  return (
    <Block>
      <Navbar title='屏幕亮度' />
      <View className={styles.container}>
        <AtSlider 
          value={value}
          activeColor='#40a6fa'
          blockColor='#40a6fa'
          onChanging={onChanging}
        ></AtSlider>
      </View>
    </Block>
  )
}