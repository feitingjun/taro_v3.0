const NAME = 'weather';

export const getWeather = async (cid) => {
  const data = await wx.cloud.callFunction({
    name: NAME,
    data: { 
      $url: 'now',
      cid
     }
  })
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null 
}

export const getForecast = async (cid) => {
  const data = await wx.cloud.callFunction({
    name: NAME,
    data: { 
      $url: 'forecast',
      cid
     }
  })
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null 
}