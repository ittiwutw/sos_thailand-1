<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mt-5 mb-5">
        <span class="headline">Manage Area Admin</span>
      </a-col>
      <!-- <a-col :xs="24" :md="20" class="mb-3">
        <a-row type="flex">
          <a-button type="primary" @click="CreateAdmin">สร้างแอดมิน</a-button>
        </a-row>
      </a-col> -->
      <a-col :span='24'>
        <Table :props="DataTable" :StatusApi="StatusApi" type="" />
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
  mounted () {
    this.$EventBus.$on('fetchUser', this.GetDataTable)
    this.$on('hook:beforeDestroy', () => {
      this.$EventBus.$off('fetchUser')
    })
  },
  async created () {
    this.$EventBus.$emit('StatusHeader', 'Manage Area Admin')
    // setInterval(() => {
    this.GetDataTable()
    // }, 10000)
  },
  methods: {
    CreateAdmin () {
      this.$router.push({ path: '/CreateUser?State=ADMIN' }).catch(() => {})
    },
    async GetDataTable () {
      this.DataTable = []
      await this.$store.dispatch('GetUserAdmin')
      var data = this.$store.state.ModuleApi.DataUserAdmin
      data.data.forEach((element, index) => {
        element.num = index + 1
        this.DataTable.push(element)
      })
      this.StatusApi = false
    }
  }
}
</script>
