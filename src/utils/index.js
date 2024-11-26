import dayjs from 'dayjs'
import pagesJson from '@/pages.json'

/**
 * 节流
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export const throttle = (fn, delay) => {
  let timer = null

  return function (...args) {
    if (!timer) {
      fn.apply(this, args)

      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }
}

export const pxToRpx = (px, screenWidth) => (750 * Number.parseInt(px)) / screenWidth

export const rpxToPx = (rpx, screenWidth) => (screenWidth * Number.parseInt(rpx)) / 750

/**
 * 今天、明天、1天后、2天后、...、n天后
 */
export const getHumanizeDiffDay = (startTime, endTime) => {
  const diff = Math.abs(dayjs(endTime).diff(dayjs(startTime), 'day'))
  return diff < 2 ? ['今天', '明天'][diff] : `${diff}天后`
}

// 将数字 / 100
export function divideBy100AndFormat (input) {
  const number = parseFloat(input)
  // 检查转换后的结果是否为有效数字
  if (isNaN(number)) {
    return '0'
  }
  const result = number / 100
  // 返回格式化的结果，保留两位小数
  // if (Number.isInteger(result)) {
  //   return result.toString()
  // } else {
  return result.toFixed(2)
  // }
}

/**
 * 校验身份证号
 * @param {*} code
 * @returns
 */
export const indentityCodeValid = (code) => {
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  const idCardReg =
    /^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i // 身份证格式正则表达式
  let isPass = true // 身份证验证是否通过（true通过、false未通过）

  // 如果身份证不满足格式正则表达式
  if (!code.match(idCardReg)) {
    isPass = false
  } else if (!city[code.substr(0, 2)]) {
    isPass = false
  } else if (code.length === 18) {
    // 18位身份证需要验证最后一位校验位
    code = code.split('')
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    // 校验位
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    let ai = 0
    let wi = 0
    for (let i = 0; i < 17; i++) {
      ai = parseInt(code[i])
      wi = factor[i]
      sum += ai * wi // 开始计算并相加
    }
    const last = parity[sum % 11] // 求余
    if (last.toString() !== code[17]) {
      isPass = false
    }
  }
  return isPass
}

export const getPages = (key = 'needLogin') => {
  // 这里处理主包
  const pages = [
    ...pagesJson.pages
      .filter((page) => page[key])
      .map((page) => ({
        ...page,
        path: `/${page.path}`
      }))
  ]
  // 这里处理分包
  const subPages = []
  pagesJson.subPackages?.forEach((subPageObj) => {
    const { root } = subPageObj

    subPageObj.pages
      .filter((page) => page[key])
      .forEach((page) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`
        })
      })
  })
  const result = [...pages, ...subPages]
  return result
}

export const needLoginPages = getPages('needLogin').map((page) => page.path)
