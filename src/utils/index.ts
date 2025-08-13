// 获取UTC时区偏移量
export const getTimeOffsetInfo = (): string => {
  const offset = new Date().getTimezoneOffset() / 60
  return 'UTC' + offset
}
// 获取浏览器语言
export const getLanguage = (): string => {
  return navigator.languages[1] || 'zh'
}
