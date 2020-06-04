import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, Image, Text } from '@tarojs/components'
import { AtTextarea, AtButton }  from 'taro-ui'
import Navbar from '@/components/navbar/index'
import styles from './index.module.less'
import traniconImg from '@/images/tranicon.png'

const plugin = requirePlugin('chatbot')

export default props => {
  const [ translateType, setTranslateType ] = useState('translate_cn2en')
  const [ value, setValue ] = useState('')
  const [ result, setResult ] = useState('')

  const handleTranslateType = () => {
    if(translateType === 'translate_cn2en'){
      setTranslateType('translate_en2cn')
    }else{
      setTranslateType('translate_cn2en')
    }
  }
  const translate = () => {
    if(!value) return false
    Taro.showLoading({
      mask: true,
      title: '翻译中...'
    })
    plugin.api.nlp(translateType, { q: value }).then((res) => {
      Taro.hideLoading()
      setResult(res.result)
    })
  }
  const copy = () => {
    Taro.setClipboardData({
      data: result
    })
  }
  return (
    <Block>
      <Navbar title='英汉互译' />
      <View className={styles.container}>
        <View className={styles.translateType}>
          <Text>{translateType === 'translate_cn2en' ? '中文简体' : '英文'}</Text>
          <Image onClick={handleTranslateType} src={traniconImg} mode='widthFix' />
          <Text>{translateType === 'translate_cn2en' ? '英文' : '中文简体'}</Text>
        </View>
        <View className={styles.content}>
          <View className={styles.item}>
            <View>请输入要翻译的文字</View>
            <AtTextarea 
              className={styles.textarea}
              value={value}
              onChange={value => { setValue(value) }}
              maxLength={1000}
              onConfirm={translate}
              height={250}
              count={false}
            />
            <AtButton onClick={translate} className={styles.btn}>翻译</AtButton>
          </View>
          <View className={styles.item}>
            <View className={styles.resultTitle}>翻译结果</View>
            <AtTextarea 
              className={styles.textarea}
              value={result}
              disabled
              maxLength={1000}
              height={250}
              count={false}
            />
            <AtButton onClick={copy} className={styles.btn}>复制</AtButton>
          </View>
        </View>
      </View>
    </Block>
  )
}