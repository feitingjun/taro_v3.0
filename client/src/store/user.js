import { observable } from 'mobx'
import { getUserInfo } from '@/service/user'

const userStore = observable({
  userInfo: null,
  async setUserInfo(userInfo) {
    this.userInfo = await getUserInfo(userInfo);
  }
})

export default userStore