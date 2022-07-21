import request from '@/utils/request'

// 登录接口
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}

// 用户管理
export const userList = (params) => {
  return request({
    method: 'GET',
    url: 'users',
    params
  })
}

// 修改用户状态
export const userState = (data) => {
  return request({
    method: 'PUT',
    url: `users/${data.uId}/state/${data.type}`,
    data
  })
}

// 删除用户
export const userDel = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}

// 编辑用户提交
export const userEdit = (data) => {
  return request({
    method: 'PUT',
    url: `users/${data.id}`
  })
}

// 新增用户
export const userAdd = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}
