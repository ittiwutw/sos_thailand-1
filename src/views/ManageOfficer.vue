<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mt-5 mb-5">
        <span class="headline">จัดการเจ้าหน้าที่</span>
      </a-col>
      <a-col :xs="24" :md="20" class="mb-3">
        <a-row type="flex">
          <a-button type="primary" @click="CreateOfficer">สร้างเจ้าหน้าที่</a-button>
        </a-row>
      </a-col>
      <a-col :span='24'>
        <Table :props="DataTable" :StatusApi="StatusApi" />
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
    await this.$store.dispatch('GetUserOfficer')
    var data = this.$store.state.ModuleApi.DataUserOfficer
    this.DataTable = data.data
    this.StatusApi = false
  },
  methods: {
    CreateOfficer () {
      this.$router.push({ path: '/CreateUser?State=OFFICER' })
    }
  }
}
</script>
