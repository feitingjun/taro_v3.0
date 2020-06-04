// 云函数入口文件
const cloud = require('wx-server-sdk')
const ENV = 'development-y2j06' || cloud.DYNAMIC_CURRENT_ENV

cloud.init({
  env: ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { type, fileID } = event;
  const file = await cloud.getTempFileURL({ fileList: [fileID] })
  const result = await cloud.openapi.ocr.idcard({
    type: 'photo',
    imgUrl: file.fileList[0].tempFileURL
  }).catch(err => {
    let message = ''
    if(err.errCode == 101002){
      message = '图片数据无效'
    }else if(err.errCode == 101001){
      message = '图片中无法找到证件'
    }else if(err.errCode == 101000){
      message = '图片URL错误或拉取URL图像错误'
    }else if(err.errCode == -1){
      message = '系统错误，请稍后重试'
    }else {
      message = '识别失败'
    }
    err.errMsg = message
    return err
  })
  return result
}