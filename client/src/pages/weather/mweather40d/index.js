import React, { useState, useEffect } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Block, Text, Image, RichText } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import NotResult from '@/components/notResult'
import withShare from '@/components/withShare'
import Loadimg from '@/images/loading.gif'

import { getMweather40d } from '@/service/weather'
import styles from './index.module.less'

export default withShare()(props => {
  const { cid } = Current.router.params
  const [dataList, setSataList] = useState({})
  const [load, setLoad] = useState('loading')
  useEffect(() => {
    const fetch = async () => {
      setLoad('loading')
      const res = await getMweather40d(cid).catch(err => { setLoad('fail') })
      if (res.code == 1) {
        setSataList(res.data)
        setLoad('success')
      } else {
        setLoad('fail')
      }
    }
    fetch()
  }, [])
  let nodes = load == 'success' && dataList.msg1.replace(/<i>/g, `<i style='color: #fd992a;' >`)
  if(load == 'success' &&dataList.msg2) nodes += '；' + dataList.msg2.replace(/<i>/g, `<i style='color: #fd992a;' >`)
  return (
    <Block>
      <Navbar title='40日天气预报' />
      { load == 'success' ? <View className={ styles.container }>
        <View className={styles.richText}>
          <RichText nodes={nodes} />
        </View>
        <View className={ styles.content }>{ dataList.datas.map((v, i) => {
          return <View key={ i } className={ styles.listItem }>
            <Text>{v.tm.substr(4, 2)}月{v.tm.substr(6)}日</Text>
            <Text>{v.week}</Text>
            <Text>{v.min}~{v.max}℃</Text>
            <Image src={v.w1_code && `https://apip.weatherdt.com/h5/static/images/cond-hour-${v.w1_code}d.png`} mode='widthFix' />
            <Text>{v.weather}</Text>
          </View>
        }) }</View>
      </View>
        :
        (load == 'loading' ?
          <Image className={ styles.loadingGif } src={ Loadimg } mode='widthFix' />
          :
          <NotResult text='未查询到天气信息' />
        )
      }
    </Block>
  )
})