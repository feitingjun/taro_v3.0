import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'mobx-react'
import userStore from '@/store/user'

import '@/styles/custom-variables.scss'
import './app.less'
import { cloud_env, navHeight } from '@/conf/index'
const plugin = requirePlugin('chatbot')

const store = {
  userStore
}

class App extends Component {

  async componentDidMount () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: cloud_env,
        traceUser: true,
      })
      plugin.init({
        appid: '8FqqADA9nXeDa7hEgKQU4DO8FNHrPZ', //小程序示例账户，仅供学习和参考
        openid: '',//用户的openid，非必填，建议传递该参数
        navHeight: navHeight,
        textToSpeech: false,
        success: () => {}, //非必填
        fail: error => {} //非必填
      });
      const { authSetting } = await Taro.getSetting();
      if(authSetting['scope.userInfo']){
        const { userInfo } = await Taro.getUserInfo({ lang: 'zh_CN' });
        userStore.setUserInfo(userInfo);
      }else{
        userStore.setUserInfo();
      }
    }
  }

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
