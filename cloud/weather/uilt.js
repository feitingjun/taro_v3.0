function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}

function handleAqiTxt(aqi) {
  if(aqi <= 50){
    return '优'
  }else if(aqi > 50 && aqi <= 100){
    return '良'
  }else if(aqi > 100 && aqi <= 150){
    return '轻度污染'
  }else if(aqi > 151 && aqi <= 200){
    return '中度污染'
  }else if(aqi > 201 && aqi <= 300){
    return '重度污染'
  }else if(aqi > 300){
    return '严重污染'
  }
}