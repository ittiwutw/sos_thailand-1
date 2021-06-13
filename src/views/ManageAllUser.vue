<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mt-5 mb-5">
        <span class="headline">จัดการผู้ใช้งานทั้งหมด</span>
      </a-col>
      <!-- <a-col :xs="24" :md="20" class="mb-3">
        <a-row type="flex">
          <a-button type="primary" @click="CreateAdmin">สร้างแอดมิน</a-button>
        </a-row>
      </a-col> -->
      <a-col :span='24'>
        <Table :props="DataTable" :StatusApi="StatusApi" type="all" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Table from '@/components/Table'
export default {
  components: {
    Table
  },
  data () {
    return {
      StatusApi: true,
      DataTable: []
    }
  },
  async created () {
    this.$EventBus.$emit('StatusHeader', 'จัดการผู้ใช้งานทั้งหมด')
    setInterval(() => {
      this.GetDataTable()
    }, 10000)
  },
  methods: {
    CreateAdmin () {
      this.$router.push({ path: '/CreateUser?State=ADMIN' }).catch(() => {})
    },
    async GetDataTable () {
      this.DataTable = []
      await this.$store.dispatch('GetAllUser')
      var data = this.$store.state.ModuleApi.DataAllUser
      data.data.forEach((element, index) => {
        element.num = index + 1
        this.DataTable.push(element)
      })
      this.StatusApi = false
    }
  }
}
</script>
