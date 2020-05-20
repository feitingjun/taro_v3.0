export const getWeather = async (lat, lng) => {
  const data = await wx.cloud.callFunction({
    name: 'weather',
    data: { 
      $url: 'now',
      lat, lng
     }
  })
  debugger
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null 
}