const NAME = 'weather';

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