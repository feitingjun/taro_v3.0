import React, { useState, useEffect } from 'react'
import { Events } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Button, Text, Block } from '@tarojs/components'
const events = new Events()

import './index.less'

export default function Modal(props) {
  const [ options, setOptions ] = useState(props)
  const [ visible, setVisible ] = useState(false)
  const [ classes, setClasses ] = useState('')

  useEffect(() => {
    events.on('showModal', (arg) => {
      if(arg.id === props.id){
        setOptions({ ...options, ...arg })
      }
    })
    events.on('hideModal', (arg) => {
      if(arg.id === props.id){
        setOptions({ ...options, ...arg })
      }
    })
    setOptions(props)
    return () => {
      events.off('showModal')
      events.off('hideModal')
    }
  }, [props])
  useEffect(() => {
    if(options.visible){
      setVisible(true)
      setTimeout(() => {
        setClasses('at-modal-mask-show')
      }, 10)
    }else{
      setClasses('at-modal-mask-hide')
      setTimeout(() => {
        setVisible(false)
      }, 200)
    }
  }, [options.visible])

  const onCancel = () => {
    if(options.autoClosable) setOptions({...options, visible: false})
    if(options.onCancel && typeof options.onCancel === 'function'){
      options.onCancel()
    }
  }
  const onOk = () => {
    if(options.autoClosable) setOptions({...options, visible: false})
    if(options.onOk && typeof options.onOk === 'function'){
      options.onOk()
    }
  }
  const { title, children, content, cancelText, okText, className, maskClosable, footer, showCancel, lang, openType,sessionFrom,
    sendMessageTitle,
    sendMessagePath,
    sendMessageImg,
    appParameter,
    showMessageCard,
    bindgetuserinfo,
    bindcontact,
    bindgetphonenumber,
    binderror,
    bindopensetting,
    bindlaunchapp,
  } = options

  return (
    <View
      style={{ display: visible ? 'block':'none' }}
      onClick={maskClosable && onCancel}
      className={`at-modal-mask ${classes}} ${options.maskClass}`}
    >
      <View className={`at-modal-body ${className}`} onClick={(e) => {e.stopPropagation()}}>
        { title && <View className='at-modal-title'>{title}</View> }
        <View className={`at-modal-content  ${ title ? 'at-modal-body-has-title' : ''}`}>{children || content}</View>
        <View className='at-modal-footer'>
          {  
            footer ? footer : <Block>
              {showCancel && <Button onClick={onCancel}>{cancelText}</Button>}
              <Button 
                lang={lang} 
                onClick={onOk} 
                className='okButton'
                openType={openType}
                sessionFrom={sessionFrom}
                sendMessageTitle={sendMessageTitle}
                sendMessagePath={sendMessagePath}
                sendMessageImg={sendMessageImg}
                appParameter={appParameter}
                showMessageCard={showMessageCard}
                bindgetuserinfo={bindgetuserinfo}
                bindcontact={bindcontact}
                bindgetphonenumber={bindgetphonenumber}
                binderror={binderror}
                bindopensetting={bindopensetting}
                bindlaunchapp={bindlaunchapp}
              >{okText}</Button>
            </Block>
          }
        </View>
      </View>
    </View>
  )
}
Modal.confirm = options => {
  events.trigger('showModal', {
    id: 'at-modal',
    visible: true,
    autoClosable: true,
    ...options
  })
}
Modal.alert = options => {
  if(typeof options === 'string') {
    options = {
      content: options
    }
  }
  events.trigger('showModal', {
    id: 'at-modal',
    visible: true,
    autoClosable: true,
    maskClosable: false,
    showCancel: false,
    ...options
  })
}
Modal.defaultProps = {
  title: false,
  visible: false,
  className: '',
  onCancel: () => {},
  onOk: () => {},
  okText: '确定',
  cancelText: '取消',
  maskClosable: true,
  maskClass: '',
  showCancel: true,
  autoClosable: false,
  lang: 'zh_CN',
  openType: '',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  appParameter: '',
  showMessageCard: false,
  bindgetuserinfo: () => {},
  bindcontact: () => {},
  bindgetphonenumber: () => {},
  binderror: () => {},
  bindopensetting: () => {},
  bindlaunchapp: () => {},
};
Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.bool]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element),PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.bool]),
  maskClosable: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  maskClass: PropTypes.string,
  showCancel: PropTypes.bool,
  autoClosable: PropTypes.bool,
  lang: PropTypes.string,
  openType: PropTypes.string,
  sessionFrom: PropTypes.string,
  sendMessageTitle: PropTypes.string,
  sendMessagePath: PropTypes.string,
  sendMessageImg: PropTypes.string,
  appParameter: PropTypes.string,
  showMessageCard: PropTypes.bool,
  bindgetuserinfo: PropTypes.func,
  bindcontact: PropTypes.func,
  bindgetphonenumber: PropTypes.func,
  binderror: PropTypes.func,
  bindopensetting: PropTypes.func,
  bindlaunchapp: PropTypes.func,
};