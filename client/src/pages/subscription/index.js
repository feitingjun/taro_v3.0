import React, { useState, useEffect } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Block, Text, Image } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { AtCheckbox, AtButton, AtMessage } from 'taro-ui'
import { navHeight } from '@/conf/index'
import Modal from '@/components/modal/index'

import styles from './index.module.less'
import rightImg from '@/images/right.png'

export default props => {
  const { cid, district } = Current.router.params
  const [ location, setLocation ] = useState({ cid, district })
  const [ checkedList, setCheckedList ] = useState([])
  const [ visible, setVisible ] = useState(false)

  useEffect(() => {
    Taro.getSetting({
      withSubscriptions: true,
    }).then(res =>{
      if(!res.subscriptionsSetting.mainSwitch){
        return false
      }
      const itemSettings = res.subscriptionsSetting.itemSettings
      if(itemSettings){
        const checkedList = []
        if(itemSettings['KPi8hRKfk0LJsADB3aCzJ8LyI0UCaVdcPCG9026di7E'] === 'accept'){
          checkedList.push('KPi8hRKfk0LJsADB3aCzJ8LyI0UCaVdcPCG9026di7E')
        }
        if(itemSettings['jML3TpZAj9NhSZqkBxTp2QS_vTbbsVQ6ZYUs95M49hI'] === 'accept'){
          checkedList.push('jML3TpZAj9NhSZqkBxTp2QS_vTbbsVQ6ZYUs95M49hI')
        }
        setCheckedList(checkedList)
      }
    })
  }, [])

  const handleChange = checkedList => {
    setVisible(true)
    // setCheckedList(checkedList)
  }
  const subscription = () => {
    if(checkedList.length==0){
      Taro.atMessage({
        'message': '请选择订阅类型',
        'type': 'error',
        duration: 1500
      })
      return false
    }
    Taro.requestSubscribeMessage({
      tmplIds: checkedList
    }).then(res => {
      debugger
    })
  }
  return (
    <Block>
      <Navbar title='消息订阅' />
      <Modal
        visible={visible}
        onCancel={() => { setVisible(false) }}
      >
        111111
      </Modal>
      <View className={ styles.container }>
        <AtMessage customStyle={{ top: navHeight + 'px' }} />
        <View className={styles.item}>
          <View className={styles.title}>城市</View>
          <View className={styles.content}>
            <Text>{location.district}</Text>
            <Image src={rightImg} mode='widthFix' />
          </View>
        </View>
        <View className={styles.item}>
          <View className={styles.title}>订阅类型</View>
          <AtCheckbox
            className={styles.checkbox}
            options={[{
              value: 'KPi8hRKfk0LJsADB3aCzJ8LyI0UCaVdcPCG9026di7E',
              label: '每日天气预报',
              desc: '每日清晨发送当日天气预报'
            },{
              value: 'jML3TpZAj9NhSZqkBxTp2QS_vTbbsVQ6ZYUs95M49hI',
              label: '气象预警提示',
              desc: '发送当日气象灾害预警提醒'
            }]}
            selectedList={checkedList}
            onChange={handleChange}
          />
        </View>
        <View className={styles.msg}>请选择</View>
        <AtButton className={styles.btn} type='primary' onClick={subscription}>订阅</AtButton>
      </View>
    </Block>
  )
}