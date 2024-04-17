import dayjs from 'dayjs'
import { ethers } from 'ethers'
import Big from 'big.js'

export const getChangeColor = (changeValue: number) => {
  return changeValue >= 0 ? '#0ecb81' : '#FF6E6E'
}

export const formatNumber = (input: string | number, fixed?: number) => {
  const num = Big(input === '-' ? 0 : input).toFixed(fixed)
  return formatAmount(num, fixed || 4)

  // 判斷是否為整數
  // if (Number.isInteger(num)) {
  //   return formatAmount(num.toString()) // 直接返回整數部分
  // } else {
  //   // 將小數部分去除尾端的 0
  //   const decimalStr = num.toFixed(fixed).replace(/\.?0+$/, '')

  //   // 判斷處理後的小數部分是否為空
  //   if (decimalStr === '') return num.toFixed(0) // 只返回整數部分
  //   else return formatAmount(decimalStr) // 返回處理後的小數部分
  // }
}

export const formatAmount = (input: string | number, fixed?: number) => {
  const value = String(input)
  const integer = value.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const decimal = value.split('.')[1]?.slice(0, fixed || 4) || ''
  return value.includes('.') ? `${integer}.${decimal}` : `${integer}${decimal}`
}


export function isDevelopmentMode() {
  return process.env.NODE_ENV === 'development'
}

export function timeFormat(time: any = '', format = 'YYYY/MM/DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function isValidEVMAddress (address: string) {
  return ethers.isAddress(address)
}

export function toChecksumAddress (address: string) {
  return isValidEVMAddress(address) ? ethers.getAddress(address) : address
}

export function truncateSlice(hash: string) {
  return `${hash.slice(0, 10)}.....${hash.slice(-10)}`
}

export const sleep = (seconds: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), seconds * 1000)
  })
}

export const timeCountdown = (timestamp: number) => {
  // 目標時間
  const targetTime = dayjs(timestamp)

  // 現在時間
  const currentTime = dayjs()

  // 計算剩餘時間
  const diff = targetTime.diff(currentTime)

  // 轉換為天、小時、分鐘和秒
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

export const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
