import { observable, action } from 'mobx'
import { getUserInfo } from '@/service/user'

// const userStore = observable({
//   userInfo: null,
//   async setUserInfo(userInfo) {
//     this.userInfo = await getUserInfo(userInfo);
//   }
// })
// export default userStore

class userStore {

  @observable userInfo = null

  @action 
  setUserInfo = async (userInfo) => {
    this.userInfo = await getUserInfo(userInfo);
  }
  
}

export default new userStore()