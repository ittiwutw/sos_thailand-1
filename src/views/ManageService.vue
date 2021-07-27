<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mt-5 mb-5">
        <span class="headline">Manage Service Section</span>
      </a-col>
      <a-col :xs="24" :md="20" class="mb-3">
        <a-row type="flex">
          <!-- <a-button type="primary" @click="CreateService">สร้างผู้ให้บริการ</a-button> -->
        </a-row>
      </a-col>
      <a-col :span='24'>
        <Table :props="DataTable"  :StatusApi="StatusApi" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Table from '@/components/TableService'
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
    this.$EventBus.$emit('StatusHeader', 'Manage Service Section')
    // setInterval(() => {
    this.GetDataTable()
    // }, 10000)
  },
  methods: {
    CreateService () {
      this.$router.push({ path: '/CreateUser?State=SERVICE' }).catch(() => {})
    },
    async GetDataTable () {
      this.DataTable = []
      await this.$store.dispatch('GetUserService')
      var data = this.$store.state.ModuleApi.DataUserService
      data.data.forEach((element, index) => {
        element.num = index + 1
        this.DataTable.push(element)
      })
      this.StatusApi = false
    }
  }
}
</script>
