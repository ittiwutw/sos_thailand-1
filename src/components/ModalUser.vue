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
                <span>หน่วยงานปฎิบัติงาน :</span>
                <span>{{props.adminCompanyName}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>หมายเลขโทรศัพท์ :</span>
                <span>{{props.tel}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>พื้นที่รับผิดชอบ :</span>
                <span v-if="props.adminAreaType === 'PROVINCE'">{{props.adminProvince}}</span>
                <span v-else-if="props.adminAreaType === 'DISTRICT'">{{props.adminDistrict}}</span>
                <span v-else>{{props.adminSubDistrict}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>อีเมล์ :</span>
                <span>{{props.email}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between" v-if="route === ''">
                <span>รหัสผ่าน :</span>
                <span>{{props.password}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>คะเเนน :</span>
                <span>{{rating}}</span>
              </a-row>
            </a-col>
            <a-col :span='12'>
              <a-card class="mt-2" v-if="(props.adminCardImg !== null || props.adminCardImg !== '')">
                <v-img height="300px" :src="props.logoImg" />
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
      route: '',
      rating: 0
    }
  },
  computed: {
    Modal () {
      return this.$store.state.ModuleApi.Modal
    }
  },
  watch: {
    props (val) {
      console.log('prop user', val)
      this.GetRating(val)
      if (this.$router.currentRoute.name === 'ManageService') {
        this.route = 'ManageService'
        this.props.adminDistrict = val.serviceDistrict
      }
    }
  },
  methods: {
    CloseModal () {
      this.$store.commit('SetModal')
    },
    async GetRating (val) {
      this.rating = 0
      var data = await this.axios.get(`${process.env.VUE_APP_API}/getRatingByUserId?userId=${val.userId}`)
      // var data = await this.axios.get(`${process.env.VUE_APP_API}/getRatingByUserId?userId=132`)
      for (let i = 0; i < data.data.data.length; i++) {
        this.rating += data.data.data[i].ratingPoint
      }
      if (data.data.rating !== null) {
        this.rating = this.rating / data.data.rating
      }
    }
  }
}
</script>
