<template>
  <div class="header">
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="collapseMenu"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from '@/store'
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  methods: {
    logOut () {
      store.commit('clearToken')
      store.commit('clearMenu')
      location.reload()
    },
    ...mapMutations([
      'collapseMenu'
    ])
  },
  data () {
    return {
      userImg: require('../assets/images/user.jpeg')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  img.user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #f4f4f4;
    }
  }
}
</style>
