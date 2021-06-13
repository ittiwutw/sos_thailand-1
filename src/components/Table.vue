<template>
  <div>
    <loading :active.sync="StatusApi"></loading>
    <a-row type="flex" justify="center">
      <a-col :span="24" v-if="type !== 'all'">
        <a-row type="flex">
          <a-col :span="5" class="mb-3" offset="2">
              <a-button type="primary" @click="CreateOfficer" v-if="StatusUser === 'ADMIN'">สร้างเจ้าหน้าที่</a-button>
              <a-button type="primary" @click="CreateAdmin" v-else>สร้างแอดมิน</a-button>
          </a-col>
          <a-col :span="7" offset="8">
            <v-text-field dense hide-details v-model="search" outlined placeholder="ค้นหา"></v-text-field>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xs="24" :md="20" class="mt-5">
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
          <template v-slot:[`item.delete`]="{ item }">
            <a-icon @click="deleteUser(item)" class="pl-0" type="delete" />
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
  props: ['props', 'StatusApi', 'type'],
  data () {
    return {
      StatusUser: 'ADMIN',
      PropModal: '',
      DataTable: [],
      pageCount: 10,
      page: 1,
      itemsPerPage: 10,
      search: '',
      headers: [],
      headersUser: [
        { text: 'ลำดับ', sortable: false, value: 'num', align: 'center' },
        { text: 'ชื่อ', sortable: false, value: 'name', align: 'center' },
        { text: 'สถานที่ปฏิบัติงาน', sortable: false, value: 'adminCompanyName', align: 'center' },
        { text: 'หมายเลขโทรศัพท์', sortable: false, value: 'tel', align: 'center' },
        { text: 'เขต', sortable: false, value: 'adminDistrict', align: 'center' },
        { text: 'สถานะ', sortable: false, value: 'activeFlag', align: 'center' },
        { text: 'ใช้งาน/ไม่ใช้งาน', sortable: false, value: 'edit', align: 'center' },
        { text: 'รายละเอียด', sortable: false, value: 'edit3', align: 'center' },
        { text: 'delete', sortable: false, value: 'delete', align: 'center' }
      ],
      headersAlluser: [
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
    var checkuser = JSON.parse(Decode.decode(localStorage.getItem('user')))
    // console.log('this.props', checkuser)
    this.StatusUser = checkuser.userType
    if (this.type === 'all') {
      this.headers = this.headersAlluser
    } else {
      this.headers = this.headersUser
    }
  },
  watch: {
    props (val) {
      this.SetDataTable(val)
    }
  },
  methods: {
    CreateAdmin () {
      this.$router.push({ path: '/CreateUser?State=ADMIN' }).catch(() => {})
    },
    CreateOfficer () {
      this.$router.push({ path: '/CreateUser?State=OFFICER' }).catch(() => {})
    },
    SetDataTable (val) {
      var data = val
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
      console.log('data officer =', data)
      this.SetDataTable(data)
    },
    async deleteUser (item) {
      var data = {
        userId: item.userId
      }
      await this.$store.dispatch('DeleteUser', data)
      var res = this.$store.state.ModuleApi.DeleteUser
      if (res.response_description === 'SUCCESS') {
        this.$swal({
          icon: 'success',
          text: `Delete user ${res.response_description}`,
          showConfirmButton: false,
          timer: 2000
        })
        this.$EventBus.$emit('fetchUser')
      } else {
        this.$swal({
          icon: 'error',
          text: res.response_description,
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }
}
</script>
