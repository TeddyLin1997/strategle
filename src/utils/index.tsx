export const getChangeColor = (changeValue: number) => {
  return changeValue >= 0 ? '#20b26c' : '#FF6E6E'
}

export const formatNumber = (input: string, fixed: number = 4) => {
  // 轉換為浮點數
  const num = parseFloat(input)

  // 判斷是否為整數
  if (Number.isInteger(num)) {
    return num.toString() // 直接返回整數部分
  } else {
    // 將小數部分去除尾端的 0
    const decimalStr = num.toFixed(fixed).replace(/\.?0+$/, '')

    // 判斷處理後的小數部分是否為空
    if (decimalStr === '') {
      return num.toFixed(0) // 只返回整數部分
    } else {
      return decimalStr // 返回處理後的小數部分
    }
  }
}

export function isDevelopmentMode() {
  return process.env.NODE_ENV === 'development'
}


// 測試函式
// console.log(formatNumber('123.4560'))  // 輸出: "123.456"
// console.log(formatNumber('789'))       // 輸出: "789"
// console.log(formatNumber('987.1200'))  // 輸出: "987.12"
