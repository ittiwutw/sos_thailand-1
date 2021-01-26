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
            <a-button @click="Logout">ออกจากระบบ</a-button>
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
        // { key: 'manu1', text: 'จัดการเจ้าหน้าที่', path: '/', name: 'ManageOfficer' },
        { key: 'manu2', text: 'จัดการผู้ให้บริการ', path: '/ManageService', name: 'ManageService' },
        { key: 'manu3', text: 'จัดการแอดมิน', path: '/ManageAdmin', name: 'ManageAdmin' },
        { key: 'manu4', text: 'เเก้ไขข้อมูล', path: '/EditUser', name: 'EditUser' }
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบัญชีและการเงิน' },
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบริหารบุคลากร', child: [{ name: 'Tbnoung' }] }
      ],
      NavigatorAdmin: [
        { key: 'manu1', text: 'จัดการเจ้าหน้าที่', path: '/', name: 'ManageOfficer' },
        // { key: 'manu2', text: 'จัดการผู้ให้บริการ', path: '/ManageService', name: 'ManageService' },
        { key: 'manu3', text: 'รายงานการเเจ้งเหตุ', path: '/Report', name: 'Report' },
        { key: 'manu4', text: 'ประวัติการเเจ้งเหตุ', path: '/History', name: 'History' },
        { key: 'manu5', text: 'เเก้ไขข้อมูล', path: '/EditUser', name: 'EditUser' }
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบัญชีและการเงิน' },
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบริหารบุคลากร', child: [{ name: 'Tbnoung' }] }
      ],
      NavigatorDefault: [
        { key: 'manu3', text: 'รายงานการเเจ้งเหตุ', path: '/Report', name: 'Report' },
        { key: 'manu4', text: 'ประวัติการเเจ้งเหตุ', path: '/History', name: 'History' },
        { key: 'manu5', text: 'เเก้ไขข้อมูล', path: '/EditUser', name: 'EditUser' }
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบัญชีและการเงิน' },
        // { icon: 'mdi-chart-timeline-variant', text: 'ระบบบริหารบุคลากร', child: [{ name: 'Tbnoung' }] }
      ],
      Navigator: []
    }
  },
  created () {
    var checkuser = JSON.parse(Decode.decode(localStorage.getItem('user')))
    this.username = checkuser.name
    if (checkuser.logoImg === '' || checkuser.logoImg === null) {
      this.picture = 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
    } else {
      this.picture = checkuser.logoImg
    }
    if (checkuser.userType === 'ADMIN') {
      this.Navigator = this.NavigatorAdmin
    } else if (checkuser.userType === 'SUPERADMIN') {
      this.Navigator = this.NavigatorSuperAdmin
      this.$router.push({ path: '/ManageService' })
    } else {
      this.Navigator = this.NavigatorDefault
    }
    this.CheckHeader()
  },
  methods: {
    ChangePage (val) {
      console.log(val, this.$router.currentRoute)
      if (val.name !== this.$router.currentRoute.name) {
        this.$router.push({ path: val.path })
        this.CheckHeader()
      }
    },
    CheckHeader () {
      if (this.$router.currentRoute.name === 'ManageOfficer') {
        this.Header = 'จัดการเจ้าหน้าที่'
      } else if (this.$router.currentRoute.name === 'ManageService') {
        this.Header = 'จัดการผู้ให้บริการ'
      } else if (this.$router.currentRoute.name === 'Report') {
        this.Header = 'รายงานการเเจ้งเหตุ'
      } else if (this.$router.currentRoute.name === 'History') {
        this.Header = 'ประวัติการเเจ้งเหตุ'
      } else if (this.$router.currentRoute.name === 'EditUser') {
        this.Header = 'เเก้ไขข้อมูล'
      } else if (this.$router.currentRoute.name === 'CreateUser') {
        this.Header = 'สร้างผู้ใช้งาน'
      } else if (this.$router.currentRoute.name === 'ManageAdmin') {
        this.Header = 'จัดการแอดมิน'
      }
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
