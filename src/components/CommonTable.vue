<template>
  <div class="common-table">
    <el-table
      :data="tableData"
      height="90%"
      stripe
      highlight-current-row
      v-loading="config.loading"
    >
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span>{{
            (config.page - 1) * config.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.label | isSmall"
        min-width="90"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="142">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :page-size.sync="config.pageSize"
      :current-page.sync="config.page"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    handleEdit (row) {
      this.$emit('edit', row)
    },
    handleDelete (row) {
      this.$emit('del', row)
    },
    changePage (page) {
      this.$emit('changePage', page)
    }
  },
  filters: {
    isSmall: function (value) {
      const smallList = ['姓名', '性别', '年龄']
      if (smallList.findIndex(v => v === value) > -1) {
        return '100%'
      } else if (/日期/.test(value)) {
        return 180
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  position: relative;
  height: calc(100% - 62px);
  background-color: #fff;
  .pager {
    position: absolute;
    right: 0;
  }
}
</style>
