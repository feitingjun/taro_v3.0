import React from 'react'
import { useShareAppMessage } from '@tarojs/taro'
import shareImg from '@/images/share.jpg'

export default (opt={}) => {
  return Component => {
    return props => {
      useShareAppMessage(() => ({
        title: '小程序工具dome',
        path: '/pages/index/index',
        imageUrl: shareImg,
        ...opt
      }))
      return <Component ref={props.forwardedRef} />
    }
  }
  // return Component => {
  //   class withShare extends React.Component {
  //     onShareAppMessage(){
  //       return {
  //         title: '一江明月一江秋',
  //         path: '/pages/index/index',
  //         imageUrl: shareImg,
  //         ...opt
  //       }
  //     }
  //     render(){
  //       return <Component />
  //     }
  //   }
  //   return withShare
  // }
}