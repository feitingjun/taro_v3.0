import React, { Component } from 'react'
import { View } from '@tarojs/components'
import * as echarts from '@/components/ec-canvas/echarts'
import styles from './index.module.less'

export default props => {

  const { data } = props;
  console.log(data)
  const ec = {
    onInit: (canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(chart)
    
      const option = {
        color: ['#fff', '#fff'],
        grid: {
          bottom: 0,
          top: 20,
          left: 0,
          right: 0
        },
        xAxis: { //必须，不然报错
          type: 'category',
          data: data.map(v => v.time),
          show: false
        },
        yAxis: { //必须，不然报错
          type: 'value',
          show: false,
          splitLine: {
            show: false
          }
        },
        series: [{
          type: 'line',
          data: data.map(v => v.tem_max),
          label: {
            show: true,
            formatter: '{c}°'
          }
        },{
          type: 'line',
          data: data.map(v => v.tem_min),
          label: {
            show: true,
            position: 'bottom',
            formatter: '{c}°'
          }
        }]
      }
    
      chart.setOption(option)
      return chart
    }
  }
  return <View className={styles.box}>
    <ec-canvas id='mychart-dom-area' canvas-id='mychart-area' ec={ec}></ec-canvas>
  </View>
}