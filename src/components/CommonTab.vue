<template>
  <div class="tabs">
    <el-tag
      :key="tag.name"
      size="small"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @close="handleClose(tag)"
      @click="changeMenu(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from '@/store'
import router from '@/router'
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations([
      'closeTab'
    ]),
    handleClose (tag) {
      this.closeTab(tag)
      // router.go(-1)
    },
    changeMenu (item) {
      store.commit('selectMenu', item)
      router.push({ name: item.name })
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
