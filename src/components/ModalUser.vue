<template>
  <div>
    <v-dialog v-model="Modal" width="45%" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">รายละเอียดเจ้าหน้าที่</v-card-title>
        <v-card-text>
          <a-row type="flex">
            <a-col :span='12'>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>ชื่อ :</span>
                <span>{{props.name}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>สถานที่ปฏิบัติงาน :</span>
                <span>{{props.adminCompanyName}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>หมายเลขโทรศัพท์ :</span>
                <span>{{props.tel}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>เขต :</span>
                <span>{{props.adminDistrict}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>อีเมล์ :</span>
                <span>{{props.email}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between" v-if="route === ''">
                <span>รหัสผ่าน :</span>
                <span>{{props.password}}</span>
              </a-row>
            </a-col>
            <a-col :span='12'>
              <a-card class="mt-2" v-if="props.logoImg !== null || props.logoImg !== ''">
                <img width="100%" :src="props.logoImg" />
              </a-card>
              <a-card class="mt-2" v-else>
                <img width="100%" src="@/assets/logo_sos.png" />
              </a-card>
            </a-col>
            <a-col :span="24" class="mt-5">
              <a-row type="flex" justify="end">
                <a-button type="primary" @click="CloseModal">ปิด</a-button>
              </a-row>
            </a-col>
          </a-row>
         </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['props'],
  data () {
    return {
      route: ''
    }
  },
  computed: {
    Modal () {
      return this.$store.state.ModuleApi.Modal
    }
  },
  watch: {
    props (val) {
      // // console.log('prop user', val)
      if (this.$router.currentRoute.name === 'ManageService') {
        this.route = 'ManageService'
        this.props.adminDistrict = val.serviceDistrict
      }
    }
  },
  methods: {
    CloseModal () {
      this.$store.commit('SetModal')
    }
  }
}
</script>
