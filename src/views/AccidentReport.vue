<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mt-5 mb-5">
        <span class="headline">รายงานการเเจ้งเหตุ</span>
      </a-col>
      <a-col :xs="24" :md="20" class="mb-5">
        <a-card>
          <span>ชื่อ : </span>
          <span>{{ Username }} </span><br>
          <span>อีเมล์ : </span>
          <span>{{ Email }}</span><br>
          <span>หน่วยงานปฎิบัติงาน : </span>
          <span>{{ Location }}</span><br>
          <span>เขตการปกครอง : </span>
          <span>{{ Area }}</span><br>
        </a-card>
      </a-col>
      <a-col :span='24'>
        <Table :props="DataTable"  :StatusApi="StatusApi"/>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Table from '@/components/TableReport'
import { Decode } from '@/services'
export default {
  components: {
    Table
  },
  data () {
    return {
      DataTable: [],
      StatusApi: true,
      Username: '',
      Email: '',
      Location: '',
      Area: ''
    }
  },
  async created () {
    this.$EventBus.$emit('StatusHeader', 'รายงานการเเจ้งเหตุ')
    var user = JSON.parse(Decode.decode(localStorage.getItem('user')))
    // console.log('user หน้า report', user)
    this.Username = user.name
    this.Email = user.email
    this.Location = user.adminCompanyName
    this.Area = user.adminProvince
    this.GetDataTable()
    setInterval(() => {
      this.GetDataTable()
    }, 10000)
  },
  methods: {
    async GetDataTable () {
      var user = JSON.parse(Decode.decode(localStorage.getItem('user')))
      var send = {}
      if (user.adminAreaType === 'PROVINCE') {
        send.type = 'Province'
        send.area = user.adminProvince
      } else if (user.adminAreaType === 'SUBDISTRICT') {
        send.type = 'Subdistrict'
        send.area = user.adminSubDistrict
      } else if (user.adminAreaType === 'DISTRICT') {
        send.type = 'District'
        send.area = user.adminDistrict
      } else if (user.adminAreaType === 'ALL') {
        send.type = 'ALL'
      }
      await this.$store.dispatch('GetReport', send)
      var data = this.$store.state.ModuleApi.DataReport
      this.DataTable = []
      data.data.forEach((element, index) => {
        element.num = index + 1
        this.DataTable.push(element)
      })
      this.StatusApi = false
    }
  }
}
</script>
