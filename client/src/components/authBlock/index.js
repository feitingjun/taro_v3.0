import React from 'react'
import Taro from '@tarojs/taro'
import { Block } from '@tarojs/components'
import userStore from '@/store/user'

export default props => {
  const click = e => {
    if(!userStore.userInfo || !userStore.userInfo.wxInfo){
      Taro.navigateTo({
        url: '/pages/login/index'
      })
      return false
    }
    props.children.props.onClick(e)
  }
  return React.cloneElement(props.children, { onClick: click })
}