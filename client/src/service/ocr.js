export const getOcr = async (filePath, type) => {
  const { code, errMsg, data, message } = await wx.serviceMarket.invokeService({
    service: 'wx79ac3de8be320b71',
    api: 'OcrAllInOne',
    data: {
      // 用 CDN 方法标记要上传并转换成 HTTP URL 的文件
      img_url: new wx.serviceMarket.CDN({
        type: 'filePath',
        filePath: filePath,
      }),
      data_type: 3, //固定为 3，表示 URL 形式的图片
      ocr_type: type
    }
  }).catch(err => {
    return { code: 0, message: err }
  })
  if(errMsg === 'invokeService:ok'){
    return { code: 1, data }
  }else{
    // return { code: 0, message: errMsg || message.errMsg }
    console.log(errMsg || message.errMsg)
    return { code: 0, message: '识别失败' }
  }
}