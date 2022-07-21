<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="beijing">
      <div style="margin-top: 15px; margin-left: 15px">
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button
          style="background-color: #409eff; color: #fff"
          class="btn"
          @click="roleDialogVisible = true"
          >添加用户</el-button
        >
      </div>

      <el-table
        :data="tableData"
        style="width: 98%"
        :model="loginForm"
        :rules="rules"
      >
        <el-table-column label="#" width="50px" type="index"> </el-table-column>

        <el-table-column label="姓名" width="340px" prop="username">
        </el-table-column>

        <el-table-column label="电话" width="340px" prop="mobile">
        </el-table-column>

        <el-table-column label="角色" width="340px" prop="role_name">
        </el-table-column>

        <el-table-column label="状态" width="340px">
          <template slot-scope="{ row }">
            <el-switch v-model="row.mg_state" @change="userState(row)">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180px">
          <el-row slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="userEdit(row.id)"
            ></el-button>
            <el-button
              icon="el-icon-share"
              size="small"
              type="warning"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="userDel(row.id)"
            ></el-button>
          </el-row>
        </el-table-column>
      </el-table>
      <div class="block">
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <el-dialog :visible.sync="roleDialogVisible" @close="onCancel">
          <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item v-if="roleDialogVisible" label="密码" prop="password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="userAdd">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { userList, userState, userDel, userAdd } from '@/api/user'
export default {
  created () {
    this.userList()
  },
  data () {
    return {
      roleDialogVisible: false,
      input3: '',
      select: '',
      tableData: [],
      loginForm: '',
      pagenum: 1, // 当前页码
      pagesize: 5, // 每页显示条数
      total: null, // 总条数
      paramsObj: {
        page: 1, // 默许拿到第一页
        pagesize: 4 // 每页数量
      },
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {

    // 获取修改的每页条数
    handleSizeChange (val) {
      console.log(val)
      this.pagesize = val
      this.userList()
    },
    // 获取当前页数
    handleCurrentChange (val) {
      console.log(val)
      this.pagenum = val
      this.userList()
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 获取用户列表
    async userList () {
      const res = await userList({
        query: this.input,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      this.tableData = res.data.data.users
      this.total = res.data.data.total
    }, // 用户状态
    async userState (row) {
      console.log(row.mg_state)
      await userState({
        uId: row.id,
        type: row.mg_state
      })
      this.$message.success('修改状态成功')
    },
    async userAdd () {
      try {
        await this.$refs.form.validate()
        const res = await userAdd(this.form)
        this.tableData.push(res.data.data)
        this.$message.success('添加成功')
      } catch (error) {
        console.log(error)
        this.$message.error('添加失败')
      }
    },

    // 取消弹出层
    onCancel () {
      this.roleDialogVisible = false
      this.form = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.$refs.form.resetFields()
    },
    // 删除
    userDel (id) {
      this.$confirm('确认删除么', {
        confirmButtonText: 'yes',
        cancelButtonClass: 'no',
        type: 'warning'
      }).then(async () => {
        await userDel(id)
        this.userList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'no'
        })
      })
    }
    // 编辑
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.el-select .el-input {
  width: 46px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input-group {
  width: 20%;
}
.beijing {
  background-color: #fff;
  padding-top: 5px;
  padding-left: 5px;
}
.btn {
  margin-left: 20px;
}
.el-input__inner {
  width: 464px;
}
.el-pagination {
  padding: 17px 17px;
}
</style>
