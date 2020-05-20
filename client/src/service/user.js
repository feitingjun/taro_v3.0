const NAME = 'user';

export const getUserInfo = async (wxInfo) => {
  const data = await wx.cloud.callFunction({
    name: NAME,
    data: {
      $url: 'get',
      wxInfo
    }
  })
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null
}