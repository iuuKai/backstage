import Mock from 'mockjs'
import homeApi from './home'
import userApi from './user'
import permissionApi from './permission'

// 设置200-2000ms延时请求数据, 模拟耗时
Mock.setup({
  timeout: '200-2000'
})

// 首页相关
// 拦截 /home/getData
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)

// 登录相关
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)
