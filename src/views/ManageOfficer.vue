<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mt-5 mb-5">
        <span class="headline">Manage Officer Section</span>
      </a-col>
      <a-col :xs="24" :md="20" class="mb-3" v-if="DisableCreate !== 'ALL'">
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
import { Decode } from '@/services'
import Table from '@/components/Table'
export default {
  components: {
    Table
  },
  data () {
    return {
      StatusApi: true,
      DataTable: [],
      DisableCreate: ''
    }
  },

  async created () {
    this.$EventBus.$emit('StatusHeader', 'Manage Officer Section')
    var user = JSON.parse(Decode.decode(localStorage.getItem('user')))
    // console.log('Manage Office =', user)
    this.DisableCreate = user.adminAreaType
    await this.$store.dispatch('GetUserOfficer', user.adminCompanyName)
    var data = this.$store.state.ModuleApi.DataUserOfficer
    data.data.forEach((element, index) => {
      element.num = index + 1
      this.DataTable.push(element)
    })
    this.StatusApi = false
  },
  methods: {
    CreateOfficer () {
      this.$router.push({ path: '/CreateUser?State=OFFICER' }).catch(() => {})
    }
  }
}
</script>
