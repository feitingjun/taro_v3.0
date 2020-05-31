import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { View, Block, Text } from '@tarojs/components'

import './index.less'

export default function Modal(props) {
  const [ visible, setVisible ] = useState(false)
  const [ animation, setAnimation ] = useState(false)
  useEffect(() => {
    // setTimeout(() => {
    //   setVisible(props.visible)
    // }, 50)
    setAnimation(true)
    setVisible(props.visible)
    setTimeout(() => {
      setAnimation(false)
    }, 10000)
  }, [props.visible])

  const onCancel = () => {
    if(props.onCancel && typeof props.onCancel === 'function'){
      props.onCancel()
    }
  }
  console.log(`at-modal-mask${ animation ? '-animation':''}-${visible ? 'show':'hide'}`)
  return (
    <View
      onClick={onCancel}
      className={`at-modal-mask at-modal-mask-${visible ? 'show':'hide'} at-modal-mask${ animation ? '-animation':''}-${visible ? 'show':'hide'} ${props.maskClass}`}
    >
      <View className={`at-modal-body`}></View>
    </View>
  )
}
Modal.defaultProps = {
  visible: false,
  className: '',
  maskClosable: false,
  onCancel: () => {},
  onOk: () => {},
  okText: '确定',
  cancelText: '取消',
  destroyOnClose: true,
  maskClass: ''
};
Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.bool]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element),PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  maskClosable: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.bool]),
  destroyOnClose: PropTypes.bool,
  type: PropTypes.string,
  onRest: PropTypes.func,
  width: PropTypes.string,
  maskClass: PropTypes.string
};