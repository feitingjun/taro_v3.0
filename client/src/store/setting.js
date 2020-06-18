import { observable } from 'mobx'

const settingStore = observable({
  keepScreenOn: false
})

export default settingStore