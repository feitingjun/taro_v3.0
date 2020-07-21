import React from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Block, OpenData } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Navbar from '@/components/navbar/index'
import withShare from '@/components/withShare'
import styles from './index.module.less'


@withShare()
@inject('userStore')
@observer
class Page extends React.Component {
  state = {

  }

  back = () => {
    Taro.navigateBack()
  }
  onGetuserInfo = async e => {
    if(e.detail.errMsg === 'getUserInfo:ok'){
      const userInfo = await this.props.userStore.setUserInfo(e.detail.userInfo)
      if(userInfo) this.back()
    }
  }
  render(){
    return (
      <Block>
        <Navbar title='登录' />
        <View className={ styles.container }>
          <View className={styles.avatar}><OpenData type='userAvatarUrl' /></View>
          <View className={styles.nickName}><OpenData type='userNickName' /></View>
          <View className={styles.desc}>
            <View>登录后开发者将获取以下权限</View>
            <View>获取您的公开信息（昵称、头像等）</View>
          </View>
          <View className={styles.btnBox}>
            <Button onClick={this.back}>暂不登录</Button>
            <Button lang='zh_CN' openType='getUserInfo' onGetUserInfo={this.onGetuserInfo}>确认登录</Button>
          </View>
        </View>
      </Block>
    )
  }
}

export default Page