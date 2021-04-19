import Cookie from 'js-cookie'
export default {
  state: () => ({
    isCollapse: true,
    currentMenu: null,
    menu: [],
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  }),
  mutations: {
    setMenu (state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu (state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu (state, router) {
      if (!Cookie.get('menu')) return
      // 避免刷新时丢失
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const currenMenu = [
        {
          path: '/',
          component: () => import('@/views/Main'),
          children: []
        }
      ]
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            // item.component = () => import(`@/views/${item.url}`)
            item.component = resolve => require([`@/views/${item.url}`], resolve)
            return item
          })
          currenMenu[0].children.push(...item.children)
        } else {
          // item.component = () => import(`@/views/${item.url}`)
          item.component = resolve => require([`@/views/${item.url}`], resolve)
          currenMenu[0].children.push(item)
        }
      })
      // Vue2
      // router.addRoutes(currenMenu)
      // Vye3
      router.addRoute(currenMenu[0])
    },
    selectMenu (state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if (result === -1) state.tabsList.push(val)
      } else {
        state.currentMenu = null
      }
    },
    closeTab (state, val) {
      const result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    },
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
