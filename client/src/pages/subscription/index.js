import React, { useState, useEffect } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Block, Text, Image } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { AtCheckbox, AtButton, AtMessage } from 'taro-ui'
import { navHeight } from '@/conf/index'
import Modal from '@/components/modal/index'
import { saveSubscription } from '@/service/weather'

import styles from './index.module.less'
import rightImg from '@/images/right.png'

export default props => {
  const { cid, district } = Current.router.params
  const [ location, setLocation ] = useState({ cid, district })
  const [ checkedList, setCheckedList ] = useState([])
  // const [ subscribed, setSubscribed ] = useState([])
  useEffect(() => {
    Taro.eventCenter.on('selectdeCity1', arg => {
      setLocation(arg)
    })
    return () => {
      Taro.eventCenter.off('selectdeCity1')
    }
  }, [])

  const handleChange = async cureetList => {
    
    // const res = await Taro.getSetting({ withSubscriptions: true })
    // if(!res.subscriptionsSetting.mainSwitch){
    //   Modal.confirm({
    //     title: '系统消息',
    //     content: '您没用授予消息订阅的权限，不能进行订阅',
    //     openType: 'openSetting',
    //     okText: '去授权'
    //   })
    //   return false;
    // }
    // const list = []
    // for(let i=0; i<cureetList.length; i++){
    //   const v = cureetList[i]
    //   if(checkedList.indexOf(v) == -1){
    //       if(subscribed.indexOf(v) > -1){
    //         list.push(v)
    //       }else{
    //         const data = await Taro.requestSubscribeMessage({ tmplIds: [v] })
    //         if(data[v] === 'accept') {
    //           list.push(v)
    //           setSubscribed([...subscribed, v])
    //         }
    //       }
    //   }else{
    //     list.push(v)
    //   }
    // }
    // setCheckedList(list)
    setCheckedList(cureetList)
  }
  const subscription = async () => {
    if(checkedList.length==0){
      Taro.atMessage({
        'message': '请选择订阅类型',
        'type': 'error',
        duration: 1500
      })
      return false
    }
    const res = await Taro.getSetting({ withSubscriptions: true })
    if(!res.subscriptionsSetting.mainSwitch){
      Modal.confirm({
        title: '系统消息',
        content: '您没用授予消息订阅的权限，不能进行订阅',
        openType: 'openSetting',
        okText: '去授权'
      })
      return false;
    }
    const list = [];
    const data = await Taro.requestSubscribeMessage({ tmplIds: checkedList })
    checkedList.map(v => {
      if(data[v] === 'accept') {
        list.push(v)
      }
    })
    if(list.length == 0) return false;
    const reslute = await saveSubscription(location.cid, location.district, list)
    if(reslute.code == 1){
      Modal.alert({
        content: '订阅成功',
        onOk: () => {
          Taro.navigateBack()
        }
      })
      // Taro.atMessage({
      //   'message': '订阅成功',
      //   'type': 'success',
      //   duration: 1500
      // })
    }else{
      Modal.alert({
        content: res.message
      })
    }
  }
  const toSelectCity = () => {
    Taro.navigateTo({
      url: '/pages/selectCity/index?name=selectdeCity1'
    })
  }
  return (
    <Block>
      <Navbar title='消息订阅' />
      <Modal id='at-modal' />
      <View className={ styles.container }>
        <AtMessage customStyle={{ top: navHeight + 'px' }} />
        <View className={styles.item}>
          <View className={styles.title}>城市</View>
          <View className={styles.content} onClick={toSelectCity}>
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
        <View className={styles.msg}>当前订阅为一次性订阅，即每订阅一次只能向所选类型推送一条微信通知</View>
        <AtButton className={styles.btn} type='primary' onClick={subscription}>订阅</AtButton>
      </View>
    </Block>
  )
}