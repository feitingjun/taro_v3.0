export const getOcr = async (fileID, type) => {
  const data = await wx.cloud.callFunction({
    name: 'ocr',
    data: {
      fileID, type
    }
  })
  return data.errMsg === 'cloud.callFunction:ok' ? data.result : null
}