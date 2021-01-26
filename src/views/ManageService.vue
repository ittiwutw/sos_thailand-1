<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mt-5 mb-5">
        <span class="headline">จัดการเจ้าผู้ให้บริการ</span>
      </a-col>
      <a-col :span='24'>
        <Table :props="DataTable"  :StatusApi="StatusApi" />
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
    await this.$store.dispatch('GetUserService')
    var data = this.$store.state.ModuleApi.DataUserService
    this.DataTable = data.data
    this.StatusApi = false
  }
}
</script>
