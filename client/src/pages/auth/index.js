import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Block, Button } from '@tarojs/components'
import Navbar from '@/components/navbar/index'
import { AtButton } from 'taro-ui'
import AuthBlock from '@/components/authBlock'
import styles from './index.module.less'

class Page extends React.Component {
  state = {

  }
  click = (e) => {
    
  }
  render(){
    return (
      <Block>
        <Navbar title='鉴权' />
        <View className={ styles.container }>
          <AuthBlock>
            <Button onClick={this.click}>点击</Button>
          </AuthBlock>
        </View>
      </Block>
    )
  }
}

export default Page