import React from 'react'
import { Block, Text } from '@tarojs/components'
import styles from './index.module.less'

export default props => {
  return (
    <Block>
      <Text className={styles.text1}>.</Text>
      <Text className={styles.text2}>.</Text>
      <Text className={styles.text3}>.</Text>
    </Block>
  )
}