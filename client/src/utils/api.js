import Taro from '@tarojs/taro'
import userStore from '@/store/user'

export default {
  navTo: (opt, needLogin) => {
    if(needLogin && (!userStore.userInfo || !userStore.userInfo.wxInfo)){
      Taro.navigateTo({
        url: '/pages/login/index'
      })
      return false
    }
    Taro.navigateTo(opt)
  }
}