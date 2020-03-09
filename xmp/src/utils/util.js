const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//数据原始类型
const objRawType = target => {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
} 

/**
 * 截取 length 长度字符
 * @param {String} str 
 * @param {Number} length 需要截取的长度
 */
const sliceStrByByte = (str, length) => {
  let inputLength = 0,
      newStr = ''
  //给一个变量来记录长度
  for (let i = 0; i < str.length; i++) {
      let countCode = str.charCodeAt(i);
      //返回指定位置的字符的Unicode编码
      //判断是不是ASCII码,Unicode码前128个字符是ASCII码
      if (countCode >= 0 && countCode <= 128) {
          inputLength++;
      } else {
          //如果是扩展码，则一次+2
          inputLength += 2;
      }
      newStr += str[i]
      if(inputLength === length) break
  }
  return newStr
}

const verify = rule => {
  if(objRawType(rule) !== 'regexp') {
    throw new Error('rule must be RegExp')
  }
  return target => {
    return rule.test(target)
  }
}

export {
  formatTime,
  formatNumber,
  sliceStrByByte,
  objRawType,
  verify
}