<template>
  <div style="padding: 20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import router from '@/router'
import store from '@/store'
export default {
  methods: {
    login () {
      this.$http.post('api/permission/getMenu', this.form).then(({ data }) => {
        if (data.code === 2000) {
          // 避免二次登录
          store.commit('clearMenu')
          store.commit('setMenu', data.data.menu)
          store.commit('setToken', data.data.token)
          store.commit('addMenu', router)
          router.push({ name: 'home' })
        } else {
          this.$message.warning(data.data.message)
        }
      })
    }
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
}
</style>
