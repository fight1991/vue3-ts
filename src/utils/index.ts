// 获取UTC时区偏移量
export const getTimeOffsetInfo = (): string => {
  const offset = new Date().getTimezoneOffset() / 60
  return 'UTC' + offset
}
