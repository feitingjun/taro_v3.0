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
