export default {
  pages: [
    'pages/index/index',
    'pages/compass/index',
    'pages/robot/index',
    'pages/translate/index',
    'pages/ocr/index',
    'pages/ocr/idcard/index',
    'pages/ocr/bankcard/index',
    'pages/ocr/drivinglicense/index',
    'pages/ocr/driving/index',
    'pages/ocr/biz/index',
    'pages/ocr/common/index',
    'pages/speak/index',
    'pages/scan/index',
    'pages/map/index',
    'pages/weather/index/index',
    'pages/weather/selectCity/index',
    'pages/weather/mweather15d/index',
    'pages/weather/mweather40d/index',
    'pages/weather/liveZS/index',
    'pages/weather/alarm/index',
    'pages/weather/subscription/index',
    'pages/screenLuminance/index',
    'pages/electricity/index',
    'pages/login/index',
    'pages/auth/index'
  ],
  // subpackages: [{
  //   root: 'pages/weather',
  //   name: 'weather',
  //   pages: [
  //     'index/index',
  //     'selectCity/index',
  //     'mweather15d/index',
  //     'mweather40d/index',
  //     'liveZS/index',
  //     'alarm/index',
  //     'subscription/index',
  //   ]
  // }],
  // preloadRule: {
  //   'pages/index/index': {
  //     network: 'all',
  //     packages: ['weather']
  //   }
  // },
  window: {
    backgroundColor: '#F6F6F6',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#F6F6F6',
    navigationBarTitleText: '一江明月一江秋',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom'
  },
  sitemapLocation: 'sitemap.json',
  permission: {
    'scope.userLocation': {
      'desc': '我们需要你的位置信息以实现定位'
    }
  },
  plugins: {
    chatbot: {
      version: '1.1.20',
      provider: 'wx8c631f7e9f2465e1'
    },
    WechatSI: {
      version: '0.3.4',
      provider: 'wx069ba97219f66d99'
    }
  },
  servicemarket: true
}
