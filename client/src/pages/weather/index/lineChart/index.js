import React, { Component } from 'react'
import { View } from '@tarojs/components'
import * as echarts from '@/components/ec-canvas/echarts'
import styles from './index.module.less'

export default props => {

  const { data } = props;
  const ec = {
    onInit: (canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
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
          show: false
        },
        series: [{
          type: 'line',
          data: data.map(v => v.tem_max),
          label: {
            show: true,
            formatter: '{c}°'
          },
          lineStyle: {
            width: 1
          }
        },{
          type: 'line',
          data: data.map(v => v.tem_min),
          label: {
            show: true,
            position: 'bottom',
            formatter: '{c}°'
          },
          lineStyle: {
            width: 1
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