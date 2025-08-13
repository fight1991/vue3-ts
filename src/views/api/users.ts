import { httpPost } from '@/request'
import type { WithPage } from '@/request/type'
interface userInfoReq {
  userId: string
  name: string
  avatar: string
}

interface userInfoRes {
  age: string
  email: string
  phone: string
}
// 获取用户信息
export const getUserInfo = (params: userInfoReq): Promise<userInfoRes> => {
  return httpPost({
    url: '/user/info',
    data: params,
  })
}

// 查询列表示例

interface userListReq {
  userId: string
}
interface userListItem {
  userId: string
  name: string
  email: string
  phone: string
  age: string
}
export const getUserList = (params: WithPage<userListReq>): Promise<WithPage<userListItem[]>> => {
  return httpPost({
    url: '/user/list',
    data: params,
  })
}

getUserList({
  data: { userId: '123' },
  page: {
    pageIndex: 1,
    pageSize: 10,
  },
}).then((res) => {
  console.log(res.data)
  console.log(res.page)
})
