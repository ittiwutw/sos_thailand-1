<template>
  <div>
    <loading :active.sync="StatusApi"></loading>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20">
        <v-card outlined>
            <v-data-table
            :headers="headers"
            :items="DataTable"
            @page-count="pageCount = $event"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :search="search"
            hide-default-footer
          >
          <template v-slot:[`item.activeFlag`]="{ item }">
            <a-tag color="green" v-if="item.activeFlag === 1">อนุมัติ</a-tag>
              <a-tag color="red" v-else-if="item.activeFlag === 0">ปิดการใช้งาน</a-tag>
              <a-tag color="red" v-else>รออนุมัติ</a-tag>
          </template>
          <template v-slot:[`item.edit`]="{ item }">
                <v-row no-gutters justify="center">
                  <v-switch v-model="item.check" dense   @change="ChangeStatus(item)"></v-switch>
                </v-row>
          </template>
          <template v-slot:[`item.edit3`]="{ item }">
                <a-button @click="detail(item)">รายละเอียด</a-button>
          </template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2 pb-3">
          <v-pagination  light v-model="page" :total-visible="7" :length="pageCount"></v-pagination>
        </div>
      </a-col>
    </a-row>
    <Modal :props="PropModal" />
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Modal from '@/components/ModalUser'
import { Decode } from '@/services'
export default {
  components: {
    Modal,
    Loading
  },
  props: ['props', 'StatusApi'],
  data () {
    return {
      PropModal: '',
      DataTable: [],
      pageCount: 10,
      page: 1,
      itemsPerPage: 10,
      search: '',
      headers: [
        { text: 'ลำดับ', sortable: false, value: 'num', align: 'center' },
        { text: 'ชื่อ', sortable: false, value: 'name', align: 'center' },
        { text: 'สถานที่ปฏิบัติงาน', sortable: false, value: 'adminCompanyName', align: 'center' },
        { text: 'หมายเลขโทรศัพท์', sortable: false, value: 'tel', align: 'center' },
        { text: 'เขต', sortable: false, value: 'adminDistrict', align: 'center' },
        { text: 'สถานะ', sortable: false, value: 'activeFlag', align: 'center' },
        { text: 'ใช้งาน/ไม่ใช้งาน', sortable: false, value: 'edit', align: 'center' },
        { text: 'รายละเอียด', sortable: false, value: 'edit3', align: 'center' }
      ]
    }
  },
  created () {
    // // console.log('this.props', this.props)
  },
  watch: {
    props (val) {
      this.SetDataTable(val)
    }
  },
  methods: {
    SetDataTable (val) {
      var data = [...val]
      data.forEach((item, index) => {
        item.num = index + 1
        if (item.activeFlag === 1) {
          item.check = true
        } else {
          item.check = false
        }
      })
      this.DataTable = data
      // // console.log('DataTable', this.DataTable)
    },
    async detail (val) {
      this.PropModal = val
      await this.$store.commit('SetModal')
    },
    async ChangeStatus (val) {
      if (val.check === false) {
        val.activeFlag = 0
      } else {
        val.activeFlag = 1
      }
      await this.$store.dispatch('EditUser', val)
      var user = JSON.parse(Decode.decode(localStorage.getItem('user')))
      await this.$store.dispatch('GetUserOfficer', user.adminCompanyName)
      var data = this.$store.state.ModuleApi.DataUserOfficer.data
      // // console.log('data officer =', data)
      this.SetDataTable(data)
    }
  }
}
</script>
