<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="isShow = true">+ 新 增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary">搜 索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm'
import CommonTable from '@/components/CommonTable'
export default {
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.config.loading = true
      this.$http.get('/api/user/getUser', {
        params: {
          page: this.config.page
        }
      }).then(({ data }) => {
        this.tableData = data.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        this.config.total = data.count
        this.config.pageSize = data.limit
        this.config.loading = false
      })
    },
    editUser (row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    confirm () {
      if (this.operateType === 'edit') {
        // 编辑用户
        this.$http.post('/api/user/edit', this.operateForm).then(() => {
          this.isShow = false
          this.getList()
        })
      } else {
        // 新增用户
        this.$http.post('/api/user/add', this.operateForm).then(() => {
          this.isShow = false
          this.getList()
        })
      }
    },
    delUser (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        this.$http.get('/api/user/del', {
          params: {
            id
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  watch: {
    isShow (newValue, oldValue) {
      if (newValue === false) {
        this.operateForm = {
          name: '',
          addr: '',
          age: '',
          birth: '',
          sex: ''
        }
      }
    }
  },
  data () {
    return {
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期'
        },
        {
          prop: 'addr',
          label: '地址'
        }
      ],
      config: {
        page: 1,
        total: 0,
        pageSize: 0,
        loading: false
      },
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          options: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址'
        }
      ],
      searchFrom: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ]
    }
  },
  components: {
    CommonForm,
    CommonTable
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/common';
</style>
