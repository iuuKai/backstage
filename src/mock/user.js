import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param20bj (url) {
  const search = url.split('?')[1]
  if (!search) return {}
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limit; name 可以省略，page, limit 有默认值
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    console.log('参数', config)
    const { name, page = 1, limit = 10 } = param20bj(config.url)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => {
      if (index < limit * page && index > limit * (page - 1) - 1) return true
    })
    return {
      code: 2000,
      count: mockList.length,
      limit,
      list: pageList
    }
  },
  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: config => {
    console.log(JSON.parse(config.body))
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    List.push({
      id: Mock.Random.guid(),
      name,
      addr,
      age,
      birth,
      sex
    })
    return {
      code: 2000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = param20bj(config.url)
    if (!id) {
      return {
        code: 4003,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 2000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {},
  /**
   * 更新用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
    const index = List.findIndex(u => u.id === id)
    List[index] = {
      id,
      name,
      addr,
      age,
      birth,
      sex
    }
    return {
      code: 2000,
      data: {
        message: '编辑成功'
      }
    }
  }
}
