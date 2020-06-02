const NAME = 'weather';

export const getWeather1 = async (cid) => {
  const data = await wx.cloud.callFunction({
    name: NAME,
    data: { 
      $url: 'now',
      cid
    }
  })
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null 
}

// 获取实时、24小时预报、7天预报、生活指数
export const getWeather = async (values) => {
  const data = await wx.cloud.callFunction({
    name: NAME,
    data: { 
      $url: 'forecast',
      ...values
     }
  })
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null 
}

// 获取15日天气预报
export const getMweather15d = async (cid) => {
  const data = await wx.cloud.callFunction({
    name: NAME,
    data: {
      $url: 'mweather15d',
      cid
    }
  })
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null
}

// 获取40日天气预报
export const getMweather40d = async (cid) => {
  const data = await wx.cloud.callFunction({
    name: NAME,
    data: {
      $url: 'mweather40d',
      cid
    }
  })
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null
}

// 保存消息订阅列表
export const saveSubscription = async (cid, district, list) => {
  const data = await wx.cloud.callFunction({
    name: NAME,
    data: {
      $url: 'saveSubscription',
      cid,
      list,
      district
    }
  })
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null
}

