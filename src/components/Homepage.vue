<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
        <v-list height="180" class="mt-3">
          <a-row type="flex" justify="center" align="middle">
            <a-col :span='24' class="centerdiv">
              <v-avatar size="120">
                <img :src="picture" />
                </v-avatar>
            </a-col>
            <a-col :span='24' class="centerdiv">
              <span class="headline">{{username}} </span>
            </a-col>
          </a-row>
        </v-list>
        <v-divider></v-divider>
        <a-menu mode="vertical">
          <a-menu-item v-for="item in Navigator" :key="item.key" @click="ChangePage(item)">
            <span class="pl-5">{{item.text}}</span>
          </a-menu-item>
        </a-menu>
      </v-navigation-drawer>
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{Header}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="Logout">ออกจากระบบ</v-btn>
        </v-app-bar>
        <v-main  class="div_overflow">
          <v-container grid-list-xs>
            <router-view></router-view>
          </v-container>
        </v-main>
    </v-app>
  </div>
</template>
<script>
import { Decode } from '@/services'
export default {
  data () {
    return {
      drawer: true,
      Header: '',
      picture: '',
      username: '',
      NavigatorSuperAdmin: [
        // { key: 'manu1', text: 'Manage เจ้าหน้าที่', path: '/ManageOfficer', name: 'ManageOfficer' },
        { key: 'manu4', text: 'รายงานการเเจ้งเหตุ', path: '/', name: 'Report' },
        { key: 'manu5', text: 'ประวัติการเเจ้งเหตุ', path: '/History', name: 'History' },
        { key: 'manu11', text: 'ประวัติการเรียกใช้บริการ', path: '/ServiceHistory', name: 'ServiceHistory' },
        { key: 'manu3', text: 'จัดการ Area Admin', path: '/ManageAdmin', name: 'ManageAdmin' },
        { key: 'manu10', text: 'จัดการผู้ใช้งานทั้งหมด', path: '/ManageAllUser', name: 'ManageAllUser' },
        { key: 'manu7', text: 'ประเภทการให้บริการ', path: '/AddService', name: 'AddService' },
        { key: 'manu2', text: 'จัดการผู้ให้บริการ', path: '/ManageService', name: 'ManageService' },
        { key: 'manu6', text: 'เเก้ไขข้อมูลส่วนตัว', path: '/EditUser', name: 'EditUser' },
        { key: 'manu9', text: 'เเจ้งเตือนผู้ใช้', path: '/SendMessage', name: 'SendMessage' }
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบริหารบุคลากร', child: [{ name: 'Tbnoung' }] }
      ],
      NavigatorAdmin: [
        // { key: 'manu2', text: 'อนุมัติเจ้าหน้าที่', path: '/ApprovedOfficer', name: 'ApprovedOfficer' },
        { key: 'manu3', text: 'รายงานการเเจ้งเหตุ', path: '/', name: 'Report' },
        { key: 'manu4', text: 'ประวัติการเเจ้งเหตุ', path: '/History', name: 'History' },
        { key: 'manu1', text: 'จัดการเจ้าหน้าที่', path: '/ManageOfficer', name: 'ManageOfficer' },
        { key: 'manu5', text: 'เเก้ไขข้อมูล', path: '/EditUser', name: 'EditUser' }
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบัญชีและการเงิน' },
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบริหารบุคลากร', child: [{ name: 'Tbnoung' }] }
      ],
      NavigatorAdminCompanyName: [
        // { key: 'manu1', text: 'Manage Officer Section', path: '/ManageOfficer', name: 'ManageOfficer' },
        // { key: 'manu2', text: 'อนุมัติเจ้าหน้าที่', path: '/ApprovedOfficer', name: 'ApprovedOfficer' },
        { key: 'manu3', text: 'รายงานการเเจ้งเหตุ', path: '/', name: 'Report' },
        { key: 'manu4', text: 'ประวัติการเเจ้งเหตุ', path: '/History', name: 'History' },
        { key: 'manu5', text: 'เเก้ไขข้อมูล', path: '/EditUser', name: 'EditUser' }
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบัญชีและการเงิน' },
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบริหารบุคลากร', child: [{ name: 'Tbnoung' }] }
      ],
      NavigatorDefault: [
        { key: 'manu3', text: 'รายงานการเเจ้งเหตุ', path: '/', name: 'Report' },
        { key: 'manu4', text: 'ประวัติการเเจ้งเหตุ', path: '/History', name: 'History' },
        { key: 'manu5', text: 'เเก้ไขข้อมูล', path: '/EditUser', name: 'EditUser' }
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบัญชีและการเงิน' },
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบริหารบุคลากร', child: [{ name: 'Tbnoung' }] }
      ],
      Navigator: []
    }
  },
  created () {
    // // console.log('เข้า create home page')
    this.$EventBus.$on('StatusHeader', (val) => {
      this.CheckHeader(val)
    })
    var checkuser = JSON.parse(Decode.decode(localStorage.getItem('user')))
    console.log('checkuser', checkuser)
    this.username = checkuser.name
    console.log('checkuser', checkuser)
    if (checkuser.logoImg === '' || checkuser.logoImg === 'null' || checkuser.logoImg === undefined) {
      this.picture = 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
    } else {
      this.picture = checkuser.logoImg
    }
    if (checkuser.userType === 'ADMIN') {
      if (checkuser.adminCompanyName === 'Thailand') {
        this.Navigator = this.NavigatorAdminCompanyName
      } else {
        this.Navigator = this.NavigatorAdmin
      }
    } else if (checkuser.userType === 'SUPERADMIN') {
      this.Navigator = this.NavigatorSuperAdmin
      this.Header = 'Manage ผู้ให้บริการ'
      this.$router.push({ path: '/' }).catch(() => {})
    } else {
      this.Navigator = this.NavigatorDefault
    }
    this.CheckHeader()
  },
  methods: {
    async ChangePage (val) {
      // // console.log('เข้า ChangePage', val)
      // // console.log(val, this.$router.currentRoute)
      if (val.name !== this.$router.currentRoute.name) {
        this.$router.push({ path: val.path }).catch(() => {})
      }
    },
    CheckHeader (val) {
      this.Header = val
    },
    Logout () {
      localStorage.removeItem('user')
      window.location.reload()
    }
  }
}
</script>
<style scoped>
.centerdiv {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.div_overflow {
  overflow: auto;
  width:100%;
  height:89vh
}
</style>
<style>
.v-application ul, .v-application ol {
    padding: 0px 0px !important;
}

</style>
