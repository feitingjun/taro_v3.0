import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block, ScrollView, Text, Image } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import Dotting from '@/components/dotting'
import dateFormat from '@/utils/dateFormat'
import loudImg from '@/images/loud.png'
import styles from './index.module.less'

const plugin = requirePlugin('WechatSI')
const manager = plugin.getRecordRecognitionManager()

export default props => {
  const [ list, setList ] = useState([])
  const [ show, setShow ] = useState(false)
  const [ lang, setLang ] = useState('zh_CN')

  const translation = (value, index, lang) => {
    plugin.translate({
      lfrom: lang,
      lto: lang === 'zh_CN' ? 'en_US' : 'zh_CN',
      tts: true,
      content: value,
      success: function(res) {
        if(res.retcode == 0) {
          setList([
            ...list.slice(0, index), 
            { ...list[index], value, time: new Date().getTime(), translation: false, result: res.result, filename: res.filename, expired_time: res.expired_time },
            ...list.slice(index + 1)
          ])
        } else {
          setList([
            ...list.slice(0, index), 
            { ...list[index], value, time: new Date().getTime(), translation: false, result: '翻译失败' },
            ...list.slice(index + 1)
          ])
          console.warn('翻译失败', res)
        }
      },
      fail: function(res) {
        setList([
          ...list.slice(0, index), 
          { ...list[index], value, time: new Date().getTime(), translation: false, result: '翻译失败' },
          ...list.slice(index + 1)
        ])
        console.log('网络失败',res)
      }
    })
  }
  // 有新的识别内容返回，则会调用此事件
  manager.onRecognize = function(res) {
    console.log('current result', res.result)
  }
  
  // 正常开始录音识别时会调用此事件
  manager.onStart = function(res) {
    console.log('成功开始录音识别', res)
  }
  // 识别错误事件
  manager.onError = function(res) {
    setShow(false)
    console.error('error msg', res.msg)
  }
  manager.onStop = function(res) {
    console.log(res)
    setShow(false)
    const len = list.length
    if(res.result){
      setList([...list, {
        value: res.result,
        time: new Date().getTime(),
        translation: true
      }])
      translation(res.result, len, lang)
    }
  }
  const onTouchStart = (lang) => {
    // 开始识别
    setLang(lang)
    setShow(true)
    manager.start({duration: 60000, lang })
  }
  const onTouchEnd = () => {
    // 停止识别
    manager.stop()
  }
  const playVoice = filename => {
    const audio = Taro.createInnerAudioContext()
    audio.src = filename
    audio.autoplay = true
  }
  return (
    <Block>
      <Navbar title='同声传译' />
      <View className={styles.container}>
        <ScrollView id='scrollView' scrollY scrollIntoView={ show ? 'bottom' : `item_${list.length}` } scrollWithAnimation className={styles.content}>{
          list.map((v, i) => {
            return <View id={`item_${i+1}`} key={i} className={styles.item}>
              <View className={styles.time}>{dateFormat('mm/dd HH:MM', new Date(v.time))}</View>
              <View className={styles.itemCon}>
                <View>{v.value}</View>
                <View>
                  <Text>{v.translation ? <View>正在翻译中<Dotting /></View> : v.result}</Text>
                  {v.filename && <Image onClick={() => { playVoice(v.filename) }} src={loudImg} mode='widthFix' />}
                </View>
              </View>
            </View>
          })
        }
        {(list.length == 0 || show) && <View id='bottom' className={`${styles.item} ${styles.bottom}`}>
          <View className={styles.time}>{dateFormat('mm/dd HH:MM', new Date())}</View>
          <View className={styles.itemCon}>
            <View>{show ? '正在聆听中' : '等待说话'}<Dotting /></View>
          </View>
        </View>}
        </ScrollView>
        <View className={styles.btnBox}>
          <View>
            <View onTouchStart={() => { onTouchStart('zh_CN') }} onTouchEnd={onTouchEnd} className={styles.btn}>中文</View>
            <View>长按说话</View>
          </View>
          <View>
            <View onTouchStart={() => { onTouchStart('en_US') }} onTouchEnd={onTouchEnd} className={styles.btn}>EN</View>
            <View>Hold To Talk</View>
          </View>
        </View>
      </View>
      {/* <View className={`${styles.progressBox} ${show ? styles.show : ''}`}></View> */}
    </Block>
  )
}