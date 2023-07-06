/**
 * 表单校验、类型校验、正则匹配函数
 */

let _toString = Object.prototype.toString

// 切割引用类型得到后面的基本类型
export const toRawType = (v: any) => {
  return _toString.call(v).slice(8, -1)
}

// 判断是否为数组类型，且数组长度大于0
export const isCorrectArray = (v: any): boolean => {
  return toRawType(v) === 'Array' && v.length > 0
}

// 判断原始类型是否为Object类型
export const isPlainObject = (v: any): boolean => {
  return toRawType(v) === 'Object'
}

// /判断是否为 空对象
export const isEmptyObject = (obj: object): boolean => {
  for (let key in obj) {
    return false
  }
  return true
}

// 判断是否有key的Object类型
export const isValidObject = (v: any): boolean => {
  return isPlainObject(v) && !isEmptyObject(v)
}

// 判断是否为1开头的11位号码
export const isPhone = (v: any): boolean => {
  return /^[1][0-9]{10}$/.test(v)
}

// 判断是否为身份证号
export const isIdCard = (v: any): boolean => {
  return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(v)
}

// 判断有两位小数的正实数：
export const isPosRealDecimal = (str: any): boolean => {
  return str ? /^[0-9]+(.[0-9]{1,2})?$/.test(str) : false
}

// 判断是否为 非undefined&&非null
export const isDef = (v: any): boolean => {
  return v !== undefined && v !== null
}

// 判断是否JSON字符串
export const isJSON = (str: any): boolean => {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return false
}

// 判断由8~16位数字+字母组成
export const isPassWord = (str: any): boolean => {
  return str ? /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,16}$/.test(str) : false
}

// 密码必须是至少8位的数字和字母组合
export const isPassWord2 = (val: any): boolean => {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,30}$/.test(val)
}

// 第一位不能是0，必须是数字
export const isNum = (val: any): boolean => {
  let reg = /^[1-9]{1}\d*$/
  if (reg.test(val) || val === '') {
    return true
  }
  return false
}

// 校验金额规则： 第一位不为0，且只能有一位 小数点，并且保留2位小数
export const checkPrice = function (val: any) {
  let reg = /^(?:0|[1-9]\d*)(\.\d{0,2})?$/
  if (reg.test(val) || val === '') {
    return true
  }
  return false
}

// 多个表单校验
export const formValidatePass = (item: any) => {
  // const resultArr: any = [] //用来接受返回结果的数组

  return new Promise(function (resolve: any, reject) {
    item.value.validate((valid: any, fields: any) => {
      if (valid) {
        resolve(valid)
      } else {
        reject(fields)
      }
    })
  })
}

/**
 * 判断url是否是http或https
 * @param {string} path
 * @returns {Boolean}
 */
export function isHttp(url: string) {
  if (!url) {
    return false
  }
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}

// 是否1个点号开通结尾
export const isStartOrEndWithDot = (val: any) => {
  return /^\.[0-9]|[0-9]\.$/.test(val)
}

// 是否是货币金额格式
export const isCurrencyAmountFormat = (val: any) => {
  return /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/.test(val)
}

// 是否输入中的货币金额格式
export const isInputCurrencyAmountFormat = (val: any) => {
  if (val === '' || val === '0' || val === undefined) {
    return true
  }
  if (isStartOrEndWithDot(val)) {
    return true
  }
  return isCurrencyAmountFormat(val)
}
