import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Img from '@/images/notResult.png'
import styles from './index.module.less'

export default props => (
  <View className={styles.box}>
    <Image src={Img} />
    <Text>{props.text}</Text>
  </View>
)